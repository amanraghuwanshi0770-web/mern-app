import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      <h2>AR Admin</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </nav>

      <button className="admin-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;