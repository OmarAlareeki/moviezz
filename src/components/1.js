import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const ItemDetails = ({ id, title, posterPath, vote }) => {
    const apiImageAddress = "http://image.tmdb.org/t/p/";
    return (
        <div>
            <Card style={{ width: '12.5rem' }}>
                <Card.Img variant="top" src={`${apiImageAddress}w300${posterPath}`} style={{ width: '300px', height: '400px' }} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Link to="/">Home</Link>
                    <span> <i className="star"><h5>{vote}</h5></i></span>
                </Card.Body>
            </Card>
        </div>

    )
}
export default ItemDetails;