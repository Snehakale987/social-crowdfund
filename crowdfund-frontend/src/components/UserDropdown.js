// UserDropdown.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext for user info
import '../styles/UserDropdown.css';

function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, setUser } = useAuth(); // Access user and setUser from AuthContext
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="user-dropdown">
            {/* Display the user's avatar or initials */}
            <button className="user-avatar" onClick={toggleDropdown}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {/* Show logged-in user's name and email */}
                    <div className="dropdown-header">
                        <p className="user-name">{user?.name || 'Guest'}</p>
                        <p className="user-email">{user?.email || 'Not logged in'}</p>
                    </div>
                    <button
                        className="dropdown-item"
                        onClick={() => navigate('/dashboard')}
                    >
                        Profile
                    </button>
                    <button
                        className="dropdown-item"
                        onClick={() => navigate('/settings')}
                    >
                        Settings
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
