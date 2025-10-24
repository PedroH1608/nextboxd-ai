import { TypeAnimation } from "react-type-animation";
import { useLanguage } from "../../context/LanguageContext";

export default function AnimatedTagline() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex justify-center mb-5">
      <TypeAnimation
        key={locale}
        sequence={[t.discover, 5000, t.discoverWatchlist, 5000]}
        wrapper="p"
        speed={50}
        repeat={Infinity}
        className="text-foreground-secondary italic"
      />
    </div>
  );
}
