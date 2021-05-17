const mongoose = require("mongoose");


const connectDB = async ()=> {
  await mongoose.connect(process.env.MONGODB_URI, {
   useCreateIndex:true,
   useFindAndModify: false,
   useNewUrlParser:true,
   useUnifiedTopology:true,

 });
 console.log("MongoDB connected successfully");
//  .then(()=>console.log("Database is connected successfully"))
//  .catch((err)=>console.log(err.message));

};

module.exports= connectDB;