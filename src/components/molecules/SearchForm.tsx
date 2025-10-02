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
        placeholder="A sci-fi movie in a galaxy far, far away..."
        className="w-full p-3 bg-input-background rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition-colors"
      />
      <div className="flex items-center justify-between mt-4">
        <label
          htmlFor="csv-upload"
          className="cursor-pointer p-3 bg-input-background rounded-lg hover:bg-light-input-background transition-colors w-2/3 text-center"
        >
          {csvFile ? "CSV file uploaded" : "Upload a CSV file (optional)"}
        </label>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={(e) =>
            setCsvFile(e.target.files ? e.target.files[0] : null)
          }
          className="hidden"
        />
        <div className="relative group">
          <div className="w-8 h-8 flex items-center justify-center bg-input-background rounded-full text-sm font-bold cursor-help">
            ?
          </div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max max-w-xs p-3 bg-light-input-background text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p>
              A CSV file is a plain text file that stores tabular data, such as
              a spreadsheet or database information.
            </p>
            <p>
              You can export your movie list as a CSV file from sites like IMDb
              or Letterboxd.
            </p>
            <p>
              To upload your Letterboxd CSV file on mobile devices, you must
              first export it from your account. To do this, go to "Settings" -
              "Advanced" - "Export Your Data" and then upload the watchlist.csv
              file.
            </p>
          </div>
        </div>
        <Button type="submit" isLoading={isLoading}>
          Search
        </Button>
      </div>
    </form>
  );
}
