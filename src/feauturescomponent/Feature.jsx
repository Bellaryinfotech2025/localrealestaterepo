import React, { useState, useEffect, useRef } from 'react';
import '../feauturescomponent/Feature.css';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const LocalCustomerReviews = () => {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const reviews = [
        { id: 1, name: "Ramesh Babu", city: "Kurnool", rating: 5, review: "LRE helped me find my dream 3BHK quickly in Kurnool. Very professional and transparent.", property: "3BHK Apartment", date: "2 weeks ago" },
        { id: 2, name: "Sowmya Reddy", city: "Nandyal", rating: 5, review: "The team assisted me in buying farmland effortlessly. Their guidance was excellent.", property: "2 Acres Agricultural Land", date: "1 month ago" },
        { id: 3, name: "Vikram Kumar", city: "Hyderabad", rating: 4, review: "Bought a villa in Hyderabad smoothly. Team was friendly and knowledgeable.", property: "4BHK Villa", date: "3 weeks ago" },
        { id: 4, name: "Lakshmi Devi", city: "Kurnool", rating: 5, review: "Found a perfect residential plot thanks to LRE. Quick and hassle-free process.", property: "Residential Plot", date: "2 months ago" },
        { id: 5, name: "Arjun Reddy", city: "Nandyal", rating: 5, review: "Amazing service! Helped me choose the best property for my family in Nandyal.", property: "3BHK House", date: "1 week ago" }
    ];

    const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
    const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
    const goTo = (index) => setCurrent(index);
    const togglePlay = () => setAutoPlay(!autoPlay);

    useEffect(() => {
        let interval;
        if (autoPlay) interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [autoPlay, current]);

    const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} className={i < rating ? "star filled" : "star"} fill={i < rating ? "#42a5f5" : "none"} />
    ));

    const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    const handleTouchStart = (e) => touchStartX.current = e.touches[0].clientX;
    const handleTouchMove = (e) => touchEndX.current = e.touches[0].clientX;
    const handleTouchEnd = () => {
        const delta = touchStartX.current - touchEndX.current;
        if (delta > 50) next();
        else if (delta < -50) prev();
    };

    // Generate bubbles dynamically
    const bubbles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.floor(Math.random() * 40) + 20,
        left: Math.floor(Math.random() * 100),
        top: Math.floor(Math.random() * 100),
        delay: Math.random() * 10
    }));

    return (
        <section className="reviews-section local-reviews">
            {/* Animated bubbles */}
            {bubbles.map(b => (
                <div
                    key={b.id}
                    className="bubble"
                    style={{
                        width: `${b.size}px`,
                        height: `${b.size}px`,
                        left: `${b.left}%`,
                        top: `${b.top}%`,
                        animationDelay: `${b.delay}s`
                    }}
                />
            ))}

            <div className="reviews-container">
                <div className="reviews-header">
                    <div className="section-badge">💬 Local Stories</div>
                    <h2 className="section-title">What Our <span className="highlight">Customers Say</span></h2>
                    <p className="section-subtitle">Experiences from Kurnool, Nandyal, and Hyderabad residents.</p>
                </div>

                <div className="reviews-content"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>

                    {/* Active Review */}
                    <div className="active-review">
                        <div className="review-card">
                            <div className="quote-icon"><Quote size={32} /></div>
                            <div className="review-text">"{reviews[current].review}"</div>
                            <div className="reviewer-info">
                                <div className="reviewer-avatar">{getInitials(reviews[current].name)}</div>
                                <div className="reviewer-details">
                                    <h4>{reviews[current].name}</h4>
                                    <p className="reviewer-city">{reviews[current].city}</p>
                                    <p className="reviewer-property">{reviews[current].property}</p>
                                    <div className="review-rating">{renderStars(reviews[current].rating)} <span className="review-date">{reviews[current].date}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation & Thumbnails */}
                    <div className="reviews-navigation">
                        <div className="navigation-header">
                            <h3>Other Happy Customers</h3>
                            <button className="play-pause-btn" onClick={togglePlay}>{autoPlay ? <Pause size={16} /> : <Play size={16} />}</button>
                        </div>

                        <div className="review-thumbnails">
                            {reviews.map((rev, idx) => (
                                <div key={rev.id} className={`thumbnail ${idx === current ? 'active' : ''}`} onClick={() => goTo(idx)}>
                                    <div className="thumbnail-avatar">{getInitials(rev.name)}</div>
                                    <div className="thumbnail-content">
                                        <h5>{rev.name}</h5>
                                        <p>{rev.city}</p>
                                        <div className="thumbnail-rating">{renderStars(rev.rating)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="navigation-controls">
                            <button className="nav-btn prev" onClick={prev}><ChevronLeft size={20} /></button>
                            <div className="review-indicators">
                                {reviews.map((_, i) => <button key={i} className={`indicator ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />)}
                            </div>
                            <button className="nav-btn next" onClick={next}><ChevronRight size={20} /></button>
                        </div>
                    </div>
                </div>

                <div className="reviews-cta">
                    <div className="cta-content">
                        <h3>Ready to Find Your Perfect Property?</h3>
                        <p>Join satisfied residents from Kurnool, Nandyal, and Hyderabad who found their dream home with us.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocalCustomerReviews;
