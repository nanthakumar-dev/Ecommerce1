import{useState,useEffect} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import {forgotPasswordAction} from '../../Actions/authActions'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
export default function forgotPassword() {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {error,isAuthenticated,message}=useSelector(state=>state.authState);
    
    const [email,setEmail]=useState('')
    
    function onSubmitHandler(e){
        e.preventDefault()
        const formdata={email}
        dispatch(forgotPasswordAction(formdata))

    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                theme:"dark",
                positon:'bottom-center',
                
            })
            return

        }
        if(isAuthenticated){
            toast.success(message,{
                theme:"dark",
                positon:'bottom-center',
                
            })
            navigate('/password/reset')
            return
        }
    },[isAuthenticated,error,dispatch])
    function onChange(e){
        setEmail(e.target.value)
        console.log(email)
    }
    return (
        <div className="container-container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={onSubmitHandler} className="shadow-lg">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                        </button>

                    </form>
                </div>
            </div>

        </div>
    )
}