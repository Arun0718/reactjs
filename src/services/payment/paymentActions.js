import * as BT from "./paymentTypes";
import axios from 'axios';

export const savePayment = payment => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_PAYMENT_REQUEST
        });
        axios.post("http://localhost:8081/rest/payments", payment)
            .then(response => {
                dispatch(paymentSuccess(response.data));
            })
            .catch(error => {
                dispatch(paymentFailure(error));
            });
    };
};

export const fetchPayment = paymentId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_PAYMENT_REQUEST
        });
        axios.get("http://localhost:8081/rest/payments/"+paymentId)
            .then(response => {
                dispatch(paymentSuccess(response.data));
            })
            .catch(error => {
                dispatch(paymentFailure(error));
            });
    };
};

export const updatePayment = payment => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_PAYMENT_REQUEST
        });
        axios.put("http://localhost:8081/rest/payments", payment)
            .then(response => {
                dispatch(paymentSuccess(response.data));
            })
            .catch(error => {
                dispatch(paymentFailure(error));
            });
    };
};

export const deletePayment = paymentId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_PAYMENT_REQUEST
        });
        axios.delete("http://localhost:8081/rest/payments/"+paymentId)
            .then(response => {
                dispatch(paymentSuccess(response.data));
            })
            .catch(error => {
                dispatch(paymentFailure(error));
            });
    };
};

const paymentSuccess = payment => {
    return {
        type: BT.PAYMENT_SUCCESS,
        payload: payment
    };
};

const paymentFailure = error => {
    return {
        type: BT.PAYMENT_FAILURE,
        payload: error
    };
};

export const fetchLanguages = () => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_LANGUAGES_REQUEST
        });
        axios.get("http://localhost:8081/rest/paymnets/languages")
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
        axios.get("http://localhost:8081/rest/payments/genres")
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