import React, {Component} from 'react';
import './style.scss';
import next from '../../helpers/next.js';
import {SemiCircle} from 'react-progressbar.js/dist/react-progressbar.js';
import Copyright from '../Copyright/index';

import 'react-mdl/extra/material.js';
import 'react-mdl/extra/material.css';

import { IconButton  } from 'react-mdl';

export default class Timer extends Component {
    
    /**
     * Contains intervals objects. Duration in seconds.
     * @type {{1: {id: number, name: string, duration: number}, 2: {id: number, name: string, duration: number}}}
     */
    INTERVALS_BY_ID = {
        1: {
            id: 1,
            name: 'Session',
            duration: 1500,
            startSound: new Audio('/freecodecamp.pomodoro-timer/audio/session.mp3')
        },
        2: {
            id: 2,
            name: 'Break',
            duration: 300,
            startSound: new Audio('/freecodecamp.pomodoro-timer/audio/break.mp3')
        }
    };

    INTERVAL_KEYS = {
        SESSION: 1,
        BREAK: 2
    };

    PROGRESSBAR_SETTINGS = {
        options: {
            text: {
                className: 'timer__digits',
                alignToBottom: false
            },
            trailColor: '#D32F2F',
            color: '#fff',
            strokeWidth: 3,
            svgStyle: {
                display: 'block',
                width: '100%',
                transform: {
                    prefix: true,
                    value: 'scaleY(-1)'
                }
            }
        },
        containerStyle: {
            width: '275px',
        }
    };

    /**
     *  Initial state.
     */
    state = {
        intervalsById: this.INTERVALS_BY_ID,
        currentIntervalId: this.INTERVAL_KEYS.SESSION,
        secondsRemaining: this.INTERVALS_BY_ID[this.INTERVAL_KEYS.SESSION].duration,
        isRunning: false,
    };

    /**
     * Seconds to increase/decrease the interval at once
     * @type {number}
     */
    INCREMENT = 60;

    /**
     * Minimum duration of interval in seconds.
     * @type {number}
     */
    MINIMUM_DURATION = 60;

    /**
     * Container for setInterval
     */
    counter = {};

    pause () {
        clearInterval(this.counter);
        this.setState({
            isRunning: false
        })
    }

    stop () {
        this.pause();
        const {currentIntervalId, intervalsById} = this.state;

        this.setState({
            secondsRemaining: intervalsById[currentIntervalId].duration,
            isRunning: false
        })
    }

    increaseInterval (intervalId) {
        let {isRunning, intervalsById} = this.state;

        intervalsById[intervalId].duration += this.INCREMENT;
        if (!isRunning) this.stop();
        this.setState({
            intervalsById
        })
    }

    decreaseInterval (intervalId) {
        const {isRunning, intervalsById} = this.state;

        if (intervalsById[intervalId].duration > this.MINIMUM_DURATION) {
            intervalsById[intervalId].duration -= this.INCREMENT;
            if (!isRunning) this.stop();
            this.setState({
                intervalsById
            })
        }
    }

    /**
     * Starts or continues timer
     */
    start () {
        const {isRunning} = this.state;
        if (isRunning) return;

        this.setState({
            isRunning: true
        });
        this.counter = setInterval(this.tick.bind(this), 1000);
    }

    /**
     *  Processes 1 tick of timer. Reduces remainingSeconds until 0 and then switches to next interval.
     */
    tick () {
        let {secondsRemaining, intervalsById, currentIntervalId} = this.state;

        if (secondsRemaining == intervalsById[currentIntervalId].duration) {
            // beginning of the interval
            intervalsById[currentIntervalId].startSound.play();
        }

        if (secondsRemaining === 0) {
            // end of the interval
            return this.nextInterval();
        }

        secondsRemaining--;

        this.setState({
            secondsRemaining
        })
    }

    nextInterval () {
        let {intervalsById, currentIntervalId} = this.state;
        currentIntervalId = next(intervalsById, currentIntervalId.toString()).id;

        const secondsRemaining = intervalsById[currentIntervalId].duration;
        this.setState({
            currentIntervalId,
            secondsRemaining,
        });
    }

    onStartClick = () => this.start();
    onPauseClick = () => this.pause();
    onStopClick = () => this.stop();
    onSkipNextClick = () => this.nextInterval();

    onIncreaseSessionClick = () => this.increaseInterval(this.INTERVAL_KEYS.SESSION);
    onIncreaseBreakClick = () => this.increaseInterval(this.INTERVAL_KEYS.BREAK);

    onDecreaseSessionClick = () => this.decreaseInterval(this.INTERVAL_KEYS.SESSION);
    onDecreaseBreakClick = () => this.decreaseInterval(this.INTERVAL_KEYS.BREAK);

    static prependZero (number) {
        return number < 10 ? `0${number}` : number;
    }

    /**
     * Transforms seconds to mm:ss format
     * @param absoluteSeconds
     * @returns {string}
     */
    static makeTime (absoluteSeconds) {
        let minutes = Timer.prependZero(Math.floor(absoluteSeconds / 60));
        let seconds = absoluteSeconds % 60;
        let remainedSeconds = Timer.prependZero(seconds);
        return `${minutes}:${remainedSeconds}`;
    }

    set pageTitle (title) {
        return document.querySelector('title').textContent = `${title}`;
    }

    render () {
        const {intervalsById, currentIntervalId, secondsRemaining, isRunning} = this.state;

        const currentInterval = intervalsById[currentIntervalId];

        const displayTimer = Timer.makeTime(secondsRemaining);
        const displaySessionLength = Timer.makeTime(intervalsById[this.INTERVAL_KEYS.SESSION].duration);
        const displayBreakLength = Timer.makeTime(intervalsById[this.INTERVAL_KEYS.BREAK].duration);

        const percentFinished = (1 - secondsRemaining / currentInterval.duration);

        this.pageTitle = displayTimer + ' ' + (isRunning ? 'running' : 'not running');

        const pauseOrPlayIcon = isRunning ?
            <IconButton name="pause"
                        onClick={this.onPauseClick} />
            :
            <IconButton name="play_arrow"
                        onClick={this.onStartClick} />;

        return (
            <div className="timer">
                <div className="timer__layout-col timer__layout-col_first">
                    <IconButton name="stop"
                                onClick={this.onStopClick} />
                    {pauseOrPlayIcon}
                    <IconButton name="skip_next"
                                onClick={this.onSkipNextClick} />
                </div>
                <div className="timer__layout-col">
                    <div className="timer__interval-name">{currentInterval.name}</div>
                    <SemiCircle
                        progress={percentFinished}
                        text={displayTimer}
                        options={this.PROGRESSBAR_SETTINGS.options}
                        initialAnimate={true}
                        containerStyle={this.PROGRESSBAR_SETTINGS.containerStyle} />
                    <Copyright />
                </div>
                <div className="timer__layout-col">
                    <div className="timer__info-wrapper">
                        <div className="timer__info">Session length: </div>
                        <div className="timer__info">
                            <div className="timer__info-digits">{displaySessionLength}</div>
                            <IconButton name="add" onClick={this.onIncreaseSessionClick} />
                            <IconButton name="remove" onClick={this.onDecreaseSessionClick} />
                        </div>
                    </div>
                    <div className="timer__info-wrapper">
                        <span className="timer__info">Break length: </span>
                        <div className="timer__info">
                            <div className="timer__info-digits">{displayBreakLength}</div>
                            <IconButton name="add" onClick={this.onIncreaseBreakClick} />
                            <IconButton name="remove" onClick={this.onDecreaseBreakClick} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}