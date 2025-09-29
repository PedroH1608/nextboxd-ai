import "./config.js";

import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import suggestionRoutes from "./api/routes/suggestion.routes.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use("/api", suggestionRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
