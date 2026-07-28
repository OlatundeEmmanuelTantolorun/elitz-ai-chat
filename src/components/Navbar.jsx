import React from "react";
import { HiMenu } from "react-icons/hi";
import { useChat } from "../context/ChatContext";

const Navbar = ({ onToggleSidebar }) => {
  const { activeChat } = useChat();

  return (
    <header className="sticky top-0 z-20 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-gray-800">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all duration-200"
          >
            <HiMenu className="w-6 h-6" />
          </button>

          <div className="flex flex-col leading-tight">
            <h1 className="text-white text-lg font-semibold tracking-tight">
              Elitz
            </h1>

            <span className="text-xs text-[#FF9900] font-medium">
              Powered by Groq
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center gap-2 bg-[#171717] border border-gray-800 rounded-full px-3 py-1.5 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {activeChat?.messages?.length || 0} messages
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
