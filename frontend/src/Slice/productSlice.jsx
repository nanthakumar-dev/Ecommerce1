
import {createSlice} from '@reduxjs/toolkit'

const productSlice=createSlice({
    name:'product',
    initialState:{
        loading:false,
        product:[],
        isProductCreated:false,
        isProductDeleted:false,
        isProductUpdated:false
    },
    reducers:{
        productRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        productSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                product:action.payload.product
            }
            
        },
        productFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        newProductRequest(state,action){
            return{
                ...state,
                loading:true,
                isProductCreated:false
            }
        },
        newProductSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                product:action.payload,
                isProductCreated:true
            }
            
        },
        newProductFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearProductCreated(state,action){
            return{
                ...state,
                loading:false,
                isProductCreated:false
            }

        },
        deleteProductRequest(state,action){
            return{
                ...state,
                loading:true,
                isProductDeleted:false
            }
        },
        deleteProductSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                product:action.payload,
                isProductDeleted:true
            }
            
        },
        deleteProductFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearProductDeleted(state,action){
            return{
                ...state,
                loading:false,
                isProductDeleted:false
            }

        },
        updateProductRequest(state,action){
            return{
                ...state,
                loading:true,
                isProductUpdated:false
            }
        },
        updateProductSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                product:action.payload,
                isProductUpdated:true
            }
            
        },
        updateProductFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearProductUpdated(state,action){
            return{
                ...state,
                loading:false,
                isProductUpdated:false
            }

        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        }

    }
})

const {actions,reducer} =productSlice
export const {
    productRequest,productSuccess,productFail,
    newProductRequest,newProductSuccess,newProductFail,clearProductCreated,
    deleteProductRequest,deleteProductSuccess,deleteProductFail,clearProductDeleted,
    updateProductRequest,updateProductSuccess,updateProductFail,clearProductUpdated,
    clearError
}=actions
export default reducer