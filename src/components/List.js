// Adjusted List component with per_page parameter
import React from 'react';
import Button from 'react-bootstrap/Button';
import useDataApi from "../hooks/useFetch";
import Item from "./Item";
import { Link } from "react-router-dom";

const List = ({ data, page, setPage }) => {
    const { isLoading, isError } = useDataApi(); // Assuming useDataApi returns isLoading and isError states

    function handleLoadMore() {
        setPage(page + 1);
    }

    function handleLoadLess() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <div>
            {isError && <div>Something went wrong ...</div>}
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <div>
                    <ul>
                        {data && data.results.map((item) => (
                            <Link to={`/data/${item.id}`} key={item.id}>
                                <li>
                                    {item.poster_path && (
                                        <div style={{ border: '1px solid #f7f7f7', margin: '5px' }}>
                                            <Item
                                                posterPath={item.poster_path}
                                                title={item.original_title}
                                                vote={Math.round(item.vote_average)}
                                            />
                                        </div>
                                    )}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {page > 1 && <Button onClick={handleLoadLess}>Previous</Button>}
                <h3>{page}</h3>
                <Button onClick={handleLoadMore}>Next</Button>
            </div>
        </div>
    );
}

export default List;
