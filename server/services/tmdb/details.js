import tmdbApi from "./api.js";

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

export async function getMovieYear(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}/release_dates`);
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

  const topCast = cast.slice(0, 5).map((member) => ({
    name: member.name,
    character: member.character,
  }));

  const directors = crew
    .filter((member) => member.department === "Directing")
    .map((member) => member.name);
  const producers = crew
    .filter((member) => member.department === "Production")
    .map((member) => member.name);
  const writers = crew
    .filter((member) => member.department === "Writing")
    .map((member) => member.name);

  const soundLead = crew.find((member) => member.department === "Sound");

  return {
    cast: topCast,
    directors,
    producers,
    writers,
    sound: soundLead ? soundLead.name : null,
  };
}
