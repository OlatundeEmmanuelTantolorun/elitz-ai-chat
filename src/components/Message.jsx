import { BiClipboard } from "react-icons/bi";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// ========================
// Copy button for code
// ========================
const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-gray-400 hover:text-white rounded-lg px-3 py-1.5 text-xs border border-gray-700 transition z-10"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

// ========================
// Copy button for the whole message
// ========================
const MessageCopyButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy message"
      className="absolute -top-3 -right-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-300 hover:text-white border border-gray-700 rounded-full w-7 h-7 flex items-center justify-center text-xs shadow-sm transition z-10"
    >
      {copied ? "✓" : <BiClipboard />}
    </button>
  );
};

// ========================
// Main Message Component
// ========================

const Message = ({ message, messageIndex }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-8`}>
      <div className="relative max-w-[85%]">
        <MessageCopyButton content={message.content} />

        <div
          className={`px-4 py-3 rounded-2xl shadow-sm overflow-hidden break-words ${
            isUser
              ? "bg-[#1a1a1a] border border-[#FF9900] text-white"
              : "bg-[#1a1a1a] border border-gray-800 text-gray-200"
          }`}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
          ) : (
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  if (!inline && match) {
                    const code = String(children).replace(/\n$/, "");

                    return (
                      <div className="relative my-2 overflow-x-auto rounded-lg">
                        <CopyButton code={code} />

                        <SyntaxHighlighter
                          language={match[1]}
                          style={vscDarkPlus}
                          PreTag="div"
                          className="rounded-lg"
                          {...props}
                        >
                          {code}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
                    <code
                      className="bg-[#0D0D0D] px-1 rounded text-[#FF9900]"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },

                p({ children }) {
                  return <p className="mb-2 whitespace-pre-wrap">{children}</p>;
                },

                ul({ children }) {
                  return <ul className="list-disc pl-5 mb-2">{children}</ul>;
                },

                ol({ children }) {
                  return <ol className="list-decimal pl-5 mb-2">{children}</ol>;
                },

                li({ children }) {
                  return <li>{children}</li>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
