import axios from "axios"
import {cartItemRequest,cartItemSuccess,cartItemFail} from '../Slice/cartSlice'
export const addToCart=(id,qty)=>async(dispatch)=>{
    try{

        dispatch(cartItemRequest())
        console.log(id,"_id")
        console.log(qty,"qty")
        const {data}=await axios.get(`https://ecommerce123-yixk.onrender.com/api/v1/product/${id}`)
        
        const products={
            id:data.product._id,
            product:id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].image,
            stock:data.product.stock,
            quantity:qty
        }
        console.log("product",products)
        dispatch(cartItemSuccess(products)) 
    }
    catch(error){
        console.log(error)
      
    }

}