import React, { useEffect } from "react";
import List from "../components/List";

const Tv = ({ setQuery, data, page, setPage  }) => {
    useEffect(() => {
        setQuery("tv/popular");
    }, [setQuery]);

    return (
        <div>
            <List data={data} page={page} setPage={setPage}/>
        </div>
    );
}

export default Tv;