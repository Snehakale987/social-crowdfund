import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cause from './Cause';
import '../styles/Causes.css';

function CausesPage() {
    const [causes, setCauses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const causesPerPage = 8; // Number of causes per page

    useEffect(() => {
        const fetchCauses = async () => {
            try {
                const response = await axios.get(
                    `http://test-797390839.us-east-1.elb.amazonaws.com:5000/api/causes?page=${currentPage}&limit=${causesPerPage}`
                );
                setCauses(response.data.causes);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching causes:', error);
            }
        };

        fetchCauses();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="causes-page">
            <h1>All Causes</h1>
            <div className="causes-grid">
                {causes.map((cause) => (
                    <Cause key={cause.id} cause={cause} />
                ))}
            </div>
            <div className="pagination">
                {[...Array(totalPages).keys()].map((index) => (
                    <button
                        key={index}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CausesPage;
