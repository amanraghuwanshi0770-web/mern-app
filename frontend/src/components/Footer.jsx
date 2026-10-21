import { Link } from "react-router-dom";
import logoimage from "../assets/AR E-Commerce Shopping Cart Logo.png";

import {
  FaInstagram,
  FaWhatsapp,
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box footer-about">
          <img
            src={logoimage}
            alt="AR E-Commerce Logo"
            className="footer-logo" />

          <p>
            Your one-stop destination for quality products,
            great prices and a smooth shopping experience.
          </p>

          <div className="social-links">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noreferrer">
              <FaFacebookF /></a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <FaTwitter /></a>
          </div>
        </div>


        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link> </li>
            <li><Link to="/products">Products</Link> </li>
            <li><Link to="/features">Features</Link> </li>
            <li> <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-box">
          <h3>Customer Support</h3>

          <ul>
            <li> <Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link> </li>
            <li><Link to="/shipping">Shipping & Delivery</Link> </li>
            <li> <Link to="/returns">Returns & Refunds</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-box">
          <h3>Contact Us</h3>
          <p>📍 Bhopal, Madhya Pradesh, India</p>
          <p>📧 amanraghuwanshi@arecommerce.com</p>
          <p>📞 +91 916 532 7260</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2026 <strong>AR E-Commerce</strong>. All Rights Reserved.
        </p>
        <div className="footer-bottom-links">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>

    </footer>
  );
}

export default Footer;