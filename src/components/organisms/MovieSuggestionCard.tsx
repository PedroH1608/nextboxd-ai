import type { MovieSuggestion } from "../../types";

function formatRuntime(minutes: number): string {
  if (!minutes) return "Runtime not available";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

interface MovieSuggestionCardProps {
  suggestion: MovieSuggestion;
}

export default function MovieSuggestionCard({
  suggestion,
}: MovieSuggestionCardProps) {
  return (
    <article>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${suggestion.image}`}
          alt={`Poster for ${suggestion.title}`}
        />
      </div>
      <div>
        <div>
          <div>
            <h2>TITLE {suggestion.title}</h2>
            <p>TAGLINE {suggestion.tagline}</p>
            <span>YEAR {suggestion.year}</span>
          </div>
          <div>
            <span>CERTIFICATION {suggestion.certification}</span>
            <p>GENRES {suggestion.genre}</p>
            <span>RUNTIME {formatRuntime(suggestion.runtime)}</span>
          </div>
        </div>
        <div>
          <span>RATING {suggestion.rating}</span>
          <span>TRAILER {suggestion.trailer}</span>
        </div>
        <div>
          <span>OVERVIEW {suggestion.overview}</span>
        </div>
        <div>
          <span>DIRECTORS {suggestion.directors}</span>
          <span>WRITERS {suggestion.writers}</span>
          <span>SOUND {suggestion.sound}</span>
        </div>
      </div>
    </article>
  );
}