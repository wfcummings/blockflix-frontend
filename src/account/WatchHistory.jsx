import {useState,  useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getWatchHistory } from "../api/watchHistory";


// This gage displays the movies the user marked as watched. 
export default function WatchHistory (){
    const { token } = useAuth()

    // Store the movies returned by the watch history
    const [watchedMovees, setWatchedMovies] = useState(null);

    useEffect (()=> {
        async function loadHistory() {
            try {
                const movies = await getWatchHistory(token);
                setWatchedMovies(movies);
                } catch (error) {
                    console.error(error);
                }
            }
            if(token) {
                loadHistory();
            }
        }, [token]);
    
    return (
    <section>
        <h1>Watch History</h1>
        {watchedMovees?.length === 0 && <p> No watched movies yet. </p>}
        <ul>
            {watchedMovees?.map( (movie, index)=>{
                <li key={index}>{movie.title}</li>
            })}
        </ul>
        </section>
    );
}