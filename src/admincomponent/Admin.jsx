import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../admincomponent/Admindesigin.css";
import { addData, fetchRecords, deleteRecordsById } from "../service/Addlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const navigate = useNavigate();

  // ------------------ Persistent Login ------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // ------------------ Property States ------------------
  const [property, setProperty] = useState({
    title: "",
    city: "Mahabubnagar",
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

  // ------------------ Restore Login on Refresh ------------------
  useEffect(() => {
    const savedLogin = localStorage.getItem("isAdminLoggedIn");
    if (savedLogin === "true") setIsLoggedIn(true);
  }, []);

  // ------------------ Fetch Properties ------------------
  const fetchrecords = async () => {
    try {
      const response = await fetchRecords();
      setData(response.data);
    } catch (error) {
      console.log("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchrecords();
  }, []);

  // ------------------ Delete Property ------------------
  const deletepropertyById = async (id) => {
    try {
      const response = await deleteRecordsById(id);
      if (response.status === 200) {
        toast.success("Property deleted successfully!");
        fetchrecords();
      }
    } catch (error) {
      console.log("Error  while deleting property:");
      toast.error("Failed to delete property!");
    }
  };

  // ------------------ Greeting ------------------
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

  // ------------------ Login Handler ------------------
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

  // ------------------ Logout ------------------
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/", { replace: true });
  };

  // ------------------ Property Handlers ------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["areaSqFt", "areaCents", "price"].includes(name)) {
      const sanitizedValue = parseFloat(value) || 0;
      if (name === "areaSqFt") {
        const cents = (sanitizedValue / 435.6).toFixed(2);
        setProperty({ ...property, areaSqFt: sanitizedValue, areaCents: cents });
      } else if (name === "areaCents") {
        const sqFt = (sanitizedValue * 435.6).toFixed(2);
        setProperty({ ...property, areaCents: sanitizedValue, areaSqFt: sqFt });
      } else setProperty({ ...property, [name]: sanitizedValue });
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
    if (!images.length) return toast.error("Please upload at least one image.");

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

        setProperty({ title: "", city: "Mahabubnagar", areaSqFt: "", areaCents: "", price: "", features: "", video: null });
        setImages([]);
        setImagePreviews([]);
        setVideoPreview(null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed. Check console for details.");
    }
  };

  // ------------------ Login Screen ------------------
  if (!isLoggedIn) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ width: "350px" }}>
          <h3 className="text-center mb-3 text-primary">Admin Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary w-100">Login</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    );
  }

  // ------------------ Admin Panel ------------------
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white vh-100 d-flex flex-column p-3">
          <div className="mb-4 text-center">
            <h5 className="text-primary">Admin Panel</h5>
            <small className="text-muted">Mohammed Mahmood</small>
          </div>

          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item mb-2">
              <button className="nav-link text-white d-flex align-items-center" onClick={() => navigate("/")}>
                <i className="bi bi-house-fill me-2"></i> Home
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className="nav-link text-white d-flex align-items-center">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </button>
            </li>
            <li className="nav-item mt-auto">
              <button className="nav-link text-danger d-flex align-items-center" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Dashboard</h3>
            <span className="text-muted">{greeting}, Admin!</span>
          </div>

          {/* Add Property Form */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">Add New Property</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Title" name="title" value={property.title} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <select className="form-select" name="city" value={property.city} onChange={handleChange} required>
                      <option>Mahabubnagar</option>
                      <option>Hyderabad</option>
                      <option>Narayanpet</option>
                      <option>Kurnool</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Area (sq.ft)" name="areaSqFt" value={property.areaSqFt} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Area (cents)" name="areaCents" value={property.areaCents} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Price" name="price" value={property.price} onChange={handleChange} />
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" placeholder="Features" name="features" value={property.features} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Upload Images</label>
                    <input type="file" name="image" multiple className="form-control" onChange={handleFileChange} ref={imageRef} />
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {imagePreviews.map((img, i) => (
                        <img key={i} src={img} alt="preview" style={{ width: "100px", height: "70px", objectFit: "cover", borderRadius: "5px" }} />
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Upload Video (Optional)</label>
                    <input type="file" name="video" className="form-control" onChange={handleFileChange} ref={videoRef} />
                    {videoPreview && <video src={videoPreview} controls className="mt-2" style={{ width: "100%", borderRadius: "5px" }} />}
                  </div>
                </div>
                <button type="submit" className="btn btn-success w-100 mt-3">Upload Property</button>
              </form>
            </div>
          </div>

          {/* Property List */}
          <div className="card shadow">
            <div className="card-header bg-dark text-white">Property List</div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
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
                          <img src={`http://localhost:8080${prop.imageUrl}`} alt={prop.title} style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "5px" }} />
                        </td>
                        <td>{prop.title}</td>
                        <td>{prop.location}</td>
                        <td>{prop.areaSqFt} sq.ft / {prop.areaCents} cents</td>
                        <td>₹{prop.price}</td>
                        <td>{prop.features}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => deletepropertyById(prop.id)}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default Admin;
