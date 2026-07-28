import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { toast } from "react-toastify";
import {
  HiOutlineLightBulb,
  HiOutlineCodeBracket,
  HiOutlineRocketLaunch,
  HiOutlineGlobeAmericas,
  HiOutlineSparkles,
  HiOutlineCpuChip,
  HiBolt,
  HiClock,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const { chats, activeChat, loading, sendMessage, switchChat } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const messagesEndRef = useRef(null);
  const shownFeedbackChats = useRef(new Set());

  useEffect(() => {
    if (!activeChat || loading) return;

    const totalMessages = activeChat.messages?.length || 0;

    if (totalMessages >= 20 && !shownFeedbackChats.current.has(activeChat.id)) {
      shownFeedbackChats.current.add(activeChat.id);

      const timer = setTimeout(() => {
        toast(
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF9900]/10 border border-[#FF9900]/20 px-3 py-1 text-xs font-medium text-[#FF9900]">
              <HiOutlineSparkles className="h-3.5 w-3.5" /> Early Access
            </span>

            <div>
              <h3 className="text-white font-semibold text-base">
                ✨ Thanks for trying Elitz AI
              </h3>

              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                I'm actively improving it, and I'd genuinely love to hear your
                thoughts. Every suggestion and bug report is read personally.
              </p>
            </div>

            <a
              href="https://wa.me/2349066882533?text=Hi%20Elitz!%20I%20have%20some%20feedback%20about%20your%20AI."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 font-semibold text-white transition hover:brightness-110"
            >
              <FaWhatsapp className="h-5 w-5" /> 💬 Message the Developer
            </a>

            <p className="text-center text-xs text-gray-500">
              Usually takes less than 30 seconds.
            </p>
          </div>,
          {
            autoClose: 12000,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            icon: false,
          },
        );
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [activeChat, loading]);

  useEffect(() => {
    if (!loading && chats.length === 0) {
      navigate("/");
      return;
    }

    if (chatId && chats.length > 0) {
      const exists = chats.find((c) => c.id === chatId);

      if (exists) {
        switchChat(chatId);
      } else {
        switchChat(chats[0].id);
        navigate(`/chat/${chats[0].id}`);
      }
    }
  }, [chatId, chats, loading, navigate, switchChat]);

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
    {
      title: "Explain Quantum Computing",
      prompt:
        "Explain quantum computing in simple terms. Make it accessible to a beginner.",
      description: "Understand it in simple language.",
      icon: HiOutlineLightBulb,
    },
    {
      title: "Generate React Component",
      prompt:
        "Create a reusable React component with proper TypeScript types, error boundaries, and best practices. Include a brief explanation of the design choices.",
      description: "Create reusable production code.",
      icon: HiOutlineCodeBracket,
    },
    {
      title: "Boost Productivity",
      prompt:
        "Share 5 actionable productivity tips for software developers. Include both tools and mental frameworks.",
      description: "Learn smarter daily habits.",
      icon: HiOutlineRocketLaunch,
    },
    {
      title: "Explore Space",
      prompt:
        "Tell me a fascinating and mind-blowing fact about space that most people don't know.",
      description: "Discover something fascinating.",
      icon: HiOutlineGlobeAmericas,
    },
  ];

  if (loading && !activeChat) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-[#0D0D0D] text-white">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full bg-[#FF9900] animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-3 w-3 rounded-full bg-[#FF9900] animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-3 w-3 rounded-full bg-[#FF9900] animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  if (!activeChat) {
    return null;
  }

  return (
    <div className="flex h-dvh bg-[#0D0D0D] overflow-hidden text-white animate-fadeIn">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#FF9900]/10 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="z-40 border-b border-gray-800 bg-[#0D0D0D]/90 backdrop-blur-xl">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        <main className="flex-1 overflow-y-auto bg-[#0D0D0D]">
          {activeChat?.messages?.length === 0 ? (
            <div className="mx-auto flex min-h-[calc(100dvh-80px)] w-full max-w-6xl flex-col justify-center px-6 py-12 md:px-10 animate-[fadeIn_0.5s_ease]">
              <div className="mb-12 text-center animate-[fadeIn_0.5s_ease]">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#FF9900]/20 bg-[#FF9900]/10 shadow-[0_0_30px_rgba(255,153,0,.12)]">
                  <HiOutlineCpuChip className="h-10 w-10 text-[#FF9900] animate-pulse" />
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Welcome to <span className="text-[#FF9900]">Elitz AI</span>
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400">
                  Ask questions, generate code, solve problems, brainstorm
                  ideas, summarize documents, and build faster with your AI
                  assistant.
                </p>

                <div className="mt-6 flex justify-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <HiBolt className="h-4 w-4 text-[#FF9900]" />
                    <div>
                      <h3 className="text-white font-semibold">Speed</h3>
                      <p>Groq Powered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineCpuChip className="h-4 w-4 text-[#FF9900]" />
                    <div>
                      <h3 className="text-white font-semibold">Reasoning</h3>
                      <p>AI</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiClock className="h-4 w-4 text-[#FF9900]" />
                    <div>
                      <h3 className="text-white font-semibold">24/7</h3>
                      <p>Available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
                {suggestions.map((s, index) => {
                  const Icon = s.icon;

                  return (
                    <button
                      key={s.title}
                      onClick={() => sendMessage(activeChat.id, s.prompt)}
                      className="group rounded-3xl border border-gray-800 bg-[#171717] p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-[#FF9900]/40 hover:bg-[#1d1d1d] hover:shadow-[0_0_25px_rgba(255,153,0,.08)] active:scale-[.98] animate-[fadeIn_0.5s_ease]"
                      style={{
                        animationDelay: `${index * 120}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF9900]/10 text-[#FF9900]">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="text-lg font-semibold text-white group-hover:text-[#FF9900] transition-colors">
                        {s.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {s.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="mt-12 text-center text-sm text-gray-600">
                Powered by Groq • Built by Elitz
              </p>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-3xl flex-col px-6 py-8 md:px-10">
              {activeChat?.messages?.map((message, index) => (
                <Message key={index} message={message} messageIndex={index} />
              ))}

              {loading && (
                <div className="mb-8 flex">
                  <div className="rounded-3xl border border-gray-800 bg-[#171717] p-5 w-fit">
                    <div className="flex items-center gap-4">
                      <HiOutlineCpuChip className="text-[#FF9900] animate-pulse text-2xl" />
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300">
                          Elitz is thinking...
                        </p>
                        <div className="h-2 w-40 rounded-full bg-gray-700 animate-pulse" />
                        <div className="h-2 w-28 rounded-full bg-gray-700 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        <MessageInput onSend={handleSendMessage} loading={loading} />
      </div>
    </div>
  );
};

export default Chat;
