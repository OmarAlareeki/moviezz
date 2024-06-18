import React from 'react';
import Card from 'react-bootstrap/Card';

const Item = ({ id, title, posterPath, vote }) => {
    const apiImageAddress = "http://image.tmdb.org/t/p/";

    return (
        <div>
            <Card style={{ width: '12.5rem', marginBottom: '20px' }}>
                <Card.Img variant="top" src={`${apiImageAddress}w300${posterPath}`} alt={title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <span>
                            <i className="star">{vote}</i>
                        </span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Item;
