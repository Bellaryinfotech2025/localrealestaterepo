import { useState, useEffect } from "react";
import { fetchRecords } from "../service/Addlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Lrecustomerselectiondesign.css"; // custom styles

const Lrecustomerselection = () => {
  const [activeTab, setActiveTab] = useState("All Cities");
  const [filter, setFilter] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [closingModal, setClosingModal] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [weather, setWeather] = useState(null);
  const [data, setData] = useState([]);

  const tabs = ["All Cities", "Kurnool", "Hyderabad", "Mahabubnagar"];

  // ------------------ Fetch Records ------------------
  const fetchrecords = async () => {
    try {
      const response = await fetchRecords();
      setData(response.data);
      if (response.status === 200) console.log("Records fetched successfully");
    } catch (error) {
      console.log("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchrecords();
  }, []);

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
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ------------------ Weather ------------------
  const fetchWeather = async (city) => {
    try {
      const apiKey = "10b342b4c70bdb14bba70c32595722bb";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const weatherData = await res.json();
      if (weatherData.cod === 200) {
        setWeather({ temp: weatherData.main.temp, desc: weatherData.weather[0].description });
      } else setWeather(null);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setWeather(null);
    }
  };

  useEffect(() => {
    if (activeTab !== "All Cities") fetchWeather(activeTab);
  }, [activeTab]);

  // ------------------ Filtered Properties ------------------
  const getCurrentProperties = () => {
    let filtered = [...data];

    if (activeTab !== "All Cities") {
      filtered = filtered.filter((p) => p.location === activeTab);
    }

    if (filter === "3") filtered = filtered.filter((p) => (p.area || "").toString().includes("3"));
    if (filter === "5") filtered = filtered.filter((p) => (p.area || "").toString().includes("5"));

    return filtered;
  };

  const handleCardClick = (property) => {
    setSelectedCard(property);
    setShowModal(true);
    toast.info(`Viewing property: ${property.title}`);
  };

  const handleCloseModal = () => {
    setClosingModal(true);
    setTimeout(() => {
      setSelectedCard(null);
      setShowModal(false);
      setClosingModal(false);
    }, 300);
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2500} />
      <h1 className="text-center mb-4">Find Your Perfect Property</h1>

      {/* Tabs */}
      <div className="d-flex justify-content-center mb-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn me-2 mb-2 ${activeTab === tab ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Greeting & Weather */}
      {activeTab !== "All Cities" && (
        <div className="d-flex justify-content-between mb-3 flex-wrap">
          <p className="mb-1">
            👋 {greeting}, welcome to <b>{activeTab}</b> properties!
          </p>
          {weather ? (
            <p className="mb-1">
              🌤 {weather.temp}°C — {weather.desc}
            </p>
          ) : (
            <p className="mb-1">Fetching weather...</p>
          )}
        </div>
      )}

      {/* Filters centered */}
      <div className="d-flex justify-content-center mb-4 flex-wrap">
        <button
          className={`btn me-2 mb-2 ${filter === "all" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn me-2 mb-2 ${filter === "3" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilter("3")}
        >
          3 Cents
        </button>
        <button
          className={`btn me-2 mb-2 ${filter === "5" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilter("5")}
        >
          5 Cents
        </button>
      </div>

      {/* Properties */}
      <div className="row">
        {getCurrentProperties().map((property) => (
          <div key={property.id} className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
            <div className="card shadow-sm rounded hover-card w-100" onClick={() => handleCardClick(property)} style={{ cursor: "pointer" }}>
              <img
                src={property.imageUrl ? `http://195.35.45.56:5858${property.imageUrl}` : "/placeholder.jpg"}
                className="card-img-top"
                alt={property.title}
                style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{property.title}</h5>
                <p className="mb-1"><strong>Location:</strong> {property.location}</p>
                <p className="mb-1"><strong>Area:</strong> {property.area} Cents</p>
                <p className="mb-1"><strong>Price:</strong> ₹{property.price}</p>
                <p className="card-text flex-grow-1">{property.description || property.features}</p>
                <a
                  href={`https://wa.me/917013438163?text=Hey I want to know more about ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className={`modal fade ${showModal ? "show d-block" : ""}`} onClick={handleCloseModal} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCard.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedCard.imageUrl ? `http://195.35.45.56:5858${selectedCard.imageUrl}` : "/placeholder.jpg"}
                  className="img-fluid mb-3"
                  alt={selectedCard.title}
                />
                <p><strong>Location:</strong> {selectedCard.location}</p>
                <p><strong>Price:</strong> ₹{selectedCard.price}</p>
                <h6>Features</h6>
                <p>{selectedCard.description || selectedCard.features}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lrecustomerselection;
