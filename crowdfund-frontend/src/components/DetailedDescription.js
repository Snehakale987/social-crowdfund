import React, { useState } from 'react';
import '../styles/DetailedDescription.css';

function DetailedDescription({ description }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="detailed-description">
            {/* Section Header */}
            <h3 className="description-header">About This Cause</h3>

            {/* Description Text */}
            <p className={`description-text ${isExpanded ? 'expanded' : ''}`}>
                {isExpanded ? description : `${description.slice(0, 200)}...`}
            </p>

            {/* Read More/Less Button */}
            <button
                className="read-more-button"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
        </div>
    );
}

export default DetailedDescription;
