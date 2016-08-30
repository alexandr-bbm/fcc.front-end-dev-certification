import * as actionTypes from '../constants/actionTypes';
import random from 'lodash/random';
import SIMON_SETTINGS from 'constants/simonSettings';

export function startGame() {

    return {
        type: actionTypes.START_GAME,
        payload: random(SIMON_SETTINGS.MIN_BTN_VAL, SIMON_SETTINGS.MAX_BTN_VAL) // fixme
    }
}

export function stopGame() {
    return {
        type: actionTypes.STOP_GAME,
    }
}

export function processWrongInput() {
    return {
        type: actionTypes.PROCESS_WRONG_INPUT,
    }
}

export function handleSnackbarClose() {
    return {
        type: actionTypes.HANDLE_SNACKBAR_CLOSE,
    }
}

/**
 *   Pushed new item to `combination`
 */
export function processRightInput() {
    const nextItem = random(SIMON_SETTINGS.MIN_BTN_VAL, SIMON_SETTINGS.MAX_BTN_VAL);
    return {
        type: actionTypes.PROCESS_RIGHT_INPUT,
        payload: nextItem
    }
}

export function endPlaying() {
    return {
        type: actionTypes.END_PLAYING,
    }
}



export function toggleStrictMode(isChecked) {
    return {
        type: actionTypes.TOGGLE_STRICT_MODE,
        payload: isChecked
    }
}

/**
 *
 */
export function processUserInput(buttonValue) {
    return {
        type: actionTypes.PROCESS_USER_INPUT,
        payload: buttonValue
    }
}
export function asyncActionExample() {
    return (dispatch) => {
        dispatch({
            type: actionTypes.ASYNC_REQUEST
        });
        asyncFunction()
            .then((payload) => {
                dispatch({
                    type: actionTypes.ASYNC_SUCCESS,
                    payload
                })
            })
    }
}

function asyncFunction() {
    return new Promise((resolve) => {
        setTimeout(resolve.bind(null, {message: 'Async action happened!'}), 1000);
    })
}