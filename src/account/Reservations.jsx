import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  getAccount,
  getReservations,
  watchMovie,
} from "../api/movies";

import { deleteReservation } from "../api/reservations";
import { Link } from "react-router";
import "./Account.css";

export default function Reservations() {
  // set up state and token variables
  const [reservedMovies, setreservedMovies] = useState([]);
  const [name, setName] = useState();
  const { token } = useAuth();

  // get the users reservations
  const syncReservations = async (token) => {
    const userData = await getAccount(token);
    const resData = await getReservations(token);
    setName(userData.username);
    setreservedMovies(resData);
  };
  useEffect(() => {
    syncReservations(token);
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
              You have reserved {reservedMovies.length} movies
            </p>
          </header>
          <section>
            <h2>Your reserved movies:</h2>
            <ul>
              {reservedMovies.map((movie) => (
                <ReservedMovie
                  key={movie.id}
                  movie={movie}
                  token={token}
                  syncReservations={syncReservations}
                />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

// display the movie in a list item
function ReservedMovie({ movie, token, syncReservations }) {
  const [error, setError] = useState(null);

  // try to add to the watch history table
  const tryWatch = async () => {
    try {
      /** Change the is_watched property in the reservations table */
      await watchMovie(token, movie.id);
      syncReservations(token);
    } catch (e) {
      setError(e.message);
    }
  };

  const returnMovie = async () => {
    try {
      await deleteReservation(token, movie.id);
      syncReservations(token);
    } catch (e) {
      console.error(e);
    }
  };

  /** get the movies reservation */
  

  return (
    <li id="reservations">
      <img
        id="movieposter2"
        src={movie.poster}
        alt={"Cover image of " + movie.title}
      />
      {movie.title}{" "}
      <div id="buttondiv">
        <button id="watchbutton" onClick={tryWatch}>
          {movie.is_watched ? "Watched" : "Watch"}
        </button>
        <button id="deletebutton" onClick={returnMovie}>
          Delete
        </button>
        {error && <p role="alert">{error}</p>}
      </div>
    </li>
  );
}
