import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Main = () => {
  const { movies, setMovies, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch('path-to-movielens-dataset');
      const data = await response.json();
      setMovies(data.movies);
      setLoading(false);
    };

    fetchMovies();
  }, [setMovies, setLoading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h2>Recommended Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
