export const sendMessageToGroq = async (messages) => {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!API_KEY) {
    console.error("❌ Groq API Key is missing!");
    throw new Error(
      "API key is missing. Please add VITE_GROQ_API_KEY to your environment variables.",
    );
  }

  console.log(
    "🔑 Using Groq API key starting with:",
    API_KEY.substring(0, 8) + "...",
  );

  const url = "https://api.groq.com/openai/v1/chat/completions";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
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
    });

    console.log("📡 Groq API Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Groq API Error:", errorData);

      if (response.status === 429) {
        throw new Error(`Rate limit exceeded. Please wait and try again.`);
      } else if (response.status === 401) {
        throw new Error(`Invalid API key. Please check your Groq API key.`);
      } else {
        throw new Error(
          errorData.error?.message || `Groq API error (${response.status})`,
        );
      }
    }

    const data = await response.json();
    console.log("✅ Groq Response received successfully");
    return data;
  } catch (error) {
    console.error("❌ Error calling Groq:", error);
    throw error;
  }
};

// Available Groq models (March 2025):
// - "llama-3.3-70b-versatile" - Best quality, latest Llama
// - "llama-3.1-70b-versatile" - Good quality, stable
// - "llama-3.1-8b-instant" - Fastest, good for simple tasks
// - "mixtral-8x7b-32768" - Good for complex reasoning
// - "gemma2-9b-it" - Google's model, good for instructions
// - "deepseek-r1-distill-llama-70b" - DeepSeek model
// - "qwen-2.5-32b" - Qwen model

export const testGroqKey = async (apiKey) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Groq API key is valid!");
      console.log(
        "📋 Available models:",
        data.data?.map((m) => m.id).join(", "),
      );
      return { valid: true, data };
    } else {
      const error = await response.json();
      console.error("❌ Groq API key test failed:", error);
      return { valid: false, error };
    }
  } catch (error) {
    console.error("❌ Error testing Groq API key:", error);
    return { valid: false, error: error.message };
  }
};
