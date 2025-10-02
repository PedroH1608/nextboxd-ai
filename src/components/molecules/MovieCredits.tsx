import type { MovieSuggestion } from "../../types";

type MovieCreditsProps = Pick<
  MovieSuggestion,
  "cast" | "directors" | "producers" | "writers" | "sound"
>;

export default function MovieCredits({
  cast,
  directors,
  producers,
  writers,
  sound,
}: MovieCreditsProps) {
  return (
    <div className="border-t-2 border-border-primary py-3 text-sm">
      <p>
        <span className="font-semibold text-text-secondary">Top Cast:</span>{" "}
        {cast.map((actor) => `${actor.name} as ${actor.character}`).join(", ")}
      </p>
      <p>
        <span className="font-semibold text-text-secondary">Main Directors:</span>{" "}
        {directors}
      </p>
      <p>
        <span className="font-semibold text-text-secondary">Main Producers:</span>{" "}
        {producers}
      </p>
      <p>
        <span className="font-semibold text-text-secondary">Main Writers:</span>{" "}
        {writers}
      </p>
      <p>
        <span className="font-semibold text-text-secondary">Sound Lead:</span>{" "}
        {sound}
      </p>
    </div>
  );
}
