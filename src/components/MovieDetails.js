import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const params = useParams();

  const [movieDetails, setMovieDetails] = useState({
    data: null,
    status: "idle",
  });

  useEffect(() => {
    async function fetchData() {
      console.log("data", movieDetails);
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${params.imdbID}&apikey=2511cc5f`
      );
      console.log("Response", response);
      setMovieDetails({ status: "success", data: response.data });
    }
    fetchData();
  }, [params.imdbID]);

  console.log(movieDetails);

  console.log("WHAT ARE PARAMS:", params);

  return (
    <div>
      <h1>
        {movieDetails.data?.Title} ({movieDetails.data?.Year})
      </h1>

      <img
        className="details_image"
        src={movieDetails.data?.Poster}
        alt={`movieDetails.data?.Title`}
      />
      <div className="details_container">
        <p>{movieDetails.data?.Genre}</p>
        <h3>DIRECTOR:</h3>
        <p>{movieDetails.data?.Director}</p>
        <h3>LANGUAGE:</h3>
        <p>{movieDetails.data?.Language}</p>
        <h3>PLOT:</h3>
        <p>{movieDetails.data?.Plot}</p>
        <h3>IMDB RATING:</h3>
        <p>{movieDetails.data?.imdbRating}</p>
      </div>
    </div>
  );
}
