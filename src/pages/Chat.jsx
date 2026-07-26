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

  const { chats, activeChat, loading, sendMessage, switchChat } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chats.length === 0) {
      navigate("/");
      return;
    }

    if (chatId) {
      const exists = chats.find((c) => c.id === chatId);

      if (exists) {
        switchChat(chatId);
      } else {
        switchChat(chats[0].id);
        navigate(`/chat/${chats[0].id}`);
      }
    }
  }, [chatId, chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeChat?.messages]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleSendMessage = async (text) => {
    if (!activeChat) return;

    sendMessage(activeChat.id, text);
  };

  const suggestions = [
    "Explain quantum computing",
    "Write a Python function",
    "Best productivity tips",
    "Tell me a space fact",
  ];

  return (
    <div
      className="flex bg-[#0D0D0D]"
      style={{
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {activeChat?.messages.length === 0 ? (
            <div className="flex flex-wrap justify-center gap-3 mt-20">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(activeChat.id, s)}
                  className="px-4 py-2 rounded-full border border-gray-700 hover:border-[#FF9900] text-gray-300"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <>
              {activeChat?.messages.map((message, index) => (
                <Message key={index} message={message} messageIndex={index} />
              ))}

              {loading && (
                <div className="flex justify-start mb-6">
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3">
                    Thinking...
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
