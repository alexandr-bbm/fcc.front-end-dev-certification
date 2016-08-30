import * as actionTypes from 'constants/actionTypes'

import SIMON_SETTINGS from 'constants/simonSettings';

import MessageHelper from 'helpers/MessageHelper'

const initialState = {

    isGameRunning: false,

    /**
     * Whether the strict mode is enabled. This leads to the reset of game once user did a mistake.
     */
    isStrictMode: false,

    /**
     * Array of numbers corresponding to current combination
     */
    combination: [],

    /**
     *  Whether the game is waiting for user's input.
     */
    isWaitingForInput: false,


    combinationIsPlaying: false,

    /**
     *  Message to show for user.
     */
    snackbar: {
        open: false,
        message: ''
    }

};
export default function simonGame(state = initialState, action) {
    switch (action.type) {

        case actionTypes.START_GAME:
            return {
                ...state,
                isGameRunning: true,
                combinationIsPlaying: true,
                combination: [action.payload],
                snackbar: {
                    open: true,
                    message: MessageHelper.GAME_START
                }

            };

        case actionTypes.END_PLAYING:
            return {
                ...state,
                combinationIsPlaying: false,
                isWaitingForInput: true
            };

        case actionTypes.STOP_GAME:
            return {
                ...state,
                isGameRunning: false,
                combinationIsPlaying: false,
                combination: []
            };

        case actionTypes.PROCESS_RIGHT_INPUT: {
            const combination = [...state.combination, action.payload];

            if (combination.length > SIMON_SETTINGS.STEPS_TO_WIN) {
                return {
                    ...state,
                    isGameRunning: false,
                    combinationIsPlaying: false,
                    combination: [],
                    snackbar: {
                        open: true,
                        message: MessageHelper.WINNER_MESSAGE
                    }
                };
            }
            return {
                ...state,
                combinationIsPlaying: true,
                isWaitingForInput: false,
                combination,
                snackbar: {
                    open: true,
                    message: MessageHelper.getRandomSuccess()
                }
            }
        }

        case actionTypes.PROCESS_WRONG_INPUT: {
            if (! state.isStrictMode) {
                return {
                    ...state,
                    combinationIsPlaying: true,
                    isWaitingForInput: false,
                    snackbar: {
                        open: true,
                        message: MessageHelper.LISTEN_AGAIN
                    }
                }
            }
            return {
                ...state,
                isGameRunning: false,
                combination: [],
                snackbar: {
                    open: true,
                    message: MessageHelper.GAME_OVER
                }
            }
        }

        case actionTypes.TOGGLE_STRICT_MODE:
            return {
                ...state,
                isStrictMode: action.payload
            };

        case actionTypes.HANDLE_SNACKBAR_CLOSE:
            return {
                ...state,
                snackbar: {
                    open: false,
                    message: ''
                }
            };

        default:
            return state
    }
}