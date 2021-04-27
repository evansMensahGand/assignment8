import mongoose from "mongoose";


mongoose.connect(process.env.MONGODB_URI, {
   useCreateIndex:true,
   useFindAndModify: false,
   useNewUrlParser:true,
   useUnifiedTopology:true,

 })
 .then(()=>console.log("Database is connected successfully"))
 .catch((err)=>console.log(err.message));
