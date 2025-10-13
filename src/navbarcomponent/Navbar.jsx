import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../navbarcomponent/Navbardesigin.css";

const Navbar = ({ footerRef }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleHomeClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.location.reload();
    };

    const handleAboutClick = () => {
        setIsOpen(false);
        if (footerRef && footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSupportClick = () => {
        setIsOpen(false);
        window.open("https://wa.me/1234567890", "_blank");
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* 🌍 Logo */}
                <div className="logo4" onClick={handleHomeClick} style={{ cursor: "pointer" }}>
                    <div className="globe-icon4 spinning-globe4">🌍</div>
                    <span className="logo-text4">LRE</span>
                </div>

                {/* ☰ Hamburger */}
                <div className={`hamburger4 ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Navigation Menu */}
                <ul className={`nav-menu4 ${isOpen ? "active" : ""}`}>
                    <li className="nav-item4">
                        <button className="nav-link4" onClick={() => { handleHomeClick(); closeMenu(); }}>
                            Home
                        </button>
                    </li>

                    <li className="nav-item4">
                        <button className="nav-link4" onClick={handleAboutClick}>
                            About Us
                        </button>
                    </li>

                    <li className="nav-item4">
                        <button className="nav-link4" onClick={handleSupportClick}>
                            🌐 Support
                        </button>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
