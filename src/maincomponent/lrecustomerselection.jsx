import { useState, useEffect, useRef } from "react";
import "../maindesigncomponent/Lrecustomerselectiondesign.css";
import image1 from "../assets/smartcity.jpg";
import image2 from "../assets/spacecity .jpg";
import image3 from "../assets/mangopardise.jpg";
import image4 from "../assets/vayuputra.jpg";

const Lrecustomerselection = () => {
  const [activeTab, setActiveTab] = useState("Kurnool");
  const [expandedCard, setExpandedCard] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [visitedCards, setVisitedCards] = useState(() => {
    return JSON.parse(localStorage.getItem("visitedCards")) || [];
  });
  const [magnifier, setMagnifier] = useState({ x: 0, y: 0, visible: false, zoom: 2 });

  const modalRef = useRef(null);
  const magnifierRef = useRef(null);

  const tabs = ["Kurnool", "Hyderabad"];

  const realEstateData = {
    Kurnool: [
      { id: 1, title: "SMART CITY", price: "₹6,00,000", area: "3 CENTS 30×44", location: "Kalva Bugga, Orvakal, Kurnool", image: image1, description: "In 450 mts nearby DRDO, AP Gurukula School, NH40 — perfect investment opportunity." },
      { id: 2, title: "SPACE CITY", price: "₹6,00,000", area: "3 CENTS 30×44", location: "Near H8 Dabba, Nannur, Kurnool", image: image2, description: "Close to Airport & Orvakal Industrial Hub, excellent road connectivity." },
      { id: 3, title: "MANGO PARADISE", price: "₹6,00,000", area: "3.3 CENTS 30×48", location: "Guttapadu, Orvakal, Kurnool", image: image3, description: "Green surroundings with easy access to Kurnool–Thippayapalli road." },
      { id: 4, title: "VAYUPUTRA TOWNSHIP II", price: "₹6,00,000", area: "3 CENTS 30×40", location: "Guttapadu, Kurnool", image: image4, description: "100% vastu, CC roads, clear title, well-developed and peaceful area." },
    ],
    Hyderabad: [],
  };

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

  const getCurrentProperties = () => [...(realEstateData[activeTab] || []), ...uploadedImages];

  const handleCardClick = (id) => {
    setExpandedCard(id);

    if (!visitedCards.includes(id)) {
      const updatedVisited = [...visitedCards, id];
      setVisitedCards(updatedVisited);
      localStorage.setItem("visitedCards", JSON.stringify(updatedVisited));
    }
  };

  const closeModal = () => setExpandedCard(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (expandedCard !== null) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [expandedCard]);

  const expandedProperty = getCurrentProperties().find(p => p.id === expandedCard);

  // Handle magnifier movement
  const handleMouseMove = (e) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMagnifier({
      ...magnifier,
      x,
      y,
      visible: true,
      imgWidth: img.offsetWidth,
      imgHeight: img.offsetHeight
    });
  };

  const handleMouseLeave = () => {
    setMagnifier({ ...magnifier, visible: false });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    let newZoom = magnifier.zoom + (e.deltaY < 0 ? 0.2 : -0.2);
    if (newZoom < 1) newZoom = 1;
    if (newZoom > 5) newZoom = 5;
    setMagnifier({ ...magnifier, zoom: newZoom });
  };

  return (
    <div className="real-estate-wrapper">
      <div className="real-estate-container">
        <h1 className="real-estate-main-heading">Find Your Perfect Property</h1>

        <nav className="real-estate-nav">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`real-estate-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="property-grid">
          {getCurrentProperties().map((property) => (
            <div
              key={property.id}
              className={`property-card ${visitedCards.includes(property.id) ? "visited" : ""}`}
              onClick={() => handleCardClick(property.id)}
            >
              <div className="property-flex">
                <div className="property-left">
                  <div className="image-wrapper">
                    <img src={property.image || property.url} alt={property.title} className="property-image" />
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

        {expandedProperty && (
          <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
              <button className="close-btn" onClick={closeModal}>✕</button>
              <div className="modal-flex">
                <div className="property-left">
                  <div className="image-wrapper modal-image-wrapper"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onWheel={handleWheel}
                  >
                    <img src={expandedProperty.image || expandedProperty.url} alt={expandedProperty.title} className="property-image" />
                    {magnifier.visible && (
                      <div
                        className="magnifier-lens"
                        ref={magnifierRef}
                        style={{
                          backgroundImage: `url(${expandedProperty.image || expandedProperty.url})`,
                          backgroundSize: `${magnifier.imgWidth * magnifier.zoom}px ${magnifier.imgHeight * magnifier.zoom}px`,
                          backgroundPosition: `-${magnifier.x * magnifier.zoom - 75}px -${magnifier.y * magnifier.zoom - 75}px`,
                        }}
                      />
                    )}
                  </div>
                  <div className="property-info-box">
                    <p><strong>Location:</strong> {expandedProperty.location}</p>
                    <p><strong>Area:</strong> {expandedProperty.area}</p>
                    <p><strong>Price:</strong> {expandedProperty.price}</p>
                  </div>
                </div>
                <div className="property-right">
                  <h3 className="property-title">{expandedProperty.title}</h3>
                  <h4 className="features-heading">Features</h4>
                  <p className="property-description">{expandedProperty.description || expandedProperty.features}</p>
                  <a
                    href={`https://wa.me/917013438163?text=Hey%20I%20want%20to%20know%20more%20about%20${expandedProperty.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-details-btn"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Lrecustomerselection;
