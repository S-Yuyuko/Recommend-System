import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const { likeMovie } = useContext(AppContext);

    return (
        <div className="movie-card" onClick={() => likeMovie(movie)}>
            <h3>{movie.title}</h3>
            <p>{movie.genres.join(', ')}</p>
        </div>
    );
};

export default MovieCard;
