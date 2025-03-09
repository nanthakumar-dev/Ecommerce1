import { Fragment, useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { useDispatch, useSelector } from "react-redux"
import { adminProducts,adminProductDelete } from "../../Actions/productActions"
import { clearProductDeleted,clearProductCreated} from "../../Slice/productSlice"
import { Link } from "react-router-dom"
import SlideBar from "./slideBar"
import {toast} from "react-toastify"

export default function adminProduct() {

    const { products } = useSelector(state => state.productsState)
    const { isProductDeleted,error,isProductCreated } = useSelector(state => state.productState)
    const dispatch = useDispatch()
    function deleteProduct(e,id){
       
        dispatch(adminProductDelete(id))
    }
    useEffect(() => {
        if(isProductCreated){
            toast.success('Product Created Successfully',{
                theme:'dark',
                position:'bottom-center',
                onOpen:()=>{
                    dispatch(clearProductCreated())
                }
            })
            return
        }
        if(isProductDeleted){
            toast.success('Product Deleted Successfully',{
                theme:'dark',
                position:'bottom-center',
                onOpen:()=>{
                    dispatch(clearProductDeleted())
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
        dispatch(adminProducts)

    }, [dispatch,isProductDeleted,isProductCreated,error])
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
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
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
        products && products.forEach(product => (
            data.rows.push({
                id: product._id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                action: (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <button onClick={(e)=>deleteProduct(e,product._id)} className="btn btn-primary">
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
                        <h4>Admin Products</h4>
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