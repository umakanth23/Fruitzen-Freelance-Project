import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name:{type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    cartData :{
        type:Object,
        default:{}
    }

},{minimize:false})  

// we added, minimize:false, so that , we are allowed to create userdata with emptyCartData also.

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;