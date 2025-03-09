const AuthJson=(statusCode,user,res)=>{
    const token=user.getJwtToken()
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_DATE*60*60*24*1000),
        httpOnly:true
    }
    res.cookie('token',token,options).status(statusCode).json({
        success:true,
        user,
        token
    })
}

module.exports=AuthJson