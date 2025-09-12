import axios from "axios";

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err instanceof SyntaxError) {
    console.error("Error parsing AI response:", err);
    return res.status(500).json({
      error: "The AI returned an invalid response. Please try again.",
    });
  }

  if (axios.isAxiosError(err)) {
    const url = err.config.url;
    const responseData = err.response?.data;

    if (url.includes("openrouter.ai")) {
      console.error("Error from OpenRouter API:", responseData);
      return res.status(500).json({
        error:
          "Failed to get a response from the AI. Try again later or contact support.",
      });
    }

    if (url.includes("themoviedb.org")) {
      console.error("Error from TMDB API:", responseData);
      return res.status(500).json({
        error:
          "Failed to retrieve movie details. Try again later or contact support.",
      });
    }
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    error: "An unexpected error occurred on the server. Please try again.",
  });
};

export default errorHandler;
