import { getMovieSuggestionFromLLM } from "./openrouterService.js";
import {
  getMoviePoster,
  getMovieDetails,
  getMovieRelease,
  getMovieTrailer,
  getMovieCredits,
  findMovieId,
  getMovieProviders,
} from "./tmdbService.js";

async function getFullMovieDetails(movieId, locale) {
  const [
    posterInfo,
    details,
    releaseInfo,
    trailerInfo,
    creditsInfo,
    providers,
  ] = await Promise.all([
    getMoviePoster(movieId, locale),
    getMovieDetails(movieId, locale),
    getMovieRelease(movieId, locale),
    getMovieTrailer(movieId),
    getMovieCredits(movieId),
    getMovieProviders(movieId, locale),
  ]);

  return {
    ...details,
    image: posterInfo.image,
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
    providers,
  };
}

export async function generateMovieSuggestion(prompt, csvFile, locale) {
  const movieChoice = await getMovieSuggestionFromLLM(prompt, csvFile, locale);
  const foundMovie = await findMovieId(movieChoice);
  const suggestion = await getFullMovieDetails(foundMovie.id, locale);
  return suggestion;
}
