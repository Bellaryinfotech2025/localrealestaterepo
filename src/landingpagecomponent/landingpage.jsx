import React, { useState, useRef, useEffect } from 'react';
import '../landingpagecomponent/landingpagedesign.css';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const sections = {
    home: useRef(null),
    about: useRef(null),
    listings: useRef(null),
    why: useRef(null),
    testimonials: useRef(null),
    contact: useRef(null),
  };

  const scrollToSection = (sectionKey) => {
    sections[sectionKey].current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ location, propertyType });
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
          <button onClick={() => scrollToSection('testimonials')} className="lre_eagle_localrealstate__link">Testimonials</button>
          <button onClick={() => scrollToSection('contact')} className="lre_eagle_localrealstate__link">Contact</button>
          
          <Link to="/login" className="lre_eagle_localrealstate__login" style={{textDecoration:'none'}}>Login</Link>
        
          <Link to="/register">
          <button className="lre_eagle_localrealstate__signup">Sign Up</button>
          </Link>
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
          <form onSubmit={handleSearch} className="lre_tiger_localrealstate__search">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="lre_tiger_localrealstate__search-input"
              aria-label="Search location"
            />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="lre_tiger_localrealstate__search-select"
              aria-label="Property type"
            >
              <option value="all">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </select>
            <button type="submit" className="lre_tiger_localrealstate__search-button">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* About */}
      <section ref={sections.about} className="lre_panda_localrealstate" aria-labelledby="about-heading">
        <h2 id="about-heading" className="lre_panda_localrealstate__title">About Us</h2>
        <p className="lre_panda_localrealstate__description">
          We’re a locally owned real estate agency with deep roots in the community. Our team knows every neighborhood like the back of our hand.
        </p>
        <ul className="lre_panda_localrealstate__bullets">
          <li>✅ 15+ years of hyperlocal market expertise</li>
          <li>✅ Trusted by 500+ families for seamless transactions</li>
          <li>✅ Personalized service with no hidden fees</li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section ref={sections.why} className="lre_fox_localrealstate" aria-labelledby="why-heading">
        <h2 id="why-heading" className="lre_fox_localrealstate__title">Why Choose Us</h2>
        <div className="lre_fox_localrealstate__cards">
          <div className="lre_fox_localrealstate__card">
            <div className="lre_fox_localrealstate__icon">🏡</div>
            <h3 className="lre_fox_localrealstate__card-title">Local Experts</h3>
            <p className="lre_fox_localrealstate__card-desc">Neighborhood insights you won’t find online.</p>
          </div>
          <div className="lre_fox_localrealstate__card">
            <div className="lre_fox_localrealstate__icon">🤝</div>
            <h3 className="lre_fox_localrealstate__card-title">Trusted Advisors</h3>
            <p className="lre_fox_localrealstate__card-desc">Honest guidance through every decision.</p>
          </div>
          <div className="lre_fox_localrealstate__card">
            <div className="lre_fox_localrealstate__icon">⚡</div>
            <h3 className="lre_fox_localrealstate__card-title">Fast Process</h3>
            <p className="lre_fox_localrealstate__card-desc">Close deals 30% faster than the market average.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={sections.testimonials} className="lre_elephant_localrealstate" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading" className="lre_elephant_localrealstate__title">Client Testimonials</h2>
        <div className="lre_elephant_localrealstate__cards">
          <div className="lre_elephant_localrealstate__card">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Sarah J., Homebuyer" 
              className="lre_elephant_localrealstate__avatar"
            />
            <p className="lre_elephant_localrealstate__quote">
              "They found us a home in our dream neighborhood within 2 weeks! Professional and responsive."
            </p>
            <p className="lre_elephant_localrealstate__author">— Sarah J., Homebuyer</p>
          </div>
          <div className="lre_elephant_localrealstate__card">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Michael T., Seller" 
              className="lre_elephant_localrealstate__avatar"
            />
            <p className="lre_elephant_localrealstate__quote">
              "Sold my condo for 15% above asking price. Their marketing strategy is unmatched!"
            </p>
            <p className="lre_elephant_localrealstate__author">— Michael T., Seller</p>
          </div>
          <div className="lre_elephant_localrealstate__card">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Priya K., Investor" 
              className="lre_elephant_localrealstate__avatar"
            />
            <p className="lre_elephant_localrealstate__quote">
              "Helped me build a rental portfolio with zero stress. True partners in success."
            </p>
            <p className="lre_elephant_localrealstate__author">— Priya K., Investor</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section ref={sections.contact} className="lre_dolphin_localrealstate" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="lre_dolphin_localrealstate__title">Contact Us</h2>
        <p className="lre_dolphin_localrealstate__info">
          📞 (555) 123-4567 | ✉️ hello@localrealestate.com<br />
          📍 123 Main Street, Anytown, ST 12345
        </p>
      </section>

      {/* Footer */}
      <footer className="lre_whale_localrealstate" role="contentinfo">
        <div className="lre_whale_localrealstate__links">
          <button onClick={() => scrollToSection('home')} className="lre_whale_localrealstate__link">Home</button>
          <button onClick={() => scrollToSection('about')} className="lre_whale_localrealstate__link">About</button>
          <button onClick={() => scrollToSection('listings')} className="lre_whale_localrealstate__link">Listings</button>
          <button onClick={() => scrollToSection('why')} className="lre_whale_localrealstate__link">Why Choose Us</button>
          <button onClick={() => scrollToSection('testimonials')} className="lre_whale_localrealstate__link">Testimonials</button>
          <button onClick={() => scrollToSection('contact')} className="lre_whale_localrealstate__link">Contact</button>
        </div>
        <div className="lre_whale_localrealstate__contact">
          <p>📞 (555) 123-4567</p>
          <p>✉️ hello@localrealestate.com</p>
        </div>
        <div className="lre_whale_localrealstate__social">
          <a href="#facebook" aria-label="Facebook" className="lre_whale_localrealstate__social-icon">f</a>
          <a href="#twitter" aria-label="Twitter" className="lre_whale_localrealstate__social-icon">t</a>
          <a href="#instagram" aria-label="Instagram" className="lre_whale_localrealstate__social-icon">i</a>
        </div>
        <div className="lre_whale_localrealstate__copyright">
          &copy; {new Date().getFullYear()} Local Realestate. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;