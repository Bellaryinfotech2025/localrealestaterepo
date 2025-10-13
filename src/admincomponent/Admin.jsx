import { useState, useEffect } from "react";
import "../admincomponent/Admindesigin.css";

export default function SuperAdminGallery() {
    const [images, setImages] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("uploadedImages")) || [];
        } catch {
            return [];
        }
    });

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [area, setArea] = useState("");
    const [price, setPrice] = useState("");
    const [features, setFeatures] = useState("");
    const [error, setError] = useState("");
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [expandedImage, setExpandedImage] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);
    const [showSuccess, setShowSuccess] = useState(false);

    // Admin login state
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem("uploadedImages", JSON.stringify(images));
        } catch (err) {
            console.error("Error saving to localStorage:", err);
            setError("⚠️ Storage full. Delete some images first.");
        }
    }, [images]);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const resizeImage = (file, maxWidth = 800, maxHeight = 600) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();
            reader.onload = (e) => {
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL("image/jpeg", 0.8));
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleAdd = async () => {
        setError("");
        if (!file) return setError("⚠️ Please select an image");
        if (!title || !location || !area || !price || !features)
            return setError("⚠️ Fill all fields");

        try {
            const resized = await resizeImage(file);

            // Add tag based on location
            let tag = "";
            if (location === "Kurnool") tag = "knl";
            else if (location === "Hyderabad") tag = "hyd";

            const newImage = {
                id: Date.now(),
                url: resized,
                title,
                location,
                area,
                price,
                features,
                tag,
            };

            const updatedImages = [newImage, ...images];
            setImages(updatedImages);
            setVisibleCount((prev) => prev + 1);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1500);

            window.dispatchEvent(new Event("imagesUpdated"));

            // Reset form
            setFile(null);
            setTitle("");
            setLocation("");
            setArea("");
            setPrice("");
            setFeatures("");
            document.getElementById("fileInput").value = null;
        } catch (err) {
            console.error("Error processing image:", err);
            setError("⚠️ Could not process the image. Try another file.");
        }
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (!confirmDelete) return;
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        setVisibleCount((prev) => Math.min(prev, updated.length));
        window.dispatchEvent(new Event("imagesUpdated"));
    };

    const openExpand = (img) => {
        setExpandedImage(img);
        document.body.style.overflow = "hidden";
    };

    const closeExpand = () => {
        setExpandedImage(null);
        document.body.style.overflow = "auto";
    };

    const loadMore = () => setVisibleCount((prev) => prev + 12);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAdminEmail("");
        setAdminPassword("");
        window.location.href = "/";
    };

    const handleHome = () => {
        if (!isLoggedIn) {
            alert("⚠️ You must logout first to go to Home");
            return;
        }
        window.location.href = "/";
    };

    const handleAdminLogin = () => {
        if (adminEmail === "lrenoor@gmail.com" && adminPassword === "admin123") {
            setIsLoggedIn(true);
            alert("✅ Admin logged in successfully!");
        } else {
            alert("❌ Invalid email or password");
        }
    };

    return (
        <div className="gallery-wrapper">
            {!isLoggedIn ? (
                <div className="admin-login">
                    <h2>Admin Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <button onClick={handleAdminLogin}>Login</button>
                </div>
            ) : (
                <>
                    <div className="admin-actions">
                        <button onClick={handleLogout}>Logout</button>
                        <button onClick={handleHome}>Home</button>
                    </div>

                    <h1 className="gallery-heading">📸 LRE - Upload Property Images</h1>
                    <div className="gallery-instructions">
                        1️⃣ Select an image <br />
                        2️⃣ Fill Title, Location, Area, Price, Features <br />
                        3️⃣ Click “Add Image” to upload
                    </div>

                    <div className="gallery-upload">
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <select value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option value="">Select Location</option>
                            <option value="Kurnool">Kurnool</option>
                            <option value="Hyderabad">Hyderabad</option>
                        </select>
                        <input placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} />
                        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <input placeholder="Features" value={features} onChange={(e) => setFeatures(e.target.value)} />
                        <button onClick={handleAdd}>➕ Add Image</button>
                        {error && <div className="gallery-error">{error}</div>}
                    </div>

                    <div className="gallery-grid">
                        {images.length === 0 && <div className="no-images">No images uploaded yet.</div>}

                        {images.slice(0, visibleCount).map((img, i) => (
                            <div
                                key={img.id}
                                className={`gallery-card ${hoverIndex === i ? "hovered" : ""}`}
                                onMouseEnter={() => setHoverIndex(i)}
                                onMouseLeave={() => setHoverIndex(-1)}
                                onClick={() => openExpand(img)}
                            >
                                <div className="card-left">
                                    <img src={img.url} alt={img.title} className="card-image" />
                                    <div className="card-info">
                                        <p><strong>📍 Location:</strong> {img.location}</p>
                                        <p><strong>📏 Area:</strong> {img.area}</p>
                                        <p><strong>💰 Price:</strong> {img.price}</p>
                                        <p>
                                            <strong>🏷️ Tag:</strong>{" "}
                                            <span className={`tag ${img.tag}`}>{img.tag}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="card-right">
                                    <h3>{img.title}</h3>
                                    <p><strong>⭐ Features:</strong> {img.features}</p>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(i);
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {visibleCount < images.length && (
                        <button className="load-more-btn" onClick={loadMore}>
                            ⬇️ Load More
                        </button>
                    )}

                    {expandedImage && (
                        <div className="modal-overlay" onClick={closeExpand}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <button className="modal-close" onClick={closeExpand}>✕</button>
                                <img src={expandedImage.url} alt={expandedImage.title} className="modal-image" />
                                <div className="modal-details">
                                    <h2>{expandedImage.title}</h2>
                                    <p><strong>📍 Location:</strong> {expandedImage.location}</p>
                                    <p><strong>📏 Area:</strong> {expandedImage.area}</p>
                                    <p><strong>💰 Price:</strong> {expandedImage.price}</p>
                                    <p><strong>⭐ Features:</strong> {expandedImage.features}</p>
                                    <p>
                                        <strong>🏷️ Tag:</strong>{" "}
                                        <span className={`tag ${expandedImage.tag}`}>{expandedImage.tag}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {showSuccess && <div className="success-popup"></div>}
                </>
            )}
        </div>
    );
}
