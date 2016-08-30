import * as actionTypes from '../constants/actionTypes'

const initialState = {
    allStreamers: [],
    displayStreamers: []
};
export default function page(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_STREAMERS_REQUEST:
            return {
                ...state,
                results: [],
                isFetching: true
            };

        case actionTypes.GET_STREAMERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                allStreamers: action.payload,
                displayStreamers: action.payload
            };

        case actionTypes.CLEAR_STREAMERS:
            return {
                ...state,
                displayStreamers: []
            };
            break;
        
        case actionTypes.CHANGE_FILTER:
            const { param, value } = action.payload;
            let displayStreamers;
            if (value == 'all') {
                displayStreamers = state.allStreamers;
            } else {
                displayStreamers = state.allStreamers.filter((el) => {
                    return (el[param] == value);
                });
            }
            return {
                ...state,
                displayStreamers
            };
            break;

        default:
            return state
    }
}