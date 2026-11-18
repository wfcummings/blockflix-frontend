import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getMovieById } from "../api/movies";
import { createReservation, getReservations } from "../api/reservations";
import "./MovieDetails.css";
import "../buttons.css";

// Display the movie details page
export default function MovieDetails() {
  // Get the movie ID
  const { id } = useParams();

  // Get the login token
  const { token } = useAuth();

  // Store movie data
  const [movie, setMovie] = useState(null);

  // Store loading errors
  const [error, setError] = useState("");

  // Store the reservation message
  const [reservationMessage, setReservationMessage] = useState("");

  // Track whether the movie was reserved
  const [isReserved, setIsReserved] = useState(false);

  // Load the selected movie
  useEffect(() => {
    if (!token) return;
    async function loadMovie() {
      // Reset the previous movie and error
      setError("");
      setMovie(null);

      // Fetch the selected movie
      const data = await getMovieById(id, token);
      setMovie(data);

      // Chick if this movie is already reserved
      const reservations = await getReservations(token);
      console.log("Reservations:", reservations);
      const alreadyReserved = reservations.some(
        (reservation) => Number(reservation.movie_id) === Number(id),
      );
      setIsReserved(alreadyReserved);

      // Handle missing movie data
      if (!data) {
        setError("Could not load movie.");
      }
    }
    loadMovie();
  }, [id, token]);

  // Handle the reserve button click
  async function handleReserve() {
    //Clear the previous reservation message
    setReservationMessage("");
    try {
      // Reserve the selected movie
      await createReservation(id, token);
      // Mark the movie as reserved
      setIsReserved(true);

      // Show a success message
      setReservationMessage("Movie reserved successfully!");
    } catch (error) {
      //Show the error message
      setReservationMessage(error.message);
    }
  }

  // Ask the user to log in
  if (!token) {
    return (
      <p>
        Please <Link to="/login"> log in </Link> to view movie details.
      </p>
    );
  }
  // Show loading errors
  if (error) {
    return (
      <section>
        <p>{error}</p>
        <Link to="/movies">Back to movies </Link>
      </section>
    );
  }
  // Wait for movie data
  if (!movie) {
    return <p> Loading...</p>;
  }
  //Show movie details
  return (
    <section className="movie-details">
      <h1> {movie.title}</h1>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
      {/** Reserve the selected movie  */}
      <button
        type="button"
        className="button-base"
        onClick={handleReserve}
        disabled={isReserved}
      >
        {isReserved ? "Reserved" : "Reserve"}
      </button>

      {/** Show the reservation message */}
      {reservationMessage && <p>{reservationMessage}</p>}

      {/** Return to the movie list  */}
      <Link to="/movies" className="button-base">
        Back to movies
      </Link>
    </section>
  );
}
