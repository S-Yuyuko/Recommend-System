// src/components/Main/Main.js
import React from 'react';
import MoviesList from './Movies/MoviesList';
import './Main.css';

const Main = () => {
    return (
        <main className="main">
            <MoviesList />
        </main>
    );
};

export default Main;
