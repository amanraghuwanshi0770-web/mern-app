import Category from "../models/category.modle.js";
import Product from "../models/product.modle.js";
import mongoose from "mongoose";

export const createCategory = async(req,res) => {
    try {
        const { name, parentCategory,image,slug }= req.body

        if(!name || !name.trim()){
            return res.status(400).json({
                success :false,
                message: "Category name is required",
            })
        }

        const parentId = parentCategory || null

        if(parentId){
            if(!mongoose.Types.ObjectId.isvalid(parentId)){
                return res.status(400).json({
                    success:false,
                    message:"invalid parsent category id",
                })
            }

        const parent = await Category.findById(parentId)
            if(!parent || parent.parentCategory){
                return res.status(400).json({
                    success:false,
                    message:"invalid parent category",
                })
            }
        }

        const categorySlug = (slug || name)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");

        const existing = await Category.findOne({
            $or: [
                { slug: categorySlug },
                { name: name.trim(), parentCategory: parentId }
            ]
        })

        if(existing){
            return res.status(400).json({
                success:false,
                message:"Category is already exists"
            })
        }

        const category = await Category.create({
            name: name.trim(),
            slug:categorySlug,
            image: image || "",
            parentCategory:parentCategory || null,
        })

        res.status(201).json({
            success:true,
            message: "category created successfully",
            category,
        })
    } catch (error){
        console.log("create category error", error)
        res.status(500).json({
        success:false,
        message:"faild to created category"
    })
  }
}  


export const getAllCategories = async(req,res)=>{
    try {
        const categories = await Category.find({
            isActive : true,
        }).sort({createdAt : -1})

        return res.status(200).json({success :true,
            categories,
         })
    } catch (error) {
        console.log("get categories error:", error)
        res.status(500).json({
            success:false,
            message:"falid to fetch categroies"
        })
    }
}

export const getMainCategories = async (req,res) => {
    try {
        const categories = await Category.find({
            parentCategory:null,
            isActive: true,
        }).sort({createdAt: -1})

        return res.status(200).json({
            success :true,
            categories,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"failed to fatch main categories"
        })
    }
}

export const  getSubCategories = async (req,res) => {
    try {
        const {categoryId} = req.params

        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(400).json({
                success:false,
                message:"invalid category id",
            })
        }
        const SubCategories =  await Category.find({
            parentCategory:categoryId,
            isActive:true,
        }).sort({createdAt : -1})

        return res.status(200).json({
            success:true,
            SubCategories,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch subcategories"
        })
    }
}

export const updateCategory = async (req,res) => {
    try {
        const { id } = req.params
        const {name , slug , image ,isActive} = req.body

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success:false,
                message:"invalid category id"
            })
        }
        
        const category = await Category.findById(id)
        if(!category){
            return res.status(404).json({
                success:false,
                message:"category not found"
            })
        }

        if(name !== undefined){
            if(!name.trim()){
                return res.status(400).json({
                    success:false,
                    message:"category name cannot be empty",
                })
            }
            category.name = name.trim()
        }

        if(slug !== undefined){
            category.slug = slug.trim().toLowerCase().replace(/\s+/g, "-");
        }

        if (image !== undefined) category.image = image;
        if (isActive !== undefined) category.isActive = isActive;

        await category.save();
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "failed to update caterogy",
            error:error.message
        })
    }
}

export const deleteCategory = async(req,res) => {
    try {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID",
            });
        }
       
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({
                success:false,
                message : "category not found"
            })
        }

        const subcategories = await Category.find({
            parentCategory:id,
        })
         const categoryIds = [
            id,
            ...subcategories.map((item) => item._id),
        ];

        const linkedProducts = await Product.exists({
            category: { $in: categoryIds },
        });

        if (linkedProducts) {
            return res.status(409).json({
                success: false,
                message: "Category has linked products. Reassign products before deleting.",
            });
        }

        if (subcategories.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Delete or move subcategories before deleting this category.",
            });
        }

        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "falid to delete category",
            error : error.message,
        })
    }
}
