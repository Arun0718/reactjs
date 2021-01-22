
import * as BT from "./branchTypes";
import axios from 'axios';

export const saveBranch = branch => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_BRANCH_REQUEST
        });
        axios.post("http://localhost:8081/rest/branches", branch)
            .then(response => {
                dispatch(branchSuccess(response.data));
            })
            .catch(error => {
                dispatch(branchFailure(error));
            });
    };
};

export const fetchBranch = branchId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_BRANCH_REQUEST
        });
        axios.get("http://localhost:8081/rest/branches/"+branchId)
            .then(response => {
                dispatch(branchSuccess(response.data));
            })
            .catch(error => {
                dispatch(branchFailure(error));
            });
    };
};

export const updateBranch = branch => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_BRANCH_REQUEST
        });
        axios.put("http://localhost:8081/rest/branches", branch)
            .then(response => {
                dispatch(branchSuccess(response.data));
            })
            .catch(error => {
                dispatch(branchFailure(error));
            });
    };
};

export const deleteBranch = branchId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_BRANCH_REQUEST
        });
        axios.delete("http://localhost:8081/rest/branches/"+branchId)
            .then(response => {
                dispatch(branchSuccess(response.data));
            })
            .catch(error => {
                dispatch(branchFailure(error));
            });
    };
};

const branchSuccess = branch => {
    return {
        type: BT.BRANCH_SUCCESS,
        payload: branch
    };
};

const branchFailure = error => {
    return {
        type: BT.BRANCH_FAILURE,
        payload: error
    };
};

export const fetchLanguages = () => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_LANGUAGES_REQUEST
        });
        axios.get("http://localhost:8081/rest/branches/languages")
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
        axios.get("http://localhost:8081/rest/branches/genres")
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