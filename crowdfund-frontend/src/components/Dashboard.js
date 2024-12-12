import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import {Link} from "react-router-dom";

function Dashboard() {
    const [myCauses, setMyCauses] = useState([]);
    const [myDonations, setMyDonations] = useState([]);
    const [myCategories, setMyCategories] = useState([]);
    const [activeTab, setActiveTab] = useState('causes'); // Toggle between tabs
    const [filters, setFilters] = useState({ search: '', category: '' });

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://test-797390839.us-east-1.elb.amazonaws.com:5000/api/categories');
                setMyCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();

        // Fetch causes created by the user
        axios
            .get('http://test-797390839.us-east-1.elb.amazonaws.com:5000/api/causes/my-causes', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((response) => setMyCauses(response.data))
            .catch((error) => console.error('Error fetching my causes:', error));

        // Fetch donations made by the user
        axios
            .get('http://test-797390839.us-east-1.elb.amazonaws.com:5000/api/causes/my-donations', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((response) => setMyDonations(response.data))
            .catch((error) => console.error('Error fetching my donations:', error));
    }, []);

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const filteredCauses = myCauses.filter(
        (cause) =>
            cause.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            (filters.category === '' || cause.category.name === filters.category)
    );

    const filteredDonations = myDonations.filter((donation) =>
        donation.cause.title.toLowerCase().includes(filters.search.toLowerCase())
    );

    return (
        <div className="dashboard">
            <h1>My Dashboard</h1>
            <div className="tabs">
                <button
                    className={activeTab === 'causes' ? 'active' : ''}
                    onClick={() => setActiveTab('causes')}
                >
                    My Causes
                </button>
                <button
                    className={activeTab === 'donations' ? 'active' : ''}
                    onClick={() => setActiveTab('donations')}
                >
                    My Donations
                </button>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                {activeTab === 'causes' && (
                    <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                        {myCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {activeTab === 'causes' && (
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Progress</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCauses.map((cause) => (
                        <tr key={cause.id}>
                            <td><Link to={`/cause-details/${cause.id}`}>{cause.title}</Link></td>
                            <td>{cause.category.name}</td>
                            <td>{new Date(cause.startDate).toLocaleDateString()}</td>
                            <td>{new Date(cause.endDate).toLocaleDateString()}</td>
                            <td>{cause.progress}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {activeTab === 'donations' && (
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredDonations.map((donation) => (
                        <tr key={donation.id}>
                            <td>{donation.cause.title}</td>
                            <td>${donation.amount}</td>
                            <td>{new Date(donation.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Dashboard;
