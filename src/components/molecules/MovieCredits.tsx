import type { MovieSuggestion } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

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
  const { t } = useLanguage();
  return (
    <div className="border-t-2 border-border-primary py-3 text-sm">
      <p>
        <span className="font-semibold text-text-secondary">{t.topCast}</span>{" "}
        {cast.map((actor) => `${actor.name} as ${actor.character}`).join(", ")}
      </p>
      <p>
        <span className="font-semibold text-text-secondary">{t.mainDirectors}</span>{" "}
        {directors}
      </p>
      <p>
        <span className="font-semibold text-text-secondary">{t.mainProducers}</span>{" "}
        {producers}
      </p>
      <p>
        <span className="font-semibold text-text-secondary">{t.mainWriters}</span>{" "}
        {writers}
      </p>
      <p>
        <span className="font-semibold text-text-secondary">{t.soundLead}</span>{" "}
        {sound}
      </p>
    </div>
  );
}
