import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMoviesByName } from "../../services/films-api";
import FilmErrorView from "../FilmErrorView/FilmErrorView";
import FilmPendingView from "../FilmPendingView/FilmPendingView";
import MoviesPage from "../MoviesPage/MoviesPage";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function FilmsStatus({ filmName, queryURL }) {
  const [error, setError] = useState({});
  const [status, setStatus] = useState(Status.IDLE);
  const [films, setFilms] = useState([]);

  const fetchFilms = (name) => {
    fetchMoviesByName(name)
      .then((newFilms) => {
        if (newFilms.total_results > 0) {
          setFilms(newFilms.results);
          setStatus(Status.RESOLVED);
        } else return Promise.reject(new Error("Invalid request"));
      })
      .catch((err) => {
        setError(err);
        setStatus(Status.REJECTED);
      });
  };

  useEffect(() => {
    if (filmName === "" && queryURL !== null) {
      fetchFilms(queryURL);
      return;
    }
    if (filmName) {
      fetchFilms(filmName);
    }
  }, [filmName, queryURL]);

  if (status === Status.IDLE) {
    return <p>Please enter your search term</p>;
  }

  if (status === Status.PENDING) {
    return <FilmPendingView />;
  }

  if (status === Status.REJECTED) {
    return <FilmErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <MoviesPage films={films} />
      </>
    );
  }
}

FilmsStatus.propTypes = {
  filmName: PropTypes.string.isRequired,
  queryURL: PropTypes.string,
};

export default FilmsStatus;
