import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Item from "../components/Item";
import { useNavigate } from 'react-router-dom';

const ItemDetails = () => {
    const { id } = useParams(); // Get the movie ID from URL params
    const [movie, setMovie] = useState(null);
    const apiImageAddress = "http://image.tmdb.org/t/p/";
    const navigate = useNavigate(); // Access the history object

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }
    console.log(movie)
    const getYearFromDate = (dateString) => {
        return dateString.split('-')[0]; // Split by '-' and take the first part (year)
    };

    return (
        <div>
            <Item
                posterPath={movie.poster_path}
                title={movie.original_title}
                vote={Math.round(movie.vote_average).toFixed()}
            />
            <i>{getYearFromDate(movie.release_date)}</i>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>

            <button onClick={() => navigate(-1)}>go back</button>
        </div>
    );
}

export default ItemDetails;
