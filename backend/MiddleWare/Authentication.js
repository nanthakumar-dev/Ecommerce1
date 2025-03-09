const jwt=require('jsonwebtoken')
const ErrorHandler=require("../Utils/ErrorHandler")
const userModel=require("../Model/AuthModel")
exports.isAuthenticatedUser=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new ErrorHandler('Login First To Handle This Error',400))
    }
    const decoder=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await userModel.findOne({_id:decoder.id})
    next()
}
exports.AuthorizedRole=(...Role)=>{
    return (req,res,next)=>{
        if(!Role.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} Is Not Allowed `,401))
        }
        next()
    }
}