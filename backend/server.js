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
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-app-seven-ochre.vercel.app",
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : []),
];

app.use(cors({
  origin: (origin, cb) => {
    // origin undefined = Postman/server-to-server, allow
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
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