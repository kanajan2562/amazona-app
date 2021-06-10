import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {cartReducer} from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer } from './reducers/orderReducers';

import {
    productDetailsReducer,
    productListReducer
} from './reducers/productReducers';

import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';

const initialState = {
    userSignin:{
        userInfo:localStorage.getItem('userInfo') 
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        :[],
        shippingAddress:localStorage.getItem('shippingAddress') //เวลาเพิ่มสินค้า shippingAddress ยังเก็บ state  Shipping Address เหมือนเดิม
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod:'PayPal'
    },
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userSignin : userSigninReducer,
    userRegister:userRegisterReducer,  //register
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList:userListReducer,
    userDelete: userDeleteReducer,

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;