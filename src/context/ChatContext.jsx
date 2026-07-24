import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { sendMessageToGemini } from "../api/gemini";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const toastStyle = {
  background: "#ffffff",
  color: "#1f2937",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  fontSize: "14px",
  padding: "12px 16px",
};

export function ChatProvider({ children }) {
  const navigate = useNavigate();

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("elitz_chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);

  useEffect(() => {
    localStorage.setItem("elitz_chats", JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find((chat) => chat.id === activeChatId) || null;

  const createNewChat = (title = "New chat") => {
    const newChat = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      title: title,
      messages: [],
      createdAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat;
  };

  useEffect(() => {
    if (activeChatId) {
      navigate(`/chat/${activeChatId}`);
    }
  }, [activeChatId, navigate]);

  const deleteChat = (chatId) => {
    if (chats.length <= 1) {
      setChats([]);
      setActiveChatId(null);
      navigate("/");
      return;
    }
    const newChats = chats.filter((chat) => chat.id !== chatId);
    setChats(newChats);
    if (activeChatId === chatId) {
      const nextChat = newChats[0] || null;
      setActiveChatId(nextChat?.id || null);
      if (nextChat) {
        navigate(`/chat/${nextChat.id}`);
      } else {
        navigate("/");
      }
    }
  };

  const switchChat = (chatId) => {
    setActiveChatId(chatId);
    navigate(`/chat/${chatId}`);
  };

  const sendMessage = async (chatId, userMessage) => {
    if (!userMessage.trim() || loading) return;

    // Add rate limiting - wait 2 seconds between messages
    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTime;
    if (timeSinceLastMessage < 2000) {
      const waitTime = 2000 - timeSinceLastMessage;
      console.log(
        `⏳ Rate limiting: waiting ${waitTime}ms before next message`,
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
    setLastMessageTime(Date.now());

    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;

    const userMsg = { role: "user", content: userMessage };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          let title = c.title;
          if (c.title === "New chat" && c.messages.length === 0) {
            title =
              userMessage.slice(0, 30) + (userMessage.length > 30 ? "..." : "");
          }
          return { ...c, title, messages: [...c.messages, userMsg] };
        }
        return c;
      }),
    );

    setLoading(true);

    try {
      const updatedChat = chats.find((c) => c.id === chatId);
      const allMessages = [...(updatedChat?.messages || []), userMsg];

      console.log("📤 Sending message to Gemini...");
      const response = await sendMessageToGemini(allMessages);
      const aiContent =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI.";
      const aiMsg = { role: "assistant", content: aiContent };

      setChats((prev) =>
        prev.map((c) => {
          if (c.id === chatId) {
            return { ...c, messages: [...c.messages, aiMsg] };
          }
          return c;
        }),
      );
    } catch (error) {
      console.error("Error:", error);

      const isRateLimit =
        error.message?.includes("Rate limit exceeded") ||
        error.message?.includes("429");

      const errorMsg = {
        role: "assistant",
        content: `⚠️ ${error.message || "Something went wrong. Please try again."}`,
      };

      if (isRateLimit) {
        toast.warning(
          "⏳ Rate limit exceeded. Please wait 30 seconds before sending another message.",
          {
            style: toastStyle,
            autoClose: 30000,
          },
        );
      } else {
        toast.error(errorMsg.content, { style: toastStyle });
      }

      setChats((prev) =>
        prev.map((c) => {
          if (c.id === chatId) {
            return { ...c, messages: [...c.messages, errorMsg] };
          }
          return c;
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const value = {
    chats,
    activeChat,
    activeChatId,
    loading,
    createNewChat,
    deleteChat,
    switchChat,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
