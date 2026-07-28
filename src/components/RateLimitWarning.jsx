import React, { useState, useEffect } from "react";
import { HiOutlineExclamationTriangle, HiXMark } from "react-icons/hi2";

const RateLimitWarning = ({ message, onClose, retryAfter = 60 }) => {
  const [countdown, setCountdown] = useState(retryAfter);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onClose();
    }
  }, [countdown, onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 transition-all">
      <div className="relative overflow-hidden rounded-2xl border border-[#FF9900]/30 bg-[#171717] p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF9900]" />

        <div className="flex items-start gap-3.5">
          {/* Warning Icon Container */}
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FF9900]/10 text-[#FF9900]">
            <HiOutlineExclamationTriangle className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold text-white">
              Rate Limit Reached
            </h4>

            <p className="mt-1 text-xs text-gray-300 leading-relaxed">
              {message || "You've sent too many requests in a short time."}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/20 px-2.5 py-1 text-xs font-mono font-medium text-[#FF9900]">
                {countdown}s remaining
              </span>
              <span className="text-[11px] text-gray-400">
                Limit resets automatically
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            aria-label="Close"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateLimitWarning;
