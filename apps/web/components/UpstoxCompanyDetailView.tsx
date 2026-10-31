"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Search,
  Wallet,
  Clock,
  Briefcase,
  X,
  Plus,
} from "lucide-react";
import { HighchartsStockChart } from "@/components/HighchartsStockChart";
import {
  PreTradeAnalysisModal,
  PendingOrderDraft,
} from "@/components/PreTradeAnalysisModal";
import { NseStockItem, findNseCompany, getNseEquitiesUniverse } from "@/lib/nseUniverse";
import { useInvestraStore } from "@/store/useInvestraStore";

export function UpstoxCompanyDetailView({ company }: { company: NseStockItem }) {
  const {
    user,
    brokerPreset,
    setBrokerPreset,
    financialMode,
    setFinancialMode,
    brokerWallet,
    beginnerWallet,
    monthlySip,
    holdings,
    orders,
    executePaperOrder,
  } = useInvestraStore();

  const activeWallet = financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;

  const [orderAction, setOrderAction] = useState<"BUY" | "SELL">("BUY");
  const [productType, setProductType] = useState<"CNC" | "MIS">("CNC");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [sharesQty, setSharesQty] = useState(1);
  const [limitPrice, setLimitPrice] = useState(company.price);
  const [orderDraft, setOrderDraft] = useState<PendingOrderDraft | null>(null);
  const [timeframe, setTimeframe] = useState<"1D" | "5D" | "1M" | "1Y" | "ALL">("1M");
  const [sidebarSearch, setSidebarSearch] = useState("");

  const priceDiff = (company.price ?? 100) - (company.prevClose ?? company.price ?? 100);
  const isUp = priceDiff >= 0;
  const currentPrice = company.price ?? 100;
  const totalCost = Number(((orderType === "MARKET" ? currentPrice : limitPrice) * sharesQty).toFixed(2));

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

  const handleOpenAnalysis = () => {
    setOrderDraft({
      symbol: company.symbol,
      name: company.name,
      side: orderAction,
      orderType,
      product: productType,
      quantity: sharesQty,
      price: orderType === "MARKET" ? currentPrice : limitPrice,
      stopLoss: Math.round(currentPrice * (orderAction === "BUY" ? 0.97 : 1.03)),
      target: Math.round(currentPrice * (orderAction === "BUY" ? 1.06 : 0.94)),
      estimatedCost: totalCost,
    });
  };

  const handleQuickOrder = (side: "BUY" | "SELL") => {
    setOrderAction(side);
    setOrderDraft({
      symbol: company.symbol,
      name: company.name,
      side,
      orderType,
      product: productType,
      quantity: sharesQty,
      price: orderType === "MARKET" ? currentPrice : limitPrice,
      stopLoss: Math.round(currentPrice * (side === "BUY" ? 0.97 : 1.03)),
      target: Math.round(currentPrice * (side === "BUY" ? 1.06 : 0.94)),
      estimatedCost: totalCost,
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#222222] font-sans antialiased pb-20 md:pb-0">
      {/* Mandatory Pre-trade analysis modal */}
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

      {/* UPSTOX PRO TOP BANNER & NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white shadow-sm">
        {/* Strip 1: Ticker strip (VIX, NIFTY) */}
        <div className="flex h-9 items-center justify-between border-b border-[#f0f2f5] px-4 text-xs font-medium">
          <div className="flex items-center gap-6">
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
            <div className="hidden md:flex items-center gap-1.5">
              <span className="font-bold text-[#222222]">BANK NIFTY</span>
              <span className="font-bold text-[#dc2626]">51,840.40</span>
              <span className="text-[11px] text-[#dc2626]">-0.25%</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
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

        {/* Strip 2: Upstox Logo, Breadcrumb, UI Presets & Back */}
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs font-semibold text-[#4b5563] hover:bg-[#f9fafb]"
            >
              <ChevronLeft className="size-4" />
              <span>Back to Charts</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#6b21a8] font-bold text-white text-xs">
                up
              </div>
              <span className="text-base font-bold text-[#222222]">Upstox Pro</span>
              <ChevronRight className="size-3 text-[#9ca3af]" />
              <span className="text-xs font-bold text-[#6b21a8]">{company.symbol}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
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

            <div className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs text-[#374151]">
              <div className="flex size-5 items-center justify-center rounded-full bg-[#6b21a8] text-[10px] font-bold text-white">
                {(user?.name || "Upstox").slice(0, 1)}
              </div>
              <span className="font-semibold">{user?.name || "Trader"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* TWO-COLUMN WORKSPACE: LEFT WATCHLIST + MAIN INSTRUMENT DEPTH & ORDER DESK */}
      <div className="flex flex-1">
        {/* Left Watchlist Sidebar */}
        <aside className="hidden lg:flex w-72 shrink-0 flex-col justify-between border-r border-[#e5e7eb] bg-white min-h-[calc(100vh-6rem)]">
          <div>
            <div className="flex items-center justify-between border-b border-[#f0f2f5] p-3 text-xs font-bold text-[#374151]">
              <span>Watchlist</span>
              <span className="rounded bg-[#f3f4f6] px-1.5 py-0.5 text-[10px] text-[#6b7280]">
                {upstoxWatchlist.length} / 100
              </span>
            </div>

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
                getNseEquitiesUniverse()
                  .filter(
                    (c) =>
                      c.symbol.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
                      c.name.toLowerCase().includes(sidebarSearch.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((item) => (
                    <Link
                      key={item.symbol}
                      href={`/company/${item.symbol}`}
                      className={`flex items-center justify-between p-3 text-xs cursor-pointer transition ${
                        company.symbol === item.symbol
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
                    </Link>
                  ))
              ) : (
                upstoxWatchlist.map((item) => (
                  <Link
                    key={item.symbol}
                    href={`/company/${item.symbol.split(" ")[0]}`}
                    className={`flex items-center justify-between p-3 text-xs cursor-pointer transition ${
                      company.symbol === item.symbol.split(" ")[0]
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
                  </Link>
                ))
              )}
            </div>
          </div>
          <div className="border-t border-[#e5e7eb] p-3 text-center text-xs text-[#6b7280]">
            NSE Live Order Router Active
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 space-y-6 max-w-7xl">
          {/* Header Strip with Live Quotes */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-[#1f2937]">
                    {company.symbol}
                  </h1>
                  <span className="text-sm text-[#6b7280]">{company.name}</span>
                  <span className="rounded bg-[#f3e8ff] px-2 py-0.5 text-xs font-semibold text-[#6b21a8]">
                    NSE EQ
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#1f2937]">
                    ₹{currentPrice.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isUp ? "text-[#16a34a]" : "text-[#dc2626]"
                    }`}
                  >
                    {isUp ? "+" : ""}
                    {priceDiff.toFixed(2)} ({isUp ? "+" : ""}
                    {(company.changePercent ?? 0).toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                <div>
                  <span>Day's Range</span>
                  <div className="font-semibold text-[#1f2937]">
                    ₹{company.dayLow} – ₹{company.dayHigh}
                  </div>
                </div>
                <div className="border-l border-[#e5e7eb] pl-4">
                  <span>Volume</span>
                  <div className="font-semibold text-[#1f2937]">
                    {company.volume || "12.4 L"}
                  </div>
                </div>
                <div className="border-l border-[#e5e7eb] pl-4">
                  <span>Sector</span>
                  <div className="font-semibold text-[#1f2937]">{company.sector}</div>
                </div>
              </div>
            </div>
          </div>

          {/* TWO-COLUMN GRID: Chart & Depth (8 cols) vs Upstox Order Window (4 cols) */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left 8 Columns */}
            <div className="space-y-6 lg:col-span-8">
              {/* Highcharts Candlestick Chart */}
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3f4f6] pb-3 text-xs">
                  <span className="font-bold text-[#1f2937]">
                    {company.symbol} • Interactive Candlestick Stream
                  </span>
                  <div className="flex items-center gap-1">
                    {(["1D", "5D", "1M", "1Y", "ALL"] as const).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`rounded px-2.5 py-1 text-xs font-semibold transition ${
                          timeframe === tf
                            ? "bg-[#6b21a8] text-white"
                            : "text-[#6b7280] hover:bg-[#f3f4f6]"
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                <HighchartsStockChart
                  symbol={company.symbol}
                  basePrice={currentPrice}
                  height={340}
                  lightTheme={true}
                />
              </div>

              {/* Upstox 5-Level Market Depth (Bids vs Asks) */}
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#f3f4f6] pb-3 text-xs">
                  <span className="font-bold text-[#1f2937]">
                    L2 Market Depth (Live 5-Tier Order Book)
                  </span>
                  <span className="text-[#6b7280]">Real-time NSE Depth Feeds</span>
                </div>

                <div className="grid grid-cols-2 gap-6 text-xs">
                  {/* Bids */}
                  <div>
                    <div className="flex justify-between border-b border-[#f3f4f6] pb-2 text-[11px] font-bold text-[#6b7280] uppercase">
                      <span>Bid Price</span>
                      <span>Orders</span>
                      <span>Qty</span>
                    </div>
                    <div className="mt-2 divide-y divide-[#fafafa]">
                      {[
                        { price: (currentPrice - 0.25).toFixed(2), orders: 19, qty: 1450, pct: 65 },
                        { price: (currentPrice - 0.50).toFixed(2), orders: 24, qty: 2900, pct: 85 },
                        { price: (currentPrice - 0.75).toFixed(2), orders: 11, qty: 1100, pct: 45 },
                        { price: (currentPrice - 1.00).toFixed(2), orders: 36, qty: 4600, pct: 95 },
                        { price: (currentPrice - 1.25).toFixed(2), orders: 8, qty: 850, pct: 35 },
                      ].map((b, idx) => (
                        <div key={idx} className="relative py-2 flex items-center justify-between text-[#16a34a]">
                          <div
                            style={{ width: `${b.pct}%` }}
                            className="absolute left-0 top-0 bottom-0 bg-[#dcfce7]/40 -z-0"
                          />
                          <span className="relative z-10 font-bold">{b.price}</span>
                          <span className="relative z-10 text-[#6b7280]">{b.orders}</span>
                          <span className="relative z-10 font-semibold">{b.qty.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between border-t border-[#e5e7eb] pt-2 font-bold text-[#1f2937]">
                      <span>Total Bids</span>
                      <span>98</span>
                      <span>10,900</span>
                    </div>
                  </div>

                  {/* Asks */}
                  <div>
                    <div className="flex justify-between border-b border-[#f3f4f6] pb-2 text-[11px] font-bold text-[#6b7280] uppercase">
                      <span>Ask Price</span>
                      <span>Orders</span>
                      <span>Qty</span>
                    </div>
                    <div className="mt-2 divide-y divide-[#fafafa]">
                      {[
                        { price: (currentPrice + 0.25).toFixed(2), orders: 15, qty: 1300, pct: 55 },
                        { price: (currentPrice + 0.50).toFixed(2), orders: 31, qty: 3200, pct: 90 },
                        { price: (currentPrice + 0.75).toFixed(2), orders: 9, qty: 820, pct: 40 },
                        { price: (currentPrice + 1.00).toFixed(2), orders: 42, qty: 5400, pct: 98 },
                        { price: (currentPrice + 1.25).toFixed(2), orders: 12, qty: 960, pct: 45 },
                      ].map((a, idx) => (
                        <div key={idx} className="relative py-2 flex items-center justify-between text-[#dc2626]">
                          <div
                            style={{ width: `${a.pct}%` }}
                            className="absolute right-0 top-0 bottom-0 bg-[#fee2e2]/40 -z-0"
                          />
                          <span className="relative z-10 font-bold">{a.price}</span>
                          <span className="relative z-10 text-[#6b7280]">{a.orders}</span>
                          <span className="relative z-10 font-semibold">{a.qty.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between border-t border-[#e5e7eb] pt-2 font-bold text-[#1f2937]">
                      <span>Total Asks</span>
                      <span>109</span>
                      <span>11,680</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upstox AI Pedagogical Insights */}
              <div className="rounded-xl border border-[#d8b4fe] bg-[#faf5ff] p-5 text-xs text-[#581c87] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#6b21a8]">
                  <Sparkles className="size-4" />
                  <span>Upstox Pro Pedagogical Analysis for {company.symbol}</span>
                </div>
                <p className="leading-relaxed text-[#4b5563]">
                  {company.symbol} is currently priced at ₹{currentPrice.toFixed(2)}. In your virtual wallet with ₹{activeWallet.toLocaleString("en-IN")} available cash, committing {sharesQty} shares requires ₹{totalCost.toLocaleString("en-IN")}, taking up {((totalCost / Math.max(activeWallet, 1)) * 100).toFixed(1)}% of your available liquidity. For delivery CNC holding, maintain a stop loss at ₹{(currentPrice * 0.97).toFixed(1)} to protect against broader index corrections.
                </p>
              </div>
            </div>

            {/* Right 4 Columns: Upstox Pro Fast Order Desk */}
            <div className="space-y-4 lg:col-span-4">
              <div className="sticky top-20 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm space-y-5">
                {/* Buy / Sell Tab Switcher */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderAction("BUY")}
                    className={`py-3 rounded-lg text-xs font-bold transition ${
                      orderAction === "BUY"
                        ? "bg-[#16a34a] text-white shadow-sm"
                        : "bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb]"
                    }`}
                  >
                    BUY {company.symbol}
                  </button>
                  <button
                    onClick={() => setOrderAction("SELL")}
                    className={`py-3 rounded-lg text-xs font-bold transition ${
                      orderAction === "SELL"
                        ? "bg-[#dc2626] text-white shadow-sm"
                        : "bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb]"
                    }`}
                  >
                    SELL {company.symbol}
                  </button>
                </div>

                {/* Product Type (Delivery vs Intraday) */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[#6b7280] font-semibold">Product Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setProductType("CNC")}
                      className={`rounded-lg border py-2 text-xs font-bold transition ${
                        productType === "CNC"
                          ? "border-[#6b21a8] bg-[#f3e8ff] text-[#6b21a8]"
                          : "border-[#e5e7eb] text-[#4b5563] hover:bg-[#f9fafb]"
                      }`}
                    >
                      Delivery (CNC)
                    </button>
                    <button
                      onClick={() => setProductType("MIS")}
                      className={`rounded-lg border py-2 text-xs font-bold transition ${
                        productType === "MIS"
                          ? "border-[#6b21a8] bg-[#f3e8ff] text-[#6b21a8]"
                          : "border-[#e5e7eb] text-[#4b5563] hover:bg-[#f9fafb]"
                      }`}
                    >
                      Intraday (MIS)
                    </button>
                  </div>
                </div>

                {/* Order Type (Market vs Limit) */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[#6b7280] font-semibold">Order Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOrderType("MARKET")}
                      className={`rounded-lg border py-2 text-xs font-bold transition ${
                        orderType === "MARKET"
                          ? "border-[#6b21a8] bg-[#f3e8ff] text-[#6b21a8]"
                          : "border-[#e5e7eb] text-[#4b5563] hover:bg-[#f9fafb]"
                      }`}
                    >
                      Market
                    </button>
                    <button
                      onClick={() => setOrderType("LIMIT")}
                      className={`rounded-lg border py-2 text-xs font-bold transition ${
                        orderType === "LIMIT"
                          ? "border-[#6b21a8] bg-[#f3e8ff] text-[#6b21a8]"
                          : "border-[#e5e7eb] text-[#4b5563] hover:bg-[#f9fafb]"
                      }`}
                    >
                      Limit
                    </button>
                  </div>
                </div>

                {/* Quantity and Price Inputs */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[#6b7280] font-semibold block mb-1">
                      Quantity (Shares)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={sharesQty}
                        onChange={(e) => setSharesQty(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm font-bold text-[#1f2937] focus:border-[#6b21a8] focus:outline-none"
                      />
                      <div className="flex items-center gap-1">
                        {[1, 5, 10, 25].map((q) => (
                          <button
                            key={q}
                            onClick={() => setSharesQty(q)}
                            className={`rounded border px-2 py-1.5 text-[11px] font-semibold ${
                              sharesQty === q
                                ? "border-[#6b21a8] bg-[#6b21a8] text-white"
                                : "border-[#e5e7eb] text-[#4b5563] hover:bg-[#f9fafb]"
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[#6b7280] font-semibold block mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      disabled={orderType === "MARKET"}
                      value={orderType === "MARKET" ? currentPrice : limitPrice}
                      onChange={(e) => setLimitPrice(parseFloat(e.target.value) || currentPrice)}
                      className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm font-bold text-[#1f2937] disabled:bg-[#f3f4f6] disabled:text-[#9ca3af] focus:border-[#6b21a8] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Capital & Margin Computation */}
                <div className="border-t border-[#f3f4f6] pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[#6b7280]">
                    <span>Approx. Margin Required</span>
                    <span className="font-bold text-[#1f2937]">₹{totalCost.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[#6b7280]">
                    <span>Available Cash Margin</span>
                    <span className="font-bold text-[#6b21a8]">₹{activeWallet.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleOpenAnalysis}
                  className={`w-full py-3.5 rounded-lg text-sm font-bold text-white shadow transition hover:brightness-105 ${
                    orderAction === "BUY" ? "bg-[#16a34a]" : "bg-[#dc2626]"
                  }`}
                >
                  {orderAction === "BUY" ? "BUY" : "SELL"} {sharesQty} {company.symbol}
                </button>

                <p className="text-center text-[11px] text-[#9ca3af]">
                  Upstox Risk Shield: Pre-trade risk and capital impact analysis evaluates every order prior to execution.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upstox Pro Mobile Sticky Trade Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-[#e5e7eb] bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1f2937]">{company.symbol}</span>
            <span className="text-[10px] text-[#6b7280] font-semibold">₹{currentPrice.toFixed(2)}</span>
          </div>
          <div className={`text-[10px] font-semibold ${isUp ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
            {priceDiff >= 0 ? "+" : ""}₹{priceDiff.toFixed(2)} ({isUp ? "+" : ""}{company.changePercent}%)
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuickOrder("BUY")}
            className="rounded-lg bg-[#16a34a] px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition"
          >
            BUY
          </button>
          <button
            onClick={() => handleQuickOrder("SELL")}
            className="rounded-lg bg-[#dc2626] px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition"
          >
            SELL
          </button>
        </div>
      </div>
    </div>
  );
}
