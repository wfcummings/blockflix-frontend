const API = import.meta.env.VITE_API;

/** Fetches an account for logged in user from the API. */
export async function getAccount(token) {
  if (!token) throw Error("You are not logged in.");

  try {
    const response = await fetch(API + "/users/me", {
      headers: { Authorization: "Bearer " + token },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/** Fetches an array of movies for logged in user from the API. */
export async function getMovies(token) {
  if (!token) {
    throw Error("You must be signed.");
  }

  try {
    const response = await fetch(API + "/movies", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//  Fetch one movie by ID
export async function getMovieById(id, token) {
  try {
    const response = await fetch(API + "/movies/" + id, {
      // Send the token
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw Error("Could not load movie.");
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Gets a list of all the users reservations
export async function getReservations(token) {
  try {
    const response = await fetch (API + "/reservations", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if(!response.ok) throw Error ("Reservations not found.");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Get a specific reservation based off the user and movie 
export async function getReservation(token, movieId) {
  try {
    const response = await fetch (API + `/reservations/${movieId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if(!response.ok) throw Error ("Reservation not found.");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Send a post request to add a specific movie to the watch history table
export async function watchMovie(token, id) {
  const response = await fetch(API + "/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      Authorization: "Bearer " + token 
    },
    body: JSON.stringify({ reservation_id: id }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
