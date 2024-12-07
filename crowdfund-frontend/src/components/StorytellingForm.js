import React from 'react';
import ImageUploader from './ImageUploader';
import MilestoneEditor from './MilestoneEditor';
import '../styles/StorytellingForm.css';

function StorytellingForm({ causeData, updateCauseData, nextStep, prevStep }) {
    return (
        <div className="storytelling-form">
            <h2>Tell Your Story</h2>
            <textarea
                placeholder="Detailed Description"
                value={causeData.description}
                onChange={(e) => updateCauseData('description', e.target.value)}
            ></textarea>
            <ImageUploader
                images={causeData.images}
                updateImages={(value) => updateCauseData('images', value)}
            />
            <MilestoneEditor
                milestones={causeData.milestones}
                updateMilestones={(value) => updateCauseData('milestones', value)}
            />
            <div className="form-navigation">
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
            </div>
        </div>
    );
}

export default StorytellingForm;
