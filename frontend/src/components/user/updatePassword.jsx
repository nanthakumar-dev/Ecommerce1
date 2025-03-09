import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import {updatePasswordAction} from '../../Actions/authActions'
import {useNavigate} from 'react-router-dom'

export default function updatePassword() {
    const[oldPassword,setOldPassword]=useState('')
    const[password,setPassword]=useState('')
    const {user,isUpdated,message,error} =useSelector(state=>state.authState)
    
    const dispatch=useDispatch()
    
    function onSubmitHandler(e){
        e.preventDefault()
        const data={
            oldPassword,
            password
        }
        dispatch(updatePasswordAction(data))
    }
    useEffect(()=>{
        if(isUpdated){
            
            toast.success("Updated",{
                theme:'dark'
            })
            return
        }
        if(error){
            
            toast.error(error,{
                theme:'dark'

            })
            return
        }
    },[isUpdated,error,dispatch])
    return (
        <div className="container-container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={onSubmitHandler} className="shadow-lg">
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                onChange={e=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                onChange={e=>setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>

        </div>
    )
}