import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser, clearAuthError } from "../../Actions/authActions"
import { toast } from 'react-toastify'

export const UpdateUser = () => {
    const { loading } = useSelector(state => state.authState)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')
    const { isUpdated, user, error } = useSelector(state => state.authState)
    const dispatch = useDispatch()
    function settingAvatar(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(e.target.files[0])
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar)

        console.log(avatar)
        dispatch(updateUser(formData))

    }
    
    useEffect(() => {
        if (user) {
            
            setName(user.name)
            setEmail(user.email)
            if (user.avatar) {
                setAvatarPreview(user.avatar)
            }
    
        }
        if(isUpdated){
            toast("Updated User Profile", {
                theme: "dark",
                type: 'success',
                position:'bottom-center',
                onOpen:()=>{
                    dispatch(clearAuthError)
                }

            })
            return
            
        }
        if (error) {
            toast(error, {
                theme: "dark",
                type: 'success',
                position:'bottom-center'

            })
            return
        }
        

    }, [ isUpdated, error,dispatch])

    return (
        <div className="container-container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mt-2 mb-5">Update User</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}

                            />
                        </div>

                        <div className='form-group '>
                            <label htmlFor='avatar_upload '>Avatar</label>

                            <div className='d-flex align-items-center'>
                                <label htmlFor="customFile">
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='image' />
                                        </figure>
                                    </div>
                                </label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={settingAvatar}
                                        hidden
                                    >

                                    </input>
                                    <label className='custom-file-label pl-3' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>

                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading} >Update</button>
                    </form>
                </div>
            </div>

        </div>
    )
}