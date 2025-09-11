import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "tngtech/deepseek-r1t-chimera:free",
        messages: [
          {
            role: "user",
            content: `Suggest a movie based on the following prompt: ${prompt}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    const suggestion = response.data.choices[0].message.content;
    res.json({ suggestion });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios/OpenRouter error response:",
        error.response?.data || error.message
      );
      res
        .status(error.response?.status || 500)
        .json({
          error: error.response?.data?.error || "Failed to generate suggestion",
        });
    } else {
      console.error("Error generating suggestion:", error);
      res.status(500).json({ error: "Failed to generate suggestion" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
