import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navigation/NavBar';
import Home from './pages/home';
import Search from './pages/search';
import Discover from './pages/discover';
import Trending from './pages/trending';
import UpComing from './pages/upcoming';
import Popular from './pages/popular';
import Tv from './pages/tv';
import ItemDetails from './pages/itemDetails';
import SignIn from './pages/signin';
import AuthCallback from './pages/AuthCallback';
import Favorites from './pages/favorites';
import { AuthProvider } from './pages/AuthContext';
import useDataApi from './hooks/useFetch';
import './css/App.css';

function App() {
  const apiUrl = 'https://api.themoviedb.org/3/';
  const [page, setPage] = useState(1);
  const [{ data, isLoading, isError }, doFetch] = useDataApi();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query) {
      doFetch(`${apiUrl}${query}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${query}&page=${page}&per_page=50`);
    }
  }, [query, page]);

  return (
    <div className="App">
      <header style={{ boxShadow: '0px 0px 3px 0px #9d9c9c' }}>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home data={data} query={query} setQuery={setQuery} page={page} setPage={setPage} />} />
              <Route path="/search" element={<Search data={data} query={query} setQuery={setQuery} doFetch={doFetch} page={page} setPage={setPage} />} />
              <Route path="/discover" element={<Discover data={data} query={query} setQuery={setQuery} page={page} setPage={setPage} />} />
              <Route path="/trending" element={<Trending data={data} query={query} setQuery={setQuery} page={page} setPage={setPage} />} />
              <Route path="/upcoming" element={<UpComing data={data} query={query} setQuery={setQuery} page={page} setPage={setPage} />} />
              <Route path="/popular" element={<Popular data={data} query={query} setQuery={setQuery} page={page} setPage={setPage} />} />
              <Route path="/tv" element={<Tv data={data} query={query} setQuery={setQuery} page={page} setPage={setPage} />} />
              <Route path="/:type/:id" element={<ItemDetails data={data} />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/authenticate/callback" element={<AuthCallback />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </AuthProvider>
        </Router>
      </header>
    </div>
  );
}

export default App;
