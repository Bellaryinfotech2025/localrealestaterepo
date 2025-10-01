import React, { useState, useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import '../landingpagecomponent/landingpagedesign.css';
import { Link } from 'react-router-dom';
import bgImage1 from "../assets/green.jpg";
import bgImage2 from "../assets/login.jpg";
import bgImage3 from "../assets/testomonials.jpg";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [bgImage1, bgImage2, bgImage3];

  // Auto-rotate hero images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lre_page_localrealstate">
      {/* Navbar */}
      <nav className="lre_eagle_localrealstate" aria-label="Main navigation">
        <div
          className="lre_eagle_localrealstate__brand"
          role="button"
          tabIndex={0}
        >
          <FaGlobe className="globe-icon" /> LRE
        </div>

        <div
          className="lre_eagle_localrealstate__menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`lre_eagle_localrealstate__links ${isMenuOpen ? 'active' : ''}`}>
          <button className="lre_eagle_localrealstate__link">Home</button>
          <button className="lre_eagle_localrealstate__link">About</button>
          <button className="lre_eagle_localrealstate__link">Listings</button>
          <button className="lre_eagle_localrealstate__link">Why Choose Us</button>
          <button className="lre_eagle_localrealstate__link">Contact</button>

          <a
            href="https://wa.me/917013438163?text=👋%20Hello%20there%21%20%F0%9F%98%89%20I%20need%20help%20with%20real%20estate%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="lre_eagle_localrealstate__signup"
            style={{ textDecoration: 'none' }}
          >
            Support
          </a>
        </div>
      </nav>

      {/* Hero Section with Rotating Image Slider */}
      <section
        className="lre_tiger_localrealstate"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
        role="banner"
      >
        <div className="lre_tiger_localrealstate__content">
          <h1 className="lre_tiger_localrealstate__headline">WELCOME TO LRE</h1>
          <p className="lre_tiger_localrealstate__subheadline">
            Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world.” –
            Discover local properties tailored to your lifestyle with expert guidance every step of the way.
          </p>
          {/* <div className="lre_tiger_localrealstate__cta-group">
            <button className="lre_tiger_localrealstate__cta-primary">
              See Listings
            </button>
            <button className="lre_tiger_localrealstate__cta-secondary">
              Contact Agent
            </button>
          </div> */}
        </div>
      </section>


    </div>
  );
};

export default LandingPage;
