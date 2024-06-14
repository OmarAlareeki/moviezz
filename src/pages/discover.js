import { React, useEffect } from "react";
import List from "../components/List";
const Discover = ({ setQuery, data }) => {
    useEffect(() => {
        
        setQuery("movie/top_rated")
    }, [setQuery])
    console.log(data)
    return (
        <div>
            <List data={data}/>
        </div>
    )
}

export default Discover
