// Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-column">
                    <h3>About Us</h3>
                    <p>
                        We are a platform dedicated to connecting people with social causes that matter.
                    </p>
                </div>
                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>
                            Email:{' '}
                            <a href="mailto:support@socialcauseplatform.com">
                                support@socialcauseplatform.com
                            </a>
                        </li>
                        <li>
                            Phone: <a href="tel:+1234567890">+1 (234) 567-890</a>
                        </li>
                        <li>Address: 1234 Charity Lane, Kindness City, World 56789</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <a href="/careers">Careers</a>
                        </li>
                        <li>
                            <a href="/faq">FAQs</a>
                        </li>
                        <li>
                            <a href="/terms">Terms of Service</a>
                        </li>
                        <li>
                            <a href="/privacy">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.twitter.com" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Social Cause Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
