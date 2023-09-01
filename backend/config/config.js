const mongoose = require("mongoose")
require("colors")

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        });
        console.log(`Mongo DB connected ${conn.connection.host}`.inverse.grey)
    }catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1);
    }
}

module.exports=connectDb;
