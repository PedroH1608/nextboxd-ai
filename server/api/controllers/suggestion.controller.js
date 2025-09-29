import { generateMovieSuggestion } from "../../services/suggestionService.js";

export const generateSuggestion = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const csvFile = req.file;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const suggestion = await generateMovieSuggestion(prompt, csvFile);

    res.json({ suggestion });
  } catch (error) {
    next(error);
  }
};
