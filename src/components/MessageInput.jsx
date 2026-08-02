import React, { useState, useRef, useEffect } from "react";

const MessageInput = ({ onSend, loading, editContent, onClearEdit }) => {
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (editContent) {
      setInput(editContent);

      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.value.length;
      }
    }
  }, [editContent]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim() || loading) return;

    onSend(input);

    setInput("");

    if (onClearEdit) {
      onClearEdit();
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleCancelEdit = () => {
    setInput("");

    if (onClearEdit) {
      onClearEdit();
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (isMobile) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }

    if (e.key === "Escape" && editContent) {
      handleCancelEdit();
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-gray-800 bg-[#0D0D0D]/95 backdrop-blur-sm p-4">
      {editContent && (
        <div className="flex items-center justify-between max-w-3xl mx-auto mb-2 px-2">
          <span className="text-xs text-[#D4A017] font-medium">
            ✏️ Editing message...
          </span>

          <button
            onClick={handleCancelEdit}
            className="text-xs text-gray-500 hover:text-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex items-end gap-3 max-w-3xl mx-auto">
        <div className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-[#D4A017] focus-within:border-transparent transition-all duration-200">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
            placeholder={
              editContent
                ? "Edit your message..."
                : isMobile
                  ? "Type your message..."
                  : "Ask Elitz anything..."
            }
            className="w-full bg-transparent text-white placeholder-gray-500 text-sm outline-none resize-none min-h-[24px] max-h-[120px] leading-6"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className={`
            p-3 rounded-full transition-all duration-200 flex-shrink-0
            ${
              loading || !input.trim()
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-[#D4A017] text-black hover:bg-[#b88a14] hover:scale-105 active:scale-95 shadow-lg hover:shadow-[0_0_25px_rgba(212,160,23,0.3)]"
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
