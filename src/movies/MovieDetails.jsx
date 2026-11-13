// Read route parameters 
import { useParams , Link} from "react-router";
// Import React hooks 
import { useState, useEffect } from "react";
 // Import authentication 
 import { useAuth } from "../auth/AuthContext";
 // Import  the movie request 
 import { getMovieById } from "../api/movies";
 // Import the reservation request
 import { createReservation } from "../api/reservations";
 // Import movie details styles 
 import "./MovieDetails.css";

// Display the movie details page
export default function MovieDetails() {

    // Get the movie ID 
 const { id } = useParams();

 // Get the login token 
 const { token }= useAuth();

 // Store movie data 
 const [movie , setMovie] = useState(null) ;

 // Store loading errors 
 const [ error, setError] = useState("");

 // Store the reservation message 
 const [reservationMessage, setReservationMessage] = useState("");

// Load the selected movie 
useEffect( () => {
    if(! token ) return; 
    async function loadMovie(){
       
        // Reset the previous movie and error 
        setError("");
        setMovie(null);

        // Fetch the selected movie 
         const data = await getMovieById(id, token);
        setMovie(data);

        // Handle missing movie data 
        if (!data) {
            setError("Could not load movie.");
        }
    }
    loadMovie();
}, [id, token]);

// Handle the reserve button click 
    async function  handleReserve(){
        //Clear the previous reservation message 
        setReservationMessage("");
        try{
            // Reserve the selected movie 
            await createReservation(id, token);
            // Show a success message 
            setReservationMessage("Movie reserved successfully!");
        } catch (error) {
             //Show the error message  
             setReservationMessage(error.message);   
        }
    }

// Ask the user to log in 
if(!token){
    return (
        <p> 
            Please  <Link to = "/login"> log in </Link> to view movie details. 
        </p>
    );
}
// Show loading errors 
if(error){
    return (
        <section>
            <p>{error}</p>
            <Link to = "/movies">Back to movies </Link>
        </section>
    );
}
 // Wait for movie data 
 if(!movie){
    return <p> Loading...</p>;

 }
 //Show movie details
  return (
  <section  className="movie-details">
    <h1> {movie.title}</h1>
    <p>Year: {movie.year}</p>
    <p>Rating: {movie.rating}</p>
     {/** Reserve the selected movie  */}
     <button type= "button" onClick={handleReserve}>Reserve</button>

     {/** Show the reservation message */}
     {reservationMessage && <p>{reservationMessage}</p>}

    {/** Return to the movie list  */}
    <Link to = "/movies"> Back to movies</Link>
  </section>
  );
  
}