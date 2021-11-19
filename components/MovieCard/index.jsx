import React, { useState, useCallback } from "react";
import "./MovieCard.module.scss";
import { FaEllipsisV } from "react-icons/fa";
import styles from "./MovieCard.module.scss";
export const MovieCard = ({
  movie,
  onMovieSelect,
  onEditMovie,
  onDeleteMovie,
}) => {
  const [showOptionsCard, setShowOptionsCard] = useState(false);

  const showModalOptions = () => {
    setShowOptionsCard(true);
  };

  const hideModalOptions = () => {
    setShowOptionsCard(false);
  };

  const handleClick = useCallback(() => {
    onMovieSelect(movie);
    // navigate(`/search/?movie=${movie.id}`);
    // window.location.reload();
  }, []);

  return (
    <div>
      <div className={styles.container__movie}>
        {!showOptionsCard && (
          <div className={styles.container__movie__options}>
            <FaEllipsisV onClick={showModalOptions} />
          </div>
        )}

        {showOptionsCard && (
          <div className={styles.options__modal}>
            <div
              onClick={hideModalOptions}
              className={styles.button_close_modal}
            >
              X
            </div>
            <div
              className={styles.action_modal}
              onClick={() => onEditMovie(movie)}
            >
              Edit
            </div>
            <div
              className={styles.action_modal}
              onClick={() => onDeleteMovie(movie)}
            >
              Delete
            </div>
          </div>
        )}
        <img
          onClick={() => {
            handleClick(movie);
          }}
          className={styles.container__movie__image}
          src={movie.poster_path}
          alt=""
        />
        <div className={styles.container__movie__name}>
          <p>{movie.title}</p>
          <p>{new Date(movie.release_date).getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};
