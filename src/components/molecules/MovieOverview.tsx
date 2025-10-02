interface MovieOverviewProps {
  overview: string;
}

export default function MovieOverview({ overview }: MovieOverviewProps) {
  return (
    <div className="my-5">
      <h3 className="text-sm font-semibold tracking-wider text-text-secondary">
        OVERVIEW
      </h3>
      <p className="text-text-tertiary">{overview}</p>
    </div>
  );
}
