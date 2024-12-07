// HeroSection.js
import React from 'react';
import '../styles/HeroSection.css';

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">Support a Cause Today</h1>
                <button className="donate-button">Donate Now</button>
            </div>
        </section>
    );
}

export default HeroSection;