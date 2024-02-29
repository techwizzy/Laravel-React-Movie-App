import React from 'react';
import Slider from 'react-slick';

const MovieCategoryRow = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div>
      <h2>{title}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCategoryRow;