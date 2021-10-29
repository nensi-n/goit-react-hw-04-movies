import { Link, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { POSTER_URL } from "../../services/films-api";

function MoviesPage({ films }) {
  const { url } = useRouteMatch();

  return (
    <ul className="data-container">
      {films.map((film) => (
        <li key={film.id} className="list__element">
          <Link to={`${url}/${film.id}`}>
            <img
              src={POSTER_URL + film.poster_path}
              alt={film.title}
              width="300"
              height="450"
            />
            <p>{film.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

MoviesPage.propTypes = {
  images: PropTypes.array,
};

export default MoviesPage;
