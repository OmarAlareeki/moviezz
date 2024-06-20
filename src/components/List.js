import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useDataApi from '../hooks/useFetch';
import Item from './Item';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoopIcon from '@mui/icons-material/Loop';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const List = ({ data, page, setPage }) => {
  const { isLoading, isError } = useDataApi();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage or fetch from TMDb if needed
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      // Fetch user's favorite movies
      fetch(`${BASE_URL}/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`)
        .then(response => response.json())
        .then(data => {
          setFavorites(data.results || []);
        })
        .catch(err => console.error('Failed to fetch favorites:', err));
    }
  }, []);

  function handleFavoriteToggle(movie) {
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
        .then(response => response.json())
        .then(() => {
          setFavorites(prevFavorites => {
            if (isFavorite) {
              return prevFavorites.filter(fav => fav.id !== movie.id);
            } else {
              return [...prevFavorites, movie];
            }
          });
        })
        .catch(err => console.error('Failed to update favorite:', err));
    }
  }

  function handleLoadMore() {
    setPage(page + 1);
  }

  function handleLoadLess() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <span><LoopIcon/></span>
      ) : (
        <div>
          <ul>
            {data && data.results.map((item) => (
              <li key={item.id}>
                
                  <div style={{ border: '1px solid #f7f7f7', margin: '5px' }}>
                  <Link to={`/data/${item.id}`}>
                    <Item
                      posterPath={item.poster_path}
                      title={item.original_title}
                      vote={Math.round(item.vote_average)}
                    />
                    </Link>
                    <button onClick={() => handleFavoriteToggle(item)}>
                      {favorites.some(fav => fav.id === item.id) ?  <FavoriteIcon/> : <FavoriteBorderIcon/>}
                    </button>
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
}

export default List;
