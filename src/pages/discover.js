import React, { useEffect } from "react";
import List from "../components/List";

const Discover = ({ setQuery, data, page, setPage  }) => {
    useEffect(() => {
        setQuery("movie/top_rated");
    }, [setQuery]);

    return (
        <div>
            <List data={data} page={page} setPage={setPage}/>
        </div>
    );
}

export default Discover;