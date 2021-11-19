import React, { useState } from "react";
import styles from "./header.module.scss";
import headerBackground from "../../assets/images/bg_header.png";
import { Modal } from "../Modal";
import { FormAddMovie } from "../FormAddMovie";

export const Header = ({ app, searchQuery, onReloadMovies }) => {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const onSearchMovie = () => {
    const search = document.getElementById("value_movie").value;
    // navigate(`/search/?searchQuery=${search}`);
    window.location.reload();
  };

  const inputChangedHandler = (event) => {
    searchQuery = event.target.value;
  };

  return (
    <div className={styles.container__header}>
      <div className={styles.container__header__wrapper}>
        <div className={styles.container__header__add__movie}>
          <p>
            {app.title}
            <span>{app.subtitle}</span>
          </p>
          <Modal title="Add movie" show={showModal} handleClose={hideModal}>
            <FormAddMovie onCreateMovieSuccess={hideModal}></FormAddMovie>
          </Modal>
          <button className={styles.add__movie__button} onClick={onShowModal}>
            + add movie
          </button>
        </div>
        <div className={styles.container__header__title}>
          <h1>FIND YOUR MOVIE</h1>
        </div>
        <div className={styles.container__header__search}>
          <input
            onChange={(event) => inputChangedHandler(event)}
            id="value_movie"
            defaultValue={searchQuery}
            placeholder="What do you want to watch?"
            type="text"
          />
          <button
            onClick={onSearchMovie}
            className={styles.search__movie__button}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
