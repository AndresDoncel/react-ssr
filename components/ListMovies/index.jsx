import React, { Component } from "react";
import { MovieCard } from "../MovieCard";
import ErrorBoundary from "../ErrorBundary";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ListMovies.module.scss";
import {
  retrieveMovies,
  findMoviesByGender,
  sortMoviesByOrder,
} from "../../actions/movies";
import { FilterBar } from "../FilterBar";
import { ModalDelete } from "../ModalDelete";
import { Modal } from "../Modal";
import { FormAddMovie } from "../FormAddMovie";
import movieService from "../../services/movie.service";
import styles from "./ListMovies.module.scss";

const ListMovies = ({ movies }) => {
  return (
    <ErrorBoundary>
      <FilterBar />
      <div className={styles.container__movies}>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </ErrorBoundary>
  );
};

export default ListMovies;
