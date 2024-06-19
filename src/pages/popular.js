import React, { useEffect } from "react";
import List from "../components/List";

const Popular = ({ setQuery, data, page, setPage  }) => {
    useEffect(() => {
        setQuery("movie/popular");
    }, [setQuery]);

    return (
        <div>
            <List data={data} page={page} setPage={setPage}/>
        </div>
    );
}

export default Popular;