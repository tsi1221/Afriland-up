import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn(
    "❌ Gemini API key is missing. Add VITE_GEMINI_API_KEY in your .env file."
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Ask Gemini AI
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function askGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // ✅ Gemini expects an array of strings
    const result = await model.generateContent([prompt]);

    // ✅ Safely extract the response text
    const text = result?.response?.text();
    return text || "No response from Gemini.";
  } catch (error) {
    console.error("⚠️ Gemini API Error:", error);
    return "Sorry, I couldn’t generate a response.";
  }
}
