import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,Link } from 'react-router-dom'
import Loader from '../Loader'
import { orderDetail as orderDetailAction,updateOrder } from "../../Actions/orderAction"
export default function OrderUpdate() {
    const { orderDetail, loading } = useSelector(state => state.orderState)
    const [orderStatus,setOrderStatus]=useState('processed')
    console.log(orderStatus)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(orderDetailAction(id))
    }, [dispatch])
    
    
    const submitHandler=(e)=>{
        const data={
           
                orderStatus:orderStatus
            
        }
        dispatch(updateOrder(id,data))
    }
    
    return (

        <Fragment>

            {



                loading?<Loader></Loader>:(
                    orderDetail&&
                <div>
                    <h1>Order Update</h1>

                    <div className="row d-flex justify-content-around">
                        
                        <div className="col-8 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {orderDetail._id}</h1>

                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b>{orderDetail.user.name} </p>
                            <p><b>Phone:</b> {orderDetail.shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b className="pe-1">Address:</b>{orderDetail.shippingInfo.address},{orderDetail.shippingInfo.postalCode}, {orderDetail.shippingInfo.city}, {orderDetail.shippingInfo.state}, {orderDetail.shippingInfo.country}</p>
                            <p><b>Amount:</b> ${orderDetail.totalPrice}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={orderDetail.paymentInfo.status == "succeeded" ? "greenColor" : "redColor"} ><b>{orderDetail.paymentInfo.status == "succeeded" ? "PAID" : "UNPAID"}</b></p>


                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderDetail.orderStatus == "pending" ? "redColor" : "greenColor"} ><b>{orderDetail.orderStatus}</b></p>


                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {
                                    orderDetail.orderItems.map(item => (

                                        <div className="row my-5 " key={item._id}>
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-5">
                                                <Link to={`/product/${item.product}`} >{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <hr />
                        </div>
                        <div className='col-4 col-lg-4'>
                            <h1>Order Status</h1>
                            <select value={orderStatus} onChange={e=>setOrderStatus(e.target.value)} name="" id="">
                                <option >Select</option>
                                <option value="processed">Processed</option>
                                <option value="Shipped">Shippeed</option>
                                <option value="delivered">Delivered</option>
                            </select><br></br>
                            <button onClick={(e)=>submitHandler(e)}>UpdateStatus</button>
                        </div>

                    </div>
                </div>
                )


            }

        </Fragment>
    )
}