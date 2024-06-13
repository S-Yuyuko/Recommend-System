import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import './GenresHeader.css';

const GenresHeader = () => {
    const { genres, selectedGenres, toggleGenre } = useContext(AppContext);

    return (
        <div className="genres-header">
            {genres.map((genre) => (
                <button
                    key={genre}
                    className={`genre-button ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                    onClick={() => toggleGenre(genre)}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenresHeader;
