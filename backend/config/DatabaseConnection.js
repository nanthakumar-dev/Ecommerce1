const mongoose= require("mongoose")
const dotenv=require("dotenv")
const path=require("path")
dotenv.config({path:path.join(__dirname,'config.env')})

const DatabaseConnection=()=>{
    mongoose.connect(`${process.env.CONNECTION_STRING}`).then((con)=>{
    console.log(`MONGODB DATABASE CONNECTED ${con.connection.host}`);
}).catch((err)=>{
    console.log(err);
})
}
module.exports=DatabaseConnection