import 'dotenv/config.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import crypto from 'crypto';
import transporter from '../config/nodemailer.js';


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', 
  })}

   const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' })}

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })}

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
      message: 'Password must be at least 6 characters and include a letter, number, and special character.' })}

    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' })}

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, 
    })  

    return res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      }})

  } catch (error) {
    console.error('Signup error:', error.message);
    return res.status(500).json({ message: 'Something went wrong. Please try again.'});
  }}



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })}

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      message: 'Login successfull',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: 'Something went wrong. Please try again.'})}
};


export const forgetpassword = async (req,res) => {
  try {
    const { email } = req.body

    if(!email){
      return res.status(400).json({
        message:"please enter your email",
      })
    }
    const user = await User.findOne({
      email:email.trim().toLowerCase()
    })

    if(!user){
      return res.status(200).json({
        message : "if the email is registered, an otp will be sent",
      })
    }
    const otp = crypto.randomInt(100000,1000000).toString()
    const otphash = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex")

    user.resetOtpHash = otphash
    user.resetOtpExpires = new Date(Date.now() + 5 * 60 * 1000)
    user.resetOtpVerified = false

    await user.save()
  
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset OTP",
        text: `Your password reset OTP is ${otp}. It expires in 5 minutes. Do not share it with anyone.`,
      })
    }catch(emailerror){
      user.resetOtpHash = null;
      user.resetOtpExpires = null;
      user.resetOtpVerified = false;
      await user.save();

      throw emailerror
    }
    return res.status(200).json({
      message:"if the email is registered ,an otp will be sent.."
    })
  } catch (error) {
    console.error("Forgot password error",error.message);

    return res.status(500).json({
      message : "unable to sand otp. please try again",
    })
  }
}

export const verifyResetOtp = async (req,res) => {
  try {
    const {email, otp} = req.body
    if(!email || !otp){
      return res.status(400).json({
        message:"email and otp are required",
      })
    }

    const user = await User.findOne({
      email : email.trim().toLowerCase(),
    })

    if(!user || 
      !user.resetOtpHash || 
      !user.resetOtpExpires ||
      user.resetOtpExpires.getTime() < Date.now()
      ){
        return res.status(400).json({
          message:"invaild or expired otp"
        })
      }

      const otphash = crypto 
      .createHash("sha256")
      .update(String(otp))
      .digest("hex")

      if(otphash !== user.resetOtpHash){
        return res.status(400).json({
          message:"invalid or expired otp",
        })
      }

      user.resetOtpVerified = true
      await user.save()

      return res.status(200).json({
        message : "otp verified successfully",
      })
  } catch (error) {
    console.error("otp verification error", error.message);
    
    return res.status(500).json({
      message : "something went wrong , plz try again",
    })
  }
}

export const resetPassword = async(req,res) => { 
   try {
    const {email , newPassword} = req.body

    if(!email || !newPassword){
      return res.status(400).json({
        message : "email and new password are required",
      })
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;

    if(!passwordRegex.test(newPassword)){
      return res.status(400).json({
        message:"password must be at least 6 characters and include a letter, number, and special character",
      })
    }
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    })

    if(
      !user || 
      !user.resetOtpVerified ||
      !user.resetOtpExpires ||
      user.resetOtpExpires.getTime() < Date.now()
    ){
      return res.status(400).json({
        message: "plz verify a valid otp first"
      })
    }
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword,salt)

    user.resetOtpHash = null
    user.resetOtpExpires = null
    user.resetOtpVerified = false

    await user.save()
     return res.status(200).json({
      message:"password reset successfully. please login",
     })
    }catch (error) {
      console.error("reset password error:",error.message);

      return res.status(500).json({
        message: "unable to reset password , please try again"
      })      
  }}
