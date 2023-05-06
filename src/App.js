import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  async function movieFetchHandler() {
    setIsloading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    setMovies(data.results);
    setIsloading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <span>loading...</span> : <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
