import {Link} from 'react-router-dom'
export default function Product ({product,col}){
    
    return (
        <>
            <div className={`col-sm-12 col-md-${col} col-lg-3 my-3`}>
                <div className="card p-3 rounded">
                    
                    <img
                    className="card-img-top mx-auto"
                    src={product.images[0].image}
                    />
                    
                    <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                    
                        <div className="rating-outer">
                            <div className="rating-inner" style={{width:`${product.rating[0]+2*20}%`}}>
                                
                            </div>
                        </div>
                        
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text">${product.price}</p>

                    <Link type="button" to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}