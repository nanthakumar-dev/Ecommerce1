const express=require("express")
const {getproduct,newproduct,getsingleproduct,updateproduct,
    deleteproduct,reviews,allReviews,adminProduct}=require("../Controller/ProductController")
const {isAuthenticatedUser,AuthorizedRole}=require('../MiddleWare/Authentication')
const router=express.Router()
const multer=require('multer')
const path=require('path')
const uploads=multer({storage: multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../upload/product'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})

router.route("/product").get(getproduct)
router.route("/product/:id").get(getsingleproduct)


router.route("/product/review").post(isAuthenticatedUser,reviews)
router.route("/product/review/:id").get(allReviews)
//Admin Routes

router.route("/admin/product/new").post(isAuthenticatedUser,AuthorizedRole('admin'),uploads.array('images'),newproduct)
router.route("/admin/product").get(isAuthenticatedUser,AuthorizedRole('admin'),adminProduct)
router.route("/admin/product/:id").put(isAuthenticatedUser,AuthorizedRole('admin'),uploads.array('images'),updateproduct)
                            .delete(isAuthenticatedUser,AuthorizedRole('admin'),deleteproduct)

module.exports=router
