import { useState, useRef, useEffect } from "react";
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
