import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../admincomponent/Admindesigin.css";
import { addData, fetchRecords, deleteRecordsById } from "../service/Addlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [property, setProperty] = useState({
    title: "",
    city: "hyderabad",
    areaSqFt: "",
    areaCents: "",
    price: "",
    features: "",
    video: null,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [data, setData] = useState([]);
  const [greeting, setGreeting] = useState("");

  const imageRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const savedLogin = localStorage.getItem("isAdminLoggedIn");
    if (savedLogin === "true") setIsLoggedIn(true);
  }, []);

  const fetchrecords = async () => {
    try {
      const response = await fetchRecords();
      const formattedData = Array.isArray(response.data[0])
        ? response.data[0]
        : response.data;
      setData(formattedData || []);
    } catch (error) {
      console.log("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchrecords();
  }, []);

  const deletepropertyById = async (id) => {
    try {
      const response = await deleteRecordsById(id);
      if (response.status === 200) {
        toast.success("Property deleted successfully!");
        fetchrecords();
      }
    } catch (error) {
      toast.error("Failed to delete property!");
    }
  };

  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  };

  useEffect(() => {
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (email.trim().toLowerCase() === "lrenoor@gmail.com" && password.trim() === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("isAdminLoggedIn", "true");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["areaSqFt", "areaCents", "price"].includes(name)) {
      const sanitizedValue = parseFloat(value) || 0;

      if (name === "areaSqFt") {
        const cents = parseFloat((sanitizedValue / 435.6).toFixed(2));
        setProperty({ ...property, areaSqFt: sanitizedValue, areaCents: cents });
      } else if (name === "areaCents") {
        const sqFt = parseFloat((sanitizedValue * 435.6).toFixed(2));
        setProperty({ ...property, areaCents: sanitizedValue, areaSqFt: sqFt });
      } else {
        setProperty({ ...property, [name]: sanitizedValue });
      }
    } else {
      setProperty({ ...property, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    if (name === "image") {
      const fileArray = Array.from(files);
      setImages(fileArray);
      setImagePreviews(fileArray.map((file) => URL.createObjectURL(file)));
    } else if (name === "video") {
      const file = files[0];
      setProperty({ ...property, video: file });
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length)
      return toast.error("Please upload at least one image.");

    try {
      const formData = new FormData();
      images.forEach((img) => formData.append("imageFile", img));
      if (property.video) formData.append("videoFile", property.video);

      formData.append("title", property.title);
      formData.append("location", property.city);
      formData.append("area", property.areaSqFt);
      formData.append("areaInCents", property.areaCents);
      formData.append("price", property.price);
      formData.append("features", property.features);

      const response = await addData(formData);

      if (response.status === 200) {
        toast.success("Property uploaded successfully!");
        fetchrecords();

        setProperty({
          title: "",
          city: "",
          areaSqFt: "",
          areaCents: "",
          price: "",
          features: "",
          video: null,
        });
        setImages([]);
        setImagePreviews([]);
        setVideoPreview(null);
        if (imageRef.current) imageRef.current.value = "";
        if (videoRef.current) videoRef.current.value = "";
      }
    } catch (err) {
      toast.error("Upload failed.");
    }
  };

  // ------------------- LOGIN UI --------------------
  if (!isLoggedIn) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h3 className="login-title">LRE RealEstate Admin</h3>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>

            <button className="btn btn-primary w-100">Login</button>
          </form>

          <ToastContainer />
        </div>
      </div>
    );
  }

  // ------------------- MAIN ADMIN UI --------------------
  return (
    <div className="admin-container">
      <div className="sidebar">

        <h4 className="sidebar-title">LRE Admin</h4>

        <button className="sidebar-btn" onClick={() => navigate("/")}>
          🏠 Home
        </button>

        <button className="sidebar-btn logout" onClick={handleLogout}>
          🚪 Logout
        </button>

      </div>

      <div className="main-content">
        <div className="header">
          <h3>Dashboard</h3>
          <span>{greeting}, Admin</span>
        </div>

        {/* ADD PROPERTY */}
        <div className="card-custom">
          <div className="card-header-custom">Add New Property</div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={property.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label>City</label>
                  <select
                    className="form-select"
                    name="city"
                    value={property.city}
                    onChange={handleChange}
                    required
                  >
                    <option>Hyderabad</option>
                    <option>Kurnool</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label>Area Sq.ft</label>
                  <input
                    type="number"
                    className="form-control"
                    name="areaSqFt"
                    value={property.areaSqFt}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Area Cents</label>
                  <input
                    type="number"
                    className="form-control"
                    name="areaCents"
                    value={property.areaCents}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={property.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label>Features</label>
                  <textarea
                    className="form-control"
                    name="features"
                    value={property.features}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="fw-bold">Upload Images</label>
                  <input
                    type="file"
                    name="image"
                    multiple
                    className="form-control"
                    onChange={handleFileChange}
                    ref={imageRef}
                  />

                  <div className="preview-images">
                    {imagePreviews.map((img, index) => (
                      <img key={index} src={img} alt="preview" />
                    ))}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="fw-bold">Upload Video (Optional)</label>

                  <input
                    type="file"
                    name="video"
                    className="form-control"
                    ref={videoRef}
                    onChange={handleFileChange}
                  />

                  {videoPreview && (
                    <video src={videoPreview} controls className="video-preview" />
                  )}
                </div>
              </div>

              <button className="btn btn-success w-100 mt-4" type="submit">
                Upload Property
              </button>
            </form>
          </div>
        </div>

        {/* PROPERTY LIST */}
        <div className="card-custom mt-4">
          <div className="card-header-dark">Property List</div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>City</th>
                    <th>Area</th>
                    <th>Price</th>
                    <th>Features</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((prop) => (
                    <tr key={prop.id}>
                      <td>
                        <img
                          src={
                            prop.imageUrl
                              ? `https://lre.bellaryinfotech.com${prop.imageUrl.replace(
                                  "/api/files/view/image",
                                  "/uploads/images"
                                )}`
                              : "https://lre.bellaryinfotech.com/uploads/images/default-placeholder.png"
                          }
                          alt={prop.title}
                          className="list-img"
                        />
                      </td>

                      <td>{prop.title}</td>
                      <td>{prop.location}</td>
                      <td>
                        {prop.area} sqft / {prop.areaInCents} cents
                      </td>
                      <td>₹{prop.price}</td>
                      <td>{prop.features}</td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deletepropertyById(prop.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>

      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default Admin;
