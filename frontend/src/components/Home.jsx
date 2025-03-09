import {Fragment, useState,useEffect} from 'react'
import MetaData from './MetaData'

import {useDispatch,useSelector} from 'react-redux'
import {productsActions} from '../Actions/productActions'
import Product from './Product'
import Loader from "./Loader"
import {toast} from 'react-toastify'
import Pagination from 'react-js-pagination'

export default function Home(){
    const [currentPage,setCurrentPage]=useState(1)
    
    const setcurrentPageNo=(page)=>{
        setCurrentPage(page)
    }
    const dispatch=useDispatch()
    const{loading,products,error,count,perPage}=useSelector(state=>state.productsState)
    useEffect(()=>{
        if(error){
            toast.error('Hello',{theme:'dark'})
        }
        dispatch(productsActions(currentPage,null,null))
    },[dispatch,currentPage])
    
    return(
        <Fragment>
            {
                loading?<Loader/>:
                    <Fragment>
                        <MetaData title={"Home"}/>
                        <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            { products &&
                                products.map((product,index)=><Product product={product} col={3} key={index}/>)
                            }
                            
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