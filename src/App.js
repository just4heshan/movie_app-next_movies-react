import { React, useEffect, useState } from "react";

import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./components/MovieCard";
import Footer from "./components/Footer";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=a2717ed3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data.Search)
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  return (
    <div className="app">
      <h1>NextMovies</h1>
      <div className="search">
        <input
          placeholder="Search a movie"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
          }}
        />
        <img src={SearchIcon} alt="Search button" onClick={() => searchMovies(searchTitle)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
