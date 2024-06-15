import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import MovieCard from './MovieCard';
import './MoviesList.css';

const MoviesList = () => {
    const { movies } = useContext(AppContext);

    return (
        <div className="movies-list">
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </div>
    );
};

export default MoviesList;
