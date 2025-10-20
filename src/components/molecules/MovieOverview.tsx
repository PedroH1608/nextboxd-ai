import { useLanguage } from "../../context/LanguageContext";
import type { MovieSuggestion } from "../../types";

type MovieOverviewProps = Pick<MovieSuggestion, "overview">;

export default function MovieOverview({ overview }: MovieOverviewProps) {
  const { t } = useLanguage();
  return (
    <div className="py-4">
      <h3 className="text-sm font-semibold tracking-wider text-foreground-secondary">
        {t.overview}
      </h3>
      <p className="text-foreground-tertiary">{overview}</p>
    </div>
  );
}
