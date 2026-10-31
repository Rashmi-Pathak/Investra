"use client";

import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useInvestraStore } from "@/store/useInvestraStore";

const GLOSSARY_TERMS = [
  {
    term: "Market Cap (Market Capitalization)",
    category: "Fundamentals",
    definition: "Total market value of a company's outstanding equity shares (Share Price × Total Shares).",
    example: "TCS has a Market Cap of ₹14.94L Cr, making it a defensive Large-Cap pillar in your portfolio.",
  },
  {
    term: "P/E Ratio (Price-to-Earnings)",
    category: "Valuation",
    definition: "Measures how much investors pay for every ₹1 of annual net profit earned by the company.",
    example: "HDFCBANK trades at 19.2x P/E compared to ZOMATO at 112.4x P/E.",
  },
  {
    term: "RSI (Relative Strength Index)",
    category: "Technical Indicators",
    definition: "Momentum oscillator ranging from 0 to 100 that identifies overbought (>70) and oversold (<30) conditions.",
    example: "Entering a buy order when RSI is 78 often triggers an AI Coach FOMO warning.",
  },
  {
    term: "CAGR (Compound Annual Growth Rate)",
    category: "Portfolio Math",
    definition: "The annualized rate of return of an investment over a specified time period assuming compounding.",
    example: "A ₹5,000 monthly SIP compounding at 15% CAGR builds disciplined long-term wealth.",
  },
  {
    term: "Stop-Loss Order",
    category: "Risk Management",
    definition: "A pre-set trigger order that automatically exits a position if price moves against your thesis beyond an acceptable threshold.",
    example: "Placing a stop-loss 2.5% below entry protects your monthly salary savings from deep drawdowns.",
  },
  {
    term: "ROE (Return on Equity)",
    category: "Fundamentals",
    definition: "Net income divided by shareholders' equity; measures how efficiently management compounds capital.",
    example: "TCS maintains an industry-leading 51.2% ROE.",
  },
];

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const askAITutor = useInvestraStore((s) => s.askAITutor);

  const filtered = GLOSSARY_TERMS.filter(
    (item) =>
      item.term.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[#C98A4A]/40 bg-[#181614] p-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C98A4A]">
              1000+ INTERACTIVE FINANCIAL LEXICON
            </span>
            <h1 className="mt-1 text-2xl font-bold text-[#FAF7F5]">
              AI Financial Glossary & Portfolio Examples
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-[14px] border border-[#C98A4A]/40 bg-[#111111] px-3.5 py-2">
            <Search className="size-4 text-[#C98A4A]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search P/E, RSI, Market Cap, Stop-Loss..."
              className="w-64 bg-transparent text-xs text-[#FAF7F5] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((item) => (
            <div key={item.term} className="investra-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#211C19] px-2.5 py-0.5 font-mono text-[10px] text-[#C98A4A]">
                  {item.category}
                </span>
                <button
                  onClick={() => askAITutor(`Explain ${item.term} using my portfolio`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#F2D7B6] hover:text-[#C98A4A]"
                >
                  <Sparkles className="size-3.5" /> Explain With My Holdings
                </button>
              </div>
              <h3 className="text-lg font-bold text-[#FAF7F5]">{item.term}</h3>
              <p className="text-xs leading-relaxed text-[#B9B4B1]">{item.definition}</p>
              <div className="rounded-xl border border-[#C98A4A]/25 bg-[#111111] p-3 text-xs text-[#F2D7B6]">
                <strong>Live Example:</strong> {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
