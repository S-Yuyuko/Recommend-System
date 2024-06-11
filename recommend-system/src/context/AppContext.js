// src/context/AppContext.js
import React, { createContext, useState, useRef } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [sizes, setSizes] = useState({
        leftWidth: '80%',
        rightWidth: '20%',
        headerHeight: '20%',
        mainHeight: '70%',
        footerHeight: '10%',
    });
    const [isResizing, setIsResizing] = useState(null);
    const containerRef = useRef(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const MIN_SIZES = {
        leftWidth: 10,   // Minimum width of the left pane in percentage
        rightWidth: 10,  // Minimum width of the right pane in percentage
        headerHeight: 10, // Minimum height of the header section in percentage
        footerHeight: 10, // Minimum height of the footer section in percentage
    };

    const handleMouseDown = (element) => {
        setIsResizing(element);
    };

    const handleMouseUp = () => {
        setIsResizing(null);
    };

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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
