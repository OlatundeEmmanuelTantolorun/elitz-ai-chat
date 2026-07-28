import React, { useState, useEffect } from "react";
import { HiPlus, HiHome, HiChatAlt2, HiSparkles } from "react-icons/hi";
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
    const chat = createNewChat();

    navigate(`/chat/${chat.id}`);

    if (isMobile) {
      onToggle();
    }
  };

  const handleSwitchChat = (chatId) => {
    switchChat(chatId);

    navigate(`/chat/${chatId}`);

    if (isMobile) {
      onToggle();
    }
  };

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" // Increased from z-30
          onClick={onToggle}
        />
      )}
      <aside
        className={`
    fixed md:relative
    z-[100] // Increased from z-40
    h-full
    w-80
    bg-[#111111]
    border-r border-gray-800
    flex flex-col
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >
        <div className="border-b border-gray-800 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-37 h-auto rounded-xl bg-[#1a1a1a] border border-gray-800 flex items-center justify-center py-2 px-1">
                <img
                  src={logo}
                  alt="Elitz"
                  className="w-35 h-auto object-contain"
                />
              </div>

              <div>
                <h2 className="text-white font-semibold">Elitz AI</h2>

                <p className="text-xs text-gray-500">Smart conversations</p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="md:hidden text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF9900] hover:bg-[#ffad26] text-black font-semibold py-3 transition-all duration-200 shadow-lg hover:scale-[1.02]"
          >
            <HiPlus size={18} />
            New Chat
          </button>

          <Link to="/" onClick={isMobile ? onToggle : undefined}>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-[#181818] hover:bg-[#202020] text-gray-300 py-3 transition">
              <HiHome size={18} />
              Home
            </button>
          </Link>
        </div>

        <div className="px-4 pb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
          <HiSparkles size={14} />
          Recent Chats
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 pb-4">
          {chats.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] border border-gray-800 flex items-center justify-center mb-4">
                <HiChatAlt2 className="text-2xl text-gray-500" />
              </div>

              <h3 className="text-sm font-semibold text-gray-300">
                No conversations yet
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Start a new conversation and your chats will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div key={chat.id} className="group relative">
                  <button
                    onClick={() => handleSwitchChat(chat.id)}
                    className={`
                      w-full
                      text-left
                      rounded-xl
                      px-4
                      py-3
                      transition-all
                      duration-200
                      border
                      ${
                        chat.id === activeChatId
                          ? "bg-[#1d1d1d] border-[#FF9900]/50 shadow-[0_0_0_1px_rgba(255,153,0,0.15)]"
                          : "bg-transparent border-transparent hover:bg-[#1a1a1a] hover:border-gray-800"
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-medium ${
                            chat.id === activeChatId
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {chat.title || "New Chat"}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <span>{chat.messages.length} messages</span>

                          {chat.id === activeChatId && (
                            <>
                              <span>•</span>
                              <span className="text-[#FF9900]">Active</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className={`
  p-2 rounded-lg transition-all duration-200 hover:bg-red-500/10
  ${isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
`}
                        title="Delete chat"
                      >
                        <svg
                          className="w-4 h-4 text-gray-500 hover:text-red-400 transition-colors"
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
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 p-4 bg-[#101010]">
          <div className="rounded-xl border border-gray-800 bg-[#181818] p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF9900] flex items-center justify-center text-black font-bold">
                E
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">Elitz AI</p>

                <p className="text-xs text-gray-500 truncate">
                  Powered by Groq
                </p>
              </div>

              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-600 mt-3">
            Version 1.0 • Built with React
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
