import express from 'express'

import {createCategory,getAllCategory,
    getMainCategory,updateCategory,
    deleteCategory,getSubCategory,getCategoryById} 
    from '../controllers/category.controllers.js'

import protect from '../middleware/authMiddleware.js'
import adminOnly from '../middleware/adminOnly.js'
// import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get("/", getAllCategory)
router.get("/main", getMainCategory)
router.get("/:categoryId/subcategories", getSubCategory)
router.get("/:id", getCategoryById)

router.post("/", protect, adminOnly, /*upload.single("image")*/ createCategory)

router.put("/:id", protect, adminOnly, /*upload.single("image")*/ updateCategory)

router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;