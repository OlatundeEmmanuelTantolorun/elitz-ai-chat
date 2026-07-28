import React from "react";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import {
  HiSparkles,
  HiArrowRight,
  HiChatBubbleLeftRight,
  HiBolt,
  HiCodeBracket,
  HiCpuChip,
} from "react-icons/hi2";
import robotVideo from "../assets/robotModal2.mp4";

const Home = () => {
  const { createNewChat } = useChat();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const newChat = createNewChat();
    navigate(`/chat/${newChat.id}`);
  };

  return (
    <main className="relative h-dvh overflow-y-auto no-scrollbar bg-[#0D0D0D]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full bg-[#FF9900]/10 blur-[140px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 3px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex min-h-full items-center justify-center px-4 sm:px-8 lg:px-12 py-8 md:py-12">
        <div className="w-full max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl rounded-[32px] border border-gray-800 bg-[#151515]/95 backdrop-blur-xl shadow-2xl px-6 sm:px-10 md:px-14 lg:px-16 py-10 md:py-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF9900]/20 bg-[#FF9900]/10 px-4 py-2 text-sm text-[#FF9900] mb-8">
            <HiSparkles />
            Powered by GroqCloud
          </div>

          <div className="relative flex justify-center mb-8">
            <div className="absolute w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-[#FF9900]/20 blur-3xl animate-pulse" />

            <video
              src={robotVideo}
              autoPlay
              loop
              muted
              playsInline
              className="relative w-55 h-55 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-cover rounded-full border-2 border-[#FF9900] shadow-[0_0_60px_rgba(255,153,0,.25)]"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Elitz AI
          </h1>

          <p className="mt-5 mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
            Ask questions, generate code, solve problems, brainstorm ideas,
            summarize documents, and build faster with an intelligent AI
            assistant powered by Groq.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="group flex items-center gap-4 rounded-2xl border border-gray-800 bg-[#1b1b1b] px-5 py-4 transition-all duration-300 hover:border-[#FF9900]/40 hover:bg-[#202020]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF9900]/10 text-[#FF9900]">
                <HiChatBubbleLeftRight className="h-6 w-6" />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-white">Smart Chat</h3>
                <p className="text-sm text-gray-400">
                  Natural conversations with AI.
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-2xl border border-gray-800 bg-[#1b1b1b] px-5 py-4 transition-all duration-300 hover:border-[#FF9900]/40 hover:bg-[#202020]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF9900]/10 text-[#FF9900]">
                <HiBolt className="h-6 w-6" />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-white">Fast Responses</h3>
                <p className="text-sm text-gray-400">
                  Powered by Groq's ultra-low latency.
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-2xl border border-gray-800 bg-[#1b1b1b] px-5 py-4 transition-all duration-300 hover:border-[#FF9900]/40 hover:bg-[#202020]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF9900]/10 text-[#FF9900]">
                <HiCodeBracket className="h-6 w-6" />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-white">Code Generation</h3>
                <p className="text-sm text-gray-400">
                  Generate, explain, and debug code.
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-2xl border border-gray-800 bg-[#1b1b1b] px-5 py-4 transition-all duration-300 hover:border-[#FF9900]/40 hover:bg-[#202020]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF9900]/10 text-[#FF9900]">
                <HiCpuChip className="h-6 w-6" />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-white">AI Reasoning</h3>
                <p className="text-sm text-gray-400">
                  Think through complex problems intelligently.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGetStarted}
            className="group mt-10 w-full rounded-2xl bg-[#FF9900] py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#ffad26] hover:shadow-[0_0_30px_rgba(255,153,0,.45)] flex items-center justify-center gap-3"
          >
            Get Started
            <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p className="mt-6 text-xs text-gray-600">
            Built with React • Powered by Groq • Version 1.0
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
