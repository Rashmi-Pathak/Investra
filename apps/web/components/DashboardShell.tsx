"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Mic,
  MicOff,
  Send,
  Volume2,
  X,
  Briefcase,
  BarChart2,
  Settings,
  Bell,
  ShoppingCart,
  LayoutDashboard,
  Menu,
  Layers,
  Droplet,
  Compass,
  ListFilter,
  TrendingUp,
} from "lucide-react";
import { useInvestraStore } from "@/store/useInvestraStore";
import { BrokerPresetId, brokerThemePresets } from "@investra/theme";
import { getNseEquitiesUniverse } from "@/lib/nseUniverse";
import { PreTradeAnalysisModal } from "@/components/PreTradeAnalysisModal";

const TOP_NAV_LINKS = [
  { href: "/dashboard", label: "DASHBOARD" },
  { href: "/market", label: "MARKETS" },
  { href: "/trading", label: "TRADE" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/orders", label: "ORDERS" },
  { href: "/news", label: "NEWS" },
  { href: "/replay", label: "REPLAY" },
  { href: "/learn", label: "LEARN" },
  { href: "/ai", label: "AI MENTOR" },
  { href: "/glossary", label: "GLOSSARY" },
];

const KITE_NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/funds", label: "Funds" },
];

const KITE_WATCHLIST_PAGES: Record<
  number,
  { symbol: string; tag?: string; changePct: number; ltp: number }[]
> = {
  1: [
    { symbol: "INFY", changePct: 1.29, ltp: 1845.2 },
    { symbol: "GMRINFRA", changePct: 1.14, ltp: 87.8 },
    { symbol: "SBIN", changePct: 0.5, ltp: 812.3 },
    { symbol: "GTPL", changePct: 0.07, ltp: 136.0 },
    { symbol: "CANBK", changePct: -4.39, ltp: 102.6 },
    { symbol: "NMDC", changePct: 0.25, ltp: 218.2 },
    { symbol: "RPOWER", changePct: 1.56, ltp: 39.05 },
    { symbol: "RELIANCE", changePct: -0.57, ltp: 2742.5 },
    { symbol: "TATAPOWER", changePct: 0.94, ltp: 430.3 },
    { symbol: "NIFTY MAR 24500 CE", changePct: 0.36, ltp: 319.45 },
    { symbol: "DENORA-BE", changePct: -3.83, ltp: 450.0 },
    { symbol: "NIFTY 50", tag: "INDEX", changePct: 0.59, ltp: 24315.8 },
    { symbol: "CRUDEOIL APR FUT", tag: "MCX", changePct: 0.71, ltp: 6499.0 },
  ],
  2: [
    { symbol: "LAURUSLABS", changePct: 0.59, ltp: 475.0 },
    { symbol: "HDFCBANK", changePct: -1.19, ltp: 1682.4 },
    { symbol: "RAJRATAN", changePct: -1.34, ltp: 590.1 },
    { symbol: "BOSCHLTD", changePct: 1.03, ltp: 34262.25 },
    { symbol: "BSE", changePct: 1.75, ltp: 4545.35 },
    { symbol: "TCS", changePct: 0.85, ltp: 3912.8 },
    { symbol: "ICICIBANK", changePct: 1.12, ltp: 1248.9 },
    { symbol: "BHARTIARTL", changePct: 2.91, ltp: 1598.6 },
    { symbol: "JIOFIN", changePct: 4.82, ltp: 348.7 },
    { symbol: "NIFTY 50", tag: "INDEX EVENT", changePct: -0.42, ltp: 24315.8 },
  ],
  3: [
    { symbol: "YESBANK", changePct: 3.99, ltp: 20.33 },
    { symbol: "HDFCBANK", changePct: 0.63, ltp: 1682.4 },
    { symbol: "BANKBARODA", changePct: 0.71, ltp: 238.36 },
    { symbol: "IDFCFIRSTB", changePct: 1.8, ltp: 78.07 },
    { symbol: "SBIN", changePct: 1.06, ltp: 812.4 },
    { symbol: "AXISBANK", changePct: -0.43, ltp: 1151.7 },
    { symbol: "KOTAKBANK", changePct: 0.79, ltp: 1857.9 },
    { symbol: "FEDERALBNK", changePct: 0.43, ltp: 193.4 },
    { symbol: "INDUSINDBK", changePct: 0.57, ltp: 1028.39 },
  ],
  4: [
    { symbol: "20MICRONS", changePct: 1.45, ltp: 242.5 },
    { symbol: "21STCENMGM", changePct: 0.79, ltp: 617.0 },
    { symbol: "360ONE", changePct: 2.15, ltp: 985.4 },
    { symbol: "3MINDIA", changePct: -0.64, ltp: 31450.0 },
    { symbol: "5PAISA", changePct: 1.92, ltp: 512.8 },
    { symbol: "ABB", changePct: 1.34, ltp: 7840.0 },
    { symbol: "ADANIENT", changePct: -1.1, ltp: 2940.0 },
  ],
  5: [
    { symbol: "TATAMOTORS", changePct: 1.82, ltp: 965.4 },
    { symbol: "MARUTI", changePct: -0.75, ltp: 12180.0 },
    { symbol: "M&M", changePct: 2.04, ltp: 2890.5 },
    { symbol: "BAJAJ-AUTO", changePct: 0.95, ltp: 9820.0 },
    { symbol: "EICHERMOT", changePct: 1.12, ltp: 4780.0 },
  ],
  6: [
    { symbol: "SUNPHARMA", changePct: 1.8, ltp: 1890.2 },
    { symbol: "DRREDDY", changePct: 0.65, ltp: 1340.0 },
    { symbol: "CIPLA", changePct: -0.45, ltp: 1520.8 },
    { symbol: "DIVISLAB", changePct: 1.25, ltp: 5890.0 },
  ],
  7: [
    { symbol: "HAL", changePct: 3.4, ltp: 4420.0 },
    { symbol: "BEL", changePct: 2.85, ltp: 292.4 },
    { symbol: "MAZDOCK", changePct: 4.1, ltp: 4180.0 },
    { symbol: "BDL", changePct: 1.95, ltp: 1190.0 },
  ],
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [uiMenuOpen, setUiMenuOpen] = useState(false);
  const [cornerAiOpen, setCornerAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  // Zerodha Kite Left Marketwatch state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileWatchlistOpen, setMobileWatchlistOpen] = useState(false);
  const [kiteWatchlistTab, setKiteWatchlistTab] = useState<number>(1);
  const [kiteSearch, setKiteSearch] = useState("");
  const [kiteTradeTarget, setKiteTradeTarget] = useState<{
    symbol: string;
    name: string;
    price: number;
    side: "BUY" | "SELL";
  } | null>(null);

  const {
    user,
    isAuthenticated,
    logoutUser,
    financialMode,
    setFinancialMode,
    brokerPreset,
    setBrokerPreset,
    brokerWallet,
    beginnerWallet,
    monthlySip,
    holdings,
    orders,
    xp,
    aiMessages,
    askAITutor,
    syncLiveMarketData,
    executeVirtualOrder,
  } = useInvestraStore();

  const cornerAiEndRef = React.useRef<HTMLDivElement | null>(null);
  const cornerAiScrollRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cornerAiOpen) {
      if (cornerAiScrollRef.current) {
        cornerAiScrollRef.current.scrollTop = cornerAiScrollRef.current.scrollHeight;
      }
      cornerAiEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      const timer = setTimeout(() => {
        if (cornerAiScrollRef.current) {
          cornerAiScrollRef.current.scrollTop = cornerAiScrollRef.current.scrollHeight;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [aiMessages, cornerAiOpen]);

  // Only synchronize telemetry when navigating to Learn, AI Mentor, or News
  useEffect(() => {
    if (
      pathname.startsWith("/learn") ||
      pathname.startsWith("/ai") ||
      pathname.startsWith("/news")
    ) {
      syncLiveMarketData("RELIANCE");
    }
  }, [pathname, syncLiveMarketData]);

  const activeBalance =
    financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;

  const isKiteMode = brokerPreset === "kite";

  const matchedSearchCompanies = searchQuery.trim()
    ? getNseEquitiesUniverse()
        .filter(
          (c) =>
            c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 8)
    : [];

  const kiteWatchlistItems = kiteSearch.trim()
    ? getNseEquitiesUniverse()
        .filter(
          (c) =>
            c.symbol.toLowerCase().includes(kiteSearch.toLowerCase()) ||
            c.name.toLowerCase().includes(kiteSearch.toLowerCase())
        )
        .slice(0, 15)
        .map((c) => ({
          symbol: c.symbol,
          tag: c.series,
          changePct: c.changePercent,
          ltp: c.price,
        }))
    : KITE_WATCHLIST_PAGES[kiteWatchlistTab] || KITE_WATCHLIST_PAGES[1];

  const handleMicToggle = () => {
    if (typeof window === "undefined") return;
    const SpeechRec =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      setAiInput((prev) =>
        prev ? prev : "Explain PE ratio and risk in my portfolio"
      );
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (transcript) {
        setAiInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      }
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const speakMessage = async (id: string, text: string) => {
    setSpeakingMsgId(id);
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
        audio.onended = () => setSpeakingMsgId(null);
        await audio.play();
        return;
      }
    } catch {
      // Fallback
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.onend = () => setSpeakingMsgId(null);
      window.speechSynthesis.speak(utter);
    } else {
      setSpeakingMsgId(null);
    }
  };

  const handleSendCornerAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    askAITutor(aiInput.trim(), "CORNER AI ASSISTANT");
    setAiInput("");
  };

  // ============================================================================
  // ZERODHA KITE UI MODE (WHEN brokerPreset === "kite")
  // Matches the exact light Zerodha Kite layout from the user's screenshots
  // ============================================================================
  if (isKiteMode) {
    return (
      <div className="min-h-screen bg-white text-[#444444] flex flex-col font-sans">
        {/* ZERODHA KITE TOP HEADER BAR */}
        <header className="sticky top-0 z-40 flex h-14 items-center border-b border-[#EEEEEE] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          {/* Left Marketwatch Top Strip (NIFTY 50 & SENSEX) */}
          <div className="hidden lg:flex w-[370px] shrink-0 h-full items-center justify-between border-r border-[#EEEEEE] px-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#444444]">NIFTY 50</span>
              <span className="font-semibold text-[#4caf50]">24,315.80</span>
              <span className="text-[11px] text-[#9b9b9b]">+0.59%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#444444]">SENSEX</span>
              <span className="font-semibold text-[#4caf50]">79,942.20</span>
              <span className="text-[11px] text-[#9b9b9b]">+0.61%</span>
            </div>
          </div>

          {/* Right Workspace Header: Kite Logo + Nav Links + UI Switcher + User */}
          <div className="flex flex-1 items-center justify-between px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              {/* Iconic Kite Orange-Red Geometric Emblem */}
              <div className="relative flex size-6 items-center justify-center">
                <svg viewBox="0 0 30 20" className="w-6 h-4">
                  <polygon points="10,0 30,0 20,10 0,10" fill="#ff5722" />
                  <polygon points="10,10 20,10 30,20 10,20 0,10" fill="#e64a19" />
                </svg>
              </div>
              <span className="text-base font-semibold tracking-tight text-[#444444]">
                Kite
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6 text-[13px]">
                {KITE_NAV_LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`py-4 border-b-2 transition ${
                        active
                          ? "border-[#ff5722] text-[#ff5722] font-medium"
                          : "border-transparent text-[#444444] hover:text-[#ff5722]"
                      }`}
                    >
                      {item.label}
                      {item.label === "Orders" && (
                        <span className="ml-1 inline-flex items-center justify-center bg-[#ff5722] px-1 text-[9px] font-bold text-white">
                          5
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* UI Dropdown to switch between Zerodha Kite and other terminals */}
              <div className="relative">
                <button
                  onClick={() => setUiMenuOpen((v) => !v)}
                  className="flex h-8 items-center gap-1.5 border border-[#ff5722] bg-[#fff5f2] px-2.5 text-xs font-semibold text-[#ff5722]"
                >
                  <span>UI: Zerodha</span>
                  <ChevronDown className="size-3.5" />
                </button>

                {uiMenuOpen && (
                  <div className="absolute right-0 top-10 z-50 w-56 border border-[#e0e0e0] bg-white py-1 shadow-xl">
                    <div className="border-b border-[#eeeeee] px-3 py-1.5 text-[10px] font-bold uppercase text-[#9b9b9b]">
                      Switch Broker Interface
                    </div>
                    {(Object.keys(brokerThemePresets) as BrokerPresetId[]).map(
                      (id) => {
                        const preset = brokerThemePresets[id];
                        const active = brokerPreset === id;
                        return (
                          <button
                            key={id}
                            onClick={() => {
                              setBrokerPreset(id);
                              setUiMenuOpen(false);
                            }}
                            className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition ${
                              active
                                ? "bg-[#fff5f2] font-bold text-[#ff5722]"
                                : "text-[#444444] hover:bg-[#f9f9f9]"
                            }`}
                          >
                            <span>{preset.name}</span>
                            <span
                              className="size-2.5 inline-block"
                              style={{ backgroundColor: preset.accent }}
                            />
                          </button>
                        );
                      }
                    )}
                  </div>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-3 border-l border-[#eeeeee] pl-4 text-xs text-[#666666]">
                <ShoppingCart className="size-4 text-[#666666]" />
                <Bell className="size-4 text-[#666666]" />
                <Link
                  href="/portfolio"
                  className="flex items-center gap-2 hover:text-[#ff5722] transition"
                >
                  <div className="flex size-6 items-center justify-center bg-[#f0f0f0] text-[11px] font-bold text-[#444444]">
                    {(user?.name || "Nithin").slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-medium text-[#444444]">
                    {user?.name || "Nithin"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* ZERODHA KITE SPLIT BODY: LEFT MARKETWATCH + RIGHT WORKSPACE */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Marketwatch Column */}
          <aside className="hidden lg:flex w-[370px] shrink-0 flex-col justify-between border-r border-[#EEEEEE] bg-white min-h-[calc(100vh-3.5rem)]">
            <div>
              {/* Kite Search Input */}
              <div className="flex items-center justify-between border-b border-[#EEEEEE] px-3.5 py-2.5">
                <div className="flex flex-1 items-center gap-2">
                  <Search className="size-3.5 text-[#9b9b9b]" />
                  <input
                    type="text"
                    value={kiteSearch}
                    onChange={(e) => setKiteSearch(e.target.value)}
                    placeholder="Search eg: infy bse, nifty fut, gold mcx"
                    className="w-full bg-transparent text-xs text-[#444444] placeholder-[#9b9b9b] focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-[#9b9b9b]">
                  {kiteWatchlistItems.length} / 50
                </span>
              </div>

              {/* Group Header */}
              <div className="flex items-center justify-between border-b border-[#f1f1f1] bg-[#fafafa] px-3.5 py-1.5 text-[11px] text-[#666666]">
                <span className="font-medium">
                  Watchlist {kiteWatchlistTab} ({kiteWatchlistItems.length})
                </span>
                <Link
                  href="/market"
                  className="text-[#4184f3] hover:underline"
                >
                  + All 2,640 NSE
                </Link>
              </div>

              {/* Stock Rows */}
              <div className="divide-y divide-[#f1f1f1] overflow-y-auto max-h-[calc(100vh-11rem)]">
                {kiteWatchlistItems.map((item) => {
                  const isUp = item.changePct >= 0;
                  const cleanSymbol = item.symbol.split(" ")[0];
                  const heldPosition = holdings.find(
                    (h) => h.symbol.toUpperCase() === cleanSymbol.toUpperCase()
                  );
                  const liveQtyHeld = heldPosition?.qty;

                  return (
                    <div
                      key={item.symbol}
                      className="group relative flex items-center justify-between px-3.5 py-2.5 text-xs hover:bg-[#f9f9f9] transition"
                    >
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/company/${encodeURIComponent(cleanSymbol)}`}
                          className={`font-medium ${
                            isUp ? "text-[#4caf50]" : "text-[#df514c]"
                          }`}
                        >
                          {item.symbol}
                        </Link>
                        {item.tag && (
                          <span className="bg-[#f1f1f1] px-1 py-0.5 text-[9px] uppercase text-[#9b9b9b]">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {liveQtyHeld && liveQtyHeld > 0 ? (
                          <span className="flex items-center gap-0.5 text-[11px] text-[#9b9b9b]">
                            {liveQtyHeld}
                            <Briefcase className="size-3" />
                          </span>
                        ) : null}
                        <span className="w-12 text-right text-[11px] text-[#9b9b9b]">
                          {item.changePct > 0 ? "+" : ""}
                          {item.changePct.toFixed(2)}%
                        </span>
                        {isUp ? (
                          <ChevronUp className="size-3.5 text-[#4caf50]" />
                        ) : (
                          <ChevronDown className="size-3.5 text-[#df514c]" />
                        )}
                        <span
                          className={`w-16 text-right font-medium ${
                            isUp ? "text-[#4caf50]" : "text-[#df514c]"
                          }`}
                        >
                          {item.ltp.toFixed(2)}
                        </span>
                      </div>

                      {/* Kite Hover Quick Action Buttons: B (Buy), S (Sell), Chart */}
                      <div className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-1 bg-[#f9f9f9] pl-2 py-1">
                        <button
                          onClick={() =>
                            setKiteTradeTarget({
                              symbol: cleanSymbol,
                              name: item.symbol,
                              price: item.ltp,
                              side: "BUY",
                            })
                          }
                          title="Buy (Opens Pre-Trade Risk Analysis)"
                          className="flex h-6 w-7 items-center justify-center bg-[#4184f3] text-[11px] font-bold text-white hover:brightness-110"
                        >
                          B
                        </button>
                        <button
                          onClick={() =>
                            setKiteTradeTarget({
                              symbol: cleanSymbol,
                              name: item.symbol,
                              price: item.ltp,
                              side: "SELL",
                            })
                          }
                          title="Sell (Opens Pre-Trade Risk Analysis)"
                          className="flex h-6 w-7 items-center justify-center bg-[#ff5722] text-[11px] font-bold text-white hover:brightness-110"
                        >
                          S
                        </button>
                        <Link
                          href={`/company/${encodeURIComponent(cleanSymbol)}`}
                          title="Open Highcharts Candlestick Chart"
                          className="flex h-6 w-7 items-center justify-center border border-[#dddddd] bg-white text-[#444444] hover:border-[#4184f3]"
                        >
                          <BarChart2 className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom 1..7 Watchlist Pagination Bar */}
            <div className="flex items-center justify-between border-t border-[#EEEEEE] bg-white text-xs text-[#9b9b9b]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setKiteWatchlistTab(num);
                      setKiteSearch("");
                    }}
                    className={`px-3.5 py-2.5 border-r border-[#f1f1f1] transition ${
                      kiteWatchlistTab === num
                        ? "border-t-2 border-t-[#ff5722] font-semibold text-[#ff5722] bg-[#fafafa]"
                        : "hover:text-[#444444]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <button
                onClick={() => router.push("/market")}
                title="Browse all 2,640 NSE stocks"
                className="px-3 py-2.5 hover:text-[#444444]"
              >
                <Settings className="size-3.5" />
              </button>
            </div>
          </aside>

          {/* Right Workspace */}
          <main className="flex-1 overflow-y-auto bg-white p-3 sm:p-6 lg:p-8 pb-20 md:pb-8">
            {children}
          </main>
        </div>

        {/* Kite Mobile Watchlist Drawer */}
        {mobileWatchlistOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm lg:hidden">
            <div className="flex h-[80vh] flex-col rounded-t-2xl border-t border-[#e0e0e0] bg-white p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#eeeeee] pb-3">
                <div className="flex items-center gap-2 font-bold text-sm text-[#444444]">
                  <span className="size-2 bg-[#ff5722] inline-block" />
                  Kite Live Watchlist ({kiteWatchlistItems.length})
                </div>
                <button
                  onClick={() => setMobileWatchlistOpen(false)}
                  className="rounded-full bg-[#f0f0f0] p-1.5 text-[#666666] hover:bg-[#e0e0e0]"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Watchlist Tabs & Search */}
              <div className="py-2 space-y-2 border-b border-[#eeeeee]">
                <div className="flex items-center gap-2 rounded bg-[#f5f5f5] px-3 py-1.5 text-xs">
                  <Search className="size-3.5 text-[#999999]" />
                  <input
                    type="text"
                    value={kiteSearch}
                    onChange={(e) => setKiteSearch(e.target.value)}
                    placeholder="Search eg: infy, bse, reliance..."
                    className="w-full bg-transparent text-xs text-[#444444] focus:outline-none"
                  />
                  {kiteSearch && (
                    <button onClick={() => setKiteSearch("")} className="text-[11px] text-[#999999]">
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 overflow-x-auto py-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((tabNum) => (
                    <button
                      key={tabNum}
                      onClick={() => setKiteWatchlistTab(tabNum)}
                      className={`px-3 py-1 text-xs font-semibold rounded transition shrink-0 ${
                        kiteWatchlistTab === tabNum
                          ? "bg-[#ff5722] text-white"
                          : "bg-[#f5f5f5] text-[#666666]"
                      }`}
                    >
                      Watchlist {tabNum}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Watchlist Rows with instant B / S */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#f5f5f5] py-2">
                {kiteWatchlistItems.map((item) => {
                  const isUp = item.changePct >= 0;
                  const cleanSymbol = item.symbol.split(" ")[0];
                  return (
                    <div key={item.symbol} className="flex items-center justify-between py-2.5">
                      <div>
                        <Link
                          href={`/company/${encodeURIComponent(cleanSymbol)}`}
                          onClick={() => setMobileWatchlistOpen(false)}
                          className={`font-semibold text-xs ${isUp ? "text-[#4caf50]" : "text-[#df514c]"}`}
                        >
                          {item.symbol}
                        </Link>
                        <div className="text-[10px] text-[#999999]">
                          {item.changePct > 0 ? "+" : ""}{item.changePct.toFixed(2)}%
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-xs ${isUp ? "text-[#4caf50]" : "text-[#df514c]"}`}>
                          ₹{item.ltp.toFixed(2)}
                        </span>
                        <button
                          onClick={() => {
                            setKiteTradeTarget({
                              symbol: cleanSymbol,
                              name: cleanSymbol,
                              price: item.ltp,
                              side: "BUY",
                            });
                            setMobileWatchlistOpen(false);
                          }}
                          className="bg-[#4184f3] px-2 py-1 text-[11px] font-bold text-white rounded"
                        >
                          B
                        </button>
                        <button
                          onClick={() => {
                            setKiteTradeTarget({
                              symbol: cleanSymbol,
                              name: cleanSymbol,
                              price: item.ltp,
                              side: "SELL",
                            });
                            setMobileWatchlistOpen(false);
                          }}
                          className="bg-[#ff5722] px-2 py-1 text-[11px] font-bold text-white rounded"
                        >
                          S
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Kite Mobile Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-[#e5e7eb] bg-white text-[#666666] md:hidden shadow-lg">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition ${
              pathname === "/dashboard" ? "text-[#ff5722] font-bold" : "hover:text-[#ff5722]"
            }`}
          >
            <LayoutDashboard className="size-4" />
            <span>Dashboard</span>
          </Link>

          <button
            onClick={() => setMobileWatchlistOpen(true)}
            className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#4184f3] hover:text-[#ff5722] transition"
          >
            <ListFilter className="size-4" />
            <span>Watchlist</span>
          </button>

          <Link
            href="/portfolio"
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition ${
              pathname === "/portfolio" ? "text-[#ff5722] font-bold" : "hover:text-[#ff5722]"
            }`}
          >
            <Briefcase className="size-4" />
            <span>Portfolio</span>
          </Link>

          <Link
            href="/funds"
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition ${
              pathname === "/funds" ? "text-[#ff5722] font-bold" : "hover:text-[#ff5722]"
            }`}
          >
            <Droplet className="size-4" />
            <span>Funds</span>
          </Link>

          <button
            onClick={() => setUiMenuOpen((v) => !v)}
            className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#ff5722] hover:brightness-110 transition"
          >
            <Layers className="size-4" />
            <span>UI: Kite</span>
          </button>
        </nav>

        {/* Mandatory Pre-Trade Risk Analysis Modal for Kite Marketwatch B/S buttons */}
        <PreTradeAnalysisModal
          draft={
            kiteTradeTarget
              ? {
                  symbol: kiteTradeTarget.symbol,
                  companyName: kiteTradeTarget.name,
                  sector: "Equities",
                  side: kiteTradeTarget.side,
                  qty: 10,
                  price: kiteTradeTarget.price,
                  productType: "CNC (Delivery)",
                  orderType: "MARKET",
                  stopLoss: Number((kiteTradeTarget.price * 0.97).toFixed(2)),
                }
              : null
          }
          availableCash={activeBalance}
          monthlySip={monthlySip}
          financialMode={financialMode}
          onCancel={() => setKiteTradeTarget(null)}
          onConfirm={() => {
            if (!kiteTradeTarget) return;
            executeVirtualOrder({
              symbol: kiteTradeTarget.symbol,
              side: kiteTradeTarget.side,
              qty: 10,
              price: kiteTradeTarget.price,
              orderType: "MARKET",
              productType: "CNC",
            });
            setKiteTradeTarget(null);
          }}
        />

        {/* Corner AI Mentor in Kite Mode too */}
        <div className="fixed bottom-16 md:bottom-5 right-4 md:right-5 z-50">
          {cornerAiOpen ? (
            <div className="w-[calc(100vw-2rem)] sm:w-[400px] border border-[#090909] bg-[#0B0B0B] text-[#FAF7F5] shadow-2xl flex flex-col max-h-[80vh] sm:max-h-[520px]">
              <div className="flex items-center justify-between border-b border-[#ff5722]/40 bg-[#141210] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-[#3EDC81] inline-block animate-ping" />
                  <div>
                    <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#FAF7F5]">
                      INVESTRA GLOBAL AI MENTOR
                    </h3>
                    <span className="font-mono text-[10px] text-[#ff5722]">
                      Zerodha Kite Context + Voice Active
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setCornerAiOpen(false)}
                  className="border border-white/15 p-1 text-[#B9B4B1] hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div
                ref={cornerAiScrollRef}
                className="flex-1 space-y-2.5 overflow-y-auto p-3 text-xs max-h-[300px] scroll-smooth"
              >
                {aiMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`border p-3 leading-relaxed ${
                      msg.role === "assistant"
                        ? "border-[#ff5722]/30 bg-[#141210] text-[#FAF7F5]"
                        : "ml-6 border-white/15 bg-[#1C1917] text-[#F2D7B6]"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                ))}
                <div ref={cornerAiEndRef} />
              </div>
              <form
                onSubmit={handleSendCornerAI}
                className="flex items-center gap-1.5 border-t border-white/15 bg-[#12100E] p-2.5"
              >
                <button
                  type="button"
                  onClick={handleMicToggle}
                  className="flex size-9 shrink-0 items-center justify-center border border-[#ff5722]/40 bg-[#181614] text-[#FAF7F5]"
                >
                  {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                </button>
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask AI or tap mic..."
                  className="flex-1 border border-white/10 bg-[#090909] px-3 py-2 font-mono text-xs text-[#FAF7F5]"
                />
                <button
                  type="submit"
                  className="flex size-9 shrink-0 items-center justify-center bg-[#ff5722] text-white"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setCornerAiOpen(true)}
              title="Open Investra AI Mentor"
              className="relative flex size-14 items-center justify-center border-2 border-[#ff5722] bg-[#0B0B0B] font-mono text-sm font-extrabold text-[#ff5722] shadow-lg transition hover:scale-105"
            >
              <span>AI</span>
              <span className="absolute top-1.5 right-1.5 size-2 bg-[#4caf50]" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // DEFAULT INVESTRA TERMINAL SHELL (DARK HIGH-CRAFT MODE)
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#090909] text-[#FAF7F5] flex flex-col">
      {/* TIER 1: TOP LIVE NSE TICKER STRIP */}
      <div className="flex h-8 items-center justify-between border-b border-[#C98A4A]/20 bg-[#050505] px-4 font-mono text-[11px] text-[#B9B4B1] overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-bold text-[#3EDC81]">
            <span className="size-2 bg-[#3EDC81] inline-block animate-pulse" />
            NSE LIVE
          </span>
          <span>
            NIFTY 50: <strong className="text-[#FAF7F5]">24,315.80</strong>{" "}
            <span className="text-[#3EDC81]">+0.59%</span>
          </span>
          <span>
            SENSEX: <strong className="text-[#FAF7F5]">79,942.20</strong>{" "}
            <span className="text-[#3EDC81]">+0.61%</span>
          </span>
          <span className="hidden md:inline">
            BANK NIFTY: <strong className="text-[#FAF7F5]">51,840.40</strong>{" "}
            <span className="text-[#FF5C5C]">-0.25%</span>
          </span>
          <span className="hidden lg:inline">
            NIFTY IT: <strong className="text-[#FAF7F5]">38,740.10</strong>{" "}
            <span className="text-[#3EDC81]">+1.15%</span>
          </span>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() =>
              setFinancialMode(
                financialMode === "REAL_LIFE" ? "BEGINNER" : "REAL_LIFE"
              )
            }
            className="text-[#D8A56D] hover:text-[#FAF7F5]"
            title="Click to switch between Real-Life Salary SIP Mode and ₹10L Classic Simulator"
          >
            VIRTUAL BALANCE:{" "}
            <strong className="text-[#3EDC81]">
              ₹{activeBalance.toLocaleString("en-IN")}
            </strong>
          </button>
          <span className="text-[#7A7471]">
            MARKET: <strong className="text-[#3EDC81]">OPEN (SIM)</strong>
          </span>
        </div>
      </div>

      {/* TIER 2: MAIN HORIZONTAL TERMINAL NAVBAR (NO SIDEBAR) */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#C98A4A]/25 bg-[#0B0B0B]/95 px-4 backdrop-blur-md lg:px-6">
        <div className="flex items-center gap-6 overflow-x-auto">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-lg font-extrabold tracking-wider text-[#C98A4A]">
              INVESTRA
            </span>
            <span className="border border-[#C98A4A]/50 bg-[#181614] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-[#F2D7B6]">
              VIRTUAL
            </span>
          </Link>

          <nav className="flex items-center gap-1 lg:gap-2">
            {TOP_NAV_LINKS.map((item) => {
              const active =
                pathname === item.href ||
                (item.href === "/market" && pathname?.startsWith("/company/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-4 font-mono text-xs font-bold tracking-wider transition border-b-2 ${
                    active
                      ? "border-[#C98A4A] text-[#C98A4A]"
                      : "border-transparent text-[#B9B4B1] hover:text-[#FAF7F5]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: Search Icon, "UI ▾" Dropdown, User / Auth */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Normal Search Icon Button */}
          <div className="relative">
            <button
              onClick={() => {
                setSearchOpen((v) => !v);
                setUiMenuOpen(false);
              }}
              aria-label="Search Companies"
              className="flex size-9 items-center justify-center border border-[#C98A4A]/35 bg-[#141414] text-[#F2D7B6] hover:border-[#C98A4A] hover:text-white"
            >
              <Search className="size-4" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-11 z-50 w-80 border border-[#C98A4A] bg-[#0B0B0B] p-3 shadow-2xl">
                <div className="flex items-center gap-2 border border-white/15 bg-[#141414] px-2.5 py-1.5">
                  <Search className="size-3.5 text-[#C98A4A]" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 2,640 NSE stocks (e.g. 21STCENMGM, TCS)..."
                    className="w-full bg-transparent font-mono text-xs text-[#FAF7F5] focus:outline-none"
                  />
                </div>
                {matchedSearchCompanies.length > 0 && (
                  <div className="mt-2 max-h-60 divide-y divide-white/10 overflow-y-auto">
                    {matchedSearchCompanies.map((c) => (
                      <Link
                        key={c.symbol}
                        href={`/company/${c.symbol}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between px-2 py-2 font-mono text-xs hover:bg-[#181614]"
                      >
                        <div>
                          <span className="font-bold text-[#C98A4A]">{c.symbol}</span>
                          <span className="block text-[10px] text-[#7A7471] truncate max-w-[170px]">
                            {c.name}
                          </span>
                        </div>
                        <span className="text-[#FAF7F5]">₹{c.price.toFixed(2)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Compact "UI ▾" Broker Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setUiMenuOpen((v) => !v);
                setSearchOpen(false);
              }}
              className="flex h-9 items-center gap-1.5 border border-[#C98A4A]/40 bg-[#141414] px-3 font-mono text-xs font-bold text-[#F2D7B6] hover:border-[#C98A4A]"
            >
              <span>UI</span>
              <ChevronDown className="size-3.5 text-[#C98A4A]" />
            </button>

            {uiMenuOpen && (
              <div className="absolute right-0 top-11 z-50 w-56 border border-[#C98A4A] bg-[#0B0B0B] py-1 shadow-2xl">
                <div className="border-b border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase text-[#7A7471]">
                  Switch Broker Interface
                </div>
                {(Object.keys(brokerThemePresets) as BrokerPresetId[]).map(
                  (id) => {
                    const preset = brokerThemePresets[id];
                    const active = brokerPreset === id;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setBrokerPreset(id);
                          setUiMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left font-mono text-xs transition ${
                          active
                            ? "bg-[#211C19] font-bold text-[#C98A4A]"
                            : "text-[#FAF7F5] hover:bg-[#161616]"
                        }`}
                      >
                        <span>{preset.name}</span>
                        <span
                          className="size-2.5 inline-block"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </button>
                    );
                  }
                )}
              </div>
            )}
          </div>

          {/* Auth Status / Sign In / Logout */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden sm:block text-right font-mono leading-tight">
                <div className="text-xs font-bold text-[#FAF7F5]">
                  {user.name}
                </div>
                <div className="text-[10px] text-[#C98A4A]">
                  {xp} XP • LEVEL {user.level}
                </div>
              </div>
              <button
                onClick={() => {
                  logoutUser();
                  router.push("/login");
                }}
                className="border border-[#FF5C5C]/45 bg-[#1A0E0E] px-3 py-1.5 font-mono text-xs font-bold text-[#FF5C5C] hover:bg-[#FF5C5C] hover:text-[#090909] transition"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="border border-white/20 bg-[#141414] px-3.5 py-1.5 font-mono text-xs font-bold text-[#FAF7F5] hover:border-[#C98A4A]"
              >
                SIGN IN
              </Link>
              <Link
                href="/signup"
                className="bg-[#C98A4A] px-3.5 py-1.5 font-mono text-xs font-bold text-[#090909] hover:brightness-110"
              >
                REGISTER
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* FULL-WIDTH MAIN WORKSPACE */}
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-20 md:pb-8">
        {children}
      </main>

      {/* Investra Mobile Menu Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-sm md:hidden font-mono">
          <div className="flex max-h-[85vh] flex-col rounded-t-2xl border-t border-[#C98A4A]/40 bg-[#12100E] p-5 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="size-2 bg-[#C98A4A] inline-block" />
                <span className="font-extrabold text-sm text-[#FAF7F5]">
                  INVESTRA DIRECTORY &amp; TOOLS
                </span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="border border-white/15 bg-[#1c1815] p-1.5 text-[#B9B4B1] hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Quick Financial Mode Switcher inside mobile drawer */}
            <div className="my-4 border border-[#C98A4A]/30 bg-[#090909] p-3 text-xs">
              <span className="text-[10px] text-[#7A7471] uppercase block mb-1">
                Active Simulation Wallet Mode
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F2D7B6]">
                  {financialMode === "REAL_LIFE" ? "Real-Life Salary Mode" : "₹1,00,000 Cash Mode"}
                </span>
                <button
                  onClick={() =>
                    setFinancialMode(
                      financialMode === "REAL_LIFE" ? "BEGINNER" : "REAL_LIFE"
                    )
                  }
                  className="bg-[#C98A4A] px-2.5 py-1 text-[10px] font-bold text-[#090909]"
                >
                  Switch
                </button>
              </div>
            </div>

            {/* Grid of Platform Links */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { href: "/dashboard", label: "Dashboard", sub: "Terminal Overview" },
                { href: "/market", label: "Markets", sub: "2,640 NSE Stocks" },
                { href: "/trading", label: "Trade Desk", sub: "Candlestick Orders" },
                { href: "/portfolio", label: "Portfolio", sub: "Holdings & Funds" },
                { href: "/orders", label: "Orders Book", sub: "Executed & Open" },
                { href: "/learn", label: "Learn Simulator", sub: "50-Case Labs" },
                { href: "/replay", label: "Crash Replay", sub: "COVID Meltdown" },
                { href: "/ai", label: "AI Voice Mentor", sub: "Real-Time Coach" },
                { href: "/news", label: "News Feed", sub: "Live Telemetry" },
                { href: "/glossary", label: "Glossary", sub: "Financial Terms" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`border p-3 transition ${
                    pathname === item.href
                      ? "border-[#C98A4A] bg-[#1e1a17] text-[#FAF7F5]"
                      : "border-white/10 bg-[#0e0c0a] text-[#B9B4B1] hover:border-[#C98A4A]/50"
                  }`}
                >
                  <div className="font-bold text-[#FAF7F5]">{item.label}</div>
                  <div className="text-[10px] text-[#7A7471]">{item.sub}</div>
                </Link>
              ))}
            </div>

            {/* Broker UI Switcher in Drawer */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <span className="text-[10px] uppercase tracking-wider text-[#7A7471] block mb-2">
                Switch Broker Interface
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(Object.keys(brokerThemePresets) as BrokerPresetId[]).map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setBrokerPreset(id);
                      setMobileDrawerOpen(false);
                    }}
                    className={`flex items-center justify-between border p-2.5 transition ${
                      brokerPreset === id
                        ? "border-[#C98A4A] bg-[#221c17] text-[#C98A4A] font-bold"
                        : "border-white/10 bg-[#0c0c0c] text-[#B9B4B1]"
                    }`}
                  >
                    <span>{brokerThemePresets[id].name}</span>
                    <span
                      className="size-2.5 inline-block"
                      style={{ backgroundColor: brokerThemePresets[id].accent }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investra Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-[#C98A4A]/30 bg-[#0A0A0A]/95 text-[#B9B4B1] md:hidden font-mono shadow-2xl backdrop-blur-md">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            pathname === "/dashboard" ? "text-[#C98A4A] font-bold" : "hover:text-[#FAF7F5]"
          }`}
        >
          <LayoutDashboard className="size-4" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/market"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            pathname === "/market" ? "text-[#C98A4A] font-bold" : "hover:text-[#FAF7F5]"
          }`}
        >
          <BarChart2 className="size-4" />
          <span>Markets</span>
        </Link>

        <Link
          href="/trading"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            pathname === "/trading" ? "text-[#C98A4A] font-bold" : "hover:text-[#FAF7F5]"
          }`}
        >
          <TrendingUp className="size-4" />
          <span>Trade</span>
        </Link>

        <Link
          href="/portfolio"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition ${
            pathname === "/portfolio" ? "text-[#C98A4A] font-bold" : "hover:text-[#FAF7F5]"
          }`}
        >
          <Briefcase className="size-4" />
          <span>Portfolio</span>
        </Link>

        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#C98A4A] hover:text-white transition"
        >
          <Menu className="size-4" />
          <span>Menu</span>
        </button>
      </nav>

      {/* FLOATING BOTTOM-RIGHT AI TRIGGER & POPUP WITH MICROPHONE */}
      <div className="fixed bottom-16 md:bottom-5 right-4 md:right-5 z-50">
        {cornerAiOpen ? (
          <div className="w-[calc(100vw-2rem)] sm:w-[400px] border border-[#C98A4A] bg-[#0B0B0B] shadow-[0_0_50px_rgba(201,138,74,0.4)] flex flex-col max-h-[80vh] sm:max-h-[520px]">
            {/* Popup Header */}
            <div className="flex items-center justify-between border-b border-[#C98A4A]/30 bg-[#141210] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2 bg-[#3EDC81] inline-block animate-ping" />
                <div>
                  <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#FAF7F5]">
                    INVESTRA GLOBAL AI MENTOR
                  </h3>
                  <span className="font-mono text-[10px] text-[#C98A4A]">
                    Voice + Portfolio + Screen Context Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCornerAiOpen(false)}
                className="border border-white/15 p-1 text-[#B9B4B1] hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 border-b border-white/10 bg-[#0E0E0E] px-3 py-2">
              {[
                "Why did TCS move today?",
                "Explain PE using my portfolio",
                "Audit my ₹5,000 SIP risk",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => askAITutor(q, "GLOBAL AI")}
                  className="border border-[#C98A4A]/35 bg-[#161412] px-2 py-1 font-mono text-[10px] text-[#F2D7B6] hover:border-[#C98A4A]"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div
              ref={cornerAiScrollRef}
              className="flex-1 space-y-2.5 overflow-y-auto p-3 text-xs max-h-[300px] scroll-smooth"
            >
              {aiMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`border p-3 leading-relaxed ${
                    msg.role === "assistant"
                      ? "border-[#C98A4A]/30 bg-[#141210] text-[#FAF7F5]"
                      : "ml-6 border-white/15 bg-[#1C1917] text-[#F2D7B6]"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between font-mono text-[9px] uppercase text-[#C98A4A]">
                    <span>{msg.contextBadge || msg.role}</span>
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => speakMessage(msg.id, msg.content)}
                        className="inline-flex items-center gap-1 text-[#3EDC81] hover:underline"
                      >
                        <Volume2 className="size-3" />
                        {speakingMsgId === msg.id ? "Speaking..." : "Listen"}
                      </button>
                    )}
                  </div>
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              ))}
              <div ref={cornerAiEndRef} />
            </div>

            {/* Input with Microphone Button */}
            <form
              onSubmit={handleSendCornerAI}
              className="flex items-center gap-1.5 border-t border-[#C98A4A]/30 bg-[#12100E] p-2.5"
            >
              <button
                type="button"
                onClick={handleMicToggle}
                title="Voice Input (Microphone)"
                className={`flex size-9 shrink-0 items-center justify-center border transition ${
                  isListening
                    ? "border-[#FF5C5C] bg-[#FF5C5C]/20 text-[#FF5C5C] animate-pulse"
                    : "border-[#C98A4A]/40 bg-[#181614] text-[#F2D7B6] hover:border-[#C98A4A]"
                }`}
              >
                {isListening ? (
                  <MicOff className="size-4" />
                ) : (
                  <Mic className="size-4" />
                )}
              </button>
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder={
                  isListening
                    ? "Listening to your voice..."
                    : "Ask AI or tap mic to speak..."
                }
                className="flex-1 border border-white/10 bg-[#090909] px-3 py-2 font-mono text-xs text-[#FAF7F5] placeholder-[#7A7471] focus:border-[#C98A4A] focus:outline-none"
              />
              <button
                type="submit"
                className="flex size-9 shrink-0 items-center justify-center bg-[#C98A4A] text-[#090909] hover:brightness-110"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setCornerAiOpen(true)}
            title="Open Investra AI Mentor"
            className="relative flex size-14 items-center justify-center border-2 border-[#C98A4A] bg-[#0B0B0B] font-mono text-sm font-extrabold text-[#C98A4A] shadow-[0_0_30px_rgba(201,138,74,0.45)] transition hover:scale-105 hover:bg-[#181614]"
          >
            <span>AI</span>
            <span className="absolute top-1.5 right-1.5 size-2 bg-[#3EDC81]" />
          </button>
        )}
      </div>
    </div>
  );
}
