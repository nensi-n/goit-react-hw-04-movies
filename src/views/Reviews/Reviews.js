import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMovieReviews } from "../../services/films-api";
import "./Reviews.css";

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then((request) => setReviews(request.results));
  }, [movieId]);
  return (
    <>
      {reviews.length > 0 ? (
        <>
          <ul>
            {reviews.map((item, index) => (
              <li key={index} className="rewie">
                <p> {item.author}</p>
                <p> {item.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No reviews to show</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
