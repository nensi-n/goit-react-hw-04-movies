import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { fetchTrendingMovies, POSTER_URL } from "../../services/films-api";
import FilmPendingView from "../FilmPendingView/FilmPendingView";
import FilmErrorView from "../FilmErrorView/FilmErrorView";
import "./HomeView.css";

const Status = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function HomeView() {
  const { url } = useRouteMatch();
  const [films, setFilms] = useState([]);
  const [error, setError] = useState({});
  const [status, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchTrendingMovies()
      .then((request) => setFilms(request.results))
      .then(setStatus(Status.RESOLVED))
      .catch((err) => {
        setError(err);
        setStatus(Status.REJECTED);
      });
  }, []);

  if (status === Status.PENDING) {
    return <FilmPendingView />;
  }

  if (status === Status.REJECTED) {
    return <FilmErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {films && (
          <>
            <p className="heading-name">Trending today</p>
            <ul className="data-container">
              {films.map((film) => (
                <li key={film.id} className="list__element">
                  <Link to={`${url}movies/${film.id}`}>
                    <img
                      src={POSTER_URL + film.poster_path}
                      alt={film.title}
                      width="300"
                      height="450"
                    />
                    <p className="element__name">{film.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}
