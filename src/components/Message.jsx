import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`
        max-w-[80%] px-4 py-3 rounded-2xl shadow-sm
        ${isUser ? "bg-[#FF9900] text-white" : "bg-[#1a1a1a] border border-gray-800 text-gray-200"}
      `}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        ) : (
          <div className="text-sm leading-relaxed prose prose-invert max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
