import React, {PropTypes} from 'react';
import timeout from 'helpers/timeout';
import AudioHelper from 'helpers/AudioHelper';

import './style.scss';

export default class SimonButtons extends React.Component {

    static propTypes = {
        enabled: React.PropTypes.bool.isRequired,
        isPlaying: React.PropTypes.bool.isRequired
    };

    /**
     * Stores user's input combination
     * @type {Array}
     */
    userInput = [];

    /**
     * Duration of button light when it is played (in ms).
     * @type {number}
     */
    LIGHT_DELAY = 1000;

    /**
     * Duration between two buttons lights (in ms).
     * @type {number}
     */
    LIGHT_PAUSE_DELAY = 500;

    BUTTON_SOUNDS = {
        '1': new Audio('./build/audio/Guitar1.mp3'),
        '2': new Audio('./build/audio/Guitar2.mp3'),
        '3': new Audio('./build/audio/Guitar3.mp3'),
        '4': new Audio('./build/audio/Guitar4.mp3'),
    };

    componentWillUpdate (nextProps) {
        /**
         * Triggers buttons to play.
         */
        const {isPlaying} = this.props;
        if (false === isPlaying && true === nextProps.isPlaying) {
            this.playCombination(nextProps.combination);
        }
    }

    renderButtons () {
        const BUTTONS_RENDER_DATA = [
            {
                value: '1',
                classPostfix: 'red',
            },
            {
                value: '2',
                classPostfix: 'green',
            },
            {
                value: '3',
                classPostfix: 'blue',
            },
            {
                value: '4',
                classPostfix: 'yellow',
            },
        ];

        /**
         *  Array to be containing btn nodes.
         */
        this._buttonNodes = {};

        this.DISABLED_BTN_CLASS = 'simon-buttons__btn_disabled';
        this.ACIVE_BTN_CLASS = 'simon-buttons__btn_active';

        const disabledBtnsClass = !this.props.enabled ? this.DISABLED_BTN_CLASS : '';


        return BUTTONS_RENDER_DATA.map((btn, i) =>
            <button className={'simon-buttons__btn simon-buttons__btn_' + btn.classPostfix + ' ' + disabledBtnsClass}
                    onClick={this.handleBtnClick.bind(this, btn.value)}
                    onMouseDown={this.handleBtnMouseDown.bind(this, btn.value)}
                    onMouseUp={this.handleBtnMouseUp.bind(this, btn.value)}
                    data-value={btn.value}
                    key={i}
                    ref={(c) => this._buttonNodes[btn.value] = c}
            > </button>)
    }

    /**
     *
     */
    handleBtnClick = (pressedButtonValue) => {
        this.updateAndCheckUserInput(pressedButtonValue);
    };

    handleBtnMouseDown = (pressedButtonValue) => {
        this.BUTTON_SOUNDS[pressedButtonValue].play();
    };
    handleBtnMouseUp = (pressedButtonValue) => {
        AudioHelper.stop(this.BUTTON_SOUNDS[pressedButtonValue])
    };


    /**
     * Process user's input
     * @param value
     * @returns boolean
     */
    updateAndCheckUserInput (value) {
        const {combination, processWrongInput, processRightInput} = this.props;

        this.userInput.push(value);

        const isCorrect = this.userInput.every((elm, idx) => +elm === combination[idx]);

        if (!isCorrect) {
            this.userInput = [];
            setTimeout(processWrongInput, 1000)
        }

        if (isCorrect && combination.length === this.userInput.length) {
            this.userInput = [];
            setTimeout(processRightInput, 1000)
        }
    }

    /**
     * Plays combination of array of numbers;
     */
    playCombination (combination) {
        const {endPlaying} = this.props;
        let chain = Promise.resolve();
        combination.forEach((value) => {
            chain = chain.then(() => this.playOne(value))
        });
        chain.then(() => endPlaying());
    }

    playOne (value) {
        return new Promise((resolve) => {
            if (!this.props.isPlaying) resolve();
            timeout(this.LIGHT_PAUSE_DELAY)
                .then(() => {
                    this._buttonNodes[value].classList.add(this.ACIVE_BTN_CLASS);
                    this.BUTTON_SOUNDS[value].play();
                    return timeout(this.LIGHT_DELAY)
                })
                .then(() => {
                    AudioHelper.stop(this.BUTTON_SOUNDS[value]);
                    this._buttonNodes[value].classList.remove(this.ACIVE_BTN_CLASS);
                    resolve();
                })
        });
    }

    render () {
        return (
            <div className="simon-buttons">
                {this.renderButtons()}
            </div>
        )
    }
}