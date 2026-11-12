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
