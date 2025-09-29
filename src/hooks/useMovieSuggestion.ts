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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get a suggestion.");
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