// api/groq.js - Vercel Serverless Function for Groq
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("❌ GROQ_API_KEY not set in environment variables");
      return res
        .status(500)
        .json({ error: "Server configuration error: API key missing" });
    }

    console.log(`📨 Sending ${messages.length} messages to Groq...`);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content,
          })),
          temperature: 0.7,
          max_tokens: 800,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Groq API Error:", data);

      if (response.status === 429) {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait and try again.",
        });
      } else if (response.status === 401) {
        return res.status(401).json({
          error: "Invalid API key. Please check your Groq API key.",
        });
      } else {
        return res.status(response.status).json({
          error: data.error?.message || "Groq API error",
        });
      }
    }

    console.log("✅ Groq response received successfully");
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error in Groq API:", error);
    res.status(500).json({
      error: "Failed to generate response",
      details: error.message,
    });
  }
}
