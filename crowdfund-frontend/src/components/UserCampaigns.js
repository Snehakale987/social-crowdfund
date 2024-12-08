import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserCampaigns.css';

function UserCampaigns() {
    const { id } = useParams(); // User ID
    const [campaigns, setCampaigns] = useState({ created: [], donated: [] });

    useEffect(() => {
        axios.get(`http://test-797390839.us-east-1.elb.amazonaws.com:5000/api/users/${id}`)
            .then((response) => setCampaigns(response.data))
            .catch((error) => console.error('Error fetching user campaigns:', error));
    }, [id]);

    return (
        <div className="user-campaigns">
            <h2>Campaigns by {id}</h2>
            <h3>Created Campaigns</h3>
            <ul>
                {campaigns.created.map((campaign) => (
                    <li key={campaign.id}>{campaign.title}</li>
                ))}
            </ul>
            <h3>Donated Campaigns</h3>
            <ul>
                {campaigns.donated.map((campaign) => (
                    <li key={campaign.id}>{campaign.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserCampaigns;
