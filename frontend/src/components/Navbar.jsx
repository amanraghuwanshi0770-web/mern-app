
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import logoimage from "../assets/AR E-Commerce Shopping Cart Logo.png";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaUserShield } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [search, setsearch] = useState("");

  // Login user data
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logoimage} alt="AR E-Commerce Logo" />
        </Link>
      </div>

      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button type="submit">
          <CiSearch />
        </button>
      </form>

      <div className="nav-actions">
        <div
          className="cart"
          onClick={() => navigate("/Sidebar")}
          title="Shopping Cart"
        >
          🛒 <span>{cart?.length || 0}</span>
        </div>

        {/* Admin Icon - Only for Admin */}
        {user?.role === "admin" && (
          <div className="admin-icon" title="Admin Panel">
            <Link to="/admin">
              <FaUserShield />
            </Link>
          </div>
        )}

        <div className="profile-icon" title="My Profile">
          <Link to="/profile">
            <CgProfile />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
