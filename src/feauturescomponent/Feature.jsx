import React, { useState, useEffect, useRef } from 'react';
import '../feauturescomponent/Feature.css';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const CustomerReviews = () => {
    const [currentReview, setCurrentReview] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const reviews = [
        { id: 1, name: "Rajesh Kumar", location: "Hyderabad", rating: 5, review: "LRE helped me find my dream home in just 2 weeks! Their team was professional, transparent, and made the entire process smooth. Highly recommended!", property: "3BHK Apartment in Gachibowli", date: "2 weeks ago" },
        { id: 2, name: "Priya Sharma", location: "Kurnool", rating: 5, review: "As a first-time buyer, I was nervous about the process. But LRE guided me through every step. Their expertise in local markets is unmatched!", property: "Agricultural Land - 5 Acres", date: "1 month ago" },
        { id: 3, name: "Arun Reddy", location: "Hyderabad", rating: 5, review: "The commercial property I bought through LRE has already appreciated by 25% in just 6 months. Best investment decision ever!", property: "Commercial Space in Hitech City", date: "3 months ago" },
        { id: 4, name: "Sunita Patel", location: "Kurnool", rating: 5, review: "From property search to registration, LRE handled everything. Their legal team ensured all documents were perfect. Trustworthy service!", property: "Residential Plot in Suburban Area", date: "2 months ago" },
        { id: 5, name: "Vikram Singh", location: "Hyderabad", rating: 5, review: "Excellent service! They understood my requirements perfectly and showed me properties that exactly matched my budget and preferences.", property: "Villa in Financial District", date: "1 week ago" }
    ];

    const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
    const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    const goToReview = (index) => setCurrentReview(index);
    const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

    useEffect(() => {
        let interval;
        if (isAutoPlaying) interval = setInterval(nextReview, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, currentReview]);

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={16} className={i < rating ? "star filled" : "star"} fill={i < rating ? "#26a69a" : "none"} />
        ));

    const getInitials = (name) => name.split(' ').map(word => word[0]).join('').toUpperCase();

    // Swipe handlers
    const handleTouchStart = (e) => touchStartX.current = e.touches[0].clientX;
    const handleTouchMove = (e) => touchEndX.current = e.touches[0].clientX;
    const handleTouchEnd = () => {
        const deltaX = touchStartX.current - touchEndX.current;
        if (deltaX > 50) nextReview();
        else if (deltaX < -50) prevReview();
    };

    return (
        <section className="reviews-section">
            <div className="reviews-container">
                {/* Header */}
                <div className="reviews-header">
                    <div className="section-badge">💬 Customer Stories</div>
                    <h2 className="section-title">What Our <span className="highlight">Customers Say</span></h2>
                    <p className="section-subtitle">Don't just take our word for it. Here's what our satisfied customers have to say about their experience with LRE.</p>
                </div>

                {/* Reviews Content */}
                <div className="reviews-content"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>

                    {/* Active Review */}
                    <div className="active-review">
                        <div className="review-card">
                            <div className="quote-icon"><Quote size={32} /></div>
                            <div className="review-text">"{reviews[currentReview].review}"</div>
                            <div className="reviewer-info">
                                <div className="reviewer-avatar">
                                    <span className="avatar-initials">{getInitials(reviews[currentReview].name)}</span>
                                </div>
                                <div className="reviewer-details">
                                    <h4 className="reviewer-name">{reviews[currentReview].name}</h4>
                                    <p className="reviewer-location">{reviews[currentReview].location}</p>
                                    <p className="reviewer-property">{reviews[currentReview].property}</p>
                                    <div className="review-rating">
                                        {renderStars(reviews[currentReview].rating)}
                                        <span className="review-date">{reviews[currentReview].date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation & Thumbnails */}
                    <div className="reviews-navigation">
                        <div className="navigation-header">
                            <h3>More Happy Customers</h3>
                            <button className="play-pause-btn" onClick={toggleAutoPlay} aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}>
                                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                            </button>
                        </div>

                        <div className="review-thumbnails">
                            {reviews.map((review, index) => (
                                <div key={review.id} className={`thumbnail ${index === currentReview ? 'active' : ''}`} onClick={() => goToReview(index)}>
                                    <div className="thumbnail-avatar"><span className="avatar-initials-small">{getInitials(review.name)}</span></div>
                                    <div className="thumbnail-content">
                                        <h5>{review.name}</h5>
                                        <p>{review.location}</p>
                                        <div className="thumbnail-rating">{renderStars(review.rating)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="navigation-controls">
                            <button className="nav-btn prev" onClick={prevReview}><ChevronLeft size={20} /></button>
                            <div className="review-indicators">
                                {reviews.map((_, index) => (
                                    <button key={index} className={`indicator ${index === currentReview ? 'active' : ''}`} onClick={() => goToReview(index)} />
                                ))}
                            </div>
                            <button className="nav-btn next" onClick={nextReview}><ChevronRight size={20} /></button>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="reviews-cta">
                    <div className="cta-content">
                        <h3>Ready to Find Your Dream Property?</h3>
                        <p>Join hundreds of satisfied customers who found their perfect home with LRE</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
