import { App } from "../components/App/App";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const isServer = () => typeof window === "undefined";

const getMovies = (searchQuery) => {
  return axios
    .get(`http://localhost:4000/movies?search=${searchQuery}`)
    .then((response) => response.data);
};

function Search({ movies }) {
  const router = useRouter();
  const searchQuery = getRoute(router, "searchQuery");

  const [searchMovies, setMovies] = useState(movies);

  useEffect(async () => {
    if (movies == null) {
      const movies = await getMovies(searchQuery);
      setMovies(movies.data.data);
    }
  }, []);

  return <App movies={searchMovies} />;
}

Search.getInitialProps = async (context) => {
  if (isServer()) {
    const res = await getMovies();
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
