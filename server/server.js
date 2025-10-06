import "./config.js";

import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import suggestionRoutes from "./api/routes/suggestion.routes.js";

const app = express();

app.use(cors());

app.use("/api", suggestionRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
