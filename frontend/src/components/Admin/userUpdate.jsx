import { Fragment, useState, useEffect } from "react";
import SlideBar from "./slideBar";
import { clearUserUpdated, clearError } from "../../Slice/userSlice"
import { userDataAction, updateUserDataAction } from "../../Actions/userAction"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";
export default function UpdateUser() {
    const { isUserUpdated, error, user, loading } = useSelector(state => state.userState)
    const { user:authUser } = useSelector(state => state.authState)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    function submitHandler(e) {
        e.preventDefault()
        const formdata = {
            name,email,role
        }

        dispatch(updateUserDataAction(id, formdata))
    }
    useEffect(() => {
        if (isUserUpdated) {
            toast.success("User Updated Successfully", {
                theme: "dark",
                position: 'bottom-center',
                onOpen:()=>{dispatch(clearUserUpdated())}
            })
        }
        if (error) {
            toast.error(error, {
                theme: "dark",
                position: 'bottom-center',
                onOpen: () => {
                    dispatch(clearError())
                }
            })
        }

        dispatch(userDataAction(id))


    }, [dispatch, isUserUpdated, error])
    useEffect(()=>{
        if (user._id) {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
    },[user._id])



    return (
        <Fragment>
            {


                <div className="row">
                    <div className="col-12 col-md-2">
                        <SlideBar />
                    </div>
                    <div className="col-12 col-md-10">

                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4"> Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Email</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>



                                <div className="form-group">
                                    <label htmlFor="category_field">Role</label>
                                    <select
                                        disabled={user._id==authUser._id}
                                        onChange={e => setRole(e.target.value)}
                                        value={role}
                                        className="form-control" id="category_field">

                                        <option value='user'>user</option>
                                        <option value='admin'>Admin</option>



                                    </select>
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"

                                >
                                    Update User
                                </button>
                            </form>
                        </div>


                    </div>
                </div>
            }


        </Fragment>
    )
}