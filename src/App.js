import "./App.css";
import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar/Appbar";
import Container from "./components/Container/Container";
import FilmPendingView from "./views/FilmPendingView/FilmPendingView";
import { ToastContainer } from "react-toastify";

const HomeView = lazy(() =>
  import("./views/HomeView/HomeView" /* webpackChunkName: "HomePage" */)
);
const FilmsPage = lazy(() =>
  import("./views/FilmsPage/FilmsPage" /* webpackChunkName: "MoviesPage" */)
);
const NotFoundView = lazy(() =>
  import(
    "./views/FilmErrorView/FilmErrorView" /* webpackChunkName: "NotFoundView" */
  )
);
const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<FilmPendingView />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>
          <Route path="/movies" exact>
            <FilmsPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
