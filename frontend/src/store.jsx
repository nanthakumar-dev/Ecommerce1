import {configureStore,combineReducers} from '@reduxjs/toolkit'
import productsReducer from './Slice/productsSlice'
import productReducer from './Slice/productSlice'
import authReducer from './Slice/authSlice'
import cartReducer from './Slice/cartSlice'
import orderReducer from './Slice/orderSlice'
import userReducer from './Slice/userSlice'

const reducer=combineReducers({
    productsState:productsReducer,
    productState:productReducer,
    authState:authReducer,
    cartState:cartReducer,
    orderState:orderReducer,
    userState:userReducer,
})


const Store=configureStore({
    reducer,
})


export default Store