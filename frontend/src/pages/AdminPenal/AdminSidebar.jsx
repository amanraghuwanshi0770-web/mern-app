
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdPeople,
  MdInventory,
  MdShoppingCart,
  MdCategory,
  MdHome,
  MdLogout,
  MdMenu,
  MdClose,
  MdKeyboardDoubleArrowLeft
} from "react-icons/md";

function AdminSidebar() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> },
    { name: "Users", path: "/admin/users", icon: <MdPeople /> },
    { name: "Products", path: "/admin/products", icon: <MdInventory /> },
    { name: "Orders", path: "/admin/orders", icon: <MdShoppingCart /> },
    { name: "Categories", path: "/admin/categories", icon: <MdCategory /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login", { replace: true });
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <MdMenu />
      </button>

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={closeMobile}></div>
      )}

      <aside
        className={`premium-sidebar
          ${collapsed ? "collapsed" : ""}
          ${mobileOpen ? "mobile-open" : ""}`}
      >
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-logo">AR</div>
            {!collapsed && <span>AR Admin</span>}
          </div>

          <button
            className="collapse-btn desktop-collapse"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse sidebar"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>

          <button
            className="collapse-btn mobile-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <MdClose />
          </button>
        </div>

        <div className="sidebar-label">
          {!collapsed && "MAIN MENU"}
        </div>

        <nav className="sidebar-navigation">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobile}
              title={collapsed ? item.name : ""}
              className={({ isActive }) =>
                `premium-link ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-divider"></div>

          <Link
            to="/"
            className="premium-link"
            onClick={closeMobile}
            title={collapsed ? "Back to Home" : ""}
          >
            <span className="nav-icon"><MdHome /></span>
            {!collapsed && <span>Back to Home</span>}
          </Link>

          <button
            className="premium-link logout-link"
            onClick={handleLogout}
            title={collapsed ? "Logout" : ""}
          >
            <span className="nav-icon"><MdLogout /></span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
