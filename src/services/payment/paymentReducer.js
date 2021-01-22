import * as BT from "./paymentTypes";

const initialState = {
    payment: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_PAYMENT_REQUEST:
        case BT.FETCH_PAYMENT_REQUEST:
        case BT.UPDATE_PAYMENT_REQUEST:
        case BT.DELETE_PAYMENT_REQUEST:
        case BT.FETCH_LANGUAGES_REQUEST:
        case BT.FETCH_GENRES_REQUEST:        
            return {
                ...state
            };
        case BT.PAYMENT_SUCCESS:
            return {
                payment: action.payload,
                error: ''
            };
        case BT.PAYMENT_FAILURE:
            return {
                payment: '',
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