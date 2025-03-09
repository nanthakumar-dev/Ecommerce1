import { useSelector, useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useEffect,Fragment } from "react"
import { orderDetail as orderDetailAction } from "../../Actions/orderAction"
import Loader from "../Loader"

export default function OrderDetail() {
    const { userOrder, orderDetail=null,loading } = useSelector(state => state.orderState)
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(orderDetailAction(id))
    }, [dispatch, id])
    return (
        orderDetail&&
            
                     <div className="container container-fluid">
                         <div className="row d-flex justify-content-between">
                         <div className="col-12 col-lg-8 mt-5 order-details">
     
                                 <h1 className="my-5">Order # {orderDetail._id}</h1>
     
                                 <h4 className="mb-4">Shipping Info</h4>
                                 <p><b>Name:</b> </p>
                                 <p><b>Phone:</b> {orderDetail.shippingInfo.phoneNo}</p>
                                 <p className="mb-4"><b className="pe-1">Address:</b>{orderDetail.shippingInfo.address},{orderDetail.shippingInfo.postalCode}, {orderDetail.shippingInfo.city}, {orderDetail.shippingInfo.state}, {orderDetail.shippingInfo.country}</p>
                                 <p><b>Amount:</b> ${orderDetail.totalPrice}</p>
     
                                 <hr />
     
                                 <h4 className="my-4">Payment</h4>
                                 <p className={orderDetail.paymentInfo.status == "succeeded" ? "greenColor" : "redColor"} ><b>{orderDetail.paymentInfo.status == "succeeded" ? "PAID" : "UNPAID"}</b></p>
     
     
                                 <h4 className="my-4">Order Status:</h4>
                                 <p className={orderDetail.orderStatus == "pending" ? "redColor" : "greenColor"} ><b>{orderDetail.orderStatus == "pending" ? "PENDING" : "DELIVERED"}</b></p>
     
     
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
                                                     <Link >{item.name}</Link>
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
     
                         </div>
     
                     </div>
                     
                

            )
        
        
    
}