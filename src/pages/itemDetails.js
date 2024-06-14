import React from "react";
import { Link } from "react-router-dom";
import Item from "../components/Item";

const ItemDetails = ({ data, id, title, posterPath, vote }) => {
    const apiImageAddress = "http://image.tmdb.org/t/p/";
    return (
        <div>
            <Item data={data} id={id} title={title} posterPath={posterPath} vote={vote} />
            <Link to="../">Go back</Link>
        </div>
    )
}
export default ItemDetails