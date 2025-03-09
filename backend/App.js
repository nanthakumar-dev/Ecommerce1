const express = require("express");
const app=express()
const path=require('path')
const dotenv=require('dotenv')
dotenv.config({path:path.join(__dirname,'config/config.env')})

const cookieParser = require("cookie-parser");
const Products=require("./Routes/ProductRoutes")
const ErrorMidddleware =require('./MiddleWare/Error')
const auth=require('./Routes/authRoutes')
const order=require('./Routes/orderRoutes')
const payment=require('./Routes/paymentRoutes')
const cors=require('cors')
app.use(express.json())
app.use(cors())

app.use(cookieParser())
app.use('/upload',express.static(path.join(__dirname,'upload')))
app.use('/api/v1',Products)
app.use('/api/v1',auth)
app.use('/api/v1',order)
app.use('/api/v1',payment)

if(process.env.NODE_ENV==='production'){
    console.log("Good")
    app.use(express.static(path.join(__dirname,'../frontend/dist')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/dist/index.html'))
    })
}

app.use(ErrorMidddleware)

module.exports=app