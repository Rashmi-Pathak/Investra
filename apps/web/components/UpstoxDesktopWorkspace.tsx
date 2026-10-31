"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Bookmark,
  Bell,
  Wallet,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BarChart2,
  XCircle,
  HelpCircle,
  X,
} from "lucide-react";
import { getNseEquitiesUniverse, findNseCompany } from "@/lib/nseUniverse";
import { HighchartsStockChart } from "@/components/HighchartsStockChart";
import {
  PreTradeAnalysisModal,
  PendingOrderDraft,
} from "@/components/PreTradeAnalysisModal";
import { useInvestraStore, OrderRecord } from "@/store/useInvestraStore";

export function UpstoxDesktopWorkspace({
  defaultView = "ORDERS",
}: {
  defaultView?: "ORDERS" | "POSITIONS" | "HOLDINGS" | "CHARTS";
}) {
  const {
    user,
    brokerPreset,
    setBrokerPreset,
    financialMode,
    setFinancialMode,
    beginnerWallet,
    brokerWallet,
    monthlySip,
    holdings,
    orders,
    cancelOrder,
    executePaperOrder,
  } = useInvestraStore();

  const [activeTab, setActiveTab] = useState<"ORDERS" | "POSITIONS" | "HOLDINGS" | "CHARTS">(defaultView);
  const [orderSubTab, setOrderSubTab] = useState<"ALL" | "OPEN" | "CLOSED">("ALL");
  const [positionType, setPositionType] = useState<"REGULAR" | "STRATEGY">("REGULAR");
  const [selectedStock, setSelectedStock] = useState("RELIANCE");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [quickQty, setQuickQty] = useState(1);
  const [orderDraft, setOrderDraft] = useState<PendingOrderDraft | null>(null);
  const [mobileWatchlistOpen, setMobileWatchlistOpen] = useState(false);

  const activeWallet = financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;

  // Real-time calculations across holdings
  const portfolioInvested = holdings.reduce((acc, h) => acc + h.qty * h.avgPrice, 0);
  const portfolioCurrent = holdings.reduce((acc, h) => acc + h.qty * h.ltp, 0);
  const totalPnl = portfolioCurrent - portfolioInvested;
  const pnlPct = portfolioInvested > 0 ? (totalPnl / portfolioInvested) * 100 : 0;

  // Filter orders according to sub-tab
  const filteredOrders = orders.filter((o) => {
    if (orderSubTab === "ALL") return true;
    if (orderSubTab === "OPEN") return o.status === "OPEN" || o.status === "PARTIALLY_FILLED";
    if (orderSubTab === "CLOSED") return o.status === "FILLED" || o.status === "CANCELLED";
    return true;
  });

  const upstoxWatchlist = [
    { symbol: "CRUDEOIL FUT", tag: "MCX 19SEP25", ltp: 5470.0, changePct: -1.1, down: true },
    { symbol: "AXISBANK", tag: "NSE EQ", ltp: 1102.3, changePct: 1.37, down: false },
    { symbol: "IRCTC", tag: "NSE EQ", ltp: 719.7, changePct: 0.0, down: false },
    { symbol: "NIFTY 25100 CE", tag: "NFO ATM", ltp: 100.45, changePct: 49.48, down: false },
    { symbol: "NIFTY 25000 PE", tag: "NFO OTM +2", ltp: 32.2, changePct: -54.78, down: true },
    { symbol: "HDFCBANK", tag: "NSE EQ", ltp: 1682.4, changePct: 0.65, down: false },
    { symbol: "RELIANCE", tag: "NSE EQ", ltp: 2742.5, changePct: 1.2, down: false },
    { symbol: "TCS", tag: "NSE EQ", ltp: 3912.8, changePct: 0.85, down: false },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#222222] font-sans antialiased pb-20 md:pb-8">
      {/* UPSTOX PRO TOP BANNER & NAVBAR (Matches Screenshot 1, 2, 3) */}
      <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white shadow-sm">
        {/* Strip 1: Ticker strip (VIX, NIFTY) */}
        <div className="flex h-9 items-center justify-between border-b border-[#f0f2f5] px-3 sm:px-4 text-xs font-medium overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#6b21a8]">VIX</span>
              <span className="font-bold text-[#dc2626]">10.23</span>
              <span className="text-[11px] text-[#dc2626]">-1.25%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#222222]">NIFTY</span>
              <span className="font-bold text-[#16a34a]">24,315.80</span>
              <span className="text-[11px] text-[#16a34a]">+0.59%</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="font-bold text-[#222222]">BANK NIFTY</span>
              <span className="font-bold text-[#dc2626]">51,840.40</span>
              <span className="text-[11px] text-[#dc2626]">-0.25%</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[#6b7280]">Mode:</span>
              <button
                onClick={() => setFinancialMode(financialMode === "REAL_LIFE" ? "BEGINNER" : "REAL_LIFE")}
                className="font-bold text-[#6b21a8] underline hover:text-[#581c87]"
              >
                {financialMode === "REAL_LIFE" ? "Real-Life Salary Mode" : "₹1,00,000 Cash Mode"}
              </button>
            </div>
            <div className="flex items-center gap-1 rounded bg-[#f3e8ff] px-2.5 py-1 text-[11px] font-bold text-[#6b21a8]">
              <Wallet className="size-3" />
              <span>₹{activeWallet.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Strip 2: Upstox Logo, Navigation Tabs (Orders, Positions, Holdings, Charts), User Switcher */}
        <div className="flex h-14 items-center justify-between px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#6b21a8] font-bold text-white text-xs">
                up
              </div>
              <span className="text-sm sm:text-base font-bold text-[#222222]">
                Upstox Pro
              </span>
            </div>

            <nav className="hidden sm:flex items-center gap-4 lg:gap-6 text-xs sm:text-[13px] font-semibold">
              <button
                onClick={() => setActiveTab("CHARTS")}
                className={`py-4 border-b-2 transition shrink-0 ${
                  activeTab === "CHARTS"
                    ? "border-[#6b21a8] text-[#6b21a8]"
                    : "border-transparent text-[#4b5563] hover:text-[#222222]"
                }`}
              >
                Charts
              </button>
              <button
                onClick={() => setActiveTab("ORDERS")}
                className={`py-4 border-b-2 transition ${
                  activeTab === "ORDERS"
                    ? "border-[#6b21a8] text-[#6b21a8]"
                    : "border-transparent text-[#4b5563] hover:text-[#222222]"
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("POSITIONS")}
                className={`py-4 border-b-2 transition ${
                  activeTab === "POSITIONS"
                    ? "border-[#6b21a8] text-[#6b21a8]"
                    : "border-transparent text-[#4b5563] hover:text-[#222222]"
                }`}
              >
                Positions ({holdings.length})
              </button>
              <button
                onClick={() => setActiveTab("HOLDINGS")}
                className={`py-4 border-b-2 transition ${
                  activeTab === "HOLDINGS"
                    ? "border-[#6b21a8] text-[#6b21a8]"
                    : "border-transparent text-[#4b5563] hover:text-[#222222]"
                }`}
              >
                Holdings ({holdings.length})
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* UI Switcher to jump between Upstox and other terminals */}
            <select
              value={brokerPreset}
              onChange={(e) => setBrokerPreset(e.target.value as any)}
              className="rounded border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs font-semibold text-[#6b21a8] focus:outline-none"
            >
              <option value="original">Investra Dark</option>
              <option value="kite">Zerodha Kite</option>
              <option value="groww">Groww</option>
              <option value="upstox">Upstox Pro</option>
            </select>

            <Link
              href="/portfolio"
              className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs text-[#374151]"
            >
              <div className="flex size-5 items-center justify-center rounded-full bg-[#6b21a8] text-[10px] font-bold text-white">
                {(user?.name || "Upstox").slice(0, 1)}
              </div>
              <span className="font-semibold">{user?.name || "Pratik A."}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* TWO-COLUMN UPSTOX PRO WORKSPACE */}
      <div className="flex flex-1">
        {/* Left Watchlist Sidebar (Exact Upstox Screenshot 1 & 2 Layout) */}
        <aside className="hidden lg:flex w-72 shrink-0 flex-col justify-between border-r border-[#e5e7eb] bg-white min-h-[calc(100vh-6rem)]">
          <div>
            <div className="flex items-center justify-between border-b border-[#f0f2f5] p-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#374151]">
                <span>My Watchlist</span>
                <span className="rounded bg-[#f3f4f6] px-1.5 py-0.5 text-[10px] text-[#6b7280]">
                  {upstoxWatchlist.length} / 100
                </span>
              </div>
              <Link href="/market" className="text-[#6b21a8] hover:underline" title="Explore All Stocks">
                <Plus className="size-4" />
              </Link>
            </div>

            {/* Sidebar Search Option for Companies */}
            <div className="border-b border-[#f0f2f5] p-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder="Search 2,640 NSE stocks..."
                  className="w-full rounded-md border border-[#e5e7eb] bg-[#f9fafb] py-1.5 pl-8 pr-7 text-xs text-[#1f2937] placeholder-[#9ca3af] focus:border-[#6b21a8] focus:outline-none"
                />
                <Search className="absolute left-2.5 top-2 size-3.5 text-[#9ca3af]" />
                {sidebarSearch && (
                  <button
                    onClick={() => setSidebarSearch("")}
                    className="absolute right-2 top-2 text-[#9ca3af] hover:text-[#1f2937]"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="divide-y divide-[#f3f4f6] overflow-y-auto max-h-[calc(100vh-13rem)]">
              {sidebarSearch.trim() ? (
                // Filtered search results from 2,640 universe
                getNseEquitiesUniverse()
                  .filter(
                    (c) =>
                      c.symbol.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
                      c.name.toLowerCase().includes(sidebarSearch.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((item) => (
                    <div
                      key={item.symbol}
                      onClick={() => {
                        setSelectedStock(item.symbol);
                        setSidebarSearch("");
                      }}
                      className={`flex items-center justify-between p-3 text-xs cursor-pointer transition ${
                        selectedStock === item.symbol
                          ? "bg-[#f5f3ff] border-l-4 border-[#6b21a8]"
                          : "hover:bg-[#f9fafb]"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-[#1f2937]">{item.symbol}</div>
                        <span className="text-[10px] text-[#9ca3af] truncate max-w-[130px] block">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold ${
                            item.changePercent < 0 ? "text-[#dc2626]" : "text-[#16a34a]"
                          }`}
                        >
                          ₹{item.price.toFixed(2)}
                        </div>
                        <span
                          className={`text-[10px] ${
                            item.changePercent < 0 ? "text-[#dc2626]" : "text-[#16a34a]"
                          }`}
                        >
                          {item.changePercent >= 0 ? "+" : ""}
                          {item.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                // Default Upstox Watchlist items
                upstoxWatchlist.map((item) => (
                  <div
                    key={item.symbol}
                    onClick={() => setSelectedStock(item.symbol)}
                    className={`flex items-center justify-between p-3 text-xs cursor-pointer transition ${
                      selectedStock === item.symbol
                        ? "bg-[#f5f3ff] border-l-4 border-[#6b21a8]"
                        : "hover:bg-[#f9fafb]"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#1f2937]">{item.symbol}</div>
                      <span className="text-[10px] text-[#9ca3af]">{item.tag}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${item.down ? "text-[#dc2626]" : "text-[#16a34a]"}`}>
                        {item.ltp.toFixed(2)}
                      </div>
                      <span className={`text-[10px] ${item.down ? "text-[#dc2626]" : "text-[#16a34a]"}`}>
                        {item.changePct >= 0 ? "+" : ""}
                        {item.changePct.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="border-t border-[#e5e7eb] p-3 text-center text-xs text-[#6b7280]">
            NSE Live Order Router Active
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 p-6 space-y-6">
          {/* TAB 1: UPSTOX ORDERS VIEW (Shows 100% of the User's Actual Orders) */}
          {activeTab === "ORDERS" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e7eb] pb-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold text-[#1f2937]">Orders</h1>
                  <div className="flex border border-[#e5e7eb] rounded-lg bg-white p-0.5 text-xs">
                    {(["ALL", "OPEN", "CLOSED"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setOrderSubTab(tab)}
                        className={`rounded px-3 py-1 font-semibold transition ${
                          orderSubTab === tab
                            ? "bg-[#6b21a8] text-white"
                            : "text-[#6b7280] hover:text-[#1f2937]"
                        }`}
                      >
                        {tab} ({tab === "ALL" ? orders.length : orders.filter(o => tab === "OPEN" ? (o.status === "OPEN" || o.status === "PARTIALLY_FILLED") : (o.status === "FILLED" || o.status === "CANCELLED")).length})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-[#6b7280]">
                  Active Wallet: <strong className="text-[#6b21a8]">₹{activeWallet.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-12 text-center text-xs text-[#6b7280] space-y-3">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f3e8ff] text-[#6b21a8]">
                    <Clock className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#1f2937]">No orders in this view</h3>
                  <p>
                    All virtual orders placed across Investra, Zerodha, or Groww show here automatically.
                  </p>
                  <Link
                    href="/trading"
                    className="inline-block rounded-lg bg-[#6b21a8] px-4 py-2 font-bold text-white hover:bg-[#581c87]"
                  >
                    Place an Order
                  </Link>
                </div>
              ) : (
                <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#f3f4f6] bg-[#f9fafb] text-[11px] font-bold uppercase text-[#6b7280]">
                        <th className="px-5 py-3">Time</th>
                        <th className="px-5 py-3">Type</th>
                        <th className="px-5 py-3">Instrument</th>
                        <th className="px-5 py-3">Product</th>
                        <th className="px-5 py-3">Qty.</th>
                        <th className="px-5 py-3">Price</th>
                        <th className="px-5 py-3">Trigger</th>
                        <th className="px-5 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f3f4f6]">
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#faf5ff] transition">
                          <td className="px-5 py-3.5 text-[#6b7280]">{o.time || (o as any).timestamp || "Today"}</td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                o.side === "BUY"
                                  ? "bg-[#dcfce7] text-[#15803d]"
                                  : "bg-[#fee2e2] text-[#b91c1c]"
                              }`}
                            >
                              {o.side}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <Link href={`/company/${o.symbol}`} className="font-bold text-[#1f2937] hover:text-[#6b21a8]">
                              {o.symbol}
                            </Link>{" "}
                            <span className="text-[10px] text-[#9ca3af]">NSE</span>
                          </td>
                          <td className="px-5 py-3.5 text-[#4b5563]">{o.productType}</td>
                          <td className="px-5 py-3.5 font-semibold text-[#1f2937]">{o.qty}</td>
                          <td className="px-5 py-3.5 font-semibold text-[#1f2937]">₹{o.price.toFixed(2)}</td>
                          <td className="px-5 py-3.5 text-[#6b7280]">
                            {(o as any).stopLoss ? `SL: ₹${(o as any).stopLoss}` : "—"}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <span
                              className={`rounded px-2.5 py-0.5 text-[10px] font-bold ${
                                o.status === "FILLED"
                                  ? "bg-[#dcfce7] text-[#15803d]"
                                  : o.status === "OPEN"
                                  ? "bg-[#e0e7ff] text-[#3730a3]"
                                  : "bg-[#f3f4f6] text-[#4b5563]"
                              }`}
                            >
                              {o.status}
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

          {/* TAB 2: UPSTOX POSITIONS VIEW (Matches Upstox Mobile Screenshot 4 Adapted for PC) */}
          {activeTab === "POSITIONS" && (
            <div className="space-y-5">
              {/* Top Banner with Today's P&L and Overall P&L */}
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f3f4f6] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-[#1f2937]">
                      Positions ({holdings.length})
                    </span>
                    <div className="flex border border-[#e5e7eb] rounded-lg bg-white p-0.5 text-xs">
                      <button
                        onClick={() => setPositionType("REGULAR")}
                        className={`rounded px-3 py-1 font-semibold transition ${
                          positionType === "REGULAR"
                            ? "bg-[#6b21a8] text-white"
                            : "text-[#6b7280]"
                        }`}
                      >
                        Regular ({holdings.length})
                      </button>
                      <button
                        onClick={() => setPositionType("STRATEGY")}
                        className={`rounded px-3 py-1 font-semibold transition ${
                          positionType === "STRATEGY"
                            ? "bg-[#6b21a8] text-white"
                            : "text-[#6b7280]"
                        }`}
                      >
                        Strategy (0)
                      </button>
                    </div>
                  </div>

                  <Link
                    href="/trading"
                    className="rounded-lg bg-[#6b21a8] px-4 py-2 text-xs font-bold text-white hover:bg-[#581c87]"
                  >
                    + New Trade
                  </Link>
                </div>

                {/* Today's P&L & Overall P&L Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#f3f4f6] bg-[#fafafa] p-4">
                    <span className="text-xs text-[#6b7280]">Today&apos;s P&amp;L</span>
                    <div className={`mt-1 text-2xl font-bold ${totalPnl >= 0 ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                      {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)}
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#f3f4f6] bg-[#fafafa] p-4">
                    <span className="text-xs text-[#6b7280]">Overall P&amp;L</span>
                    <div className={`mt-1 text-2xl font-bold ${totalPnl >= 0 ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                      {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)} ({pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Positions List */}
              {holdings.length === 0 ? (
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-12 text-center text-xs text-[#6b7280]">
                  No open positions. Use the Trade Desk or Market Directory to execute a trade.
                </div>
              ) : (
                <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#f3f4f6] bg-[#f9fafb] text-[11px] font-bold uppercase text-[#6b7280]">
                        <th className="px-5 py-3">Instrument</th>
                        <th className="px-5 py-3">Product</th>
                        <th className="px-5 py-3">Qty</th>
                        <th className="px-5 py-3">Avg. Buy</th>
                        <th className="px-5 py-3">LTP</th>
                        <th className="px-5 py-3 text-right">P&amp;L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f3f4f6]">
                      {holdings.map((h) => {
                        const pnl = (h.ltp - h.avgPrice) * h.qty;
                        return (
                          <tr key={h.symbol} className="hover:bg-[#faf5ff] transition">
                            <td className="px-5 py-4">
                              <Link href={`/company/${h.symbol}`} className="font-bold text-[#1f2937] hover:text-[#6b21a8]">
                                {h.symbol}
                              </Link>
                              <span className="block text-[10px] text-[#9ca3af]">{h.sector}</span>
                            </td>
                            <td className="px-5 py-4 text-[#4b5563]">CNC / Intraday</td>
                            <td className="px-5 py-4 font-semibold text-[#1f2937]">{h.qty}</td>
                            <td className="px-5 py-4 text-[#6b7280]">₹{h.avgPrice.toFixed(2)}</td>
                            <td className="px-5 py-4 font-semibold text-[#1f2937]">₹{h.ltp.toFixed(2)}</td>
                            <td className={`px-5 py-4 text-right font-bold ${pnl >= 0 ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                              {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UPSTOX HOLDINGS VIEW (Upstox Themed Holdings & Wallet Balance) */}
          {activeTab === "HOLDINGS" && (
            <div className="space-y-5">
              {/* Holdings Valuation Strip */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
                  <span className="text-xs text-[#6b7280]">Total Investment</span>
                  <div className="mt-1 text-2xl font-bold text-[#1f2937]">
                    ₹{Math.round(portfolioInvested).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
                  <span className="text-xs text-[#6b7280]">Current Value</span>
                  <div className="mt-1 text-2xl font-bold text-[#1f2937]">
                    ₹{Math.round(portfolioCurrent).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
                  <span className="text-xs text-[#6b7280]">Total P&amp;L</span>
                  <div className={`mt-1 text-2xl font-bold ${totalPnl >= 0 ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                    {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)} ({pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(2)}%)
                  </div>
                </div>
              </div>

              {/* Holdings Table */}
              <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#f3f4f6] px-5 py-3">
                  <span className="text-sm font-bold text-[#1f2937]">
                    Demat Holdings ({holdings.length})
                  </span>
                  <span className="text-xs text-[#6b7280]">
                    Available Cash: <strong className="text-[#6b21a8]">₹{activeWallet.toLocaleString("en-IN")}</strong>
                  </span>
                </div>

                {holdings.length === 0 ? (
                  <div className="p-12 text-center text-xs text-[#6b7280]">
                    You have 0 holdings. Buy stocks on the Trade Terminal to build your portfolio.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#f3f4f6] bg-[#f9fafb] text-[11px] font-bold uppercase text-[#6b7280]">
                        <th className="px-5 py-3">Instrument</th>
                        <th className="px-5 py-3">Qty.</th>
                        <th className="px-5 py-3">Avg. Cost</th>
                        <th className="px-5 py-3">LTP</th>
                        <th className="px-5 py-3">Cur. Val</th>
                        <th className="px-5 py-3 text-right">P&amp;L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f3f4f6]">
                      {holdings.map((h) => {
                        const curVal = h.qty * h.ltp;
                        const pnl = (h.ltp - h.avgPrice) * h.qty;
                        return (
                          <tr key={h.symbol} className="hover:bg-[#faf5ff] transition">
                            <td className="px-5 py-4">
                              <Link href={`/company/${h.symbol}`} className="font-bold text-[#1f2937] hover:text-[#6b21a8]">
                                {h.symbol}
                              </Link>
                              <span className="block text-[10px] text-[#9ca3af]">{h.sector}</span>
                            </td>
                            <td className="px-5 py-4 font-semibold text-[#1f2937]">{h.qty}</td>
                            <td className="px-5 py-4 text-[#6b7280]">₹{h.avgPrice.toFixed(2)}</td>
                            <td className="px-5 py-4 font-semibold text-[#1f2937]">₹{h.ltp.toFixed(2)}</td>
                            <td className="px-5 py-4 font-semibold text-[#1f2937]">₹{curVal.toFixed(2)}</td>
                            <td className={`px-5 py-4 text-right font-bold ${pnl >= 0 ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                              {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: UPSTOX CHARTS & OPTION TOOLS (Screenshot 1 & 2) */}
          {activeTab === "CHARTS" && (() => {
            const cleanSym = selectedStock.split(" ")[0].toUpperCase();
            const activeCompany = findNseCompany(cleanSym);
            const isPriceUp = (activeCompany.changePercent ?? 0) >= 0;
            const baseStrike = Math.max(50, Math.round(activeCompany.price / 50) * 50);
            const dynamicOiBars = [-3, -2, -1, 0, 1, 2, 3, 4].map((step, idx) => {
              const strikeVal = Math.max(10, baseStrike + step * 50);
              const callHeight = Math.min(95, Math.max(15, 80 - step * 12 + (idx % 2 === 0 ? 10 : -5)));
              const putHeight = Math.min(95, Math.max(15, 30 + step * 14 + (idx % 2 === 0 ? -8 : 12)));
              return {
                strike: strikeVal.toLocaleString("en-IN"),
                call: callHeight,
                put: putHeight,
              };
            });

            const openBuyOrder = () => {
              setOrderDraft({
                symbol: activeCompany.symbol,
                name: activeCompany.name,
                side: "BUY",
                orderType: "MARKET",
                product: "CNC",
                quantity: quickQty,
                price: activeCompany.price,
                stopLoss: Math.round(activeCompany.price * 0.97),
                target: Math.round(activeCompany.price * 1.06),
                estimatedCost: Number((activeCompany.price * quickQty).toFixed(2)),
              });
            };

            const openSellOrder = () => {
              setOrderDraft({
                symbol: activeCompany.symbol,
                name: activeCompany.name,
                side: "SELL",
                orderType: "MARKET",
                product: "CNC",
                quantity: quickQty,
                price: activeCompany.price,
                stopLoss: Math.round(activeCompany.price * 1.03),
                target: Math.round(activeCompany.price * 0.94),
                estimatedCost: Number((activeCompany.price * quickQty).toFixed(2)),
              });
            };

            return (
              <div className="space-y-6">
                {/* Pre-trade analysis modal */}
                <PreTradeAnalysisModal
                  draft={orderDraft}
                  availableCash={activeWallet}
                  monthlySip={monthlySip}
                  financialMode={financialMode}
                  onCancel={() => setOrderDraft(null)}
                  onConfirm={() => {
                    if (!orderDraft) return;
                    executePaperOrder({
                      symbol: orderDraft.symbol,
                      side: orderDraft.side,
                      qty: orderDraft.quantity || orderDraft.qty || 1,
                      priceOverride: orderDraft.price,
                      stopLoss: orderDraft.stopLoss,
                      orderType: (orderDraft.orderType as "MARKET" | "LIMIT") || "MARKET",
                      productType: orderDraft.product,
                    });
                    setOrderDraft(null);
                  }}
                />

                {/* Top Control Strip with Buy / Sell Action Buttons */}
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-[#1f2937]">
                          {activeCompany.symbol}
                        </h2>
                        <span className="text-xs text-[#6b7280]">{activeCompany.name}</span>
                        <span className="rounded bg-[#f3f4f6] px-2 py-0.5 text-[10px] font-semibold text-[#4b5563]">
                          NSE EQ
                        </span>
                      </div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#1f2937]">
                          ₹{(activeCompany.price ?? 100).toFixed(2)}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            isPriceUp ? "text-[#16a34a]" : "text-[#dc2626]"
                          }`}
                        >
                          {isPriceUp ? "+" : ""}
                          {(activeCompany.changePercent ?? 0).toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    {/* Quick Trade Desk: Qty Selector + Buy & Sell Buttons */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#e5e7eb] rounded-lg bg-[#f9fafb] p-1 text-xs">
                        <span className="px-2 text-[#6b7280]">Qty:</span>
                        {[1, 5, 10, 25].map((q) => (
                          <button
                            key={q}
                            onClick={() => setQuickQty(q)}
                            className={`rounded px-2.5 py-1 font-semibold transition ${
                              quickQty === q
                                ? "bg-[#6b21a8] text-white"
                                : "text-[#4b5563] hover:text-[#1f2937]"
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={openBuyOrder}
                        className="flex items-center gap-1.5 rounded-lg bg-[#16a34a] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#15803d] transition"
                      >
                        BUY {activeCompany.symbol}
                      </button>

                      <button
                        onClick={openSellOrder}
                        className="flex items-center gap-1.5 rounded-lg bg-[#dc2626] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#b91c1c] transition"
                      >
                        SELL {activeCompany.symbol}
                      </button>

                      <Link
                        href={`/company/${activeCompany.symbol}`}
                        className="flex items-center gap-1 rounded-lg bg-[#6b21a8] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#581c87] transition"
                      >
                        <span>Open Full Depth & Trade Desk</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Real-time Interactive Candlestick Chart for Selected Company */}
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-[#f3f4f6] pb-3 text-xs">
                    <span className="font-bold text-[#1f2937]">
                      {activeCompany.symbol} • Interactive Highcharts Candlestick
                    </span>
                    <span className="text-[#6b7280]">
                      Volume: {activeCompany.volume} • Day Range: ₹{activeCompany.dayLow} – ₹{activeCompany.dayHigh}
                    </span>
                  </div>

                  <HighchartsStockChart
                    symbol={activeCompany.symbol}
                    basePrice={activeCompany.price}
                    height={320}
                    lightTheme={true}
                  />
                </div>

                {/* Open Interest (OI) Analysis Bar Chart (Matches Screenshot 1 Layout) */}
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between border-b border-[#f3f4f6] pb-3 text-xs">
                    <div>
                      <h3 className="font-bold text-[#1f2937]">
                        Open Interest (OI) Analysis: {activeCompany.symbol} Strikes vs Call/Put OI
                      </h3>
                      <p className="text-[11px] text-[#6b7280]">
                        Derived from options order depth around ₹{(activeCompany.price ?? 100).toFixed(2)} spot
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-[#f3e8ff] px-2.5 py-1 text-xs font-bold text-[#6b21a8]">
                        Spot Price: ₹{(activeCompany.price ?? 100).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="h-64 w-full border border-[#f0f2f5] bg-[#fafafa] p-4 flex items-end justify-between gap-3">
                    {dynamicOiBars.map((bar) => (
                      <div key={bar.strike} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex items-end justify-center gap-1.5 h-44">
                          <div
                            style={{ height: `${bar.call}%` }}
                            className="w-4 bg-[#0284c7] rounded-t-sm transition-all duration-300"
                            title={`Call OI: ${bar.call}L`}
                          />
                          <div
                            style={{ height: `${bar.put}%` }}
                            className="w-4 bg-[#ea580c] rounded-t-sm transition-all duration-300"
                            title={`Put OI: ${bar.put}L`}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-[#6b7280]">{bar.strike}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-8 text-xs text-[#6b7280]">
                    <span className="flex items-center gap-2">
                      <span className="size-3 bg-[#0284c7] inline-block rounded-sm" /> Call OI (Resistance)
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="size-3 bg-[#ea580c] inline-block rounded-sm" /> Put OI (Support)
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </main>
      </div>

      {/* Upstox Mobile Watchlist Drawer */}
      {mobileWatchlistOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="flex h-[80vh] flex-col rounded-t-2xl border-t border-[#e5e7eb] bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#f0f2f5] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#222222]">
                <span className="size-2 bg-[#6b21a8] inline-block rounded-full" />
                Upstox Watchlist ({upstoxWatchlist.length})
              </div>
              <button
                onClick={() => setMobileWatchlistOpen(false)}
                className="rounded-full bg-[#f3f4f6] p-1.5 text-[#6b7280] hover:bg-[#e5e7eb]"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Search within drawer */}
            <div className="py-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder="Search 2,640 NSE stocks..."
                  className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2 pl-9 pr-7 text-xs text-[#1f2937] placeholder-[#9ca3af] focus:border-[#6b21a8] focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 size-3.5 text-[#9ca3af]" />
                {sidebarSearch && (
                  <button
                    onClick={() => setSidebarSearch("")}
                    className="absolute right-2.5 top-2.5 text-[#9ca3af] hover:text-[#1f2937]"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#f3f4f6]">
              {(sidebarSearch.trim()
                ? getNseEquitiesUniverse()
                    .filter((c) =>
                      c.symbol.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
                      c.name.toLowerCase().includes(sidebarSearch.toLowerCase())
                    )
                    .slice(0, 40)
                    .map((c) => ({
                      symbol: c.symbol,
                      tag: c.sector || "NSE EQ",
                      ltp: c.price,
                      changePct: c.changePercent,
                      down: c.changePercent < 0,
                    }))
                : upstoxWatchlist
              ).map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => {
                    const cleanSymbol = item.symbol.split(" ")[0];
                    setSelectedStock(cleanSymbol);
                    setActiveTab("CHARTS");
                    setMobileWatchlistOpen(false);
                  }}
                  className="flex items-center justify-between py-3 px-2 active:bg-[#f3e8ff] transition cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-xs text-[#1f2937]">{item.symbol}</div>
                    <div className="text-[10px] text-[#9ca3af]">{item.tag}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xs text-[#1f2937]">₹{item.ltp.toFixed(2)}</div>
                    <div className={`text-[11px] font-semibold ${item.down ? "text-[#dc2626]" : "text-[#16a34a]"}`}>
                      {item.changePct >= 0 ? "+" : ""}{item.changePct}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upstox Pro Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-[#e5e7eb] bg-white text-[#6b7280] lg:hidden shadow-lg">
        <button
          onClick={() => {
            setActiveTab("CHARTS");
            setMobileWatchlistOpen(true);
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            activeTab === "CHARTS" ? "text-[#6b21a8]" : "hover:text-[#222222]"
          }`}
        >
          <TrendingUp className="size-4" />
          <span>Watchlist</span>
        </button>

        <button
          onClick={() => setActiveTab("CHARTS")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            activeTab === "CHARTS" ? "text-[#6b21a8]" : "hover:text-[#222222]"
          }`}
        >
          <BarChart2 className="size-4" />
          <span>Charts</span>
        </button>

        <button
          onClick={() => setActiveTab("ORDERS")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            activeTab === "ORDERS" ? "text-[#6b21a8]" : "hover:text-[#222222]"
          }`}
        >
          <Clock className="size-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("POSITIONS")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            activeTab === "POSITIONS" ? "text-[#6b21a8]" : "hover:text-[#222222]"
          }`}
        >
          <Briefcase className="size-4" />
          <span>Positions ({holdings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("HOLDINGS")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            activeTab === "HOLDINGS" ? "text-[#6b21a8]" : "hover:text-[#222222]"
          }`}
        >
          <Wallet className="size-4" />
          <span>Holdings</span>
        </button>

        <button
          onClick={() => {
            setBrokerPreset(brokerPreset === "kite" ? "groww" : "kite");
          }}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-[#6b21a8] hover:brightness-110 transition"
        >
          <span className="flex size-4 items-center justify-center rounded bg-[#6b21a8] text-white text-[9px] font-bold">UI</span>
          <span>Switch UI</span>
        </button>
      </nav>
    </div>
  );
}
