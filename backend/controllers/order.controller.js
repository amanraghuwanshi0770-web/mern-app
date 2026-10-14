
import Order from "../models/order.modle.js";
import Product from "../models/product.modle.js";

const createOrder = async (req, res) => {
  try {
    const { items, address, paymentMethod } = req.body;

    if (!items?.length || !address?.trim()) {
      return res.status(400).json({
        message: "Product and address are required",
      });
    }

    if (paymentMethod !== "COD") {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          message: "Invalid quantity",
        });
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      const price = Number(product.price);

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          message: "Invalid product price",
        });
      }

      orderItems.push({
        product: product._id,
        title: product.title || product.name,
        price,
        quantity,
      });

      totalAmount += price * quantity;
    }

    const order = await Order.create({
      user: req.userId,
      items: orderItems,
      totalAmount,
      address: address.trim(),
      paymentMethod: "COD",
      status:'Placed'
    });

    return res.status(201).json({
      message: "Order successfully placed",
      order,
    });
  } catch (error) {
      console.error("Order error:", error);
    return res.status(500).json({
      message: "Order create nahi hua",
    });
  }
};

 const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId,
    })
      .populate("items.product", "name image price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export {getMyOrders,createOrder}
