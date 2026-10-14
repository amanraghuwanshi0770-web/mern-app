import { useEffect, useState } from 'react'
import { getMyOrders } from '../api/api'

function MyOrder() {
    const[orders,setorders] = useState([])
    const[loding,setloding] = useState(true)
    const[error,seterror] = useState('')

    useEffect(()=>{
        const fatchOrders = async() => {
            try {
                const response = await getMyOrders()
                setorders(response.data.orders || [])
            } catch (error) {
                seterror(
                error.response?.data?.message || 'faild to loaad orders'
            )}
            finally{setloding(false)}
        }
        fatchOrders()
    },[])

    if(loding){
        return <div className='order-message'>Loding order..</div>
    }

      if(error){
        return <div className='order-message'>{error}</div>
    }

return (
    <div className="my-orders">
      <div className="orders-header">
        <div>
          <h1>My Orders</h1>
          <p>Track and manage your purchases</p>
        </div>

        <span className="orders-count">{orders.length} Orders </span>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <div className="empty-icon">🛍️</div>
          <h2>No orders yet</h2>
          <p>Your orders will appear here after you shop.</p>
          <button onClick={() => {window.location.href = "/products"}}> Start Shopping </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-top">
                <div>
                  <span>ORDER ID</span>
                  <h3>#{order._id.slice(-8).toUpperCase()}</h3>
                  <p>{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                </div>

                <div className="order-statuses">
                <span className={`status ${order.status?.toLowerCase()}`}>
                {order.status || "Placed"}
                </span>

               <span className={`payment-status ${order.paymentStatus?.toLowerCase()}`}>
                 Payment: {order.paymentStatus || "Pending"}
                 </span>
                </div>
              </div>

              {order.items?.map((item, index) => {
                const product = item.product;

                return (
                  <div className="order-product" key={item._id || index}>
                    <img src={product?.image?.[0] || product?.image || item.image || ""}
                      alt={product?.name || item.name || "Product"}/>

                    <div className="product-info">
                      <h4>{product?.name || item.name || "Product"}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <strong> ₹{item.price || product?.price || 0} </strong>
                  </div>
                )
              })}

              <div className="order-bottom">
                <div><span>Total Amount</span>
                  <h2>₹{order.totalAmount || order.totalPrice || 0} </h2>
                  <p> Payment Method: {order.paymentMethod || "COD"} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrder;