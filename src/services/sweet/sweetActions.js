import * as BT from "./sweetTypes";
import axios from 'axios';

export const saveSweet = sweet => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_SWEET_REQUEST
        });
        axios.post("http://localhost:8081/rest/sweets", sweet)
            .then(response => {
                dispatch(sweetSuccess(response.data));
            })
            .catch(error => {
                dispatch(sweetFailure(error));
            });
    };
};

export const fetchSweet = sweetId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_SWEET_REQUEST
        });
        axios.get("http://localhost:8081/rest/sweets/"+sweetId)
            .then(response => {
                dispatch(sweetSuccess(response.data));
            })
            .catch(error => {
                dispatch(sweetFailure(error));
            });
    };
};

export const updateSweet = sweet => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_SWEET_REQUEST
        });
        axios.put("http://localhost:8081/rest/sweets", sweet)
            .then(response => {
                dispatch(sweetSuccess(response.data));
            })
            .catch(error => {
                dispatch(sweetFailure(error));
            });
    };
};

export const deleteSweet = sweetId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_SWEET_REQUEST
        });
        axios.delete("http://localhost:8081/rest/sweets/"+sweetId)
            .then(response => {
                dispatch(sweetSuccess(response.data));
            })
            .catch(error => {
                dispatch(sweetFailure(error));
            });
    };
};

const sweetSuccess = sweet => {
    return {
        type: BT.SWEET_SUCCESS,
        payload: sweet
    };
};

const sweetFailure = error => {
    return {
        type: BT.SWEET_FAILURE,
        payload: error
    };
};

export const fetchLanguages = () => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_LANGUAGES_REQUEST
        });
        axios.get("http://localhost:8081/rest/sweets/languages")
            .then(response => {
                dispatch({
                    type: BT.LANGUAGES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: BT.LANGUAGES_FAILURE,
                    payload: error
                });
            });
    };
};

export const fetchGenres = () => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_GENRES_REQUEST
        });
        axios.get("http://localhost:8081/rest/sweets/genres")
            .then(response => {
                dispatch({
                    type: BT.GENRES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: BT.GENRES_FAILURE,
                    payload: error
                });
            });
    };
};