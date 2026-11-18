import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getMovieById } from "../api/movies";
import { createReservation,  getReservationsForMovie } from "../api/reservations";
import "./MovieDetails.css";
import "../buttons.css";


export default function MovieDetails() {
  
  const { id } = useParams();
  const { token } = useAuth();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [reservationMessage, setReservationMessage] = useState("");
  const [isReserved, setIsReserved] = useState(false);


  // Load the selected movie
  useEffect(() => {
    if (!token) return;

    async function loadMovie() {
      setError("");
      setMovie(null);

      try{
        const data = await getMovieById(id, token);
        if (!data) {
          setError("Could not load movie.");
          return;
        }
        const reservation = await getReservationsForMovie(id, token);
        setIsReserved(reservation !== null);
        setMovie(data);
        
      } catch(error) {
        setError(error.message);
      }
    }
    loadMovie();
  }, [id, token]);
  async function handleReserve() {
  
    setReservationMessage("");
    try {
     
      await createReservation(id, token);
      setIsReserved(true);
      setReservationMessage("Movie reserved successfully!");
    } catch (error) {
      setReservationMessage(error.message);
    }
  }
  if (!token) {
    return (
      <p>
        Please <Link to="/login"> log in </Link> to view movie details.
      </p>
    );
  }
  if (error) {
    return (
      <section>
        <p>{error}</p>
        <Link to="/movies">Back to movies </Link>
      </section>
    );
  }
  if (!movie) {
    return <p> Loading...</p>;
  }

  return (
    <section className="movie-details">
      <h1> {movie.title}</h1>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
      <button
        type="button"
        className="button-base"
        onClick={handleReserve}
        disabled={isReserved}
      >
        {isReserved ? "Reserved" : "Reserve"}
      </button>
      {reservationMessage && <p>{reservationMessage}</p>}
      <Link to="/movies" className="button-base">
        Back to movies
      </Link>
    </section>
  );
}
