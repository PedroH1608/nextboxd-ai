import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
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

export async function getMoviePoster(movieId, locale) {
  const language = locale || "en-US";
  const response = await tmdbApi.get(
    `/movie/${movieId}/images?language=${language}`
  );
  const posters = response.data.posters;

  if (posters && posters.length > 0) {
    posters.sort((a, b) => b.vote_average - a.vote_average);
    return { image: posters[0].file_path };
  }

  if (language !== "en-US") {
    const fallbackResponse = await tmdbApi.get(
      `/movie/${movieId}/images?language=en-US`
    );
    const fallbackPosters = fallbackResponse.data.posters;
    if (fallbackPosters && fallbackPosters.length > 0) {
      fallbackPosters.sort((a, b) => b.vote_average - a.vote_average);
      return { image: fallbackPosters[0].file_path };
    }
  }

  return { image: null };
}

export async function getMovieDetails(movieId, locale) {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: { language: locale || "en-US" },
  });
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

export async function getMovieRelease(movieId, locale) {
  const countryCode = locale ? locale.split("-")[1] : "US";

  const response = await tmdbApi.get(`/movie/${movieId}/release_dates`);
  const results = response.data.results;

  let countryReleaseInfo = results.find((r) => r.iso_3166_1 === countryCode);

  if (!countryReleaseInfo && countryCode !== "US") {
    countryReleaseInfo = results.find((r) => r.iso_3166_1 === "US");
  }

  if (!countryReleaseInfo) {
    return { certification: null, release_date: null, country: null };
  }

  const release =
    countryReleaseInfo.release_dates.find(
      (rd) => rd.type === 3 && rd.certification
    ) || countryReleaseInfo.release_dates.find((rd) => rd.certification);

  if (!release) {
    const firstReleaseDate = countryReleaseInfo.release_dates[0]?.release_date;
    return {
      certification: null,
      release_date: firstReleaseDate || null,
      country: countryReleaseInfo.iso_3166_1,
    };
  }

  return {
    certification: release.certification,
    release_date:
      countryReleaseInfo.release_dates.find((rd) => rd.type === 3)
        ?.release_date || release.release_date,
    country: countryReleaseInfo.iso_3166_1,
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

export async function getMovieCredits(movieId, locale) {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`, {
    params: { language: locale || "en-US" },
  });
  const cast = response.data.cast;
  const crew = response.data.crew;

  const topCast = cast.slice(0, 3).map((member) => ({
    name: member.name,
    character: member.character || "Self",
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

export async function getMovieProviders(movieId, locale) {
  const countryCode = locale === "en-US" ? "US" : "BR";

  const response = await tmdbApi.get(`/movie/${movieId}/watch/providers`);
  const results = response.data.results;
  const countryProviders = results[countryCode];

  if (!countryProviders) {
    return { streaming: [], link: null };
  }

  const mapProviders = (providers) =>
    providers
      ? providers.map((p) => ({
          logo_path: p.logo_path,
          provider_name: p.provider_name,
        }))
      : [];

  return {
    streaming: mapProviders(countryProviders.flatrate),
    link: countryProviders.link,
  };
}
