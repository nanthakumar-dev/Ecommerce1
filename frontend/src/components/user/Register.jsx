import { Toast } from "@blueprintjs/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from '../../Actions/authActions'
import { toast } from 'react-toastify'
import { clearAuthError } from '../../Actions/authActions';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const dispatch = useDispatch()
    const { error, isAuthenticated, loading } = useSelector((state) => state.authState)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState('images/default_avatar.png')
    function inputHanlder(e) {
        if (e.target.name == 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(e.target.files[0])
                    setAvatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])


        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }
    }


    function submitHandler(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar)
        const formdata={
            name:userData.name,
            email:userData.email,
            password:userData.password,
            avatar:userData.avatar,
        }

        dispatch(RegisterAction(formData))


    }
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            toast.success("Register SuccessFully", { theme: "dark" })
            navigate('/')
            return
        }
        if (error) {
            toast.error(error,
                {
                    theme: 'dark',
                    onOpen: () => {
                        dispatch(clearAuthError)
                    }
                })
        }
    })
    return (
        <Fragment>
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-3">Register</h1>

                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
                                <input type="name" id="name_field" className="form-control" name="name"
                                    onChange={inputHanlder} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field" >Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name="email"
                                    onChange={inputHanlder}

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    name="password"
                                    onChange={inputHanlder}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='image' />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={inputHanlder}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button
                                id="register_button"
                                type="submit"
                                className="btn btn-block py-3"
                            >
                                REGISTER
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}