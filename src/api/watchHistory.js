const API = import.meta.env.VITE_API;

// Fetch the signed-in user's watch history .

export async function getWatchHistory(token) {
  const headers = { Authorization: `Bearer ${token}` };

  const response = await fetch(`${API}/movies/reservations`, { headers });

  if (!response.ok) {
    throw new Error("Could not load watch history.");
  }

  const movies = await response.json();

  const watchedMovies = await Promise.all(
    movies.map(async (movie) => {
      const reservationResponse = await fetch(
        `${API}/reservations/${movie.id}`,
        { headers },
      );

      if (!reservationResponse.ok) {
        throw new Error("Could not check the movie's watch status.");
      }

      const body = await reservationResponse.text();
      const reservation = body.trim() ? JSON.parse(body) : null;

      return reservation?.is_watched === true ? movie : null;
    }),
  );

  return watchedMovies.filter((movie) => movie !== null);
}
