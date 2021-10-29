import PropTypes from "prop-types";

function FilmErrorView({ message }) {
  return (
    <div role="alert">
      <p>Sorry, something went wrong. Error: {message}</p>
    </div>
  );
}

FilmErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FilmErrorView;
