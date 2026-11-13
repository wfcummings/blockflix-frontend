// Read route parameters 
import { useParams , Link} from "react-router";
// Import React hooks 
import { useState, useEffect } from "react";
 // Import authentication 
 import { useAuth } from "../auth/AuthContext";
 // Import  the movie request 
 import { getMovieById } from "../api/movies";

// Display the movie details page
export default function MovieDetails() {

    // Get the movie ID 
 const { id } = useParams();

 // Get the login token 
 const { token }= useAuth();

 // Store movie data 
 const [movie , setMovie] = useState(null) ;

 // store loading errors 
 const [ error, setError] = useState("")

// load the selected movie 
useEffect( () => {
    if(! token ) return; 
    async function loadMovie(){
        const data = await getMovieById(id, token);
        setMovie(data);

        // Handle missing movie data 
        if (!data) {
            setError("Could not load movie.")
        }
    }
    loadMovie()
}, [id, token]);


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
    return <p> Loading...</p>

 }
 //Shoe movie details
  return (
  <section >
    <h1> {movie.title}</h1>
    <p>Year: {movie.year}</p>
    <p>Rating: {movie.rating}</p>
    {/** Return to the movie list  */}
    <Link to = "/movies"> Back to movies</Link>
  </section>
  );
  
}