import { Fragment, useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { useDispatch, useSelector } from "react-redux"
import { usersDataAction,userDataAction,deleteUserDataAction } from "../../Actions/userAction"
import { clearUserDeleted,clearUserUpdated} from "../../Slice/userSlice"
import { Link } from "react-router-dom"
import SlideBar from "./slideBar"
import {toast} from "react-toastify"

export default function userList() {

    const {users,isUserUpdated,isUserDeleted,error } = useSelector(state => state.userState)
    
    const dispatch = useDispatch()
    function deleteUser(e,id){
       
        dispatch(deleteUserDataAction(id))
    }
    useEffect(() => {
        if(isUserUpdated){
            toast.success('User Updated Successfully',{
                theme:'dark',
                position:'bottom-center',
                onOpen:()=>{
                    dispatch(clearUserUpdated())
                }
            })
            return
        }
        if(isUserDeleted){
            toast.success('User Deleted Successfully',{
                theme:'dark',
                position:'bottom-center',
                onOpen:()=>{
                    dispatch(clearUserDeleted())
                }
            })
            return
        }
        if(error){
            toast.error(error,{
                theme:'dark',
                position:'bottom-center'
            })
            return
        }
        dispatch(usersDataAction)

    }, [dispatch,isUserDeleted,isUserUpdated,error])
    const getData = () => {
        const data = {
            columns: [
                {
                    label: 'Product_id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Action',
                    field: 'action',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        users && users.forEach(user => (
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                action: (
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <button onClick={(e)=>deleteUser(e,user._id)} className="btn btn-primary">
                        <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                )
            })
        ))
        return data
    }
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SlideBar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="col-12 col-md-2">
                        <h4>Admin Users</h4>
                    </div>

                    <div className="col-12 col-md-10">
                        <MDBDataTable
                            bordered
                            striped
                            hover
                            data={getData()}
                        />
                    </div>
                </div>
            </div>
        </Fragment>



    )
}