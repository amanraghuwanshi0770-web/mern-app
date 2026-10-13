import express from 'express'
import protect from '../middleware/authMiddleware.js'
import {getprofile, updateprofile} from '../controllers/profile.controller.js'

const router = express.Router()

router.get('/',protect,getprofile)
router.put('/',protect,updateprofile)

export default router