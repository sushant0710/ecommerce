import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDeatilsReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderCreateReducer,orderDetailsReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducer";
import { addressReducer } from "./reducers/shippingAddr";
import {
  userLoginReducer,
  userRegisterReducer, 
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";
// import {addToCart} from "./actions/cartAction"


const userInfoFromStroage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

 
const shippingAddressStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
:{};


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDeatilsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  shippingAdd:addressReducer,
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderList:orderListReducer
});

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStroage },
  shippingAdd:{shippingAddress:shippingAddressStorage}
};

const middleWare =  [thunk];

const store = configureStore(
 { reducer },
  initialState,
  composeWithDevTools(...middleWare)
);
// console.log(initialState)

export default store;
