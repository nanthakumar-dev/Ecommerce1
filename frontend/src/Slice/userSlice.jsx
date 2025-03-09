
import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'user',
    initialState:{
        loading:false,
        users:[],
        user:{},
        isUserDeleted:false,
        isUserUpdated:false
    },
    reducers:{
        usersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        usersSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                users:action.payload
            }
            
        },
        usersFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        userRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        userSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                user:action.payload
            }
            
        },
        userFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        
        deleteUserRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        deleteUserSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUserDeleted:true,
            }
            
        },
        deleteUserFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearUserDeleted(state,action){
            return{
                ...state,
                loading:false,
                isUserDeleted:false
            }

        },
        updateUserRequest(state,action){
            return{
                ...state,
                loading:true,
                isUserUpdated:false
            }
        },
        updateUserSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                isUserUpdated:true
            }
            
        },
        updateUserFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearUserUpdated(state,action){
            return{
                ...state,
                loading:false,
                isUserUpdated:false
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

const {actions,reducer} =userSlice
export const {
    userRequest,userSuccess,userFail,
    usersRequest,usersSuccess,usersFail,
    deleteUserRequest,deleteUserSuccess,deleteUserFail,clearUserDeleted,
    updateUserRequest,updateUserSuccess,updateUserFail,clearUserUpdated,
    clearError
}=actions
export default reducer