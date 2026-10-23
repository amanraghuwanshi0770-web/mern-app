
import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://mern-app-w353.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const loginUser = (data) =>
  api.post("/api/auth/login", data);

export const signupUser = (name, email, password) =>
  api.post("/api/auth/signup", {name,email,password});

export const forgetPassword = (email) =>
  api.post("/api/auth/forget-password",{email});

export const verifyResetOtp = (email,otp) =>
  api.post("/api/auth/verify-reset-otp",{email,otp});

export const resetPassword = (email,newPassword) =>
  api.post("/api/auth/reset-Password",{email,newPassword})

export const getProducts = () =>
  api.get("/api/products");

export const getprofile = () =>
  api.get("/api/profile");

export const updateprofile = (data) =>
  api.put("/api/profile", data);

export const createOrder = (data) =>
  api.post("/api/order", data);

export const createPaymentOrder = (data) =>
  api.post("/api/payment/create-order", data);

export const verifyPayment = (data) =>
  api.post("/api/payment/verify", data);

export const getMyOrders = () =>
  api.get("/api/order/my-orders");

export const verifySignupOtp = (email, otp) =>
  api.post("/api/auth/verify-signup-otp", { email, otp });

export default api;
