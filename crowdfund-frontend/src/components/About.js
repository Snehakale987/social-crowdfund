import React from 'react';
import '../styles/About.css';

function AboutPage() {
    return (
        <div className="about-page">
            <header className="about-header">
                <h1>About Us</h1>
                <p>
                    Empowering social change, one cause at a time.
                </p>
            </header>

            <section className="about-section">
                <div className="about-content">
                    <h2>Our Mission</h2>
                    <p>
                        Our platform is dedicated to connecting passionate individuals with meaningful causes.
                        We aim to make the world a better place by enabling seamless support for initiatives that
                        drive change, promote equity, and empower communities.
                    </p>
                </div>
                <img
                    src="/images/mission.png"
                    alt="Our Mission"
                    className="about-image"
                />
            </section>

            <section className="about-section reverse">
                <img
                    src="/images/vision.png"
                    alt="Our Vision"
                    className="about-image"
                />
                <div className="about-content">
                    <h2>Our Vision</h2>
                    <p>
                        We envision a world where every individual can contribute to positive change effortlessly.
                        Our goal is to foster a supportive ecosystem where innovation meets compassion,
                        enabling causes to thrive and create a lasting impact.
                    </p>
                </div>
            </section>

            <section className="team-section">
                <h2>Meet the Team</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150" alt="Team Member" />
                        <h3>Jane Doe</h3>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150" alt="Team Member" />
                        <h3>John Smith</h3>
                        <p>CTO</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150" alt="Team Member" />
                        <h3>Emily Davis</h3>
                        <p>Head of Operations</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;
