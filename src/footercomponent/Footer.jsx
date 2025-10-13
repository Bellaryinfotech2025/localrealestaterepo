import React from "react";
import "../footercomponent/Footer.css";
import bellaryLogo from "../assets/blogo.jpg";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaGlobe,
    FaEnvelope,
    FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
    const phoneNumber = "917013438163";
    const emailAddress = "info.lrenoor@gmail.com";

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Logo & Brand */}
                <div className="footer-brand">
                    <FaGlobe className="footer-globe" />
                    <h2 className="footer-title">LRE</h2>
                    <p className="footer-subtitle">Building Dreams, Creating Futures</p>
                </div>

                {/* Social Links */}
                <div className="footer-social">
                    <h3 className="footer-heading">Connect With Us</h3>
                    <div className="footer-icons">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="footer-contact">
                    <h3 className="footer-heading">Contact Us</h3>
                    <div className="contact-row">
                        <FaEnvelope className="contact-icon" />
                        <a href={`mailto:${emailAddress}`} className="contact-link">{emailAddress}</a>
                    </div>
                    <div className="contact-row">
                        <FaWhatsapp className="contact-icon" />
                        <a
                            href={`https://wa.me/${phoneNumber}?text=Hi%20LRE!%20I%20would%20like%20to%20know%20more%20about%20your%20properties.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            +91 {phoneNumber}
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} LRE Real Estates. All Rights Reserved.</p>

                <div className="footer-powered">
                    <span>Powered by and maintained by</span>
                    <a
                        href="https://bellaryinfotech.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="powered-link"
                    >
                        <img src={bellaryLogo} alt="BellaryInfotech Logo" className="bellary-logo" />
                        <span className="powered-company">BellaryInfotech</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
