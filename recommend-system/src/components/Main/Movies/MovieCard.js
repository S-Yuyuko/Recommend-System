// src/components/Main/MovieCard.js
import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
        </div>
    );
};

export default MovieCard;
