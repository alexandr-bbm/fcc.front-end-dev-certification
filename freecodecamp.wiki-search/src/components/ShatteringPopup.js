import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom';
import TweenLite from 'gsap/src/uncompressed/TweenMax';


export default class ShatteringPopup extends Component {
    
    componentDidMount () {
        const popupEl = ReactDOM.findDOMNode(this.refs.popup);
        this.shatteredWrapper =  new ShatteredWrapper(popupEl);
        popupEl.parentNode.style.overflow = 'hidden';
        this.shatteredWrapper.build();
    }

    componentWillUnmount () {
        const popupEl = ReactDOM.findDOMNode(this.refs.popup);
        popupEl.parentNode.style.overflowX = 'hidden';
        popupEl.parentNode.style.overflowY = 'auto';

    }

    processYes = ()=> {
        this.shatteredWrapper.shatter()
            .then(() => {
                this.props.closePopup();
            });
    };

    render () {
        return (
            <div className="popup center" id="content-01" ref="popup">
                <div className="popup__content">
                    <div className="popup__text">Would you like to search Wiki?</div>
                    <a className="btn btn__success" onClick={this.processYes}>Yes</a>
                    <a className="btn btn__danger">No</a>
                </div>
            </div>
        )
    }
}

/**
 * Класс обертка для управления раздроблением.
 */
class ShatteredWrapper {
    constructor (popupEl) {
        this.$popup = $(popupEl);
        this.slowness = 1; // todo: param
        this.$popupInner = this.$popup.children().first();
        this.popupColor = this.$popup.css('background-color');
        this.preparePieces();
        this.addStyleSheet();
        this.makePieces();
        this.state = {
            shattered: false
        };
        this.$popup.css('background-color', 'transparent');
    }

    preparePieces () {
        const piecesSize = 10;
        const popupWidth = ShatteredWrapper.numberFromCss(this.$popup, 'width');
        const popupHeight = ShatteredWrapper.numberFromCss(this.$popup, 'height');
        this.pieceW = popupWidth/piecesSize;
        this.pieceH = popupHeight/piecesSize;
        this.piecesCount = piecesSize*piecesSize;
    }

    addStyleSheet () {
        $("<style type='text/css'> " +
            ".piece { " +
            'width:' + this.pieceW + 'px; ' +
            'height:' + this.pieceH + 'px;' +
            'float: left;' +
            'background-color: ' + this.popupColor +
            "}" +
            '.pieces-wrapper {' +
            'position: absolute;' +
            " </style>")
            .appendTo("head");
    }

    makePieces () {
        this.$popup.prepend('<div class="pieces-wrapper"></div>');
        const $piecesWrapper = this.$popup.find('.pieces-wrapper');
        for (var i = this.piecesCount - 1; i >= 0; i--) {
            $piecesWrapper.prepend('<div class="piece"></div>');
        }
        this.$pieces = this.$popup.find('.piece');
    }

    shatter () {
        const self = this;
        TweenLite.to(this.$popupInner, this.slowness / 5, {opacity: 0});
        return new Promise((resolve) => {
            this.$pieces.each(function () {
                const {distX, distY, rotY, rotX, z} = ShatteredWrapper.calculateValues();
                TweenLite.to($(this), self.slowness, {x: distX, y: distY, rotationX: rotX, rotationY: rotY, opacity: 0, z: z,
                    onComplete: function () {
                        self.state.shattered = true;
                        self.hide();
                        resolve();
                    }});
            });
        });

    }

    build () {
        if (!this.state.shattered) {
            this.shatter() // todo immediate speed
                .then(() => {
                    this.show();
                    this._gatherPieces();
                })
        } else {
            this._gatherPieces();
        }
    }

    _gatherPieces () {
        const self = this;
        this.show();
        this.$pieces.each(function () {
            TweenLite.to($(this), self.slowness, {x: 0, y: 0, rotationX: 0, rotationY: 0, opacity: 1, z: 0,
                onComplete: function () {
                    TweenLite.to(self.$popupInner, this.slowness, {opacity: 1});
                }});
        });
    }

    hide () {
        this.$popup.css('display', 'none');
    }

    show () {
        this.$popup.css('display', 'block');
    }

    static getRandom (min, max) {
        return Math.random() * (max - min) + min
    }

    static calculateValues () {
        return {
            distX: ShatteredWrapper.getRandom(-500, 500),
            distY: ShatteredWrapper.getRandom(-500, 500),
            rotY: ShatteredWrapper.getRandom(-720, 720),
            rotX: ShatteredWrapper.getRandom(-720, 720),
            z: ShatteredWrapper.getRandom(-500, 500)
        }
    }

    static numberFromCss($el, prop) {
        return +$el.css(prop).replace('px', '');
    }
}
