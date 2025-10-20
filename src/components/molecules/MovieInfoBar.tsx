import { useLanguage } from "../../context/LanguageContext";
import type { MovieSuggestion } from "../../types";

function formatRuntime(minutes: number): string {
  if (!minutes) return "Runtime not available";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

type MovieInfoBarProps = Pick<
  MovieSuggestion,
  "rating" | "runtime" | "trailer"
>;

export default function MovieInfoBar({
  rating,
  runtime,
  trailer,
}: MovieInfoBarProps) {
  const { t } = useLanguage();
  return (
    <div className="flex justify-evenly border-y-2 border-border py-4">
      <div className="flex flex-col items-center justify-center">
        <img
          src="./images/icons/rating.svg"
          alt="Rating Icon"
          className="w-9"
        />
        <span className="text-foreground-secondary font-semibold">{t.rating}</span>
        <span>{rating.toFixed(1)}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img
          src="./images/icons/runtime.svg"
          alt="Runtime Icon"
          className="w-9"
        />
        <span className="text-foreground-secondary font-semibold">{t.runtime}</span>
        <span>{formatRuntime(runtime)}</span>
      </div>
      <a
        className="flex flex-col items-center justify-center group"
        href={trailer}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="./images/icons/trailer.svg"
          alt="Trailer Icon"
          className="transition-colors w-9"
        />
        <span className="text-foreground-secondary font-semibold group-hover:text-foreground transition-colors">
          {t.trailer}
        </span>
        <span className=" group-hover:underline transition-colors">
          {t.watch}
        </span>
      </a>
    </div>
  );
}
