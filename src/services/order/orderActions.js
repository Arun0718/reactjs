import * as BT from "./orderTypes";
import axios from 'axios';

export const saveOrder = order => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_SWEET_REQUEST
        });
        axios.post("http://localhost:8081/rest/orders", order)
            .then(response => {
                dispatch(orderSuccess(response.data));
            })
            .catch(error => {
                dispatch(orderFailure(error));
            });
    };
};

export const fetchOrder = orderId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_SWEET_REQUEST
        });
        axios.get("http://localhost:8081/rest/orders/"+orderId)
            .then(response => {
                dispatch(orderSuccess(response.data));
            })
            .catch(error => {
                dispatch(orderFailure(error));
            });
    };
};

export const updateOrder = order => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_SWEET_REQUEST
        });
        axios.put("http://localhost:8081/rest/orders", order)
            .then(response => {
                dispatch(orderSuccess(response.data));
            })
            .catch(error => {
                dispatch(orderFailure(error));
            });
    };
};

export const deleteOrder = orderId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_SWEET_REQUEST
        });
        axios.delete("http://localhost:8081/rest/orders/"+orderId)
            .then(response => {
                dispatch(orderSuccess(response.data));
            })
            .catch(error => {
                dispatch(orderFailure(error));
            });
    };
};

const orderSuccess = order => {
    return {
        type: BT.SWEET_SUCCESS,
        payload: order
    };
};

const orderFailure = error => {
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
        axios.get("http://localhost:8081/rest/orders/languages")
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
        axios.get("http://localhost:8081/rest/orders/genres")
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