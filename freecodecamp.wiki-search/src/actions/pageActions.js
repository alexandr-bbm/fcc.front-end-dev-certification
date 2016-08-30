import * as actionTypes from '../constants/actionTypes';
import fetchArticles from '../services/fetchArticles'

export function getArticles(query) {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_ARTICLES_REQUEST,
            payload: query
        });
        fetchArticles(query)
            .then((data) => {
                console.log(data);
                dispatch({
                    type: actionTypes.GET_ARTICLES_SUCCESS,
                    payload: data
                })
            })
    }
}
export function closePopup() {
    return {
        type: actionTypes.CLOSE_POPUP,
    }
}