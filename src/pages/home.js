import React, { useEffect } from 'react';
import List from '../components/List';

const Home = ({ setQuery, data, page, setPage }) => {
    useEffect(() => {
        setQuery("trending/movie/day"); // Assuming you set the correct API endpoint for trending movies
    }, [setQuery]);

    return (
        <div>
            <List data={data} page={page} setPage={setPage}/>
        </div>
    );
}

export default Home;
