const Product = require("../models/productModel")
const aysnchandler = require("express-async-handler")

const getProducts =  aysnchandler (async(req,res)=>{
        const products = await Product.find({})
        // throw new Error("some app")
        res.json(products);
    })

const getProduct =   aysnchandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)  
    if(product){
     res.json(product)
    }else{
     res.status(404).json({message:"product not found"})
    }
 })

 module.exports =  {getProduct,getProducts}