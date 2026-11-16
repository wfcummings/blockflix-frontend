import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  getAccount,
  getReservation,
  getReservations,
  watchMovie,
} from "../api/movies";
import { Link } from "react-router";
import "./Account.css";

export default function Reservations() {
  // set up state and token variables
  const [reservedMovies, setreservedMovies] = useState([]);
  const [name, setName] = useState();
  const { token } = useAuth();

  // get the users reservations
  useEffect(() => {
    const syncReservations = async () => {
      const userData = await getAccount(token);
      const resData = await getReservations(token);
      setName(userData.username);
      setreservedMovies(resData);
    };
    syncReservations();
  }, [token]);

  if (!token) {
    return (
      <p>
        Please <Link to="/login">log in</Link> to see your account.
      </p>
    );
  }

  if (!name || !reservedMovies) return <p>Loading...</p>;

  return (
    <>
      <div id="account-background">
        <div id="accountsection">
          <header>
            <h1>Welcome, {name}!</h1>
            <p id="numofreserve">
              You have reserved {reservations.length} movies
            </p>
          </header>
          <section>
            <h2>Your reserved movies:</h2>
            <ul>
              {reservations.map((movie) => (
                <ReservedMovie key={movie.id} movie={movie} token={token} />
              ))}
            </ul>
          </section>
        </div>
      </div>
      <header>
        <h1>Welcome {name}</h1>
        <p>You have reserved {reservedMovies.length} movies</p>
      </header>
      <section>
        <h2>Your reservations</h2>
        <ul id="reservations">
          {reservedMovies.map((movie) => (
            <ReservedMovie key={movie.id} movie={movie} token={token} />
          ))}
        </ul>
      </section>
    </>
  );
}

// display the movie in a list item
function ReservedMovie({ movie, token }) {
  const [error, setError] = useState(null);

  // try to add to the watch history table
  const tryWatch = async () => {
    try {
      const res = await getReservation(token, movie.id);
      await watchMovie(token, res.id);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <li id="reservations">
      <img
        id="movieposter2"
        src={movie.poster}
        alt={"Cover image of " + movie.title}
      />
      {movie.title}{" "}
      <button id="watchbutton" onClick={tryWatch}>
        Watch
      </button>
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
