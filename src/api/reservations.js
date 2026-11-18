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
    throw new Error(`Failed to reserve the movie.(HTTP ${response.status}.`);
  }
  // Return the new reservation
  return await response.json();
}

// Get the user's reservations
export async function getReservations(token) {
  const response = await fetch(`${API}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to load reservations");
  }
  return await response.json();
}

// Return the user's active reservation for this movie,  or null.
export async function getReservationsForMovie(movieId, token) {
  const response = await fetch(`${API}/reservations/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Could not check the reservation.");
  }
  const body = await response.text();
  return body.trim() ? JSON.parse(body) : null;
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
