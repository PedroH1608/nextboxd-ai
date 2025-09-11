import { useState } from "react";

export default function LandingPage() {
  const [prompt, setPrompt] = useState("");
  const [movieSuggestion, setMovieSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMovieSuggestion("");
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to get a suggestion. Please try again.");
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
            placeholder="hello world"
          />
          <input type="file" accept=".csv" placeholder="hello" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <p>{error}</p>}
      </section>

      {movieSuggestion && (
        <section>
          <h2>Movie Suggestion</h2>
          <p>{movieSuggestion}</p>
        </section>
      )}

      <article>
        <div>
          <img src="./" alt="Movie Image" />
        </div>
        <div>
          <div>
            <div>
              <h2>Movie Title</h2>
              <span>Year</span>
            </div>
            <div>
              <span>Age</span>
              <span>Genre</span>
              <span>Runtime</span>
            </div>
          </div>
          <div>
            <span>metacritic rating</span>
            <span>Trailer</span>
          </div>
          <div>
            <span>Overview</span>
          </div>
          <div>
            <span>Director</span>
            <span>Writer</span>
          </div>
        </div>
      </article>
      <footer>
        <span>&copy; {new Date().getFullYear()} NextWatch AI</span>
      </footer>
    </main>
  );
}
