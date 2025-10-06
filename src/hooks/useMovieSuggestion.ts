import { useState } from "react";
import type { MovieSuggestion } from "../types";

export function useMovieSuggestion() {
  const [movieSuggestion, setMovieSuggestion] =
    useState<MovieSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchSubmit = async (prompt: string, csvFile: File | null) => {
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
        let errorMessage = "Failed to get a suggestion.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setMovieSuggestion(data.suggestion);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { movieSuggestion, isLoading, error, handleSearchSubmit };
}
