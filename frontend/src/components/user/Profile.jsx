import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {toast} from 'react-toastify'

export default function Profile() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [avatar,setAvatar]=useState('')
    const[ avatarPreview,setAvatarPreview]=useState('/images/default_avatar.png')
    const dispatch=useDispatch();
    const {error,user,isAuthenticated}=useSelector(state=>state.authState);
    
    useEffect(()=>{
        if(error){
            console.log('Errors')
            toast.error(error,{
                theme:'dark',
                onOpen:()=>{
                    dispatch(clearAuthError)
                }
            })
        }
    },[error,dispatch])
    return (
        user&&
        <div className="container container-fluid">
            <h2 className="mt-5 ml-5">My Profile</h2>
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3">
                    <figure className='avatar avatar-profile'>
                        <img className="rounded-circle img-fluid" src={user.avatar||avatarPreview} alt='' />
                    </figure>
                    <Link to={'/myprofile/update'} id="edit_profile" className="btn btn-primary btn-block my-5">
                        Edit Profile
                    </Link>
                </div>

                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                    <h4>Email Address</h4>
                    <p>{user.email}</p>
                    <h4>Join</h4>
                    <p>{user.createdAt.toString().substring(0,10)}</p>
                    <a href="#" className="btn btn-danger btn-block mt-5">
                        My Orders
                    </a>

                    <Link to={'/myprofile/password/update'} className="btn btn-primary btn-block mt-3">
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    )
}