import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../admincomponent/Admindesigin.css";
import { addData } from "../service/Addlist";

const Admin = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [property, setProperty] = useState({
    title: "",
    city: "Kurnool",
    areaSqFt: "",
    areaCents: "",
    price: "",
    features: "",
  });
  const [propertyList, setPropertyList] = useState([]);
  const [greeting, setGreeting] = useState("");

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [draggingImage, setDraggingImage] = useState(false);
  const [draggingVideo, setDraggingVideo] = useState(false);

  const imageRef = useRef(null);
  const videoRef = useRef(null);

  // Persistent login
  useEffect(() => {
    const savedLogin = localStorage.getItem("isAdminLoggedIn");
    if (savedLogin === "true") setIsLoggedIn(true);
  }, []);

  // Greeting
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting("Good Morning");
      else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
      else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Login handlers
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.email.trim().toLowerCase() === "lrenoor@gmail.com" &&
      loginData.password.trim() === "admin123"
    ) {
      setIsLoggedIn(true);
      localStorage.setItem("isAdminLoggedIn", "true");
    } else alert("Invalid email or password.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/", { replace: true });
  };

  // Property handlers
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "areaSqFt") {
      const cents = value ? (parseFloat(value) / 435.6).toFixed(2) : "";
      setProperty({ ...property, areaSqFt: value, areaCents: cents });
    } else if (name === "areaCents") {
      const sqFt = value ? (parseFloat(value) * 435.6).toFixed(2) : "";
      setProperty({ ...property, areaCents: value, areaSqFt: sqFt });
    } else setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (file) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const handleVideoChange = (file) => {
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (type === "image") handleImageChange(file);
    else handleVideoChange(file);
    setDraggingImage(false);
    setDraggingVideo(false);
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
      setImage(null);
      setImagePreview(null);
    } else {
      setVideo(null);
      setVideoPreview(null);
    }
  };

  // Submit property
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Image is required.");

    try {
      const formData = new FormData();
      formData.append("imageFile", image);
      if (video) formData.append("videoFile", video);
      formData.append("title", property.title);
      formData.append("location", property.city);
      formData.append("area", property.areaSqFt);
      formData.append("areaInCents", property.areaCents);
      formData.append("price", property.price);
      formData.append("features", property.features);

      const response = await addData(formData);

      if (response.status === 200) {
        const newProperty = {
          ...property,
          id: response.data.id,
          imageURL: response.data.imageUrl,
          videoURL: response.data.videoUrl,
        };

        console.log(response.data)

        setPropertyList([newProperty, ...propertyList]);

        const uploadedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
        uploadedImages.push({
          ...newProperty,
          location: newProperty.city,
          area: newProperty.areaSqFt + " sq.ft / " + newProperty.areaCents + " cents",
        });
        localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));

        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 2500);

        // Reset form
        setProperty({ title: "", city: "Kurnool", areaSqFt: "", areaCents: "", price: "", features: "" });
        setImage(null);
        setImagePreview(null);
        setVideo(null);
        setVideoPreview(null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    }
  };

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

      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="title" value={property.title} onChange={onChangeHandler} placeholder="Title" required />
        <select name="city" value={property.city} onChange={onChangeHandler}>
          <option value="Kurnool">Kurnool</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
        <input type="number" name="areaSqFt" value={property.areaSqFt} onChange={onChangeHandler} placeholder="Area sq.ft" required />
        <input type="number" name="areaCents" value={property.areaCents} onChange={onChangeHandler} placeholder="Area cents" required />
        <input type="number" name="price" value={property.price} onChange={onChangeHandler} placeholder="Price" required />
        <textarea name="features" value={property.features} onChange={onChangeHandler} placeholder="Features" required />

        {/* Image Upload */}
        <div className={`drag-drop ${draggingImage ? "dragging" : ""}`} onDrop={(e) => handleDrop(e, "image")} onDragOver={(e) => handleDragOver(e, "image")} onDragLeave={() => handleDragLeave("image")} onClick={() => imageRef.current.click()}>
          {imagePreview ? (
            <div>
              <img src={imagePreview} alt="Preview" style={{ maxHeight: "150px" }} />
              <div>
                <button type="button" onClick={() => handleReplace("image")}>Replace</button>
                <button type="button" onClick={() => handleRemoveFile("image")}>Remove</button>
              </div>
            </div>
          ) : (<p>Drag & drop property image here or click to select</p>)}
          <input type="file" accept="image/*" ref={imageRef} style={{ display: "none" }} onChange={(e) => e.target.files[0] && handleImageChange(e.target.files[0])} />
        </div>

        {/* Video Upload */}
        <div className={`drag-drop ${draggingVideo ? "dragging" : ""}`} onDrop={(e) => handleDrop(e, "video")} onDragOver={(e) => handleDragOver(e, "video")} onDragLeave={() => handleDragLeave("video")} onClick={() => videoRef.current.click()}>
          {videoPreview ? (
            <div>
              <video src={videoPreview} controls style={{ maxHeight: "200px" }} />
              <div>
                <button type="button" onClick={() => handleReplace("video")}>Replace</button>
                <button type="button" onClick={() => handleRemoveFile("video")}>Remove</button>
              </div>
            </div>
          ) : (<p>Drag & drop property video here or click to select (optional)</p>)}
          <input type="file" accept="video/*" ref={videoRef} style={{ display: "none" }} onChange={(e) => e.target.files[0] && handleVideoChange(e.target.files[0])} />
        </div>

        <button type="submit">➕ Add Property</button>
      </form>
    </div>
  );
};

export default Admin;
