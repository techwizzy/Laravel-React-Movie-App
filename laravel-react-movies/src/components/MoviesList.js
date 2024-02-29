import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCategoryRow from "./MovieCategoryRow"; // Assuming this is your component for displaying movies by category

const MoviesList = ({ genres }) => {
    const [categorizedMovies, setCategorizedMovies] = useState({});
  

    useEffect(() => {
        fetchAllMovies();
    }, [genres]); // Re-fetch if genres change

    const fetchAllMovies = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8087/api/movies`
            );
            const fetchedMovies = response.data || [];

            //console.log("API response:", response.data); // After the API call
            // Filter movies to exclude those without a poster
            const moviesWithPoster = fetchedMovies.filter(
                (movie) => movie.poster_path != null
            );

            categorizeMovies(moviesWithPoster);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const categorizeMovies = (movies) => {
        const genreMap = {};
        movies.forEach((movie) => {
            // console.log("Current Movie Genre IDs:", movie.genre_ids);
            const genreIds = JSON.parse(movie.genre_ids || "[]");
            if (Array.isArray(genreIds)) {
                genreIds.forEach((genreId) => {
                    // console.log(`Genre ID: ${genreId}, Genre Name: ${genres[genreId]}`);
                    const genreName = genres[genreId] || "Unknown";
                    if (!genreMap[genreName]) {
                        genreMap[genreName] = [];
                    }
                    genreMap[genreName].push(movie);
                });
            } else {
                console.error("genre_ids is not an array:", movie.genre_ids);
            }
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
