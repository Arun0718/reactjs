import {LOGIN_REQUEST , LOGOUT_REQUEST, SUCCESS , FAILURE} from './authTypes';

export const authenticateUser = (email, password) => {
 
    return dispatch=>{
        dispatch(loginRequest());
        if(email ==="admin" && password ==="admin"){
            dispatch(success());
        }
        else{
            dispatch(failure());
        }

    };
};
const loginRequest=()=>{
    return{
        type:LOGIN_REQUEST
    };
};
const success = ()=> {
    return {
        type:SUCCESS,
        payload:true
    };
};

const failure = () => {
    return {
        type:FAILURE,
        payload: false
    };
};

export const logoutUser = () => {
    return dispatch => {
       
            dispatch(logoutRequest());
            dispatch(success());
    };
        
};
const logoutRequest=()=>{
    return{
        type:LOGOUT_REQUEST
    }
}

