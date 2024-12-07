import React, {useEffect, useState} from 'react';
import '../styles/BasicInfoForm.css';
import axios from "axios";

function BasicInfoForm({ causeData, updateCauseData, nextStep }) {
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!causeData.title || !causeData.category || !causeData.targetAmount || !causeData.startDate || !causeData.endDate) {
            setError('All fields are required.');
            return;
        }
        setError('');
        nextStep();
    };

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <form className="basic-info-form" onSubmit={handleSubmit}>
            <h2>Basic Information</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Cause Title"
                value={causeData.title}
                onChange={(e) => updateCauseData('title', e.target.value)}
                required
            />
            <select
                value={causeData.category}
                onChange={(e) => updateCauseData('category', e.target.value)}
                required
            >
                <option value="" disabled>
                    Select a category
                </option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Target Amount ($)"
                value={causeData.targetAmount}
                onChange={(e) => updateCauseData('targetAmount', e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Start Date"
                value={causeData.startDate}
                onChange={(e) => updateCauseData('startDate', e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="End Date"
                value={causeData.endDate}
                onChange={(e) => updateCauseData('endDate', e.target.value)}
                required
            />
            <button type="submit">Next</button>
        </form>
    );
}

export default BasicInfoForm;
