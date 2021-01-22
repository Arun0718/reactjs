import * as BT from "./branchTypes";

const initialState = {
    branch: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_BRANCH_REQUEST:
        case BT.FETCH_BRANCH_REQUEST:
        case BT.UPDATE_BRANCH_REQUEST:
        case BT.DELETE_BRANCH_REQUEST:
        case BT.FETCH_LANGUAGES_REQUEST:
        case BT.FETCH_GENRES_REQUEST:        
            return {
                ...state
            };
        case BT.BRANCH_SUCCESS:
            return {
                branch: action.payload,
                error: ''
            };
        case BT.BRANCH_FAILURE:
            return {
                branch: '',
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