import { Link } from "react-router";

export default function MovieList({ movies }) {
  return (
    <ul id="movies">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}

function MovieListItem({ movie }) {
  return (
    <li className="movie">
      <figure className="center-children">
        <img src={movie.poster} alt={"Cover image of " + movie.title} />
      </figure>
      <div>
        <h3>
          <Link id="movie-title" to={"/movies/" + movie.id}>
            {movie.title}
          </Link>
        </h3>
      </div>
    </li>
  );
}
