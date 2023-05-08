import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const removeHandler = () => {
    props.onDelete(props.id);
  };
  return (
    <>
      <li className={classes.movie}>
        <h2>{props.title}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.openingText}</p>
      </li>
      <button onClick={removeHandler}>Remove Movie</button>
    </>
  );
};

export default Movie;
