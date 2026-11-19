import image1 from '../assets/imgae1.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getMainCategories } from '../api/api';
import { BiCategoryAlt } from 'react-icons/bi';
import { CiMobile1 } from 'react-icons/ci';
import { FaLaptop, FaTshirt } from 'react-icons/fa';
import { LuLamp } from 'react-icons/lu';

function Home() {
  const [navCategories, setNavCategories] = useState([]);

  useEffect(() => {
    const fetchNavbarCategories = async () => {
      try {
        const res = await getMainCategories();
        setNavCategories(res.data.categories || []);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };
    fetchNavbarCategories();
  }, []);

  const getCategoryIcon = (categoryName = '') => {
    const name = categoryName.toLowerCase();

    if (name.includes('mobile') || name.includes('mobhile') || name.includes('phone')) {
      return <CiMobile1 />;
    }
    if (name.includes('electronic') || name.includes('laptop')) {
      return <FaLaptop />;
    }
    if (name.includes('home') || name.includes('lamp') || name.includes('furniture')) {
      return <LuLamp />;
    }
    if (name.includes('fashion') || name.includes('cloth') || name.includes('shirt')) {
      return <FaTshirt />;
    }

    return <BiCategoryAlt />;
  };

  return (
    <div>
      <div className="hero-wrapper">
        <div className="background-pattern"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-subtitle">SUMMER COLLECTION</span>

              <h1>
                Fall - Winter <br /> Collections 2026
              </h1>
              <p>
                Discover premium products crafted with quality and style. Shop the latest
                collection and find something you love.
              </p>

              <div>
                <button className="order-btn">
                  <Link to="/products">SHOP NOW → </Link>
                </button>
              </div>
            </div>

            <div className="home-image">
              <img src={image1} alt="Summer Collection" className="home-image-img" />
            </div>
          </div>
        </div>
      </div>

      <ul className="nav-menu">
        {navCategories.map((cat) => (
          <li key={cat._id}>
            <Link to={`/category/${cat.slug}`}>
              {getCategoryIcon(cat.name)}
              <span>{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;