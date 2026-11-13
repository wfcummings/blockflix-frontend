import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import MovieList from "./MovieList";
import { getMovies } from "../api/movies";
import { Link } from "react-router";
import "./MoviesPage.css";

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
      {token && (
        <div className="movies-background">
          <h1 id="moviespagetitle">Available Movies</h1>
          <MovieList movies={movies} syncMovies={syncMovies} />
        </div>
      )}
    </>
  );
}
