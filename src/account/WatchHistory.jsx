import {useState,  useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getWatchHistory } from "../api/watchHistory";


// This gage displays the movies the user marked as watched. 
export default function WatchHistory (){
    const { token } = useAuth()

    // Store the movies returned by the watch history

    useEffect (()=> {
        async function loadHistory() {
            try {
                const movies = await getWatchHistory(token);
                console.log("Watch history:", movies);
                } catch (error) {
                    console.error(error);
                }
            }
            if(token) {
                loadHistory();
            }
        }, [token]);
    
    return <h1>Watch History</h1>
}