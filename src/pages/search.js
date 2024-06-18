import React, { useEffect } from 'react';
import List from "../components/List";

const Search = ({ query, setQuery, doFetch, data, page, setPage }) => {
    useEffect(() => {
        if (query.trim() !== '') {
            console.log('Fetching data for query:', query);
            doFetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${page}`);
        }
    }, [query, doFetch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            console.log('Submitting search with query:', query);
            doFetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${page}`);
        }
    };

    console.log('Query:', query);
    console.log('Data:', data);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search for a movie..."
                    />
                </label>
                <button type="submit">Search</button>
            </form>
            <List data={data} page={page} setPage={setPage}/>
        </div>
    );
}

export default Search;
