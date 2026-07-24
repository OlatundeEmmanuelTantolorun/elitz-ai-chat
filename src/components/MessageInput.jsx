import React, { useState } from "react";

const MessageInput = ({ onSend, loading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-800 bg-[#0D0D0D] p-3">
      <div className="flex items-center gap-2 max-w-3xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Elitz anything..."
          className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF9900] text-white placeholder-gray-500 text-sm transition"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className={`
            p-3 rounded-full transition
            ${
              loading || !input.trim()
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-[#FF9900] text-white hover:bg-[#e68a00] shadow-lg"
            }
          `}
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
