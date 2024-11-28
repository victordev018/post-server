import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(String(GEMINI_API_KEY));

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescriptionWithGemini(imageBuffer: Buffer) {
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem, seja direto com um limite de até 100 palavras";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text not available.";

  } catch (err) {
    throw new Error("Error getting Gemini's alt-text.");
  }
}