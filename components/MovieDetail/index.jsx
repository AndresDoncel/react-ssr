import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./MovieDetail.module.scss";
import MovieDataService from "../../services/movie.service";
import styles from "./MovieDetail.module.scss";

export const MovieDetail = ({ app, movieId, onSearchSelect }) => {
  const [movie, setMovie] = useState({});

  useEffect(async () => {
    const movie = await MovieDataService.get(movieId);
    setMovie(movie.data);
  }, []);

  return (
    <article>
      <div className={styles.container__detail__movie}>
        <div className={styles.container__detail__movie__search}>
          <p>
            {app.title}
            <span>{app.subtitle}</span>
          </p>
          {/* <FaSearch
            onClick={() => {
              onSearchSelect();
            }}
          /> */}
        </div>
        <div className={styles.container__detail__movie__info}>
          <img src={movie.poster_path} alt="" />
          <div className={styles.container__detail__movie__info__detail}>
            <div className={styles.container_name}>
              <h1>{movie.title}</h1>
              <div className={styles.rate}>{movie.vote_average}</div>
            </div>
            <div className={styles.container_duration}>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>{movie.runtime}</span>
            </div>
            <p className={styles.sinopsis}>{movie.overview}</p>
          </div>
        </div>
      </div>
      <div className={styles.space__movie__detail}></div>
    </article>
  );
};
