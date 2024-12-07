import React from 'react';
import '../styles/PreviewCause.css';

function PreviewCause({ causeData, prevStep, submitCause }) {
    return (
        <div className="preview-cause">
            <h2>Preview Your Cause</h2>

            <div className="preview-details">
                <h3>Title</h3>
                <p>{causeData.title}</p>

                <h3>Category</h3>
                <p>{causeData.category}</p>

                <h3>Description</h3>
                <p>{causeData.description}</p>

                <h3>Milestones</h3>
                <ul className="preview-milestones">
                    {causeData.milestones.map((milestone, index) => (
                        <li key={index} className="milestone-item">
                            <span className="milestone-text">{milestone.text}</span>
                            <span className="milestone-date">({milestone.date})</span>
                        </li>
                    ))}
                </ul>

                <h3>Images</h3>
                <div className="preview-images">
                    {causeData.images.map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                    ))}
                </div>
            </div>

            <div className="form-navigation">
                <button onClick={prevStep}>Back</button>
                <button onClick={submitCause}>Submit Cause</button>
            </div>
        </div>
    );
}

export default PreviewCause;
