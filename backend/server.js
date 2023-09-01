const express = require("express")
require("colors")
const products = require("./data/products")
const dotenv = require("dotenv")
const connectDb = require("./config/config")
const productRoutes = require("./routes/productsRoutes")
const {errorHandler} = require("./middlewares/errorMiddleware")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")
// const cors = require("cors");

// dotenv config
dotenv.config();

// connecting to mongodb database
connectDb();
const app = express()

// middleware bodyparser
app.use(express.json())

app.get("/", (req,res)=>{
    res.send(`<h1>welcome to node server<h1>`);
})

app.use("/api",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})


app.use(errorHandler)


const PORT = 8080;
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server running in ${process.env.NODE_ENV} Mode on port ${process.env.PORT} `.inverse)
})
