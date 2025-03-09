import {createSlice} from '@reduxjs/toolkit'

const initialState={
        loading:false,
        products:[]
    }

const productsSlice=createSlice({
    
    name:'products',
    initialState,
    reducers:{
        productsRequest(){
            
            return{
                loading:true
            }
        },
        productsSuccess(state,action){
            return{
                loading:false,
                products:action.payload.product,
                perPage:action.payload.perPage,
                count:action.payload.count
            }
        },
        productsFail(state,action){
            return{
                loader:false,
                error:action.payload
            }
        },
        adminProductsRequest(state,action){
            
            return{
                ...state,
                loading:true
            }
        },
        adminProductsSuccess(state,action){
            return{
                ...state,
                loading:false,
                products:action.payload
            }
        },
        adminProductsFail(state,action){
            return{
                ...state,
                loader:false,
                error:action.payload
            }
        },
        reviewRequest(state,action){
            return{
                loader:false
            }
        },
        reviewSuccess(state,action){
            return{
                loader:false,
                isReviewed:true
            }
        },
        reviewFail(state,action){
            return{
                loader:false,
                error:action.payload
            }
        },
        clearReview(state,action){
            isReviewed:false
        }
    }

})

const {reducer,actions}=productsSlice

export const {
    productsSuccess,productsRequest,productsFail,
    reviewRequest,reviewSuccess,reviewFail,clearReview,
    adminProductsRequest,adminProductsSuccess,adminProductsFail

} =actions

export default reducer