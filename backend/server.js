import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import ProductRoutes from "./routes/product.route.js";
import profileRoutes from  "./routes/profile.route.js"
import orderRoutes from "./routes/order.route.js"
import paymentRoutes from "./routes/payment.route.js"
import checkoutRoutes from "./routes/order.route.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/profile",profileRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/payment",paymentRoutes)
app.use("/api/checkout",checkoutRoutes)

app.get("/", (req, res) => {
  res.send("MERN Auth Backend is running...");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on :${PORT}`);
});