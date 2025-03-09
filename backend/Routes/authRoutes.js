const express=require('express')
const router=express.Router()
const path=require('path')
const multer =require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','/upload/images'))
    },
    filename:function(req,file,cb){
    
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:storage
})

const {registerUser,loginUser,
    logoutUser,forgotUser,
    resetPasswordUser,myProfile,
    changePassword,editProfile,
    getAllUsers,getlUser,updateUser,deleteUser

}=require('../Controller/authController')

const {isAuthenticatedUser,AuthorizedRole}=require('../MiddleWare/Authentication')

router.route('/register').post(upload.single('avatar'),registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/password/forgot').post(forgotUser)
router.route('/password/reset/:token').post(resetPasswordUser)

//User Routes
router.route('/myprofile').get(isAuthenticatedUser,myProfile)
router.route('/password/change').put(isAuthenticatedUser,changePassword)
router.route('/update').put(isAuthenticatedUser,upload.single('avatar'),editProfile)

//Admin Routes

router.route('/admin/users').get(isAuthenticatedUser,AuthorizedRole('admin'),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,AuthorizedRole('admin'),getlUser)
                               .put(isAuthenticatedUser,AuthorizedRole('admin'),updateUser)
                                .delete(isAuthenticatedUser,AuthorizedRole('admin'),deleteUser)




module.exports=router