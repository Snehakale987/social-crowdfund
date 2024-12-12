// Cause.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cause.css';

function Cause({ cause }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/cause-details/${cause.id}`); // Navigate to the cause details page
    };

    return (
        <div className="cause-card" onClick={handleCardClick} role="button" tabIndex={0}>
            <img
                src={`http://test-797390839.us-east-1.elb.amazonaws.com/uploads/${cause.images[0]}`}
                alt={cause.title}
                className="cause-image"
            />
            <div className="cause-content">
                <h3 className="cause-title">{cause.title}</h3>
                <p className="cause-description">{cause.description}</p>
                <div className="days-left">
                    {cause.daysLeft} Days Left
                </div>
                <div className="funding-info">
                    <span className="funds-raised">
                        ${cause.fundsRaised.toLocaleString()} raised
                    </span>
                    <span className="target-amount">
                        of ${cause.targetAmount.toLocaleString()}
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{
                            width: `${(cause.fundsRaised / cause.targetAmount) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Cause;
