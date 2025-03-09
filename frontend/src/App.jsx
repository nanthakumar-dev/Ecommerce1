import './App.css'
import Home from './components/Home'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify'
import Productdetail from './components/productDetail'
import SearchProduct from './components/layouts/searchProduct';
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import Forgot from './components/user/forgotPassword'
import Reset from './components/user/resetPassword'
import MyOrder from './components/order/MyOrder'
import { UpdateUser } from './components/user/UpdateUser'
import UpdatePassword from './components/user/updatePassword'
import ProtectedRoute from './Route/protectedRoute'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import store from './store'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Store from './store';
import { loadUser } from './Actions/authActions';
import Cart from './components/layouts/Cart'
import ShippingInfo from './components/layouts/ShippingInfo'
import ConfirmOrder from './components/layouts/ConfirmOrder';
import Payment from './components/layouts/Payment';
import axios from 'axios';
import OrderSuccess from './components/OrderSuccess';
import OrderDetail from './components/order/orderDetail';
import DashBoard from './components/Admin/DashBoard';
import AdminProduct from './components/Admin/adminProduct';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/orderList';
import UserList from './components/Admin/userList';
import OrderUpdate from './components/Admin/orderUpdate';
import UserUpdate from './components/Admin/userUpdate';
function App() {
  const dispatch = useDispatch()
  const [apiKey, setApiKey] = useState('')
  useEffect(() => {
    dispatch(loadUser())

    async function Key() {
      const { data } = await axios.get('/api/v1/stripeapi')
      setApiKey(data.apiKey)
    }
    Key()
    
  }, [])
  
  return (

    <>
      <BrowserRouter>
        <HelmetProvider>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<Productdetail />} />
            <Route path='/search/:keyword' element={<SearchProduct />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route element={<ProtectedRoute />} >
              <Route path='/myprofile' element={<Profile />} />
              <Route path='/myprofile/update' element={<UpdateUser />} />
              <Route path='/myprofile/password/update' element={<UpdatePassword />} />

              <Route path='/shipping' element={<ShippingInfo />} />
              <Route path='/order/confirm' element={<ConfirmOrder />} />
              <Route path='/order/success' element={<OrderSuccess />} />
              <Route path='/myorder' element={<MyOrder />} />
              <Route path='/order/:id' element={<OrderDetail />} />

              {
                apiKey &&
                <Route path='/payment'
                  element={<Elements stripe={loadStripe(apiKey)}><Payment /></Elements>} />
              }

            </Route>
            <Route path='/password/forgot' element={<Forgot />} />
            <Route path='/password/reset/:token' element={<Reset />} />
            <Route path='/cart' element={<Cart />} />



          </Routes>

          <Routes>
            <Route  element={<ProtectedRoute isAdmin/>} >
              <Route path='/admin/dashboard'  element={<DashBoard />} />
              <Route path='/admin/product/new'  element={<NewProduct />} />
              <Route path='/admin/product'  element={<AdminProduct />} />
              <Route path='/admin/product/:id'  element={<UpdateProduct />} />
              <Route path='/admin/order'  element={<OrderList />} />
              <Route path='/admin/order/:id'  element={<OrderUpdate />} />
              <Route path='/admin/user'  element={<UserList />} />
              <Route path='/admin/user/:id'  element={<UserUpdate />} />
            </Route>
          </Routes>
          <Footer />
        </HelmetProvider>
      </BrowserRouter>
    </>
  )
}

export default App