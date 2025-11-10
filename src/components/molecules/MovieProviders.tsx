import { useLanguage } from "../../context/LanguageContext";
import type { MovieSuggestion } from "../../types";
import ProviderList from "../atoms/ProviderList";

type MovieProvidersProps = {
  providers: MovieSuggestion["providers"];
};

export default function MovieProviders({ providers }: MovieProvidersProps) {
  const { t } = useLanguage();
  const { streaming, link } = providers;

  const hasProviders = streaming?.length > 0;

  if (!hasProviders) {
    return null;
  }

  return (
    <div className="border-t-2 border-border py-4 text-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold tracking-wider text-foreground-secondary">
          {t.whereToWatch}
        </h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent-light hover:underline"
          >
            {t.viewOnTmdb}
          </a>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <ProviderList title={t.stream} providers={streaming} />
      </div>
      <p className="text-xs text-muted mt-3">Powered by JustWatch</p>
    </div>
  );
}
