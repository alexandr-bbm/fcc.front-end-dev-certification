import TweenLite from 'gsap/src/uncompressed/TweenMax';

export default class ShatteredPopup {
    constructor ($popup) {
        this.$popup = $popup;
        this.slowness = 1; // todo: param
        this.$popupInner = $popup.children().first();
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
        const popupWidth = ShatteredPopup.numberFromCss(this.$popup, 'width');
        const popupHeight = ShatteredPopup.numberFromCss(this.$popup, 'height');
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
                const {distX, distY, rotY, rotX, z} = ShatteredPopup.calculateValues();
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
            this.shatteredWrapper() // todo immediate speed
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
            distX: ShatteredPopup.getRandom(-500, 500),
            distY: ShatteredPopup.getRandom(-500, 500),
            rotY: ShatteredPopup.getRandom(-720, 720),
            rotX: ShatteredPopup.getRandom(-720, 720),
            z: ShatteredPopup.getRandom(-500, 500)
        }
    }

    static numberFromCss($el, prop) {
        return +$el.css(prop).replace('px', '');
    }
}
