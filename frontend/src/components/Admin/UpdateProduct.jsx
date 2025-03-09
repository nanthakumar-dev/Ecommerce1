import { Fragment,useState,useEffect } from "react";
import SlideBar from "./slideBar";
import {clearProductUpdated,clearError} from "../../Slice/productSlice"
import {adminProductUpdate,productActions} from "../../Actions/productActions"
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function UpdatedProduct() {
    const {isProductUpdated,error,product}=useSelector(state=>state.productState)
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [description,setDescription]=useState('')
    const [category,setCategory]=useState([])
    const [stock,setStock]=useState('')
    const [seller,setSeller]=useState('')
    const [image,setImage]=useState([])
    const [imagePreview,setImagePreview]=useState([])
    const [isClearImage,setIsClearImage]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {id}=useParams()
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
        formData.append('isClearImage',isClearImage)
        image.forEach(img=>{
            formData.append('images',img)
        })
        dispatch(adminProductUpdate(id,formData))
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
            if(isProductUpdated){
                toast.success("Product Updated Successfully",{
                    theme:"dark",
                    position:'bottom-center',
                    onOpen:()=>{clearProductUpdated()}
                })
            }
            if(error){
                toast.error("Product Created Failed",{
                    theme:"dark",
                    position:'bottom-center',
                    onOpen:()=>{
                        dispatch(clearError())
                    }
                })
            }
            
            dispatch(productActions(id))
        },[dispatch,isProductUpdated,error])
        useEffect(()=>{
            if(product._id){
                setName(product.name)
                setPrice(product.price)
                setDescription(product.description)
                setCategory(product.category)
                setStock(product.stock)
                setSeller(product.seller)
                let images1=[]
                product.images.forEach(img=>{
                    images1.push(img.image)
                })
                setImagePreview(images1)
                

            }
        },[product])
    
    function deleteImage(){
        setImage([])
        setImagePreview([])
        isClearImage(true)
    }
    return (
        <Fragment>

            <div className="row">
                <div className="col-12 col-md-2">
                    <SlideBar />
                </div>
                <div className="col-12 col-md-10">
                    
                    <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4">Update Product</h1>

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


                            {imagePreview.length>0&&(
                                <span > <i className="fa fa-trash" onClick={deleteImage}></i></span>
                            )}
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