import tmdbApi from "./api.js";

export async function searchMovie(movieChoice) {
  const searchParams = {
    query: movieChoice.title,
    year: movieChoice.year,
  };

  const response = await tmdbApi.get("/search/movie", {
    params: searchParams,
  });

  if (response.data.results.length === 0) {
    throw new Error(
      `No movie found for title "${movieChoice.title}" ${movieChoice.year}".`
    );
  }

  const foundMovie = response.data.results[0];

  return {
    id: foundMovie.id,
  };
}
