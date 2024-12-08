import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DonationSection.css';

function DonationSection({ causeId, onDonationUpdate,onNewDonor }) {
    const presetAmounts = [10, 25, 50, 100, 500];
    const [customAmount, setCustomAmount] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleDonate = async (amount) => {
        try {
            const response = await axios.post(`http://test-797390839.us-east-1.elb.amazonaws.com/api/causes/${causeId}/donate`, {
                amount,
                anonymous,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then((response) => {
                setSuccess('Donation successful!');
                setError('');
                setCustomAmount('');
                onDonationUpdate(response.data);
                onNewDonor(response.data);
            });


        } catch (err) {
            console.error(err);
            setError('Failed to process donation. Please try again.');
            setSuccess('');
        }
    };

    const handleCustomDonate = () => {
        if (customAmount > 0) {
            handleDonate(customAmount);
        }
    };

    return (
        <aside className="donation-section">
            <h3>Support This Cause</h3>
            <p className="donation-description">
                Your contribution will make a difference. Select an amount or enter your own.
            </p>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="preset-amounts">
                {presetAmounts.map((amount) => (
                    <button
                        key={amount}
                        className="preset-button"
                        onClick={() => handleDonate(amount)}
                    >
                        ${amount}
                    </button>
                ))}
            </div>
            <div className="custom-donation">
                <input
                    type="number"
                    className="donation-input"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                />
                <button
                    className="custom-donate-button"
                    onClick={handleCustomDonate}
                    disabled={!customAmount || customAmount <= 0}
                >
                    Donate
                </button>
            </div>
            <div className="donation-anonymous">
                <label>
                    <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={() => setAnonymous(!anonymous)}
                    />
                    Donate Anonymously
                </label>
            </div>
        </aside>
    );
}

export default DonationSection;
