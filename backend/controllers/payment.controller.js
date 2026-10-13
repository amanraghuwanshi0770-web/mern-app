import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/order.modle.js";
import Product from "../models/product.modle.js";

const createPaymentOrder = async (req, res) => {
  try {
    const { items, address } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const product = await Product.findById(items[0].productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const quantity = items[0].quantity;
    const totalAmount = product.price * quantity;

    const order = await Order.create({
      user: req.userId,
      items: [
        {
          product: product._id,
          title: product.name,
          price: product.price,
          quantity,
        },
      ],
      totalAmount,
      address,
      paymentMethod: "ONLINE",
      paymentStatus: "Pending",
      status: "Pending",
    });

    const rzpOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
    });

    order.razorpayOrderId = rzpOrder.id;
    await order.save();

    res.status(201).json({
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
res.status(500).json({ message: error.message || "Payment start nahi ho paya" });  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id, user: req.userId },
      {
        paymentStatus: "Paid",
        status: "Placed",
        razorpayPaymentId: razorpay_payment_id,
      }
    );

    res.json({ message: "Payment successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment verify nahi ho paya" });
  }
};

export { createPaymentOrder, verifyPayment };