const ProductModel=require("../Model/ProductModel")
const ErrorHandler =require('../Utils/ErrorHandler')
const catchAsync=require('../MiddleWare/catchAsync')
const ApiFeatures=require('../Utils/ApiFeatures')

exports.getproduct=async(req,res)=>{
    const perPage=3;
    
    const buildQuery=()=>{
        return new ApiFeatures(ProductModel.find(),req.query).search().filter()
    }
    const output=await buildQuery().query
    let filterProductCount=await buildQuery().query.countDocuments({})
    let totalProductCount=await ProductModel.countDocuments({})
    let productCount=totalProductCount
    if(totalProductCount !== filterProductCount){
        productCount=filterProductCount
    }
    const product=await buildQuery().paginate(perPage).query;
    res.status(201).json({
        success:true,
        perPage:perPage,
        count:productCount,
        product
    })

}

exports.newproduct=catchAsync(async(req,res,next)=>{
        req.body.user=req.user._id;
        let images=[]
        let BASE_URL=process.env.BACKEND_URL
        if(process.env.NODE_ENV=='production'){
            BASE_URL=`${req.protocol}://${req.get('host')}`
        }
        if(req.files.length >0){
            console.log("req.Files : ",req.files)
            req.files.forEach(file=>{
                let url=`${BASE_URL}/upload/product/${file.originalname}`
                images.push({image:url})
            })
        }

        req.body.images=images
        const product=await ProductModel.create(req.body);
        
        res.status(201).json({
            success:true,
            product
        })
    
    
})

exports.getsingleproduct=async(req,res,next)=>{
    
        const product=await ProductModel.findById(req.params.id).populate('reviews.user','name email');
        
        if(!product){
            return next(new Error('Product Not Found',401))
        }

        res.status(201).json({
            success:true,
            product
        })
}
exports.updateproduct=async(req,res)=>{
    try{
        let product=await ProductModel.findById(req.params.id);
        let image=[]
        if(req.body.isClearImage==false){
            image=product.images
        }
        let BASE_URL=process.env.BACKEND_URL
        if(process.env.NODE_ENV=='production'){
            BASE_URL=`${req.protocol}://${req.get('host')}`
        }
        if(req.files.length>0){
            req.files.forEach(file=>{
                image.push({image:`${BASE_URL}/upload/product/${file.originalname}`})
            })
        }
        req.body.images=image

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product Not Found"
            })
        }
        product=await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidator:true})
        res.status(201).json({
            success:true,
            product
        })
    }
    catch(error){
        res.status(505).json({success:false,message:error.message})
    }
}
exports.deleteproduct=async(req,res)=>{
    try{
        let product=await ProductModel.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product Not Found"
            })
        }
        product=await ProductModel.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success:true,
            message:"Deleted Successfully",
            product
        })
    }
    catch(error){
        res.status(505).json({success:false,message:error.message})
    }
}

exports.reviews=async(req,res)=>{
    const {productId,rating,comment}=req.body
    const product=await ProductModel.findById(productId)
    const review={user:req.user.id,comment,rating}
    const isReviewed=product.reviews.find((review)=>{
        return review.user.toString()==req.user.id.toString()
    });
    if(isReviewed){
        product.reviews.forEach((review)=>{
            if(review.user.toString()==req.user.id.toString()){
                review.rating=rating
                review.comment=comment
                
            }
        })
    }
    else{
        product.reviews.push(review)
        product.numOfReviews=product.reviews.length
    }
    product.rating=product.reviews.reduce((acc,review)=>acc+review.rating,0)/product.reviews.length
    product.rating=isNaN(product.rating)?0:product.rating

    await product.save()
    
    
    res.status(201).json({
        success:true,
        product
    })

}
exports.allReviews=async(req,res)=>{
    console.log(req.query.id)
    const product=await ProductModel.findById(req.query.id);
    res.status(201).json({
        success:true,
        product
    })
}
exports.adminProduct=async(req,res)=>{
    const product=await ProductModel.find();
    res.status(201).json({
        success:true,
        product
    })
}