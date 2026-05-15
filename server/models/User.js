const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String ,required:true},
    isSubscribed:{type:Boolean, default:false},
    resetPasswordOTP: { type: String },
    resetPasswordExpires: { type: Date }
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)