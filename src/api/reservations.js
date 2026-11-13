// Get the backend URL 
const API = import.meta.env.VITE_API;

// Create a reservation 
export async function createReservation(movieId, token){

// Send  a request to reserve the movie
const response = await fetch(`${API}/reservations`, {
    method :"POST",
    headers : { 
        "Content-type": "application/json",
        Authorization : `Bearer ${token}`,
    },
    body : JSON.stringify( { movieId }),
});

// Check if the reservation failed 
if (!response.ok) {
    throw new Error(`Failed to reserve the movie. : ${response.status}`);
}
// Return the new reservation 
return await response.json();

}