import React, { useEffect, useState } from "react";
import ErrorBoundary from "../ErrorBundary";
import "./formAddMovie.module.scss";
import Select from "react-select";
import { Formik, Field, Form, ErrorMessage } from "formik";
import movieService from "../../services/movie.service";
import * as Yup from "yup";
import { useSnackbar } from "react-simple-snackbar";
import styles from "./formAddMovie.module.scss";

export const FormAddMovie = ({ movie, onCreateMovieSuccess }) => {
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const initialValues = movie
    ? { ...movie }
    : {
        title: "",
        release_date: "",
        poster_path: "",
        vote_average: "",
        genres: [],
        runtime: "",
        overview: "",
      };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    release_date: Yup.string().required("release_date is required"),
    poster_path: Yup.string().required("poster_path is required"),
    vote_average: Yup.string()
      .required("vote_average is required")
      .min(1, "Vote aavaraage must be at least 1")
      .max(100, "Vote aavaraage must be at max 100"),
    genres: Yup.array().required("genres is required"),
    runtime: Yup.string().required("runtime is required"),
    overview: Yup.string().required("overview is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (!movie) {
      createMovie(fields, setSubmitting);
    } else {
      updateMovie(fields, setSubmitting);
    }
  }

  function createMovie(fields, setSubmitting) {
    movieService
      .create(fields)
      .then(() => {
        onCreateMovieSuccess();
        openSnackbar("Movie was created successfully");
      })
      .catch(() => {
        setSubmitting(false);
      });
  }

  function updateMovie(fields, setSubmitting) {
    movieService
      .update(fields)
      .then(() => {
        document.querySelectorAll(".modal").forEach(function (a) {
          a.remove();
        });
        openSnackbar("Movie was updated successfully");
      })
      .catch((error) => {
        setSubmitting(false);
      });
  }

  return (
    <ErrorBoundary>
      <div className={styles.container__form}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => {
            return (
              <Form>
                <div className={styles.row__form}>
                  <div
                    className={`${styles.container__input} ${styles.input__left}`}
                  >
                    <label>TITLE</label>
                    <Field
                      className={
                        "form-control" +
                        (errors.title && touched.title ? " is-invalid" : "")
                      }
                      id="title"
                      name="title"
                      placeholder="Title"
                    />
                    <ErrorMessage
                      name="title"
                      className={styles.invalid_feedback}
                    />
                  </div>
                  <div
                    className={`${styles.container__input} ${styles.input__rigth}`}
                  >
                    <label>RELEASE DATE</label>
                    <Field
                      className={
                        "form-control" +
                        (errors.release_date && touched.release_date
                          ? " is-invalid"
                          : "")
                      }
                      type="date"
                      id="release_date"
                      name="release_date"
                      placeholder="Release date"
                    />
                    <ErrorMessage
                      name="release_date"
                      className={styles.invalid_feedback}
                    />
                  </div>
                </div>
                <div className={styles.row__form}>
                  <div
                    className={`${styles.container__input} ${styles.input__left}`}
                  >
                    <label>MOVIE URL</label>
                    <Field
                      className={
                        "form-control" +
                        (errors.poster_path && touched.poster_path
                          ? " is-invalid"
                          : "")
                      }
                      id="poster_path"
                      name="poster_path"
                      placeholder="Movie URL"
                    />
                    <ErrorMessage
                      name="poster_path"
                      className={styles.invalid_feedback}
                    />
                  </div>
                  <div
                    className={`${styles.container__input} ${styles.input__rigth}`}
                  >
                    <label>RATING</label>
                    <Field
                      className={
                        "form-control" +
                        (errors.vote_average && touched.vote_average
                          ? " is-invalid"
                          : "")
                      }
                      type="number"
                      id="vote_average"
                      name="vote_average"
                      placeholder="Rating"
                    />
                    <ErrorMessage
                      name="vote_average"
                      className={styles.invalid_feedback}
                    />
                  </div>
                </div>
                <div className={styles.row__form}>
                  <div
                    className={`${styles.container__input} ${styles.input__left}`}
                  >
                    <label>genre</label>
                    {/* <Select
                  styles={customStyles}
                  classNamePrefix="filter"
                  placeholder="Select a gender"
                  options={options}
                  id="genres"
                  name="genres"
                /> */}
                    <Field
                      className={
                        "form-control" +
                        (errors.genres && touched.genres ? " is-invalid" : "")
                      }
                      as="select"
                      multiple
                      name="genres"
                    >
                      <option value="comedy">Comedy</option>
                      <option value="accion">Accion</option>
                      <option value="romance">Romance</option>
                    </Field>
                    <ErrorMessage
                      name="genres"
                      className={styles.invalid_feedback}
                    />
                  </div>
                  <div
                    className={`${styles.container__input} ${styles.input__rigth}`}
                  >
                    <label>RUNTIME</label>
                    <Field
                      type="number"
                      className={
                        "form-control" +
                        (errors.runtime && touched.runtime ? " is-invalid" : "")
                      }
                      id="runtime"
                      name="runtime"
                      placeholder="Runtime"
                    />
                    <ErrorMessage
                      name="runtime"
                      className={styles.invalid_feedback}
                    />
                  </div>
                </div>
                <div className={styles.row__form}>
                  <div className={styles.container__textarea}>
                    <label>OVERVIEW</label>
                    <Field
                      className={
                        "form-control" +
                        (errors.overview && touched.overview
                          ? " is-invalid"
                          : "")
                      }
                      component="textarea"
                      id="overview"
                      name="overview"
                      placeholder="Overview"
                    />
                    <ErrorMessage
                      name="overview"
                      className={styles.invalid_feedback}
                    />
                  </div>
                </div>

                <div className={styles.container__actions__form}>
                  <button className={styles.reset__button}>RESET</button>
                  <button
                    disabled={isSubmitting}
                    className={styles.submit__button}
                    type="submit"
                  >
                    submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ErrorBoundary>
  );
};
