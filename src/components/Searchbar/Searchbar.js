import { ImSearch } from "react-icons/im";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

function Searchbar({ onSubmit }) {
  const [filmName, setFilmName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (filmName.trim() === "") {
      toast("Please enter search query");
      return;
    }

    onSubmit(filmName);

    setFilmName("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          value={filmName}
          onChange={(event) =>
            setFilmName(event.currentTarget.value.toLowerCase())
          }
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
        />
        <button type="submit">
          <ImSearch />
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
