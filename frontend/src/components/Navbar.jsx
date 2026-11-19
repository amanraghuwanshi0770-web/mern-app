import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import logoimage from "../assets/AR E-Commerce Shopping Cart Logo.png";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const navigate = useNavigate()
  const { cart } = useContext(CartContext)
  const [search, setsearch] = useState('')

  const handleSearch = (e) => {
    e.preventDefault();
    if(search.trim() !== ''){
      navigate(`/products?search=${search.trim()}`)
    } else {
      navigate("/products")
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
          onChange={(e) => setsearch(e.target.value)}/>
        <button type="submit">
          <CiSearch />
        </button>
      </form>

      <div className="nav-actions">
        <div className="cart" 
          onClick={() => navigate('/Sidebar')}
          title="Shopping Cart"> 🛒 <span>{cart?.length || 0}</span>
        </div>

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