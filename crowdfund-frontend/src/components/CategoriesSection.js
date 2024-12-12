// CategoriesSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CategoriesSection.css';
import LoadingSpinner from './LoadingSpinner';
import {useNavigate} from "react-router-dom";


function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://test-797390839.us-east-1.elb.amazonaws.com:5000/api/categories')
            .then((response) => {
                setCategories(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <section className="categories">
                <h2>Explore Categories</h2>
                <div className="loading-container">
                    <LoadingSpinner/>
                </div>
            </section>
        );
    }

    return (
        <section className="categories">
            <h2>Explore Categories</h2>
            <div className="categories-grid">
                {categories.map((category) => (
                    <div
                        className="category-card"
                        key={category._id}
                        tabIndex="0"
                        role="button"
                        onClick={() => navigate(`/category/${category.id}`)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') console.log(`Pressed Enter on ${category.name}`);
                        }}
                    >
                        <picture className="category-picture">
                            <img
                                src={`http://test-797390839.us-east-1.elb.amazonaws.com:5000/uploads/category/${category.image}.jpg`}
                                alt={category.name}
                                className="category-image"
                            />
                        </picture>
                        <div className="category-overlay">
                            <h3 className="category-name">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoriesSection;
