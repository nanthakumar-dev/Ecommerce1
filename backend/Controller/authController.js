const userModel=require("../Model/AuthModel")
const ErrorHandler=require('../Utils/ErrorHandler')
const catchAsyncErr=require('../MiddleWare/catchAsync')
const AuthJson=require("../Utils/AuthJson")
const SendMail=require("../Utils/SendMail")
const crypto=require('crypto')

exports.registerUser=catchAsyncErr(async(req,res,next)=>{

    const {name,email,password,role}=req.body;
    let avatar;  
    let BASE_URL=process.env.BACKEND_URL
        if(process.env.NODE_ENV=='production'){
            BASE_URL=`${req.protocol}://${req.get('host')}`
        }
    if(req.file){
        console.log('file')
        avatar=`${BASE_URL}/upload/images/${req.file.originalname}`
    }
    const user=await userModel.create({
        name,email,password,avatar,role
    })
    if(!user){
        return next(new ErrorHandler('User Not Found',400))
    }
    
    AuthJson(201,user,res)

})
exports.loginUser=catchAsyncErr(async(req,res,next)=>{

    const {email,password}=req.body;

    if(!email || !password){
        return next(new ErrorHandler('Email or Password Not Found',400))
    }

    const user=await userModel.findOne({email}).select('+password')
    
    if(!user){
        return next(new ErrorHandler('Email Not Found',401))
    }
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Password Does Not Found',401))
    }
    const token=user.getJwtToken()

    AuthJson(201,user,res)
    

})
exports.logoutUser=catchAsyncErr(async(req,res,next)=>{

    res.cookie('token',null,{expires:new Date(Date.now()),httpOnly:true}).json({
        success:true,
        message:'Logout successully'
    })

})
exports.forgotUser=catchAsyncErr(async(req,res,next)=>{
    const{email}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return next(new ErrorHandler('Email Not Found',401))
    }
    const resetToken=user.getResetToken()

    resetUrl=`http://localhost:8000/api/v1/password/forgot/${resetToken}`
    const message=`Passwod Recovery Url Is Show At Bottom Click to Change Password
     \n \n Password Recovery Url : \n ${resetUrl} \n \n You Have Not To Change Password , You Can Skip It... `;
    console.log("All Token:",resetToken)
     //Message Send
     user.restPasswordToken=resetToken
     user.restPasswordTokenExpires=Date.now()*30*60*
     await user.save({validateBeforeSave:false})

    try{
        /*
        SendMail({
            email:user.email,
            sub:'Recovery Password',
            message,
        })
        */
        res.status(201).json({
            sucess:true,
            message:'Message Send Successully'
        })
    }catch{
        user.restPasswordToken=undefined
        user.restPasswordTokenExpires=undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler('Email Not Send Message',401))
    }


})

exports.resetPasswordUser=catchAsyncErr(async(req,res,next)=>{
    const{password,conformPassword}=req.body
    
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log("reset 1",req.params.token)
    console.log("reset 2",resetPasswordToken)
    const user=await userModel.findOne(
        {
        resetPasswordToken
        })
    if(!user){
        return next(new ErrorHandler('User Not Found',401))
    }
    if(password!==conformPassword){
        return next(new ErrorHandler('Password Does Not Match',401))
    }
    user.password=password
    user.restPasswordToken=undefined
    user.restPasswordTokenExpires=undefined
    await user.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        status:"Password Changes Successfully",
        user
    })

})
exports.myProfile=catchAsyncErr(async(req,res,net)=>{
    const user=await userModel.findOne({_id:req.user.id})

    if(!user){
        return next(new ErrorHandler('User Not Found',401))
    }
    res.status(200).json({
        sucess:true,
        status:'My Profile Get Successfully',
        user
    })
})
exports.changePassword=catchAsyncErr(async(req,res,next)=>{
    const{oldPassword,password}=req.body
    const user=await userModel.findOne({_id:req.user.id}).select('+password')

    if(!user){
        return next(new ErrorHandler('User Not Found',401))
    }
    if(!await user.isValidPassword(oldPassword)){
        return next(new ErrorHandler('OldPassword Does Not Match',401))
    }
    user.password=password
    await user.save()
    res.status(200).json({
        sucess:true,
        status:'Password Change Successfully',
        user
    })
})
exports.editProfile=async(req,res,net)=>{
    let data={
        name:req.body.name,
        email:req.body.email
    }
    const user=await userModel.findOne({_id:req.user.id})
    let avatar
    let BASE_URL=process.env.BACKEND_URL
        if(process.env.NODE_ENV=='production'){
            
            BASE_URL=`${req.protocol}://${req.get('host')}`
        }
       
    if(req.file){
        avatar=`${BASE_URL}/upload/images/${req.file.originalname}`
        data={...data,avatar:avatar}
    }
    if(!user){
        return next(new ErrorHandler('User Not Found',401))
    }
    
    user.name=data.name
    user.email=data.email
    user.avatar=avatar
    await user.save()
    res.status(200).json({
        sucess:true,
        status:'Edit Profile Successfully',
        user
    })
}
exports.getAllUsers=async(req,res,next)=>{
    const user=await userModel.find()
    if(!user){
        return next(new ErrorHandler('User Not Found',401))
    }
    res.status(200).json({
        sucess:true,
        status:'Get All User successfully',
        user
    })

}
exports.getlUser=catchAsyncErr(async(req,res,next)=>{
    
    const user= await userModel.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler('User Not Found',401))
    }
    res.status(200).json({
        sucess:true,
        status:'Get Single User successfully',
        user
    })
})
exports.updateUser=catchAsyncErr(async(req,res,next)=>{
    const {id}=req.params
    const user=await userModel.findByIdAndUpdate(id,req.body,{new:true})
    if(!user){
        return next(new ErrorHandler('User Not Found',401))
    }
    res.status(200).json({
        sucess:true,
        status:'Update successfully',
        user
    })

})
exports.deleteUser=catchAsyncErr(async(req,res,next)=>{
    const {id}=req.params
    const user=await userModel.findByIdAndDelete(id)
    if(!user){
        return next(new ErrorHandler('User Not Found',401))
    }
    res.status(200).json({
        sucess:true,
        status:'Deletes successfully',
        user
    })

})