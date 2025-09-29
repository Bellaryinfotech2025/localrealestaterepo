import React, { useState, useEffect } from "react";
import "../Components/nbl.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

import GreenPlot from "../assets/green.jpg";

const MainPage = () => {
    const [showScroll, setShowScroll] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowScroll(window.scrollY > 200);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <>
            {/* Floating Navbar */}
            <nav className={`floating-navbar ${showScroll ? "scrolled" : ""}`}>
                <div className="logo">
                    <div className="logo-box">LRE</div>
                </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                </button>

                <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
                        <li><Link to="/pricing" onClick={toggleMenu}>Pricing</Link></li>
                        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>

                        {/* Mobile-only login/signup buttons */}
                        <li className="mobile-only"><Link to="/loginform" onClick={toggleMenu}>Log in</Link></li>
                        <li className="mobile-only"><Link to="/register" onClick={toggleMenu}>Sign up</Link></li>
                    </ul>
                </div>

                {/* Desktop-only buttons */}
                <div className="navbar-actions desktop-only">
                    <Link to="/loginform"><button className="login-btn">Log in</button></Link>
                    <Link to="/register"><button className="signup-btn">Sign up</button></Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="main-content">
                <section
                    className="hero"
                    style={{
                        backgroundImage: `url(${GreenPlot})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "80vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "#fff",
                        position: "relative",
                    }}
                >
                    <div className="hero-overlay" style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.35)",
                    }}></div>

                    <div className="hero-content" style={{
                        position: "relative",
                        zIndex: 2,
                        maxWidth: "700px",
                        padding: "0 1rem",
                    }}>
                        <h1>Welcome to LRE</h1>
                        <p>
                            Real estate is the best investment for small savings. More money is
                            made from the rise in real estate values than from all other causes combined.
                        </p>
                        <Link to="/register">
                            <button className="hero-cta">Get Started Now</button>
                        </Link>
                    </div>
                </section>

                {/* WhatsApp Contact */}
                <a
                    href="https://wa.me/919291208202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-contact"
                >
                    <FaWhatsapp />
                </a>

                {/* Features Section */}
                <section className="features">
                    <h2>Why Choose LRE?</h2>
                    <p className="features-subtitle">
                        Discover the benefits of investing with LRE and secure your financial future.
                    </p>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Expert Guidance</h3>
                            <p>Our team of real estate experts provides personalized advice to maximize your investment returns.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Wide Property Selection</h3>
                            <p>Explore a diverse range of properties, from urban apartments to suburban homes, tailored to your needs.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Transparent Process</h3>
                            <p>Enjoy a seamless and transparent buying process with clear pricing and no hidden fees.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="testimonials">
                    <div className="testimonials-overlay"></div>
                    <h2>What Our Clients Say</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p className="quote">"LRE made my first real estate investment so easy and profitable!"</p>
                            <p className="author">— Priya Sharma, Kunool</p>
                        </div>
                        <div className="testimonial-card">
                            <p className="quote">"The team at LRE guided me through every step. Highly recommend!"</p>
                            <p className="author">— Rajesh Patel, Hyderabad</p>
                        </div>
                        <div className="testimonial-card">
                            <p className="quote">"Transparent and professional. LRE is the best in the business."</p>
                            <p className="author">— Ananya Gupta, Nandyal</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <h2>Ready to Invest in Your Future?</h2>
                    <p>Join thousands of satisfied investors and start your real estate journey with LRE today.</p>
                    <Link to="/register"><button className="cta-btn">Sign Up Now</button></Link>
                </section>

                <div style={{ height: "200px" }}></div>
            </main>

            {/* Footer */}
            <footer>
                <div className="footer-container">
                    <div className="footer-logo">
                        <h2>LRE</h2>
                        <p>Real estate potentially rises in value over time.</p>
                    </div>
                    <div className="footer-social">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaLinkedinIn /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} LRE. All Rights Reserved.</p>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            {showScroll && (
                <button className="scroll-top-btn" onClick={scrollToTop}>↑</button>
            )}
        </>
    );
};

export default MainPage;
