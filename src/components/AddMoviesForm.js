import { useState, useRef } from "react";
import "./AddMoviesForm.css";

const AddMoviesForm = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  let newMovieObje = {
    title: "",
    Text: "",
    dateOfRelease: "",
  };
  const inputTitleHandler = (e) => {
    setMovieTitle(e.target.value);
  };
  const inputTextHandler = (e) => {
    setOpeningText(e.target.value);
  };
  const inputReleaseDateHandler = (e) => {
    setReleaseDate(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(movieTitle, openingText, releaseDate);
    setMovieTitle("");
    setOpeningText("");
    setReleaseDate("");
  };

  return (
    <div className="container">
      <form className="movie-form" onSubmit={onSubmitHandler}>
        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          onChange={inputTitleHandler}
          type="text"
          id="title"
          name="title"
          value={movieTitle}
        />
        <label className="label" htmlFor="openingText">
          Opening Text
        </label>
        <textarea
          onChange={inputTextHandler}
          type="text"
          id="openingText"
          name="openingText"
          value={openingText}
        />
        <label className="label" htmlFor="releaseDate">
          Release Date
        </label>
        <input
          onChange={inputReleaseDateHandler}
          type="text"
          id="releaseDate"
          name="releaseDate"
          value={releaseDate}
        />
        <div className="btn">
          <button type="submit" className="addMovie-btn">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMoviesForm;
