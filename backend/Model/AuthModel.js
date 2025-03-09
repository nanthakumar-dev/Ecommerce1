const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const validator=require('validator')
const bcrypt=require('bcrypt')
const crypto=require('crypto')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Name"],
        unique:true,
        validate:[validator.isEmail,"Enter your Email in Correct Format"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxlength:[6,'password cannot exceed 6 characters'],
        select:false
    },
    role:{
        type:String,
        default:'user'
    },
    avatar:{
        type:String
    },
    resetPasswordToken:{type:String},
    resetPasswordTokenExpires:{type:String},
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_DATE})
}
userSchema.methods.isValidPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.getResetToken=function(enteredPassword){
    const token=crypto.randomBytes(20).toString('hex');
    console.log("Token:",token)
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
    console.log("ResetToken:",this.resetPasswordToken)
    this.resetPasswordTokenEpires=Date.now()*30*60*1000
    return token
}

let userModel=mongoose.model('user',userSchema)

module.exports=userModel