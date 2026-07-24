import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY not set in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Initialize Gemini client
    const ai = new GoogleGenAI({ apiKey });

    // Format messages for Gemini
    const formattedMessages = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Generate response
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: formattedMessages,
      config: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    // Return the response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in chat API:", error);
    res.status(500).json({
      error: "Failed to generate response",
      details: error.message,
    });
  }
}
