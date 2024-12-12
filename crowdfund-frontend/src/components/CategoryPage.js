import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CauseCard from './CauseCard';
import '../styles/CategoryPage.css';
import Cause from "./Cause";

function CategoryPage() {
    const { id } = useParams();
    const [causes, setCauses] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCausesByCategory = async () => {
            try {
                const response = await axios.get(`http://test-797390839.us-east-1.elb.amazonaws.com:5000/api/categories/${id}`);
                setCauses(response.data.causes);
                setCategoryName(response.data.categoryName); // Assuming category name is returned
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching causes for category:', error);
                setIsLoading(false);
            }
        };

        fetchCausesByCategory();
    }, [id]);

    if (isLoading) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div className="category-page">
            <h1 className="category-title">{categoryName}</h1>
            <div className="causes-list">
                {causes.map((cause) => (
                    <Cause key={cause.id} cause={cause} />
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
