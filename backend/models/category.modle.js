import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    image:{
        type: String,
        default: "",
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:null,
    },
    isActive:{
        type:Boolean,
        default:true
    },
  },
  {timestamps:true}
)

const Category = mongoose.model("Category",categorySchema)

export default Category
