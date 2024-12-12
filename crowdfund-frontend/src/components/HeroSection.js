// HeroSection.js
import React from 'react';
import '../styles/HeroSection.css';
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">Support a Cause Today</h1>
                <Link to="/causes"><button className="donate-button">Donate Now</button></Link>
            </div>
        </section>
    );
}

export default HeroSection;
