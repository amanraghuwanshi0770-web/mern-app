
import mongoose from "mongoose";

const pendingSignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  otpExpires: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

const PendingSignup = mongoose.model("PendingSignup", pendingSignupSchema);

export default PendingSignup
