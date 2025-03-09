const express=require('express')
const {paymentProcess,sendPaymentApi}=require('../Controller/paymentController')
const router=express.Router()

router.route('/payment/process').post(paymentProcess)
router.route('/stripeapi').get(sendPaymentApi)

module.exports=router