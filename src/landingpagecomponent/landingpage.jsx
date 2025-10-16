import React, { useState, useEffect } from 'react';
import '../landingpagecomponent/Landingpagedesign.css';
import bgImage1 from "../assets/green.jpg";
import bgImage2 from "../assets/login.jpg";
import bgImage3 from "../assets/testomonials.jpg";


const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [bgImage1, bgImage2, bgImage3];

  // Auto-rotate hero images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="lre_page_localrealstate">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero Section with Rotating Image Slider */}
      <section
        className="lre_tiger_localrealstate"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
        role="banner"
      >
        <div className="lre_tiger_localrealstate__content">
          <h1 className="lre_tiger_localrealstate__headline">
            WELCOME TO LRE
          </h1>
          <p className="lre_tiger_localrealstate__subheadline">
            Real estate cannot be lost or stolen, nor can it be carried away.
            Purchased with common sense, paid for in full, and managed with
            reasonable care, it is about the safest investment in the world.
            Discover local properties tailored to your lifestyle with expert
            guidance every step of the way.
          </p>

          {/* CTA Buttons (optional) */}
          {/* 
          <div className="lre_tiger_localrealstate__cta-group">
            <button className="lre_tiger_localrealstate__cta-primary">
              See Listings
            </button>
            <button className="lre_tiger_localrealstate__cta-secondary">
              Contact Agent
            </button>
          </div>
          */}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
