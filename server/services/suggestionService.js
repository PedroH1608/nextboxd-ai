import { getMovieSuggestionFromLLM } from "./openrouterService.js";
import {
  getMovieDetails,
  getMovieRelease,
  getMovieTrailer,
  getMovieCredits,
  findMovieId,
} from "./tmdbService.js";

async function getFullMovieDetails(movieId) {
  const [details, releaseInfo, trailerInfo, creditsInfo] = await Promise.all([
    getMovieDetails(movieId),
    getMovieRelease(movieId),
    getMovieTrailer(movieId),
    getMovieCredits(movieId),
  ]);

  return {
    ...details,
    year: releaseInfo.release_date
      ? new Date(releaseInfo.release_date).getFullYear().toString()
      : null,
    certification: releaseInfo.certification,
    trailer: trailerInfo.trailer,
    cast: creditsInfo.cast,
    directors: creditsInfo.directors.join(", "),
    producers: creditsInfo.producers.join(", "),
    writers: creditsInfo.writers.join(", "),
    sound: creditsInfo.sound,
  };
}

export async function generateMovieSuggestion(prompt, csvFile) {
  const movieChoice = await getMovieSuggestionFromLLM(prompt, csvFile);
  const foundMovie = await findMovieId(movieChoice);
  const suggestion = await getFullMovieDetails(foundMovie.id);
  return suggestion;
}
