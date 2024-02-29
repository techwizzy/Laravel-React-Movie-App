 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCategoryRow from './MovieCategoryRow'; // Assuming this is your component for displaying movies by category

const MoviesList = ({ genres }) => {
  const [categorizedMovies, setCategorizedMovies] = useState({});
  const apiKey = 'c1b5145cb207f88ed57eaed48dc169bc'; // Replace with your actual TMDB API key

  useEffect(() => {
    fetchAllMovies();
  }, [genres]); // Re-fetch if genres change

  const fetchAllMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US`);
      const fetchedMovies = response.data.results || [];
      
      // Filter movies to exclude those without a poster
      const moviesWithPoster = fetchedMovies.filter(movie => movie.poster_path != null);

      categorizeMovies(moviesWithPoster);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const categorizeMovies = (movies) => {
    const genreMap = {};
    movies.forEach(movie => {
      movie.genre_ids.forEach(genreId => {
        const genreName = genres[genreId] || 'Unknown';
        if (!genreMap[genreName]) {
          genreMap[genreName] = [];
        }
        genreMap[genreName].push(movie);
      });
    });
    setCategorizedMovies(genreMap);
  };

  return (
    <div className="movies-list">
      {Object.entries(categorizedMovies).map(([genre, movies]) => (
        <MovieCategoryRow key={genre} title={genre} movies={movies} />
      ))}
    </div>
  );
};

export default MoviesList;
