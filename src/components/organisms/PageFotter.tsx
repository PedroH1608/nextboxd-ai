export default function PageFooter() {
  return (
    <footer>
      <p>
        This service uses TMDB and the TMDB APIs but is not endorsed, certified,
        or otherwise approved by TMDB.
      </p>
      <span>&copy; {new Date().getFullYear()} NextWatch AI</span>
    </footer>
  );
}
