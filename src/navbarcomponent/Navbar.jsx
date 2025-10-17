import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../navbarcomponent/Navbardesigin.css";

const Navbar = ({ footerRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleHomeClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.location.reload();
        setIsOpen(false);
    };

    const handleAboutClick = () => {
        setIsOpen(false);
        if (footerRef && footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSupportClick = () => {
        setIsOpen(false);
        window.open("https://wa.me/7013438163", "_blank");
    };

    const handleAdminClick = () => {
        setIsOpen(false);
        navigate("/Admin");
    };

    const closeMenu = () => setIsOpen(false);

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* 🌍 Logo */}
                <div
                    className="logo4"
                    onClick={handleHomeClick}
                    style={{ cursor: "pointer" }}
                >
                    <div className="globe-icon4 spinning-globe4">🌍</div>
                    <span className="logo-text4">LRE</span>
                </div>

                {/* ☰ Hamburger */}
                <div
                    className={`hamburger4 ${isOpen ? "active" : ""}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Navigation Menu */}
                <ul
                    ref={menuRef}
                    className={`nav-menu4 ${isOpen ? "active" : ""}`}
                >
                    <li className="nav-item4">
                        <button
                            className="nav-link4"
                            onClick={() => {
                                handleHomeClick();
                                closeMenu();
                            }}
                        >
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

                    {/* 🛠️ New Admin Button */}
                    <li className="nav-item4">
                        <button className="nav-link4" onClick={handleAdminClick}>
                            Admin
                        </button>
                    </li>
                </ul>

                {/* Overlay */}
                <div
                    className={`nav-overlay ${isOpen ? "active" : ""}`}
                    onClick={closeMenu}
                ></div>
            </div>
        </nav>
    );
};

export default Navbar;
