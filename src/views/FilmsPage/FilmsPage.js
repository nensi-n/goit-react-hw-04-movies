import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Searchbar from "../../components/Searchbar/Searchbar";
import FilmsStatus from "../FilmStatus/FilmStatus";

export default function FilmsPage() {
  const history = useHistory();
  const location = useLocation();
  const [filmName, setFilmName] = useState("");
  const [films, setFilms] = useState([]);

  const queryURL = new URLSearchParams(location.search).get("query");

  const onQueryChange = (query) => {
    history.push({ ...location, search: `query=${query}` });
  };

  const onSubmit = (name) => {
    setFilmName(name);
    setFilms([]);
    onQueryChange(name);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <FilmsStatus filmName={filmName} queryURL={queryURL} />
    </>
  );
}
