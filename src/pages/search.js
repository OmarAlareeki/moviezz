import { React, useEffect } from 'react';
import List from "../components/List";

const Search = ({ query, setQuery, doFetch, data }) => {
    return (
        <div>
            <form onSubmit={(e) => {
                doFetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);
                e.preventDefault();
            }}>
                <label>
                    <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a movie..." />
                </label>
                <button type="submit">Search</button>
            </form>
            <List data={data} />
        </div>
    )
}

export default Search
