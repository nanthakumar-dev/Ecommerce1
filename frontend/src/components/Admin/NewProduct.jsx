import { Fragment,useState,useEffect } from "react";
import SlideBar from "./slideBar";
import {clearProductCreated} from "../../Slice/productSlice"
import {adminNewProduct} from "../../Actions/productActions"
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewProduct() {
    const {isProductCreated,error} =useSelector(state=>state.productState)
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [description,setDescription]=useState('')
    const [category,setCategory]=useState([])
    const [stock,setStock]=useState('')
    const [seller,setSeller]=useState('')
    const [image,setImage]=useState([])
    const [imagePreview,setImagePreview]=useState([])
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
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
        'Home'
    ]
    function submitHandler(e){
        e.preventDefault()
        const formData=new FormData();
        formData.append('name',name)
        formData.append('price',price)
        formData.append('description',description)
        formData.append('category',category)
        formData.append('stock',stock)
        formData.append('seller',seller)
        image.forEach(img=>{
            formData.append('images',img)
        })
        dispatch(adminNewProduct(formData))
        navigate('/admin/product')
    }
    function onImageChange(e){
        const files=Array.from(e.target.files)
        
        files.forEach(file=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState==2){
                    setImagePreview(oldArr=>[...oldArr,reader.result])
                    setImage(oldArray=>[...oldArray,file])
                    
                }
            }
            reader.readAsDataURL(file)
        })
        
        
    }
    useEffect(()=>{
        if(isProductCreated){
            toast.success("Product Created Successfully",{
                theme:"dark",
                position:'bottom-center',
                onOpen:()=>{clearProductCreated()}
            })
        }
        if(error){
            toast.error("Product Created Failed",{
                theme:"dark",
                position:'bottom-center',
            })
        }
    },[isProductCreated,error,image,imagePreview])
    return (
        <Fragment>

            <div className="row">
                <div className="col-12 col-md-2">
                    <SlideBar />
                </div>
                <div className="col-12 col-md-10">
                    
                    <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e=>setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e=>setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control" id="description_field"
                                onChange={e=>setDescription(e.target.value)}
                                value={description}
                                 rows="8" ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                onChange={e=>setCategory(e.target.value)}
                                value={category}
                                 className="form-control" id="category_field">
                                    <option>Select</option>
                                    {
                                        categories.map(category=>(
                                            <option key={category} value={category}>{category}</option>
                                        ))
                                    }
                                    
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    onChange={e=>setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    onChange={e=>setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onImageChange}
                                        
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                            </div>


                            {
                                
                                imagePreview.map(image=>(

                                    <img className="mt-3 ms-3" key={image} src={image} width='50' height='50' alt={image}/>
                                ))
                            }
                            <br></br>
                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                            >
                                CREATE
                            </button>
                        </form>
                    </div>


                </div>
            </div>
        </Fragment>
    )
}