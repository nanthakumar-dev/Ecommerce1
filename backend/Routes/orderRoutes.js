const express=require("express");
const router=express.Router()
const {newOrder,order,myOrder,allOrders,getOrder,updateOrder,deleteOrder}=require('../Controller/orderController')
const {isAuthenticatedUser,AuthorizedRole}=require('../MiddleWare/Authentication')

router.route('/order/new').post(isAuthenticatedUser,newOrder)
router.route('/order/:id').get(isAuthenticatedUser,order)
router.route('/myorder').get(isAuthenticatedUser,myOrder)

//Admin Routes
router.route('/admin/orders').get(isAuthenticatedUser,AuthorizedRole('admin'),allOrders)
router.route('/admin/order/:id').get(isAuthenticatedUser,AuthorizedRole('admin'),getOrder)
                                .put(isAuthenticatedUser,AuthorizedRole('admin'),updateOrder)
                                .delete(isAuthenticatedUser,AuthorizedRole('admin'),deleteOrder)


module.exports=router