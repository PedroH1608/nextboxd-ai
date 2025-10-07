import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Button from "../atoms/Button";

interface SearchFormProps {
  onSubmit: (prompt: string, file: File | null) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [prompt, setPrompt] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isTooltipPinned, setIsTooltipPinned] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt, csvFile);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = (e: MediaQueryListEvent) =>
      setIsLargeScreen(e.matches);

    setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsTooltipPinned(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef, triggerRef]);

  const isTooltipVisible = isTooltipPinned || (isHovering && isLargeScreen);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="w-full p-3 bg-input-background rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition-colors"
      />
      <div className="flex items-center justify-between gap-5">
        <label
          htmlFor="csv-upload"
          className="cursor-pointer p-3 bg-input-background rounded-lg hover:bg-light-input-background transition-colors w-full text-center"
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
        <div className="relative">
          <div
            ref={triggerRef}
            onClick={() => setIsTooltipPinned(!isTooltipPinned)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-8 h-8 flex items-center justify-center bg-input-background rounded-full text-sm font-bold cursor-help"
          >
            ?
          </div>
          <div
            ref={tooltipRef}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max max-w-xs p-3 bg-light-input-background text-xs rounded-lg shadow-lg transition-opacity ${
              isTooltipVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p>{t.tooltipWatchlistInfo}</p>
            <p>{t.tooltipLetterboxdInfo}</p>
          </div>
        </div>
      </div>
      <Button type="submit" isLoading={isLoading}>
        {t.searchButton}
      </Button>
    </form>
  );
}
