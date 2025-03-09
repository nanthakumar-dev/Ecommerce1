import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { productActions } from '../Actions/productActions'
import { Carousel, CarouselItem } from 'react-bootstrap'
import Loader from "./Loader"
import { addToCart } from "../Actions/cartActions"
import { Modal } from 'react-bootstrap'
import {createReview} from "../Actions/productActions"
import ListReview from "./ListReview"
import {toast} from 'react-toastify'
export default function productDetail() {
    const{isReviewed,error:productError}=useSelector(state=>state.productsState)
    const{user=null}=useSelector(state=>state.authState)
    
    console.log(user,"User")
    const { id } = useParams()
    const dispatch = useDispatch()
    let [quantity, setQuantity] = useState(1)
    const [review,setReview] = useState(1)
    const [comment,setComment] = useState('')
    const formData=new FormData()
    formData.append("rating",review)
    formData.append("comment",comment)
    formData.append("productId",id)
    const formdata={
        rating:review,comment,productId:id
    }
    function submitReviewHandler(){
        console.log("crReview")
        handleClose()
        dispatch(createReview(formData))
    }
    const [show,setShow]=useState(false)
    const handleClose=()=>setShow(false)
    const handleShow=()=>setShow(true)
    useEffect(() => {
        if(isReviewed){
            toast.success("Review Submitted Successfully",{
                theme:'dark',
                position:'bottom-center'
            })
        }
        if(productError){
            toast.error("Review Failed",{
                theme:'dark',
                position:'bottom-center'
            })
        }
        dispatch(productActions(id))
    }, [dispatch,isReviewed,productError])
    const { loading, product } = useSelector(state => state.productState)
    if (!product) {
        return
    }
    console.log(product.stock, "stock")

    function increaseValue() {
        if (product.stock == 0 || quantity >= product.stock) {
            return
        }
        quantity += 1
        setQuantity(quantity)
    }
    const decreaseValue = () => {
        if (product.stock == 0 || quantity <= 1) return
        quantity -= 1
        setQuantity(quantity)
    }
    function addCartClicker() {
        dispatch(addToCart(product._id, quantity))
    }

    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    product &&
                    <Fragment>
                        <div className="container container-fluid">
                            <div className="row f-flex justify-content-around">
                                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                    <Carousel pause="hover">
                                        {
                                            product.images&&
                                            product.images.map(imager => {
                                                return <CarouselItem key={imager._id}><img src={imager.image} alt="sdf" height="500" width="500" /></CarouselItem>

                                            })
                                        }
                                    </Carousel>
                                </div>
                                <div className="col-12 col-lg-5 mt-5">
                                    <h3>{product.name}</h3>
                                    <p id="product_id">Product # {product._id}</p>

                                    <hr />

                                    <div className="rating-outer">
                                        <div className="rating-inner"></div>
                                    </div>
                                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                                    <hr />

                                    <p id="product_price">${product.price}</p>
                                    <div className="stockCounter d-inline">
                                        <span className="btn btn-danger minus" onClick={decreaseValue}>-</span>

                                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                        <span className="btn btn-primary plus" onClick={increaseValue}>+</span>
                                    </div>
                                    <button type="button" id="cart_btn"
                                        className="btn btn-primary d-inline ml-4" onClick={addCartClicker} disabled={product.stock == 0}>Add to Cart</button>

                                    <hr />

                                    <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'},{product.stock}</span></p>

                                    <hr />

                                    <h4 className="mt-2">Description:</h4>
                                    <p>{product.description}</p>
                                    <hr />
                                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                                    <button id="review_btn" type="button" 
                                    onClick={handleShow}
                                    className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                        Submit Your Review
                                    </button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit Review</Modal.Title>
                                        </Modal.Header >
                                        <Modal.Body>
                                            <ul className="stars" >
                                                {
                                                    [1,2,3,4,5].map(star=>(
                                                        <li 
                                                        value={review}
                                                        onClick={()=>setReview(star)}
                                                        className={`star ${star<=review?`orange`:``}`}
                                                        onMouseOver={(e)=>e.target.classList.add("yellow")}
                                                        onMouseOut={(e)=>e.target.classList.remove("yellow")}
                                                        
                                                        >
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                    ))
                                                }
                                                
                                            </ul>

                                            <textarea 
                                            onChange={(e)=>setComment(e.target.value)}
                                            name="review" id="review" className="form-control mt-3">
                                            </textarea>

                                            <button 
                                            onClick={submitReviewHandler}
                                            className="btn btn-primary mt-2" 
                                            data-dismiss="modal" aria-label="Close">Submit</button>

                                        </Modal.Body>
                                    </Modal>
                                    
                                </div>

                            </div>

                        </div>
                        {
                            user&&user?
                            (<ListReview key={product._id}  reviews={product.reviews}/>):(<div className="alert alert-danger">First Login To Submit Rating</div>)
                        }
                    </Fragment>
            }

        </Fragment>
    )
}