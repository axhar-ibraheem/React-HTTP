import { useRef } from "react";
import "./AddMoviesForm.css";

const AddMoviesForm = (props) => {
  const movieTitleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newMovieObj = {
      title: movieTitleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.onAddMovie(newMovieObj);
  };

  return (
    <div className="container">
      <form className="movie-form" onSubmit={onSubmitHandler}>
        <label className="label" htmlFor="title">
          Title
        </label>
        <input ref={movieTitleRef} type="text" id="title" name="title" />
        <label className="label" htmlFor="openingText">
          Opening Text
        </label>
        <textarea
          ref={openingTextRef}
          type="text"
          id="openingText"
          name="openingText"
        />
        <label className="label" htmlFor="releaseDate">
          Release Date
        </label>
        <input
          ref={releaseDateRef}
          type="text"
          id="releaseDate"
          name="releaseDate"
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
