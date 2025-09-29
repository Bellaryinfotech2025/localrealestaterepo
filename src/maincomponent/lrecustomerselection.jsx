import { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';
import "../maindesigncomponent/lrecustomerselectiondesign.css";
import { Link } from "react-router-dom";

const Lrecustomerselection = () => {
  const [activeTab, setActiveTab] = useState("Location");
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    "Location",
    "City Outskirts",
    "Local City",
    "Border",
    "Land Use"
  ];

  const tabOptions = {
    "Location": [
      "Downtown Area",
      "Business District",
      "Residential Zone",
      "Commercial Hub",
      "Industrial Area"
    ],
    "City Outskirts": [
      "North Outskirts",
      "South Suburbs",
      "East Extension",
      "West Periphery",
      "Ring Road Area"
    ],
    "Local City": [
      "City Center",
      "Old City",
      "New Township",
      "Urban Village",
      "Metro Corridor"
    ],
    "Border": [
      "State Border",
      "District Border",
      "City Limits",
      "Rural Border",
      "Highway Border"
    ],
    "Land Use": [
      "Agricultural Land",
      "Commercial Plot",
      "Residential Plot",
      "Industrial Land",
      "Forest Land"
    ]
  };

  // Real estate data based on selections
  const realEstateData = {
    "Downtown Area": [
      {
        id: 1,
        title: "Prime Commercial Space",
        price: "$2,500,000",
        area: "5,000 sq ft",
        location: "Downtown Central",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        description: "Premium office space in the heart of downtown"
      },
      {
        id: 2,
        title: "Luxury Retail Plaza",
        price: "$3,800,000",
        area: "8,500 sq ft",
        location: "Main Street",
        image: "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800",
        description: "High-end retail space with excellent foot traffic"
      },
      {
        id: 3,
        title: "Modern Office Complex",
        price: "$4,200,000",
        area: "12,000 sq ft",
        location: "Business Square",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        description: "State-of-the-art office building with parking"
      },
      {
        id: 4,
        title: "Mixed-Use Development",
        price: "$5,500,000",
        area: "15,000 sq ft",
        location: "Downtown Plaza",
        image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800",
        description: "Commercial and residential mixed property"
      },
      {
        id: 5,
        title: "Historic Building",
        price: "$3,200,000",
        area: "7,200 sq ft",
        location: "Heritage District",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
        description: "Renovated historic property with modern amenities"
      }
    ],
    "Agricultural Land": [
      {
        id: 1,
        title: "Fertile Farm Land",
        price: "$450,000",
        area: "50 acres",
        location: "Rural District",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        description: "Prime agricultural land with irrigation"
      },
      {
        id: 2,
        title: "Organic Farm Estate",
        price: "$680,000",
        area: "75 acres",
        location: "Green Valley",
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800",
        description: "Certified organic farming land with facilities"
      },
      {
        id: 3,
        title: "Vineyard Property",
        price: "$920,000",
        area: "45 acres",
        location: "Hill Country",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800",
        description: "Established vineyard with processing unit"
      },
      {
        id: 4,
        title: "Ranch Land",
        price: "$1,200,000",
        area: "120 acres",
        location: "Western Plains",
        image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
        description: "Large ranch property with water rights"
      },
      {
        id: 5,
        title: "Forest Edge Farm",
        price: "$580,000",
        area: "40 acres",
        location: "Forest Border",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
        description: "Agricultural land adjacent to protected forest"
      }
    ],
    "Forest Land": [
      {
        id: 1,
        title: "Private Forest Estate",
        price: "$1,800,000",
        area: "200 acres",
        location: "Mountain Region",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
        description: "Dense forest land with diverse flora"
      },
      {
        id: 2,
        title: "Woodland Property",
        price: "$950,000",
        area: "80 acres",
        location: "Valley Woods",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
        description: "Mixed woodland with development potential"
      },
      {
        id: 3,
        title: "Conservation Forest",
        price: "$2,200,000",
        area: "300 acres",
        location: "Protected Zone",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800",
        description: "Pristine forest ideal for conservation"
      },
      {
        id: 4,
        title: "Timber Forest",
        price: "$1,500,000",
        area: "150 acres",
        location: "Northern Woods",
        image: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=800",
        description: "Mature timber forest with harvest rights"
      },
      {
        id: 5,
        title: "Eco-Resort Forest",
        price: "$3,500,000",
        area: "100 acres",
        location: "Tourist Corridor",
        image: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?w=800",
        description: "Forest land approved for eco-tourism development"
      }
    ],
    // Default properties for other selections
    default: [
      {
        id: 1,
        title: "Residential Plot",
        price: "$125,000",
        area: "10,000 sq ft",
        location: "Suburban Area",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        description: "Ready-to-build residential plot"
      },
      {
        id: 2,
        title: "Commercial Land",
        price: "$350,000",
        area: "15,000 sq ft",
        location: "Main Road",
        image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800",
        description: "Prime commercial location"
      },
      {
        id: 3,
        title: "Industrial Plot",
        price: "$550,000",
        area: "25,000 sq ft",
        location: "Industrial Zone",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800",
        description: "Approved industrial land"
      },
      {
        id: 4,
        title: "Mixed Use Land",
        price: "$450,000",
        area: "20,000 sq ft",
        location: "Development Zone",
        image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800",
        description: "Flexible zoning for mixed development"
      },
      {
        id: 5,
        title: "Waterfront Property",
        price: "$750,000",
        area: "12,000 sq ft",
        location: "Lake View",
        image: "https://images.unsplash.com/photo-1559767180-47c753027c42?w=800",
        description: "Scenic waterfront land"
      }
    ]
  };

  // Get properties based on selected option
  const getCurrentProperties = () => {
    if (realEstateData[selectedOption]) {
      return realEstateData[selectedOption];
    }
    return realEstateData.default;
  };

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  // Set default selected option when tab changes
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
                <Link to="/">
                <button className="view-details-btn">Contact us</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Feedback Button */}
        <div className="bottom-feedback">
          <button className="feedback-btn">Feedback</button>
        </div>
      </div>
    </div>
  );
}

export default Lrecustomerselection;