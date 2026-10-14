import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true,
        },
        title:String,
        price:Number,
        quantity:{
             type:Number,
             required:true,
             min:1
    },}],

    totalAmount:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:["COD","ONLINE"],
        default:"COD"
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,

    status:{
        type:String,
        enum:[ "Pending","Succes", "Shipped", "Delivered", "Cancelled"],
        default:"Succes"
    },
},{timestamps:true})

const Order = mongoose.model("Order",orderSchema)

export default Order