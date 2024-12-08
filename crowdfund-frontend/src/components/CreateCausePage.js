import React, { useState } from 'react';
import BasicInfoForm from './BasicInfoForm';
import StorytellingForm from './StorytellingForm';
import PreviewCause from './PreviewCause';
import '../styles/CreateCausePage.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateCausePage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [causeData, setCauseData] = useState({
        title: '',
        category: '',
        targetAmount: '',
        startDate: '',
        endDate: '',
        description: '',
        images: [],
        milestones: [],
    });

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const updateCauseData = (field, value) => {
        setCauseData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            // Append cause data
            formData.append('title', causeData.title);
            formData.append('category', causeData.category);
            formData.append('targetAmount', causeData.targetAmount);
            formData.append('startDate', causeData.startDate);
            formData.append('endDate', causeData.endDate);
            formData.append('description', causeData.description);

            // Append milestones
            formData.append('updates', JSON.stringify(causeData.milestones));

            // Append images
            causeData.images.forEach((image) => {
                formData.append('images', image);
            });

            // Make API call to create the cause
            const response = await axios.post('http://test-797390839.us-east-1.elb.amazonaws.com:5000/api/causes/create', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Cause created successfully!');
            navigate(`/cause/${response.data.id}`);
        } catch (error) {
            console.error('Error creating cause:', error);
            alert('Failed to create cause. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-cause-page">
            {step === 1 && (
                <BasicInfoForm causeData={causeData} updateCauseData={updateCauseData} nextStep={nextStep} />
            )}
            {step === 2 && (
                <StorytellingForm causeData={causeData} updateCauseData={updateCauseData} nextStep={nextStep} prevStep={prevStep} />
            )}
            {step === 3 && (
                <PreviewCause causeData={causeData} prevStep={prevStep} submitCause={handleSubmit} />
            )}
        </div>
    );
}

export default CreateCausePage;
