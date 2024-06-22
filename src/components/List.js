import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Item from './Item';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoopIcon from '@mui/icons-material/Loop';
import { AuthContext } from '../pages/AuthContext';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const List = ({ data, page, setPage }) => {
  const { favorites, setFavorites, addFavorite, removeFavorite } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      fetchFavorites(sessionId);
    }
  }, []);

  const fetchFavorites = (sessionId) => {
    fetch(`${BASE_URL}/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setFavorites(data.results || []);
      })
      .catch(err => console.error('Failed to fetch favorites:', err));
  };

  const handleFavoriteToggle = (movie) => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      const isFavorite = favorites.some(fav => fav.id === movie.id);
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ media_type: 'movie', media_id: movie.id, favorite: !isFavorite })
      };

      fetch(`${BASE_URL}/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${sessionId}`, options)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          if (isFavorite) {
            removeFavorite(movie.id);
          } else {
            addFavorite(movie);
          }
        })
        .catch(err => console.error('Failed to update favorite:', err));
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleLoadLess = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <span><LoopIcon /></span>
      ) : (
        <div>
          <ul>
            {data && data.results.map((item) => (
              <li key={item.id}>
                <div style={{ border: '1px solid #f7f7f7', margin: '5px', height: "460px" }}>
                  <Link to={`/data/${item.id}`}>
                    <Item
                      posterPath={item.poster_path}
                      vote={Math.round(item.vote_average)}
                    />
                  </Link>
                  <Button onClick={() => handleFavoriteToggle(item)} style={{position: "relative", bottom: "48px", left: "10px"}}>
                    {favorites.some(fav => fav.id === item.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {page > 1 && <Button onClick={handleLoadLess}>Previous</Button>}
        <h3>{page}</h3>
        <Button onClick={handleLoadMore}>Next</Button>
      </div>
    </div>
  );
};

export default List;
