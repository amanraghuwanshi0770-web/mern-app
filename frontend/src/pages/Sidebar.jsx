import { useContext } from "react";
import Swal from "sweetalert2";
import { CartContext } from "../context/cartcontext";

function Sidebar() {
  const { cart, setCart } = useContext(CartContext);

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))}

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ))}

  const totalprice = cart.reduce(
    (total, item) => total + item.price * item.quantity,0)

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Ye item delete ho jayega!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No",
      
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(cart.filter((item) => item._id !== id))
        Swal.fire(
          "Deleted!", 
          "Item delete ho gaya.",
          "success"
        );
      }})}
  
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((product) => (
          <div className="cart-item" key={product._id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h2>{product.name}</h2>
              <p>₹{product.price}</p>

              <div className="quantity">
                <button onClick={() => decreaseQuantity(product._id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => increaseQuantity(product._id)}>+</button>
              </div>

              <div className="sidebardescription">{product.description}</div>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
      <h2 className="total-price">Total:₹{totalprice}</h2>
    </div>
  )}

export default Sidebar;