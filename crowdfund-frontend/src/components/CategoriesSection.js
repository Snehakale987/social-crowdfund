// CategoriesSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CategoriesSection.css';
import LoadingSpinner from './LoadingSpinner'; // Optional: If creating a separate spinner component


function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        axios
            .get('http://test-797390839.us-east-1.elb.amazonaws.com/api/categories')
            .then((response) => {
                setCategories(response.data);
                setIsLoading(false); // Data fetched, stop loading
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setIsLoading(false); // Stop loading even if there's an error
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
                        onClick={() => console.log(`Clicked on ${category.name}`)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') console.log(`Pressed Enter on ${category.name}`);
                        }}
                    >
                        <picture className="category-picture">
                            <source
                                srcSet={`/images/${category.image}.avif`}
                                type="image/avif"
                            />
                            <source
                                srcSet={`/images/${category.image}.webp`}
                                type="image/webp"
                            />
                            <img
                                src={`/images/${category.image}.jpg`}
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
