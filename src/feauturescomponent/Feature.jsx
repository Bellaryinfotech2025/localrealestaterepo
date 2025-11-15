import React, { useState, useEffect } from 'react';
import '../feauturescomponent/Feature.css';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const LocalCustomerReviews = () => {
  const [current, setCurrent] = useState(0);

const reviews = [
  { id: 1, name: "Mohammed Mahmood", city: "Hyderabad", rating: 5, review: "LRE helped me find my dream 3BHK quickly. Very professional and transparent.", property: "3BHK Apartment", date: "2 weeks ago" },
  { id: 2, name: "Khaja Moinuddin", city: "Kurnool", rating: 5, review: "The team assisted me in buying farmland effortlessly. Their guidance was excellent.", property: "2 Acres Agricultural Land", date: "1 month ago" },
  { id: 3, name: "Ashok", city: "Nandyal", rating: 4, review: "Bought a villa smoothly. Team was friendly and knowledgeable.", property: "4BHK Villa", date: "3 weeks ago" },
  { id: 4, name: "Noor", city: "Hyderabad", rating: 5, review: "Found a perfect residential plot thanks to LRE. Quick and hassle-free process.", property: "Residential Plot", date: "2 months ago" }
];

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  const goTo = (index) => setCurrent(index);

 const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={16}
      className={i < rating ? "star filled" : "star"}
      fill={i < rating ? "#FFD700" : "none"} // yellow stars
      stroke={i < rating ? "#FFD700" : "#ccc"} // outline for empty stars
    />
  ));

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <section className="reviews-section real-reviews">
      <div className="reviews-header">
        <h2>What Our <span className="highlight">Customers Say</span></h2>
        <p>Experiences from Kurnool, Nandyal, and Hyderabad residents.</p>
      </div>

      <div className="reviews-row">
        {reviews.map((rev, idx) => (
          <div
            key={rev.id}
            className={`review-card ${idx === current ? 'active' : ''}`}
            onClick={() => goTo(idx)}
          >
            <div className="quote-icon"><Quote size={28} /></div>
            <p className="review-text">"{rev.review}"</p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">{getInitials(rev.name)}</div>
              <div className="reviewer-details">
                <h4>{rev.name}</h4>
                <p className="reviewer-city">{rev.city}</p>
                <p className="reviewer-property">{rev.property}</p>
               <div className="review-rating">
  {renderStars(reviews[current].rating)}
</div>
<div className="review-date">{reviews[current].date}</div>
            ``</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="review-navigation">
        <button className="nav-btn prev" onClick={prev}><ChevronLeft size={20} /></button>
        <button className="nav-btn next" onClick={next}><ChevronRight size={20} /></button>
      </div>
    </section>
  );
};

export default LocalCustomerReviews;
