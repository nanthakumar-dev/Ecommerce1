import {productsSuccess,productsRequest,productsFail,
    reviewRequest,reviewSuccess,reviewFail,clearReview,
    adminProductsRequest,adminProductsSuccess,adminProductsFail,
    
} from '../Slice/productsSlice'

import {productRequest,productSuccess,productFail,
    newProductRequest,newProductSuccess,newProductFail,
    deleteProductRequest,deleteProductSuccess,deleteProductFail,
    updateProductRequest,updateProductSuccess,updateProductFail
} from '../Slice/productSlice'
import axios from 'axios'
export const productActions=id=>async(dispatch)=>{
    try{
        console.log("PRoductsssssssss")
    dispatch(productRequest())
    let response=await fetch(`/api/v1/product/${id}`)
    response=await response.json()
    
    dispatch(productSuccess(response))
    }
    catch(err){
        dispatch(productFail(err.message))
    }

}

export const productsActions=(currentPage,keyword,category)=>async(dispatch)=>{
    try{
        dispatch(productsRequest())
    let link=`/api/v1/product?page=${currentPage}`
    if(keyword){
        link+=`&keyword=${keyword}`
    }
    if(category){
        link+=`&category=${category}`
    }
    let products=await axios.get(link)
    products=products.data
    dispatch(productsSuccess(products))}

    catch(err){
        console.log(err.response.data.message)
    }
        
}
export const createReview=form=>async(dispatch)=>{
    try{
        
        dispatch(reviewRequest())
        const condition={
            headers:{
                "Content-type":"application/json"
            }
        }
        let products=await axios.post('/api/v1/product/review',form,condition)
        products=products.data
        dispatch(reviewSuccess())
    }
    catch(err){
        dispatch(reviewFail(err.response.data.message))
    }
}
export const adminProducts=async(dispatch)=>{
    try{
        
        dispatch(adminProductsRequest())
        
        let products=await axios.get('/api/v1/admin/product')
        products=products.data.product
        dispatch(adminProductsSuccess(products))
    }
    catch(err){
        dispatch(adminProductsFail(err.response.data.message))
    }
}
export const adminNewProduct=form=>async(dispatch)=>{
    try{
        
        dispatch(newProductRequest())
        console.log(form,"Form")
        const config={
            headers:{
                "Content-type":'multipart/formdata'
            }
        }
        let products=await axios.post('/api/v1/admin/product/new',form,config)
        console.log(products)
        products=products.data.product
        dispatch(newProductSuccess(products))
    }
    catch(err){
        dispatch(newProductFail(err.response.data.message))
    }
}
export const adminProductDelete=(id)=>async(dispatch)=>{
    try{
        console.log("Dell Delete")
        dispatch(deleteProductRequest())
        const config={
            headers:{
                "Content-type":'multipart/formdata'
            }
        }
        let products=await axios.delete(`/api/v1/admin/product/${id}`)
        console.log(products)
        products=products.data.product
        dispatch(deleteProductSuccess(products))
    }
    catch(err){
        dispatch(deleteProductFail(err.response.data.message))
    }
}
export const adminProductUpdate=(id,productData)=>async(dispatch)=>{
    try{
        
        
        dispatch(updateProductRequest())
        const config={
            headers:{
                "Content-type":'multipart/formdata'
            }
        }
        let products=await axios.put(`/api/v1/admin/product/${id}`,productData,config)
        console.log(products)
        products=products.data.product
        dispatch(updateProductSuccess(products))
    }
    catch(err){
        dispatch(updateProductFail(err.response.data.message))
    }
}
