import { AiTwotoneHome } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen, onToggle }) => {
  const { chats, activeChatId, createNewChat, deleteChat, switchChat } =
    useChat();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNewChat = () => {
    const newChat = createNewChat("New chat");
    navigate(`/chat/${newChat.id}`);
    if (isMobile) onToggle();
  };

  const handleSwitchChat = (chatId) => {
    switchChat(chatId);
    navigate(`/chat/${chatId}`);
    if (isMobile) onToggle();
  };

  return (
    <>
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/70 z-20" onClick={onToggle} />
      )}

      <div
        className={`
        fixed md:relative z-30 h-full w-75 bg-[#0D0D0D] border-r border-gray-800 shadow-2xl flex flex-col
        transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-75 md:translate-x-0"}
        md:translate-x-0
      `}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Elitz"
              className="w-24 h-auto object-contain"
            />
          </div>
          <button
            onClick={onToggle}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <div className="p-3 flex flex-col gap-3">
          <Link to="/">
            <button
              onClick={handleNewChat}
              className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-black rounded-lg py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition shadow-lg"
            >
              <AiTwotoneHome size={20} />
              Home
            </button>
          </Link>
          <button
            onClick={handleNewChat}
            className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-black rounded-lg py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {chats.length === 0 ? (
            <div className="text-center text-gray-500 text-sm mt-8">
              No conversations yet
            </div>
          ) : (
            chats.map((chat) => (
              <div key={chat.id} className="group flex items-center gap-1 mb-1">
                <div
                  onClick={() => handleSwitchChat(chat.id)}
                  className={`
                    flex-1 p-3 rounded-lg cursor-pointer transition
                    ${chat.id === activeChatId ? "bg-[#FF9900]/10 border border-[#FF9900]/30" : "hover:bg-[#1a1a1a]"}
                  `}
                >
                  <div className="truncate text-sm font-medium text-gray-300">
                    {chat.title || "New chat"}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {chat.messages.length} messages
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className={`
                    p-1 rounded transition
                    ${isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  `}
                >
                  <svg
                    className="w-4 h-4 text-gray-500 hover:text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-gray-800 text-xs text-gray-500 text-center">
          Groq AI
        </div>
      </div>
    </>
  );
};

export default Sidebar;
