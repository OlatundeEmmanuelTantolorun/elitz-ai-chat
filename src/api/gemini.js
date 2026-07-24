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
      let errorMessage = "Unknown error";
      let errorDetails = {};

      try {
        const errorData = await response.json();
        errorDetails = errorData;
        errorMessage =
          errorData.error?.message || errorData.message || "Unknown error";
        console.error("❌ API Error Response:", errorData);
      } catch (parseError) {
        console.error("❌ Could not parse error response:", parseError);
        errorMessage = response.statusText || `HTTP ${response.status}`;
      }

      if (response.status === 429) {
        throw new Error(
          `Rate limit exceeded (429). Please wait 30 seconds and try again. Free tier: 60 requests/minute.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          `Invalid API key. Please check your Google Gemini API key.`,
        );
      } else if (response.status === 403) {
        throw new Error(
          `API key does not have access to Gemini API. Enable Gemini API in Google Cloud Console.`,
        );
      } else if (response.status === 400) {
        throw new Error(`Bad request: ${errorMessage}`);
      } else {
        throw new Error(
          `Gemini API error (${response.status}): ${errorMessage}`,
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
