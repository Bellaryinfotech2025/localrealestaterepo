import React, { useState } from "react";
import "./LoginForm.css";

const PremiumLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email.");
            return;
        }
        setError("");
        alert("Login Successful ✅");
    };

    return (
        <div className="premium-container">
            {/* Glowing Particles */}
            <div className="particles">
                {[...Array(30)].map((_, i) => {
                    const size = Math.random();
                    const left = Math.random() * 100;
                    const duration = 5 + Math.random() * 10;
                    const delay = Math.random() * 5;
                    return (
                        <span
                            key={i}
                            className="particle"
                            style={{
                                "--size": size,
                                left: `${left}%`,
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                            }}
                        ></span>
                    );
                })}
            </div>

            <form className="premium-form" onSubmit={handleSubmit}>
                <h1 className="title">Welcome Back</h1>
                <p className="subtitle">Login to your account</p>

                {error && <p className="error">{error}</p>}

                <div className={`input-group ${email ? "active" : ""}`}>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Email</label>
                </div>

                <div className={`input-group ${password ? "active" : ""}`}>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>

                <div className="forgot">
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" className="premium-submit">
                    Login
                </button>

                <p className="signup">
                    Don’t have an account? <a href="#">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default PremiumLoginForm;
