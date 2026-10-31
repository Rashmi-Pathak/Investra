"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Volume2,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useInvestraStore } from "@/store/useInvestraStore";
import type { EnrichedNewsArticle } from "@/app/api/news/live/route";

export default function LiveNewsPage() {
  const [articles, setArticles] = useState<EnrichedNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const askAITutor = useInvestraStore((s) => s.askAITutor);

  useEffect(() => {
    fetch("/api/news/live")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.articles)) setArticles(d.articles);
      })
      .finally(() => setLoading(false));
  }, []);

  const playVoiceSummary = async (article: EnrichedNewsArticle) => {
    setSpeakingId(article.id);
    const textToSpeak = `${article.title}. Plain English meaning: ${article.plainEnglish}. Beginner takeaway: ${article.beginnerAdvice}`;
    try {
      const res = await fetch("/api/voice/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak }),
      });
      if (res.headers.get("Content-Type")?.includes("audio/mpeg")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.onended = () => setSpeakingId(null);
        await audio.play();
        return;
      }
    } catch {
      // Fallback to Web Speech synthesis
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(textToSpeak);
      utter.onend = () => setSpeakingId(null);
      window.speechSynthesis.speak(utter);
    } else {
      setSpeakingId(null);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[#C98A4A]/40 bg-[#181614] p-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C98A4A]">
              LIVE GNEWS + FINNHUB + GROQ AI INTELLIGENCE
            </span>
            <h1 className="mt-1 text-2xl font-bold text-[#FAF7F5]">
              AI Market News & Editorial Impact Desk
            </h1>
            <p className="mt-1 text-xs text-[#B9B4B1]">
              Every live headline includes photo journalism, Plain-English translation, Sector Impact, Historical Context, and Deepgram Voice Audio.
            </p>
          </div>
          <span className="border border-[#3EDC81]/40 bg-[#3EDC81]/10 px-3.5 py-1.5 text-xs font-semibold text-[#3EDC81]">
            GNEWS + FINNHUB LIVE
          </span>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-96 border border-white/[0.08] bg-[#181614] p-6 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {articles.map((art) => (
              <div
                key={art.id}
                className="investra-card overflow-hidden flex flex-col justify-between"
              >
                {/* News Editorial Photo Banner */}
                <div className="relative h-52 w-full overflow-hidden border-b border-white/10 bg-[#0D0D0D]">
                  <img
                    src={
                      art.imageUrl ||
                      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={art.title}
                    className="h-full w-full object-cover opacity-85 transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="border border-white/20 bg-[#090909]/90 px-2.5 py-1 text-[10px] font-bold text-[#D8A56D]">
                      {art.source} • {art.publishedAt}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 border px-2.5 py-1 text-[10px] font-bold ${
                        art.sentiment === "POSITIVE"
                          ? "border-[#3EDC81]/50 bg-[#090909]/90 text-[#3EDC81]"
                          : art.sentiment === "NEGATIVE"
                          ? "border-[#FF5C5C]/50 bg-[#090909]/90 text-[#FF5C5C]"
                          : "border-[#FFC857]/50 bg-[#090909]/90 text-[#FFC857]"
                      }`}
                    >
                      {art.sentiment === "POSITIVE" ? (
                        <TrendingUp className="size-3" />
                      ) : (
                        <TrendingDown className="size-3" />
                      )}
                      {art.sentiment} • Impact {art.impactScore}/10
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h2 className="text-lg font-bold leading-snug text-[#FAF7F5]">
                      {art.title}
                    </h2>

                    <div className="border border-[#C98A4A]/30 bg-[#111111] p-3.5 text-xs space-y-1.5">
                      <p className="text-[#FAF7F5]">
                        <strong className="text-[#C98A4A]">
                          Plain-English Meaning:{" "}
                        </strong>
                        {art.plainEnglish}
                      </p>
                      <p className="text-[#B9B4B1]">
                        <strong className="text-[#D8A56D]">
                          Historical Context:{" "}
                        </strong>
                        {art.historicalContext}
                      </p>
                      <p className="text-[#3EDC81]">
                        <strong>Should Beginners Worry? </strong>
                        {art.beginnerAdvice}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {art.affectedSectors.map((sec) => (
                        <span
                          key={sec}
                          className="border border-white/10 bg-[#211C19] px-2.5 py-0.5 text-[10px] text-[#F2D7B6]"
                        >
                          Sector: {sec}
                        </span>
                      ))}
                      {art.affectedCompanies.map((sym) => (
                        <Link
                          key={sym}
                          href={`/company/${sym}`}
                          className="border border-[#C98A4A]/40 bg-[#C98A4A]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#C98A4A] hover:bg-[#C98A4A] hover:text-[#090909]"
                        >
                          {sym} →
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playVoiceSummary(art)}
                        className="inline-flex items-center gap-1.5 border border-[#C98A4A]/40 bg-[#211C19] px-3 py-1.5 text-xs font-semibold text-[#F2D7B6] hover:border-[#C98A4A]"
                      >
                        <Volume2 className="size-3.5 text-[#C98A4A]" />
                        {speakingId === art.id
                          ? "Speaking (Deepgram)..."
                          : "Listen (AI Voice)"}
                      </button>
                      <button
                        onClick={() =>
                          askAITutor(
                            `How does "${art.title}" impact NSE equities like ${art.affectedCompanies.join(
                              ", "
                            )}?`,
                            "LIVE NEWS AI IMPACT"
                          )
                        }
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#C98A4A] to-[#D8A56D] px-3 py-1.5 text-xs font-bold text-[#090909]"
                      >
                        <Sparkles className="size-3.5" /> Ask AI Impact
                      </button>
                    </div>

                    <a
                      href={art.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#7A7471] hover:text-[#FAF7F5]"
                    >
                      Source <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
