import { useState, useEffect } from "react";
import "../maindesigncomponent/Lrecustomerselectiondesign.css";
import image1 from "../assets/smartcity.jpg";
import image2 from "../assets/spacecity .jpg";
import image3 from "../assets/mangopardise.jpg";
import image4 from "../assets/vayuputra.jpg";

const Lrecustomerselection = () => {
  const [activeTab, setActiveTab] = useState("Kurnool");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [closingModal, setClosingModal] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [weather, setWeather] = useState(null);

  const tabs = ["Kurnool", "Hyderabad"];

  const realEstateData = {
    Kurnool: [
      {
        id: 1,
        title: "SMART CITY",
        price: "₹6,00,000",
        area: "3 CENTS 30×44",
        location: "Kalva Bugga, Orvakal, Kurnool",
        image: image1,
        description:
          "In 450 mts nearby DRDO, AP Gurukula School, NH40 — perfect investment opportunity.",
      },
      {
        id: 2,
        title: "SPACE CITY",
        price: "₹6,00,000",
        area: "3 CENTS 30×44",
        location: "Near H8 Dabba, Nannur, Kurnool",
        image: image2,
        description:
          "Close to Airport & Orvakal Industrial Hub, excellent road connectivity.",
      },
      {
        id: 3,
        title: "MANGO PARADISE",
        price: "₹6,00,000",
        area: "5 CENTS 30×48",
        location: "Guttapadu, Orvakal, Kurnool",
        image: image3,
        description:
          "Green surroundings with easy access to Kurnool–Thippayapalli road.",
      },
      {
        id: 4,
        title: "VAYUPUTRA TOWNSHIP II",
        price: "₹6,00,000",
        area: "5 CENTS 30×40",
        location: "Guttapadu, Kurnool",
        image: image4,
        description:
          "100% vastu, CC roads, clear title, well-developed and peaceful area.",
      },
    ],
    Hyderabad: [],
  };

  // ------------------ GREETING ------------------
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

  // ------------------ WEATHER ------------------
  const fetchWeather = async (city) => {
    try {
      const apiKey = "10b342b4c70bdb14bba70c32595722bb";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather({
          temp: data.main.temp,
          desc: data.weather[0].description,
        });
      } else {
        setWeather(null);
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      setWeather(null);
    }
  };

  useEffect(() => {
    if (activeTab) fetchWeather(activeTab);
  }, [activeTab]);

  // ------------------ UPLOADED PROPERTIES ------------------
  const getUploadedImages = () => {
    const allImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    return allImages.filter((img) => img.location === activeTab);
  };

  useEffect(() => {
    setUploadedImages(getUploadedImages());
    const updateImages = () => setUploadedImages(getUploadedImages());
    window.addEventListener("imagesUpdated", updateImages);
    return () => window.removeEventListener("imagesUpdated", updateImages);
  }, [activeTab]);

  const getCurrentProperties = () => {
    const all = [...(realEstateData[activeTab] || []), ...uploadedImages];
    if (filter === "3")
      return all.filter((p) => p.area.toLowerCase().includes("3 cent"));
    if (filter === "5")
      return all.filter((p) => p.area.toLowerCase().includes("5 cent"));
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
    }, 300);
  };

  return (
    <div className="real-estate-wrapper">
      <div className="real-estate-container">
        {/* MAIN HEADING */}
        <h1 className="real-estate-main-heading">Find Your Perfect Property</h1>

        {/* CITY TABS */}
        <nav className="real-estate-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`real-estate-tab ${activeTab === tab ? "active" : ""
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* GREETING + WEATHER  */}
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

        {/* FILTERS */}
        <div className="filter-section">
          <span
            className={`filter-chip ${filter === "all" ? "active-chip" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </span>
          <span
            className={`filter-chip ${filter === "3" ? "active-chip" : ""}`}
            onClick={() => setFilter("3")}
          >
            3 Cents
          </span>
          <span
            className={`filter-chip ${filter === "5" ? "active-chip" : ""}`}
            onClick={() => setFilter("5")}
          >
            5 Cents
          </span>
        </div>

        {/* PROPERTY GRID */}
        <div className="property-grid">
          {getCurrentProperties().map((property) => (
            <div
              key={property.id}
              className="property-card"
              onClick={() => handleCardClick(property)}
            >
              <div className="property-flex">
                <div className="property-left">
                  <div className="image-wrapper">
                    <img
                      src={property.image || property.imageURL}
                      alt={property.title}
                      className="property-image"
                    />
                  </div>
                  <div className="property-info-box">
                    <p>
                      <strong>Location:</strong> {property.location}
                    </p>
                    <p>
                      <strong>Area:</strong> {property.area}
                    </p>
                    <p>
                      <strong>Price:</strong> {property.price}
                    </p>
                  </div>
                </div>
                <div className="property-right">
                  <h3 className="property-title">{property.title}</h3>
                  <h4 className="features-heading">Features</h4>
                  <p className="property-description">
                    {property.description || property.features}
                  </p>
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

      {/* MODAL */}
      {selectedCard && (
        <div
          className={`fullscreen-modal ${showModal ? "show" : ""} ${closingModal ? "closing" : ""
            }`}
          onClick={handleCloseModal}
        >
          <div
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-fullscreen" onClick={handleCloseModal}>
              &times;
            </button>
            <div className="modal-image-wrapper">
              <img
                src={selectedCard.image || selectedCard.imageURL}
                alt={selectedCard.title}
              />
            </div>
            <div className="modal-text-wrapper">
              <p>
                <strong>Location:</strong> {selectedCard.location}
              </p>
              <p>
                <strong>Price:</strong> {selectedCard.price}
              </p>
            </div>
            <div className="modal-text-wrapper">
              <h2>{selectedCard.title}</h2>
            </div>
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
