const orderModel=require('../Model/orderModel')
const productModel=require('../Model/ProductModel')
const ErrorHandler=require('../Utils/ErrorHandler')
const catchAsyncErr=require('../MiddleWare/catchAsync')

exports.newOrder=catchAsyncErr(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        totalPrice,shippingPrice,taxPrice
    }=req.body;
    /*{
        shippingInfo,
        user:req.user.id,
        orderItems,
        totalPrice,shippingPrice,taxPrice,
        createdAt:Date.now(),
        paidAt:Date.now()
    }*/
    req.body.user=req.user.id
    const order=await orderModel.create(req.body)

    res.status(201).json({
        sucess:true,
        order
    })
})
exports.order=catchAsyncErr(async(req,res,next)=>{
    const id=req.params.id

    const order=await orderModel.findById(id);
    res.status(201).json({
        sucess:true,
        order
    })
})
exports.order=catchAsyncErr(async(req,res,next)=>{
    const id=req.params.id

    const order=await orderModel.findById(id).populate('user','name email')

    if(!order){
        return next(new ErrorHanler("Order Not Found",404))
    }

    res.status(201).json({
        sucess:true,
        order
    })
})
exports.myOrder=catchAsyncErr(async(req,res,next)=>{
   

    const order=await orderModel.find({user:req.user.id})

    if(!order){
        return next(new ErrorHanler("Order Not Found",404))
    }

    res.status(201).json({
        sucess:true,
        order
    })
})
exports.allOrders=catchAsyncErr(async(req,res,next)=>{
   

    const order=await orderModel.find()

    if(!order){
        return next(new ErrorHanler("Order Not Found",404))
    }

    res.status(201).json({
        sucess:true,
        order
    })
})
exports.getOrder=catchAsyncErr(async(req,res,next)=>{
    
    const {id}=req.params
    const order=await orderModel.findById(id)

    if(!order){
        return next(new ErrorHanler("Order Not Found",404))
    }

    res.status(201).json({
        sucess:true,
        
        order
    })
})
exports.updateOrder=catchAsyncErr(async(req,res,next)=>{
    const{id}=req.params
    const order=await orderModel.findById(id)
    if(!order){
        return next(new ErrorHandler("Order Not Found",404))
    }
    if((order.orderStatus=="Delivered")){
        return next(new ErrorHandler("order has been delivered",404))
    }
    order.orderItems.forEach(async orderItem=>{
        await stackUpdate(orderItem.product,orderItem.quantity)
    })
    order.shippingAt=Date.now()
    order.orderStatus=req.body.orderStatus
    await order.save()
    res.status(201).json({
        success:true,
        status:"update success",
        order
    })
    
})
async function stackUpdate(productId,quantity){
    const product=await productModel.findById(productId)
    product.stock=product.stock-quantity
    await product.save()
}
exports.deleteOrder=catchAsyncErr(async(req,res,next)=>{
    const id=req.params.id
    const order=await orderModel.findByIdAndDelete(id)
    res.status(200).json({
        success:true,
        status:'order deleted Successfully',
        order:order
    })

})
    