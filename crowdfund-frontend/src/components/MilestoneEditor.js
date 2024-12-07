import React, { useState } from 'react';
import '../styles/MilestoneEditor.css';

function MilestoneEditor({ milestones, updateMilestones }) {
    const [milestoneText, setMilestoneText] = useState('');
    const [milestoneDate, setMilestoneDate] = useState('');

    const handleAddMilestone = () => {
        if (milestoneText.trim() === '' || milestoneDate.trim() === '') return;

        const newMilestone = { text: milestoneText, date: milestoneDate };
        updateMilestones([...milestones, newMilestone]);
        setMilestoneText('');
        setMilestoneDate('');
    };

    const handleRemoveMilestone = (index) => {
        const updatedMilestones = milestones.filter((_, i) => i !== index);
        updateMilestones(updatedMilestones);
    };

    return (
        <div className="milestone-editor">
            <h3>Add Milestones</h3>
            <div className="milestone-input-group">
                <input
                    type="text"
                    placeholder="Enter milestone"
                    value={milestoneText}
                    onChange={(e) => setMilestoneText(e.target.value)}
                />
                <input
                    type="date"
                    value={milestoneDate}
                    onChange={(e) => setMilestoneDate(e.target.value)}
                />
                <button onClick={handleAddMilestone}>Add</button>
            </div>
            <ul className="milestone-list">
                {milestones.map((milestone, index) => (
                    <li key={index} className="milestone-item">
                        <div>
                            <span className="milestone-text">{milestone.text}</span>
                            <span className="milestone-date">{milestone.date}</span>
                        </div>
                        <button
                            onClick={() => handleRemoveMilestone(index)}
                            className="remove-button"
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MilestoneEditor;
