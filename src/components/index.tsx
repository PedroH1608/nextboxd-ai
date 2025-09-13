import { useState } from "react";

function formatRuntime(minutes: number): string {
  if (!minutes) return "Runtime not available";
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

interface MovieSuggestion {
  image: string;
  title: string;
  tagline: string;
  year: string;
  certification: string;
  genre: string;
  runtime: number;
  rating: number;
  trailer: string;
  overview: string;
  directors: string;
  writers: string;
  sound: string;
}

export default function LandingPage() {
  const [prompt, setPrompt] = useState("");
  const [movieSuggestion, setMovieSuggestion] =
    useState<MovieSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMovieSuggestion(null);
    setError(null);

    const formData = new FormData();
    formData.append("prompt", prompt);
    if (csvFile) {
      formData.append("csvFile", csvFile);
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get a suggestion.");
      }

      const data = await response.json();
      setMovieSuggestion(data.suggestion);
    } catch (error: any) {
      console.error("Error fetching movie suggestion:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <header>
        <h1>NextWatch AI</h1>
        <p>
          Find the next movie should watch. Upload CSV file or search in the
          movie database
        </p>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A sci-fi movie about dreams..."
          />
          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setCsvFile(e.target.files ? e.target.files[0] : null)
            }
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <p>{error}</p>}
      </section>

      {movieSuggestion && (
        <article>
          <div>
            <img src={`https://image.tmdb.org/t/p/w500${movieSuggestion.image}`} alt={`Poster for ${movieSuggestion.title}`} />
          </div>
          <div>
            <div>
              <div>
                <h2>{movieSuggestion.title}</h2>
                <p>{movieSuggestion.tagline}</p>
                <span>{movieSuggestion.year}</span>
              </div>
              <div>
                <span>{movieSuggestion.certification}</span>
                <p>{movieSuggestion.genre}</p>
                <span>{formatRuntime(movieSuggestion.runtime)}</span>
              </div>
            </div>
            <div>
              <span>{movieSuggestion.rating}</span>
              <span>{movieSuggestion.trailer}</span>
            </div>
            <div>
              <span>{movieSuggestion.overview}</span>
            </div>
            <div>
              <span>{movieSuggestion.directors}</span>
              <span>{movieSuggestion.writers}</span>
              <span>{movieSuggestion.sound}</span>
            </div>
          </div>
        </article>
      )}
      <footer>
        <span>&copy; {new Date().getFullYear()} NextWatch AI</span>
      </footer>
    </main>
  );
}
