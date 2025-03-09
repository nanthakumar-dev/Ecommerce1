import axios from "axios"
import { 
    orderRequest,orderSuccess,orderFail,
    userOrderRequest,userOrderSuccess,userOrderFail,
    orderDetailRequest,orderDetailSuccess,orderDetailFail,
    adminOrderRequest,adminOrderSuccess,adminOrderFail,
    deleteOrderRequest,deleteOrderSuccess,deleteOrderFail,
    updateOrderRequest,updateOrderSuccess,updateOrderFail
 } from "../Slice/orderSlice"
export const createOrder=order=>async(dispatch)=>{
    try{
        dispatch(orderRequest())
    const {data}=await axios.post("/api/v1/order/new",order)
    console.log(data)
    dispatch(orderSuccess(data.order))
}
catch(err){
    dispatch(orderFail(err.response.data.message))
    console.log(err.response.data.message)
}}
export const userOrderAction=async(dispatch)=>{
    try{
        dispatch(userOrderRequest())
    const {data}=await axios.get("/api/v1/myorder")
    dispatch(userOrderSuccess(data.order))
}
catch(err){
    dispatch(userOrderFail(err.response.data.message))
    console.log(err.response.data.message)
}
}
export const orderDetail=(id)=>async(dispatch)=>{
    try{
        dispatch(orderDetailRequest())
        const {data}=await axios.get(`/api/v1/order/${id}`)
        dispatch(orderDetailSuccess(data.order))
    }
    catch(err){
        dispatch(orderDetailFail(err.response.data.message))
    }


}
export const getOrder=async(dispatch)=>{
    try{

        dispatch(adminOrderRequest())
        const {data}=await axios.get(`/api/v1/admin/orders`)
        dispatch(adminOrderSuccess(data.order))

    }
    catch(err){
        dispatch(adminOrderFail(err.response.data.message))
    }


}
export const deleteOrder=id=>async(dispatch)=>{
    try{
        console.log(id)
        dispatch(deleteOrderRequest())
        await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch(deleteOrderSuccess())

    }
    catch(err){
        dispatch(deleteOrderFail(err.response))
    }


}
export const updateOrder=(id,orderData)=>async(dispatch)=>{
    try{
       
        dispatch(updateOrderRequest())
        const {data}=await axios.put(`/api/v1/admin/order/${id}`,orderData)
        console.log(data.order)
        dispatch(updateOrderSuccess(data.order))

    }
    catch(err){
        dispatch(updateOrderFail(err.response.data.message))
    }


}