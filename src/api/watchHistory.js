const API = import.meta.env.VITE_API;

// Fetch the signed-in user's watch history .

export async function getWatchHistory(token) {

  const response = await fetch(API + "/movies/history", {
    headers : { Authorization: `Bearer ${token}` }
  });

  if (!response) {
    throw new Error("Failed to load history.")
  } 

  return await response.json();

}
