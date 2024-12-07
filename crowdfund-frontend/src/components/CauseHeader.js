import React from 'react';
import '../styles/CauseHeader.css';

function CauseHeader({ title, creatorName, category }) {
    return (
        <header className="cause-header">
            <div className="header-content">
                <h1 className="cause-title">{title}</h1>
                <div className="cause-meta">
                    <p className="cause-creator">By {creatorName}</p>
                    <span className="category-badge">{category}</span>
                </div>
            </div>
            <div className="social-share">
                <button className="share-button facebook">
                    <i className="fab fa-facebook-f"></i> Facebook
                </button>
                <button className="share-button twitter">
                    <i className="fab fa-twitter"></i> Twitter
                </button>
            </div>
        </header>
    );
}

export default CauseHeader;
