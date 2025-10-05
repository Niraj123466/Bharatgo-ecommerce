import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import modalReducer from "./slices/modalSlice";
import orderReducer from "./slices/orderslice";
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    modal: modalReducer,
    orders : orderReducer,
    auth : authReducer,
    toast: toastReducer,
  },
});

export default store;