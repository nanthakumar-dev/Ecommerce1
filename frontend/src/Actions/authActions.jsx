import {
    loginRequest,loginSuccess,loginFail,clearError,
    registerRequest,registerSuccess,registerFail,
    loadUserRequest,loadUserSuccess,loadUserFail,logoutSuccess,logoutFail,
    updateUserRequest,updateUserSuccess,updateUserFail,
    updatePasswordRequest,updatePasswordSuccess,updatePasswordFail, 
    forgotPasswordRequest,forgotPasswordSuccess,forgotPasswordFail,
    resetPasswordRequest,resetPasswordSuccess,resetPasswordFail
} from '../Slice/authSlice'
import axios from 'axios'
export const LoginAction=(email,password)=>async(dispatch)=>{
    try{
        
        dispatch(loginRequest())
        const {data}=await api.post('/api/v1/login',{email,password})
        dispatch(loginSuccess(data))
    }
    catch(err){
        
        dispatch(loginFail(err.response.data.message))
    }
}
export const RegisterAction=(userData)=>async(dispatch)=>{
    try{
        dispatch(registerRequest())
        const {data}=await api.post('/api/v1/register',userData)
        dispatch(registerSuccess(data))
    }
    catch(err){
        
        dispatch(registerFail(err.response.data.message))
    }
}
export const loadUser=(userData)=>async(dispatch)=>{
    try{
        dispatch(loadUserRequest())
        const {data}=await api.get('/api/v1/myprofile')
        dispatch(loadUserSuccess(data))
    }
    catch(err){
        
        dispatch(loadUserFail(err.response.data.message))
    }
}
export const logoutUser=async(dispatch)=>{
    try{
        
        await api.post('/api/v1/logout')
        dispatch(logoutSuccess())
    }
    catch(err){
        dispatch(logoutFail(err.response.data.message))
    }
}

export const updateUser=(formData)=>async(dispatch)=>{
    try{
        
        dispatch(updateUserRequest())
        
        const user=await api.put('/api/v1/update',formData)
        const users=user.data
        
        dispatch(updateUserSuccess(users))
    }
    catch(err){
        dispatch(updateUserFail(err.response.data.message))
    }
}
export const updatePasswordAction=(formData)=>async(dispatch)=>{
    try{
        
        dispatch(updatePasswordRequest())
        
        const user=await api.put('/api/v1/password/change',formData)
        const users=user.data
    
        dispatch(updatePasswordSuccess(users))
    }
    catch(err){
        dispatch(updatePasswordFail(err.response.data.message))
    }
}
export const forgotPasswordAction=(email)=>async(dispatch)=>{
    try{
        dispatch(forgotPasswordRequest())    
        console.log(email)
        let user=await api.post('/api/v1/password/forgot',email)
        user=user.data
        console.log(user)
        
       
        dispatch(forgotPasswordSuccess(user))    
        
        
    }
    catch(err){
        dispatch(forgotPasswordFail(err))    
        
    }
}
export const resetPasswordAction=(formData,token)=>async(dispatch)=>{
    try{
        dispatch(resetPasswordRequest())    
        
        let user=await api.post(`/api/v1/password/reset/${token}`,formData)
        user=user.data
        
        dispatch(resetPasswordSuccess(user))    
        
    }
    catch(err){
        dispatch(resetPasswordFail(err.response.data.message))    
        
    }
}
export const clearAuthError=(dispatch)=>{
    dispatch(clearError())
}