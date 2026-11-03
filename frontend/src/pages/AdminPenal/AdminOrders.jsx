import { useEffect, useState } from "react";
import { getAdminOrders } from "../../api/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminOrders()
      .then((response) => setOrders(response.data.orders || []))
      .catch((error) =>
        setError(error.response?.data?.message || "Orders loading failed")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="admin-page-title">Manage Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="admin-error">{error}</p>}

      {!loading && !error && (
        <div className="admin-table-card">
          <div className="admin-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.user?.name || "Unknown"}</td>
                      <td>
                        {order.items?.map((item, index) => (
                          <div key={index}>
                            {item.title || item.product?.name || "Product"}
                            {" × "}
                            {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td>₹{order.totalAmount}</td>
                      <td>{order.paymentStatus}</td>
                      <td>{order.status}</td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;