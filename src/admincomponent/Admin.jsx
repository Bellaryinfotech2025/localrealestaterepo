import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../admincomponent/Admindesigin.css";

const Admin = () => {
    const navigate = useNavigate();

    // ------------------ Persistent Login ------------------
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // ------------------ Property States ------------------
    const [property, setProperty] = useState({
        title: "",
        city: "Kurnool",
        areaSqFt: "",
        areaCents: "",
        price: "",
        features: "",
        image: null,
        video: null,
    });
    const [propertyList, setPropertyList] = useState([]);
    const [draggingImage, setDraggingImage] = useState(false);
    const [draggingVideo, setDraggingVideo] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [greeting, setGreeting] = useState("");

    const imageRef = useRef(null);
    const videoRef = useRef(null);

    // ------------------ Restore Login on Refresh ------------------
    useEffect(() => {
        const savedLogin = localStorage.getItem("isAdminLoggedIn");
        if (savedLogin === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    // ------------------ Load uploaded properties ------------------
    useEffect(() => {
        const uploadedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
        setPropertyList(
            uploadedImages.map((img) => ({
                id: img.id,
                title: img.title,
                price: img.price.replace("₹", ""),
                areaSqFt: img.area.split(" sq.ft")[0],
                areaCents: img.area.split("/ ")[1].replace(" cents", ""),
                city: img.location,
                features: img.features,
                imageURL: img.image,
                videoURL: img.video,
            }))
        );
    }, []);

    // ------------------ Time-Based Greeting ------------------
    const updateGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setGreeting("Good Morning");
        else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
        else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
        else setGreeting("Good Night");
    };

    useEffect(() => {
        updateGreeting();
        const interval = setInterval(updateGreeting, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // ------------------ Login Handler (Fixed) ------------------
    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = loginData;
        const validEmail = "lrenoor@gmail.com";
        const validPassword = "admin123";

        if (email.trim().toLowerCase() === validEmail && password.trim() === validPassword) {
            setIsLoggedIn(true);
            localStorage.setItem("isAdminLoggedIn", "true");
        } else {
            alert("Invalid email or password. Please try again.");
        }
    };

    // ------------------ Logout Handlers ------------------
    const handleLogout = () => setShowLogoutPopup(true);
    const confirmLogout = () => {
        setShowLogoutPopup(false);
        setIsLoggedIn(false);
        localStorage.removeItem("isAdminLoggedIn");
        navigate("/", { replace: true });
    };
    const cancelLogout = () => setShowLogoutPopup(false);

    // ------------------ Property Handlers ------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "areaSqFt") {
            const sqFt = value;
            const cents = sqFt ? (parseFloat(sqFt) / 435.6).toFixed(2) : "";
            setProperty({ ...property, areaSqFt: value, areaCents: cents });
        } else if (name === "areaCents") {
            const cents = value;
            const sqFt = cents ? (parseFloat(cents) * 435.6).toFixed(2) : "";
            setProperty({ ...property, areaCents: value, areaSqFt: sqFt });
        } else {
            setProperty({ ...property, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (!files || files.length === 0) return;
        const file = files[0];
        setProperty({ ...property, [name]: file });
        if (name === "image") setImagePreview(URL.createObjectURL(file));
        if (name === "video") setVideoPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e, type) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        if (type === "image") {
            setProperty({ ...property, image: file });
            setImagePreview(URL.createObjectURL(file));
            setDraggingImage(false);
        } else {
            setProperty({ ...property, video: file });
            setVideoPreview(URL.createObjectURL(file));
            setDraggingVideo(false);
        }
    };

    const handleDragOver = (e, type) => {
        e.preventDefault();
        if (type === "image") setDraggingImage(true);
        else setDraggingVideo(true);
    };

    const handleDragLeave = (type) => {
        if (type === "image") setDraggingImage(false);
        else setDraggingVideo(false);
    };

    const handleReplace = (type) => {
        if (type === "image") imageRef.current.click();
        else videoRef.current.click();
    };

    const handleRemoveFile = (type) => {
        if (type === "image") {
            setProperty({ ...property, image: null });
            setImagePreview(null);
        } else {
            setProperty({ ...property, video: null });
            setVideoPreview(null);
        }
    };

    // ------------------ Submit Property ------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !property.title ||
            !property.city ||
            !property.areaSqFt ||
            !property.areaCents ||
            !property.price ||
            !property.features ||
            !property.image
        ) {
            alert("Please fill all mandatory fields and upload an image.");
            return;
        }

        const newProperty = {
            ...property,
            id: Date.now(),
            imageURL: property.image ? URL.createObjectURL(property.image) : null,
            videoURL: property.video ? URL.createObjectURL(property.video) : null,
        };

        const updatedList = [newProperty, ...propertyList];
        setPropertyList(updatedList);

        const uploadedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
        uploadedImages.push({
            id: newProperty.id,
            title: newProperty.title,
            price: newProperty.price,
            area: newProperty.areaSqFt + " sq.ft / " + newProperty.areaCents + " cents",
            location: newProperty.city,
            image: newProperty.imageURL,
            video: newProperty.videoURL,
            features: newProperty.features,
            description: newProperty.features,
        });
        localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));

        window.dispatchEvent(new Event("imagesUpdated"));

        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 2500);

        setProperty({
            title: "",
            city: "Kurnool",
            areaSqFt: "",
            areaCents: "",
            price: "",
            features: "",
            image: null,
            video: null,
        });
        setImagePreview(null);
        setVideoPreview(null);
    };

    // ------------------ Remove Property ------------------
    const handleRemoveProperty = (id) => {
        const updatedList = propertyList.filter((item) => item.id !== id);
        setPropertyList(updatedList);

        const uploadedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
        const filteredImages = uploadedImages.filter((img) => img.id !== id);
        localStorage.setItem("uploadedImages", JSON.stringify(filteredImages));

        window.dispatchEvent(new Event("imagesUpdated"));
    };

    // ------------------ Login Screen ------------------
    if (!isLoggedIn) {
        return (
            <div className="admin-login-container">
                <form className="admin-login-form" onSubmit={handleLogin}>
                    <h2>Admin Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

    // ------------------ Admin Panel ------------------
    return (
        <div className="admin-wrapper">
            <header className="admin-header">
                <h2>🏠 Admin Property Upload</h2>
                <div className="greeting">{greeting}, Admin!</div>
                <div className="admin-buttons">
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <section className="admin-guidelines">
                <h3>📋 Instructions for Admin:</h3>
                <ul>
                    <li>Upload a clear property image (JPG/PNG) using drag & drop or click to select.</li>
                    <li>Optionally add a property walkthrough video.</li>
                    <li>Fill all fields carefully before submission.</li>
                    <li>Click <b>Add Property</b> to add to the list below.</li>
                    <li>You can remove any added property using the remove button.</li>
                </ul>
            </section>

            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Property Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={property.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter property title"
                        />
                    </div>

                    <div className="form-group">
                        <label>City:</label>
                        <select name="city" value={property.city} onChange={handleChange} required>
                            <option value="Kurnool">Kurnool</option>
                            <option value="Hyderabad">Hyderabad</option>
                        </select>
                    </div>

                    <div className="area-wrapper">
                        <div className="form-group">
                            <label>Area (sq.ft):</label>
                            <input
                                type="number"
                                name="areaSqFt"
                                value={property.areaSqFt}
                                onChange={handleChange}
                                placeholder="Enter area in sq.ft"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Area (Cents):</label>
                            <input
                                type="number"
                                name="areaCents"
                                value={property.areaCents}
                                onChange={handleChange}
                                placeholder="Enter area in cents"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Price (₹):</label>
                        <input
                            type="number"
                            name="price"
                            value={property.price}
                            onChange={handleChange}
                            required
                            placeholder="Enter property price"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Features:</label>
                    <textarea
                        name="features"
                        value={property.features}
                        onChange={handleChange}
                        placeholder="Enter property features"
                        rows="3"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div
                    className={`drag-drop ${draggingImage ? "dragging" : ""}`}
                    onDrop={(e) => handleDrop(e, "image")}
                    onDragOver={(e) => handleDragOver(e, "image")}
                    onDragLeave={() => handleDragLeave("image")}
                    onClick={() => imageRef.current.click()}
                >
                    {imagePreview ? (
                        <div>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxHeight: "150px", borderRadius: "8px" }}
                            />
                            <div style={{ marginTop: "8px" }}>
                                <button type="button" className="replace-btn" onClick={() => handleReplace("image")}>
                                    Replace
                                </button>
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => handleRemoveFile("image")}
                                    style={{ marginLeft: "8px" }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Drag & drop property image here or click to select</p>
                    )}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        ref={imageRef}
                        onChange={handleFileChange}
                        required
                    />
                </div>

                {/* Video Upload (Optional) */}
                <div
                    className={`drag-drop ${draggingVideo ? "dragging" : ""}`}
                    onDrop={(e) => handleDrop(e, "video")}
                    onDragOver={(e) => handleDragOver(e, "video")}
                    onDragLeave={() => handleDragLeave("video")}
                    onClick={() => videoRef.current.click()}
                >
                    {videoPreview ? (
                        <div>
                            <video
                                src={videoPreview}
                                controls
                                style={{ maxHeight: "200px", borderRadius: "8px" }}
                            />
                            <div style={{ marginTop: "8px" }}>
                                <button type="button" className="replace-btn" onClick={() => handleReplace("video")}>
                                    Replace
                                </button>
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => handleRemoveFile("video")}
                                    style={{ marginLeft: "8px" }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Drag & drop property video here or click to select (optional)</p>
                    )}
                    <input type="file" name="video" accept="video/*" ref={videoRef} onChange={handleFileChange} />
                </div>

                <button type="submit" className="submit-btn">
                    ➕ Add Property
                </button>
            </form>

            {/* Property List */}
            <section className="property-preview-section">
                <h3>🏘️ Added Properties</h3>
                {propertyList.length === 0 ? (
                    <p className="no-properties">No properties added yet.</p>
                ) : (
                    <div className="property-grid">
                        {propertyList.map((item) => (
                            <div key={item.id} className="property-card">
                                {item.imageURL && <img src={item.imageURL} alt={item.title} className="property-img" />}
                                <div className="property-info">
                                    <div className={`property-tag ${item.city === "Kurnool" ? "kurnool" : "hyderabad"}`}>
                                        {item.city}
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p>
                                        <b>Area:</b> {item.areaSqFt} sq.ft ({item.areaCents} cents)
                                    </p>
                                    <p>
                                        <b>Price:</b> ₹{item.price}
                                    </p>
                                    <p>
                                        <b>Features:</b> {item.features}
                                    </p>
                                    {item.videoURL && <video src={item.videoURL} controls className="property-video" />}
                                    <button
                                        className="remove-btn"
                                        style={{ marginTop: "8px" }}
                                        onClick={() => handleRemoveProperty(item.id)}
                                    >
                                        Remove Property
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Logout Confirmation Popup */}
            {showLogoutPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Are you sure you want to logout?</p>
                        <div className="popup-buttons">
                            <button onClick={cancelLogout}>Stay</button>
                            <button onClick={confirmLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animated Success Toast */}
            {showSuccessToast && <div className="success-toast">✅ Property added successfully!</div>}
        </div>
    );
};

export default Admin;
