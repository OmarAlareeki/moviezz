// src/pages/ItemDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../components/Item";
import LoopIcon from '@mui/icons-material/Loop';
import ShareButton from "../components/ShareButton"; // Correct import path
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ItemDetails = () => {
    const { id } = useParams(); // Get the movie ID from URL params
    const [movie, setMovie] = useState(null);
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
        return <div style={{ textAlign: "center" }}><LoopIcon /></div>;
    }

    const getYearFromDate = (dateString) => {
        return dateString.split('-')[0]; // Split by '-' and take the first part (year)
    };

    return (
        <div style={{margin: "10px"}}>
            <button 
                style={{margin: "5px", background: "#56ff0b",color: "black"}} 
                onClick={() => navigate(-1)}><ArrowBackIcon style={{position: "relative", bottom: "-5px", }}/> Go Back</button>
            <Item
                posterPath={movie.poster_path}
                title={movie.original_title}
                vote={Math.round(movie.vote_average).toFixed()}
            />
            <i>{getYearFromDate(movie.release_date)}</i>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <div>   

                <ShareButton item={{ id: movie.id, title: movie.title }} />
            </div>
           
        </div>
    );
}

export default ItemDetails;
