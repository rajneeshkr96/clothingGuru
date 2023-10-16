
const connectDatabase = require("../config/dbConnect");
const Products = require("../../data/product.json")
const Product = require("../models/product");
const dotenv = require("dotenv");
dotenv.config({path:"../config/config.env"})
// connect to connectDatabase 
connectDatabase();

const seedproducts = async () => {
    try {
        await Product.deleteMany();
        console.log("all product deleted...")
        await Product.insertMany(Products)
        console.log("products created...")
        process.exit()
        
    } catch (error) {
        console.log(error.message)
        process.exit();
        
    }
  
}

seedproducts()


