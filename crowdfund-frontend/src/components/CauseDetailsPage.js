import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CauseHeader from './CauseHeader';
import ImageGallery from './ImageGallery';
import DetailedDescription from './DetailedDescription';
import ProgressDetails from './ProgressDetails';
import DonationSection from './DonationSection';
import UpdatesTimeline from './UpdatesTimeline';
import CommentsSection from './CommentsSection';
import DonorsList from './DonorsList'; // New Component
import '../styles/CauseDetailsPage.css';

function CauseDetailsPage() {
    const { id } = useParams();
    const [cause, setCause] = useState(null);
    const [donors, setDonors] = useState([]); // New State for Donors
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCauseDetails = async () => {
            try {
                const causeResponse = await axios.get(`http://test-797390839.us-east-1.elb.amazonaws.com/api/causes/${id}`);
                setCause(causeResponse.data);

                const donorsResponse = await axios.get(`http://test-797390839.us-east-1.elb.amazonaws.com/api/causes/${id}/donors`);
                setDonors(donorsResponse.data); // Set donors data

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cause details:', error);
                setIsLoading(false);
            }
        };

        fetchCauseDetails();
    }, [id]);

    const handleDonationUpdate = (updatedData) => {
        setCause((prev) => ({
            ...prev,
            fundsRaised: updatedData.fundsRaised,
            progress: updatedData.progress,
        }));
    };

    const handleDonorUpdate = (updatedData) => {
        let donorData = updatedData.donor;
        setDonors([donorData,...donors]);

    }

    if (isLoading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (!cause) {
        return <div className="error-container">Cause not found.</div>;
    }

    return (
        <div className="cause-details-page">
            {/* Cause Header */}
            <CauseHeader
                title={cause.title}
                creatorName={cause.creator.name}
                category={cause.category.name}
            />

            <div className="cause-details-content">
                {/* Main Content */}
                <div className="main-content">
                    <ImageGallery images={cause.images} />
                    <ProgressDetails
                        progress={cause.progress}
                        targetAmount={cause.targetAmount}
                        fundsRaised={cause.fundsRaised}
                        daysLeft={cause.daysLeft}
                    />
                    <DetailedDescription description={cause.description} />
                    <UpdatesTimeline updates={cause.updates} />
                    <CommentsSection causeId={id} />
                </div>

                {/* Sidebar Content */}
                <aside className="sidebar-content">
                    <DonationSection causeId={id} onDonationUpdate={handleDonationUpdate} onNewDonor={handleDonorUpdate} />
                    <DonorsList donors={donors} />
                </aside>
            </div>
        </div>
    );
}

export default CauseDetailsPage;
