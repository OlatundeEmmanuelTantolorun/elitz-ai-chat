// Direct call to Google Gemini API
export const sendMessageToGemini = async (messages) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  if (!API_KEY) {
    console.error("❌ API Key is missing!");
    throw new Error("API key is missing. Please check your .env file.");
  }

  console.log(
    "🔑 Using API key starting with:",
    API_KEY.substring(0, 8) + "...",
  );

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      }),
    });

    console.log("📡 API Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ API Error Response:", errorData);

      if (response.status === 429) {
        // Rate limit error - provide helpful message
        const waitTime = 30; // seconds
        throw new Error(
          `⚠️ Rate limit exceeded. Please wait ${waitTime} seconds and try again. Free tier: 60 requests per minute.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          "❌ Invalid API key. Please check your Google Gemini API key.",
        );
      } else if (response.status === 403) {
        throw new Error(
          "❌ API key does not have access to Gemini. Enable Gemini API in Google Cloud Console.",
        );
      } else {
        throw new Error(
          errorData.error?.message || "Failed to get response from Gemini",
        );
      }
    }

    const data = await response.json();
    console.log("✅ API Response received successfully");
    return data;
  } catch (error) {
    console.error("❌ Error calling Gemini:", error);
    throw error;
  }
};

// Optional: Check if API key is valid (for testing)
export const testApiKey = async (apiKey) => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
};
