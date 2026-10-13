import React from "react";
import image1 from '../assets/imgae1.png'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="hero-wrapper">
        <div className="background-pattern"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-subtitle">SUMMER COLLECTION</span>

              <h1> Fall - Winter <br /> Collections 2026 </h1>

              <p>Discover premium products crafted with quality and style.
                Shop the latest collection and find something you love.
              </p>
              
              <div>
                <button className="order-btn">
                  <Link to='/products'>SHOP NOW → </Link>
                 </button></div>
            </div>

            <div className="home-image">
              <img src={image1}  alt="Summer Collection" className="home-image-img"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;