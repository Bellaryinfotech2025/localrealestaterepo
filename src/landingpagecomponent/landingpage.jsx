import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../landingpagecomponent/landingpagedesign.css";

// Replace these with actual Andhra Pradesh / Hyderabad real-estate plot images
const slides = [
  {
    url: "https://images.pexels.com/photos/14284409/pexels-photo-14284409.jpeg",
    headline: "Land Development Plot",
    description: "Vacant land ready for real estate development.",
  },
  {
    url: "https://images.pexels.com/photos/33516339/pexels-photo-33516339.jpeg",
    headline: "Residential Plot for Sale",
    description: "Plots available for residential construction.",
  },
  {
    url: "https://images.pexels.com/photos/14896230/pexels-photo-14896230.jpeg",
    headline: "Open Field Plot",
    description: "Wide open land for versatile development.",
  },
];

const LandingPage = () => {
  const handleWhatsApp = () => {
    const phone = "+917013438163";
    const message = encodeURIComponent(
      "Hi, I'm interested in your land plots. Could you share more details?"
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="lre_page_localrealstate">
      <div className="lre_hero_overlay">
        <div className="lre_hero_content">
          <h1 id="slide-headline"></h1>
          <p id="slide-description"></p>
          <div className="lre_hero_buttons">
            <button className="cta-primary">View Plots</button>
            <button className="cta-secondary" onClick={handleWhatsApp}>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        onSlideChange={(swiper) => {
          const slide = slides[swiper.realIndex];
          document.getElementById("slide-headline").textContent = slide.headline;
          document.getElementById("slide-description").textContent = slide.description;
        }}
        className="lre_hero_swiper"
        style={{ height: "100vh" }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="lre_hero_slide_bg"
              style={{ backgroundImage: `url(${slide.url})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingPage;
