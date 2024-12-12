import React from 'react';
import '../styles/ContactPage.css';

function ContactPage() {
    return (
        <div className="contact-page">
            <header className="contact-header">
                <h1>Contact Us</h1>
                <p>We’d love to hear from you! Reach out to us for any inquiries, feedback, or support.</p>
            </header>

            <div className="contact-container">
                <div className="contact-form-section">
                    <h2>Send Us a Message</h2>
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea id="message" name="message" rows="5" placeholder="Enter your message" required></textarea>
                        </div>
                        <button type="submit" className="submit-button">Send Message</button>
                    </form>
                </div>

                <div className="contact-info-section">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> support@yourplatform.com</p>
                    <p><strong>Phone:</strong> +1 123-456-7890</p>
                    <p><strong>Address:</strong> 1234 Change Drive, Impact City, USA</p>

                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
