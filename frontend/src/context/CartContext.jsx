import { createContext, useState } from "react";
export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart,
        {...product,quantity: 1, },
      ])}}

  return (
    <CartContext.Provider value={{ cart, addToCart,setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;