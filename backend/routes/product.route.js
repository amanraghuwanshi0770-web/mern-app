import express from "express";
import {createproduct,deleteProduct,
    getProducts, updateProducts,getProductsByCategory} from "../controllers/product.controller.js";

const router = express.Router()

router.get("/", getProducts)
router.post("/", createproduct)
router.put("/:id",updateProducts)
router.delete("/:id",deleteProduct)
router.get("/category/:categoryId", getProductsByCategory);
export default router;