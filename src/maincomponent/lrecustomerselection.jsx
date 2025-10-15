import { useState, useEffect } from "react";
import "../maindesigncomponent/Lrecustomerselectiondesign.css";
import image1 from "../assets/smartcity.jpg";
import image2 from "../assets/spacecity .jpg";
import image3 from "../assets/mangopardise.jpg";
import image4 from "../assets/vayuputra.jpg";

const Lrecustomerselection = () => {
  const [activeTab, setActiveTab] = useState("Kurnool");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [visitedCards, setVisitedCards] = useState(() => JSON.parse(localStorage.getItem("visitedCards")) || []);
  const [filter, setFilter] = useState("all");
  const [greeting, setGreeting] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [closingModal, setClosingModal] = useState(false);

  const apiKey = "4d0469debd238a1f43c2b480b9284c7d";
  const tabs = ["Kurnool", "Hyderabad"];

  const realEstateData = {
    Kurnool: [
      { id: 1, title: "SMART CITY", price: "₹6,00,000", area: "3 CENTS 30×44", location: "Kalva Bugga, Orvakal, Kurnool", image: image1, description: "In 450 mts nearby DRDO, AP Gurukula School, NH40 — perfect investment opportunity." },
      { id: 2, title: "SPACE CITY", price: "₹6,00,000", area: "3 CENTS 30×44", location: "Near H8 Dabba, Nannur, Kurnool", image: image2, description: "Close to Airport & Orvakal Industrial Hub, excellent road connectivity." },
      { id: 3, title: "MANGO PARADISE", price: "₹6,00,000", area: "5 CENTS 30×48", location: "Guttapadu, Orvakal, Kurnool", image: image3, description: "Green surroundings with easy access to Kurnool–Thippayapalli road." },
      { id: 4, title: "VAYUPUTRA TOWNSHIP II", price: "₹6,00,000", area: "5 CENTS 30×40", location: "Guttapadu, Kurnool", image: image4, description: "100% vastu, CC roads, clear title, well-developed and peaceful area." },
    ],
    Hyderabad: [],
  };

  const getUploadedImages = () => {
    const allImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    return allImages
      .filter((img) => img.location === activeTab)
      .map((img, index) => ({
        id: img.id || `uploaded-${index}`,
        title: img.title || "Uploaded Property",
        price: img.price || "N/A",
        area: img.area || "N/A",
        location: img.location || activeTab,
        image: img.image || img.url || "https://via.placeholder.com/400x300?text=No+Image",
        description: img.description || "",
        features: img.features || "",
      }));
  };

  useEffect(() => {
    setUploadedImages(getUploadedImages());
    const updateImages = () => setUploadedImages(getUploadedImages());
    window.addEventListener("imagesUpdated", updateImages);
    return () => window.removeEventListener("imagesUpdated", updateImages);
  }, [activeTab]);

  // Time-based Greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Weather Data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${activeTab}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();
        if (data.main && data.weather) {
          setTemperature(Math.round(data.main.temp));
          setWeatherIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        } else {
          setTemperature(null);
          setWeatherIcon(null);
        }
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };
    fetchWeather();
  }, [activeTab]);

  const getCurrentProperties = () => {
    const all = [...(realEstateData[activeTab] || []), ...uploadedImages];
    if (filter === "3") return all.filter((p) => p.area.toLowerCase().includes("3 cent"));
    if (filter === "5") return all.filter((p) => p.area.toLowerCase().includes("5 cent"));
    return all;
  };

  const handleCardClick = (property) => {
    setSelectedCard(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setClosingModal(true);
    setTimeout(() => {
      setSelectedCard(null);
      setShowModal(false);
      setClosingModal(false);
    }, 300); // match CSS animation duration
  };

  return (
    <div className="real-estate-wrapper">
      {/* Top Info Bar */}
      <div className="top-info-bar">
        <div className="left-info">
          <p className="hi-user">👋 Hi User,</p>
          <p className="greeting">{greeting}</p>
        </div>
        <div className="right-info">
          {temperature !== null ? (
            <div className="weather-bubble">
              <img src={weatherIcon} alt="Weather" className="weather-icon" />
              <span>{temperature}°C</span>
            </div>
          ) : (
            <span className="weather-bubble">Loading...</span>
          )}
        </div>
      </div>

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

        {/* Filters */}
        <div className="filter-section">
          <span className={`filter-chip ${filter === "all" ? "active-chip" : ""}`} onClick={() => setFilter("all")}>All</span>
          <span className={`filter-chip ${filter === "3" ? "active-chip" : ""}`} onClick={() => setFilter("3")}>3 Cents</span>
          <span className={`filter-chip ${filter === "5" ? "active-chip" : ""}`} onClick={() => setFilter("5")}>5 Cents</span>
        </div>

        {/* Property Grid */}
        <div className="property-grid">
          {getCurrentProperties().map((property) => (
            <div
              key={property.id}
              className={`property-card ${visitedCards.includes(property.id) ? "visited" : ""}`}
              onClick={() => handleCardClick(property)}
            >
              <div className="property-flex">
                <div className="property-left">
                  <div className="image-wrapper">
                    <img src={property.image} alt={property.title} className="property-image" />
                  </div>
                  <div className="property-info-box">
                    <p><strong>Location:</strong> {property.location}</p>
                    <p><strong>Area:</strong> {property.area}</p>
                    <p><strong>Price:</strong> {property.price}</p>
                  </div>
                </div>
                <div className="property-right">
                  <h3 className="property-title">{property.title}</h3>
                  <h4 className="features-heading">Features</h4>
                  <p className="property-description">{property.description || property.features}</p>
                  <a
                    href={`https://wa.me/917013438163?text=Hey%20I%20want%20to%20know%20more%20about%20${property.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-details-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal 4-part layout */}
      {selectedCard && (
        <div
          className={`fullscreen-modal ${showModal ? "show" : ""} ${closingModal ? "closing" : ""}`}
          onClick={handleCloseModal}
        >
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-fullscreen" onClick={handleCloseModal}>&times;</button>

            {/* A: Top Left Image */}
            <div className="modal-image-wrapper">
              <img src={selectedCard.image} alt={selectedCard.title} />
            </div>

            {/* B: Location & Price */}
            <div className="modal-text-wrapper">
              <p><strong>Location:</strong> {selectedCard.location}</p>
              <p><strong>Price:</strong> {selectedCard.price}</p>
            </div>

            {/* C: Title */}
            <div className="modal-text-wrapper">
              <h2>{selectedCard.title}</h2>
            </div>

            {/* D: Features/Description */}
            <div className="modal-text-wrapper">
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
