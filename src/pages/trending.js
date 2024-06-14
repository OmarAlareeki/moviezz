import { React, useState, useEffect } from 'react'
import useDataApi from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import List from "../components/List";

const Trending = ({ setQuery, data }) => {
    useEffect(() => {
        setQuery("discover/movie")
    }, [setQuery])
    console.log(data)
    return (
        <div>
            <List data={data} />
        </div>
    )
}

export default Trending
