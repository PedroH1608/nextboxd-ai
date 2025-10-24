import type { MovieSuggestion } from "../../types";
import MovieHeader from "../molecules/MovieSuggestion";
import MovieInfoBar from "../molecules/MovieInfoBar";
import MovieOverview from "../molecules/MovieOverview";
import MovieCredits from "../molecules/MovieCredits";

interface MovieSuggestionCardProps {
  suggestion: MovieSuggestion;
}

export default function MovieSuggestionCard({
  suggestion,
}: MovieSuggestionCardProps) {
  return (
    <article className="m-4 bg-card rounded-xl shadow-lg animate-fade-in overflow-hidden md:flex md:m-8 xl:mx-30 2xl:mx-90">
      <div className="2xl:max-w-90">
        <img
          src={`https://image.tmdb.org/t/p/original${suggestion.image}`}
          alt={`Poster for ${suggestion.title}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6 flex flex-col justify-between 2xl:w-full">
        <MovieHeader
          title={suggestion.title}
          year={suggestion.year}
          tagline={suggestion.tagline}
          genre={suggestion.genre}
          certification={suggestion.certification}
          country={suggestion.country}
        />
        <MovieInfoBar
          rating={suggestion.rating}
          runtime={suggestion.runtime}
          trailer={suggestion.trailer}
        />
        <MovieOverview overview={suggestion.overview} />
        <MovieCredits
          cast={suggestion.cast}
          directors={suggestion.directors}
          producers={suggestion.producers}
          writers={suggestion.writers}
          sound={suggestion.sound}
        />
      </div>
    </article>
  );
}
