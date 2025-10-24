import LanguageSelector from "../molecules/LanguageSelector";

export default function PageHeader() {
  return (
    <header className="flex flex-col items-center my-6 gap-1">
      <div className="absolute top-1 right-4 md:top-6 md:right-9">
        <LanguageSelector />
      </div>
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary tracking-wider">
        NextBoxd
      </h1>
      <p className="text-foreground-secondary">Your AI-Powered film curator</p>
    </header>
  );
}
