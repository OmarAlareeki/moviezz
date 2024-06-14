import { React, useState, useEffect } from 'react'
import './css/App.css';
import Navbar from '../src/navigation/NavBar';
import List from './components/List';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Search from "../src/pages/search";
import Discover from "./pages/discover";
import Trending from "./pages/trending";
import UpComing from "./pages/upcoming";
import ItemDetails from "./pages/itemDetails";
import useDataApi from "../src/hooks/useFetch";
import { useNavigate } from "react-router-dom";


function App() {
  const apiUrl = 'https://api.themoviedb.org/3/';
  const [page, setPage] = useState(1);
  const [{ data, isLoading, isError }, doFetch] = useDataApi();
  const [query, setQuery] = useState('');

  useEffect(() => {
    doFetch(`${apiUrl}${query}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&${page}`)
    
  })
  return (
    <div className="App">
      <header style={{ boxShadow: '0px .0px 3px 0px #9d9c9c' }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/search" element={<Search data={data} query={query} setQuery={setQuery} doFetch={doFetch}/>} />
            <Route path="/discover" element={<Discover data={data} setQuery={setQuery}/>} />
            <Route path="/trending"  element={<Trending data={data} setQuery={setQuery}/>} />
            <Route path="/upcoming" element={<UpComing data={data} setQuery={setQuery}/>} page={page} setPage={setPage}/>
            <Route path="/itemDetails" element={<ItemDetails data={data} setQuery={setQuery}/>}/>
            {/* <Route path="/team" element={<Teams />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/sign-up" element={<SignUp />} */}
          </Routes>
        </Router>
      </header>
      {/* <List /> */}

    </div>
  );
}


export default App;
