import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import StarRating from './StarRating';
import Modal from './Modal';
import './Right.css';

const Right = () => {
    const { likedMovies, updateMovieScore, removeMovie, submitLikedMovies, recommendations, showModal, closeModal } = useContext(AppContext);

    return (
        <div className="right-pane">
            <h2>Liked Movies</h2>
            <div className="liked-movies-list">
                {likedMovies.map((movie, index) => (
                    <div className="movie-card" key={index}>
                        <div className="movie-card-header">
                            <h3>{movie.title}</h3>
                            <button className="cancel-button" onClick={() => removeMovie(index)}>✖</button>
                        </div>
                        <p>{movie.genres.join(', ')}</p>
                        <div className="star-rating-container">
                            <label>Score: </label>
                            <StarRating
                                score={movie.score}
                                onChange={(score) => updateMovieScore(index, score)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {likedMovies.length > 0 && (
                <button className="submit-button" onClick={submitLikedMovies}>Submit</button>
            )}

            <Modal show={showModal} onClose={closeModal}>
                <h2>Recommendations</h2>
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={index}>{rec.title}</li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default Right;
