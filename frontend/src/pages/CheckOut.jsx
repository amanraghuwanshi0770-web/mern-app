import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder, createPaymentOrder, verifyPayment } from "../api/api";

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("ONLINE");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState(false);

  if (!product) return <p>Product not found</p>;

  const image = Array.isArray(product.image) ? product.image[0] : product.image;
  const items = [{ productId: product._id, quantity: 1 }];

  const success = (text) => {
    setPlaced(true);
    setMessage({ text, type: "success" });
  };
  const fail = (text) => setMessage({ text, type: "error" });

  const payCOD = async () => {
    await createOrder({ items, address: address.trim(), paymentMethod: "COD" });
    success("Order successfully placed!");
  };

  const payOnline = async () => {
    if (!window.Razorpay) {
      throw new Error("Razorpay script load nahi hua. Page refresh karo.");
    }

    const { data } = await createPaymentOrder({ items, address: address.trim() });

    const rzp = new window.Razorpay({
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "My Shop",
      description: product.title || product.name,
      order_id: data.razorpayOrderId,
      theme: { color: "#0b3b4a" },
      handler: async (response) => {
        try {
          await verifyPayment(response);
          success("Payment successful! Order placed.");
        } catch (err) {
          fail(err.response?.data?.message || "Payment verify nahi hua");
        } finally {
          setLoading(false);
        }
      },
      modal: { ondismiss: () => setLoading(false) },
    });

    rzp.on("payment.failed", (res) => {
      fail(res.error?.description || "Payment failed");
      setLoading(false);
    });

    rzp.open();
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) return fail("Please enter a valid address");

    setMessage({ text: "", type: "" });
    setLoading(true);

    try {
      if (method === "COD") {
        await payCOD();
        setLoading(false);
      } else {
        await payOnline(); 
      }
    } catch (err) {
      fail(err.response?.data?.message || err.message || "Order failed");
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout">Checkout</h2>
      <img className="checkout-img" src={image} alt={product.title || product.name} />
      <h3 className="checkout-name">{product.title || product.name}</h3>
      <p className="checkout-description">{product.description}</p>
      <p className="checkout-price">Price: ₹{product.price}</p>

      <form onSubmit={handleOrder}>
        <textarea
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={placed}
          required/>

        <div className="payment-options">
          <label className={method === "ONLINE" ? "active" : ""}>
            <input
              type="radio"
              name="payment"
              checked={method === "ONLINE"}
              onChange={() => setMethod("ONLINE")}
              disabled={placed}/>
            Pay Online (UPI / Card / NetBanking)
          </label>

          <label className={method === "COD" ? "active" : ""}>
            <input
              type="radio"
              name="payment"
              checked={method === "COD"}
              onChange={() => setMethod("COD")}
              disabled={placed} /> Cash on Delivery</label>
        </div>

        <button type="submit" disabled={loading || placed}>
          {loading
            ? "Processing..."
            : placed
            ? "Order Placed"
            : method === "ONLINE"
            ? `Pay ₹${product.price}`
            : "Place Order"}
        </button>
      </form>

      {message.text && (
        <p role="alert" className={`checkout-message ${message.type}`}>
          {message.text}
        </p>
      )}

      {placed && (
        <button type="button" onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      )}
    </div>
  );
}
export default Checkout;