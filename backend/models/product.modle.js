import mongoose, { Mongoose } from "mongoose";

const productSchmea = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category", 
        required:true,
    },
    description:{
         type:String,
        required:true,
    },
    image:[{
        type:String,
        required:true,
    }],  
    stock:{
        type:Number,
        required:true,
        default:0,
    },
  },{timestamps:true}
)

const Product = mongoose.model("Product",productSchmea)

export default Product