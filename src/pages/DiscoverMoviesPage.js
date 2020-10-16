import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

export default function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState("");

  const [searchStatus, setSearchStatus] = useState({
    status: "Search for movies",
    data: [],
  });

  const history = useHistory();
  const params = useParams();

  function onChangeSearch(event) {
    // console.log(searchText);
    setSearchText(event.target.value);
  }

  function navigateToSearch() {
    console.log("Navigate to search");
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  }

  useEffect(() => {
    async function onClickSearch() {
      // console.log("Search for this movie:", searchText);
      setSearchStatus({ status: "Searching...", data: [] });
      // Encode the string so that special characters
      //  like '&' and '?' don't accidentally mess up the URL
      const queryParam = encodeURIComponent(params.searchtext);
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${queryParam}&apikey=2511cc5f`
      );
      console.log(response);

      if (response.data.Error === "Movie not found!") {
        setSearchStatus({ status: "Oops, movie not found!", data: [] });
      } else if (params.searchtext === undefined) {
        setSearchStatus({ status: "Search for a movie", data: [] });
      } else {
        setSearchStatus({ status: "Success!", data: response.data.Search });
        setSearchText(params.searchtext);
      }

      console.log("Success!", response.data.Search);
    }
    // console.log("What is search status?", searchStatus);
    onClickSearch();
  }, [params.searchtext]);

  return (
    <div>
      <h1>Discover Movies</h1>
      <input
        className="search_box"
        onChange={onChangeSearch}
        type="text"
        placeholder="Search movies..."
        value={searchText}
      ></input>
      <button onClick={navigateToSearch}>Search</button>
      <p>{searchStatus.status}</p>

      {searchStatus.data.map(function (movie) {
        // console.log("what's movie", movie);
        const { Title, Year, Poster, imdbID } = movie;

        return (
          <div className="image_results" key={imdbID}>
            <Link to={`/movie/${imdbID}`}>
              <h3>
                {Title} ({Year})
              </h3>
            </Link>
            <img src={Poster} alt={Title} />
          </div>
        );
      })}
    </div>
  );
}
