const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/user");
const User = require("./models/userModel")
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const products = require("./data/products");
const connectDb = require("./config/config");

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map(product => {
      return {...product, user: adminUser};
      // console.log(adminUser)
    })
    await Product.insertMany(sampleData);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
};

const dataDestory = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log(`data destory`);
        process.exit()
    }catch(error){
        console.log(`${error}`);
        process.exit(1)
    }
};


if(process.argv[2] === "-d"){
    dataDestory();
}else{
    importData();
}
