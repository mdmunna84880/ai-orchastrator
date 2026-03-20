import express from "express";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import axios from "axios";

import { extractWithGemini } from "../utils/gemini.js";
import { cleanJSON } from "../utils/cleanJSON.js";

const router = express.Router();

// Store the file in ram
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload file and extract data
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
     if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded. Please attach a PDF/text file."
      });
    }

    // Get text from the uploaded pdf file
    const parser = new PDFParse({
      data: req.file.buffer
    });
    const result = await parser.getText();
    // Get question from body
    const question = req.body.question;

    // Get the structured result from gemini
    const rawAI = await extractWithGemini(result.text, question);
    const structured = cleanJSON(rawAI);

    res.json({
      success: true,
      extractedText: result.text,
      extractedData: structured,
    });

  } catch (error) {
    console.error("Extraction Error",error);
    res.status(500).json({ success: false, error: "Failed to process file" });
  }
});

// Trigger n8n Automation
router.post("/automate", async (req, res)=>{
  try{
    const {text, question, extractedData, email} = req.body;

    if(!email){
      return res.status(400).json({success: false, error: "Email is required."});
    }

    // Get response from the n8n workflow
    const n8nResponse = await axios.post(
      process.env.N8N_WEBHOOK_URL,
      {
        text,
        question,
        extractedData,
        email
      }
    )

    res.json({
      success: true,
      finalAnswer: n8nResponse.data.answer,
      emailBody: n8nResponse.data.email_body,
      status: n8nResponse.data.status
    })
  }catch(err){
    console.error("n8n Webhook Error", err);
    res.status(500).json({success:false, error: "Failed to trigger automation"});
  }

})

export default router;