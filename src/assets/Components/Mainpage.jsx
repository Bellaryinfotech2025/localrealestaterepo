import React, { useState } from "react";
import "../Components/mainpage.css";
import "../Components/sidebars.css";

const MainPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! How can I help you today?" }
    ]);
    const [input, setInput] = useState("");

    const tabs = [
        { name: "LOCAL", options: ["Residential", "Commercial"] },
        { name: "CITY OUTSKIRTS", options: ["Residential", "Commercial"] },
        { name: "CITY BORDER", options: ["Residential", "Commercial"] },
        { name: "LAND", options: ["Agriculture", "Commercial"] }
    ];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages(prev => [
            ...prev,
            { from: "user", text: input },
            { from: "bot", text: "Thanks for reaching out! We'll get back soon." }
        ]);
        setInput("");
    };

    return (
        <>
            <div className="page-layout">
                {/* Left Sidebar */}
                <aside className="sidebar left-sidebar">
                    <h3>Featured Properties</h3>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </aside>

                {/* Main Content Area */}
                <div className="main-wrapper">
                    {/* Hero Section */}
                    <section className="hero-section">
                        <div className="hero-overlay">
                            <h1 className="hero-title">Welcome to Our L  R  E</h1>
                            <p className="hero-subtitle">
                                Explore the best options for Residential, Commercial & Land Investments
                            </p>
                        </div>
                    </section>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`menu-toggle ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Dark overlay when menu is open */}
                    {menuOpen && (
                        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
                    )}

                    {/* Tabs with hover dropdown */}
                    <div className={`tabs-container ${menuOpen ? "open" : ""}`}>
                        {tabs.map((tab) => (
                            <div key={tab.name} className="tab-dropdown">
                                <button className="tab-btn">{tab.name}</button>
                                <div className="dropdown-menu">
                                    {tab.options.map((opt, idx) => (
                                        <div key={idx} className="dropdown-item">
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="sidebar right-sidebar">
                    <h3>Real Estate Video</h3>
                    <iframe
                        width="100%"
                        height="200"
                        src="https://www.youtube.com/embed/HQZsQc2s2Pc"
                        title="Real Estate Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </aside>
            </div>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-content">
                    <h3>Explore Green Plots with Us</h3>
                    <p>Find the best agriculture and commercial land investments in peaceful surroundings.</p>
                </div>
                <div className="footer-images">
                    <img src="https://via.placeholder.com/150x100?text=Green+Plot+1" alt="Green Plot 1" />
                    <img src="https://via.placeholder.com/150x100?text=Green+Plot+2" alt="Green Plot 2" />
                    <img src="https://via.placeholder.com/150x100?text=Green+Plot+3" alt="Green Plot 3" />
                </div>
            </footer>

            {/* Chatbot Widget */}
            <div className={`chatbot-container ${chatOpen ? "open" : ""}`}>
                {!chatOpen && (
                    <button className="chatbot-toggle" onClick={() => setChatOpen(true)}>
                        💬
                    </button>
                )}
                {chatOpen && (
                    <div className="chatbot-window">
                        <div className="chatbot-header">
                            <span>Chat with Us</span>
                            <button onClick={() => setChatOpen(false)}>✖</button>
                        </div>
                        <div className="chatbot-body">
                            {messages.map((msg, index) => (
                                <div key={index} className={`chat-message ${msg.from}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <form className="chatbot-input" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default MainPage;
