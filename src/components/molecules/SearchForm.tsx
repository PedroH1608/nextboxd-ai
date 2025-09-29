import { useState } from "react";
import Button from "../atoms/Button";

interface SearchFormProps {
  onSubmit: (prompt: string, file: File | null) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [prompt, setPrompt] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt, csvFile);
  };

  return (
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
        onChange={(e) => setCsvFile(e.target.files ? e.target.files[0] : null)}
      />
      <Button type="submit" isLoading={isLoading}>
        Search
      </Button>
    </form>
  );
}
