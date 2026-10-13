import express from "express";
import {createproduct,deleteProduct,getProducts, updateProducts,} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createproduct);
router.get("/", getProducts);
router.put("/:id",updateProducts)
router.delete("/:id",deleteProduct)

export default router;