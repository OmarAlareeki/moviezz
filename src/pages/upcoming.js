
import { React, useEffect } from 'react'
import List from "../components/List";
const UpComing = ({ setQuery, data, page, setPage }) => {
    useEffect(() => {
        setQuery("movie/upcoming")
    }, [setQuery])

    return (
        <div>
            <List data={data} page={page} setPage={setPage}/>
        </div>
    )
}

export default UpComing
