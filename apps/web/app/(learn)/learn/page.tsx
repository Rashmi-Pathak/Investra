"use client";

import React, { useEffect, useState } from "react";
import {
  Trophy,
  Flame,
  Eye,
  ShieldAlert,
  Sliders,
  BookOpen,
  Volume2,
  Stethoscope,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { HighchartsStockChart } from "@/components/HighchartsStockChart";
import { Typewriter } from "@investra/animations";
import { useInvestraStore } from "@/store/useInvestraStore";
import { LEARN_SECTIONS_DATA, LearnQuestion } from "@/lib/learnCurriculumData";

type LabTabId =
  | "CURRICULUM"
  | "BLIND_CHART"
  | "FORENSIC_XRAY"
  | "RISK_SIMULATOR"
  | "EARNINGS_AUDIO"
  | "PORTFOLIO_DOCTOR"
  | "OPENING_BELL_DRILL";

const SKILL_MODULES = [
  {
    id: "m1",
    title: "01. Real-Life Salary Psychology vs Fake ₹10L",
    xp: 200,
    badge: "FOUNDATION",
    lesson:
      "Why risking ₹5,000 earned from your ₹50,000 salary activates loss-aversion discipline that fake ₹10L simulators completely miss.",
    question:
      "What is the institutional golden rule for maximum capital risk on a single trade?",
    options: [
      "1% to 2% of total portfolio capital (defined by Stop-Loss distance)",
      "50% of your monthly salary on a single breakout candle",
      "100% intraday MIS leverage without a stop-loss",
    ],
    correct: 0,
    explanation:
      "Professional risk managers cap single-trade loss at 1%–2% of total equity so even 5 consecutive stop-outs only draw down the account by ~6–8%.",
  },
  {
    id: "m2",
    title: "02. Candlesticks, Volume & Institutional Absorption",
    xp: 250,
    badge: "TECHNICAL LAB",
    lesson:
      "A long lower wick at a multi-week support zone accompanied by 2.5x average volume signals institutional limit buy orders absorbing retail panic selling.",
    question:
      "What does a high-volume green Hammer candle at a major support zone indicate?",
    options: [
      "Institutional buyers rejected lower prices and absorbed seller supply",
      "Guaranteed upper circuit tomorrow with zero downside risk",
      "The company's Price-to-Book ratio dropped to zero",
    ],
    correct: 0,
    explanation:
      "Volume validates price: a long lower shadow on high volume proves limit buyers stepped in aggressively at support.",
  },
  {
    id: "m3",
    title: "03. Fundamental Forensics: P/E Traps, ROE & Promoter Pledge",
    xp: 300,
    badge: "FUNDAMENTALS",
    lesson:
      "A stock trading at P/E 9x is NOT automatically cheap if Promoter Pledging is >50% and Operating Cash Flow (OCF) is negative. Quality compounders pair high ROE (>20%) with strong free cash flow.",
    question:
      "Which combination is the biggest fundamental red flag for a beginner investor?",
    options: [
      "Low P/E (8x) + 65% Promoter Shares Pledged + Negative Operating Cash Flow",
      "P/E 26x + Zero Debt + 34% Return on Equity (ROE)",
      "P/B 2.8x on a private bank with 17% ROE and <1% Net NPA",
    ],
    correct: 0,
    explanation:
      "High promoter pledging creates forced-selling cascades during market corrections—making a low P/E a classic 'Value Trap'.",
  },
  {
    id: "m4",
    title: "04. Order Book Mechanics: Market vs Limit & CNC vs MIS",
    xp: 250,
    badge: "EXECUTION",
    lesson:
      "Market orders cross the bid-ask spread immediately (paying slippage), whereas Limit orders sit in the L2 book at your exact price or better. CNC settles shares to your Demat; MIS auto-squares off at 3:20 PM.",
    question:
      "When buying a mid-cap stock during the volatile 9:15 AM opening bell, which order type protects you from price slippage?",
    options: [
      "LIMIT Order with CNC (Delivery) product type",
      "MARKET Order with 5x MIS Intraday leverage",
      "Chasing the ask price without checking L2 Market Depth",
    ],
    correct: 0,
    explanation:
      "Limit orders guarantee you never pay above your maximum specified entry price during wide opening spreads.",
  },
];

const BLIND_CHALLENGES = [
  {
    id: "c1",
    title: "Mystery Setup #1: High-Volume Breakout After 6-Week Consolidation",
    basePrice: 1680,
    visibleCandles: 45,
    clue: "Volume expanded 2.8x above the 20-day average while price closed above resistance with higher lows.",
    choices: [
      {
        label: "Accumulate with Stop-Loss 3% below breakout base",
        correct: true,
        outcome:
          "✓ Correct! This was HDFCBANK breaking out of its institutional accumulation zone (+14.2% over the next 30 sessions).",
      },
      {
        label: "Go 100% All-In without a Stop-Loss",
        correct: false,
        outcome:
          "⚠ Dangerous! Even high-probability breakouts retest the neckline 40% of the time—always size with a Stop-Loss.",
      },
      {
        label: "Short sell immediately because green candles look high",
        correct: false,
        outcome:
          "✗ Incorrect. Shorting high-volume institutional breakouts fights momentum.",
      },
    ],
  },
  {
    id: "c2",
    title: "Mystery Setup #2: Parabolic Low-Volume Retail Exhaustion Spike",
    basePrice: 617,
    visibleCandles: 38,
    clue: "Price gapped up 4 days in a row on shrinking volume while RSI hit 84 (extreme overbought).",
    choices: [
      {
        label: "Wait for a pullback to the 20-DMA support zone before entering",
        correct: true,
        outcome:
          "✓ Disciplined Call! Chasing parabolic candles without volume support leads to instant -9% mean-reversion drawdowns.",
      },
      {
        label: "FOMO Buy at the top of the green wick",
        correct: false,
        outcome:
          "✗ FOMO Trap! Buying extended candles far above support gives you a terrible 1:0.3 Risk-Reward ratio.",
      },
    ],
  },
];

export default function LearnPage() {
  const { xp, streakDays, addXp } = useInvestraStore();

  const [activeLab, setActiveLab] = useState<LabTabId>("CURRICULUM");

  // Lab 1: Curriculum state
  const [selectedMod, setSelectedMod] = useState(SKILL_MODULES[0]);
  const [sectionCaseIdx, setSectionCaseIdx] = useState<Record<string, number>>({
    CURRICULUM: 0,
    BLIND_CHART: 0,
    FORENSIC_XRAY: 0,
    RISK_SIMULATOR: 0,
    EARNINGS_AUDIO: 0,
    PORTFOLIO_DOCTOR: 0,
    OPENING_BELL_DRILL: 0,
  });
  const [sectionCaseAns, setSectionCaseAns] = useState<Record<string, number | null>>({});
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Lab 2: Blind Chart Detective state
  const [blindIdx, setBlindIdx] = useState(0);
  const [blindChoiceIdx, setBlindChoiceIdx] = useState<number | null>(null);

  // Lab 3: Balance Sheet Forensic X-Ray state
  const [forensicPick, setForensicPick] = useState<"A" | "B" | null>(null);

  // Lab 4: Risk Survival Simulator state
  const [riskPerTradePct, setRiskPerTradePct] = useState(2);
  const [losingStreakLength, setLosingStreakLength] = useState(5);

  // Lab 5 (Idea A): Earnings Call Trap Audio Simulator state
  const [isPlayingEarningsAudio, setIsPlayingEarningsAudio] = useState(false);
  const [earningsDecision, setEarningsDecision] = useState<
    "GAP_UP" | "GAP_DOWN" | "FLAT" | null
  >(null);

  // Lab 6 (Idea B): Fix My Broken Portfolio Doctor Mode state
  const [doctorMoves, setDoctorMoves] = useState<{
    cutPledgedPenny: boolean;
    attachStopLosses: boolean;
    diversifyAndKeepCash: boolean;
  }>({
    cutPledgedPenny: false,
    attachStopLosses: false,
    diversifyAndKeepCash: false,
  });

  // Lab 7 (Idea C): 9:15 AM Opening Bell Order-Book Drill state
  const [bellTimer, setBellTimer] = useState(60);
  const [bellTimerActive, setBellTimerActive] = useState(false);
  const [drillOrderType, setDrillOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [drillProduct, setDrillProduct] = useState<"MIS" | "CNC">("MIS");
  const [drillLimitPrice, setDrillLimitPrice] = useState(346.5);
  const [drillStopLoss, setDrillStopLoss] = useState(338.0);
  const [drillSubmitted, setDrillSubmitted] = useState(false);

  useEffect(() => {
    if (!bellTimerActive || bellTimer <= 0) return;
    const t = setInterval(() => {
      setBellTimer((s) => {
        if (s <= 1) {
          setBellTimerActive(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [bellTimerActive, bellTimer]);

  const playCeoEarningsAudio = async () => {
    const transcript =
      "Good evening investors. In Quarter 3, our headline revenue grew 22 percent year-on-year to 4,800 crore rupees. However, raw material inflation compressed our EBITDA operating margins by 310 basis points, and due to European client delays, we are revising our full-year revenue guidance downward by 4 percent.";
    setIsPlayingEarningsAudio(true);
    try {
      const res = await fetch("/api/voice/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      });
      if (res.headers.get("Content-Type")?.includes("audio/mpeg")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.onended = () => setIsPlayingEarningsAudio(false);
        await audio.play();
        return;
      }
    } catch {
      // Fallback to Web Speech
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(transcript);
      utter.onend = () => setIsPlayingEarningsAudio(false);
      window.speechSynthesis.speak(utter);
    } else {
      setIsPlayingEarningsAudio(false);
    }
  };

  const remainingCapitalAfterStreak = Math.round(
    100000 * Math.pow(1 - riskPerTradePct / 100, losingStreakLength)
  );
  const drawdownPct = (
    ((100000 - remainingCapitalAfterStreak) / 100000) *
    100
  ).toFixed(1);
  const gainNeededToRecover = (
    (100000 / Math.max(1, remainingCapitalAfterStreak) - 1) *
    100
  ).toFixed(1);

  const doctorScore =
    34 +
    (doctorMoves.cutPledgedPenny ? 22 : 0) +
    (doctorMoves.attachStopLosses ? 20 : 0) +
    (doctorMoves.diversifyAndKeepCash ? 18 : 0);

  const handleAnswerQuiz = (idx: number) => {
    setSelectedAns(idx);
    if (
      idx === selectedMod.correct &&
      !completedIds.includes(selectedMod.id)
    ) {
      setCompletedIds((prev) => [...prev, selectedMod.id]);
      addXp(selectedMod.xp);
    }
  };

  const activeBlind = BLIND_CHALLENGES[blindIdx];

  return (
    <DashboardShell>
      <div className="space-y-6 font-mono">
        {/* Top Interactive Flight Simulator Header */}
        <div className="border border-[#C98A4A]/40 bg-[#141210] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C98A4A]">
                INVESTRA INTERACTIVE LEARNING FLIGHT SIMULATOR (7 LABS)
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-[#FAF7F5] sm:text-3xl">
                Learn by Doing:{" "}
                <Typewriter
                  words={[
                    "Earnings Call Audio Trap",
                    "Portfolio Doctor Mode",
                    "9:15 AM Order-Book Drill",
                    "Blind Chart Detective",
                  ]}
                  className="text-[#F2D7B6]"
                />
              </h1>
              <p className="mt-1 text-xs text-[#B9B4B1]">
                7 hands-on financial simulators designed to build real-world market intuition before you risk real money.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 border border-[#FFC857]/40 bg-[#211C19] px-3.5 py-2 text-[#FFC857]">
                <Flame className="size-4 fill-current" /> {streakDays} Day Streak
              </span>
              <span className="flex items-center gap-1.5 border border-[#3EDC81]/40 bg-[#211C19] px-3.5 py-2 font-bold text-[#3EDC81]">
                <Trophy className="size-4" /> {xp} Total XP
              </span>
            </div>
          </div>

          {/* 7 Interactive Lab Tabs */}
          <div className="mt-6 grid grid-cols-2 gap-2 border-t border-white/10 pt-5 sm:grid-cols-3 lg:grid-cols-7">
            {[
              {
                id: "CURRICULUM",
                label: "1. Psychology",
                sub: "50 Real Cases",
                icon: BookOpen,
              },
              {
                id: "BLIND_CHART",
                label: "2. Candlesticks",
                sub: "50 Chart Cases",
                icon: Eye,
              },
              {
                id: "FORENSIC_XRAY",
                label: "3. Forensics",
                sub: "50 X-Ray Cases",
                icon: ShieldAlert,
              },
              {
                id: "RISK_SIMULATOR",
                label: "4. Order Books",
                sub: "50 Math Cases",
                icon: Sliders,
              },
              {
                id: "EARNINGS_AUDIO",
                label: "5. Earnings Trap",
                sub: "50 Con-Calls",
                icon: Volume2,
              },
              {
                id: "PORTFOLIO_DOCTOR",
                label: "6. Doctor Mode",
                sub: "50 Fix Cases",
                icon: Stethoscope,
              },
              {
                id: "OPENING_BELL_DRILL",
                label: "7. 9:15 AM Bell",
                sub: "50 L2 Drills",
                icon: Clock,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeLab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLab(tab.id as LabTabId)}
                  className={`border p-3 text-left transition ${
                    active
                      ? "border-[#C98A4A] bg-[#211C19]"
                      : "border-white/10 bg-[#0B0B0B] hover:border-[#C98A4A]/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#FAF7F5]">
                      {tab.label}
                    </span>
                    <Icon className="size-3.5 text-[#C98A4A]" />
                  </div>
                  <p className="mt-1 text-[9px] text-[#7A7471]">{tab.sub}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 50 INTERACTIVE CASES PER SECTION (ALL 7 SECTIONS) */}
        <SectionCasesRunner activeLab={activeLab} xp={xp} addXp={addXp} />

        {/* LAB 1: DUOLINGO-STYLE SKILL TREE & INTERACTIVE QUIZZES */}
        {activeLab === "CURRICULUM" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="investra-card lg:col-span-5 p-6 space-y-3">
              <h2 className="text-base font-bold text-[#FAF7F5]">
                Interactive Mastery Roadmap
              </h2>
              {SKILL_MODULES.map((m) => {
                const done = completedIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMod(m);
                      setSelectedAns(null);
                    }}
                    className={`w-full border p-4 text-left transition ${
                      selectedMod.id === m.id
                        ? "border-[#C98A4A] bg-[#211C19]"
                        : "border-white/[0.08] bg-[#111111] hover:border-[#C98A4A]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase text-[#C98A4A]">
                        {m.badge} • +{m.xp} XP
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          done ? "text-[#3EDC81]" : "text-[#D8A56D]"
                        }`}
                      >
                        {done ? "✓ COMPLETED" : "UNLOCKED"}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-bold text-[#FAF7F5]">
                      {m.title}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="investra-card lg:col-span-7 p-6 space-y-5">
              <div>
                <span className="text-xs text-[#D8A56D]">
                  MODULE BRIEFING • {selectedMod.badge}
                </span>
                <h2 className="mt-1 text-xl font-bold text-[#FAF7F5]">
                  {selectedMod.title}
                </h2>
                <p className="mt-3 border border-white/10 bg-[#111111] p-4 text-xs leading-relaxed text-[#B9B4B1]">
                  {selectedMod.lesson}
                </p>
              </div>

              <div className="border border-[#C98A4A]/40 bg-[#181614] p-5 space-y-3">
                <p className="text-xs font-bold uppercase text-[#C98A4A]">
                  DECISION CHECKPOINT (+{selectedMod.xp} XP)
                </p>
                <h3 className="text-sm font-bold text-[#FAF7F5]">
                  {selectedMod.question}
                </h3>
                <div className="space-y-2">
                  {selectedMod.options.map((opt, idx) => {
                    const chosen = selectedAns === idx;
                    const isCorrect = idx === selectedMod.correct;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswerQuiz(idx)}
                        className={`w-full border px-4 py-3 text-left text-xs font-medium transition ${
                          chosen
                            ? isCorrect
                              ? "border-[#3EDC81] bg-[#3EDC81]/15 text-[#3EDC81]"
                              : "border-[#FF5C5C] bg-[#FF5C5C]/15 text-[#FF5C5C]"
                            : "border-white/10 bg-[#0E0E0E] text-[#FAF7F5] hover:border-[#C98A4A]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {selectedAns !== null && (
                  <div className="border border-white/10 bg-[#090909] p-3 text-xs">
                    <p
                      className={`font-bold ${
                        selectedAns === selectedMod.correct
                          ? "text-[#3EDC81]"
                          : "text-[#FF5C5C]"
                      }`}
                    >
                      {selectedAns === selectedMod.correct
                        ? `✓ Correct! +${selectedMod.xp} XP awarded.`
                        : "✗ Not quite — review the institutional logic below:"}
                    </p>
                    <p className="mt-1 text-[#B9B4B1]">
                      {selectedMod.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAB 2 (IDEA A): EARNINGS CALL TRAP AUDIO SIMULATOR */}
        {activeLab === "EARNINGS_AUDIO" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="investra-card lg:col-span-7 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase text-[#C98A4A]">
                    IDEA A • CEO EARNINGS CALL AUDIO SIMULATOR
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-[#FAF7F5]">
                    Decode the Q3 Earnings Call Before the 9:15 AM Bell
                  </h2>
                </div>
                <button
                  onClick={playCeoEarningsAudio}
                  className="inline-flex items-center gap-2 bg-[#C98A4A] px-4 py-2.5 text-xs font-extrabold text-[#090909] hover:brightness-110"
                >
                  <Volume2 className="size-4" />
                  {isPlayingEarningsAudio
                    ? "Playing CEO Audio..."
                    : "▶ Listen to 20s CEO Earnings Snippet"}
                </button>
              </div>

              <div className="border border-[#C98A4A]/30 bg-[#111111] p-4 text-xs leading-relaxed text-[#F2D7B6]">
                <span className="block text-[10px] uppercase text-[#C98A4A] mb-1">
                  LIVE TRANSCRIPT (CEO COMMENTARY):
                </span>
                &ldquo;Good evening investors. In Q3, our headline revenue grew{" "}
                <strong className="text-[#3EDC81]">+22% YoY to ₹4,800 Cr</strong>.
                However, raw material inflation compressed our{" "}
                <strong className="text-[#FF5C5C]">
                  EBITDA operating margins by -310 bps
                </strong>
                , and due to European client delays, we are{" "}
                <strong className="text-[#FF5C5C]">
                  revising our full-year FY revenue guidance downward by -4%
                </strong>
                .&rdquo;
              </div>

              {/* Quarterly Results Table */}
              <div className="overflow-x-auto border border-white/10 bg-[#0B0B0B]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#141210] text-[10px] uppercase text-[#D8A56D]">
                      <th className="p-3">METRIC</th>
                      <th className="p-3">REPORTED Q3</th>
                      <th className="p-3">STREET ESTIMATE</th>
                      <th className="p-3">INSTITUTIONAL SIGNAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3 font-bold text-[#FAF7F5]">
                        Top-Line Revenue
                      </td>
                      <td className="p-3 text-[#3EDC81]">₹4,800 Cr (+22%)</td>
                      <td className="p-3 text-[#B9B4B1]">₹4,710 Cr</td>
                      <td className="p-3 text-[#3EDC81]">Beat by +1.9%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#FAF7F5]">
                        Operating Margin (EBITDA)
                      </td>
                      <td className="p-3 text-[#FF5C5C]">14.1% (-310 bps)</td>
                      <td className="p-3 text-[#B9B4B1]">17.2%</td>
                      <td className="p-3 text-[#FF5C5C]">Severe Margin Miss</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#FAF7F5]">
                        Forward FY Guidance
                      </td>
                      <td className="p-3 text-[#FF5C5C]">Cut by -4.0%</td>
                      <td className="p-3 text-[#B9B4B1]">+2.0% Raise</td>
                      <td className="p-3 text-[#FF5C5C]">
                        Forward Multiple De-rating
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="investra-card lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-[#C98A4A]">
                  PREDICT THE 9:15 AM OPENING REACTION (+250 XP)
                </span>
                <p className="text-xs text-[#B9B4B1]">
                  Newspaper headlines say: <strong>&ldquo;Q3 Revenue Jumps 22%!&rdquo;</strong>{" "}
                  Retail traders are queuing buy orders. Based on the audio & table, what will happen at 9:15 AM?
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      id: "GAP_UP",
                      label: "Stock Gaps Up +7% because Revenue grew +22% YoY",
                    },
                    {
                      id: "GAP_DOWN",
                      label:
                        "Stock Gaps Down -8% (Sell-the-News Trap: Margin miss + Forward guidance cut)",
                    },
                    {
                      id: "FLAT",
                      label: "Stock stays 0.0% flat all day with low volume",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setEarningsDecision(opt.id as any);
                        if (opt.id === "GAP_DOWN") addXp(250);
                      }}
                      className={`w-full border p-3.5 text-left text-xs font-bold transition ${
                        earningsDecision === opt.id
                          ? opt.id === "GAP_DOWN"
                            ? "border-[#3EDC81] bg-[#3EDC81]/15 text-[#3EDC81]"
                            : "border-[#FF5C5C] bg-[#FF5C5C]/15 text-[#FF5C5C]"
                          : "border-white/15 bg-[#121212] text-[#FAF7F5] hover:border-[#C98A4A]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {earningsDecision && (
                  <div className="border border-white/15 bg-[#090909] p-4 text-xs leading-relaxed">
                    {earningsDecision === "GAP_DOWN" ? (
                      <p className="text-[#3EDC81] font-bold">
                        ✓ Institutional Mastery (+250 XP)! Markets are forward-looking: institutional algorithms sell immediately when Operating Margins compress (-310 bps) and Forward Guidance is cut (-4%), trapping retail buyers who only read the "+22% Revenue" headline!
                      </p>
                    ) : (
                      <p className="text-[#FF5C5C] font-bold">
                        ✗ You fell into the Headline Trap! Even though past Q3 revenue grew +22%, institutions price stocks on future cash flows. A -310 bps margin drop + -4% guidance cut triggers heavy FII selling at 9:15 AM.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAB 3 (IDEA B): FIX MY BROKEN PORTFOLIO DOCTOR MODE */}
        {activeLab === "PORTFOLIO_DOCTOR" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="investra-card lg:col-span-7 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase text-[#C98A4A]">
                    IDEA B • PORTFOLIO DOCTOR SURGERY LAB
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-[#FAF7F5]">
                    Patient Case: Beginner Retail Portfolio in Critical Danger
                  </h2>
                </div>
                <div
                  className={`border px-4 py-2 text-sm font-extrabold ${
                    doctorScore >= 90
                      ? "border-[#3EDC81] bg-[#3EDC81]/15 text-[#3EDC81]"
                      : "border-[#FF5C5C] bg-[#FF5C5C]/15 text-[#FF5C5C]"
                  }`}
                >
                  AI Safety Score: {doctorScore} / 100
                </div>
              </div>

              {/* Broken vs Rebalanced Portfolio Holdings Preview */}
              <div className="overflow-x-auto border border-white/10 bg-[#0B0B0B]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#141210] text-[10px] uppercase text-[#D8A56D]">
                      <th className="p-3">HOLDING</th>
                      <th className="p-3">WEIGHT</th>
                      <th className="p-3">PRODUCT</th>
                      <th className="p-3">STOP-LOSS</th>
                      <th className="p-3">DIAGNOSIS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3 font-bold text-[#FAF7F5]">
                        {doctorMoves.cutPledgedPenny
                          ? "HDFCBANK + TCS (Core Compounders)"
                          : "12 Pledged Penny Infra Stocks"}
                      </td>
                      <td className="p-3">
                        {doctorMoves.diversifyAndKeepCash ? "45%" : "82%"}
                      </td>
                      <td className="p-3">
                        {doctorMoves.cutPledgedPenny ? "CNC" : "MIS 5x"}
                      </td>
                      <td className="p-3">
                        {doctorMoves.attachStopLosses ? (
                          <span className="text-[#3EDC81]">✓ -3.0% Active</span>
                        ) : (
                          <span className="text-[#FF5C5C]">None (Unhedged)</span>
                        )}
                      </td>
                      <td className="p-3">
                        {doctorMoves.cutPledgedPenny ? (
                          <span className="text-[#3EDC81]">Healthy ROE &gt;20%</span>
                        ) : (
                          <span className="text-[#FF5C5C]">
                            68% Promoter Pledged
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#FAF7F5]">
                        RELIANCE + BHARTIARTL
                      </td>
                      <td className="p-3">
                        {doctorMoves.diversifyAndKeepCash ? "35%" : "18%"}
                      </td>
                      <td className="p-3">CNC</td>
                      <td className="p-3">
                        {doctorMoves.attachStopLosses ? (
                          <span className="text-[#3EDC81]">✓ -2.8% Active</span>
                        ) : (
                          <span className="text-[#FF5C5C]">None</span>
                        )}
                      </td>
                      <td className="p-3 text-[#3EDC81]">Sector Leader</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#FAF7F5]">
                        Liquid Cash / SIP Reserve
                      </td>
                      <td className="p-3">
                        {doctorMoves.diversifyAndKeepCash ? (
                          <span className="text-[#3EDC81]">20% Cash</span>
                        ) : (
                          <span className="text-[#FF5C5C]">0% Cash</span>
                        )}
                      </td>
                      <td className="p-3">WALLET</td>
                      <td className="p-3">Protected</td>
                      <td className="p-3">
                        {doctorMoves.diversifyAndKeepCash
                          ? "Ready for market dips"
                          : "Zero liquidity"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="investra-card lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase text-[#C98A4A]">
                  EXECUTE 3 SURGICAL REBALANCING MOVES (TARGET: 90+ SCORE)
                </span>
                {[
                  {
                    key: "cutPledgedPenny" as const,
                    title:
                      "Move 1: Exit 12 Pledged Penny Stocks & Rotate to High-ROE Leaders",
                    impact: "+22 Safety Points",
                  },
                  {
                    key: "attachStopLosses" as const,
                    title:
                      "Move 2: Attach 3% Hard Stop-Loss Orders to Every Position",
                    impact: "+20 Safety Points",
                  },
                  {
                    key: "diversifyAndKeepCash" as const,
                    title:
                      "Move 3: Cap Single-Sector Weight <30% & Keep 20% Dry Cash Reserve",
                    impact: "+18 Safety Points",
                  },
                ].map((m) => {
                  const active = doctorMoves[m.key];
                  return (
                    <button
                      key={m.key}
                      onClick={() => {
                        const next = !doctorMoves[m.key];
                        setDoctorMoves((prev) => ({ ...prev, [m.key]: next }));
                        if (next) addXp(100);
                      }}
                      className={`w-full border p-3.5 text-left text-xs transition ${
                        active
                          ? "border-[#3EDC81] bg-[#3EDC81]/15 text-[#3EDC81]"
                          : "border-white/15 bg-[#121212] text-[#FAF7F5] hover:border-[#C98A4A]"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>
                          {active ? "✓ " : "○ "}
                          {m.title}
                        </span>
                      </div>
                      <span className="mt-1 block text-[10px] text-[#D8A56D]">
                        {m.impact}
                      </span>
                    </button>
                  );
                })}

                {doctorScore >= 90 && (
                  <div className="border border-[#3EDC81] bg-[#0E1B14] p-4 text-xs font-bold text-[#3EDC81]">
                    ✓ Portfolio Cured (Score: 94/100)! You eliminated promoter-pledge blowup risk, capped downside with stop-losses, and built a 20% cash buffer.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAB 4 (IDEA C): 9:15 AM OPENING BELL ORDER-BOOK DRILL */}
        {activeLab === "OPENING_BELL_DRILL" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="investra-card lg:col-span-7 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase text-[#C98A4A]">
                    IDEA C • 9:15 AM OPENING BELL L2 SLIPPAGE MINI-GAME
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-[#FAF7F5]">
                    Avoid the ₹8.80 Opening Bell Bid-Ask Spread Trap on JIOFIN
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="border border-[#FF5C5C]/50 bg-[#1A0E0E] px-3 py-1.5 text-xs font-extrabold text-[#FF5C5C]">
                    09:15:{bellTimer < 10 ? `0${bellTimer}` : bellTimer} AM
                  </span>
                  <button
                    onClick={() => {
                      setBellTimer(60);
                      setBellTimerActive(true);
                      setDrillSubmitted(false);
                    }}
                    className="bg-[#C98A4A] px-3 py-1.5 text-xs font-extrabold text-[#090909]"
                  >
                    Start 60s Drill
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#B9B4B1]">
                At 9:15 AM, market makers widen the L2 spread! Look at the live Order Book below: the **Best Bid is ₹346.00**, while the **Best Ask is ₹354.80** (a massive ₹8.80 gap!). If you place a **MARKET** buy order for 100 shares right now, you will overpay ₹880 in instant slippage!
              </p>

              {/* Simulated Wide 9:15 AM L2 Book */}
              <div className="grid grid-cols-2 gap-4 border border-white/10 bg-[#090B0A] p-4 text-xs">
                <div>
                  <div className="font-bold text-[#3EDC81] pb-2 border-b border-white/10">
                    BIDS (SUPPORT BUYERS)
                  </div>
                  {[
                    { price: "346.50", orders: 24, qty: 14200 },
                    { price: "346.00", orders: 19, qty: 9800 },
                    { price: "345.50", orders: 12, qty: 6400 },
                  ].map((b) => (
                    <div
                      key={b.price}
                      className="flex justify-between py-1.5 text-[#3EDC81]"
                    >
                      <span>₹{b.price}</span>
                      <span>{b.orders} ord</span>
                      <span>{b.qty} qty</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-[#FF5C5C] pb-2 border-b border-white/10">
                    ASKS (WIDE 9:15 AM SELLERS)
                  </div>
                  {[
                    { price: "354.80", orders: 8, qty: 2100 },
                    { price: "355.40", orders: 11, qty: 4500 },
                    { price: "356.00", orders: 15, qty: 8900 },
                  ].map((a) => (
                    <div
                      key={a.price}
                      className="flex justify-between py-1.5 text-[#FF5C5C]"
                    >
                      <span>₹{a.price}</span>
                      <span>{a.orders} ord</span>
                      <span>{a.qty} qty</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="investra-card lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-[#C98A4A]">
                  CONFIGURE ANTI-SLIPPAGE ORDER (100 SHARES JIOFIN)
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-[#7A7471]">
                      1. ORDER TYPE
                    </label>
                    <div className="mt-1 grid grid-cols-2 gap-1">
                      {(["MARKET", "LIMIT"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setDrillOrderType(t)}
                          className={`border py-2 font-bold ${
                            drillOrderType === t
                              ? "border-[#C98A4A] bg-[#C98A4A] text-[#090909]"
                              : "border-white/15 bg-[#121212] text-[#B9B4B1]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#7A7471]">
                      2. PRODUCT TYPE
                    </label>
                    <div className="mt-1 grid grid-cols-2 gap-1">
                      {(["MIS", "CNC"] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setDrillProduct(p)}
                          className={`border py-2 font-bold ${
                            drillProduct === p
                              ? "border-[#3EDC81] bg-[#3EDC81] text-[#090909]"
                              : "border-white/15 bg-[#121212] text-[#B9B4B1]"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-[#7A7471]">
                      LIMIT ENTRY PRICE (₹)
                    </label>
                    <input
                      type="number"
                      step={0.5}
                      value={drillLimitPrice}
                      onChange={(e) =>
                        setDrillLimitPrice(Number(e.target.value))
                      }
                      className="mt-1 w-full border border-white/15 bg-[#090909] px-3 py-2 font-bold text-[#FAF7F5]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7A7471]">
                      STOP-LOSS PRICE (₹)
                    </label>
                    <input
                      type="number"
                      step={0.5}
                      value={drillStopLoss}
                      onChange={(e) => setDrillStopLoss(Number(e.target.value))}
                      className="mt-1 w-full border border-white/15 bg-[#090909] px-3 py-2 font-bold text-[#FAF7F5]"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setDrillSubmitted(true);
                    if (
                      drillOrderType === "LIMIT" &&
                      drillProduct === "CNC" &&
                      drillLimitPrice <= 348
                    ) {
                      addXp(300);
                    }
                  }}
                  className="w-full bg-[#3EDC81] py-3 text-xs font-extrabold uppercase text-[#090909]"
                >
                  Submit 9:15 AM Drill Order
                </button>

                {drillSubmitted && (
                  <div className="border border-white/15 bg-[#090909] p-4 text-xs leading-relaxed">
                    {drillOrderType === "LIMIT" &&
                    drillProduct === "CNC" &&
                    drillLimitPrice <= 348 ? (
                      <p className="text-[#3EDC81] font-bold">
                        ✓ Perfect Execution (+300 XP)! By placing a CNC LIMIT order at ₹{drillLimitPrice} with a ₹{drillStopLoss} Stop-Loss instead of a Market Order at ₹354.80, you saved ₹{((354.8 - drillLimitPrice) * 100).toFixed(0)} in opening-bell slippage on 100 shares!
                      </p>
                    ) : (
                      <p className="text-[#FF5C5C] font-bold">
                        ⚠ Slippage Alert! Using a {drillOrderType} / {drillProduct} order at 9:15 AM forces you to cross the wide spread at ₹354.80 (-₹830 instant loss). Switch to LIMIT + CNC at ₹346.50 and resubmit!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAB 5: BLIND CHART DETECTIVE */}
        {activeLab === "BLIND_CHART" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 border border-[#C98A4A]/30 bg-[#090B0A] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase text-[#C98A4A]">
                    BLIND CHART DETECTIVE • TICKER IDENTITY HIDDEN
                  </span>
                  <h2 className="text-lg font-extrabold text-[#FAF7F5]">
                    {activeBlind.title}
                  </h2>
                </div>
                <div className="flex gap-2">
                  {BLIND_CHALLENGES.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setBlindIdx(i);
                        setBlindChoiceIdx(null);
                      }}
                      className={`border px-3 py-1 text-xs font-bold ${
                        blindIdx === i
                          ? "border-[#C98A4A] bg-[#C98A4A] text-[#090909]"
                          : "border-white/15 bg-[#121212] text-[#B9B4B1]"
                      }`}
                    >
                      Case #{i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <HighchartsStockChart
                symbol="MYSTERY NSE EQUITY"
                basePrice={activeBlind.basePrice}
                visibleCandlesCount={activeBlind.visibleCandles}
                height={390}
              />

              <div className="border border-[#C98A4A]/30 bg-[#141210] p-3 text-xs text-[#F2D7B6]">
                <strong>Tape Clue:</strong> {activeBlind.clue}
              </div>
            </div>

            <div className="investra-card lg:col-span-4 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-[#C98A4A]">
                  MAKE YOUR TRADING CALL
                </span>
                <p className="text-xs text-[#B9B4B1]">
                  Inspect the Highcharts candlestick bodies, wicks, and lower volume bars on the left. How do you trade this right edge?
                </p>

                <div className="space-y-2.5">
                  {activeBlind.choices.map((ch, idx) => (
                    <button
                      key={ch.label}
                      onClick={() => {
                        setBlindChoiceIdx(idx);
                        if (ch.correct) addXp(150);
                      }}
                      className={`w-full border p-3.5 text-left text-xs font-bold transition ${
                        blindChoiceIdx === idx
                          ? ch.correct
                            ? "border-[#3EDC81] bg-[#3EDC81]/15 text-[#3EDC81]"
                            : "border-[#FF5C5C] bg-[#FF5C5C]/15 text-[#FF5C5C]"
                          : "border-white/15 bg-[#121212] text-[#FAF7F5] hover:border-[#C98A4A]"
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>

                {blindChoiceIdx !== null && (
                  <div className="border border-white/15 bg-[#090909] p-4 text-xs leading-relaxed text-[#FAF7F5]">
                    {activeBlind.choices[blindChoiceIdx].outcome}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAB 6: BALANCE SHEET FORENSIC X-RAY */}
        {activeLab === "FORENSIC_XRAY" && (
          <div className="space-y-6">
            <div className="border border-[#C98A4A]/30 bg-[#141210] p-5">
              <h2 className="text-lg font-bold text-[#FAF7F5]">
                Forensic Challenge: Which Stock Is the Safe 5-Year Compounder?
              </h2>
              <p className="mt-1 text-xs text-[#B9B4B1]">
                90% of beginners pick Company A because its P/E is 11x. Inspect all 5 metrics below and click the company you would invest your monthly SIP into.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Company A: Value Trap */}
              <div
                onClick={() => setForensicPick("A")}
                className={`cursor-pointer border p-6 transition ${
                  forensicPick === "A"
                    ? "border-[#FF5C5C] bg-[#1A0E0E]"
                    : "border-white/15 bg-[#0E0E0E] hover:border-[#C98A4A]"
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-lg font-extrabold text-[#FAF7F5]">
                    COMPANY A (Infra Corp)
                  </h3>
                  <span className="border border-[#3EDC81]/40 bg-[#3EDC81]/10 px-2.5 py-1 text-xs font-bold text-[#3EDC81]">
                    P/E: 11.2x (Looks Cheap!)
                  </span>
                </div>
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[#7A7471]">Return on Equity (ROE)</span>
                    <span className="font-bold text-[#FF5C5C]">6.4%</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[#7A7471]">Debt-to-Equity Ratio</span>
                    <span className="font-bold text-[#FF5C5C]">3.4x (Heavy Debt)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[#7A7471]">Promoter Shares Pledged</span>
                    <span className="font-bold text-[#FF5C5C]">68.5% Pledged</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7471]">Operating Cash Flow (OCF)</span>
                    <span className="font-bold text-[#FF5C5C]">-₹420 Cr (Negative)</span>
                  </div>
                </div>
              </div>

              {/* Company B: Quality Compounder */}
              <div
                onClick={() => {
                  setForensicPick("B");
                  addXp(200);
                }}
                className={`cursor-pointer border p-6 transition ${
                  forensicPick === "B"
                    ? "border-[#3EDC81] bg-[#0E1B14]"
                    : "border-white/15 bg-[#0E0E0E] hover:border-[#C98A4A]"
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-lg font-extrabold text-[#FAF7F5]">
                    COMPANY B (Tech Compounder)
                  </h3>
                  <span className="border border-[#C98A4A]/40 bg-[#211C19] px-2.5 py-1 text-xs font-bold text-[#F2D7B6]">
                    P/E: 27.4x
                  </span>
                </div>
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[#7A7471]">Return on Equity (ROE)</span>
                    <span className="font-bold text-[#3EDC81]">38.2%</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[#7A7471]">Debt-to-Equity Ratio</span>
                    <span className="font-bold text-[#3EDC81]">0.0x (Debt Free)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[#7A7471]">Promoter Shares Pledged</span>
                    <span className="font-bold text-[#3EDC81]">0.0% Pledged</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7471]">Operating Cash Flow (OCF)</span>
                    <span className="font-bold text-[#3EDC81]">+₹14,800 Cr (96% FCF)</span>
                  </div>
                </div>
              </div>
            </div>

            {forensicPick && (
              <div className="border border-[#C98A4A] bg-[#141210] p-5 text-xs">
                {forensicPick === "B" ? (
                  <p className="text-[#3EDC81] font-bold">
                    ✓ Forensic Bullseye (+200 XP)! Company B is modeled after TCS/INFY: even at 27x P/E, 38% ROE + Zero Debt + Zero Promoter Pledge compounds wealth safely. Company A is a classic Low-P/E Value Trap where 68% promoter pledging risks a margin-call crash.
                  </p>
                ) : (
                  <p className="text-[#FF5C5C] font-bold">
                    ⚠ You stepped into a Value Trap! Never buy a stock solely because its P/E is 11x. Notice Company A has 68.5% promoter pledging, 3.4x debt, and negative cash flow. Click Company B to see the difference.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* LAB 7: POSITION SIZING & DRAWDOWN SURVIVAL SIMULATOR */}
        {activeLab === "RISK_SIMULATOR" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="investra-card lg:col-span-6 p-6 space-y-5">
              <h2 className="text-lg font-bold text-[#FAF7F5]">
                Drawdown Math & Position Sizing Lab
              </h2>
              <p className="text-xs text-[#B9B4B1]">
                Even the best traders hit a 5-trade losing streak. Drag the sliders below to see what happens to a ₹1,00,000 wallet during a losing streak.
              </p>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#B9B4B1]">
                    Capital Risked Per Trade (%)
                  </span>
                  <span
                    className={`font-bold ${
                      riskPerTradePct <= 3 ? "text-[#3EDC81]" : "text-[#FF5C5C]"
                    }`}
                  >
                    {riskPerTradePct}% per trade
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={35}
                  step={1}
                  value={riskPerTradePct}
                  onChange={(e) => setRiskPerTradePct(Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none bg-[#382B27] accent-[#C98A4A]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#B9B4B1]">
                    Consecutive Losing Trades (Unlucky Streak)
                  </span>
                  <span className="font-bold text-[#FAF7F5]">
                    {losingStreakLength} Losses in a Row
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={10}
                  step={1}
                  value={losingStreakLength}
                  onChange={(e) =>
                    setLosingStreakLength(Number(e.target.value))
                  }
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none bg-[#382B27] accent-[#C98A4A]"
                />
              </div>
            </div>

            <div className="investra-card lg:col-span-6 p-6 flex flex-col justify-between space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/10 bg-[#111111] p-4">
                  <span className="text-[10px] text-[#7A7471]">
                    SURVIVING CAPITAL (FROM ₹1,00,000)
                  </span>
                  <div className="mt-1 text-2xl font-extrabold text-[#FAF7F5]">
                    ₹{remainingCapitalAfterStreak.toLocaleString("en-IN")}
                  </div>
                  <span className="text-xs text-[#FF5C5C]">
                    -{drawdownPct}% Total Drawdown
                  </span>
                </div>

                <div className="border border-[#C98A4A]/40 bg-[#181614] p-4">
                  <span className="text-[10px] text-[#F2D7B6]">
                    GAIN REQUIRED JUST TO BREAK EVEN
                  </span>
                  <div
                    className={`mt-1 text-2xl font-extrabold ${
                      Number(gainNeededToRecover) > 25
                        ? "text-[#FF5C5C]"
                        : "text-[#3EDC81]"
                    }`}
                  >
                    +{gainNeededToRecover}%
                  </div>
                  <span className="text-[10px] text-[#B9B4B1]">
                    Asymmetric recovery math
                  </span>
                </div>
              </div>

              <div className="border border-white/10 bg-[#0B0B0B] p-4 text-xs leading-relaxed text-[#B9B4B1]">
                {riskPerTradePct <= 3 ? (
                  <span className="text-[#3EDC81]">
                    ✓ Institutional Survival Zone: At {riskPerTradePct}% risk per trade, a {losingStreakLength}-trade losing streak leaves you with ₹{remainingCapitalAfterStreak.toLocaleString("en-IN")}, needing only +{gainNeededToRecover}% to recover!
                  </span>
                ) : (
                  <span className="text-[#FF5C5C]">
                    ⚠ Account Blowup Danger: Risking {riskPerTradePct}% per trade wipes out {drawdownPct}% of your wallet in {losingStreakLength} losses—requiring a massive +{gainNeededToRecover}% return on remaining capital just to get back to ₹1,00,000!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}


function SectionCasesRunner({
  activeLab,
  xp,
  addXp,
}: {
  activeLab: string;
  xp: number;
  addXp: (amount: number) => void;
}) {
  const questions = LEARN_SECTIONS_DATA[activeLab] || LEARN_SECTIONS_DATA["CURRICULUM"];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answeredSet, setAnsweredSet] = useState<Record<number, { chosen: number; correct: boolean }>>({});

  const currentQ = questions[currentIdx] || questions[0];
  const totalCases = questions.length;
  const answeredCount = Object.keys(answeredSet).length;

  const handleSelectOption = (idx: number) => {
    if (answeredSet[currentIdx]) return;
    const isCorrect = idx === currentQ.correct;
    setSelectedOpt(idx);
    setAnsweredSet((prev) => ({
      ...prev,
      [currentIdx]: { chosen: idx, correct: isCorrect },
    }));
    if (isCorrect) {
      addXp(currentQ.xp);
    }
  };

  return (
    <div className="border border-[#C98A4A]/30 bg-[#12100E] p-6 space-y-6">
      {/* Top Section Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C98A4A]">
            {currentQ.badge} • 50 INTERACTIVE CASES
          </span>
          <h2 className="mt-1 text-lg font-extrabold text-[#FAF7F5]">
            {currentQ.topic} (Case #{currentIdx + 1} of {totalCases})
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="border border-[#3EDC81]/30 bg-[#1e2820] px-3 py-1 text-xs font-bold text-[#3EDC81]">
            {answeredCount} / {totalCases} Completed
          </span>
          <span className="border border-[#C98A4A]/40 bg-[#211C19] px-3 py-1 text-xs font-bold text-[#D8A56D]">
            +{currentQ.xp} XP
          </span>
        </div>
      </div>

      {/* Case Navigator Pill Bar (1 to 50) */}
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] text-[#7A7471]">
          <span>Jump to Case (1 to 50):</span>
          <span>Click any case button to practice</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1 bg-[#090909] border border-white/10">
          {questions.map((q, i) => {
            const ans = answeredSet[i];
            const isCurrent = i === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIdx(i);
                  setSelectedOpt(answeredSet[i]?.chosen ?? null);
                }}
                className={`size-7 text-[11px] font-bold transition ${
                  isCurrent
                    ? "border-2 border-[#C98A4A] bg-[#C98A4A] text-[#090909]"
                    : ans
                    ? ans.correct
                      ? "border border-[#3EDC81] bg-[#1a2c20] text-[#3EDC81]"
                      : "border border-[#FF5C5C] bg-[#2d1818] text-[#FF5C5C]"
                    : "border border-white/10 bg-[#161616] text-[#B9B4B1] hover:border-white/30"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="border border-white/10 bg-[#0c0c0c] p-6 space-y-4">
        <p className="text-sm font-bold text-[#FAF7F5] leading-relaxed">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, oIdx) => {
            const ans = answeredSet[currentIdx];
            const chosen = ans ? ans.chosen === oIdx : selectedOpt === oIdx;
            const isCorrect = oIdx === currentQ.correct;

            return (
              <button
                key={oIdx}
                disabled={Boolean(ans)}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full border p-4 text-left text-xs font-semibold transition ${
                  ans
                    ? isCorrect
                      ? "border-[#3EDC81] bg-[#1a2c20] text-[#3EDC81]"
                      : chosen
                      ? "border-[#FF5C5C] bg-[#2d1818] text-[#FF5C5C]"
                      : "border-white/5 bg-[#121212] text-[#7A7471] opacity-60"
                    : "border-white/10 bg-[#141414] text-[#FAF7F5] hover:border-[#C98A4A]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center border border-current text-[10px]">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span>{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {answeredSet[currentIdx] && (
          <div className="mt-4 border border-white/10 bg-[#181614] p-4 text-xs space-y-1">
            <span
              className={`font-bold ${
                answeredSet[currentIdx].correct
                  ? "text-[#3EDC81]"
                  : "text-[#FF5C5C]"
              }`}
            >
              {answeredSet[currentIdx].correct
                ? "✓ Correct Institutional Call! XP added."
                : "✗ Incorrect Strategy Choice."}
            </span>
            <p className="text-[#B9B4B1] leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Prev / Next Controls */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
        <button
          disabled={currentIdx === 0}
          onClick={() => {
            const prev = currentIdx - 1;
            setCurrentIdx(prev);
            setSelectedOpt(answeredSet[prev]?.chosen ?? null);
          }}
          className="border border-white/15 bg-[#181614] px-4 py-2 font-bold text-[#FAF7F5] disabled:opacity-40 hover:border-[#C98A4A]"
        >
          ← Previous Case
        </button>

        <span className="text-[#D8A56D]">
          Case {currentIdx + 1} of {totalCases}
        </span>

        <button
          disabled={currentIdx >= totalCases - 1}
          onClick={() => {
            const next = currentIdx + 1;
            setCurrentIdx(next);
            setSelectedOpt(answeredSet[next]?.chosen ?? null);
          }}
          className="border border-[#C98A4A] bg-[#C98A4A] px-5 py-2 font-extrabold text-[#090909] disabled:opacity-40 hover:brightness-110"
        >
          Next Case →
        </button>
      </div>
    </div>
  );
}
