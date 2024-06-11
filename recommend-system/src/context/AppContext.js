// src/context/AppContext.js
import React, { createContext, useState, useRef } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // State for storing the sizes of different layout components
    const [sizes, setSizes] = useState({
        leftWidth: '80%',    // Width of the left pane
        rightWidth: '20%',   // Width of the right pane
        headerHeight: '20%', // Height of the header section
        mainHeight: '70%',   // Height of the main section
        footerHeight: '10%', // Height of the footer section
    });

    // State for managing which component is being resized
    const [isResizing, setIsResizing] = useState(null);

    // Reference to the container element
    const containerRef = useRef(null);

    // State for storing the selected movie genres
    const [selectedGenres, setSelectedGenres] = useState([]);

    // List of movies
    const [movies] = useState([
        { id: 1, title: 'Inception', description: 'A mind-bending thriller', genres: ['Action', 'Sci-Fi', 'Thriller'] },
        { id: 2, title: 'The Godfather', description: 'Crime drama', genres: ['Drama', 'Crime'] },
        { id: 3, title: 'Pulp Fiction', description: 'Crime comedy', genres: ['Crime', 'Drama', 'Comedy'] },
        { id: 4, title: 'The Dark Knight', description: 'Superhero action', genres: ['Action', 'Drama'] },
        { id: 5, title: 'Forrest Gump', description: 'Drama and romance', genres: ['Drama', 'Romance'] },
        { id: 6, title: 'Get Out', description: 'Horror thriller', genres: ['Horror', 'Mystery', 'Thriller'] },
        { id: 7, title: 'The Matrix', description: 'Sci-Fi action', genres: ['Action', 'Sci-Fi'] },
        { id: 8, title: 'The Shawshank Redemption', description: 'Drama', genres: ['Drama'] },
        { id: 9, title: 'Titanic', description: 'Romantic drama', genres: ['Romance', 'Drama'] },
        { id: 10, title: 'The Conjuring', description: 'Horror', genres: ['Horror', 'Mystery'] }
    ]);

    // Minimum size constraints for the resizable components
    const MIN_SIZES = {
        leftWidth: 10,   // Minimum width of the left pane in percentage
        rightWidth: 10,  // Minimum width of the right pane in percentage
        headerHeight: 10, // Minimum height of the header section in percentage
        mainHeight: 10,  // Minimum height of the main section in percentage
        footerHeight: 10, // Minimum height of the footer section in percentage
    };

    /**
     * Function to handle the mouse down event for resizing.
     * @param {string} element - The name of the element being resized.
     */
    const handleMouseDown = (element) => {
        setIsResizing(element);
    };

    /**
     * Function to handle the mouse up event to stop resizing.
     */
    const handleMouseUp = () => {
        setIsResizing(null);
    };

    /**
     * Function to handle the mouse move event for resizing elements.
     * @param {Object} e - The mouse event object.
     */
    const handleMouseMove = (e) => {
        if (isResizing) {
            const bounds = containerRef.current.getBoundingClientRect();

            if (isResizing === 'leftPane') {
                const newLeftWidth = Math.max(MIN_SIZES.leftWidth, Math.min(90, ((e.clientX - bounds.left) / bounds.width) * 100));
                setSizes((prevSizes) => ({ ...prevSizes, leftWidth: `${newLeftWidth}%`, rightWidth: `${100 - newLeftWidth}%` }));
            } else if (isResizing === 'header') {
                const newHeaderHeight = Math.max(MIN_SIZES.headerHeight, Math.min(80, ((e.clientY - bounds.top) / bounds.height) * 100));
                const newMainHeight = 100 - newHeaderHeight - parseFloat(sizes.footerHeight);
                setSizes((prevSizes) => ({ ...prevSizes, headerHeight: `${newHeaderHeight}%`, mainHeight: `${newMainHeight}%` }));
            } else if (isResizing === 'footer') {
                const newFooterHeight = Math.max(MIN_SIZES.footerHeight, Math.min(30, ((bounds.bottom - e.clientY) / bounds.height) * 100));
                const newMainHeight = 100 - parseFloat(sizes.headerHeight) - newFooterHeight;
                setSizes((prevSizes) => ({ ...prevSizes, footerHeight: `${newFooterHeight}%`, mainHeight: `${newMainHeight}%` }));
            }
        }
    };

    /**
     * Function to toggle the selection of a genre.
     * @param {string} genre - The genre to be toggled.
     */
    const toggleGenre = (genre) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genre)
                ? prevSelectedGenres.filter((g) => g !== genre)
                : [...prevSelectedGenres, genre]
        );
    };

    return (
        <AppContext.Provider
            value={{
                sizes,              // Object storing the sizes of the layout components
                handleMouseDown,    // Function to handle mouse down events for resizing
                handleMouseUp,      // Function to handle mouse up events to stop resizing
                handleMouseMove,    // Function to handle mouse move events for resizing
                containerRef,       // Reference to the container element
                selectedGenres,     // Array storing the selected movie genres
                toggleGenre,        // Function to toggle the selection of a genre
                movies              // Array of movie objects
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
