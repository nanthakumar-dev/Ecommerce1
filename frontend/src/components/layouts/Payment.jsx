import { Fragment } from "react"
import { CardNumberElement,CardCvcElement,CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Step from "../step"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"
import {createOrder} from "../../Actions/orderAction"
export default function Payment() {
    const stripe=useStripe()
    const elements=useElements()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const{user}=useSelector(state=>state.authState)
    const{shippingInfo,items:cartItems}=useSelector(state=>state.cartState)
    const orderInfo=JSON.parse(localStorage.getItem('orderItems'))
    const paymentData={
            amount:Number(orderInfo.total).toFixed(0),
            shipping:{
              name:user.name,
              address:{
                city:shippingInfo.city
              },
              phone:shippingInfo.phoneNo
            }
          }
    
    const order={
        orderItems:cartItems,
        shippingInfo,
    }
    if(orderInfo){
        order.subTotal=orderInfo.subTotal
        order.shippingPrice=orderInfo.shippingPrice
        order.taxPrice=orderInfo.tax
        order.totalPrice=orderInfo.total
    }
    async function submitHandler(e){
        e.preventDefault()
        document.querySelector("#pay_btn").disabled=true
        try{
            const {data}=await api.post("/api/v1/payment/process",{...paymentData})
            const client_secret=data.client_secret
            const result=await  stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                    }

                }
            })
            
            if(result.error){
                toast.error(result.error.message,{
                    position:'bottom-center',
                    theme:'dark'
                })
                document.querySelector("#pay_btn").disabled=false
            }
            else{
                if(result.paymentIntent.status=="succeeded"){
                    toast.success("payment Success",{
                        position:'bottom-center',
                        theme:'dark'
                    })

                    document.querySelector("#pay_btn").disabled=false
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                   
                    
                    dispatch(createOrder(order))
                    navigate('/order/success')
                }
                else{
                    toast.warning("payment Warning",{
                        position:'bottom-center',
                        theme:'dark'
                    })   
                    
                }

            }
        }
        catch(err){
            console.log(err)
        }

    }
    return (
        <Fragment>
           <Step payment={true} shipping confirmOrder/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                           
                        >
                            Pay
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}