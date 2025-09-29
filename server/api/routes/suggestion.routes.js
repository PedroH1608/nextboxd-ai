import { Router } from "express";
import multer from "multer";
import { generateSuggestion } from "../controllers/suggestion.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/generate", upload.single("csvFile"), generateSuggestion);

export default router;
