import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"

function AdminLayout() {
  let user = {}

  try {
    user = JSON.parse(localStorage.getItem("user")) || {}
  } catch {
    user = {}
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <header className="admin-navbar">
          <h3>Admin Panel</h3>
          <span>Welcome, {user.name || "Admin"}</span>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;