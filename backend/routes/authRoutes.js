import express from 'express';
import { signup, login, forgetpassword, verifyResetOtp, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post("/forget-password",forgetpassword)
router.post("/verify-reset-otp",verifyResetOtp)
router.post("/reset-password",resetPassword)


export default router;
