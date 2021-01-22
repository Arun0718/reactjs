import * as BT from "./sweetTypes";

const initialState = {
    sweet: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_SWEET_REQUEST:
        case BT.FETCH_SWEET_REQUEST:
        case BT.UPDATE_SWEET_REQUEST:
        case BT.DELETE_SWEET_REQUEST:
        case BT.FETCH_LANGUAGES_REQUEST:
        case BT.FETCH_GENRES_REQUEST:        
            return {
                ...state
            };
        case BT.SWEET_SUCCESS:
            return {
                sweet: action.payload,
                error: ''
            };
        case BT.SWEET_FAILURE:
            return {
                sweet: '',
                error: action.payload
            };
        case BT.LANGUAGES_SUCCESS:
            return {
                languages: action.payload,
                error: ''
            };
        case BT.LANGUAGES_FAILURE:
            return {
                languages: '',
                error: action.payload
            };
        case BT.GENRES_SUCCESS:
            return {
                genres: action.payload,
                error: ''
            };
        case BT.GENRES_FAILURE:
            return {
                genres: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;