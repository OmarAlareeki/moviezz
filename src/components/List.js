import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import useDataApi from "../hooks/useFetch";
import Item from "./Item"

const List = ({ data, page, setPage }) => {

    const [isLoading] = useState(false);
    const [isError] = useState(false);
    function handleLoadMore() {
        setPage(page + 1);
    }
    function handleLoadLess() {
        setPage(page - 1)
    }
    return (
        <div>
            {isError && <div>Something went wrong ...</div>}
            {isLoading ? (<span>Loading...</span>) :
                <div>
                    <ul>
                        {data && data.results.map((item) => {
                            return (
                                <li style={
                                    item.poster_path ?
                                        { border: '1px solid #f7f7f7', margin: '5px' } :
                                        { display: "none" }}>
                                    <Item
                                        id={item.id}
                                        posterPath={item.poster_path}
                                        title={item.original_title}
                                        vote={item.vote_average}
                                    />
                                </li>)
                        })}
                    </ul>

                </div>
            }
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {page > 1 && (<Button onClick={handleLoadLess}>previous</Button>)}
                <h3>{page}</h3>
                <Button onClick={handleLoadMore}>Next</Button>
            </div>
        </div>
    )
}

export default List
