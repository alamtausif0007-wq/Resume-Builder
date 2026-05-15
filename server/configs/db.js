const mongoose=require("mongoose");
const connectdb=async()=>{
try {
    const db=await mongoose.connect(process.env.MONGO_URI);
    if(db){
        console.log("Mongo db connected");
        
    }else{
        console.log("Mongo db not connected");
    }
} catch (error) {
    console.log("Mongo db Connection Failed",error);
}
}
module.exports=connectdb