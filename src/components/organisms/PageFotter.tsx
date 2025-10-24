export default function PageFooter() {
  return (
    <footer className="items-center mb-6 text-xs text-muted mx-3 flex flex-col gap-3">
      <p>
        This service uses TMDB and the TMDB APIs but is not endorsed, certified,
        or otherwise approved by TMDB.
      </p>
      <div className="flex items-center gap-6">
        <a href="https://github.com/PedroH1608/nextboxd-ai" target="_blank">
          <img
            src="./images/icons/github.svg"
            alt="GitHub Logo"
            className="w-5"
          />
        </a>
        <a href="https://www.themoviedb.org/" target="_blank">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="The Movie Database Logo"
            className="w-20"
          />
        </a>
      </div>
    </footer>
  );
}
