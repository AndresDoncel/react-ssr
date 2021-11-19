import http from "../http-common";

class MovieDataService {
  getMovies(searchQuery, genreQuery, sortByQuery) {
    const searchBy = genreQuery ? "genres" : "title";
    const filter = genreQuery ? genreQuery : "";
    return http.get(
      `/movies?search=${searchQuery}&searchBy=${searchBy}&filter=${filter}&sortBy=${sortByQuery}`
    );
  }

  get(id) {
    return http.get(`/movies/${id}`);
  }

  findByGender(gender) {
    return http.get(`/movies?searchBy=genres&filter=${gender}`);
  }

  sortByOrder(sortBy, sortOrder) {
    return http.get(`/movies?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }

  create(data) {
    return http.post("/movies", data);
  }

  update(data) {
    return http.put(`/movies`, data);
  }

  delete(id) {
    return http.delete(`/movies/${id}`);
  }
}

export default new MovieDataService();
