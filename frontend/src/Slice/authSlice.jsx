import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:true,
        isAuthenticated:false,
        isUpdated:false
    },
    reducers:{
        loginRequest(state,action){
            return{
                isAuthenticated:false,
                loading:true
            }
        },
        loginSuccess(state,action){
            return{
                
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        loginFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        registerRequest(state,action){
            return{
                isAuthenticated:false,
                loading:true
            }
        },
        registerSuccess(state,action){
            return{
                
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        registerFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
                
            }
        },
        updateUserRequest(state,action){
            return{
                isAuthenticated:false,
                loading:true,
                isUpdated:false,
            }
        },
        updateUserSuccess(state,action){
            return{
                
                loading:false,
                isAuthenticated:true,
                user:action.payload.user,
                isUpdated:true
            }
        },
        updateUserFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
                
            }
        },
        updatePasswordRequest(state,action){
            return{
                ...state,
                loading:true,
                isUpdated:false,
            }
        },
        updatePasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                message:action.payload,
                isUpdated:true
            }
        },
        updatePasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
                
            }
        },
        forgotPasswordRequest(state,action){
            return{
                ...state,
                loading:true,
                isUpdated:false,
            }
        },
        forgotPasswordSuccess(state,action){
            return{
                
                loading:false,
                message:action.payload,
                user:action.payload.user
            }
        },
        forgotPasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
                
            }
        },
        resetPasswordRequest(state,action){
            return{
                ...state,
                loading:true,
                isUpdated:false,
                message:null
            }
        },
        resetPasswordSuccess(state,action){
            return{
                
                loading:false,
                isAuthenticated:true,
                message:action.payload,
                user:action.payload.user
            }
        },
        resetPasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
                
            }
        },
        loadUserRequest(state,action){
            return{
                ...state,
                isAuthenticated:false,
                loading:true
            }
        },
        
        loadUserSuccess(state,action){
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        loadUserFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
                
            }
        },
        logoutSuccess(state,action){
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                
            }
        },
        logoutFail(state,action){
            return{
        
                loading:false,
                error:action.payload,
                
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null,
                isUpdated:null
            }
        },
    }
})

const {actions,reducer}=authSlice
export const {
    loginRequest,loginSuccess,loginFail,clearError,
    registerRequest,registerSuccess,registerFail,loadUserRequest,
    loadUserSuccess,loadUserFail,logoutSuccess,logoutFail,
    updateUserRequest,updateUserSuccess,updateUserFail,
    updatePasswordRequest,updatePasswordSuccess,updatePasswordFail,
    forgotPasswordRequest,forgotPasswordSuccess,forgotPasswordFail,
    resetPasswordRequest,resetPasswordSuccess,resetPasswordFail
    
}=actions
export  default reducer