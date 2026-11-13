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
        <img
          id="movieposter"
          src={movie.poster}
          alt={"Cover image of " + movie.title}
        />
      </figure>
      <div>
        <h3>
          <Link id="movietitle" to={"/movies/" + movie.id}>
            {movie.title}
          </Link>
        </h3>
      </div>
    </li>
  );
}
