import "./config.js";

import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import suggestionRoutes from "./api/routes/suggestion.routes.js";

const app = express();

app.use(cors());

app.use("/api", suggestionRoutes);

app.use(errorHandler);

export default app;