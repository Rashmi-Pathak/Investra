"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Bookmark,
  Bell,
  Wallet,
  ShoppingCart,
  ChevronRight,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { HighchartsStockChart } from "@/components/HighchartsStockChart";
import {
  PreTradeAnalysisModal,
  PendingOrderDraft,
} from "@/components/PreTradeAnalysisModal";
import { NseStockItem } from "@/lib/nseUniverse";
import { useInvestraStore } from "@/store/useInvestraStore";

export function GrowwCompanyDetailView({ company }: { company: NseStockItem }) {
  const {
    user,
    financialMode,
    beginnerWallet,
    brokerWallet,
    monthlySip,
    executePaperOrder,
  } = useInvestraStore();

  const activeBalance =
    financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;

  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "NEWS" | "EVENTS" | "F&O">("OVERVIEW");
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "1Y" | "3Y" | "5Y" | "ALL">("1M");
  const [orderType, setOrderType] = useState<"DELIVERY" | "INTRADAY">("DELIVERY");
  const [orderAction, setOrderAction] = useState<"BUY" | "SELL">("BUY");
  const [sharesQty, setSharesQty] = useState(1);
  const [orderDraft, setOrderDraft] = useState<PendingOrderDraft | null>(null);

  const priceChange = company.price - company.prevClose;
  const isUp = priceChange >= 0;
  const orderTotal = company.price * sharesQty;

  const handleOpenAnalysis = () => {
    setOrderDraft({
      symbol: company.symbol,
      name: company.name,
      side: orderAction,
      orderType: "MARKET",
      product: orderType === "DELIVERY" ? "CNC" : "MIS",
      quantity: sharesQty,
      price: company.price,
      stopLoss: Math.round(company.price * (orderAction === "BUY" ? 0.97 : 1.03)),
      target: Math.round(company.price * (orderAction === "BUY" ? 1.06 : 0.94)),
      estimatedCost: orderTotal,
    });
  };

  const handleQuickOrder = (side: "BUY" | "SELL") => {
    setOrderAction(side);
    setOrderDraft({
      symbol: company.symbol,
      name: company.name,
      side,
      orderType: "MARKET",
      product: orderType === "DELIVERY" ? "CNC" : "MIS",
      quantity: sharesQty,
      price: company.price,
      stopLoss: Math.round(company.price * (side === "BUY" ? 0.97 : 1.03)),
      target: Math.round(company.price * (side === "BUY" ? 1.06 : 0.94)),
      estimatedCost: company.price * sharesQty,
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#44475b] font-sans antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#ebedf0] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/market" className="flex items-center gap-2 text-xs font-bold text-[#7c7e8c] hover:text-[#00d09c]">
              <ChevronLeft className="size-4" /> Back to Stocks
            </Link>
            <div className="h-4 w-[1px] bg-[#e8eaed]" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#44475b]">{company.symbol}</span>
              <span className="rounded bg-[#f0f2f5] px-1.5 py-0.5 text-[10px] text-[#7c7e8c]">
                NSE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portfolio"
              className="flex items-center gap-1.5 rounded-md border border-[#e2e4e8] bg-[#f8f9fa] px-3 py-1.5 text-xs font-semibold text-[#44475b]"
            >
              <Wallet className="size-3.5 text-[#00d09c]" />
              <span>₹{activeBalance.toLocaleString("en-IN")}</span>
            </Link>
            <div className="flex size-8 items-center justify-center rounded-full bg-[#e8f7f3] text-xs font-bold text-[#00d09c]">
              {(user?.name || "Groww").slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace (Matches Screenshot 2, 4, 5) */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 py-4 sm:py-8 pb-24 md:pb-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left 8 Cols: Header, Interactive Chart, Performance Stats, Fundamentals */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header: Company Name, Price, Change */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#f0f2f5] pb-5">
              <div>
                <h1 className="text-2xl font-bold text-[#44475b]">{company.name}</h1>
                <p className="mt-0.5 text-xs text-[#7c7e8c]">
                  NSE: {company.symbol} • Sector: {company.sector}
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-extrabold text-[#44475b]">
                  ₹{company.price.toFixed(2)}
                </div>
                <div
                  className={`mt-0.5 text-xs font-semibold ${
                    isUp ? "text-[#00d09c]" : "text-[#eb5b3c]"
                  }`}
                >
                  {isUp ? "+" : ""}
                  {priceChange.toFixed(2)} ({isUp ? "+" : ""}
                  {company.changePercent}%) 1D
                </div>
              </div>
            </div>

            {/* Timeframe Pills (Matches Screenshot 5) */}
            <div className="flex items-center gap-2">
              {(["1D", "1W", "1M", "1Y", "3Y", "5Y", "ALL"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    timeframe === tf
                      ? "bg-[#e8f7f3] text-[#00b386]"
                      : "text-[#7c7e8c] hover:bg-[#f4f5f7] hover:text-[#44475b]"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Highcharts Stock Candlestick & Volume Chart */}
            <div className="rounded-xl border border-[#edf0f2] bg-white p-4 shadow-sm">
              <HighchartsStockChart
                symbol={company.symbol}
                timeframe={timeframe}
                indicators={["VOLUME"]}
              />
            </div>

            {/* Performance Stats (Today's Low/High, 52W Low/High) */}
            <div className="rounded-xl border border-[#edf0f2] bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#44475b]">Performance</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between text-[#7c7e8c] mb-1">
                    <span>Today&apos;s Low: ₹{company.dayLow}</span>
                    <span>Today&apos;s High: ₹{company.dayHigh}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#f0f2f5] relative">
                    <div
                      className="absolute top-0 h-1.5 rounded-full bg-[#00d09c]"
                      style={{
                        left: "25%",
                        width: "50%",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#7c7e8c] mb-1">
                    <span>52W Low: ₹{company.low52 ?? (company as any).week52Low ?? company.dayLow}</span>
                    <span>52W High: ₹{company.high52 ?? (company as any).week52High ?? company.dayHigh}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#f0f2f5] relative">
                    <div
                      className="absolute top-0 h-1.5 rounded-full bg-[#00d09c]"
                      style={{
                        left: "35%",
                        width: "45%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fundamentals Grid */}
            <div className="rounded-xl border border-[#edf0f2] bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#44475b]">Fundamentals</h3>
              <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
                <div className="border-b border-[#f4f5f7] pb-3">
                  <span className="text-[#7c7e8c]">Market Cap</span>
                  <div className="mt-1 font-bold text-[#44475b]">₹{company.marketCap}</div>
                </div>
                <div className="border-b border-[#f4f5f7] pb-3">
                  <span className="text-[#7c7e8c]">P/E Ratio</span>
                  <div className="mt-1 font-bold text-[#44475b]">{(company as any).peRatio || 24.5}</div>
                </div>
                <div className="border-b border-[#f4f5f7] pb-3">
                  <span className="text-[#7c7e8c]">Industry P/E</span>
                  <div className="mt-1 font-bold text-[#44475b]">24.8</div>
                </div>
                <div className="border-b border-[#f4f5f7] pb-3">
                  <span className="text-[#7c7e8c]">Debt to Equity</span>
                  <div className="mt-1 font-bold text-[#44475b]">0.24</div>
                </div>
                <div>
                  <span className="text-[#7c7e8c]">ROE</span>
                  <div className="mt-1 font-bold text-[#00d09c]">18.4%</div>
                </div>
                <div>
                  <span className="text-[#7c7e8c]">Div Yield</span>
                  <div className="mt-1 font-bold text-[#44475b]">1.35%</div>
                </div>
                <div>
                  <span className="text-[#7c7e8c]">Book Value</span>
                  <div className="mt-1 font-bold text-[#44475b]">₹512.40</div>
                </div>
                <div>
                  <span className="text-[#7c7e8c]">Volume</span>
                  <div className="mt-1 font-bold text-[#44475b]">{company.volume}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Order Desk (Delivery/Intraday, Buy/Sell, Pre-Trade Analysis) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 rounded-xl border border-[#edf0f2] bg-white p-6 shadow-sm space-y-5">
              {/* Delivery vs Intraday */}
              <div className="flex border border-[#e2e4e8] rounded-lg p-1 bg-[#f8f9fa] text-xs font-semibold">
                <button
                  onClick={() => setOrderType("DELIVERY")}
                  className={`flex-1 py-2 rounded-md transition ${
                    orderType === "DELIVERY"
                      ? "bg-white text-[#44475b] shadow-sm"
                      : "text-[#7c7e8c]"
                  }`}
                >
                  Delivery (CNC)
                </button>
                <button
                  onClick={() => setOrderType("INTRADAY")}
                  className={`flex-1 py-2 rounded-md transition ${
                    orderType === "INTRADAY"
                      ? "bg-white text-[#44475b] shadow-sm"
                      : "text-[#7c7e8c]"
                  }`}
                >
                  Intraday (MIS)
                </button>
              </div>

              {/* Buy vs Sell Buttons */}
              <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                <button
                  onClick={() => setOrderAction("BUY")}
                  className={`py-2.5 rounded-lg transition ${
                    orderAction === "BUY"
                      ? "bg-[#00d09c] text-white shadow-sm"
                      : "border border-[#e2e4e8] text-[#7c7e8c] hover:bg-[#f8f9fa]"
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setOrderAction("SELL")}
                  className={`py-2.5 rounded-lg transition ${
                    orderAction === "SELL"
                      ? "bg-[#eb5b3c] text-white shadow-sm"
                      : "border border-[#e2e4e8] text-[#7c7e8c] hover:bg-[#f8f9fa]"
                  }`}
                >
                  SELL
                </button>
              </div>

              {/* Quantity Input */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#7c7e8c]">
                  <span>Qty (Shares)</span>
                  <span>NSE</span>
                </div>
                <div className="flex items-center rounded-lg border border-[#e2e4e8] px-3 py-2 bg-white">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={sharesQty}
                    onChange={(e) => setSharesQty(Math.max(1, Number(e.target.value)))}
                    className="w-full text-sm font-bold text-[#44475b] focus:outline-none"
                  />
                  <span className="text-xs text-[#9b9da8]">Qty</span>
                </div>
              </div>

              {/* Price Type */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#7c7e8c]">
                  <span>Price</span>
                  <span className="text-[#00d09c]">Market</span>
                </div>
                <div className="rounded-lg border border-[#e2e4e8] px-3 py-2 bg-[#f8f9fa] text-sm font-bold text-[#44475b]">
                  ₹{company.price.toFixed(2)}
                </div>
              </div>

              {/* Balance & Required Summary */}
              <div className="border-t border-[#f4f5f7] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#7c7e8c]">
                  <span>Balance Available</span>
                  <span className="font-semibold text-[#44475b]">
                    ₹{activeBalance.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-[#7c7e8c]">
                  <span>Order Total</span>
                  <span className="font-bold text-[#44475b]">
                    ₹{orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Mandatory Pre-Trade Analysis Action Button */}
              <button
                onClick={handleOpenAnalysis}
                className="w-full rounded-xl bg-[#00d09c] py-3.5 text-sm font-bold text-white shadow-sm hover:brightness-105 transition"
              >
                {orderAction} {company.symbol} (Analyze Trade)
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-[#7c7e8c]">
                <ShieldCheck className="size-3.5 text-[#00d09c]" />
                <span>Runs pre-trade risk and emotional check before execution.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Groww Mobile Sticky Trade Bar (1-Tap Buy/Sell) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-[#ebedf0] bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#44475b]">{company.symbol}</span>
            <span className="text-[10px] text-[#7c7e8c] font-semibold">₹{company.price.toFixed(2)}</span>
          </div>
          <div className={`text-[10px] font-semibold ${isUp ? "text-[#00d09c]" : "text-[#eb5b3c]"}`}>
            {priceChange >= 0 ? "+" : ""}₹{priceChange.toFixed(2)} ({isUp ? "+" : ""}{company.changePercent}%)
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuickOrder("BUY")}
            className="rounded-lg bg-[#00d09c] px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition"
          >
            BUY
          </button>
          <button
            onClick={() => handleQuickOrder("SELL")}
            className="rounded-lg bg-[#eb5b3c] px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition"
          >
            SELL
          </button>
        </div>
      </div>

      {/* Pre-Trade Analysis Modal */}
      {orderDraft && (
        <PreTradeAnalysisModal
          draft={orderDraft}
          availableCash={activeBalance}
          monthlySip={monthlySip}
          financialMode={financialMode}
          onCancel={() => setOrderDraft(null)}
          onClose={() => setOrderDraft(null)}
          onConfirm={(finalOrder) => {
            executePaperOrder(finalOrder || orderDraft);
            setOrderDraft(null);
          }}
        />
      )}
    </div>
  );
}
