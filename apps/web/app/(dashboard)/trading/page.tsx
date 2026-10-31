"use client";

import React, { useMemo, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { HighchartsStockChart } from "@/components/HighchartsStockChart";
import {
  PreTradeAnalysisModal,
  PendingOrderDraft,
} from "@/components/PreTradeAnalysisModal";
import { getNseEquitiesUniverse, findNseCompany } from "@/lib/nseUniverse";
import { useInvestraStore } from "@/store/useInvestraStore";

const QUICK_TICKERS = [
  "RELIANCE",
  "TCS",
  "INFY",
  "HDFCBANK",
  "ICICIBANK",
  "SBIN",
  "BHARTIARTL",
  "JIOFIN",
  "TATAMOTORS",
];

export default function TradingTerminalPage() {
  const {
    selectedSymbol,
    setSelectedSymbol,
    financialMode,
    brokerWallet,
    beginnerWallet,
    monthlySip,
    executePaperOrder,
  } = useInvestraStore();

  const allEquities = useMemo(() => getNseEquitiesUniverse(), []);
  const [railSearch, setRailSearch] = useState("");
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [productType, setProductType] = useState<
    "CNC (Delivery)" | "MIS (Intraday)"
  >("CNC (Delivery)");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [qty, setQty] = useState(10);
  const [stopLoss, setStopLoss] = useState<string>("");
  const [orderDraft, setOrderDraft] = useState<PendingOrderDraft | null>(null);

  const activeCompany = findNseCompany(selectedSymbol || "RELIANCE");
  const activeCash =
    financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;

  const filteredRail = useMemo(() => {
    if (!railSearch.trim()) return allEquities.slice(0, 45);
    const q = railSearch.toLowerCase();
    return allEquities
      .filter(
        (c) =>
          c.symbol.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q)
      )
      .slice(0, 45);
  }, [allEquities, railSearch]);

  const estValue = Number((qty * activeCompany.price).toFixed(2));
  const estCharges = Number((20 + estValue * 0.0011).toFixed(2));

  const l2Bids = [
    { price: (activeCompany.price - 0.15).toFixed(2), orders: 11, qty: 8376 },
    { price: (activeCompany.price - 0.4).toFixed(2), orders: 15, qty: 3237 },
    { price: (activeCompany.price - 0.65).toFixed(2), orders: 5, qty: 6221 },
    { price: (activeCompany.price - 0.9).toFixed(2), orders: 15, qty: 727 },
    { price: (activeCompany.price - 1.15).toFixed(2), orders: 4, qty: 1568 },
  ];

  const l2Asks = [
    { price: (activeCompany.price + 0.35).toFixed(2), orders: 7, qty: 8472 },
    { price: (activeCompany.price + 0.6).toFixed(2), orders: 14, qty: 9792 },
    { price: (activeCompany.price + 0.85).toFixed(2), orders: 9, qty: 3269 },
    { price: (activeCompany.price + 1.1).toFixed(2), orders: 4, qty: 1693 },
    { price: (activeCompany.price + 1.35).toFixed(2), orders: 15, qty: 1420 },
  ];

  const handleReviewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderDraft({
      symbol: activeCompany.symbol,
      companyName: activeCompany.name,
      sector: activeCompany.sector,
      side,
      qty: Math.max(1, qty),
      price: activeCompany.price,
      productType,
      orderType,
      stopLoss: stopLoss ? Number(stopLoss) : undefined,
    });
  };

  return (
    <DashboardShell>
      {/* Mandatory Pre-Trade Risk & Impact Modal */}
      <PreTradeAnalysisModal
        draft={orderDraft}
        availableCash={activeCash}
        monthlySip={monthlySip}
        financialMode={financialMode}
        onCancel={() => setOrderDraft(null)}
        onConfirm={() => {
          if (!orderDraft) return;
          executePaperOrder({
            symbol: orderDraft.symbol,
            side: orderDraft.side,
            qty: orderDraft.qty ?? orderDraft.quantity ?? 1,
            priceOverride: orderDraft.price,
            stopLoss: orderDraft.stopLoss,
            orderType: (orderDraft.orderType as "MARKET" | "LIMIT") || "MARKET",
            productType: orderDraft.productType,
          });
          setOrderDraft(null);
        }}
      />

      <div className="space-y-4 font-mono">
        {/* Top Quick Ticker Bar (Matches Screenshot 5) */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#C98A4A]/25 pb-3">
          {QUICK_TICKERS.map((sym) => {
            const c = findNseCompany(sym);
            const active = c.symbol === activeCompany.symbol;
            return (
              <button
                key={sym}
                onClick={() => setSelectedSymbol(sym)}
                className={`shrink-0 border px-3.5 py-2 text-xs font-bold transition ${
                  active
                    ? "border-[#C98A4A] bg-[#C98A4A]/20 text-[#FAF7F5]"
                    : "border-white/10 bg-[#0D0F0E] text-[#B9B4B1] hover:border-[#C98A4A]/50"
                }`}
              >
                <span>{c.symbol}</span>{" "}
                <span className="text-[#FAF7F5]">₹{c.price}</span>{" "}
                <span
                  className={
                    c.changePercent >= 0 ? "text-[#3EDC81]" : "text-[#FF5C5C]"
                  }
                >
                  {c.changePercent >= 0 ? "+" : ""}
                  {c.changePercent}%
                </span>
              </button>
            );
          })}
        </div>

        {/* 3-Column Brokerage Terminal Grid */}
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Left Column: NSE Equities Universe (2,640 Listed) */}
          <div className="lg:col-span-3 border border-[#C98A4A]/25 bg-[#090B0A] flex flex-col h-[660px]">
            <div className="border-b border-white/10 p-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold uppercase text-[#C98A4A]">
                  NSE EQUITIES UNIVERSE
                </span>
                <span className="text-[#7A7471]">
                  {allEquities.length.toLocaleString("en-IN")} LISTED
                </span>
              </div>
              <input
                type="text"
                value={railSearch}
                onChange={(e) => setRailSearch(e.target.value)}
                placeholder="Search 2,640+ companies (e.g. TATA)..."
                className="mt-2 w-full border border-white/15 bg-[#050505] px-2.5 py-2 text-xs text-[#FAF7F5] placeholder-[#7A7471] focus:border-[#C98A4A] focus:outline-none"
              />
            </div>

            <div className="flex-1 divide-y divide-white/[0.06] overflow-y-auto">
              {filteredRail.map((item) => {
                const selected = item.symbol === activeCompany.symbol;
                return (
                  <button
                    key={item.symbol}
                    onClick={() => setSelectedSymbol(item.symbol)}
                    className={`flex w-full items-center justify-between px-3.5 py-3 text-left text-xs transition ${
                      selected
                        ? "border-l-2 border-l-[#C98A4A] bg-[#181512]"
                        : "hover:bg-[#111111]"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-[#FAF7F5]">
                        {item.symbol}
                      </div>
                      <div className="truncate text-[10px] text-[#7A7471]">
                        {item.name}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#FAF7F5]">
                        ₹{item.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[10px] ${
                          item.changePercent >= 0
                            ? "text-[#3EDC81]"
                            : "text-[#FF5C5C]"
                        }`}
                      >
                        {item.changePercent >= 0 ? "+" : ""}
                        {item.changePercent}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Highcharts Stock Candlestick + Volume Stream */}
          <div className="lg:col-span-6 border border-[#C98A4A]/25 bg-[#090B0A] p-4 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl font-extrabold text-[#C98A4A]">
                    {activeCompany.symbol}
                  </h1>
                  <span className="text-base font-bold text-[#FAF7F5]">
                    ₹{activeCompany.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      activeCompany.changePercent >= 0
                        ? "text-[#3EDC81]"
                        : "text-[#FF5C5C]"
                    }`}
                  >
                    {activeCompany.changePercent >= 0 ? "+" : ""}
                    {activeCompany.changePercent}%
                  </span>
                  <span className="border border-[#C98A4A]/40 bg-[#181614] px-2 py-0.5 text-[10px] text-[#F2D7B6]">
                    NSE • HIGHCHARTS CANDLESTICK STREAM
                  </span>
                </div>

                <div className="text-[11px] text-[#7A7471]">
                  HIGH:{" "}
                  <span className="text-[#3EDC81]">
                    ₹{activeCompany.dayHigh}
                  </span>{" "}
                  • LOW:{" "}
                  <span className="text-[#FF5C5C]">
                    ₹{activeCompany.dayLow}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <HighchartsStockChart
                  symbol={activeCompany.symbol}
                  basePrice={activeCompany.price}
                  height={530}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Market Depth (L2) + Order Ticket with REVIEW ORDER */}
          <div className="lg:col-span-3 border border-[#C98A4A]/25 bg-[#090B0A] p-4 flex flex-col justify-between space-y-4">
            {/* Market Depth (L2) */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px]">
                <span className="font-bold uppercase text-[#C98A4A]">
                  MARKET DEPTH (L2)
                </span>
                <span className="border border-[#C98A4A]/30 bg-[#181614] px-1.5 py-0.5 text-[9px] text-[#F2D7B6]">
                  PRICE-TIME PRIORITY
                </span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <div className="flex justify-between text-[#7A7471] pb-1">
                    <span>BID</span>
                    <span>ORDERS</span>
                    <span>QTY</span>
                  </div>
                  {l2Bids.map((b, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-0.5 text-[#3EDC81]"
                    >
                      <span>₹{b.price}</span>
                      <span className="text-[#7A7471]">{b.orders}</span>
                      <span>{b.qty}</span>
                    </div>
                  ))}
                  <div className="mt-1 flex justify-between border-t border-white/10 pt-1 font-bold text-[#3EDC81]">
                    <span>TOTAL</span>
                    <span>20,129</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#7A7471] pb-1">
                    <span>ASK</span>
                    <span>ORDERS</span>
                    <span>QTY</span>
                  </div>
                  {l2Asks.map((a, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-0.5 text-[#FF5C5C]"
                    >
                      <span>₹{a.price}</span>
                      <span className="text-[#7A7471]">{a.orders}</span>
                      <span>{a.qty}</span>
                    </div>
                  ))}
                  <div className="mt-1 flex justify-between border-t border-white/10 pt-1 font-bold text-[#FF5C5C]">
                    <span>TOTAL</span>
                    <span>24,646</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-[#7A7471]">
                <span>SPREAD: ₹0.50</span>
                <span className="text-[#3EDC81]">● LIVE MATCHING ACTIVE</span>
              </div>
            </div>

            {/* Order Ticket Form */}
            <form
              onSubmit={handleReviewOrder}
              className="space-y-3 border-t border-white/10 pt-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSide("BUY")}
                  className={`py-2.5 font-extrabold transition ${
                    side === "BUY"
                      ? "bg-[#3EDC81] text-[#090909]"
                      : "border border-white/15 bg-[#121212] text-[#B9B4B1]"
                  }`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setSide("SELL")}
                  className={`py-2.5 font-extrabold transition ${
                    side === "SELL"
                      ? "bg-[#FF5C5C] text-[#090909]"
                      : "border border-white/15 bg-[#121212] text-[#B9B4B1]"
                  }`}
                >
                  SELL
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#7A7471] block">
                    PRODUCT
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as any)}
                    className="mt-1 w-full border border-white/15 bg-[#050505] px-2 py-2 text-xs text-[#FAF7F5] focus:border-[#C98A4A] focus:outline-none"
                  >
                    <option value="CNC (Delivery)">CNC (Delivery)</option>
                    <option value="MIS (Intraday)">MIS (Intraday)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#7A7471] block">
                    ORDER TYPE
                  </label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as any)}
                    className="mt-1 w-full border border-white/15 bg-[#050505] px-2 py-2 text-xs text-[#FAF7F5] focus:border-[#C98A4A] focus:outline-none"
                  >
                    <option value="MARKET">MARKET</option>
                    <option value="LIMIT">LIMIT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#7A7471] block">
                    QUANTITY (SHARES)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={qty}
                    onChange={(e) =>
                      setQty(Math.max(1, Number(e.target.value)))
                    }
                    className="mt-1 w-full border border-white/15 bg-[#050505] px-2.5 py-2 text-xs font-bold text-[#FAF7F5] focus:border-[#C98A4A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#7A7471] block">
                    STOP-LOSS (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="mt-1 w-full border border-white/15 bg-[#050505] px-2.5 py-2 text-xs text-[#FAF7F5] focus:border-[#C98A4A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="border border-white/10 bg-[#0D100F] p-3 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#7A7471]">ESTIMATED VALUE:</span>
                  <span className="font-bold text-[#FAF7F5]">
                    ₹{estValue.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7471]">AVAILABLE FUNDS:</span>
                  <span className="font-bold text-[#3EDC81]">
                    ₹{activeCash.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7471]">EST. CHARGES:</span>
                  <span className="text-[#B9B4B1]">₹{estCharges}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-xs font-extrabold uppercase tracking-wider text-[#090909] transition ${
                  side === "BUY"
                    ? "bg-[#3EDC81] hover:brightness-110"
                    : "bg-[#FF5C5C] hover:brightness-110"
                }`}
              >
                REVIEW ORDER
              </button>
              <p className="text-center text-[10px] text-[#7A7471]">
                Virtual Execution • Mandatory Pre-Trade Risk Analysis
              </p>
            </form>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
