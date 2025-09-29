import { useMovieSuggestion } from "./hooks/useMovieSuggestion";
import PageHeader from "./components/organisms/PageHeader";
import SearchForm from "./components/molecules/SearchForm";
import MovieSuggestionCard from "./components/organisms/MovieSuggestionCard";
import PageFooter from "./components/organisms/PageFotter";

function App() {
  const { movieSuggestion, isLoading, error, handleSearchSubmit } =
    useMovieSuggestion();

  return (
    <main>
      <PageHeader />
      <section>
        <SearchForm onSubmit={handleSearchSubmit} isLoading={isLoading} />
        {error && <p>{error}</p>}
      </section>

      {movieSuggestion && <MovieSuggestionCard suggestion={movieSuggestion} />}

      <PageFooter />
    </main>
  );
}

export default App;
