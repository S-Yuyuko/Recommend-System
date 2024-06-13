import React from 'react';
import './StarRating.css';

const StarRating = ({ score, onChange }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                className={`star ${i <= score ? 'filled' : ''}`}
                onClick={() => onChange(i)}
            >
                ★
            </span>
        );
    }

    return <div className="star-rating">{stars}</div>;
};

export default StarRating;
