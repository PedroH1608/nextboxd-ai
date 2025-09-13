import "./config.js";

import express from "express";
import cors from "cors";
import multer from "multer";
import errorHandler from "./errorHandler.js";

import { getMovieSuggestionFromLLM } from "./services/openrouter/llmService.js";
import { searchMovie } from "./services/tmdb/search.js";
import {
  getMovieDetails,
  getMovieYear,
  getMovieTrailer,
  getMovieCredits,
} from "./services/tmdb/details.js";

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.post("/api/generate", upload.single("csvFile"), async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const csvFile = req.file;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const movieChoice = await getMovieSuggestionFromLLM(prompt, csvFile);
    const searchResult = await searchMovie(movieChoice);

    const [details, yearInfo, trailerInfo, creditsInfo] = await Promise.all([
      getMovieDetails(searchResult.id),
      getMovieYear(searchResult.id),
      getMovieTrailer(searchResult.id),
      getMovieCredits(searchResult.id),
    ]);

    const suggestion = {
      ...details,
      certification: yearInfo.certification,
      trailer: trailerInfo.trailer,
      directors: creditsInfo.directors.join(", "),
      writers: creditsInfo.writers.join(", "),
      sound: creditsInfo.sound,
    };

    res.json({ suggestion });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
