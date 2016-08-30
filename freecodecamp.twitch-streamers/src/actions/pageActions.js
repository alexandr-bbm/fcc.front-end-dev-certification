import * as actionTypes from '../constants/actionTypes';
import fetchStreamers from '../services/fetchStreamers'

export function getStreamers() {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_STREAMERS_REQUEST
        });
        fetchStreamers()
            .then((data) => {
                dispatch({
                    type: actionTypes.GET_STREAMERS_SUCCESS,
                    payload: data
                })
            })
    }
}

export function filterStreamers(param, value) {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CLEAR_STREAMERS
        });
        const actionData = {
            type: actionTypes.CHANGE_FILTER,
            payload: {
                param,
                value
            }
        };
        setTimeout(dispatch.bind(null, actionData), 500)
    }
}

