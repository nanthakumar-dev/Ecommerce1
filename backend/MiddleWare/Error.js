const ErrorHandler =require('../Utils/ErrorHandler')

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    if(process.env.NODE_ENV=='development'){
        
    res.status(err.statusCode).json({
        success:false,
        message:err.message 
        
    })

    }
    if(process.env.NODE_ENV=='production'){
        let message=err.message
        let error=new Error(message)
        if(err.name=='ValidationError'){
            message=Object.values(err.errors).map(value=>value.message)
            error=new Error(message)
        }
        if(err.name=='CastError'){
            message="Resource not found"
            error=new Error(message)
        }
        
        res.status(err.statusCode).json({
            success:false,
            message:error.message || "Internal server Error"
        })
        
    }

}
   