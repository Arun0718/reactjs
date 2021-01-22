import {combineReducers} from 'redux';
import userReducer from './user/userReducer';
import authReducer from './user/auth/authReducer';
import sweetReducer from './sweet/sweetReducer';
import paymentReducer from './payment/paymentReducer';
import orderReducer from './order/orderReducer';
import branchReducer from './branch/branchReducer';


const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    sweet: sweetReducer,
    payment: paymentReducer,
    order: orderReducer,
    branch: branchReducer

});

export default rootReducer;