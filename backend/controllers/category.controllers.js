import Category from "../models/category.modle";

const createCategory =  async (req,res) => {
    try {
        const {name, parentCategory} = req.body
        if(!name){
            return res.status(400).json({
                message:'category name is required'
            })
        }

        const slug = name.toLowerCase().trim().replace(/\s+/g, "-")
        const existingCategory = await Category.findOne({ slug })

        if(existingCategory){
            return res.status(400).json({
                message:"category already exists"
            })
        }

        const category = await Category.create({
            name,
            slug,
            parentCategory:parentCategory || null,
            image : req.file 
            ? `/uploads/${req.file.filename}`
            : ""
        })

        res.status(201).json({
            message : 'category created succssfully',
            category
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

const getAllCategory = async (req,res) => {
    try {
        const categories = await Category.find()
        .populate("parentCategory","name")

        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getMainCategory = async (req,res) => {
    try {
        const categories = await Category.find({
            parentCategory: null
        })
        return res.status(200).json(categories)  

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getSubCategory = async (req,res) => {
    try {
        const categories = await Category.find({
            parentCategory:req.params.categoryId
        })
        res.status(200).json({
            success : true,
            categories
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


 const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate("parentCategory", "name");

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      })
    }

    res.status(200).json({
      success: true,category
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


const updateCategory = async (req,res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )

        if(!category){
            return res.status(404).json({
            message:"category not found"
          })
        }

        res.status(200).json({
            message:"category update",
            category
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteCategory = async (req,res) => {
    try {
        const category = await Category.findByIdAndDelete(
            req.params.id
        )
        if(!category){
            return res.status(404).json({
                message:"category not found"
            })
        }

        res.status(200).json({
            message:"category deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export {createCategory,getAllCategory,
    getMainCategory,updateCategory,
    deleteCategory,getSubCategory,getCategoryById}