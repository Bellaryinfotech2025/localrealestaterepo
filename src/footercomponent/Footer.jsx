import React from 'react';
import '../footercomponent/Footer.css';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {

    const handlePhoneClick = () => {
        window.open('tel:+917013438163', '_self');
    };

    const handleEmailClick = () => {
        window.open('mailto:noorpega@gmail.com', '_self');
    };

    const handleLocationClick = () => {
        // Opens Google Maps with a search for Kurnool & Hyderabad
        window.open('https://www.google.com/maps/search/Kurnool+Hyderabad+India', '_blank');
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Left Section - Logo and About */}
                <div className="footer-left">
                    <div className="logo-section">
                        <div className="logo">
                            <div className="globe-container">
                                <div className="globe">
                                    <span className="globe-text">LRE</span>
                                </div>
                            </div>
                        </div>
                        <p className="company-name">Local Real Estate</p>
                        <p className="tagline">Your Trusted Partner in Property Dreams</p>
                    </div>
                </div>

                {/* Middle Section - Contact Info */}
                <div className="footer-middle">
                    <div className="contact-info">
                        <div className="contact-item clickable" onClick={handlePhoneClick}>
                            <Phone size={18} />
                            <span>+91 70134 38163</span>
                            <span className="click-hint">Click to call</span>
                        </div>
                        <div className="contact-item clickable" onClick={handleEmailClick}>
                            <Mail size={18} />
                            <span>noorpega@gmail.com</span>
                            <span className="click-hint">Click to email</span>
                        </div>
                        <div className="contact-item clickable" onClick={handleLocationClick}>
                            <MapPin size={18} />
                            <span>Kurnool & Hyderabad, India</span>
                            <span className="click-hint">Click for location</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Social Media */}
                <div className="footer-right">
                    <div className="social-section">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="https://facebook.com" className="social-icon facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <Facebook size={20} />
                            </a>
                            <a href="https://twitter.com" className="social-icon twitter" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                <Twitter size={20} />
                            </a>
                            <a href="https://instagram.com" className="social-icon instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <Instagram size={20} />
                            </a>
                            <a href="https://linkedin.com" className="social-icon linkedin" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; 2025 Local Real Estate (LRE). All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#cookies">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;