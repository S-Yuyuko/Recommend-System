import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AppContext.Provider value={{ movies, setMovies, user, setUser, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
