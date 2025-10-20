import type { MovieSuggestion } from "../../types";

type MovieHeaderProps = Pick<
  MovieSuggestion,
  "title" | "year" | "tagline" | "genre" | "certification" | "country"
>;

export default function MovieHeader({
  title,
  year,
  tagline,
  genre,
  certification,
}: MovieHeaderProps) {
  return (
    <div className="pb-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold">{title}</h2>
          {year && (
            <span className="text-2xl font-light text-foreground-secondary">
              ({year})
            </span>
          )}
        </div>
        {certification && (
          <img
            src={`/images/certifications/${certification}.svg`}
            alt={`${certification}`}
            className="object-contain max-h-9"
          />
        )}
      </div>
      <p className="text-lg text-foreground-secondary italic">{tagline}</p>
      <p className="mt-2 text-sm text-accent-light font-semibold">{genre}</p>
    </div>
  );
}
