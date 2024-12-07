import React from 'react';
import '../styles/DonorsList.css';

function DonorsList({ donors }) {
    return (
        <section className="donors-list">
            <h3>Donors</h3>
            <ul>
                {donors.map((donor) => (
                    <li key={donor.id} className="donor-item">
                        <p className="donor-name">{donor.anonymous ? 'Anonymous' : donor.name}</p>
                        <p className="donor-amount">${donor.amount}</p>
                        <p className="donor-date">{new Date(donor.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default DonorsList;
