import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { activeChat, loading, sendMessage, switchChat, chats } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    if (chats.length === 0) {
      navigate("/");
      return;
    }

    if (chatId) {
      const chatExists = chats.find((c) => c.id === chatId);
      if (chatExists) {
        if (chatId !== activeChat?.id) {
          switchChat(chatId);
        }
      } else {
        const firstChat = chats[0];
        if (firstChat) {
          switchChat(firstChat.id);
          navigate(`/chat/${firstChat.id}`);
        }
      }
    } else if (chats.length > 0) {
      const firstChat = chats[0];
      switchChat(firstChat.id);
      navigate(`/chat/${firstChat.id}`);
    }
  }, [chatId, chats, activeChat?.id, navigate, switchChat]);

  // Improved scroll to bottom - only when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && shouldScroll) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      });
    }
  }, [activeChat?.messages, shouldScroll]);

  // Only scroll when user sends a message or AI responds
  useEffect(() => {
    if (activeChat?.messages?.length > 0) {
      setShouldScroll(true);
    }
  }, [activeChat?.messages?.length]);

  // Detect if user is manually scrolling up
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      // If user scrolls up, stop auto-scrolling
      if (!isNearBottom) {
        setShouldScroll(false);
      } else {
        setShouldScroll(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = (message) => {
    if (!activeChat) return;
    setShouldScroll(true); // Always scroll when sending
    sendMessage(activeChat.id, message);
  };

  const handleSuggestionClick = (suggestion) => {
    if (!activeChat) return;
    setShouldScroll(true);
    sendMessage(activeChat.id, suggestion);
  };

  if (chats.length === 0) {
    return null;
  }

  const features = [
    {
      icon: "🧠",
      title: "Smart AI",
      description:
        "Powered by Groq's Llama 3.3, capable of understanding complex topics",
    },
    {
      icon: "⚡",
      title: "Fast Responses",
      description: "Get answers quickly with Groq's optimized processing",
    },
    {
      icon: "🎨",
      title: "Markdown Support",
      description: "Rich formatting with code blocks, lists, and more",
    },
    {
      icon: "💾",
      title: "Chat History",
      description: "Your conversations are saved locally for easy access",
    },
  ];

  const suggestions = [
    "Explain quantum computing in simple terms",
    "Write a Python function to reverse a string",
    "What are the best productivity tips?",
    "Tell me a fun fact about space",
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0D0D0D]">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-32"
        >
          {activeChat && activeChat.messages.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-start px-4 py-8">
              <div className="text-center mb-10 pt-8">
                <div className="w-16 h-16 bg-[#FF9900] rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-lg mb-4">
                  ✨
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  How can I help you today?
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Ask me anything or choose a suggestion below
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-[#FF9900] transition"
                  >
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-white text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="w-full max-w-2xl pb-8">
                <p className="text-xs text-gray-500 mb-3 text-center">
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-[#1a1a1a] border border-gray-800 hover:border-[#FF9900] hover:text-[#FF9900] rounded-full px-4 py-2 text-sm text-gray-300 transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {activeChat &&
                activeChat.messages.map((msg, index) => (
                  <Message key={index} message={msg} />
                ))}

              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-[#1a1a1a] px-4 py-3 rounded-2xl border border-gray-800">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#FF9900] rounded-full animate-pulse"></span>
                      <span
                        className="w-2 h-2 bg-[#FF9900] rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-[#FF9900] rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        <MessageInput onSend={handleSendMessage} loading={loading} />
      </div>
    </div>
  );
};

export default Chat;
