import React, { useState, useEffect } from "react";
import "../Components/register.css";

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        location: "",
    });

    const [errors, setErrors] = useState({});
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // For animated bubbles
    const [bubbles, setBubbles] = useState([]);

    const famousPlaces = [
        { name: "Hyderabad", shortcode: "H" },
        { name: "Visakhapatnam", shortcode: "V" },
        { name: "Vijayawada", shortcode: "J" },
        { name: "Tirupati", shortcode: "T" },
        { name: "Warangal", shortcode: "W" },
        { name: "Kurnool", shortcode: "K" },
        { name: "Guntur", shortcode: "G" },
        { name: "Amaravati", shortcode: "A" },
        { name: "Rajahmundry", shortcode: "R" },
        { name: "Srisailam", shortcode: "S" },
    ];

    const filteredPlaces = famousPlaces.filter((place) =>
        searchQuery
            ? place.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            place.shortcode.toLowerCase() === searchQuery.toLowerCase()
            : true
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }
        if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.location) {
            newErrors.location = "Select your region";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            alert("Registration Successful!");
            setFormData({
                name: "",
                email: "",
                mobile: "",
                password: "",
                confirmPassword: "",
                location: "",
            });
            setSearchQuery("");
            setCheckboxChecked(false);
        }
    };

    // Generate initial bubbles on mount
    useEffect(() => {
        const colors = ["#60a5fa", "#3b82f6", "#34d399", "#fbbf24", "#f87171"];
        const initialBubbles = Array.from({ length: 25 }).map(() => ({
            id: Math.random().toString(36).substr(2, 9),
            size: Math.random() * 25 + 10, // 10px - 35px
            left: Math.random() * 100, // % horizontal position
            bottom: Math.random() * 100, // % vertical start position
            speed: Math.random() * 5 + 5, // speed in seconds (5-10)
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setBubbles(initialBubbles);
    }, []);

    return (
        <div className="registration-page">
            {/* Bubbles background */}
            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className="bubble"
                    style={{
                        width: bubble.size + "px",
                        height: bubble.size + "px",
                        left: `${bubble.left}%`,
                        animationDuration: bubble.speed + "s",
                        backgroundColor: bubble.color,
                    }}
                />
            ))}

            <form onSubmit={handleSubmit}>
                <h2>SIGN UP</h2>

                {/* Full Name */}
                <div className="mb-3">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                {/* Mobile */}
                <div className="mb-3">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength="10"
                        placeholder="10-digit Indian number"
                    />
                    {errors.mobile && <p className="error">{errors.mobile}</p>}
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>

                {/* Region */}
                <div className="mb-3">
                    <label htmlFor="location">Region</label>

                    <select
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    >
                        <input
                            type="text"
                            placeholder="Type a letter or shortcode to search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <option value="" disabled hidden>
                            -- Select Region --
                        </option>
                        {filteredPlaces.map((place, idx) => (
                            <option key={idx} value={place.name}>
                                {place.name} ({place.shortcode})
                            </option>
                        ))}
                    </select>
                    {errors.location && <p className="error">{errors.location}</p>}
                </div>

                {/* Checkbox */}
                <div className="mb-3 checkbox-container">
                    <div className="checkbox-row">
                        <input
                            type="checkbox"
                            id="conditions"
                            checked={checkboxChecked}
                            onChange={(e) => setCheckboxChecked(e.target.checked)}
                        />
                        <label htmlFor="conditions">Terms & Conditions apply</label>
                    </div>
                    {!checkboxChecked && (
                        <p className="checkbox-message">Please tick the checkbox to enable registration.</p>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={!checkboxChecked}>
                    Register
                </button>
            </form>
        </div>
    );
}
