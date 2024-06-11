// src/components/Main/MoviesList.js
import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import MovieCard from './MovieCard';
import './MoviesList.css';

const MoviesList = () => {
    const { movies, selectedGenres } = useContext(AppContext);

    // Filter movies based on selected genres
    const filteredMovies = movies.filter(movie =>
        selectedGenres.length === 0 || movie.genres.some(genre => selectedGenres.includes(genre))
    );

    return (
        <div className="movies-list">
            {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))
            ) : (
                <p>No movies found for the selected genres.</p>
            )}
        </div>
    );
};

export default MoviesList;
