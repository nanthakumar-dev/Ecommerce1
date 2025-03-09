import  {useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { resetPasswordAction,clearAuthError } from '../../Actions/authActions'
import { toast } from 'react-toastify'
export default function resetPassword() {
    const [password,setPassword]=useState('')
    const [conformPassword,setConformPassword]=useState('')
    const {message,error,isAuthenticated,isUpdated}=useSelector(state=>state.authState)
    const {token}=useParams()
    const dispatch=useDispatch();
    function submitHandler(e) {
        e.preventDefault()
        const data={password,conformPassword}
        dispatch(resetPasswordAction(data,token))

        
    }
    const navigate=useNavigate()
    useEffect(()=>{
        if(isAuthenticated){
            toast.success('Updated Successfully',{
                theme:'dark',
                position:'bottom-center'
            })
            navigate('/')
            return
        }
        if(error){
            toast.error(error,{
                theme:'dark',
                position:'bottom-center',
                onOpen:()=>{
                    dispatch(clearAuthError)
                }
                
            })
            return
        }
    },[error,isAuthenticated])
    return (
        <div className="container-container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={conformPassword}
                                onChange={e=>setConformPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
                        </button>

                    </form>
                </div>
            </div>

        </div>
    )
}