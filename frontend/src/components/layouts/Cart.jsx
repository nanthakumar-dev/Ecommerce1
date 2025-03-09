import { Fragment,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {increaseCartItem,decreaseCartItem,deleteCartItem} from '../../Slice/cartSlice'
export default function Cart() {
    const dispatch=useDispatch()
    const {items} =useSelector(state=>state.cartState)
    function increaseCart(id){
        dispatch(increaseCartItem(id))
    }
    useEffect(()=>{

    },[dispatch,deleteCartItem])
    const location=useLocation()
    const navigate=useNavigate()
    function checkOut(){
        navigate('/login?redirect=shipping')
       
    }
    return (
        <Fragment>
            <div className="container container-fluid">
                <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        <Fragment>
                            {
                                items.map(item=>(
                                    <Fragment key={item.id}>
                                        <hr />
                                        <div className="cart-item">
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt="Laptop" height="90" width="115"/>
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span className="btn btn-danger minus" onClick={()=>dispatch(decreaseCartItem(item.id))}>-</span>
                                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                        <span className="btn btn-primary plus" onClick={()=>increaseCart(item.id)} >+</span>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>dispatch(deleteCartItem(item.id))}></i>
                                                </div>

                                            </div>
                                        </div>
                                    </Fragment>

                                ))
                            }
                        </Fragment>
                        <hr />
                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{items.length} (Units)</span></p>
                            <p>Est. total: <span className="order-summary-values">${Number((items.reduce((acc,item)=>(acc+item.price*item.quantity),0)).toFixed(2))}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkOut}>Check out</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}