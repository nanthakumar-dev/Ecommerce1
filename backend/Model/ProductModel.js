const mongoose =require("mongoose")

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please enter Product Name"],
        maxLength:[100,"product name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        dafault:0.0
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        default:0
    },
    images:[
        {
            image:{
                type:String,
                required:true
            },
        }
    ],
    category:{
        type:String,
        enum: {
            values: [
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
            ],
            message : "Please select correct category"
        }
    },
    seller:{
        type:String,
        required:true,
        maxLength:20
    },
    stock:{
        type:Number,
        required:true

    },
    numOfReviews:{
        type: Number,
        default:0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
    
})

const ProductModel=mongoose.model('product',ProductSchema);

module.exports=ProductModel