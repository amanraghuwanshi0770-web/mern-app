import express from 'express'
import {createOrder,getMyOrders} from '../controllers/order.controller.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',protect,createOrder)
router.get("/my-orders",protect,getMyOrders)

export default router;
