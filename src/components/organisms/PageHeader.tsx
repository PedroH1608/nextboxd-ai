import { TypeAnimation } from "react-type-animation";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSelector from "../molecules/LanguageSelector";

export default function PageHeader() {
  const { t, locale } = useLanguage();

  return (
    <header className="text-center my-8 gap-2 flex flex-col">
      <div className="absolute top-1 right-4 md:top-6 md:right-9">
        <LanguageSelector />
      </div>
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">
        NextWatch AI
      </h1>
      <TypeAnimation
        key={locale}
        sequence={[t.discover, 5000, t.discoverWatchlist, 5000]}
        wrapper="p"
        speed={50}
        repeat={Infinity}
        className="text-foreground-secondary"
      />
    </header>
  );
}
