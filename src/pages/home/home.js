import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import "./home.css"
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {

    const [popularMovies,setPopularMovies]=useState([]);

    useEffect(() => {

        fetch("https://api.themoviedb.org/3/movie/popular?api_key=33fa51663330b71f349bfb93411febfc&language=en-US").then(res => res.json()).then(data => setPopularMovies(data.results))
}, [])
/*https://api.themoviedb.org/3/movie/550?api_key=33fa51663330b71f349bfb93411febfc */


    return (

        <>
            <div className="poster">
                <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={2}
                infiniteLoop={true}
                showStatus={true}
                
                >
                {
                    popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="img"/>
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                }
                </Carousel>
                <MovieList />
            </div>
        </>


    )

}

export default Home