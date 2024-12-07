// Navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext for user info
import UserDropdown from './UserDropdown'; // Import UserDropdown component
import '../styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // State to handle menu toggle
    const { user } = useAuth(); // Access user info from AuthContext

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                CrowdFund
            </div>
            <div className="navbar-hamburger" onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                <li className="navbar-item" onClick={() => navigate('/')}>
                    Home
                </li>
                <li className="navbar-item" onClick={() => navigate('/causes')}>
                    Causes
                </li>
                <li className="navbar-item" onClick={() => navigate('/about')}>
                    About
                </li>
                <li className="navbar-item" onClick={() => navigate('/contact')}>
                    Contact
                </li>
                {!user && (
                    <li className="navbar-item login-mobile" onClick={() => navigate('/login')}>
                        Login
                    </li>
                )}
                <li className="navbar-item" onClick={() => navigate('/create-cause')}>
                    Create Cause
                </li>
            </ul>
            <div className="user-menu">
                {user && <UserDropdown/>} {/* Show UserDropdown if user is signed in */}
            </div>
        </nav>
    );
}

export default Navbar;
