import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import MoviesList from './Movies/MoviesList';
import Pagination from './Pagination';
import './Main.css';

const Main = () => {
    const { mainRef, selectedGenres } = useContext(AppContext);

    return (
        <main className="main" ref={mainRef}>
            {selectedGenres.length === 0 ? (
                <div className="no-genres">No Genre Selected</div>
            ) : (
                <>
                    <MoviesList />
                    <Pagination />
                </>
            )}
        </main>
    );
};

export default Main;
