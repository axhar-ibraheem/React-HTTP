import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const [cancelRetry, setCancelRetry] = useState(true);
  const [timeOutId, setTimeOutId] = useState(null);

  async function movieFetchHandler() {
    setCancelRetry(true);

    try {
      setIsloading(true);
      const response = await fetch("https://swapi.dev/api/film");

      if (!response.ok) {
        throw new Error("Something went wrong  ...Retrying");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (e) {
      setError(e.message);
      setTimeOutId(setTimeout(movieFetchHandler, 5000));
    }
    setIsloading(false);
  }

  const retryHandler = () => {
    clearTimeout(timeOutId);
    setCancelRetry(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <span>loading...</span> : <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {error && <button onClick={retryHandler}>Cancel Retrying</button>}
        {!cancelRetry && <p>Retrying stopped.</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
