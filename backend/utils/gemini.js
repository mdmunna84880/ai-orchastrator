import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function extractWithGemini(text, question) {
  const prompt = `  You are a structured data extraction engine.

                    Rules:
                    - Extract ONLY relevant info based on the question
                    - Return 5-8 key-value pairs
                    - No explanation
                    - Output strictly valid JSON

                    Schema:
                    {
                    "key_points": [
                        { "field": "string", "value": "string" }
                    ]
                    }

                    Question: ${question}

                    Document:
                    ${text}
                    `;
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: prompt,
  });

  return response.text;
}
