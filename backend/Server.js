const DatabaseConnection=require('./config/DatabaseConnection')
const app=require("./App")

const path=require("path")
const dotenv=require("dotenv")


DatabaseConnection()

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server start at ${process.env.PORT} in ${process.env.NODE_ENV}`);
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`)
    console.log('SHUT DOWN DUE TO UNHANDLED REJECTION')
    server.close(()=>{
        process.exit(1)
    })

})
process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`)
    console.log('SHUT DOWN DUE TO UNCAUGHT EXCEPTION')
    server.close(()=>{
        process.exit(1)
    })

})
