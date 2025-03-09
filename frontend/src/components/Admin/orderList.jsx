import { Fragment, useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { useDispatch, useSelector } from "react-redux"
import { getOrder,deleteOrder as deleteOrderAction} from "../../Actions/orderAction"
import { clearOrderDeleted} from "../../Slice/orderSlice"
import { Link } from "react-router-dom"
import SlideBar from "./slideBar"
import {toast} from "react-toastify"

export default function OrderList() {

    const { adminOrder,isOrderDeleted,error } = useSelector(state => state.orderState)
    
    const dispatch = useDispatch()
    function deleteOrderFun(e,id){
        dispatch(deleteOrderAction(id))
    }
    useEffect(() => {
        if(isOrderDeleted){
            toast.success('Order DeletedSuccessfully',{
                theme:'dark',
                position:'bottom-center',
                onOpen:()=>{
                    dispatch(clearOrderDeleted())
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
        dispatch(getOrder)

    }, [dispatch,isOrderDeleted,error])
    const getData = () => {
        const data = {
            columns: [
                {
                    label: 'Product_id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'NumOfOrder',
                    field: 'numoforder',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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
        adminOrder && adminOrder.forEach(order => (
            data.rows.push({
                id: order._id,
                numoforder:order.orderItems.length,
                amount:order.totalPrice,
                status:order.orderStatus,
                action: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <button onClick={(e)=>deleteOrderFun(e,order._id)} className="btn btn-primary">
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
                        <h4>Admin Orders</h4>
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