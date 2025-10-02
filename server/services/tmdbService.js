import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    include_adult: false,
  },
});

export async function findMovieId(movieChoice) {
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

export async function getMovieDetails(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  const details = response.data;

  return {
    image: details.poster_path,
    title: details.title,
    tagline: details.tagline,
    genre: details.genres.map((genre) => genre.name).join(", "),
    runtime: details.runtime,
    rating: details.vote_average,
    overview: details.overview,
  };
}

export async function getMovieRelease(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}/release_dates`);
  const results = response.data.results;

  const usReleaseInfo = results.find((r) => r.iso_3166_1 === "US");

  if (!usReleaseInfo) {
    return { certification: null, release_date: null };
  }

  const theatricalRelease = usReleaseInfo.release_dates.find(
    (rd) => rd.type === 3
  );

  if (!theatricalRelease) {
    return { certification: null, release_date: null };
  }

  return {
    certification: theatricalRelease.certification,
    release_date: theatricalRelease.release_date,
  };
}

export async function getMovieTrailer(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`);
  const videos = response.data.results;
  const officialTrailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return {
    trailer: officialTrailer
      ? `https://www.youtube.com/watch?v=${officialTrailer.key}`
      : null,
  };
}

export async function getMovieCredits(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  const cast = response.data.cast;
  const crew = response.data.crew;

  const topCast = cast.slice(0, 3).map((member) => ({
    name: member.name,
    character: member.character,
  }));

  const mainDirectors = crew
    .filter((member) => member.department === "Directing")
    .slice(0, 3)
    .map((member) => member.name);
  const mainProducers = crew
    .filter((member) => member.department === "Production")
    .slice(0, 3)
    .map((member) => member.name);
  const mainWriters = crew
    .filter((member) => member.department === "Writing")
    .slice(0, 3)
    .map((member) => member.name);

  const soundLead = crew.find((member) => member.department === "Sound");

  return {
    cast: topCast,
    directors: mainDirectors,
    producers: mainProducers,
    writers: mainWriters,
    sound: soundLead ? soundLead.name : null,
  };
}
