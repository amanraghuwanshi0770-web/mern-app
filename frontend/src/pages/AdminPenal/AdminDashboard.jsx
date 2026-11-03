import { useEffect, useState } from "react"
import { getAdminDashboard } from "../../api/api"

function AdminDashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getAdminDashboard()
        setData(response.data)
      } catch (error) {
        setError(
          error.response?.data?.message || "Dashboard loading failed"
        );
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) return <p>Loading dashboard...</p>
  if (error) return <p className="admin-error">{error}</p>
  if (!data) return <p>No dashboard data available.</p>

  const monthLySales = data.monthLySales || []
  const topSellingProducts = data.topSellingProducts || [];
  const stats = data.stats || {}

  const cards = [
    { title: "Total Users", value: stats.totalUsers || 0, icon: "👥"},
    { title: "Total Products", value: stats.totalProducts || 0,     icon:  "📦"},
    { title: "Total Orders", value: stats.totalOrders || 0,     icon: "🛒"},
    { title: "Paid Revenue", value: `₹${(stats.totalRevenue || 0).toLocaleString("en-IN")}`, icon: "💰"},
  ]

  const maxRevenue = Math.max(
    ...monthLySales.map((item)=> item.revenue),
    1
  )

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome to Your store overview</p>

      <div className="admin-stats">
        {cards.map((card) => (
          <div className="admin-stat-card" key={card.title}>

             <div className="dashboard-card-top">
               <p>{card.title}</p>
               <span>{card.icon}</span>
             </div>

             <h2>{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="admin-table-card dashboard-chart-card">
        <h2>Monthly Sales Analytics</h2>

        <p className="dashboard-subtitle">
          Paid revenue for the last 6 months
        </p>
        
        <div className="sales-chart">
          {monthLySales.map((item,index)=>(
            <div className="sales-chart-item" key={index}>

              <span className="sales-chart-value">₹{(item.revenue || 0).toLocaleString("en-IN")}</span>

              <div className="sales-bar-wrapper">
                <div className="sales-bar"
                  style={{
                    height:`${Math.max(
                      (item.revenue / maxRevenue) * 100,
                      item.revenue > 0 ? 5 : 0
                    )}%`
                  }}/>
              </div>
              <span className="sales-chart-month">{item.month}</span>
            </div>
          ))}
           </div>
        </div>

      <div className="admin-table-card">
        <h2>Top Selling Products</h2>

        <div className="admin-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity Sold</th>
                <th>Total Revenue</th>
              </tr>
            </thead>

            <tbody>
              {topSellingProducts.length > 0 ? (
                topSellingProducts.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.name || "Unknown Product"}</td>
                    <td>{product.totalSold}</td>
                    <td>
                      ₹{(product.totalRevenue || 0).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No selling products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      <div className="admin-table-card">
        <h2>Recent Orders</h2>

        <div className="admin-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {data.recentOrders?.length > 0 ? (
                data.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user?.name || "Unknown"}</td>
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
                  <td colSpan="5">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard