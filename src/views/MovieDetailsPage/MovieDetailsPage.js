import { useState, useEffect, Suspense } from "react";
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import FilmPendingView from "../FilmPendingView/FilmPendingView";
import * as filmsAPI from "../../services/films-api";
import "./MovieDetailsPage.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    filmsAPI.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {/* <PageHeading text={`Film ${movieId}`} /> */}

      {movie && (
        <>
          <h2>{movie.title}</h2>
          <img
            src={`${filmsAPI.POSTER_URL}/${movie.poster_path}`}
            alt={movie.title}
          />

          <h3>User score: {movie.vote_average}</h3>
          <p>{movie.overview}</p>

          {movie.genres && (
            <>
              <p>Genres</p>
              <ul className="genres">
                {movie.genres.map((item, index) => (
                  <li key={index} className="genre-item">
                    {item.name}
                  </li>
                ))}
              </ul>
            </>
          )}

          <nav>
            <NavLink
              to={`${url}/cast`}
              className="link"
              activeClassName="active-link"
            >
              Cast
            </NavLink>
            <br></br>

            <NavLink
              to={`${url}/reviews`}
              className="link"
              activeClassName="active-link"
            >
              Reviews
            </NavLink>
          </nav>
          <Suspense fallback={<FilmPendingView />}>
            <Switch>
              <Route path={`${path}:movieId/cast`}>
                <Cast movieId={movieId} />
              </Route>

              <Route path={`${path}:movieId/reviews`}>
                <Reviews movieId={movieId} />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}
