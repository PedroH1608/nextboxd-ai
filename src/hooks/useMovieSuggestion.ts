import { useState, useEffect } from "react";
import type { MovieSuggestion } from "../types";
import { useLanguage } from "../context/LanguageContext";

export function useMovieSuggestion() {
  const [movieSuggestion, setMovieSuggestion] =
    useState<MovieSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLanguage();

  useEffect(() => {
    setMovieSuggestion(null);
    setError(null);
  }, [locale]);

  const handleSearchSubmit = async (prompt: string, csvFile: File | null) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("locale", locale);
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
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { movieSuggestion, isLoading, error, handleSearchSubmit };
}
