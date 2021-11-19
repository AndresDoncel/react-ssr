import { RETRIEVE_MOVIES } from "../actions/types";

const initialState = [];

function movieReducer(movies = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_MOVIES:
      return payload;

    default:
      return movies;
  }
}

export default movieReducer;
