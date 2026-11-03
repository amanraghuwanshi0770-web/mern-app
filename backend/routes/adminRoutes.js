import express from "express"

import protect from '../middleware/authMiddleware.js'
import adminOnly from "../middleware/adminOnly.js"
import { getAdminDashboard,getAllOrders,getAllUsers } from "../controllers/adminController.js"

const router = express.Router()

router.get("/dashboard", protect, adminOnly, getAdminDashboard)
router.get("/users", protect, adminOnly, getAllUsers)
router.get("/orders", protect, adminOnly, getAllOrders)

export default router
