import React from 'react';
import '../styles/UpdatesTimeline.css';

function UpdatesTimeline({ updates }) {
    return (
        <section className="updates-timeline">
            <h3 className="timeline-title">Latest Updates</h3>
            <div className="timeline-container">
                {updates.map((update, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="update-date">{update.date}</span>
                            <p className="update-text">{update.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UpdatesTimeline;
