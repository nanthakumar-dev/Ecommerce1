import {Fragment, useState,useEffect} from 'react'
import MetaData from '.././MetaData'

import {useDispatch,useSelector} from 'react-redux'
import {productsActions} from '../../Actions/productActions'
import Product from '.././Product'
import Loader from ".././Loader"
import {toast} from 'react-toastify'
import Pagination from 'react-js-pagination'
import { useNavigate, useParams } from 'react-router-dom'
export default function searchProduct(){
    const [currentPage,setCurrentPage]=useState(1)
    const navigate=useNavigate()
    const{keyword}=useParams()
    const setcurrentPageNo=(page)=>{
        setCurrentPage(page)
    }
    const[category,setCategory]=useState(null)
    function categoryClick(category){
        setCategory(category)
        
    }
    const categories=[
    'Electronics',
    'Mobile Phones',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home']
    const dispatch=useDispatch()
    const{loading,products,error,count,perPage}=useSelector(state=>state.productsState)
    useEffect(()=>{
        if(error){
            toast.error('Hello',{theme:'dark'})
        }
        dispatch(productsActions(currentPage,keyword,category))
    },[dispatch,currentPage,keyword,category])
    return(
        <Fragment>
            {
                loading?<Loader/>:
                    <Fragment>
                        <MetaData title={"Home"}/>
                        <h1 id="products_heading">Search Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            <div className="mt-5 col-6 col-md-2">
                                <h4 >Category  </h4><span className='mb-3 greenColor'>{category}</span >
                                <ul>
                                    {
                                
                                        categories.map(category =>
                                        <li style={{listStyle:'none',cursor:'pointer'}} 
                                        onClick={(()=>categoryClick(category))} key={category}>{category}</li>)
                                    
                                    }
                                </ul>
                                <hr />
                                <div className="ratings">
                                    <h5>Raings</h5>
                                    {
                                        [5,4,3,2,1].map(star=>
                                            <div key={star} className="rating-outer">
                                                <div className="rating-inner" style={{width:`${star*2*10}%`}}></div>
                                            </div>
                                            
                                            )
                                    }
                                    
                                </div>
                            </div>
                            <div className="mt-1 col-6 col-md-10">
                                <div className="row " >
                                    { products &&
                                        products.map((product,index)=><Product col={4} product={product} key={index}/>)
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </section>
                    {
                        count>0  && count>perPage?
                            <div className="d-flex justify-content-center">
                                    <Pagination
                                    activePage={currentPage}
                                    onChange={setcurrentPageNo}
                                    totalItemsCount={count}
                                    itemsCountPerPage={perPage}
                                    nextPageText='Next'
                                    firstPageText='First'
                                    lastPageText='Last'
                                    itemClass={'page-item'}
                                    linkClass={'page-link'}
                                    />
                            </div>
                        :null
                    }
                    </Fragment>
            }
        </Fragment>
           
    )
}