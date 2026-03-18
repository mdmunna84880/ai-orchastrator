import express from "express";
import multer from "multer";
import { PDFParse } from "pdf-parse";

import { extractWithGemini } from "../utils/gemini.js";
import { cleanJSON } from "../utils/cleanJSON.js";

const router = express.Router();

// Store the file in ram
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route(Only single file)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Get text from the uploaded pdf file
    const parser = new PDFParse({
      data: req.file.buffer
    });
    const result = await parser.getText();
    // Get the result from the gemini
    const rawAI = await extractWithGemini(result.text, req.body.question);
    // Structured data
    const structured = cleanJSON(rawAI);

    res.json({
      success: true,
      extracted: structured
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process pdf" });
  }
});

export default router;