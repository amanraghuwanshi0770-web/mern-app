import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../api/api";
import { CartContext } from "../context/CartContext";

function CategoryProducts() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductsByCategory(categoryId);

        setProducts(response.data.products || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="products-page">
      <h1>Category Products</h1>

      {loading ? (<p>Loading products...</p>) 
      : error 
      ? (<p>{error}</p>) 
      : products.length === 0 
      ? (<p>No products available in this category</p>) 
      : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <img src={product.image?.[0]} alt={product.name}/>
              </div>

              <div className="product-info">
                <h2>{product.name}</h2>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <p>Stock: {product.stock}</p>

                <p className="product-description">
                  {product.description}</p>

                <div className="product-buttons">
                  <button onClick={() => addToCart(product)}>
                    ADD TO CART
                  </button>

                  <button onClick={() =>
                      navigate("/checkout", {
                        state: { product,quantity: 1,},
                    })}>Buy Now</button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
