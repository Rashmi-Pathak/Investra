"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  History,
  Bot,
  Palette,
  CheckCircle2,
  Play,
  Volume2,
  Stethoscope,
  Layers,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Lock,
  Award,
  Zap,
  RotateCw,
  Search,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import LetterGlitch from "@/animations/LetterGlitch";
import ShapeGrid from "@/animations/ShapeGrid";
import { MarqueeDemo } from "@/animations/MarqueeDemo";
import { GlobeDemo } from "@/animations/GlobeDemo";
import {
  Typewriter,
  DecryptText,
  NumberTicker,
  BorderBeam,
} from "@investra/animations";
import { useInvestraStore } from "@/store/useInvestraStore";
import { HighchartsStockChart, CustomCandlePoint } from "@/components/HighchartsStockChart";
import { TiltCard } from "@/components/TiltCard";

const LIVE_TICKERS = [
  { symbol: "NIFTY 50", price: "24,315.80", change: "+0.59%", up: true },
  { symbol: "SENSEX", price: "79,942.20", change: "+0.61%", up: true },
  { symbol: "TCS", price: "₹3,912.80", change: "+0.85%", up: true },
  { symbol: "RELIANCE", price: "₹2,742.50", change: "+1.20%", up: true },
  { symbol: "HDFCBANK", price: "₹1,682.40", change: "+0.65%", up: true },
  { symbol: "JIOFIN", price: "₹348.70", change: "+4.82%", up: true },
  { symbol: "SBIN", price: "₹812.30", change: "-2.15%", up: false },
  { symbol: "BANKNIFTY", price: "51,840.40", change: "-0.25%", up: false },
];

export default function LandingPage() {
  const {
    salary,
    expenses,
    monthlySip,
    updateSalaryAndSip,
    brokerPreset,
    setBrokerPreset,
  } = useInvestraStore();

  const [activeBrokerShowcase, setActiveBrokerShowcase] = useState<"kite" | "groww" | "upstox" | "original">("kite");
  const [replayCandleIdx, setReplayCandleIdx] = useState(4);

  const totalExpenses =
    expenses.rent + expenses.food + expenses.travel + expenses.emi + expenses.others;
  const availableSurplus = Math.max(0, salary - totalExpenses);

  const crashCandles: (CustomCandlePoint & { label: string; price: number; drop: string; note: string })[] = [
    { timestamp: Date.UTC(2020, 1, 10), open: 12050, high: 12210, low: 11990, close: 12180, volume: 1850000, label: "Feb 10", price: 12180, drop: "+1.1%", note: "Pre-crash liquidity expansion near record highs" },
    { timestamp: Date.UTC(2020, 1, 17), open: 12180, high: 12246, low: 12040, close: 12113, volume: 2120000, label: "Feb 17", price: 12113, drop: "-0.5%", note: "Global supply chain warnings begin circulating" },
    { timestamp: Date.UTC(2020, 1, 24), open: 12080, high: 12120, low: 11180, close: 11201, volume: 4250000, label: "Feb 24", price: 11201, drop: "-7.5%", note: "Global virus headlines emerge; gap-down selling" },
    { timestamp: Date.UTC(2020, 2, 2), open: 11200, high: 11380, low: 10820, close: 10989, volume: 5100000, label: "Mar 02", price: 10989, drop: "-9.3%", note: "FIIs pull ₹4,200 Cr; India VIX spikes +32%" },
    { timestamp: Date.UTC(2020, 2, 9), open: 10850, high: 10910, low: 10290, close: 10451, volume: 6890000, label: "Mar 09", price: 10451, drop: "-13.7%", note: "Oil price war + global flight to cash" },
    { timestamp: Date.UTC(2020, 2, 16), open: 10310, high: 10350, low: 9050, close: 9197, volume: 8900000, label: "Mar 16", price: 9197, drop: "-24.0%", note: "Lower circuit triggered on Nifty 50; margin calls hit" },
    { timestamp: Date.UTC(2020, 2, 23), open: 8700, high: 8750, low: 7511, close: 7610, volume: 11400000, label: "Mar 23", price: 7610, drop: "-37.1%", note: "Peak panic bottom • P/E hits decade low 17.1x" },
    { timestamp: Date.UTC(2020, 3, 7), open: 8050, high: 8840, low: 8010, close: 8792, volume: 7850000, label: "Apr 07", price: 8792, drop: "-27.3%", note: "Massive green reversal candle • Institutional accumulation" },
    { timestamp: Date.UTC(2020, 3, 27), open: 8810, high: 9390, low: 8780, close: 9282, volume: 6120000, label: "Apr 27", price: 9282, drop: "-23.4%", note: "Higher lows confirm trend stabilization" },
    { timestamp: Date.UTC(2020, 4, 18), open: 9150, high: 9920, low: 9100, close: 9859, volume: 5840000, label: "May 18", price: 9859, drop: "-18.5%", note: "Disciplined ₹5,000 SIP tranches turn net green!" },
    { timestamp: Date.UTC(2020, 6, 6), open: 10620, high: 10850, low: 10580, close: 10768, volume: 5100000, label: "Jul 06", price: 10768, drop: "-11.1%", note: "Broad market recovery led by IT & Pharma" },
    { timestamp: Date.UTC(2020, 10, 9), open: 12350, high: 12820, low: 12310, close: 12780, volume: 6900000, label: "Nov 09", price: 12780, drop: "+5.5%", note: "Full V-shaped breakout above pre-COVID peak!" },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-[#FAF7F5] selection:bg-[#C98A4A]/30 selection:text-[#F2D7B6] overflow-x-hidden">
      {/* Sticky Crisp Cornered Terminal Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#C98A4A]/25 bg-[#090909]/95 backdrop-blur-xl font-mono">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative flex size-8 sm:size-9 items-center justify-center border border-[#C98A4A] bg-[#141210] p-1.5 shadow-[0_0_15px_rgba(201,138,74,0.3)] group-hover:scale-105 transition">
              <img src="/icon.svg" alt="Investra" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-extrabold tracking-wider text-[#FAF7F5]">
                INVESTRA
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-widest text-[#C98A4A]">
                STOCK MARKET LEARNING OS
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-xs text-[#B9B4B1] lg:flex">
            <a href="#salary-simulator" className="transition hover:text-[#C98A4A]">
              REAL-LIFE SALARY
            </a>
            <a href="#broker-terminals" className="transition hover:text-[#C98A4A]">
              4 BROKER TERMINALS
            </a>
            <a href="#flight-labs" className="transition hover:text-[#C98A4A]">
              7 FLIGHT LABS
            </a>
            <a href="#matrix-comparison" className="transition hover:text-[#C98A4A]">
              COMPARISON MATRIX
            </a>
            <a href="#replay-engine" className="transition hover:text-[#C98A4A]">
              COVID CRASH REPLAY
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-block border border-[#C98A4A]/40 bg-[#141210] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-[#F2D7B6] hover:bg-[#1E1A17] transition"
            >
              SIGN IN
            </Link>
            <Link
              href="/signup"
              className="border border-[#C98A4A] bg-[#C98A4A] px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs font-bold text-[#090909] shadow-[0_0_20px_rgba(201,138,74,0.4)] hover:brightness-110 transition"
            >
              <span className="hidden sm:inline">LAUNCH SIMULATOR →</span>
              <span className="sm:hidden">LAUNCH →</span>
            </Link>
          </div>
        </div>
      </header>

      {/* LIVE NSE TICKER SCROLLER */}
      <div className="flex h-9 items-center border-b border-[#C98A4A]/20 bg-[#070707] px-4 font-mono text-[11px] text-[#B9B4B1] overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-1.5 font-bold uppercase text-[#C98A4A]">
            <span className="size-2 bg-[#3EDC81] animate-ping inline-block" />
            LIVE NSE SIMULATION FEED
          </span>
          {LIVE_TICKERS.map((t) => (
            <div key={t.symbol} className="flex items-center gap-2">
              <span className="font-semibold text-[#FAF7F5]">{t.symbol}</span>
              <span>{t.price}</span>
              <span className={t.up ? "text-[#3EDC81]" : "text-[#FF5C5C]"}>
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO SECTION WITH ROTATING HALO & 3D FLOATING TILT CARDS */}
      <section className="relative overflow-hidden pt-20 pb-28 border-b border-white/10">
        {/* Ambient Slow-Rotating Geometric Rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] border border-[#C98A4A]/10 rounded-full animate-spin-slow opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] border border-dashed border-[#F2D7B6]/10 rounded-full animate-spin-reverse opacity-25" />
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <ShapeGrid
            shape="square"
            direction="diagonal"
            lineColor="#2c221d"
            hoverColor="#C98A4A"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-[#C98A4A]/40 bg-[#181412] px-3.5 py-1.5 font-mono text-xs text-[#F2D7B6] shadow-[0_0_20px_rgba(201,138,74,0.2)]">
                <Sparkles className="size-3.5 text-[#C98A4A]" />
                <span className="font-bold text-[#C98A4A]">THE ANTI-GAMBLING STOCK SIMULATOR</span>
                <span>• NO FAKE ₹10L BALANCES</span>
              </div>

              <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#FAF7F5] sm:text-6xl sm:leading-[1.1]">
                Master the Indian Stock Market with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2D7B6] via-[#C98A4A] to-[#D8A56D]">
                  Real-Life Salary &amp; Flight-Ready Intraday Drills
                </span>
              </h1>

              <p className="max-w-2xl text-base text-[#B9B4B1] leading-relaxed">
                Traditional stock simulators give beginners ₹10,00,000 in fake money, encouraging reckless gambles that ruin them in real life. Investra grounds you in your actual monthly salary, simulates realistic ₹5k SIP limits, and prepares you across 4 authentic broker terminals.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 border border-[#C98A4A] bg-[#C98A4A] px-7 py-3.5 font-mono text-xs font-bold uppercase text-[#090909] shadow-[0_0_30px_rgba(201,138,74,0.5)] hover:brightness-110 transition"
                >
                  <span>ENTER LIVE TRADING DESK</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/learn"
                  className="flex items-center gap-2 border border-[#C98A4A]/50 bg-[#141210] px-6 py-3.5 font-mono text-xs font-bold uppercase text-[#F2D7B6] hover:bg-[#1E1A17] transition"
                >
                  <BookOpen className="size-4 text-[#C98A4A]" />
                  <span>50-CASE FLIGHT SIMULATOR</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono text-xs text-[#B9B4B1]">
                <div>
                  <div className="text-xl font-bold text-[#FAF7F5]">2,640+</div>
                  <div className="text-[11px] text-[#7A7471]">NSE &amp; BSE Listed Stocks</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#3EDC81]">4 Brokers</div>
                  <div className="text-[11px] text-[#7A7471]">Zerodha, Groww, Upstox</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#C98A4A]">100% Reality</div>
                  <div className="text-[11px] text-[#7A7471]">Zero ₹10L Paper Gimmicks</div>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Tilt Card Preview */}
            <div className="lg:col-span-5 relative">
              {/* Floating Ambient Badge Top-Right */}
              <div className="absolute -top-6 -right-4 z-30 animate-float-slow hidden sm:flex items-center gap-2 border border-[#3EDC81]/60 bg-[#0c1810] px-3.5 py-2 font-mono text-xs text-[#3EDC81] shadow-xl">
                <ShieldCheck className="size-4 text-[#3EDC81]" />
                <span>SEBI Risk Guard: Max 15% Cap</span>
              </div>

              {/* Floating Ambient Badge Bottom-Left */}
              <div className="absolute -bottom-6 -left-6 z-30 animate-float-reverse hidden sm:flex items-center gap-2 border border-[#C98A4A]/60 bg-[#16120e] px-3.5 py-2 font-mono text-xs text-[#F2D7B6] shadow-xl">
                <Bot className="size-4 text-[#C98A4A]" />
                <span>Human AI Mentor: Active</span>
              </div>

              <TiltCard maxTilt={14} glareOpacity={0.25} className="border border-[#C98A4A] bg-[#141210] p-6 shadow-[0_0_60px_rgba(201,138,74,0.35)] font-mono">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 bg-[#3EDC81] animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C98A4A]">
                      REAL-LIFE SALARY SIMULATOR
                    </span>
                  </div>
                  <span className="text-[11px] text-[#3EDC81]">Month 1 Active</span>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#B9B4B1]">Monthly Take-Home Salary</span>
                      <span className="font-bold text-[#FAF7F5]">₹{salary.toLocaleString("en-IN")}</span>
                    </div>
                    <input
                      type="range"
                      min={20000}
                      max={200000}
                      step={5000}
                      value={salary}
                      onChange={(e) => updateSalaryAndSip(Number(e.target.value), monthlySip)}
                      className="mt-2 w-full accent-[#C98A4A]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#B9B4B1]">Living Expenses (Rent, Food, EMI)</span>
                      <span className="font-bold text-[#FF5C5C]">₹{totalExpenses.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-[#1e1a17]">
                      <div
                        className="h-2 bg-[#FF5C5C]"
                        style={{ width: `${Math.min(100, (totalExpenses / salary) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="border border-[#C98A4A]/40 bg-[#1c1815] p-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#F2D7B6]">Actual Monthly SIP Allocation:</span>
                      <span className="font-bold text-[#3EDC81]">₹{monthlySip.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#B9B4B1]">
                      <span>Liquid Cash Surplus:</span>
                      <span>₹{availableSurplus.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="border border-white/10 bg-[#090909] p-3 text-center">
                    <p className="text-[11px] text-[#7A7471]">
                      You can only invest your real monthly surplus. If you lose ₹5,000 on an impulsive trade, you must wait until next month&apos;s salary to trade again.
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="block w-full text-center border border-[#C98A4A] bg-[#C98A4A] py-2.5 text-xs font-bold uppercase text-[#090909] hover:brightness-110 transition"
                  >
                    Simulate Your Finances Now →
                  </Link>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 4-BROKER WORKSPACE SHOWCASE (ZERODHA, GROWW, UPSTOX, INVESTRA) */}
      <section id="broker-terminals" className="py-24 border-b border-white/10 bg-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center space-y-3 mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C98A4A]">
              ONE LEARNING ACCOUNT • 4 IDENTICAL REAL BROKER WORKSPACES
            </span>
            <h2 className="text-3xl font-extrabold text-[#FAF7F5] sm:text-5xl">
              Learn in the Exact Broker UI You Will Trade in Tomorrow
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-[#B9B4B1]">
              Switch instantly between Zerodha Kite, Groww, Upstox Pro, or Investra Dark Terminal with a single click. Your wallet, holdings, and P&amp;L stay 100% unified across all four interfaces.
            </p>
          </div>

          {/* Broker Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs mb-10">
            <button
              onClick={() => setActiveBrokerShowcase("kite")}
              className={`flex items-center gap-2 border px-5 py-2.5 transition ${
                activeBrokerShowcase === "kite"
                  ? "border-[#ff5722] bg-[#ff5722] text-white font-bold shadow-[0_0_20px_rgba(255,87,34,0.4)]"
                  : "border-white/15 bg-[#141210] text-[#B9B4B1] hover:text-white"
              }`}
            >
              <span>Zerodha Kite (Light Mode + 5-Depth L2)</span>
            </button>
            <button
              onClick={() => setActiveBrokerShowcase("groww")}
              className={`flex items-center gap-2 border px-5 py-2.5 transition ${
                activeBrokerShowcase === "groww"
                  ? "border-[#00d09c] bg-[#00d09c] text-white font-bold shadow-[0_0_20px_rgba(0,208,156,0.4)]"
                  : "border-white/15 bg-[#141210] text-[#B9B4B1] hover:text-white"
              }`}
            >
              <span>Groww (Clean Green Retail + Search)</span>
            </button>
            <button
              onClick={() => setActiveBrokerShowcase("upstox")}
              className={`flex items-center gap-2 border px-5 py-2.5 transition ${
                activeBrokerShowcase === "upstox"
                  ? "border-[#7b1fa2] bg-[#7b1fa2] text-white font-bold shadow-[0_0_20px_rgba(123,31,162,0.4)]"
                  : "border-white/15 bg-[#141210] text-[#B9B4B1] hover:text-white"
              }`}
            >
              <span>Upstox Pro (Highcharts Candlestick &amp; OI Desk)</span>
            </button>
            <button
              onClick={() => setActiveBrokerShowcase("original")}
              className={`flex items-center gap-2 border px-5 py-2.5 transition ${
                activeBrokerShowcase === "original"
                  ? "border-[#C98A4A] bg-[#C98A4A] text-[#090909] font-bold shadow-[0_0_20px_rgba(201,138,74,0.4)]"
                  : "border-white/15 bg-[#141210] text-[#B9B4B1] hover:text-white"
              }`}
            >
              <span>Investra Bloomberg Terminal (High-Craft Dark)</span>
            </button>
          </div>

          {/* Interactive 3D Showcase Preview Screen */}
          <TiltCard maxTilt={8} glareOpacity={0.15} className="border border-white/15 bg-[#100e0d] p-6 shadow-2xl">
            {activeBrokerShowcase === "kite" && (
              <div className="bg-white text-[#444444] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-[#eeeeee] pb-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-base text-[#444444]">
                      <span className="size-3 bg-[#ff5722] inline-block" /> Kite
                    </div>
                    <span className="text-xs text-[#ff5722] font-semibold border-b-2 border-[#ff5722] pb-1">
                      Dashboard
                    </span>
                    <span className="text-xs text-[#888888]">Portfolio</span>
                    <span className="text-xs text-[#888888]">Funds</span>
                  </div>
                  <span className="text-xs text-[#888888]">UI Preset: Zerodha (Active)</span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="border border-[#eeeeee] p-4 space-y-2">
                    <span className="text-xs text-[#888888]">Equity Margin Available</span>
                    <div className="text-3xl font-light text-[#222222]">₹1,00,000</div>
                    <p className="text-[11px] text-[#4184f3]">Opening balance: ₹1,00,000 • 0 orders used</p>
                  </div>
                  <div className="border border-[#eeeeee] p-4 space-y-2">
                    <span className="text-xs text-[#888888]">Demat Holdings</span>
                    <div className="text-3xl font-light text-[#4caf50]">₹0.00 (0 Holdings)</div>
                    <p className="text-[11px] text-[#888888]">Start investing with 0 brokerage via left watchlist</p>
                  </div>
                </div>

                <div className="border border-dashed border-[#dddddd] bg-[#fafafa] p-4 text-xs text-[#666666] flex items-center justify-between">
                  <span>Authentic 5-depth Market Depth, order types (CNC, MIS, SL-M), and Kite Console integration.</span>
                  <Link href="/dashboard" className="text-[#4184f3] font-semibold hover:underline">
                    Open Kite Terminal →
                  </Link>
                </div>
              </div>
            )}

            {activeBrokerShowcase === "groww" && (
              <div className="bg-[#fcfdfd] text-[#44475b] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-[#ebedf0] pb-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-lg text-[#44475b]">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-[#00d09c] text-white font-bold text-sm">G</span>
                      Groww
                    </div>
                    <span className="text-xs text-[#00d09c] font-bold border-b-2 border-[#00d09c] pb-1">Stocks</span>
                    <span className="text-xs text-[#7c7e8c]">Orders</span>
                  </div>
                  <span className="rounded-full bg-[#e8f7f3] px-3 py-1 text-xs font-bold text-[#00b386]">₹1,00,000 Available</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#edf0f2] bg-white p-4 shadow-sm">
                    <div className="text-xs font-bold text-[#7c7e8c]">NIFTY 50</div>
                    <div className="mt-1 text-lg font-bold text-[#44475b]">24,315.80 <span className="text-xs text-[#00d09c]">+0.59%</span></div>
                  </div>
                  <div className="rounded-xl border border-[#edf0f2] bg-white p-4 shadow-sm">
                    <div className="text-xs font-bold text-[#7c7e8c]">SENSEX</div>
                    <div className="mt-1 text-lg font-bold text-[#44475b]">79,942.20 <span className="text-xs text-[#00d09c]">+0.61%</span></div>
                  </div>
                  <div className="rounded-xl border border-[#edf0f2] bg-white p-4 shadow-sm">
                    <div className="text-xs font-bold text-[#7c7e8c]">BANK NIFTY</div>
                    <div className="mt-1 text-lg font-bold text-[#44475b]">51,840.40 <span className="text-xs text-[#ef4444]">-0.25%</span></div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#edf0f2] bg-white p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-[#44475b]">Explore 2,640 NSE Stocks with Real-Time Filters</div>
                    <div className="text-xs text-[#7c7e8c]">Filter by Market Cap (Large/Mid/Small), Sector, and instant Symbol Search.</div>
                  </div>
                  <Link href="/market" className="rounded-full bg-[#00d09c] px-4 py-2 text-xs font-bold text-white hover:brightness-105">
                    Explore Groww →
                  </Link>
                </div>
              </div>
            )}

            {activeBrokerShowcase === "upstox" && (
              <div className="bg-[#1c1924] text-[#FAF7F5] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-base text-[#FAF7F5]">
                      <span className="flex size-6 items-center justify-center bg-[#7b1fa2] text-xs font-bold">up</span>
                      Upstox Pro
                    </div>
                    <span className="text-xs text-[#d1b2e0] font-semibold border-b-2 border-[#7b1fa2] pb-1">Charts &amp; OI</span>
                    <span className="text-xs text-[#8c8899]">Orders (0)</span>
                    <span className="text-xs text-[#8c8899]">Holdings (0)</span>
                  </div>
                  <span className="border border-[#7b1fa2]/40 bg-[#7b1fa2]/20 px-3 py-1 font-mono text-xs text-[#d1b2e0]">
                    TBT Engine Active
                  </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="border border-white/10 bg-[#14121a] p-4 space-y-2">
                    <span className="text-xs text-[#8c8899]">Open Interest (OI) Analysis</span>
                    <div className="text-xl font-bold text-[#3EDC81]">NIFTY 25000 PE Strike</div>
                    <p className="text-xs text-[#b8b5c4]">Call OI vs Put OI breakdown to spot institutional support and resistance clusters.</p>
                  </div>
                  <div className="border border-white/10 bg-[#14121a] p-4 space-y-2">
                    <span className="text-xs text-[#8c8899]">Live Order Routing</span>
                    <div className="text-xl font-bold text-[#FAF7F5]">Full Depth &amp; Trade Desk</div>
                    <p className="text-xs text-[#b8b5c4]">One-click buy and sell routing directly linked to your virtual wallet balance.</p>
                  </div>
                </div>

                <div className="border border-white/10 bg-[#14121a] p-4 text-xs text-[#b8b5c4] flex items-center justify-between">
                  <span>Authentic dark purple theme, Option Chain analysis, and Highcharts candlestick chart.</span>
                  <Link href="/dashboard" className="text-[#d1b2e0] font-bold hover:underline">
                    Open Upstox Pro Desk →
                  </Link>
                </div>
              </div>
            )}

            {activeBrokerShowcase === "original" && (
              <div className="bg-[#090909] text-[#FAF7F5] p-6 space-y-6 font-mono">
                <div className="flex items-center justify-between border-b border-[#C98A4A]/25 pb-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-base text-[#FAF7F5]">
                      <span className="size-3 bg-[#C98A4A] inline-block" /> INVESTRA TERMINAL
                    </div>
                    <span className="text-xs text-[#C98A4A] font-bold border-b border-[#C98A4A] pb-1">MARKETS</span>
                    <span className="text-xs text-[#7A7471]">TRADE</span>
                    <span className="text-xs text-[#7A7471]">PORTFOLIO</span>
                  </div>
                  <span className="text-xs text-[#3EDC81]">BLOOMBERG RAG ACTIVE</span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="border border-[#C98A4A]/30 bg-[#141210] p-4 space-y-2">
                    <span className="text-xs text-[#7A7471]">Psychological Risk Engine</span>
                    <div className="text-2xl font-bold text-[#F2D7B6]">Composure Score 88/100</div>
                    <p className="text-xs text-[#B9B4B1]">Flags revenge trading, over-leveraging, and FOMO buying before orders execute.</p>
                  </div>
                  <div className="border border-[#C98A4A]/30 bg-[#141210] p-4 space-y-2">
                    <span className="text-xs text-[#7A7471]">NSE Unified Security Universe</span>
                    <div className="text-2xl font-bold text-[#3EDC81]">2,640 Equities Online</div>
                    <p className="text-xs text-[#B9B4B1]">Live prices, technical indicators, and fundamental metrics for every listed stock.</p>
                  </div>
                </div>

                <div className="border border-[#C98A4A]/30 bg-[#141210] p-4 text-xs text-[#F2D7B6] flex items-center justify-between">
                  <span>High-craft obsidian theme, strict 0px crisp square aesthetic, KaTeX formulas, and voice mentoring.</span>
                  <Link href="/dashboard" className="text-[#C98A4A] font-bold hover:underline">
                    Launch Bloomberg Terminal →
                  </Link>
                </div>
              </div>
            )}
          </TiltCard>
        </div>
      </section>

      {/* SECTION 3: 7 HANDS-ON FLIGHT SIMULATOR LABS */}
      <section id="flight-labs" className="py-24 border-b border-white/10 bg-[#090909]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center space-y-3 mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C98A4A]">
              7 INTERACTIVE FLIGHT SIMULATOR LABS • 50 CASE STUDIES EACH
            </span>
            <h2 className="text-3xl font-extrabold text-[#FAF7F5] sm:text-5xl">
              Build Reflexes in Market Scenarios Before Risking Real Money
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-[#B9B4B1]">
              Airline pilots don&apos;t practice engine failures with passengers on board. Investra gives you 7 flight-simulator labs where you solve real beginner disasters and trade live drill cases.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Lab 1: Earnings Call Trap */}
            <TiltCard maxTilt={10} className="border border-[#C98A4A]/40 bg-[#141210] p-6 space-y-4 font-mono shadow-lg">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center border border-[#C98A4A] bg-[#1e1a17] text-[#C98A4A]">
                  <Volume2 className="size-4" />
                </span>
                <span className="border border-[#C98A4A]/30 bg-[#0c0a09] px-2 py-0.5 text-[10px] text-[#C98A4A]">
                  IDEA A • AUDIO DRILL
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#FAF7F5]">1. Earnings Call Trap Simulator</h3>
              <p className="text-xs text-[#B9B4B1] leading-relaxed">
                Listen to a 20-second AI-voiced CEO earnings snippet and review the quarterly revenue table. Predict before market open whether the stock will gap up or gap down on guidance.
              </p>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-xs text-[#F2D7B6]">
                <span>50 Audio Cases</span>
                <Link href="/learn" className="text-[#C98A4A] font-bold hover:underline flex items-center gap-1">
                  Launch Lab <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </TiltCard>

            {/* Lab 2: Fix Broken Portfolio Doctor */}
            <TiltCard maxTilt={10} className="border border-[#C98A4A]/40 bg-[#141210] p-6 space-y-4 font-mono shadow-lg">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center border border-[#3EDC81] bg-[#0c1810] text-[#3EDC81]">
                  <Stethoscope className="size-4" />
                </span>
                <span className="border border-[#3EDC81]/30 bg-[#0c1810] px-2 py-0.5 text-[10px] text-[#3EDC81]">
                  IDEA B • DOCTOR MODE
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#FAF7F5]">2. Portfolio Doctor Mode</h3>
              <p className="text-xs text-[#B9B4B1] leading-relaxed">
                Take over a real beginner&apos;s broken portfolio with 12 penny stocks, 0 stop-losses, and 80% concentrated in one sector. Rebalance it within 3 surgical moves to reach a 90/100 safety score.
              </p>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-xs text-[#F2D7B6]">
                <span>50 Broken Portfolios</span>
                <Link href="/learn" className="text-[#3EDC81] font-bold hover:underline flex items-center gap-1">
                  Launch Lab <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </TiltCard>

            {/* Lab 3: 9:15 AM Opening Bell Drill */}
            <TiltCard maxTilt={10} className="border border-[#C98A4A]/40 bg-[#141210] p-6 space-y-4 font-mono shadow-lg">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center border border-[#FF5C5C] bg-[#1a0f0f] text-[#FF5C5C]">
                  <Zap className="size-4" />
                </span>
                <span className="border border-[#FF5C5C]/30 bg-[#1a0f0f] px-2 py-0.5 text-[10px] text-[#FF5C5C]">
                  IDEA C • 60S DRILL
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#FAF7F5]">3. 9:15 AM Opening Bell Slippage</h3>
              <p className="text-xs text-[#B9B4B1] leading-relaxed">
                A 60-second live L2 Market Depth mini-game where bid-ask spreads widen wildly at market open. Place a strict Limit order instead of a Market order to avoid an ₹8.80 slippage trap!
              </p>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-xs text-[#F2D7B6]">
                <span>50 Order-Book Cases</span>
                <Link href="/learn" className="text-[#FF5C5C] font-bold hover:underline flex items-center gap-1">
                  Launch Lab <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </TiltCard>

            {/* Lab 4: Skill Tree & Level Quests */}
            <TiltCard maxTilt={10} className="border border-white/15 bg-[#141210] p-6 space-y-4 font-mono shadow-lg">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center border border-white/20 bg-[#1e1a17] text-[#FAF7F5]">
                  <Award className="size-4 text-[#F2D7B6]" />
                </span>
                <span className="border border-white/10 bg-[#0c0a09] px-2 py-0.5 text-[10px] text-[#B9B4B1]">
                  CHECKPOINTS
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#FAF7F5]">4. Progressive Skill Tree</h3>
              <p className="text-xs text-[#B9B4B1] leading-relaxed">
                Structured progressive learning checkpoints from Candle Anatomy and Support/Resistance to Volatility Sizing and Derivatives Hedging, earning XP and certifications.
              </p>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-xs text-[#F2D7B6]">
                <span>50 Skill Nodes</span>
                <Link href="/learn" className="text-[#C98A4A] font-bold hover:underline flex items-center gap-1">
                  Launch Lab <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </TiltCard>

            {/* Lab 5: Blind Chart Pattern Match */}
            <TiltCard maxTilt={10} className="border border-white/15 bg-[#141210] p-6 space-y-4 font-mono shadow-lg">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center border border-white/20 bg-[#1e1a17] text-[#FAF7F5]">
                  <BarChart3 className="size-4 text-[#D8A56D]" />
                </span>
                <span className="border border-white/10 bg-[#0c0a09] px-2 py-0.5 text-[10px] text-[#B9B4B1]">
                  PATTERN LAB
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#FAF7F5]">5. Blind Chart Simulator</h3>
              <p className="text-xs text-[#B9B4B1] leading-relaxed">
                Strip away stock tickers and brand names. Trade raw candlestick patterns with hidden outcomes and reveal whether your technical thesis plays out over the next 10 candles.
              </p>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-xs text-[#F2D7B6]">
                <span>50 Historical Charts</span>
                <Link href="/learn" className="text-[#C98A4A] font-bold hover:underline flex items-center gap-1">
                  Launch Lab <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </TiltCard>

            {/* Lab 6: Forensic Accounting */}
            <TiltCard maxTilt={10} className="border border-white/15 bg-[#141210] p-6 space-y-4 font-mono shadow-lg">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center border border-white/20 bg-[#1e1a17] text-[#FAF7F5]">
                  <Search className="size-4 text-[#3EDC81]" />
                </span>
                <span className="border border-white/10 bg-[#0c0a09] px-2 py-0.5 text-[10px] text-[#B9B4B1]">
                  FUNDAMENTAL
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#FAF7F5]">6. Forensic Balance Sheet Audit</h3>
              <p className="text-xs text-[#B9B4B1] leading-relaxed">
                Inspect red flags in Indian corporate balance sheets: promoter share pledging, negative operating cash flows disguised by accounting tricks, and auditor resignations.
              </p>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-xs text-[#F2D7B6]">
                <span>50 Forensic Audits</span>
                <Link href="/learn" className="text-[#3EDC81] font-bold hover:underline flex items-center gap-1">
                  Launch Lab <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* SECTION 4: REAL-LIFE SALARY VS FAKE ₹10L SIMULATORS COMPARISON MATRIX */}
      <section id="matrix-comparison" className="py-24 border-b border-white/10 bg-[#0B0B0B] font-mono">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C98A4A]">
              THE PEDAGOGICAL DIFFERENCE
            </span>
            <h2 className="text-3xl font-extrabold text-[#FAF7F5] sm:text-5xl font-sans">
              Why Paper Trading Apps Build Terrible Habits
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[#B9B4B1]">
              When paper trading apps give you ₹10 Lakhs of monopoly money, you trade 500 lots without feeling risk. In the real market, that habit wipes out retail savings in 90 days.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#C98A4A]/30 bg-[#141210]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#C98A4A]/30 bg-[#1e1a17] text-[#C98A4A]">
                  <th className="p-4 uppercase tracking-wider">Feature &amp; Metric</th>
                  <th className="p-4 uppercase tracking-wider text-[#FF5C5C]">Generic ₹10L Simulators</th>
                  <th className="p-4 uppercase tracking-wider text-[#3EDC81]">Investra Learning OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-[#FAF7F5]">
                <tr className="hover:bg-[#1a1614]">
                  <td className="p-4 font-bold text-[#F2D7B6]">Starting Capital</td>
                  <td className="p-4 text-[#FF5C5C]">Fake ₹10,00,000 monopoly credits</td>
                  <td className="p-4 text-[#3EDC81] font-bold">Your actual monthly salary surplus (e.g. ₹5,000)</td>
                </tr>
                <tr className="hover:bg-[#1a1614]">
                  <td className="p-4 font-bold text-[#F2D7B6]">Loss Psychological Impact</td>
                  <td className="p-4 text-[#FF5C5C]">Zero. Tap &quot;Reset Balance&quot; and repeat reckless bets</td>
                  <td className="p-4 text-[#3EDC81] font-bold">Losses lock your wallet until next simulated monthly paycheck</td>
                </tr>
                <tr className="hover:bg-[#1a1614]">
                  <td className="p-4 font-bold text-[#F2D7B6]">Broker Terminal Muscle Memory</td>
                  <td className="p-4 text-[#FF5C5C]">Generic toy UI with no real broker correlation</td>
                  <td className="p-4 text-[#3EDC81] font-bold">4 authentic broker UIs: Zerodha Kite, Groww, Upstox Pro</td>
                </tr>
                <tr className="hover:bg-[#1a1614]">
                  <td className="p-4 font-bold text-[#F2D7B6]">AI Guidance Tone</td>
                  <td className="p-4 text-[#FF5C5C]">Robotic canned responses or no intelligence</td>
                  <td className="p-4 text-[#3EDC81] font-bold">Friendly human voice companion that analyzes your specific trades</td>
                </tr>
                <tr className="hover:bg-[#1a1614]">
                  <td className="p-4 font-bold text-[#F2D7B6]">Crisis Training</td>
                  <td className="p-4 text-[#FF5C5C]">Only current bull-market calm price movements</td>
                  <td className="p-4 text-[#3EDC81] font-bold">Interactive COVID-19 -37% Crash Replay with candle-by-candle decisions</td>
                </tr>
                <tr className="hover:bg-[#1a1614]">
                  <td className="p-4 font-bold text-[#F2D7B6]">Risk Management Rules</td>
                  <td className="p-4 text-[#FF5C5C]">None. Encourages all-in options gambles</td>
                  <td className="p-4 text-[#3EDC81] font-bold">Enforces max 2% loss per trade and stop-loss execution</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: COVID-19 CRASH REPLAY ENGINE */}
      <section id="replay-engine" className="py-24 border-b border-white/10 bg-[#090909]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C98A4A]">
                HISTORICAL CRISIS SIMULATOR
              </span>
              <h2 className="text-3xl font-extrabold text-[#FAF7F5] sm:text-4xl">
                Experience the 2020 COVID Meltdown Without Losing Your Life Savings
              </h2>
              <p className="text-sm text-[#B9B4B1] leading-relaxed">
                Nifty 50 crashed from 12,246 down to 7,511 in 32 trading days. Step through weekly candles, test whether your emotions would panic-sell at the lower circuit, and learn how disciplined ₹5k SIP investors captured the fastest recovery in Indian market history.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="size-2 bg-[#FF5C5C]" />
                  <span className="text-[#FF5C5C] font-bold">Peak Panic: Mar 23, 2020 (7,511 • -37.1%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="size-2 bg-[#3EDC81]" />
                  <span className="text-[#3EDC81] font-bold">Breakout Reversal: Nov 09, 2020 (+5.5% All-Time High)</span>
                </div>
              </div>

              <Link
                href="/replay"
                className="inline-flex items-center gap-2 border border-[#C98A4A] bg-[#C98A4A] px-6 py-3 font-mono text-xs font-bold uppercase text-[#090909] hover:brightness-110 transition"
              >
                <span>Launch Full Crash Replay</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <TiltCard maxTilt={8} glareOpacity={0.15} className="border border-[#C98A4A]/40 bg-[#141210] p-6 shadow-2xl font-mono">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#FAF7F5]">NIFTY 50 • COVID-19 CRASH TIMELINE</span>
                    <span className="block text-[10px] text-[#C98A4A]">Step {replayCandleIdx + 1} of {crashCandles.length}</span>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-bold ${crashCandles[replayCandleIdx].close < 10000 ? "bg-[#FF5C5C]/20 text-[#FF5C5C]" : "bg-[#3EDC81]/20 text-[#3EDC81]"}`}>
                    {crashCandles[replayCandleIdx].drop}
                  </span>
                </div>

                <div className="mt-4 h-64 w-full">
                  <HighchartsStockChart
                    candles={crashCandles.slice(0, replayCandleIdx + 1)}
                    symbol="NIFTY 50"
                    height={250}
                  />
                </div>

                {/* Timeline Step Slider */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-[#B9B4B1]">
                    <span>{crashCandles[replayCandleIdx].label} (Price: ₹{crashCandles[replayCandleIdx].price})</span>
                    <span className="text-[#FAF7F5]">{crashCandles[replayCandleIdx].note}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={crashCandles.length - 1}
                    value={replayCandleIdx}
                    onChange={(e) => setReplayCandleIdx(Number(e.target.value))}
                    className="w-full accent-[#C98A4A]"
                  />
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMUNITY TESTIMONIALS MARQUEE */}
      <section className="py-24 border-b border-white/10 bg-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C98A4A]">
              COMMUNITY TESTIMONIALS
            </span>
            <h2 className="text-3xl font-extrabold text-[#FAF7F5] sm:text-5xl font-sans">
              Trusted by 14,000+ Disciplined Indian Traders
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[#B9B4B1]">
              Hear how retail learners transitioned from burning capital in fake simulators to trading profitably with real-life salary discipline.
            </p>
          </div>
          <MarqueeDemo />
        </div>
      </section>

      {/* GRAND LUXURY MEGA-FOOTER */}
      <footer className="border-t border-[#C98A4A]/25 bg-[#060606] pt-16 pb-12 font-mono text-xs">
        <div className="mx-auto max-w-7xl px-6 space-y-14">
          {/* Top CTA Banner */}
          <div className="border border-[#C98A4A]/40 bg-gradient-to-r from-[#141210] via-[#1c1815] to-[#141210] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(201,138,74,0.2)]">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#FAF7F5] font-sans">Ready to Build Real Financial Intuition?</h3>
              <p className="text-xs text-[#B9B4B1]">Start with ₹1,00,000 virtual cash mode or your exact salary SIP allocation.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/signup"
                className="border border-[#C98A4A] bg-[#C98A4A] px-6 py-3 font-bold text-[#090909] hover:brightness-110 transition shadow-lg"
              >
                Create Free Account →
              </Link>
              <Link
                href="/dashboard"
                className="border border-white/20 bg-[#161412] px-5 py-3 text-[#F2D7B6] hover:bg-[#201c18] transition"
              >
                Live Demo
              </Link>
            </div>
          </div>

          {/* 4 Column Directory */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/10 pb-12 text-[#B9B4B1]">
            {/* Col 1: Brand & Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center border border-[#C98A4A] bg-[#141210] p-1">
                  <img src="/icon.svg" alt="Investra" className="h-full w-full object-contain" />
                </div>
                <span className="text-sm font-bold tracking-wider text-[#FAF7F5]">INVESTRA</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#7A7471]">
                The AI-Powered Stock Market Learning Operating System for India. Pedagogical simulation with zero fake ₹10 Lakh gimmicks.
              </p>
              <div className="text-[10px] text-[#C98A4A]">
                NSE &bull; BSE &bull; SEBI Pedagogical Sandbox Compliance
              </div>
            </div>

            {/* Col 2: Broker Terminals */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-[#FAF7F5]">4 Broker Terminals</span>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/dashboard" className="hover:text-[#C98A4A]">Zerodha Kite (Light + 5-Depth)</Link></li>
                <li><Link href="/market" className="hover:text-[#C98A4A]">Groww Desktop (Retail Clean)</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#C98A4A]">Upstox Pro (TradingView + OI)</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#C98A4A]">Investra Bloomberg Dark Terminal</Link></li>
              </ul>
            </div>

            {/* Col 3: Flight Simulator Labs */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-[#FAF7F5]">Flight Simulator Labs</span>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/learn" className="hover:text-[#C98A4A]">Earnings Call Trap (Audio AI)</Link></li>
                <li><Link href="/learn" className="hover:text-[#C98A4A]">Fix Broken Portfolio Doctor</Link></li>
                <li><Link href="/learn" className="hover:text-[#C98A4A]">9:15 AM Opening Bell Slippage</Link></li>
                <li><Link href="/learn" className="hover:text-[#C98A4A]">Forensic Accounting Audits</Link></li>
                <li><Link href="/replay" className="hover:text-[#C98A4A]">2020 COVID-19 Crash Replay</Link></li>
              </ul>
            </div>

            {/* Col 4: Platform Navigation */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-[#FAF7F5]">Platform &amp; Tools</span>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/market" className="hover:text-[#C98A4A]">NSE Universe (2,640 Stocks)</Link></li>
                <li><Link href="/portfolio" className="hover:text-[#C98A4A]">Portfolio &amp; Virtual Funds</Link></li>
                <li><Link href="/ai" className="hover:text-[#C98A4A]">Investra AI Voice Mentor</Link></li>
                <li><Link href="/glossary" className="hover:text-[#C98A4A]">Financial Market Glossary</Link></li>
                <li><Link href="/news" className="hover:text-[#C98A4A]">Live Financial Telemetry</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal, SEBI Disclaimer & Status */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#7A7471]">
            <div>
              &copy; {new Date().getFullYear()} Investra Financial OS. For educational, pedagogical, and simulation purposes only. Not SEBI registered investment advice.
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#3EDC81]">
                <span className="size-2 rounded-full bg-[#3EDC81] animate-ping" />
                Host Network: Online (Port 3000)
              </span>
              <span>All 2,640 Equities Connected</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
