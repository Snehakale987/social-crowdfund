import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cause from './Cause';
import LoadingSpinner from './LoadingSpinner';
import '../styles/TrendingCauses.css';

function TrendingCauses() {
    const [causes, setCauses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const causesPerPage = 8; // Number of causes per page

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://localhost:5000/api/causes/trending?page=${currentPage}&limit=${causesPerPage}`)
            .then((response) => {
                setCauses(response.data.causes);
                setTotalPages(response.data.totalPages);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching causes:', error);
                setIsLoading(false);
            });
    }, [currentPage]);

    // Smooth scroll logic for scrolling horizontally
    const scrollToPage = (direction) => {
        const container = document.querySelector('.causes-carousel');
        const scrollAmount = 300; // Pixels to scroll per click
        const nextPage = direction === 'left' ? currentPage - 1 : currentPage + 1;

        // Smoothly scroll the container
        container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });

        // Update the current page
        if (direction === 'left' && currentPage > 1) {
            setCurrentPage(nextPage);
        } else if (direction === 'right' && currentPage < totalPages) {
            setCurrentPage(nextPage);
        }
    };

    // if (isLoading) {
    //     return (
    //         <section className="trending">
    //             <h2>Trending Causes</h2>
    //             <div className="loading-container">
    //                 <LoadingSpinner />
    //             </div>
    //         </section>
    //     );
    // }

    return (
        <section className="trending">
            <h2>Trending Causes</h2>
            <div className="carousel-container">
                <button
                    className="scroll-button left"
                    onClick={() => scrollToPage('left')}
                    style={{ display: currentPage === 1 ? "none" : "block" }}
                    disabled={currentPage === 1}
                >
                    &#8249;
                </button>
                <div className="causes-carousel">
                    {causes.map((cause) => (
                        <Cause key={cause.id} cause={cause} />
                    ))}
                </div>
                <button
                    className="scroll-button right"
                    onClick={() => scrollToPage('right')}
                    style={{ display: currentPage === totalPages ? "none" : "block" }}
                    disabled={currentPage === totalPages}
                >
                    &#8250;
                </button>
            </div>
            <div className="pagination-info">
                Page {currentPage} of {totalPages}
            </div>
        </section>
    );
}

export default TrendingCauses;
