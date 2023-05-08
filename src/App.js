import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMoviesForm from "./components/AddMoviesForm";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const [cancelRetry, setCancelRetry] = useState(true);
  const [timeOutId, setTimeOutId] = useState(null);

  const movieFetchHandler = useCallback(async () => {
    setCancelRetry(true);
    try {
      setIsloading(true);
      const response = await fetch(
        "https://react-http-4a6c0-default-rtdb.firebaseio.com//movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong  ...Retrying");
      }
      const data = await response.json();
      const moviesList = [];
      for (const key in data) {
        moviesList.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(moviesList);
    } catch (e) {
      setError(e.message);
      // setTimeOutId(setTimeout(movieFetchHandler, 5000));
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    movieFetchHandler();
  }, [movieFetchHandler]);

  const retryHandler = () => {
    // clearTimeout(timeOutId);
    setCancelRetry(false);
  };

  const onAddMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-4a6c0-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
  };

  const onDeleteHandler = async (id) => {
    await fetch(
      `https://react-http-4a6c0-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    );
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <React.Fragment>
      <AddMoviesForm onAddMovie={onAddMovieHandler} />
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? (
          <span>loading...</span>
        ) : (
          <MoviesList movies={movies} onDelete={onDeleteHandler} />
        )}
        {!isLoading && error && <p>{error}</p>}
        {error && <button onClick={retryHandler}>Cancel Retrying</button>}
        {!cancelRetry && <p>Retrying stopped.</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
