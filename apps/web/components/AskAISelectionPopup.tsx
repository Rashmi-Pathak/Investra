"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Copy, X, BookOpen, CheckCircle2 } from "lucide-react";
import { useInvestraStore } from "@/store/useInvestraStore";

const TERM_DEFINITIONS: Record<
  string,
  { meaning: string; portfolioExample: string; quizQ: string; quizA: string }
> = {
  "nifty 50": {
    meaning: "The flagship benchmark Indian stock market index representing the weighted average of 50 of the largest Indian companies listed on the National Stock Exchange (NSE).",
    portfolioExample: "Your virtual allocation tracks NIFTY 50 index movements. Keeping steady SIPs during index consolidations protects your psychological composure.",
    quizQ: "How many companies constitute the NIFTY 50 index?",
    quizA: "Exactly 50 blue-chip companies across 13+ key sectors of the Indian economy.",
  },
  "market cap": {
    meaning: "Total market value of a company's outstanding shares (Share Price × Total Shares).",
    portfolioExample: "Your TCS holding is a Large-Cap (₹14.94L Cr), offering lower volatility for your ₹5,000/month Real-Life SIP.",
    quizQ: "If a company has 10 Cr shares at ₹500 each, what is its Market Cap?",
    quizA: "₹5,000 Cr (10 Cr × ₹500)",
  },
  "pe": {
    meaning: "Price-to-Earnings Ratio measures how much investors pay per ₹1 of annual profit.",
    portfolioExample: "In your portfolio, HDFCBANK trades at 19.2x P/E (value zone) while TCS trades at 29.4x P/E.",
    quizQ: "Does a high P/E always mean a stock is overvalued?",
    quizA: "No — high-growth companies often command higher P/E multiples if earnings compound rapidly.",
  },
  "rsi": {
    meaning: "Relative Strength Index (0–100) measures momentum speed to spot overbought (>70) or oversold (<30) zones.",
    portfolioExample: "Our AI Coach flagged your ZOMATO entry when RSI was 76 (FOMO zone).",
    quizQ: "What RSI level traditionally signals an overbought market?",
    quizA: "Above 70",
  },
};

export function AskAISelectionPopup() {
  const [selectedText, setSelectedText] = useState("");
  const [showCenterModal, setShowCenterModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const askAITutor = useInvestraStore((s) => s.askAITutor);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Don't trigger if clicking inside the open modal
      const modalEl = document.getElementById("ask-ai-center-modal");
      if (modalEl && modalEl.contains(e.target as Node)) {
        return;
      }

      const sel = window.getSelection();
      const text = sel?.toString().trim() || "";
      if (text.length >= 2 && text.length <= 80) {
        setSelectedText(text);
        setShowCenterModal(true);
        setCopied(false);
        setShowQuizAnswer(false);
        askAITutor(`Explain "${text}" using my portfolio`, "SELECTED TEXT AI");
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [askAITutor]);

  if (!showCenterModal || !selectedText) return null;

  const cleanKey = selectedText.toLowerCase();
  const matched =
    Object.entries(TERM_DEFINITIONS).find(([k]) => cleanKey.includes(k))?.[1] || {
      meaning: `"${selectedText}" is a fundamental financial & stock market concept tracked by Investra's AI intelligence engine.`,
      portfolioExample: `Applying "${selectedText}" to your portfolio and monthly SIP sizing protects you against unhedged drawdowns and reinforces disciplined risk-management.`,
      quizQ: `How should a disciplined investor apply "${selectedText}"?`,
      quizA: `Always combine it with proper position sizing (<15% per stock) and a hard stop-loss before placing any order.`,
    };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        id="ask-ai-center-modal"
        className="relative w-full max-w-lg border border-[#C98A4A] bg-[#141210] p-6 shadow-[0_0_60px_rgba(201,138,74,0.35)] text-left font-mono"
        style={{ borderRadius: "0px" }}
      >
        {/* Top Header with Explicit Cross Close Button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center bg-[#C98A4A] text-[#090909]">
              <Sparkles className="size-4" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#C98A4A]">
                INVESTRA AI INTEL • SELECTED TEXT EXPLAINER
              </p>
              <h3 className="text-base font-extrabold text-[#FAF7F5] line-clamp-1">
                &ldquo;{selectedText}&rdquo;
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(selectedText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              title="Copy snippet"
              className="border border-white/10 bg-[#1e1a17] px-2.5 py-1 text-xs text-[#FAF7F5] hover:border-[#C98A4A]"
            >
              <span className="flex items-center gap-1">
                <Copy className="size-3 text-[#D8A56D]" />
                {copied ? "Copied" : "Copy"}
              </span>
            </button>

            {/* Crisp Square Close Button */}
            <button
              onClick={() => {
                setShowCenterModal(false);
                setSelectedText("");
                window.getSelection()?.removeAllRanges();
              }}
              className="flex size-7 items-center justify-center border border-white/20 bg-[#1e1a17] text-[#FAF7F5] hover:bg-[#FF5C5C] hover:border-[#FF5C5C] hover:text-[#090909] transition"
              title="Close modal"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="mt-4 space-y-4 text-xs leading-relaxed">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7A7471] block mb-1">
              Definition & Core Concept
            </span>
            <p className="text-[#FAF7F5] text-[13px]">{matched.meaning}</p>
          </div>

          <div className="border border-[#C98A4A]/30 bg-[#1c1815] p-3 text-[#F2D7B6]">
            <span className="font-bold text-[#C98A4A] block mb-1">
              Your Portfolio Context:
            </span>
            {matched.portfolioExample}
          </div>

          <div className="border border-white/10 bg-[#0c0c0c] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-[#D8A56D]">
                <BookOpen className="size-3.5" /> Concept Knowledge Check (+15 XP)
              </span>
              <button
                onClick={() => setShowQuizAnswer((v) => !v)}
                className="text-[11px] font-bold text-[#3EDC81] underline"
              >
                {showQuizAnswer ? "Hide Answer" : "Reveal Answer"}
              </button>
            </div>
            <p className="text-[#B9B4B1]">{matched.quizQ}</p>
            {showQuizAnswer && (
              <div className="mt-2 flex items-start gap-1.5 border-t border-white/10 pt-2 text-[#3EDC81]">
                <CheckCircle2 className="size-3.5 shrink-0 mt-0.5" />
                <span>{matched.quizA}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[10px] text-[#7A7471]">
            Powered by Bloomberg AI &amp; Real-Life Portfolio Engine
          </span>
          <button
            onClick={() => {
              setShowCenterModal(false);
              setSelectedText("");
              window.getSelection()?.removeAllRanges();
            }}
            className="bg-[#C98A4A] px-4 py-1.5 text-xs font-bold text-[#090909] hover:brightness-110"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
