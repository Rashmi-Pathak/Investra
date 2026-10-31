"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#090909] px-6 text-center text-[#FAF7F5]">
      <div className="max-w-md rounded-[22px] border border-[#FF5C5C]/40 bg-[#181614] p-8 shadow-lg">
        <p className="font-mono text-xs uppercase tracking-wider text-[#FF5C5C]">
          CIRCUIT BREAKER TRIGGERED
        </p>
        <h2 className="mt-2 text-2xl font-bold">Terminal Interrupted</h2>
        <p className="mt-2 text-xs text-[#B9B4B1]">{error.message || "Unexpected runtime error."}</p>
        <button
          onClick={() => reset()}
          className="mt-5 rounded-[14px] bg-gradient-to-r from-[#C98A4A] to-[#D8A56D] px-5 py-2.5 text-xs font-bold text-[#090909]"
        >
          Reconnect Terminal
        </button>
      </div>
    </div>
  );
}
