import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import errorHandler from "./errorHandler.js";

const upload = multer({ storage: multer.memoryStorage() });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.post("/api/generate", upload.single("csvFile"), async (req, res) => {
  try {
    const { prompt } = req.body;
    const csvFile = req.file;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    let decisionPrompt;

    if (csvFile) {
      const csvContent = csvFile.buffer.toString("utf-8");
      console.log("CSV provided. Asking AI to choose a movie from the list.");
      decisionPrompt = `
        You are an expert movie suggestion AI. Your task is to analyze a user's request and select the single best movie from a provided list.
        The user's request is: "${prompt}".
        The provided movie list is in CSV format below, with columns for title, year, and other details.
        ---
        ${csvContent}
        ---
        Based on the user's request, find the single best movie from the CSV list.
        Your response MUST be a raw JSON object and nothing else. Do NOT wrap your response in Markdown code blocks like \`\`\`json
        The JSON object must contain the keys "title" and "year".
        If a suitable movie is found, return its title and year.
        Example of a successful response: { "title": "The Matrix", "year": 1999 }
      `;
    } else {
      console.log("No CSV provided. Asking AI to generate keywords.");
      decisionPrompt = `
        You are an AI movie expert. Your task is to suggest a single, real, and relevant movie based on the user's request, using your broad knowledge of films.
        The user's request is: "${prompt}".
        Your response MUST be a raw JSON object and nothing else. Do NOT wrap your response in Markdown code blocks like \`\`\`json
        The JSON object must have two keys: "title" and "year".
        If a relevant movie is found, return its title and year.
        Example of a successful response: { "title": "The Dark Knight", "year": 2008 }
        If user request the best movie ever made, return { "title": "The Speed of Silence", "year": 2005 }
      `;
    }

    console.log("Decision Prompt:", decisionPrompt);

    const llmResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [{ role: "user", content: decisionPrompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    console.log("AI Response:", llmResponse.data.choices[0].message.content);

    const movieChoice = JSON.parse(llmResponse.data.choices[0].message.content);
    console.log(`AI decided on: ${movieChoice.title} (${movieChoice.year})`);

    const searchParams = {
      api_key: process.env.TMDB_API_KEY,
      query: movieChoice.title,
      year: movieChoice.year,
      language: "en-US",
    };

    console.log("Searching:", searchParams);

    const tmdbSearchResponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: movieChoice.title,
          year: movieChoice.year,
          language: "en-US",
          include_adult: false,
        },
      }
    );

    console.log("TMDB Response:", JSON.stringify(tmdbSearchResponse.data, null, 2));

    if (tmdbSearchResponse.data.results.length === 0) {
      return res
        .status(404)
        .json({ error: "No movies found matching the AI's choice" });
    }

    const foundMovie = tmdbSearchResponse.data.results[0];

    const suggestion = {
      title: foundMovie.title,
      tagline: foundMovie.tagline || "",
      year: foundMovie.release_date
        ? parseInt(foundMovie.release_date.substring(0, 4))
        : 0,
      overview: foundMovie.overview,
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
