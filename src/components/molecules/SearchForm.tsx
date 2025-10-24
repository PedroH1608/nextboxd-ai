import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Tooltip from "../atoms/Tooltip";
import Button from "../atoms/Button";

interface SearchFormProps {
  onSubmit: (prompt: string, file: File | null) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [prompt, setPrompt] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt, csvFile);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="w-full p-3 bg-input rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition-colors"
      />
      <div className="flex flex-col md:flex-row w-full justify-evenly gap-4">
        <div className="flex items-center justify-between gap-5 w-full">
          <label
            htmlFor="csv-upload"
            className="cursor-pointer p-3 bg-input rounded-lg hover:bg-input-hover transition-colors w-full text-center"
          >
            {csvFile ? t.watchlistUploaded : t.uploadWatchlist}
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
          <Tooltip
            trigger={
              <div className="w-8 h-8 flex items-center justify-center bg-input rounded-full text-sm font-bold cursor-help">
                ?
              </div>
            }
            desktopContent={
              <>
                <p>{t.tooltipWatchlistInfo}</p>
                <p className="mt-2">{t.tooltipLetterboxdInfo}</p>
              </>
            }
            mobileContent={
              <>
                <p>{t.tooltipWatchlistInfo}</p>
                <p className="mt-2">{t.tooltipLetterboxdInfoMobile}</p>
              </>
            }
          />
        </div>
        <Button type="submit" isLoading={isLoading}>
          {t.searchButton}
        </Button>
      </div>
    </form>
  );
}
