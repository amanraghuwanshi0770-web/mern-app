
import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
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
  api.post("/api/auth/signup", {
    name,
    email,
    password,
  });

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

export default api;
