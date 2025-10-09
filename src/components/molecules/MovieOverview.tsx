import { useLanguage } from "../../context/LanguageContext";
import type { MovieSuggestion } from "../../types";

type MovieOverviewProps = Pick<MovieSuggestion, "overview">;

export default function MovieOverview({ overview }: MovieOverviewProps) {
  const { t } = useLanguage();
  return (
    <div className="my-5">
      <h3 className="text-sm font-semibold tracking-wider text-text-secondary">
        {t.overview}
      </h3>
      <p className="text-text-tertiary">{overview}</p>
    </div>
  );
}
