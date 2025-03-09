import { set } from "mongoose"
import { useState } from "react"
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cartItemFail } from "../../Slice/cartSlice"
import Step from "../step"
import { checkShipping } from "./ShippingInfo"

export default function ConfirmOrder() {
    const navigate = useNavigate()
    const { shippingInfo, items } = useSelector(state => state.cartState)
    const { user } = useSelector(state => state.authState)
    const subTotal= Number(Number(items.reduce((acc, item) => (acc + item.price * item.quantity), 0)).toFixed(2))
    const shippingPrice = subTotal>=500?0:40
    let tax = Number(Number(subTotal * 0.05).toFixed(0))
    const total = subTotal + shippingPrice + tax
    tax = Number(Number(subTotal * 0.05).toFixed(2))
    
    useEffect(() => {
        checkShipping(shippingInfo, navigate) 
        
    }, [])
    const data={
        subTotal,
        shippingPrice,
        tax,
        total
    }
    function Clicker(){
        localStorage.setItem('orderItems',JSON.stringify(data))
        navigate('/payment')
    }
    return (
        <Fragment>
            <Step shipping confirmOrder={true} />
            <div className="container container-fluid">

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">

                        <h4 className="mb-3">Shipping Info</h4>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.postalCode}, {shippingInfo.city},{shippingInfo.state},{shippingInfo.country}</p>

                        <hr />
                        <h4 className="mt-4">Your Cart Items:</h4>

                        {
                            items.map((item,i) => (
                                <Fragment key={i}>
                                    <div className="cart-item my-1">
                                        <div className="row">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt="Laptop" height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-6">
                                                <a href="#">
                                                    {item.name}
                                                </a>
                                            </div>


                                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                                <p>{item.quantity} x ${item.price}= <b>${item.quantity * item.price}</b></p>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))
                        }

                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">${subTotal}</span></p>
                            <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                            <p>Tax:  <span className="order-summary-values">${tax}</span></p>

                            <hr />

                            <p>Total: <span className="order-summary-values">${total}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block"
                            onClick={Clicker}
                            >Proceed to Payment</button>
                        </div>
                    </div>


                </div>
            </div>
        </Fragment>
    )
}