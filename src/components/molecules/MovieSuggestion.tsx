interface MovieHeaderProps {
  title: string;
  year: string;
  tagline: string;
  genre: string;
  certification: string;
}

export default function MovieHeader({
  title,
  year,
  tagline,
  genre,
  certification,
}: MovieHeaderProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold mr-2">{title}</h2>
          <span className="text-2xl font-light text-text-secondary">
            ({year})
          </span>
        </div>
        <img
          src={`/images/us-certifications/${certification}.svg`}
          alt={`${certification}`}
          className="w-1/6 object-contain"
        />
      </div>
      <p className="text-lg text-text-secondary italic">{tagline}</p>
      <p className="mt-2 text-sm text-accent-light font-semibold">{genre}</p>
    </div>
  );
}
