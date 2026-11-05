import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

import {createCategory,getAllCategories,getMainCategories,
    getSubCategories,updateCategory,deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/main", getMainCategories);
router.get("/:categoryId/subcategories", getSubCategories);


router.post("/", protect, adminOnly, createCategory);
router.put("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
