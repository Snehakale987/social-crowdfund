import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CauseCard.css';

function CauseCard({ cause }) {
    return (
        <div className="cause-card">
            <img src={cause.image} alt={cause.title} className="cause-card-image" />
            <div className="cause-card-content">
                <h2 className="cause-card-title">
                    <Link to={`/cause/${cause.id}`}>{cause.title}</Link>
                </h2>
                <p className="cause-card-description">{cause.description}</p>
            </div>
        </div>
    );
}

export default CauseCard;
