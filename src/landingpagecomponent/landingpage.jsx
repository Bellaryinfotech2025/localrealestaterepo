import React, { useState, useRef, useEffect } from 'react';
import '../landingpagecomponent/landingpagedesign.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = {
    home: useRef(null),
    about: useRef(null),
    listings: useRef(null),
    why: useRef(null),
    contact: useRef(null),
  };

  const scrollToSection = (sectionKey) => {
    sections[sectionKey].current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

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
        <div className="lre_eagle_localrealstate__brand" onClick={() => scrollToSection('home')}>
          Local Realestate
        </div>
        <div className="lre_eagle_localrealstate__menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`lre_eagle_localrealstate__links ${isMenuOpen ? 'active' : ''}`}>
          <button onClick={() => scrollToSection('home')} className="lre_eagle_localrealstate__link">Home</button>
          <button onClick={() => scrollToSection('about')} className="lre_eagle_localrealstate__link">About</button>
          <button onClick={() => scrollToSection('listings')} className="lre_eagle_localrealstate__link">Listings</button>
          <button onClick={() => scrollToSection('why')} className="lre_eagle_localrealstate__link">Why Choose Us</button>
          <button onClick={() => scrollToSection('contact')} className="lre_eagle_localrealstate__link">Contact</button>
          
          <Link to="/login" className="lre_eagle_localrealstate__login" style={{textDecoration:'none'}}>Login</Link>
          <a 
            href="https://wa.me/919876543210?text=👋%20Hello%20there%21%20%F0%9F%98%89%20I%20need%20help%20with%20real%20estate%20services." 
            target="_blank" 
            rel="noopener noreferrer"
            className="lre_eagle_localrealstate__signup"
          >
            Support
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section 
        ref={sections.home} 
        className="lre_tiger_localrealstate"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)' }}
        role="banner"
      >
        <div className="lre_tiger_localrealstate__content">
          <h1 className="lre_tiger_localrealstate__headline">Find Your Dream Home</h1>
          <p className="lre_tiger_localrealstate__subheadline">
            Discover local properties tailored to your lifestyle with expert guidance every step of the way.
          </p>
          <div className="lre_tiger_localrealstate__cta-group">
            <button className="lre_tiger_localrealstate__cta-primary" onClick={() => scrollToSection('listings')}>
              See Listings
            </button>
            <button className="lre_tiger_localrealstate__cta-secondary" onClick={() => scrollToSection('contact')}>
              Contact Agent
            </button>
          </div>
        </div>
      </section>

      {/* About Real Estate Section */}
      <section ref={sections.about} className="lre_panda_localrealstate" aria-labelledby="about-heading">
        <div className="lre_panda_localrealstate__container">
          <div className="lre_panda_localrealstate__image">
            <img 
              src="https://images.unsplash.com/photo-1504674934578-16b3b3998084?auto=format&fit=crop&w=600&q=80" 
              alt="Real Estate" 
              className="lre_panda_localrealstate__img"
            />
          </div>
          <div className="lre_panda_localrealstate__content">
            <h2 id="about-heading" className="lre_panda_localrealstate__title">About Local Real Estate</h2>
            <p className="lre_panda_localrealstate__description">
              We're a locally owned real estate agency with deep roots in the community. Our team knows every neighborhood like the back of our hand.
            </p>
            <ul className="lre_panda_localrealstate__bullets">
              <li>✅ 15+ years of hyperlocal market expertise</li>
              <li>✅ Trusted by 500+ families for seamless transactions</li>
              <li>✅ Personalized service with no hidden fees</li>
            </ul>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default LandingPage;