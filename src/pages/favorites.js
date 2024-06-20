import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Item from '../components/Item';
import { AuthContext } from '../pages/AuthContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function Favorites() {
  const { favorites, setFavorites, removeFavorite } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const sessionId = localStorage.getItem('sessionId');
        const accountId = localStorage.getItem('accountId');

        if (sessionId && accountId) {
          const response = await fetch(`${BASE_URL}/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch favorites: ${response.status} - ${response.statusText}`);
          }

          const data = await response.json();
          setFavorites(data.results || []);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [page, setFavorites]);

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
        <span>Loading...</span>
      ) : (
        <div>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((item) => (
                <li key={item.id}>
                  <Link to={`/data/${item.id}`}>
                    <div style={{ border: '1px solid #f7f7f7', margin: '5px' }}>
                      <Item
                        posterPath={item.poster_path}
                        vote={Math.round(item.vote_average)}
                      />
                      <button onClick={() => removeFavorite(item.id)}><DeleteForeverIcon /></button>
                    </div>
                  </Link>   
                </li>
              ))}
            </ul>
          ) : (
            <div>No favorites found.</div>
          )}
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

export default Favorites;
