import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css'; // Ensure your CSS styles are defined here
import MoviesList from './components/MoviesList';

const App = () => {
  const [genres, setGenres] = useState({});
  const [popularMovies, setPopularMovies] = useState([]);
  const apiKey = '';

  useEffect(() => {
    fetchGenres();
    fetchPopularMoviesWithDetails();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
      const genresData = response.data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      setGenres(genresData);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchPopularMoviesWithDetails = async () => {
    try {
      const popularResponse = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`);
      const popularMovies = popularResponse.data.results.slice(0, 5); // Limit to first 5 for example

      const moviesWithDetailsPromises = popularMovies.map(async (movie) => {
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`);
        const cast = creditsResponse.data.cast.map((actor) => actor.name).slice(0, 3); // Get names of the first 3 actors
        return { ...movie, cast };
      });

      const moviesWithDetails = await Promise.all(moviesWithDetailsPromises);
      setPopularMovies(moviesWithDetails);
    } catch (error) {
      console.error('Error fetching popular movies with details:', error);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="App">
      <Slider {...carouselSettings}>
        {popularMovies.map((movie) => (
          <div key={movie.id} className="carousel-slide">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p><span className="rating-badge">Rating: {movie.vote_average}</span></p>

            <p>Actors: {movie.cast.join(', ')}</p>
          </div>
        </div>
        
        ))}
      </Slider>
      <MoviesList genres={genres} />
    </div>
  );
};

export default App;
