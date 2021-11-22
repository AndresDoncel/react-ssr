import { App } from "../components/App/App";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import http from "../http-common";

const isServer = () => typeof window === "undefined";

const getMovies = (searchQuery, searchByQuery) => {
  return http
    .get(`/movies?search=${searchQuery}&searchBy=${searchByQuery}`)
    .then((response) => response.data);
};

function Search({ movies }) {
  const router = useRouter();
  const searchQuery = getRoute(router, "searchQuery");
  const searchByQuery = getRoute(router, "searchBy");

  const [searchMovies, setMovies] = useState(movies);
  useEffect(async () => {
    if (movies == null) {
      const movies = await getMovies(searchQuery, searchByQuery);
      setMovies(movies.data);
    }
  }, []);

  return <App movies={searchMovies} />;
}

Search.getInitialProps = async ({ query }) => {
  const { searchQuery, searchBy } = query;
  if (isServer()) {
    const res = await getMovies(searchQuery, searchBy);
    return {
      movies: res.data,
    };
  } else {
    return {
      movies: null,
    };
  }
};

export function getRoute(router, queryKey) {
  if (router.query[queryKey]) {
    return router.query[queryKey];
  } else {
    const fullPath = router.asPath.match(
      new RegExp(`[&?]${queryKey}=(.*)(&|$)`)
    );
    if (fullPath) {
      return fullPath[1];
    }
  }
}

export default Search;
