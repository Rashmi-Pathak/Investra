"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Landmark,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  History,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  Clock,
  Droplet,
  Briefcase,
  FileText,
  Search,
  Download,
  SlidersHorizontal,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { GrowwDesktopMarketView } from "@/components/GrowwDesktopMarketView";
import { UpstoxDesktopWorkspace } from "@/components/UpstoxDesktopWorkspace";
import { useInvestraStore } from "@/store/useInvestraStore";
import { NumberTicker, DecryptText } from "@investra/animations";

// Zerodha Kite and Pro Views are dynamically bound to the user's active virtual state.

export default function DashboardPage() {
  const {
    user,
    financialMode,
    setFinancialMode,
    brokerPreset,
    setBrokerPreset,
    salary,
    expenses,
    monthlySip,
    bankBalance,
    brokerWallet,
    beginnerWallet,
    simulatedMonth,
    holdings,
    orders,
    stocks,
    tradeCoachLogs,
    emotionalScore,
    simulateMonthCycle,
    transferToBroker,
    askAITutor,
  } = useInvestraStore();

  const [kiteSubTab, setKiteSubTab] = useState<"DASHBOARD" | "ORDERS" | "CONSOLE">("DASHBOARD");
  const [kiteHoldingsMetric, setKiteHoldingsMetric] = useState<"CURRENT" | "INVESTMENT" | "PNL">("CURRENT");
  const [showConsoleFilterModal, setShowConsoleFilterModal] = useState(false);
  const [selectedConsoleTypes, setSelectedConsoleTypes] = useState<string[]>(["Equity", "Equity (MF)", "Gold"]);

  const totalExpenses =
    expenses.rent + expenses.food + expenses.travel + expenses.emi + expenses.others;

  const portfolioInvested = holdings.reduce((acc, h) => acc + h.qty * h.avgPrice, 0);
  const portfolioCurrent = holdings.reduce((acc, h) => acc + h.qty * h.ltp, 0);
  const totalPnl = portfolioCurrent - portfolioInvested;
  const pnlPct = portfolioInvested > 0 ? (totalPnl / portfolioInvested) * 100 : 0;

  const toggleConsoleType = (t: string) => {
    setSelectedConsoleTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  // When Groww preset is selected, render Groww desktop terminal
  if (brokerPreset === "groww") {
    return <GrowwDesktopMarketView />;
  }

  // When Upstox preset is selected, render Upstox Pro desktop workspace
  if (brokerPreset === "upstox") {
    return <UpstoxDesktopWorkspace defaultView="POSITIONS" />;
  }

  // ============================================================================
  // ZERODHA KITE / CONSOLE WORKSPACE (WHEN brokerPreset === "kite")
  // ============================================================================
  if (brokerPreset === "kite") {
    return (
      <DashboardShell>
        <div className="space-y-6 text-[#444444]">
          {/* Sub-View Switcher Bar: Kite Dashboard | Kite Open Orders | Console Holdings & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eeeeee] pb-3">
            <div className="flex items-center gap-6 text-xs font-medium">
              <button
                onClick={() => setKiteSubTab("DASHBOARD")}
                className={`pb-2.5 border-b-2 transition ${
                  kiteSubTab === "DASHBOARD"
                    ? "border-[#ff5722] text-[#ff5722] font-semibold"
                    : "border-transparent text-[#666666] hover:text-[#ff5722]"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setKiteSubTab("ORDERS")}
                className={`pb-2.5 border-b-2 transition ${
                  kiteSubTab === "ORDERS"
                    ? "border-[#ff5722] text-[#ff5722] font-semibold"
                    : "border-transparent text-[#666666] hover:text-[#ff5722]"
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setKiteSubTab("CONSOLE")}
                className={`pb-2.5 border-b-2 transition ${
                  kiteSubTab === "CONSOLE"
                    ? "border-[#ff5722] text-[#ff5722] font-semibold"
                    : "border-transparent text-[#666666] hover:text-[#ff5722]"
                }`}
              >
                Holdings ({holdings.length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={simulateMonthCycle}
                className="border border-[#4184f3] bg-[#4184f3] px-3 py-1.5 text-xs font-medium text-white hover:brightness-110"
              >
                + Simulate Monthly ₹{(monthlySip / 1000).toFixed(0)}k SIP Credit
              </button>
              <button
                onClick={() => setBrokerPreset("original")}
                className="border border-[#dddddd] bg-[#fafafa] px-3 py-1.5 text-xs text-[#666666] hover:text-[#222222]"
              >
                Switch to Investra Dark UI
              </button>
            </div>
          </div>

          {/* VIEW 1: ZERODHA KITE SUMMARY DASHBOARD (Screenshot 1 & 4) */}
          {kiteSubTab === "DASHBOARD" && (
            <div className="space-y-8">
              {/* Greeting */}
              <div className="border-b border-[#f1f1f1] pb-4">
                <h1 className="text-2xl font-normal text-[#444444]">
                  Hi, {user?.name || "Investor"}
                </h1>
              </div>

              {/* Equity & Commodity Margin Columns */}
              <div className="grid gap-10 border-b border-[#f1f1f1] pb-8 md:grid-cols-2">
                {/* Equity */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#444444]">
                    <Clock className="size-4 text-[#666666]" />
                    <span>Equity</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 items-center gap-6">
                    <div className="border-r border-[#eeeeee] pr-6">
                      <div className="text-4xl font-light text-[#444444]">
                        {(
                          (financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet) /
                          1000
                        ).toFixed(1)}
                        k
                      </div>
                      <p className="mt-1.5 text-xs text-[#9b9b9b]">Margin available</p>
                    </div>
                    <div className="space-y-2 text-xs text-[#9b9b9b]">
                      <div className="flex justify-between">
                        <span>Margins used</span>
                        <span className="font-medium text-[#444444]">
                          {portfolioInvested > 0
                            ? `₹${Math.round(portfolioInvested).toLocaleString("en-IN")}`
                            : "0"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Opening balance</span>
                        <span className="font-medium text-[#444444]">
                          ₹{(financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <button
                        onClick={() => transferToBroker(2000)}
                        className="inline-flex items-center gap-1 pt-1 text-[11px] font-medium text-[#4184f3] hover:underline"
                      >
                        ◉ View statement / +Add ₹2,000
                      </button>
                    </div>
                  </div>
                </div>

                {/* Commodity */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#444444]">
                    <Droplet className="size-4 text-[#666666]" />
                    <span>Commodity</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 items-center gap-6">
                    <div className="border-r border-[#eeeeee] pr-6">
                      <div className="text-4xl font-light text-[#444444]">0</div>
                      <p className="mt-1.5 text-xs text-[#9b9b9b]">Available balance</p>
                    </div>
                    <div className="space-y-2 text-xs text-[#9b9b9b]">
                      <div className="flex justify-between">
                        <span>Margins used</span>
                        <span className="font-medium text-[#444444]">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Account value</span>
                        <span className="font-medium text-[#444444]">0</span>
                      </div>
                      <button
                        onClick={() => setKiteSubTab("CONSOLE")}
                        className="inline-flex items-center gap-1 pt-1 text-[11px] font-medium text-[#4184f3] hover:underline"
                      >
                        ◉ View statement
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Holdings Section with Multi-Color Allocation Bar */}
              <div className="border-b border-[#f1f1f1] pb-8">
                <div className="flex items-center gap-2 text-sm text-[#444444]">
                  <Briefcase className="size-4 text-[#666666]" />
                  <span>Holdings ({holdings.length})</span>
                </div>

                <div className="mt-5 grid gap-8 md:grid-cols-12 items-center">
                  <div className="md:col-span-5 border-r border-[#eeeeee] pr-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-4xl font-light ${
                          totalPnl > 0
                            ? "text-[#4caf50]"
                            : totalPnl < 0
                            ? "text-[#f44336]"
                            : "text-[#9b9b9b]"
                        }`}
                      >
                        {totalPnl !== 0
                          ? `${totalPnl > 0 ? "+" : ""}₹${Math.abs(totalPnl).toFixed(2)}`
                          : "₹0.00"}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          pnlPct > 0
                            ? "text-[#4caf50]"
                            : pnlPct < 0
                            ? "text-[#f44336]"
                            : "text-[#9b9b9b]"
                        }`}
                      >
                        {pnlPct !== 0 ? `${pnlPct > 0 ? "+" : ""}${pnlPct.toFixed(2)}%` : "0.00%"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#9b9b9b]">P&L</p>
                  </div>

                  <div className="md:col-span-7 space-y-2 text-xs text-[#9b9b9b]">
                    <div className="flex max-w-xs justify-between">
                      <span>Current value</span>
                      <span className="font-medium text-[#444444]">
                        ₹{Math.round(portfolioCurrent).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex max-w-xs justify-between">
                      <span>Investment</span>
                      <span className="font-medium text-[#444444]">
                        ₹{Math.round(portfolioInvested).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Iconic Zerodha Multi-Color Horizontal Allocation Strip or Clean Empty Bar */}
                {holdings.length === 0 ? (
                  <div className="mt-6 flex h-10 w-full items-center justify-between border border-dashed border-[#dddddd] bg-[#fafafa] px-4 text-xs text-[#888888]">
                    <span>You do not have any stocks in your Demat account yet (0 holdings)</span>
                    <Link
                      href="/market"
                      className="text-xs font-medium text-[#4184f3] hover:underline"
                    >
                      Start investing with 0 brokerage →
                    </Link>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div className="flex h-10 w-full overflow-hidden">
                      {holdings.map((h, i) => {
                        const palette = [
                          "#f44336",
                          "#e91e63",
                          "#9c27b0",
                          "#3f51b5",
                          "#2196f3",
                          "#00bcd4",
                          "#4caf50",
                          "#ff9800",
                        ];
                        const val = h.qty * h.ltp;
                        const pct = portfolioCurrent > 0 ? (val / portfolioCurrent) * 100 : 0;
                        return (
                          <div
                            key={h.symbol}
                            style={{
                              width: `${Math.max(pct, 5)}%`,
                              backgroundColor: palette[i % palette.length],
                            }}
                            className="transition-all duration-300"
                            title={`${h.symbol} • ₹${val.toLocaleString("en-IN")} (${pct.toFixed(1)}%)`}
                          />
                        );
                      })}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-[#666666]">
                      <span className="font-medium text-[#444444]">
                        ₹{Math.round(portfolioCurrent).toLocaleString("en-IN")}
                      </span>
                      <div className="flex items-center gap-4">
                        {[
                          { id: "CURRENT", label: "Current Value" },
                          { id: "INVESTMENT", label: "Investment Value" },
                          { id: "PNL", label: "P&L" },
                        ].map((opt) => (
                          <label
                            key={opt.id}
                            onClick={() => setKiteHoldingsMetric(opt.id as any)}
                            className="flex cursor-pointer items-center gap-1.5 text-xs"
                          >
                            <span
                              className={`flex size-3.5 items-center justify-center border ${
                                kiteHoldingsMetric === opt.id
                                  ? "border-[#ff5722]"
                                  : "border-[#bbbbbb]"
                              }`}
                            >
                              {kiteHoldingsMetric === opt.id && (
                                <span className="size-2 bg-[#ff5722]" />
                              )}
                            </span>
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Row: Market Overview Curve + Positions ({holdings.length}) */}
              <div className="grid gap-10 md:grid-cols-12">
                {/* Market Overview */}
                <div className="md:col-span-7">
                  <div className="flex items-center gap-2 text-sm text-[#444444]">
                    <TrendingUp className="size-4 text-[#666666]" />
                    <span>Market overview</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#666666]">
                    <span className="size-2.5 bg-[#4184f3] inline-block" />
                    <span>NIFTY 50</span>
                  </div>
                  <div className="mt-3 border border-[#f1f1f1] bg-[#fcfcfc] p-4">
                    <svg viewBox="0 0 500 140" className="w-full h-36">
                      <polyline
                        fill="none"
                        stroke="#4184f3"
                        strokeWidth="2.5"
                        points="0,120 35,108 70,115 105,92 140,104 175,78 210,85 245,58 280,72 315,48 350,55 385,40 420,46 455,18 495,52"
                      />
                    </svg>
                    <div className="mt-2 flex justify-between text-[10px] text-[#9b9b9b]">
                      <span>Oct 24</span>
                      <span>Jan 25</span>
                      <span>Apr 25</span>
                      <span>Jul 25</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>

                {/* Positions (3) */}
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2 text-sm text-[#444444]">
                    <FileText className="size-4 text-[#666666]" />
                    <span>Positions ({holdings.length})</span>
                  </div>
                  {holdings.length === 0 ? (
                    <div className="mt-6 border border-dashed border-[#dddddd] bg-[#fafafa] p-6 text-center text-xs text-[#888888]">
                      No open intraday or delivery positions today
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4 text-xs">
                      {holdings.map((h, i) => (
                        <div key={h.symbol} className="space-y-1">
                          <div className="flex justify-between text-[#666666]">
                            <Link
                              href={`/company/${h.symbol}`}
                              className="font-medium text-[#444444] hover:text-[#ff5722]"
                            >
                              {h.symbol} (CNC)
                            </Link>
                            <span
                              className={
                                h.ltp >= h.avgPrice ? "text-[#4caf50]" : "text-[#f44336]"
                              }
                            >
                              {h.ltp >= h.avgPrice ? "+" : ""}₹{((h.ltp - h.avgPrice) * h.qty).toFixed(0)}
                            </span>
                          </div>
                          <div className="h-2.5 w-full bg-[#f5f5f5]">
                            <div
                              style={{ width: `${Math.min(100, 45 + i * 22)}%` }}
                              className={`h-full ${
                                i === 0 ? "bg-[#ff5722]" : "bg-[#4184f3]"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: ZERODHA KITE OPEN ORDERS TABLE (Screenshot 2) */}
          {kiteSubTab === "ORDERS" && (
            <div className="space-y-6">
              {/* Sub-nav: Orders | GTT | Baskets | SIP | Alerts | IPO | Auctions */}
              <div className="flex items-center gap-8 border-b border-[#eeeeee] text-xs">
                {["Orders", "GTT", "Baskets", "SIP", "Alerts", "IPO", "Auctions"].map(
                  (tab, idx) => (
                    <button
                      key={tab}
                      className={`pb-3 border-b-2 ${
                        idx === 0
                          ? "border-[#ff5722] text-[#ff5722] font-medium"
                          : "border-transparent text-[#666666] hover:text-[#ff5722]"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-normal text-[#444444]">
                  Open orders ({orders.length})
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border border-[#e0e0e0] px-3 py-1.5 text-xs">
                    <Search className="size-3.5 text-[#9b9b9b]" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-36 bg-transparent text-xs text-[#444444] focus:outline-none"
                    />
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs text-[#4184f3] hover:underline">
                    <Download className="size-3.5" />
                    Download
                  </button>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-[#e0e0e0] bg-[#fafafa]">
                  <Briefcase className="mx-auto size-12 text-[#cccccc] mb-3" />
                  <p className="text-base font-normal text-[#444444]">You haven't placed any orders today</p>
                  <p className="mt-1 text-xs text-[#9b9b9b]">All orders executed or pending in your virtual session will appear here</p>
                  <Link
                    href="/market"
                    className="mt-4 inline-block bg-[#4184f3] px-5 py-2 text-xs font-semibold text-white hover:brightness-110"
                  >
                    Get started
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#eeeeee] text-[#9b9b9b]">
                        <th className="py-3 px-2">Time</th>
                        <th className="py-3 px-2">Type</th>
                        <th className="py-3 px-2">Instrument</th>
                        <th className="py-3 px-2">Product</th>
                        <th className="py-3 px-2">Qty.</th>
                        <th className="py-3 px-2">LTP</th>
                        <th className="py-3 px-2">Price</th>
                        <th className="py-3 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f3f3f3]">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#fafafa]">
                          <td className="py-3.5 px-2 text-[#444444]">{o.time}</td>
                          <td className="py-3.5 px-2">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-medium ${
                                o.side === "BUY"
                                  ? "bg-[#e8f0fe] text-[#4184f3]"
                                  : "bg-[#fbe9e7] text-[#ff5722]"
                              }`}
                            >
                              {o.side}
                            </span>
                          </td>
                          <td className="py-3.5 px-2">
                            <Link
                              href={`/company/${o.symbol}`}
                              className="font-medium text-[#444444] hover:text-[#4184f3]"
                            >
                              {o.symbol}
                            </Link>{" "}
                            <span className="text-[10px] text-[#9b9b9b]">
                              NSE
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-[#666666]">{o.productType}</td>
                          <td className="py-3.5 px-2 text-[#444444]">{o.qty}</td>
                          <td className="py-3.5 px-2 text-[#444444]">₹{o.price.toFixed(2)}</td>
                          <td className="py-3.5 px-2 text-[#444444]">₹{o.price.toFixed(2)}</td>
                          <td className="py-3.5 px-2 text-right">
                            <span
                              className={`px-2.5 py-1 text-[10px] font-medium ${
                                o.status === "FILLED"
                                  ? "bg-[#e8f5e9] text-[#2e7d32]"
                                  : o.status === "OPEN"
                                  ? "bg-[#fff8e1] text-[#f57f17]"
                                  : "bg-[#ececec] text-[#666666]"
                              }`}
                            >
                              {o.status === "FILLED" ? "COMPLETE" : o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: ZERODHA CONSOLE HOLDINGS DONUT & FILTERS MODAL (Screenshot 3 & 4) */}
          {kiteSubTab === "CONSOLE" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eeeeee] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-extrabold tracking-tight text-[#1976d2]">
                    console
                  </span>
                  <span className="text-sm text-[#666666]">• Portfolio Holdings & Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedConsoleTypes.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#4184f3]/40 bg-[#e8f0fe] px-2.5 py-1 text-xs font-medium text-[#1976d2]"
                    >
                      {tag}
                    </span>
                  ))}
                  <button
                    onClick={() => setShowConsoleFilterModal(true)}
                    className="inline-flex items-center gap-1.5 border border-[#4184f3] bg-white px-3 py-1 text-xs font-semibold text-[#4184f3] hover:bg-[#e8f0fe]"
                  >
                    <SlidersHorizontal className="size-3.5" />
                    Filter
                  </button>
                </div>
              </div>

              {/* Summary Strip */}
              <div className="grid gap-6 border border-[#eeeeee] bg-[#fafafa] p-6 sm:grid-cols-3">
                <div>
                  <span className="text-xs text-[#9b9b9b]">Invested</span>
                  <div className="mt-1 text-2xl font-semibold text-[#444444]">
                    ₹{Math.round(portfolioInvested).toLocaleString("en-IN")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[#9b9b9b]">Unrealized P&L</span>
                  <div
                    className={`mt-1 text-2xl font-semibold ${
                      totalPnl >= 0 ? "text-[#4caf50]" : "text-[#f44336]"
                    }`}
                  >
                    {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)}{" "}
                    <span className="text-xs font-medium">
                      ({pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[#9b9b9b]">Portfolio XIRR</span>
                  <div
                    className={`mt-1 text-2xl font-semibold ${
                      portfolioInvested > 0 && totalPnl >= 0
                        ? "text-[#4caf50]"
                        : "text-[#9b9b9b]"
                    }`}
                  >
                    {portfolioInvested > 0 ? (totalPnl >= 0 ? "+14.8%" : "-3.2%") : "0.00%"}
                  </div>
                </div>
              </div>

              {/* Donut Charts Row */}
              <div className="grid gap-8 border border-[#eeeeee] p-6 md:grid-cols-2">
                <div className="flex items-center gap-8">
                  <div className="relative flex size-40 items-center justify-center rounded-none">
                    <svg viewBox="0 0 36 36" className="size-40">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#1565c0"
                        strokeWidth="4"
                        strokeDasharray={portfolioInvested > 0 ? "80, 100" : "0, 100"}
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="4"
                        strokeDasharray={portfolioInvested > 0 ? "20, 100" : "100, 100"}
                        strokeDashoffset={portfolioInvested > 0 ? "-80" : "0"}
                      />
                    </svg>
                    <span className="absolute text-xs font-medium text-[#666666]">
                      {portfolioInvested > 0 ? "Equity" : "Cash"}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between gap-6">
                      <span className="flex items-center gap-2">
                        <span className="size-2.5 bg-[#4caf50]" /> Available Cash
                      </span>
                      <span className="font-semibold">
                        ₹{(financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span className="flex items-center gap-2">
                        <span className="size-2.5 bg-[#1565c0]" /> Active Holdings
                      </span>
                      <span className="font-semibold">
                        ₹{Math.round(portfolioCurrent).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-l border-[#eeeeee] pl-6">
                  <div className="font-semibold text-[#444444] pb-1">
                    Top Stock Weights ({holdings.length})
                  </div>
                  {holdings.length === 0 ? (
                    <div className="py-6 text-center text-xs text-[#9b9b9b]">
                      No equity holdings to display. Buy stocks to view portfolio weights.
                    </div>
                  ) : (
                    holdings.slice(0, 7).map((item) => {
                      const val = item.qty * item.ltp;
                      const weightPct = portfolioCurrent > 0 ? ((val / portfolioCurrent) * 100).toFixed(1) : "0.0";
                      return (
                        <div key={item.symbol} className="flex justify-between text-[#666666]">
                          <Link href={`/company/${item.symbol}`} className="hover:text-[#4184f3]">
                            • {item.symbol}
                          </Link>
                          <span className="font-medium text-[#444444]">{weightPct}% (₹{val.toLocaleString("en-IN")})</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Zerodha Console Filter Modal (Matches Screenshot 3) */}
              {showConsoleFilterModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                  <div className="w-full max-w-xl border border-[#dddddd] bg-white p-6 shadow-2xl space-y-5 text-xs">
                    <div className="flex items-center justify-between border-b border-[#eeeeee] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-[#444444]">
                          Filters
                        </span>
                        <span className="bg-[#e8f0fe] px-2 py-0.5 text-xs font-bold text-[#1976d2]">
                          {selectedConsoleTypes.length}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedConsoleTypes([])}
                        className="border border-[#dddddd] px-3 py-1 text-xs text-[#4184f3] hover:bg-[#f9f9f9]"
                      >
                        Clear all
                      </button>
                    </div>

                    <div>
                      <span className="block text-[#666666] mb-2">Account</span>
                      <div className="flex flex-wrap gap-2">
                        <button className="border border-[#4184f3] bg-[#e8f0fe] px-3.5 py-1.5 font-medium text-[#1976d2]">
                          Primary
                        </button>
                        <button className="border border-dashed border-[#bbbbbb] px-3.5 py-1.5 text-[#4184f3]">
                          + Secondary demat
                        </button>
                        <button className="border border-[#dddddd] px-3.5 py-1.5 text-[#444444]">
                          Family accounts ▾
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[#666666] mb-2">Type</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Equity",
                          "Debt",
                          "Equity (MF)",
                          "Debt (MF)",
                          "Gold",
                          "Silver",
                        ].map((t) => {
                          const active = selectedConsoleTypes.includes(t);
                          return (
                            <button
                              key={t}
                              onClick={() => toggleConsoleType(t)}
                              className={`border px-3.5 py-1.5 font-medium ${
                                active
                                  ? "border-[#4184f3] bg-[#e8f0fe] text-[#1976d2]"
                                  : "border-[#dddddd] text-[#666666]"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="block text-[#666666] mb-2">Sectors</span>
                      <div className="flex flex-wrap gap-2">
                        {["FMCG", "AUTOMOBILE", "ETF", "RETAIL", "DEBT", "ENERGY"].map(
                          (sec) => (
                            <button
                              key={sec}
                              onClick={() => toggleConsoleType(sec)}
                              className={`border px-3.5 py-1.5 ${
                                selectedConsoleTypes.includes(sec)
                                  ? "border-[#4184f3] bg-[#e8f0fe] text-[#1976d2]"
                                  : "border-[#dddddd] text-[#666666]"
                              }`}
                            >
                              {sec}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="block text-[#666666] mb-2">Tags</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "automobile",
                          "pharma",
                          "paints",
                          "fno-delivery",
                          "banking",
                          "cement",
                        ].map((tag) => (
                          <button
                            key={tag}
                            className="border border-[#dddddd] px-3 py-1.5 text-[#666666] hover:border-[#4184f3]"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-[#eeeeee] pt-4">
                      <button
                        onClick={() => setShowConsoleFilterModal(false)}
                        className="bg-[#9b9b9b] px-4 py-2 font-medium text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setShowConsoleFilterModal(false)}
                        className="bg-[#1976d2] px-5 py-2 font-medium text-white"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DashboardShell>
    );
  }

  // ============================================================================
  // DEFAULT INVESTRA DARK COMMAND CENTER
  // ============================================================================
  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Top Welcome Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[#C98A4A]/35 bg-gradient-to-r from-[#211C19] via-[#181614] to-[#211C19] p-6 shadow-[0_0_45px_-12px_rgba(201,138,74,0.3)]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C98A4A]">
              <DecryptText
                text={
                  financialMode === "REAL_LIFE"
                    ? "REAL-LIFE SALARY ECOSYSTEM ACTIVE // SQLITE SYNCED"
                    : "BEGINNER ₹10,00,000 SANDBOX MODE ACTIVE"
                }
              />
            </span>
            <h1 className="mt-1 text-2xl font-bold text-[#FAF7F5] sm:text-3xl">
              Investor Command Center
            </h1>
            <p className="mt-1 text-xs text-[#B9B4B1]">
              Switch the top-right <strong>UI ▾</strong> menu to{" "}
              <button
                onClick={() => setBrokerPreset("kite")}
                className="font-bold text-[#C98A4A] underline"
              >
                Zerodha Kite
              </button>{" "}
              to experience the full Kite Marketwatch, Holdings bar, and Console view.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-[#C98A4A] bg-[#090909] p-0.5 font-mono text-xs">
              <button
                onClick={() => setFinancialMode("BEGINNER")}
                className={`px-3 py-2 font-bold transition ${
                  financialMode === "BEGINNER"
                    ? "bg-[#C98A4A] text-[#090909]"
                    : "text-[#B9B4B1] hover:text-white"
                }`}
              >
                ₹1,00,000 Cash
              </button>
              <button
                onClick={() => setFinancialMode("REAL_LIFE")}
                className={`px-3 py-2 font-bold transition ${
                  financialMode === "REAL_LIFE"
                    ? "bg-[#3EDC81] text-[#090909]"
                    : "text-[#B9B4B1] hover:text-white"
                }`}
              >
                Real-Life Salary
              </button>
            </div>
            {financialMode === "REAL_LIFE" && (
              <button
                onClick={simulateMonthCycle}
                className="bg-gradient-to-r from-[#C98A4A] to-[#D8A56D] px-4 py-2.5 text-xs font-bold text-[#090909] shadow-[0_0_24px_rgba(201,138,74,0.35)] transition hover:scale-105"
              >
                + Credit Month {simulatedMonth + 1} Salary SIP
              </button>
            )}
            <button
              onClick={() => setBrokerPreset("kite")}
              className="border border-[#ff5722]/60 bg-[#181614] px-4 py-2.5 text-xs font-semibold text-[#ff5722] hover:bg-[#211C19]"
            >
              Switch to Zerodha Kite UI →
            </button>
            <Link
              href="/trading"
              className="border border-[#C98A4A]/40 bg-[#181614] px-4 py-2.5 text-xs font-semibold text-[#F2D7B6] hover:bg-[#211C19]"
            >
              Open Broker Terminal →
            </Link>
          </div>
        </div>

        {/* 4 Key KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="investra-card p-5">
            <div className="flex items-center justify-between text-xs text-[#B9B4B1]">
              <span>Portfolio Market Value</span>
              <TrendingUp className="size-4 text-[#3EDC81]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#FAF7F5]">
              ₹{Math.round(portfolioCurrent).toLocaleString("en-IN")}
            </div>
            <div className="mt-2 flex items-center gap-2 font-mono text-xs">
              {holdings.length === 0 ? (
                <span className="text-[#7A7471]">0 holdings • Buy stocks in Trade</span>
              ) : (
                <>
                  <span className={totalPnl >= 0 ? "text-[#3EDC81]" : "text-[#FF5C5C]"}>
                    {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(0)} ({pnlPct.toFixed(2)}%)
                  </span>
                  <span className="text-[#7A7471]">vs ₹{portfolioInvested.toLocaleString("en-IN")} cost</span>
                </>
              )}
            </div>
          </div>

          <div className="investra-card p-5">
            <div className="flex items-center justify-between text-xs text-[#B9B4B1]">
              <span>
                {financialMode === "REAL_LIFE"
                  ? `Real-Life Broker Wallet (Month ${simulatedMonth})`
                  : "Fixed ₹1,00,000 Cash Wallet"}
              </span>
              <Landmark className="size-4 text-[#C98A4A]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#3EDC81]">
              ₹
              <NumberTicker
                value={financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-[#B9B4B1]">
              {financialMode === "BEGINNER" ? (
                <span className="font-mono text-[11px] text-[#7A7471]">
                  Adding cash locked in ₹1,00,000 mode
                </span>
              ) : (
                <>
                  <span>Bank: ₹{bankBalance.toLocaleString("en-IN")}</span>
                  <button
                    onClick={simulateMonthCycle}
                    className="font-mono text-[11px] font-semibold text-[#C98A4A] hover:underline"
                  >
                    +1x Monthly Salary SIP
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="investra-card p-5">
            <div className="flex items-center justify-between text-xs text-[#B9B4B1]">
              <span>Monthly Cashflow Pipeline</span>
              <Sparkles className="size-4 text-[#D8A56D]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#FAF7F5]">
              {financialMode === "BEGINNER" ? (
                <span className="text-lg text-[#F2D7B6]">₹1,00,000 Fixed Cap</span>
              ) : (
                <>
                  ₹<NumberTicker value={monthlySip} />
                  <span className="text-xs font-normal text-[#B9B4B1]"> / month SIP</span>
                </>
              )}
            </div>
            <p className="mt-2 font-mono text-[11px] text-[#B9B4B1]">
              {financialMode === "BEGINNER" ? (
                <Link href="/portfolio" className="text-[#C98A4A] hover:underline">
                  Switch to Real-Life Mode on Portfolio →
                </Link>
              ) : (
                `Salary ₹${(salary / 1000).toFixed(0)}k - Bills ₹${(totalExpenses / 1000).toFixed(0)}k = ₹${((salary - totalExpenses) / 1000).toFixed(0)}k Surplus`
              )}
            </p>
          </div>

          <div className="investra-card p-5">
            <div className="flex items-center justify-between text-xs text-[#B9B4B1]">
              <span>Emotional Trading Score</span>
              <ShieldCheck className="size-4 text-[#3EDC81]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#FAF7F5]">
              {tradeCoachLogs.length === 0 ? (
                <span className="text-lg text-[#7A7471]">— (0 Trades)</span>
              ) : (
                <NumberTicker value={emotionalScore} suffix=" / 100" />
              )}
            </div>
            <p className="mt-2 text-xs text-[#3EDC81]">
              {tradeCoachLogs.length === 0
                ? "Unlocks after your first trade"
                : "Low FOMO • Disciplined SIP sizing"}
            </p>
          </div>
        </div>

        {/* Middle Grid: Holdings + AI Coach Logs */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Portfolio Holdings & Quick AI Analysis */}
          <div className="investra-card lg:col-span-7 p-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#FAF7F5]">
                  Live Portfolio Holdings ({holdings.length})
                </h2>
                <p className="text-xs text-[#B9B4B1]">
                  Click any stock to inspect Highcharts candlesticks, Market Statistics & AI Insights
                </p>
              </div>
              <Link
                href="/orders"
                className="border border-[#C98A4A]/40 bg-[#211C19] px-3 py-1.5 font-mono text-xs font-semibold text-[#F2D7B6] hover:border-[#C98A4A]"
              >
                Order Book ({orders.length}) →
              </Link>
            </div>

            {holdings.length === 0 ? (
              <div className="py-10 text-center font-mono">
                <p className="text-sm font-bold text-[#FAF7F5]">
                  No Holdings Yet — Fresh Account
                </p>
                <p className="mt-1 text-xs text-[#7A7471]">
                  Your wallet is funded with{" "}
                  <strong className="text-[#3EDC81]">
                    ₹
                    {(financialMode === "REAL_LIFE"
                      ? brokerWallet
                      : beginnerWallet
                    ).toLocaleString("en-IN")}
                  </strong>
                  . Head to the Markets or Trade Terminal to buy your first equity.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <Link
                    href="/trading"
                    className="bg-[#C98A4A] px-4 py-2 text-xs font-extrabold text-[#090909]"
                  >
                    Place First Order →
                  </Link>
                  <Link
                    href="/market"
                    className="border border-white/15 bg-[#141414] px-4 py-2 text-xs font-bold text-[#FAF7F5]"
                  >
                    Browse 2,640 Stocks
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] font-mono text-[11px] uppercase text-[#7A7471]">
                      <th className="pb-2.5">Symbol</th>
                      <th className="pb-2.5">Qty</th>
                      <th className="pb-2.5">Avg Buy</th>
                      <th className="pb-2.5">LTP</th>
                      <th className="pb-2.5">Net P&L</th>
                      <th className="pb-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {holdings.map((h) => {
                      const pnl = (h.ltp - h.avgPrice) * h.qty;
                      const pct = ((h.ltp - h.avgPrice) / h.avgPrice) * 100;
                      return (
                        <tr key={h.symbol} className="group hover:bg-white/[0.02]">
                          <td className="py-3.5">
                            <Link
                              href={`/company/${h.symbol}`}
                              className="font-mono font-bold text-[#FAF7F5] hover:text-[#C98A4A]"
                            >
                              {h.symbol}
                            </Link>
                            <span className="block text-[11px] text-[#7A7471]">{h.sector}</span>
                          </td>
                          <td className="py-3.5 font-mono">{h.qty}</td>
                          <td className="py-3.5 font-mono text-[#B9B4B1]">₹{h.avgPrice.toFixed(1)}</td>
                          <td className="py-3.5 font-mono font-semibold text-[#FAF7F5]">
                            ₹{h.ltp.toFixed(1)}
                          </td>
                          <td className="py-3.5 font-mono">
                            <span className={pnl >= 0 ? "text-[#3EDC81]" : "text-[#FF5C5C]"}>
                              {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(0)} ({pct.toFixed(1)}%)
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <Link
                              href={`/company/${h.symbol}`}
                              className="inline-flex items-center gap-1 border border-white/10 bg-[#211C19] px-2.5 py-1 text-[11px] text-[#F2D7B6] hover:border-[#C98A4A]"
                            >
                              Inspect <ArrowUpRight className="size-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Psychological AI Trade Coach Feed */}
          <div className="investra-card lg:col-span-5 p-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#FAF7F5]">AI Psychological Trade Coach</h2>
                <p className="text-xs text-[#B9B4B1]">
                  Every order is evaluated for FOMO, Stop-Loss & Risk sizing
                </p>
              </div>
              <Link
                href="/trading"
                className="text-xs font-semibold text-[#C98A4A] hover:underline"
              >
                New Trade →
              </Link>
            </div>

            {tradeCoachLogs.length === 0 ? (
              <div className="py-10 text-center font-mono text-xs text-[#7A7471]">
                No trades placed yet. When you buy or sell a stock, AI Coach will log your position sizing & stop-loss discipline here.
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {tradeCoachLogs.slice(0, 3).map((log) => (
                  <div
                    key={log.id}
                    className="border border-white/[0.08] bg-[#111111] p-3.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#FAF7F5]">
                        {log.side} {log.qty} {log.symbol} @ ₹{log.price}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                          log.psychologyBadge === "DISCIPLINED"
                            ? "bg-[#3EDC81]/15 text-[#3EDC81]"
                            : "bg-[#FFC857]/15 text-[#FFC857]"
                        }`}
                      >
                        {log.psychologyBadge === "DISCIPLINED" ? (
                          <CheckCircle2 className="size-3" />
                        ) : (
                          <AlertTriangle className="size-3" />
                        )}
                        {log.psychologyBadge}
                      </span>
                    </div>
                    <p className="mt-2 leading-relaxed text-[#B9B4B1]">{log.coachFeedback}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Grid: Duolingo Learning Path + Crash Replay + Watchlist */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="investra-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C98A4A]">
                  DUOLINGO-STYLE MODULE 04
                </span>
                <GraduationCap className="size-4 text-[#C98A4A]" />
              </div>
              <h3 className="mt-2 text-lg font-bold text-[#FAF7F5]">
                Candlestick Psychology & Support Zones
              </h3>
              <p className="mt-2 text-xs text-[#B9B4B1]">
                Learn why retail traders buy at resistance due to FOMO and how institutional order blocks form.
              </p>
              <div className="mt-4 h-2 w-full overflow-hidden bg-[#111111]">
                <div className="h-full w-[72%] bg-gradient-to-r from-[#C98A4A] to-[#3EDC81]" />
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-[#D8A56D]">72% Completed • +250 XP</p>
            </div>
            <Link
              href="/learn"
              className="mt-5 inline-flex items-center justify-center gap-2 bg-[#211C19] py-2.5 text-xs font-semibold text-[#F2D7B6] hover:bg-[#382B27]"
            >
              Continue Interactive Lesson →
            </Link>
          </div>

          <div className="investra-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF5C5C]">
                  CHESS-STYLE MARKET TIME MACHINE
                </span>
                <History className="size-4 text-[#FF5C5C]" />
              </div>
              <h3 className="mt-2 text-lg font-bold text-[#FAF7F5]">
                2020 COVID Crash & 2008 Crisis Replay
              </h3>
              <p className="mt-2 text-xs text-[#B9B4B1]">
                Step candle-by-candle through historical crashes on Highcharts red/green candlestick charts.
              </p>
            </div>
            <Link
              href="/replay"
              className="mt-5 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#C98A4A] to-[#D8A56D] py-2.5 text-xs font-bold text-[#090909]"
            >
              <Play className="size-3.5 fill-current" /> Launch Crash Replay
            </Link>
          </div>

          <div className="investra-card p-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#3EDC81]">
                LIVE NSE WATCHLIST
              </span>
              <h3 className="mt-2 text-lg font-bold text-[#FAF7F5]">Top Benchmark Movers</h3>
              <div className="mt-3 space-y-2.5">
                {stocks.slice(0, 3).map((s) => (
                  <Link
                    key={s.symbol}
                    href={`/company/${s.symbol}`}
                    className="flex items-center justify-between border border-white/[0.06] bg-[#111111] px-3 py-2 text-xs hover:border-[#C98A4A]/40"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#FAF7F5]">{s.symbol}</span>
                      <span className="ml-2 text-[11px] text-[#7A7471]">P/E {s.pe}</span>
                    </div>
                    <div className="font-mono">
                      <span className="text-[#FAF7F5]">₹{s.price}</span>{" "}
                      <span className={s.changePercent >= 0 ? "text-[#3EDC81]" : "text-[#FF5C5C]"}>
                        {s.changePercent >= 0 ? "+" : ""}
                        {s.changePercent}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/market"
              className="mt-4 text-center text-xs font-semibold text-[#C98A4A] hover:underline"
            >
              Explore All 2,640 NSE Equities →
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
