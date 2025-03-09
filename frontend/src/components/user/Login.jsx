import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginAction, clearAuthError } from "../../Actions/authActions";
import { toast } from 'react-toastify'



export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, isAuthenticated, error } = useSelector(state => state.authState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loaction=useLocation()
    const redirect=location.search?"/"+loaction.search.split("=")[1]:'/cart'
    function submitHandler(e){
        e.preventDefault()
        dispatch(LoginAction(email, password))

    }
    
    useEffect(() => {
        if (error) {
            toast.error(error, {
                theme: 'dark',
                onOpen: () => {
                    dispatch(clearAuthError)
                }
            })           
        }
        if (isAuthenticated) {

            navigate(redirect)
           
        }



    }, [isAuthenticated, error, dispatch])

    return (
        <Fragment>
            <div className="container container-fluid mt-5">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form onSubmit={submitHandler} className="shadow-lg">
                            <h1 className="mb-3">Login</h1>
                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    name="email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    name='password'
                                />
                            </div><br />
                            <Link to={'/password/forgot'} className="float-right mt-2 ">Forgot Password?</Link>
                            <br />
                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-2"
                                disabled={loading}
                            >
                                LOGIN
                            </button>
                            <br />
                            <Link to={'/register'} className="float-right ">New User?</Link>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}