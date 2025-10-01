import { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';
import "../maindesigncomponent/lrecustomerselectiondesign.css";
import Footer from "../footercomponent/Footer";
import { Link } from "react-router-dom";

const Lrecustomerselection = () => {
  const [activeTab, setActiveTab] = useState("Kurnool");
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const tabs = ["Kurnool", "Hyderabad"];

  const tabOptions = {
    "Kurnool": ["Location", "City Outskirts", "Local City", "Border", "Land Use"],
    "Hyderabad": ["Location", "City Outskirts", "Local City", "Border", "Land Use"]
  };

  const realEstateData = {
    Kurnool: {
      "Location": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ],
      "City Outskirts": [

        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }

      ],
      "Local City": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ],
      "Border": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ],
      "Land Use": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ]
    },
    Hyderabad: {
      "Location": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ],
      "City Outskirts": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ],
      "Local City": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ],
      "Border": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ],
      "Land Use": [
        {
          id: 1,
          title: "SMART CITY",
          price: "₹6,000,00",
          area: "3 CENTS 30*44",
          location: "KALVA BUGGA ,ORVAKAL,KURNOOL",
          image: "src/assets/smartcity.jpg",
          description: " IN 450 MTS NEAR BY DRDO,AP GURUKULA SCHOOL,NH40"
        },
        {
          id: 2,
          title: "SPACE CITY ",
          price: "₹6,000,00",
          area: "3. cents 30*44",
          location: "NEAR H8 DABBA,NANNUR,KURNOOL",
          image: "src/assets/spacecity .jpg",
          description: "NEAR TO AIRPORT AND ORVAKAL INDUSTRIAL HUB,KURNOOL TO NANDYAL ROAD"
        },
        {
          id: 3,
          title: "Mango Pardise",
          price: "₹6,000,00",
          area: "3.3 cents 30*48",
          location: "GUTTAPADU,ORVAKAL,KURNOOL",
          image: "src/assets/mangopardise.jpg",
          description: "KURNOOL TO THIPPAYAPALI ROAD"
        },
        {
          id: 4,
          title: "Vayuputra township II",
          price: "₹6,000,00",
          area: "3 cents 30*40",
          location: "GUTTAPADU ,KURNOOL",
          image: "src/assets/vayuputra.jpg",
          description: "100% vastu,30*40 CC roads clear title,guttapadu,orvakal,krnool"
        }
      ]
    }
  };

  const getCurrentProperties = () => {
    const mainTab = activeTab;
    const subTab = selectedOption;
    if (realEstateData[mainTab] && realEstateData[mainTab][subTab]) {
      return realEstateData[mainTab][subTab];
    }
    return [];
  };

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  useEffect(() => {
    const options = tabOptions[activeTab];
    if (options && options.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [activeTab]);

  return (
    <div className="real-estate-wrapper">
      <div className="real-estate-container">
        <h1 className="real-estate-main-heading">Find Your Perfect Property</h1>

        {/* Tab Navigation */}
        <nav className="real-estate-nav">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`real-estate-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setShowDropdown(false);
              }}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Dropdown for selected tab */}
        <div className="dropdown-section">
          <div className="custom-dropdown-container">
            <button
              className="dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{selectedOption || `Select ${activeTab} Option`}</span>
              <ChevronDown className={`dropdown-arrow ${showDropdown ? "rotated" : ""}`} />
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                {tabOptions[activeTab].map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleDropdownSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Property Listings */}
        <div className="property-grid">
          {getCurrentProperties().map((property, index) => (
            <div
              key={property.id}
              className="property-card"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="property-image-container">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image"
                  onClick={() => setFullscreenImage(property.image)}
                />
                <div className="property-badge">{activeTab}</div>
              </div>

              <div className="property-details">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location">{property.location}</p>
                <p className="property-description">{property.description}</p>

                <div className="property-info">
                  <div className="property-area">
                    <span className="info-label">Area:</span>
                    <span className="info-value">{property.area}</span>
                  </div>
                  <div className="property-price">
                    <span className="price-label">Price:</span>
                    <span className="price-value">{property.price}</span>
                  </div>
                </div>

                {/* WhatsApp Contact Button */}
                <a
                  href={`https://wa.me/917013438163?text=Hey%20I%20want%20to%20know%20more%20about%20this%20%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-details-btn"
                >
                  Contact us
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Image Modal */}
        {fullscreenImage && (
          <div className="fullscreen-modal" onClick={() => setFullscreenImage(null)}>
            <img src={fullscreenImage} alt="Full screen" className="fullscreen-image" />
          </div>
        )}


      </div>
    </div>
  );
}

export default Lrecustomerselection;