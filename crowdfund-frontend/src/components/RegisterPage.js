import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterPage.css';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://test-797390839.us-east-1.elb.amazonaws.com/api/auth/register', {
                name,
                email,
                password,
            });

            navigate('/login'); // Redirect to login page
        } catch (err) {
            setError('Error registering user. Please try again.');
        }
    };

    return (
        <div className="page-container">
            <form className="form-card" onSubmit={handleRegister}>
                <h2>Register</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <a onClick={() => navigate('/login')}>Already have an account? Login</a>
            </form>
        </div>
    );
}

export default RegisterPage;
