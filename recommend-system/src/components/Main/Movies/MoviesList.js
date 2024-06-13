import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext';
import MovieCard from './MovieCard';
import './MoviesList.css';

const MoviesList = () => {
    const { movies, loadMoreMovies } = useContext(AppContext);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            loadMoreMovies();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreMovies]);

    return (
        <div className="movies-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MoviesList;
