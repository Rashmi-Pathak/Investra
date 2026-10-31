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
  ShoppingCart,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { getNseEquitiesUniverse, NseStockItem } from "@/lib/nseUniverse";
import { useInvestraStore } from "@/store/useInvestraStore";

export function GrowwDesktopMarketView() {
  const allStocks = getNseEquitiesUniverse();
  const {
    user,
    brokerPreset,
    financialMode,
    setFinancialMode,
    beginnerWallet,
    brokerWallet,
    holdings,
    orders,
    setSelectedSymbol,
  } = useInvestraStore();

  const activeWallet = financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;

  const [activeTab, setActiveTab] = useState<"STOCKS" | "ORDERS">("STOCKS");
  const [marketCapFilter, setMarketCapFilter] = useState<"ALL" | "LARGE" | "MID" | "SMALL">("ALL");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // Filter stocks
  const filtered = allStocks.filter((s) => {
    if (sectorFilter !== "ALL" && s.sector !== sectorFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!s.symbol.toLowerCase().includes(q) && !s.name.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pagedRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Benchmarks
  const indices = [
    { name: "NIFTY", value: "24,315.80", change: "+142.10 (0.59%)", up: true, points: "0,28 30,22 60,25 90,15 120,8 150,12 180,4" },
    { name: "SENSEX", value: "79,942.20", change: "+485.40 (0.61%)", up: true, points: "0,25 30,20 60,22 90,12 120,16 150,6 180,2" },
    { name: "BANK NIFTY", value: "51,840.40", change: "-130.50 (-0.25%)", up: false, points: "0,5 30,12 60,8 90,20 120,18 150,26 180,28" },
  ];

  // Stocks in News / Top Gainers
  const stocksInNews = [
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2742.5, change: "+1.20%", up: true },
    { symbol: "TCS", name: "Tata Consultancy", price: 3912.8, change: "+0.85%", up: true },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1682.4, change: "+0.65%", up: true },
    { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1598.6, change: "+2.91%", up: true },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#44475b] font-sans antialiased">
      {/* GROWW DESKTOP TOP NAVBAR (Matches Screenshot 2 & 4) */}
      <header className="sticky top-0 z-40 border-b border-[#ebedf0] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/market" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00d09c] to-[#00b386] shadow-sm">
                <span className="text-xl font-black text-white">G</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#44475b]">
                Groww
              </span>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-semibold">
              <button
                onClick={() => setActiveTab("STOCKS")}
                className={`py-5 border-b-2 transition ${
                  activeTab === "STOCKS"
                    ? "border-[#00d09c] text-[#00d09c]"
                    : "border-transparent text-[#7c7e8c] hover:text-[#44475b]"
                }`}
              >
                Stocks
              </button>
              <button
                onClick={() => setActiveTab("ORDERS")}
                className={`py-5 border-b-2 transition ${
                  activeTab === "ORDERS"
                    ? "border-[#00d09c] text-[#00d09c]"
                    : "border-transparent text-[#7c7e8c] hover:text-[#44475b]"
                }`}
              >
                Orders ({orders.length})
              </button>
            </nav>
          </div>

          {/* Search Bar + User Profile + Wallet Pill */}
          <div className="flex items-center gap-5">
            <div className="relative w-80">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9b9da8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search mutual funds and stocks"
                className="w-full rounded-lg border border-[#e8eaed] bg-[#f8f9fa] py-2 pl-10 pr-4 text-xs text-[#44475b] placeholder-[#9b9da8] focus:border-[#00d09c] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setFinancialMode(financialMode === "REAL_LIFE" ? "BEGINNER" : "REAL_LIFE")}
                  className="flex items-center gap-1.5 rounded-md border border-[#00d09c] bg-[#e8f7f3] px-3 py-1.5 text-xs font-semibold text-[#00b386] hover:bg-[#00d09c] hover:text-white transition"
                  title="Click to toggle ₹1,00,000 Cash Mode vs Real-Life Salary Mode"
                >
                  <Wallet className="size-3.5" />
                  <span>₹{activeWallet.toLocaleString("en-IN")}</span>
                </button>
              </div>

              {/* UI Presets Dropdown */}
              <select
                value={brokerPreset}
                onChange={(e) => useInvestraStore.getState().setBrokerPreset(e.target.value as any)}
                className="rounded-md border border-[#e2e4e8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#44475b] focus:outline-none"
              >
                <option value="original">Investra Dark</option>
                <option value="kite">Zerodha Kite</option>
                <option value="groww">Groww</option>
                <option value="upstox">Upstox</option>
              </select>

              <button className="text-[#7c7e8c] hover:text-[#44475b]">
                <Bell className="size-4" />
              </button>
              <button className="text-[#7c7e8c] hover:text-[#44475b]">
                <ShoppingCart className="size-4" />
              </button>

              <Link
                href="/portfolio"
                className="flex size-8 items-center justify-center rounded-full bg-[#e8f7f3] text-xs font-bold text-[#00d09c]"
              >
                {(user?.name || "Groww").slice(0, 2).toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* GROWW WORKSPACE (Matches Screenshot 2, 3, 4) */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-20 md:pb-8 space-y-6">
        {activeTab === "ORDERS" ? (
          <div className="rounded-xl border border-[#edf0f2] bg-white p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f4f5f7] pb-4">
              <div>
                <h1 className="text-xl font-bold text-[#44475b]">All Orders ({orders.length})</h1>
                <p className="text-xs text-[#7c7e8c]">Real-time execution log of your virtual portfolio</p>
              </div>
              <button
                onClick={() => setActiveTab("STOCKS")}
                className="rounded-full bg-[#00d09c] px-4 py-2 text-xs font-bold text-white hover:brightness-105 transition"
              >
                + Place New Order
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f4fbf9] text-[#00d09c]">
                  <ShoppingCart className="size-6" />
                </div>
                <h3 className="text-base font-bold text-[#44475b]">No orders placed yet</h3>
                <p className="text-xs text-[#7c7e8c] max-w-sm mx-auto">
                  When you buy or sell stocks in Groww mode, your simulated order slips and execution details will show up right here.
                </p>
                <button
                  onClick={() => setActiveTab("STOCKS")}
                  className="rounded-full bg-[#00d09c] px-5 py-2.5 text-xs font-bold text-white hover:brightness-105"
                >
                  Explore Stocks
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#f4f5f7] bg-[#fbfcfc] text-[11px] font-bold uppercase text-[#7c7e8c]">
                      <th className="px-6 py-3.5">Time</th>
                      <th className="px-6 py-3.5">Type</th>
                      <th className="px-6 py-3.5">Company</th>
                      <th className="px-6 py-3.5">Product</th>
                      <th className="px-6 py-3.5">Qty</th>
                      <th className="px-6 py-3.5">Price</th>
                      <th className="px-6 py-3.5">Total Value</th>
                      <th className="px-6 py-3.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f5f7]">
                    {orders.map((o) => {
                      const totalVal = o.price * o.qty;
                      return (
                        <tr key={o.id} className="hover:bg-[#fcfdfd] transition">
                          <td className="px-6 py-4 text-[#7c7e8c]">{o.time}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                o.side === "BUY"
                                  ? "bg-[#e8f7f3] text-[#00b386]"
                                  : "bg-[#fef2f2] text-[#ef4444]"
                              }`}
                            >
                              {o.side}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              href={`/company/${o.symbol}`}
                              className="font-bold text-[#44475b] hover:text-[#00d09c]"
                            >
                              {o.symbol}
                            </Link>
                            <span className="block text-[10px] text-[#9ca3af]">{o.name}</span>
                          </td>
                          <td className="px-6 py-4 text-[#7c7e8c]">
                            {o.productType === "CNC" ? "Delivery (CNC)" : "Intraday (MIS)"}
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#44475b]">{o.qty}</td>
                          <td className="px-6 py-4 text-[#44475b]">₹{o.price.toFixed(2)}</td>
                          <td className="px-6 py-4 font-semibold text-[#44475b]">₹{totalVal.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                o.status === "FILLED"
                                  ? "bg-[#e8f7f3] text-[#00b386]"
                                  : o.status === "OPEN"
                                  ? "bg-[#fef9c3] text-[#ca8a04]"
                                  : "bg-[#f3f4f6] text-[#6b7280]"
                              }`}
                            >
                              {o.status === "FILLED" ? "EXECUTED" : o.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Top Strip: Market Opens in 1 Day / Index Cards + IPO Box (Screenshot 4) */}
            <div className="grid gap-6 lg:grid-cols-12">
          {/* Index Cards */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7c7e8c]">
                Market Index
              </span>
              <span className="text-xs font-semibold text-[#00d09c] cursor-pointer hover:underline">
                ALL STOCKS →
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {indices.map((idx) => (
                <div
                  key={idx.name}
                  className="rounded-xl border border-[#edf0f2] bg-white p-4 shadow-sm hover:shadow transition"
                >
                  <div className="text-xs font-bold text-[#7c7e8c]">{idx.name}</div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-[#44475b]">
                      {idx.value}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        idx.up ? "text-[#00d09c]" : "text-[#eb5b3c]"
                      }`}
                    >
                      {idx.change}
                    </span>
                  </div>

                  {/* Sparkline Curve */}
                  <div className="mt-3 h-8 w-full">
                    <svg viewBox="0 0 180 32" className="h-full w-full">
                      <polyline
                        fill="none"
                        stroke={idx.up ? "#00d09c" : "#eb5b3c"}
                        strokeWidth="2"
                        points={idx.points}
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right IPO Card (Matches Screenshot 3 & 4) */}
          <div className="lg:col-span-4 rounded-xl border border-[#edf0f2] bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#f4f5f7] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#44475b]">IPO</span>
                <span className="text-xs text-[#7c7e8c]">Initial Public Offering</span>
              </div>
              <ChevronRight className="size-4 text-[#00d09c]" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-[11px] text-[#7c7e8c]">Open Now</span>
                <div className="text-base font-bold text-[#00d09c]">02 Issues</div>
              </div>
              <div>
                <span className="text-[11px] text-[#7c7e8c]">Upcoming</span>
                <div className="text-base font-bold text-[#44475b]">02</div>
              </div>
              <div>
                <span className="text-[11px] text-[#7c7e8c]">Closed</span>
                <div className="text-base font-bold text-[#7c7e8c]">08</div>
              </div>
            </div>

            <div className="rounded-lg border border-[#e8f7f3] bg-[#f4fbf9] p-3 text-xs text-[#00b386]">
              <span className="font-bold">Virtual IPO Bids Active: </span>
              Apply directly using virtual wallet funds with zero lock-in penalty.
            </div>
          </div>
        </div>

        {/* Stocks in News Row (Screenshot 4) */}
        <div className="rounded-xl border border-[#edf0f2] bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#44475b]">Stocks in News</h3>
            <span className="text-xs font-semibold text-[#00d09c] hover:underline cursor-pointer">
              SEE DETAILS ↗
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stocksInNews.map((s) => (
              <Link
                key={s.symbol}
                href={`/company/${s.symbol}`}
                className="flex items-center justify-between rounded-lg border border-[#edf0f2] bg-[#fbfcfc] p-3 hover:border-[#00d09c] transition"
              >
                <div>
                  <div className="font-bold text-[#44475b]">{s.symbol}</div>
                  <div className="text-[11px] text-[#7c7e8c]">{s.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#44475b]">₹{s.price.toFixed(2)}</div>
                  <div className="text-xs font-semibold text-[#00d09c]">{s.change}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* TWO-COLUMN EXPLORE & SEARCH RESULTS (Exact Screenshot 2) */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Filters Sidebar (Screenshot 2) */}
          <div className="lg:col-span-3 space-y-4 rounded-xl border border-[#edf0f2] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#f4f5f7] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#44475b]">
                FILTERS
              </span>
              <button
                onClick={() => {
                  setSectorFilter("ALL");
                  setMarketCapFilter("ALL");
                  setSearch("");
                  setPage(1);
                }}
                className="text-xs font-bold text-[#00d09c] hover:underline"
              >
                CLEAR ALL
              </button>
            </div>

            {/* Company Search in Filters */}
            <div className="space-y-1.5 pb-2 border-b border-[#f4f5f7]">
              <label className="text-xs font-semibold text-[#44475b] block">
                Search Company
              </label>
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by symbol or name..."
                    className="w-full rounded-md border border-[#e2e4e8] bg-[#f8f9fa] py-2 pl-8 pr-2 text-xs text-[#44475b] placeholder-[#9ca3af] focus:border-[#00d09c] focus:outline-none"
                  />
                  <Search className="absolute left-2.5 top-2.5 size-3.5 text-[#9ca3af]" />
                </div>
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                    }}
                    className="rounded-md border border-[#e2e4e8] bg-white px-2.5 py-2 text-xs font-medium text-[#7c7e8c] hover:text-[#44475b]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Sector Accordion */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#44475b] block">
                Sector
              </label>
              <select
                value={sectorFilter}
                onChange={(e) => {
                  setSectorFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-md border border-[#e2e4e8] bg-[#f8f9fa] p-2 text-xs text-[#44475b] focus:border-[#00d09c] focus:outline-none"
              >
                <option value="ALL">All Sectors ({allStocks.length})</option>
                <option value="Equities">Equities</option>
                <option value="IT">IT</option>
                <option value="Banking">Banking</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Energy">Energy</option>
                <option value="Metals">Metals</option>
                <option value="FMCG">FMCG</option>
                <option value="Automobile">Automobile</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Telecom">Telecom</option>
              </select>
            </div>

            {/* Market Cap Segment Toggle (Screenshot 2) */}
            <div className="space-y-2 pt-2 border-t border-[#f4f5f7]">
              <label className="text-xs font-semibold text-[#44475b] block">
                Market Cap (Cr)
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(["Small", "Mid", "Large"] as const).map((cap) => (
                  <button
                    key={cap}
                    onClick={() => setMarketCapFilter(cap.toUpperCase() as any)}
                    className={`rounded-md border py-1.5 font-medium transition ${
                      marketCapFilter === cap.toUpperCase()
                        ? "border-[#00d09c] bg-[#e8f7f3] text-[#00b386]"
                        : "border-[#e2e4e8] bg-white text-[#7c7e8c] hover:border-[#00d09c]"
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Wallet Context */}
            <div className="rounded-lg border border-[#edf0f2] bg-[#f8f9fa] p-3 text-xs space-y-1">
              <div className="text-[11px] text-[#7c7e8c]">Virtual Balance</div>
              <div className="font-bold text-[#00d09c]">
                ₹{activeWallet.toLocaleString("en-IN")}
              </div>
              <div className="text-[10px] text-[#9b9da8]">
                Clicking any stock opens its interactive Highcharts candlestick &amp; pre-trade risk analysis.
              </div>
            </div>
          </div>

          {/* Right Stock Results Table (Exact Screenshot 2) */}
          <div className="lg:col-span-9 rounded-xl border border-[#edf0f2] bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#f4f5f7] px-6 py-4">
              <h2 className="text-sm font-bold text-[#44475b]">
                Search results {filtered.length} Stocks
              </h2>
              <span className="text-xs text-[#7c7e8c]">
                Page {page} of {totalPages || 1}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#f4f5f7] bg-[#fbfcfc] text-[11px] font-bold uppercase text-[#7c7e8c]">
                    <th className="px-6 py-3.5">COMPANY ▾</th>
                    <th className="px-6 py-3.5">TREND</th>
                    <th className="px-6 py-3.5">MARKET PRICE ▾</th>
                    <th className="px-6 py-3.5">CLOSE PRICE ▾</th>
                    <th className="px-6 py-3.5">MARKET CAP (CR) ▾</th>
                    <th className="px-6 py-3.5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f7f8f9]">
                  {pagedRows.map((s) => {
                    const isUp = s.changePercent >= 0;
                    return (
                      <tr
                        key={s.symbol}
                        className="hover:bg-[#f8fcfb] transition cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <Link
                            href={`/company/${s.symbol}`}
                            className="font-bold text-[#44475b] hover:text-[#00d09c]"
                          >
                            {s.name}
                          </Link>
                          <span className="block text-[10px] text-[#9b9da8]">
                            NSE: {s.symbol} • {s.sector}
                          </span>
                        </td>

                        {/* Mini trend sparkline */}
                        <td className="px-6 py-4">
                          <div className="h-5 w-20">
                            <svg viewBox="0 0 80 20" className="h-full w-full">
                              <polyline
                                fill="none"
                                stroke={isUp ? "#00d09c" : "#eb5b3c"}
                                strokeWidth="1.8"
                                points={
                                  isUp
                                    ? "0,16 15,12 30,14 45,9 60,11 75,4"
                                    : "0,4 15,9 30,7 45,14 60,12 75,18"
                                }
                              />
                            </svg>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-bold text-[#44475b]">
                            ₹{s.price.toFixed(2)}
                          </div>
                          <div
                            className={`text-[11px] font-semibold ${
                              isUp ? "text-[#00d09c]" : "text-[#eb5b3c]"
                            }`}
                          >
                            {isUp ? "+" : ""}
                            {(s.price - s.prevClose).toFixed(2)} (
                            {isUp ? "+" : ""}
                            {s.changePercent}%)
                          </div>
                        </td>

                        <td className="px-6 py-4 text-[#7c7e8c]">
                          ₹{s.prevClose.toFixed(2)}
                        </td>

                        <td className="px-6 py-4 text-[#44475b] font-medium">
                          ₹{s.marketCap}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/company/${s.symbol}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#00d09c] bg-[#e8f7f3] px-3.5 py-1.5 text-xs font-bold text-[#00b386] hover:bg-[#00d09c] hover:text-white transition"
                          >
                            <Plus className="size-3.5" />
                            BUY
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-[#f4f5f7] px-6 py-4 text-xs">
              <span className="text-[#7c7e8c]">
                Showing {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filtered.length)} of{" "}
                <strong className="text-[#44475b]">{filtered.length}</strong> stocks
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-md border border-[#e2e4e8] px-3 py-1.5 font-semibold text-[#44475b] disabled:opacity-40 hover:bg-[#f8f9fa]"
                >
                  Previous
                </button>
                <span className="px-2 text-xs font-semibold text-[#00d09c]">
                  {page} / {totalPages || 1}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-md bg-[#00d09c] px-4 py-1.5 font-bold text-white disabled:opacity-40 hover:brightness-105"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </main>

      {/* Groww Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-[#ebedf0] bg-white text-[#7c7e8c] md:hidden shadow-lg">
        <button
          onClick={() => setActiveTab("STOCKS")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            activeTab === "STOCKS" ? "text-[#00d09c]" : "hover:text-[#44475b]"
          }`}
        >
          <TrendingUp className="size-4" />
          <span>Stocks</span>
        </button>

        <button
          onClick={() => setActiveTab("ORDERS")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            activeTab === "ORDERS" ? "text-[#00d09c]" : "hover:text-[#44475b]"
          }`}
        >
          <ShoppingCart className="size-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <Link
          href="/portfolio"
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold hover:text-[#00d09c] transition"
        >
          <Wallet className="size-4" />
          <span>Portfolio</span>
        </Link>

        <button
          onClick={() => useInvestraStore.getState().setBrokerPreset("kite")}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-[#00d09c] hover:brightness-110 transition"
        >
          <span className="flex size-4 items-center justify-center rounded bg-[#00d09c] text-white text-[9px] font-bold">UI</span>
          <span>Switch UI</span>
        </button>
      </nav>
    </div>
  );
}
