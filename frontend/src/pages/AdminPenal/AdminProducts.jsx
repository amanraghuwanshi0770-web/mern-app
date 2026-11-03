import { useEffect, useState } from "react";
import {getProducts, createAdminProduct,updateAdminProduct,deleteAdminProduct} from "../../api/api"

const emptyForm = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
  stock: "",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.products || []);
    } catch (error) {
      setError(error.response?.data?.message || "Products loading failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name || "",
      price: product.price ?? "",
      category: product.category || "",
      description: product.description || "",
      image: (product.image || []).join(", "),
      stock: product.stock ?? "",
    });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    };

    if (!productData.image.length) {
      setError("Please enter at least one image URL.");
      return;
    }

    try {
      if (editId) {
        await updateAdminProduct(editId, productData);
        setMessage("Product updated successfully.");
      } else {
        await createAdminProduct(productData);
        setMessage("Product added successfully.");
      }

      setForm(emptyForm);
      setEditId(null);
      await fetchProducts();
    } catch (error) {
      setError(error.response?.data?.message || "Product save failed.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteAdminProduct(id);
      setMessage("Product deleted successfully.");
      setProducts((prev) => prev.filter((product) => product._id !== id));

      if (editId === id) {
        setEditId(null);
        setForm(emptyForm);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Product delete failed.");
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Manage Products</h1>

      <div className="admin-form-card">
        <h2>{editId ? "Edit Product" : "Add New Product"}</h2>

        {error && <p className="admin-error">{error}</p>}
        {message && <p className="admin-success">{message}</p>}

        <form onSubmit={handleSubmit} className="admin-product-form">
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            min="0"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            name="stock"
            type="number"
            min="0"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <textarea
            name="image"
            placeholder="Image URLs (comma separated)"
            value={form.image}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>

          {editId && (
            <button
              type="button"
              className="admin-cancel-button"
              onClick={() => {
                setEditId(null);
                setForm(emptyForm);
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="admin-table-card">
        <h2>All Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="admin-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        {product.image?.[0] ? (
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="admin-product-image"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button
                          className="admin-edit-button"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>

                        <button
                          className="admin-delete-button"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;