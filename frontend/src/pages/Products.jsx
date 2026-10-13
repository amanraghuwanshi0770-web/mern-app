import { useEffect, useState ,useContext} from "react";
import { getProducts } from "../api/api";
import { CartContext } from "../context/cartcontext";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Products() {
 const navigate = useNavigate()
 const [currentImage, setCurrentImage] = useState({})
 const [products, setProducts] = useState([]);
 const { addToCart } = useContext(CartContext);

 const [searchParams] = useSearchParams()
 const search = searchParams.get('search')|| '';

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }}

  useEffect(() =>
  {fetchProducts()},
  []);

  const filteredProducts = products.filter((product)=>{
    const nameMatch = product.name?.toLowerCase().includes(search.toLocaleLowerCase());
    const categoryMatch = product.category?.toLowerCase().includes(search.toLocaleLowerCase());
    return nameMatch || categoryMatch
  })

  return (
    <div className="products-page">
    <h1>{search
     ? `search results for "${search}"`
     : "Products"
    }</h1>

     {filteredProducts.length === 0 ? (
        <p  className='loader'style={{ textAlign: "center", fontSize: "18px", color: "gray", marginTop: "40px" }}>
        </p>
      ) : (

    <div className="products-grid">
       {filteredProducts.map((product) => (
        <div className="product-card" key={product._id}>

        <div className="product-image">
          <img src={product.image[currentImage[product._id] || 0]} alt={product.name} />
        </div>

       <div className="product-info">
          <h2>{product.name}</h2>
          <div className="price-stock">
          <p className="product-price"> ₹{product.price}</p>
          <p className="product-stock">Stock: {product.stock}</p>
       </div>

      <button className="right-arrow"
       onClick={() => setCurrentImage((prev) => {
       const current = prev[product._id] || 0;
       return {
        ...prev, [product._id]:
          current === product.image.length - 1
            ? 0
            : current + 1
       }})}>
      <FaArrowRight />
      </button>

       <button className="left-arrow"
        onClick={()=>setCurrentImage((prev)=>{
           const current = prev[product._id] || 0;
           return {
               ...prev, [product._id]:
               current === 0
            ?product.image.length - 1 
            : current - 1
        }})}>
        <FaArrowLeft/>
       </button>

       <span className="product-category">{product.category}</span>
       <p className="product-description"> {product.description}</p>
       <p className="under-line"></p>
       
       <div className="product-buttons">
       <button onClick={()=> addToCart(product)}>ADD TO CART</button>
       <button onClick={() =>
        navigate("/checkout", { state: { product: product, quantity: 1 }})}>
       Buy Now</button>
       
      </div>
    </div>
   </div>
    ))}
  </div>
 )}
</div>
)}
export default Products;