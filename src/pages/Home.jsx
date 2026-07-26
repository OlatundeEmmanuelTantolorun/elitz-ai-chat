import React from "react";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import robotVideo from "../assets/robotModal2.mp4";

const Home = () => {
  const { createNewChat } = useChat();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const newChat = createNewChat("New chat");
    navigate(`/chat/${newChat.id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-3xl shadow-2xl p-8 text-center border border-gray-800">
        <div className="mb-6 flex justify-center">
          <video
            src={robotVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-55 h-55 object-cover rounded-full border-2 border-[#FF9900] shadow-lg shadow-[#FF9900]/20"
          />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">Elitz</h1>
        <p className="text-gray-400 mb-6">
          Your AI companion · powered by GroqCloud
        </p>

        <button
          onClick={handleGetStarted}
          className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white py-3 rounded-xl font-medium text-lg transition flex items-center justify-center gap-2 shadow-lg hover:shadow-[#FF9900]/30"
        >
          <span>Get started</span>
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
