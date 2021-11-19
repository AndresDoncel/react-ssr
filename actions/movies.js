import { RETRIEVE_MOVIES } from "./types";

import MovieDataService from "../services/movie.service";

export const retrieveMovies =
  (searchQuery, genreQuery, sortByQuery) => async (dispatch) => {
    try {
      const res = await MovieDataService.getMovies(
        searchQuery,
        genreQuery,
        sortByQuery
      );
      dispatch({
        type: RETRIEVE_MOVIES,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const findMoviesByGender = (gender) => async (dispatch) => {
  try {
    const res = await MovieDataService.findByGender(gender);

    dispatch({
      type: RETRIEVE_MOVIES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const sortMoviesByOrder = (sortBy, sortOrder) => async (dispatch) => {
  try {
    const res = await MovieDataService.sortByOrder(sortBy, sortOrder);

    dispatch({
      type: RETRIEVE_MOVIES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};
