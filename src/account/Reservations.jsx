import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  getAccount,
  getReservation,
  getReservations,
  watchMovie,
} from "../api/movies";
import { Link, useNavigate } from "react-router";


export default function Reservations() {
    // set up state and token variables
  const [reservations, setReservations] = useState([]);
  const [name, setName] = useState();
  const { token } = useAuth();

  // get the users reservations
  useEffect(() => {
    const syncReservations = async () => {
      const userData = await getAccount(token);
      const resData = await getReservations(token);
      setName(userData.username);
      setReservations(resData.reservations);
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

  if (!name) return <p>Loading...</p>;

  return (
    <>
      <header>
        <h1>Welcome {name}</h1>
        <p>You have reserved {reservations.length} movies</p>
      </header>
      <section>
        <h2>Your reservations</h2>
        <ul id="reservations">
          {reservations.map((movie) => (
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

  const navigate = useNavigate();

  const tryWatch = async () => {
    try {
      const res = await getReservation(token, movie.id);
      await watchMovie(token, res.id);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <li>
      {movie.title} <button onClick={tryWatch}>Watch</button>
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
