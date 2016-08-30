import * as actionTypes from '../constants/actionTypes'

const initialState = {
    results: [],
    isPopup: true
};
export default function page(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ARTICLES_REQUEST:
            return {
                ...state,
                results: [],
                isFetching: true
            };
        case actionTypes.GET_ARTICLES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                results: action.payload
            };        
        case actionTypes.CLOSE_POPUP:
            return {
                ...state,
                isPopup: false
            };
        default:
            return state
    }
}