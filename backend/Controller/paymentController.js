const stripe=require('stripe')(process.env.STRIPE_SECRET)
const catchAsyncErr=require('../MiddleWare/catchAsync')
console.log(process.env.STRIPE_SECRET)
exports.paymentProcess=catchAsyncErr(async(req,res,next)=>{
  const paymentIntent=await stripe.paymentIntents.create({
    amount:req.body.amount,
    currency:'usd',
    description:"Test Description",
    shipping:req.body.shipping
  })  
  res.status(200).json({
    success:true,
    client_secret:paymentIntent.client_secret
,
  })
})
exports.sendPaymentApi=catchAsyncErr(async(req,res,next)=>{
    
    res.status(200).json({
        apiKey:process.env.STRIPE_API
    })
})