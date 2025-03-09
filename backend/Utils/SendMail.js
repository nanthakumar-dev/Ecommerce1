const nodemailer=require("nodemailer")
const SendMail=(options)=>{
    const transportOptions={
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    }
    const transport=nodemailer.createTransport(transportOptions)

    const message={
        from:process.env.SMTP_NAME,
        to:options.email,
        subject:options.sub,
        text:options.message,
    }

    transport.sendMail(message)

}
module.exports=SendMail