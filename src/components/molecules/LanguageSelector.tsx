import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: "en-US" | "pt-BR") => {
    setLocale(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-input rounded-2xl hover:bg-input-hover transition-colors flex items-center gap-1"
      >
        <img
          src={
            locale === "en-US" ? "/images/icons/us.png" : "/images/icons/br.png"
          }
          alt={locale === "en-US" ? "US Flag" : "Brazil Flag"}
          className="w-6"
        />
        <img
          src="/images/icons/arrow-down.svg"
          alt="Dropdown arrow"
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "-rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-15 bg-card rounded-2xl shadow-lg z-10 border border-border">
          <button
            onClick={() => handleLanguageChange("en-US")}
            className="block w-full text-left px-4 py-2 hover:bg-input-hover rounded-t-lg"
          >
            <img src="/images/icons/us.png" alt="US Flag" />
          </button>
          <button
            onClick={() => handleLanguageChange("pt-BR")}
            className="block w-full text-left px-4 py-2 hover:bg-input-hover rounded-b-lg"
          >
            <img src="/images/icons/br.png" alt="Brazil Flag" />
          </button>
        </div>
      )}
    </div>
  );
}
