// src/components/Header/Header.js
import React from 'react';
import GenresHeader from './GenresHeader';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>Movie Genres</h1>
            <GenresHeader />
        </header>
    );
};

export default Header;
