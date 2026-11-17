const API = import.meta.env.VITE_API;

// Fetch the signed-in user's watch history .

export async function getWatchHistory(token) {
    const response = await fetch(`${API}/history`, {
        headers: {Authorization : `Bearer ${token}`},
    });
    if (!response.ok) {
        throw new Error ("Could not load watch history .")
    }
  return response.json();
}
