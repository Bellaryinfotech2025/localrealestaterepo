import React from "react";
import "../footercomponent/Footer.css";
import bellaryLogo from "../assets/blogo.jpg";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const phoneNumber = "917013438163";
  const emailAddress = "info.lrenoor@gmail.com";

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Tagline */}
        <div className="footer-brand">
          <h2 className="footer-logo">LRE Real Estates</h2>
          <p className="footer-tagline">Building Dreams, Creating Futures</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><FaEnvelope /> <a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
          <p><FaWhatsapp /> <a href={`https://wa.me/${phoneNumber}?text=Hi LRE!`} target="_blank" rel="noopener noreferrer">+91 {phoneNumber}</a></p>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LRE Real Estates. All Rights Reserved.</p>
        <div className="footer-powered">
          <span>Powered & maintained by </span>
          <a href="https://bellaryinfotech.com" target="_blank" rel="noopener noreferrer">
            <img src={bellaryLogo} alt="BellaryInfotech Logo" />BellaryInfotech
          
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
