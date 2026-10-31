"use client";

import React, { useState } from "react";
import { Send, Mic, MicOff, Volume2 } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import ShapeGrid from "@/animations/ShapeGrid";
import { useInvestraStore } from "@/store/useInvestraStore";
import { DecryptText, Typewriter } from "@investra/animations";

export default function AITutorPage() {
  const { aiMessages, askAITutor, salary, monthlySip, emotionalScore } =
    useInvestraStore();
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const timer = setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [aiMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    askAITutor(input.trim(), "BLOOMBERG TERMINAL RAG");
    setInput("");
  };

  const handleVoiceMic = () => {
    if (typeof window === "undefined") return;
    const SpeechRec =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      setInput("Explain PE ratio and risk concentration in my portfolio");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const rec = new SpeechRec();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setIsListening(true);
    rec.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (transcript) {
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      }
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
  };

  const speakReply = async (id: string, text: string) => {
    setSpeakingId(id);
    try {
      const res = await fetch("/api/voice/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
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
      // Fallback
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.onend = () => setSpeakingId(null);
      window.speechSynthesis.speak(u);
    } else {
      setSpeakingId(null);
    }
  };

  return (
    <DashboardShell>
      <div className="relative overflow-hidden border border-[#C98A4A]/40 bg-[#0B0B0B] p-6 min-h-[75vh] flex flex-col justify-between font-mono">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <ShapeGrid
            shape="square"
            direction="diagonal"
            lineColor="#2a221e"
            hoverColor="#C98A4A"
            hoverFillColor="#F2D7B6"
            fillOpacity={0.15}
            cellSize={40}
            speed={0.5}
          />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-[#C98A4A]">
                <DecryptText text="BLOOMBERG TERMINAL AI // VOICE & PORTFOLIO RAG ACTIVE" />
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-[#FAF7F5]">
                Ask About{" "}
                <Typewriter
                  words={[
                    "Your TCS & HDFC Bank Holdings",
                    "Your ₹5,000 Monthly SIP Allocation",
                    "2,640 NSE Listed Companies",
                    "Stop-Loss & Position Sizing",
                  ]}
                  className="text-[#F2D7B6]"
                />
              </h1>
            </div>
            <div className="text-xs text-[#3EDC81]">
              Salary ₹{(salary / 1000).toFixed(0)}k • SIP ₹
              {(monthlySip / 1000).toFixed(0)}k • Psych {emotionalScore}/100
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Why did TCS move today?",
              "Explain PE ratio using my portfolio",
              "Should I average my holdings now?",
              "Audit my risk for this month's ₹5,000 SIP",
            ].map((q) => (
              <button
                key={q}
                onClick={() => askAITutor(q, "BLOOMBERG AI QUERY")}
                className="border border-[#C98A4A]/40 bg-[#181614] px-3.5 py-1.5 text-xs font-bold text-[#F2D7B6] hover:border-[#C98A4A]"
              >
                {q}
              </button>
            ))}
          </div>

          <div
            ref={messagesContainerRef}
            className="max-h-[460px] space-y-3 overflow-y-auto pr-2 pt-2 scroll-smooth"
          >
            {aiMessages.map((m) => (
              <div
                key={m.id}
                className={`border p-4 text-xs leading-relaxed ${
                  m.role === "assistant"
                    ? "border-[#C98A4A]/35 bg-[#111111]/95 text-[#FAF7F5]"
                    : "ml-auto max-w-xl border-white/15 bg-[#211C19] text-[#F2D7B6]"
                }`}
              >
                <div className="mb-1 flex items-center justify-between text-[10px] uppercase text-[#C98A4A]">
                  <span>{m.contextBadge || m.role}</span>
                  {m.role === "assistant" && (
                    <button
                      onClick={() => speakReply(m.id, m.content)}
                      className="inline-flex items-center gap-1 text-[#3EDC81] hover:underline"
                    >
                      <Volume2 className="size-3.5" />
                      {speakingId === m.id
                        ? "Speaking (Deepgram)..."
                        : "Listen (Voice)"}
                    </button>
                  )}
                </div>
                <p className="whitespace-pre-line">{m.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Form with Microphone Input */}
        <form onSubmit={handleSubmit} className="relative z-10 mt-6 flex gap-2">
          <button
            type="button"
            onClick={handleVoiceMic}
            title="Voice Microphone Input"
            className={`flex items-center gap-1.5 border px-4 py-3 text-xs font-bold transition ${
              isListening
                ? "border-[#FF5C5C] bg-[#FF5C5C]/20 text-[#FF5C5C] animate-pulse"
                : "border-[#C98A4A]/50 bg-[#181614] text-[#F2D7B6] hover:border-[#C98A4A]"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="size-4" /> Listening...
              </>
            ) : (
              <>
                <Mic className="size-4 text-[#C98A4A]" /> Mic
              </>
            )}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isListening
                ? "Speak your question into the microphone..."
                : "Ask Bloomberg AI or tap Mic to speak..."
            }
            className="flex-1 border border-[#C98A4A]/40 bg-[#111111]/95 px-4 py-3 text-xs text-[#FAF7F5] placeholder-[#7A7471] focus:border-[#C98A4A] focus:outline-none"
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#C98A4A] px-6 py-3 text-xs font-extrabold uppercase text-[#090909] hover:brightness-110"
          >
            <Send className="size-4" /> Ask AI
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}
