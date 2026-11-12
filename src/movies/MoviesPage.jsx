import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import MovieList from "./MovieList";
import { getMovies } from "../api/movies";
import { Link } from "react-router";

export default function MoviesPage() {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);

  const syncMovies = async () => {
    const data = await getMovies(token);
    setMovies(data);
  };
  useEffect(() => {
    syncMovies();
  }, []);

  if (!token)
    return (
      <p>
        Please <Link to="/login">log in</Link> to see movies.
      </p>
    );

  return (
    <>
      {token && <h1>Available Movies</h1>}
      {token && <MovieList movies={movies} syncMovies={syncMovies} />}
    </>
  );
}
