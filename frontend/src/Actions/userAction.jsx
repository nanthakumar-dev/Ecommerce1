import {
    userRequest,userSuccess,userFail,
    usersRequest,usersSuccess,usersFail,
    deleteUserRequest,deleteUserSuccess,deleteUserFail,
    updateUserRequest,updateUserSuccess,updateUserFail

} from '../Slice/userSlice'
import axios from 'axios'

export const  usersDataAction=async(dispatch)=>{
    try{
        dispatch(usersRequest())
        const {data}=await api.get(`/api/v1/admin/users`)

        dispatch(usersSuccess(data.user))
    }
    catch(error){
        dispatch(usersFail(error.response.data.message))
        
    }
}
export const  userDataAction=id=>async(dispatch)=>{
    try{
        dispatch(userRequest())
        const {data}=await api.get(`/api/v1/admin/user/${id}`)

        dispatch(userSuccess(data.user))
    }
    catch(error){
        dispatch(userFail(error.response.data.message))
        
    }
}
export const  deleteUserDataAction=id=>async(dispatch)=>{
    try{
        dispatch(deleteUserRequest())
        const {data}=await api.delete(`/api/v1/admin/user/${id}`)
        dispatch(deleteUserSuccess())
    }
    catch(error){
        dispatch(deleteUserFail(error.response.data.message))
        
    }
}
export const  updateUserDataAction=(id,userData)=>async(dispatch)=>{
    try{
        dispatch(updateUserRequest())
        console.log(id,":",userData)
        const {data}=await api.put(`/api/v1/admin/user/${id}`,userData)
        dispatch(updateUserSuccess())
    }
    catch(error){
        dispatch(updateUserFail(error.response.data.message))
        
    }
}