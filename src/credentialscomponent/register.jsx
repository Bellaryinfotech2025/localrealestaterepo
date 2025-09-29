import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../credentialscomponent/registerdeisgn.css";

const RegistrationForm = () => {
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
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            ? place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              place.shortcode.toLowerCase() === searchQuery.toLowerCase()
            : true
    );

    // Check if all fields are filled
    useEffect(() => {
        const allFieldsFilled = 
            formData.name.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.mobile.trim() !== "" &&
            formData.password.trim() !== "" &&
            formData.confirmPassword.trim() !== "" &&
            formData.location.trim() !== "" &&
            checkboxChecked;
        
        setIsFormValid(allFieldsFilled);
    }, [formData, checkboxChecked]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleLocationSelect = (place) => {
        setFormData((prev) => ({ ...prev, location: place.name }));
        setSearchQuery(place.name);
        setShowDropdown(false);
        if (errors.location) {
            setErrors((prev) => ({ ...prev, location: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter valid 10-digit mobile";
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be 6+ characters";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
        }
        if (!formData.location) {
            newErrors.location = "Select your region";
        }
        if (!checkboxChecked) {
            newErrors.checkbox = "Accept terms & conditions";
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
            // Reset form
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

    const togglePasswordVisibility = (field) => {
        if (field === "password") {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <form onSubmit={handleSubmit}>
                    <h2 className="form-title">Create Account</h2>
                    
                    <div className="form-row">
                        {/* Name */}
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className={errors.name ? "error" : ""}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        {/* Mobile */}
                        <div className="form-group">
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                maxLength="10"
                                placeholder="Mobile Number"
                                className={errors.mobile ? "error" : ""}
                            />
                            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                        </div>

                        {/* Region with search */}
                        <div className="form-group">
                            <div className="custom-dropdown">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowDropdown(true);
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                    placeholder="Select Region"
                                    className={errors.location ? "error" : ""}
                                />
                                {showDropdown && (
                                    <div className="dropdown-list">
                                        {filteredPlaces.map((place, idx) => (
                                            <div
                                                key={idx}
                                                className="dropdown-item"
                                                onClick={() => handleLocationSelect(place)}
                                            >
                                                {place.name} ({place.shortcode})
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.location && <span className="error-message">{errors.location}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        {/* Password */}
                        <div className="form-group">
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className={errors.password ? "error" : ""}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => togglePasswordVisibility("password")}
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className={errors.confirmPassword ? "error" : ""}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => togglePasswordVisibility("confirmPassword")}
                                >
                                    {showConfirmPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={checkboxChecked}
                            onChange={(e) => setCheckboxChecked(e.target.checked)}
                        />
                        <label htmlFor="terms">I agree to the Terms & Conditions</label>
                    </div>
                    {errors.checkbox && <span className="error-message center">{errors.checkbox}</span>}

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className={`submit-btn ${!isFormValid ? 'disabled' : ''}`}
                        disabled={!isFormValid}
                    >
                        Register Now
                    </button>

                    {/* Login Link */}
                    <div className="login-link-wrapper">
                        <span>Already have an account? </span>
                        <Link to="/login" className="login-link">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;