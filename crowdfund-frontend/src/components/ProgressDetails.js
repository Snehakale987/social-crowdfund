import React from 'react';
import '../styles/ProgressDetails.css';

function ProgressDetails({ progress, targetAmount, fundsRaised, daysLeft }) {
    return (
        <div className="progress-details">
            {/* Progress Bar Section */}
            <div className="progress-bar-container">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <span className="progress-percentage">{progress}% Funded</span>
            </div>

            {/* Funding Details */}
            <div className="funding-details">
                <div className="funding-stat">
                    <p>Raised</p>
                    <span className="highlight">${fundsRaised.toLocaleString()}</span>
                </div>
                <div className="funding-stat">
                    <p>Goal</p>
                    <span className="highlight">${targetAmount.toLocaleString()}</span>
                </div>
            </div>

            {/* Days Left Section */}
            <div className="days-left-new">
                <p>Time Remaining</p>
                <span className="days-left-highlight">{daysLeft} Days</span>
            </div>
        </div>
    );
}

export default ProgressDetails;
