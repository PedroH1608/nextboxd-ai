import Icon from "../atoms/Icon";

function formatRuntime(minutes: number): string {
  if (!minutes) return "Runtime not available";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

interface MovieInfoBarProps {
  rating: number;
  runtime: number;
  trailer: string;
}

export default function MovieInfoBar({
  rating,
  runtime,
  trailer,
}: MovieInfoBarProps) {
  return (
    <div className="flex justify-evenly border-y-2 border-border-primary my-4 py-4">
      <div className="flex flex-col items-center justify-center">
        <Icon name="rating" />
        <span className="text-text-secondary font-semibold">RATING</span>
        <span>{rating.toFixed(1)}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Icon name="runtime" />
        <span className="text-text-secondary font-semibold">RUNTIME</span>
        <span>{formatRuntime(runtime)}</span>
      </div>
      <a
        className="flex flex-col items-center justify-center group"
        href={`https://www.youtube.com/watch?v=${trailer}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon
          name="trailer"
          className="group-hover:bg-accent-light transition-colors"
        />
        <span className="text-text-secondary font-semibold group-hover:text-text-primary transition-colors">
          TRAILER
        </span>
        <span className=" group-hover:underline transition-colors">Watch</span>
      </a>
    </div>
  );
}