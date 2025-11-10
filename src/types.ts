export interface MovieSuggestion {
  image: string;
  title: string;
  tagline: string;
  year: string;
  certification: string;
  country: string | null;
  genre: string;
  runtime: number;
  rating: number;
  trailer: string;
  overview: string;
  cast: { name: string; character: string }[];
  directors: string;
  producers: string;
  writers: string;
  sound: string;
  providers: {
    streaming: { logo_path: string; provider_name: string }[];
    link: string | null;
  };
}
