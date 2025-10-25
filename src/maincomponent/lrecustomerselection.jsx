import { useState, useEffect } from "react";
import "../maindesigncomponent/Lrecustomerselectiondesign.css";
import { fetchRecords } from "../service/Addlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      console.log(response.data);
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
    let filtered = [...data]; // start with all properties

    // Filter by city if not "All Cities"
    if (activeTab !== "All Cities") {
      filtered = filtered.filter((p) => p.location === activeTab);
    }

    // Apply area filter
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
    <div className="real-estate-wrapper">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="real-estate-container">
        <h1 className="real-estate-main-heading">Find Your Perfect Property</h1>

        {/* Tabs */}
        <nav className="real-estate-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`real-estate-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Greeting & Weather */}
        {activeTab !== "All Cities" && (
          <div className="city-info-bar">
            <p className="greeting-text">
              👋 {greeting}, welcome to <b>{activeTab}</b> properties!
            </p>
            {weather ? (
              <p className="weather-text">
                🌤 {weather.temp}°C — {weather.desc}
              </p>
            ) : (
              <p className="weather-text">Fetching weather...</p>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="filter-section">
          <span className={`filter-chip ${filter === "all" ? "active-chip" : ""}`} onClick={() => setFilter("all")}>
            All
          </span>
          <span className={`filter-chip ${filter === "3" ? "active-chip" : ""}`} onClick={() => setFilter("3")}>
            3 Cents
          </span>
          <span className={`filter-chip ${filter === "5" ? "active-chip" : ""}`} onClick={() => setFilter("5")}>
            5 Cents
          </span>
        </div>

        {/* Properties */}
        <div className="property-grid">
          {getCurrentProperties().map((property) => (
            <div key={property.id} className="property-card" onClick={() => handleCardClick(property)}>
              <div className="image-wrapper">
                <img
                  src={property.imageUrl ? `http://localhost:8080${property.imageUrl}` : "/placeholder.jpg"}
                  alt={property.title}
                  className="property-image"
                />
              </div>
              <div className="property-info-box">
                <h3 className="property-title">{property.title}</h3>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Area:</strong> {property.area}</p>
                <p><strong>Price:</strong> ₹{property.price}</p>
                <p className="property-description">{property.description || property.features}</p>
                <a
                  href={`https://wa.me/917013438163?text=Hey I want to know more about ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-details-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  Contact Us
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className={`fullscreen-modal ${showModal ? "show" : ""} ${closingModal ? "closing" : ""}`} onClick={handleCloseModal}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-fullscreen" onClick={handleCloseModal}>&times;</button>
            <div className="modal-image-wrapper">
              <img src={selectedCard.imageUrl ? `http://localhost:8080${selectedCard.imageUrl}` : "/placeholder.jpg"} alt={selectedCard.title} />
            </div>
            <div className="modal-text-wrapper">
              <h2>{selectedCard.title}</h2>
              <p><strong>Location:</strong> {selectedCard.location}</p>
              <p><strong>Price:</strong> ₹{selectedCard.price}</p>
              <h4>Features</h4>
              <p>{selectedCard.description || selectedCard.features}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lrecustomerselection;
