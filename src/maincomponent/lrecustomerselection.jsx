import { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';
import "../maindesigncomponent/lrecustomerselectiondesign.css";
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
          title: "Prime Commercial Space in Kurnool",
          price: "₹2,000,000",
          area: "4,500 sq ft",
          location: "Kurnool City Center",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
          description: "Premium office space in the heart of Kurnool"
        },
        {
          id: 2,
          title: "Luxury Retail Plaza in Kurnool",
          price: "₹3,500,000",
          area: "7,800 sq ft",
          location: "Main Street, Kurnool",
          image: "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800",
          description: "High-end retail space with excellent foot traffic"
        },
        {
          id: 3,
          title: "Modern Office Complex in Kurnool",
          price: "₹4,000,000",
          area: "11,000 sq ft",
          location: "Business Square, Kurnool",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          description: "State-of-the-art office building with parking"
        },
        {
          id: 4,
          title: "Mixed-Use Development in Kurnool",
          price: "₹5,000,000",
          area: "14,000 sq ft",
          location: "Kurnool Plaza",
          image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800",
          description: "Commercial and residential mixed property"
        }
      ],
      "City Outskirts": [
        {
          id: 1,
          title: "Fertile Farm Land in Kurnool",
          price: "₹400,000",
          area: "45 acres",
          location: "Rural Kurnool",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          description: "Prime agricultural land with irrigation"
        },
        {
          id: 2,
          title: "Organic Farm Estate in Kurnool",
          price: "₹600,000",
          area: "70 acres",
          location: "Green Valley, Kurnool",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800",
          description: "Certified organic farming land with facilities"
        },
        {
          id: 3,
          title: "Vineyard Property in Kurnool",
          price: "₹850,000",
          area: "40 acres",
          location: "Hill Country, Kurnool",
          image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800",
          description: "Established vineyard with processing unit"
        },
        {
          id: 4,
          title: "Ranch Land in Kurnool",
          price: "₹1,100,000",
          area: "110 acres",
          location: "Western Plains, Kurnool",
          image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
          description: "Large ranch property with water rights"
        }
      ],
      "Local City": [
        {
          id: 1,
          title: "Residential Plot in Kurnool",
          price: "₹120,000",
          area: "9,500 sq ft",
          location: "Suburban Kurnool",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          description: "Ready-to-build residential plot"
        },
        {
          id: 2,
          title: "Commercial Land in Kurnool",
          price: "₹340,000",
          area: "14,500 sq ft",
          location: "Main Road, Kurnool",
          image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800",
          description: "Prime commercial location"
        },
        {
          id: 3,
          title: "Industrial Plot in Kurnool",
          price: "₹540,000",
          area: "24,000 sq ft",
          location: "Industrial Zone, Kurnool",
          image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800",
          description: "Approved industrial land"
        },
        {
          id: 4,
          title: "Mixed Use Land in Kurnool",
          price: "₹440,000",
          area: "19,000 sq ft",
          location: "Development Zone, Kurnool",
          image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800",
          description: "Flexible zoning for mixed development"
        }
      ],
      "Border": [
        {
          id: 1,
          title: "State Border Property in Kurnool",
          price: "₹1,700,000",
          area: "180 acres",
          location: "State Border, Kurnool",
          image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
          description: "Dense forest land with diverse flora"
        },
        {
          id: 2,
          title: "District Border Land in Kurnool",
          price: "₹900,000",
          area: "75 acres",
          location: "District Border, Kurnool",
          image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
          description: "Mixed woodland with development potential"
        },
        {
          id: 3,
          title: "City Limits Property in Kurnool",
          price: "₹2,100,000",
          area: "280 acres",
          location: "City Limits, Kurnool",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800",
          description: "Pristine forest ideal for conservation"
        },
        {
          id: 4,
          title: "Rural Border Land in Kurnool",
          price: "₹1,400,000",
          area: "140 acres",
          location: "Rural Border, Kurnool",
          image: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=800",
          description: "Mature timber forest with harvest rights"
        }
      ],
      "Land Use": [
        {
          id: 1,
          title: "Agricultural Land in Kurnool",
          price: "₹420,000",
          area: "48 acres",
          location: "Rural Kurnool",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          description: "Prime agricultural land with irrigation"
        },
        {
          id: 2,
          title: "Commercial Plot in Kurnool",
          price: "₹380,000",
          area: "10,000 sq ft",
          location: "Main Road, Kurnool",
          image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800",
          description: "Prime commercial location"
        },
        {
          id: 3,
          title: "Residential Plot in Kurnool",
          price: "₹130,000",
          area: "10,500 sq ft",
          location: "Suburban Kurnool",
          image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800",
          description: "Ready-to-build residential plot"
        },
        {
          id: 4,
          title: "Industrial Land in Kurnool",
          price: "₹560,000",
          area: "25,000 sq ft",
          location: "Industrial Zone, Kurnool",
          image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800",
          description: "Approved industrial land"
        }
      ]
    },
    Hyderabad: {
      "Location": [
        {
          id: 1,
          title: "Prime Commercial Space in Hyderabad",
          price: "₹2,200,000",
          area: "5,000 sq ft",
          location: "Hyderabad City Center",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
          description: "Premium office space in the heart of Hyderabad"
        },
        {
          id: 2,
          title: "Luxury Retail Plaza in Hyderabad",
          price: "₹3,700,000",
          area: "8,000 sq ft",
          location: "Main Street, Hyderabad",
          image: "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800",
          description: "High-end retail space with excellent foot traffic"
        },
        {
          id: 3,
          title: "Modern Office Complex in Hyderabad",
          price: "₹4,100,000",
          area: "11,500 sq ft",
          location: "Business Square, Hyderabad",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          description: "State-of-the-art office building with parking"
        },
        {
          id: 4,
          title: "Mixed-Use Development in Hyderabad",
          price: "₹5,200,000",
          area: "14,500 sq ft",
          location: "Hyderabad Plaza",
          image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800",
          description: "Commercial and residential mixed property"
        }
      ],
      "City Outskirts": [
        {
          id: 1,
          title: "Fertile Farm Land in Hyderabad",
          price: "₹450,000",
          area: "50 acres",
          location: "Rural Hyderabad",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          description: "Prime agricultural land with irrigation"
        },
        {
          id: 2,
          title: "Organic Farm Estate in Hyderabad",
          price: "₹680,000",
          area: "75 acres",
          location: "Green Valley, Hyderabad",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800",
          description: "Certified organic farming land with facilities"
        },
        {
          id: 3,
          title: "Vineyard Property in Hyderabad",
          price: "₹900,000",
          area: "45 acres",
          location: "Hill Country, Hyderabad",
          image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800",
          description: "Established vineyard with processing unit"
        },
        {
          id: 4,
          title: "Ranch Land in Hyderabad",
          price: "₹1,250,000",
          area: "120 acres",
          location: "Western Plains, Hyderabad",
          image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
          description: "Large ranch property with water rights"
        }
      ],
      "Local City": [
        {
          id: 1,
          title: "Residential Plot in Hyderabad",
          price: "₹130,000",
          area: "10,000 sq ft",
          location: "Suburban Hyderabad",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          description: "Ready-to-build residential plot"
        },
        {
          id: 2,
          title: "Commercial Land in Hyderabad",
          price: "₹360,000",
          area: "15,000 sq ft",
          location: "Main Road, Hyderabad",
          image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800",
          description: "Prime commercial location"
        },
        {
          id: 3,
          title: "Industrial Plot in Hyderabad",
          price: "₹550,000",
          area: "25,000 sq ft",
          location: "Industrial Zone, Hyderabad",
          image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800",
          description: "Approved industrial land"
        },
        {
          id: 4,
          title: "Mixed Use Land in Hyderabad",
          price: "₹460,000",
          area: "20,000 sq ft",
          location: "Development Zone, Hyderabad",
          image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800",
          description: "Flexible zoning for mixed development"
        }
      ],
      "Border": [
        {
          id: 1,
          title: "State Border Property in Hyderabad",
          price: "₹1,800,000",
          area: "200 acres",
          location: "State Border, Hyderabad",
          image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
          description: "Dense forest land with diverse flora"
        },
        {
          id: 2,
          title: "District Border Land in Hyderabad",
          price: "₹950,000",
          area: "80 acres",
          location: "District Border, Hyderabad",
          image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
          description: "Mixed woodland with development potential"
        },
        {
          id: 3,
          title: "City Limits Property in Hyderabad",
          price: "₹2,200,000",
          area: "300 acres",
          location: "City Limits, Hyderabad",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800",
          description: "Pristine forest ideal for conservation"
        },
        {
          id: 4,
          title: "Rural Border Land in Hyderabad",
          price: "₹1,500,000",
          area: "150 acres",
          location: "Rural Border, Hyderabad",
          image: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=800",
          description: "Mature timber forest with harvest rights"
        }
      ],
      "Land Use": [
        {
          id: 1,
          title: "Agricultural Land in Hyderabad",
          price: "₹470,000",
          area: "52 acres",
          location: "Rural Hyderabad",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          description: "Prime agricultural land with irrigation"
        },
        {
          id: 2,
          title: "Commercial Plot in Hyderabad",
          price: "₹400,000",
          area: "10,000 sq ft",
          location: "Main Road, Hyderabad",
          image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800",
          description: "Prime commercial location"
        },
        {
          id: 3,
          title: "Residential Plot in Hyderabad",
          price: "₹140,000",
          area: "10,500 sq ft",
          location: "Suburban Hyderabad",
          image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800",
          description: "Ready-to-build residential plot"
        },
        {
          id: 4,
          title: "Industrial Land in Hyderabad",
          price: "₹580,000",
          area: "25,000 sq ft",
          location: "Industrial Zone, Hyderabad",
          image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800",
          description: "Approved industrial land"
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

        {/* Bottom Feedback Button */}
        <div className="bottom-feedback">
          <button className="feedback-btn">Feedback</button>
        </div>
      </div>
    </div>
  );
}

export default Lrecustomerselection;