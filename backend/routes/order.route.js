import express, { Router } from 'express'
import createOrder from '../controllers/order.controller.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',protect,createOrder)

export default router;
