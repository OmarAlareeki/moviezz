import { React } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Item = ({ id, title, posterPath, vote, children }) => {
    const apiImageAddress = "http://image.tmdb.org/t/p/";

    return (
        <div>
            <Link to="/itemDetails">
            <Card style={{ width: '12.5rem' }}>
                <Card.Img variant="top" src={`${apiImageAddress}w300${posterPath}`} style={{ width: '300px', height: '400px' }} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <span> <i className="star"><h5>{vote}</h5></i></span>
                </Card.Body>
            </Card>
            </Link>
        </div>
    )
}

export default Item
