const DatabaseConnection=require('../config/DatabaseConnection')
const dotenv=require("dotenv")
const path=require("path")
const ProductData=require('../data/ProductData')
const ProductModel=require("../Model/ProductModel")

dotenv.config({path:'backend/config/config.env'})

DatabaseConnection()

const Seeder=async()=>{
    
    await ProductModel.deleteMany()
    console.log("Deleted Successfully")
 
    await ProductModel.insertMany(ProductData)

    console.log("Update Database Successfully")

    process.exit()
}
Seeder()
