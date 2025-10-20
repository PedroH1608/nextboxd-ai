import { Analytics } from "@vercel/analytics/react";
import { useMovieSuggestion } from "./hooks/useMovieSuggestion";
import PageHeader from "./components/organisms/PageHeader";
import SearchForm from "./components/molecules/SearchForm";
import MovieSuggestionCard from "./components/organisms/MovieSuggestionCard";
import PageFooter from "./components/organisms/PageFotter";

function App() {
  const { movieSuggestion, isLoading, error, handleSearchSubmit } =
    useMovieSuggestion();

  return (
    <>
      <main className="bg-background min-h-screen flex flex-col">
        <PageHeader />
        <section className="bg-card p-6 rounded-xl shadow-lg m-4 md:mx-8">
          <SearchForm onSubmit={handleSearchSubmit} isLoading={isLoading} />
          {error && <p className="mt-4 text-center text-error">{error}</p>}
        </section>

        {movieSuggestion && (
          <MovieSuggestionCard suggestion={movieSuggestion} />
        )}

        <PageFooter />
      </main>
      <Analytics />
    </>
  );
}

export default App;
