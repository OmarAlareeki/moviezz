import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      setIsAuthenticated(true);
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);

      fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&session_id=${sessionId}`)
        .then(response => response.json())
        .then(data => {
          if (data.id) {
            localStorage.setItem('accountId', data.id);
            console.log('Account ID stored:', data.id);
          } else {
            console.error('Failed to fetch account ID');
          }
        })
        .catch(err => {
          console.error('Failed to fetch account details:', err);
        });
    }
  }, []);

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, item];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(item => item.id !== itemId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, favorites, setFavorites, addFavorite, removeFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};
