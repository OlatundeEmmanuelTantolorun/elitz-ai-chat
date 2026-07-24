import React from "react";
import { useChat } from "../context/ChatContext";
import logo from "../assets/logo.png";

const Navbar = ({ onToggleSidebar }) => {
  const { activeChat } = useChat();

  return (
    <div className="bg-[#0D0D0D] border-b border-gray-800 px-4 py-3 flex items-center gap-3 shadow-lg">
      <button
        onClick={onToggleSidebar}
        className="text-gray-400 hover:text-white md:hidden"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex items-center gap-1">
        <span className="font-semibold text-white text-lg">Elitz</span>
      </div>
      <span className="text-sm text-green-500 inline">· Gemini</span>

      <span className="ml-auto text-xs bg-[#1a1a1a] px-3 py-1 rounded-full text-gray-400 border border-gray-800">
        {activeChat?.messages?.length || 0} messages
      </span>
    </div>
  );
};

export default Navbar;
