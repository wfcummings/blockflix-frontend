import {useState,  useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getWatchHistory } from "../api/watchHistory";
import  "./WatchHistory.css"


// This gage displays the movies the user marked as watched. 
export default function WatchHistory (){
    const { token } = useAuth()

    // Store the movies returned by the watch history
    const [watchedMovees, setWatchedMovies] = useState(null);

    // Store the error message for the page.
    const [error, setError] = useState("");

    // Load the user's watch history when the login token is avaliable.
    useEffect (()=> {
        async function loadHistory() {
            try {
                const movies = await getWatchHistory(token);
                setWatchedMovies(movies);
                } catch (error) {
                    console.error(error);

                    // Set an error message if the request falis.
                    setError("Could not load watch history.")
                }
            }
            if(token) {
                loadHistory();
            }
        }, [token]);
    
    return (
        <div className="watch-history-page">   
    <section className="watch-history">
        <h1 className="watch-history-title">Watch History</h1>

        {/** Show the error message when there is one. */}
        {error && <p>{error}</p>}

        {watchedMovees?.length === 0 && <p> No watched movies yet. </p>}
        <ul className="watch-history-list">
            {watchedMovees?.map((movie)=> (
               <li key={movie.id}>
                {movie.poster && <img src = {movie.poster} alt=""/>}
                <span>{movie.title}</span>
               </li>
            ))}
        </ul>
        </section>
         </div>  
    );
}