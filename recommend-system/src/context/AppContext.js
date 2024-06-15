import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';

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
    const mainRef = useRef(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [likedMovies, setLikedMovies] = useState([]); // State for liked movies

    const MIN_SIZES = {
        leftWidth: 10,
        rightWidth: 10,
        headerHeight: 10,
        mainHeight: 10,
        footerHeight: 10,
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('http://localhost:4000/genres');
                const data = await response.json();
                setGenres(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setGenres([]);
            }
        };

        fetchGenres();
    }, []);

    const fetchMovies = useCallback(async (page, reset = false) => {
        try {
            console.log(`Fetching movies with genres: ${selectedGenres}, page: ${page}`);
            const response = await fetch('http://localhost:4000/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ genres: selectedGenres.includes('ALL') ? [] : selectedGenres, page, limit: 24 }),
            });
            const data = await response.json();
            if (reset) {
                setMovies(data.movies || []); // Ensure movies is an array
                setTotalPages(data.totalPages);
            } else {
                setMovies((prevMovies) => [...prevMovies, ...(data.movies || [])]); // Ensure movies is an array
            }
            setIsFetching(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]); // Set to empty array on error
            setIsFetching(false);
        }
    }, [selectedGenres]);

    useEffect(() => {
        if (selectedGenres.length > 0) {
            fetchMovies(1, true);
            setPage(1); // Reset page
        }
    }, [selectedGenres, fetchMovies]);

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
        if (genre === 'ALL') {
            setSelectedGenres(['ALL']);
        } else {
            setSelectedGenres((prevSelectedGenres) => {
                if (prevSelectedGenres.includes(genre)) {
                    return prevSelectedGenres.filter((g) => g !== genre);
                } else {
                    return prevSelectedGenres.filter((g) => g !== 'ALL').concat(genre);
                }
            });
        }
        setMovies([]); // Clear displayed movies when genres change
        setPage(1); // Reset page when genres change
    };

    const changePage = (newPage) => {
        setPage(newPage);
        fetchMovies(newPage, true);
    };

    const likeMovie = (movie) => {
        setLikedMovies((prevLikedMovies) => {
            if (prevLikedMovies.some(likedMovie => likedMovie.title === movie.title)) {
                return prevLikedMovies;
            }
            return [...prevLikedMovies, { ...movie, score: 0 }];
        });
    };

    const updateMovieScore = (index, score) => {
        setLikedMovies((prevLikedMovies) =>
            prevLikedMovies.map((movie, idx) =>
                idx === index ? { ...movie, score } : movie
            )
        );
    };

    const removeMovie = (index) => {
        setLikedMovies((prevLikedMovies) =>
            prevLikedMovies.filter((_, idx) => idx !== index)
        );
    };

    const submitLikedMovies = async () => {
        try {
            const response = await fetch('http://localhost:3000/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ likedMovies }),
            });
            const data = await response.json();
            console.log('Recommendations:', data);
        } catch (error) {
            console.error('Error submitting liked movies:', error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                sizes,
                handleMouseDown,
                handleMouseUp,
                handleMouseMove,
                containerRef,
                mainRef,
                selectedGenres,
                toggleGenre,
                genres,
                movies,
                page,
                totalPages,
                changePage,
                isFetching,
                setIsFetching,
                likedMovies,
                likeMovie, // Provide the likeMovie function to the context
                updateMovieScore, // Provide the updateMovieScore function to the context
                removeMovie, // Provide the removeMovie function to the context
                submitLikedMovies, // Provide the submitLikedMovies function to the context
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
