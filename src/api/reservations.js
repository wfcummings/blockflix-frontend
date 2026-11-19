// Get the backend URL
const API = import.meta.env.VITE_API;

// Create a reservation
export async function createReservation(movieId, token) {
  // Send  a request to reserve the movie
  const response = await fetch(`${API}/reservations`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movieId }),
  });

  // Check if the reservation failed
  if (!response.ok) {
    throw new Error(`Failed to reserve the movie. : ${response.status}`);
  }
  // Return the new reservation
  return await response.json();
}

// Get the user's reservations
export async function getReservations(token) {
  const response = await fetch(`${API}/movies/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Faled to load reservation");
  }
  return await response.json();
}

/** Sends a request to delete a reservation for a movie with the id*/
export async function deleteReservation(token, id) {
  if (!token) {
    throw Error("You must be signed in to return a movie.");
  }

  const response = await fetch(API + "/reservations/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
