"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Info,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { HighchartsStockChart } from "@/components/HighchartsStockChart";
import {
  PreTradeAnalysisModal,
  PendingOrderDraft,
} from "@/components/PreTradeAnalysisModal";
import { NseStockItem } from "@/lib/nseUniverse";
import { useInvestraStore } from "@/store/useInvestraStore";

export function KiteCompanyDetailView({ company }: { company: NseStockItem }) {
  const {
    financialMode,
    brokerWallet,
    beginnerWallet,
    monthlySip,
    executePaperOrder,
  } = useInvestraStore();

  const activeBalance =
    financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;

  const [orderAction, setOrderAction] = useState<"BUY" | "SELL">("BUY");
  const [productType, setProductType] = useState<"CNC" | "MIS">("CNC");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [sharesQty, setSharesQty] = useState(1);
  const [limitPrice, setLimitPrice] = useState(company.price);
  const [orderDraft, setOrderDraft] = useState<PendingOrderDraft | null>(null);
  const [timeframe, setTimeframe] = useState<"1D" | "5D" | "1M" | "1Y" | "ALL">("1M");

  const priceDiff = company.price - company.prevClose;
  const isUp = priceDiff >= 0;
  const totalCost = Number(((orderType === "MARKET" ? company.price : limitPrice) * sharesQty).toFixed(2));

  const handleOpenAnalysis = () => {
    setOrderDraft({
      symbol: company.symbol,
      name: company.name,
      side: orderAction,
      orderType,
      product: productType,
      quantity: sharesQty,
      price: orderType === "MARKET" ? company.price : limitPrice,
      stopLoss: Math.round(company.price * (orderAction === "BUY" ? 0.97 : 1.03)),
      target: Math.round(company.price * (orderAction === "BUY" ? 1.06 : 0.94)),
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
      price: orderType === "MARKET" ? company.price : limitPrice,
      stopLoss: Math.round(company.price * (side === "BUY" ? 0.97 : 1.03)),
      target: Math.round(company.price * (side === "BUY" ? 1.06 : 0.94)),
      estimatedCost: totalCost,
    });
  };

  return (
    <DashboardShell>
      {/* Pre-trade analysis modal */}
      <PreTradeAnalysisModal
        draft={orderDraft}
        availableCash={activeBalance}
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

      <div className="space-y-6 text-[#444444] font-sans">
        {/* Top Instrument Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eeeeee] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#9b9b9b]">
              <Link href="/market" className="hover:text-[#4184f3]">
                Markets
              </Link>
              <ChevronRight className="size-3" />
              <span>NSE</span>
              <ChevronRight className="size-3" />
              <span className="font-semibold text-[#444444]">{company.symbol}</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-normal text-[#222222]">
                {company.symbol}
              </h1>
              <span className="text-sm text-[#9b9b9b]">{company.name}</span>
              <span className="bg-[#f0f0f0] px-2 py-0.5 text-[11px] font-medium text-[#666666]">
                NSE EQ
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-light text-[#222222]">
              ₹{(company.price ?? 0).toFixed(2)}
            </div>
            <div
              className={`text-xs font-medium ${
                isUp ? "text-[#4caf50]" : "text-[#f44336]"
              }`}
            >
              {isUp ? "+" : ""}
              {(priceDiff ?? 0).toFixed(2)} ({isUp ? "+" : ""}
              {(company.changePercent ?? 0).toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Main 2-Column Content: Left Chart & Market Depth | Right Zerodha Order Window */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column (8 cols): Interactive Chart, Depth, Fundamentals, AI */}
          <div className="space-y-6 lg:col-span-8">
            {/* Chart Container */}
            <div className="border border-[#e0e0e0] bg-white p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f1f1] pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#444444]">Chart</span>
                  <span className="text-[#9b9b9b]">• Highcharts Interactive Candlestick</span>
                </div>
                <div className="flex items-center gap-1">
                  {(["1D", "5D", "1M", "1Y", "ALL"] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2.5 py-1 text-xs font-medium transition ${
                        timeframe === tf
                          ? "bg-[#e8f0fe] text-[#4184f3]"
                          : "text-[#666666] hover:bg-[#f5f5f5]"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Light themed Highcharts Candlestick */}
              <HighchartsStockChart
                symbol={company.symbol}
                basePrice={company.price}
                height={380}
                lightTheme={true}
              />
            </div>

            {/* Zerodha 5-Level Market Depth Table */}
            <div className="border border-[#e0e0e0] bg-white p-4">
              <div className="mb-3 flex items-center justify-between border-b border-[#f1f1f1] pb-2 text-xs">
                <span className="font-semibold text-[#444444]">Market Depth (5-Level L2)</span>
                <span className="text-[#9b9b9b]">Live NSE Order Book</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                {/* Bids */}
                <div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#f1f1f1] text-[11px] text-[#9b9b9b]">
                        <th className="py-1">Bid Price</th>
                        <th className="py-1 text-center">Orders</th>
                        <th className="py-1 text-right">Qty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#fafafa]">
                      {[
                        { price: (company.price - 0.25).toFixed(2), orders: 18, qty: 1420 },
                        { price: (company.price - 0.50).toFixed(2), orders: 24, qty: 2850 },
                        { price: (company.price - 0.75).toFixed(2), orders: 12, qty: 1100 },
                        { price: (company.price - 1.00).toFixed(2), orders: 35, qty: 4500 },
                        { price: (company.price - 1.25).toFixed(2), orders: 9, qty: 890 },
                      ].map((b, idx) => (
                        <tr key={idx} className="text-[#4184f3]">
                          <td className="py-1.5 font-medium">{b.price}</td>
                          <td className="py-1.5 text-center text-[#666666]">{b.orders}</td>
                          <td className="py-1.5 text-right font-medium">{b.qty.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-[#eeeeee] font-semibold text-[#444444]">
                        <td className="pt-2">Total</td>
                        <td className="pt-2 text-center">98</td>
                        <td className="pt-2 text-right">10,760</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Asks */}
                <div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#f1f1f1] text-[11px] text-[#9b9b9b]">
                        <th className="py-1">Ask Price</th>
                        <th className="py-1 text-center">Orders</th>
                        <th className="py-1 text-right">Qty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#fafafa]">
                      {[
                        { price: (company.price + 0.25).toFixed(2), orders: 14, qty: 1250 },
                        { price: (company.price + 0.50).toFixed(2), orders: 29, qty: 3100 },
                        { price: (company.price + 0.75).toFixed(2), orders: 8, qty: 780 },
                        { price: (company.price + 1.00).toFixed(2), orders: 41, qty: 5200 },
                        { price: (company.price + 1.25).toFixed(2), orders: 11, qty: 940 },
                      ].map((a, idx) => (
                        <tr key={idx} className="text-[#f44336]">
                          <td className="py-1.5 font-medium">{a.price}</td>
                          <td className="py-1.5 text-center text-[#666666]">{a.orders}</td>
                          <td className="py-1.5 text-right font-medium">{a.qty.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-[#eeeeee] font-semibold text-[#444444]">
                        <td className="pt-2">Total</td>
                        <td className="pt-2 text-center">103</td>
                        <td className="pt-2 text-right">11,270</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Fundamentals Overview */}
            <div className="border border-[#e0e0e0] bg-white p-4">
              <h3 className="mb-3 border-b border-[#f1f1f1] pb-2 text-xs font-semibold text-[#444444]">
                Fundamentals & Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
                <div>
                  <span className="text-[#9b9b9b]">Sector</span>
                  <p className="mt-1 font-medium text-[#222222]">{company.sector}</p>
                </div>
                <div>
                  <span className="text-[#9b9b9b]">Market Cap</span>
                  <p className="mt-1 font-medium text-[#222222]">{company.marketCap}</p>
                </div>
                <div>
                  <span className="text-[#9b9b9b]">Day's Low / High</span>
                  <p className="mt-1 font-medium text-[#222222]">
                    ₹{company.dayLow} - ₹{company.dayHigh}
                  </p>
                </div>
                <div>
                  <span className="text-[#9b9b9b]">52W Low / High</span>
                  <p className="mt-1 font-medium text-[#222222]">
                    ₹{(((company.dayLow || company.price) ?? 100) * 0.82).toFixed(1)} - ₹{(((company.dayHigh || company.price) ?? 100) * 1.18).toFixed(1)}
                  </p>
                </div>
                <div>
                  <span className="text-[#9b9b9b]">Volume</span>
                  <p className="mt-1 font-medium text-[#222222]">{company.volume ?? "4.5 L"}</p>
                </div>
                <div>
                  <span className="text-[#9b9b9b]">P/E Ratio</span>
                  <p className="mt-1 font-medium text-[#222222]">
                    {((((company as any).pe ?? ((company.price % 35) + 14.5)) ?? 21.4)).toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-[#9b9b9b]">Lower Circuit</span>
                  <p className="mt-1 font-medium text-[#f44336]">
                    ₹{(((company.prevClose || company.price) ?? 100) * 0.9).toFixed(1)}
                  </p>
                </div>
                <div>
                  <span className="text-[#9b9b9b]">Upper Circuit</span>
                  <p className="mt-1 font-medium text-[#4caf50]">
                    ₹{(((company.prevClose || company.price) ?? 100) * 1.1).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Pedagogical AI Mentor Breakdown */}
            <div className="border border-[#4184f3]/30 bg-[#f4f8ff] p-4 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#1976d2] mb-1.5">
                <Sparkles className="size-4" />
                <span>Investra AI Analysis for {company.symbol}</span>
              </div>
              <p className="leading-relaxed text-[#444444]">
                {company.symbol} is currently trading at ₹{(company.price ?? 100).toFixed(2)}. In your virtual portfolio with ₹{activeBalance.toLocaleString("en-IN")} available cash, a standard 10-share position would deploy ₹{((company.price ?? 100) * 10).toLocaleString("en-IN")}, representing {(((company.price ?? 100) * 10 / Math.max(activeBalance, 1)) * 100).toFixed(1)}% of your capital. Always enforce stop-loss discipline around ₹{((company.price ?? 100) * 0.97).toFixed(1)} to protect against unexpected gap-downs.
              </p>
            </div>
          </div>

          {/* Right Column (4 cols): Authentic Zerodha Kite Order Placement Window */}
          <div className="space-y-4 lg:col-span-4">
            <div className="sticky top-20 border border-[#e0e0e0] bg-white p-5 shadow-sm space-y-5">
              {/* Buy / Sell Tab Header */}
              <div className="flex border-b border-[#eeeeee]">
                <button
                  onClick={() => setOrderAction("BUY")}
                  className={`flex-1 py-2.5 text-xs font-semibold transition ${
                    orderAction === "BUY"
                      ? "border-b-2 border-[#4184f3] text-[#4184f3]"
                      : "text-[#9b9b9b] hover:text-[#444444]"
                  }`}
                >
                  BUY {company.symbol}
                </button>
                <button
                  onClick={() => setOrderAction("SELL")}
                  className={`flex-1 py-2.5 text-xs font-semibold transition ${
                    orderAction === "SELL"
                      ? "border-b-2 border-[#ff5722] text-[#ff5722]"
                      : "text-[#9b9b9b] hover:text-[#444444]"
                  }`}
                >
                  SELL {company.symbol}
                </button>
              </div>

              {/* Product: CNC vs MIS */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[#9b9b9b]">Product</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setProductType("CNC")}
                    className={`border py-2 text-xs font-medium transition ${
                      productType === "CNC"
                        ? "border-[#4184f3] bg-[#e8f0fe] text-[#4184f3]"
                        : "border-[#e0e0e0] text-[#666666] hover:bg-[#fafafa]"
                    }`}
                  >
                    CNC (Longterm)
                  </button>
                  <button
                    onClick={() => setProductType("MIS")}
                    className={`border py-2 text-xs font-medium transition ${
                      productType === "MIS"
                        ? "border-[#4184f3] bg-[#e8f0fe] text-[#4184f3]"
                        : "border-[#e0e0e0] text-[#666666] hover:bg-[#fafafa]"
                    }`}
                  >
                    MIS (Intraday)
                  </button>
                </div>
              </div>

              {/* Order Type: Market vs Limit */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[#9b9b9b]">Order Type</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderType("MARKET")}
                    className={`border py-2 text-xs font-medium transition ${
                      orderType === "MARKET"
                        ? "border-[#4184f3] bg-[#e8f0fe] text-[#4184f3]"
                        : "border-[#e0e0e0] text-[#666666] hover:bg-[#fafafa]"
                    }`}
                  >
                    Market
                  </button>
                  <button
                    onClick={() => setOrderType("LIMIT")}
                    className={`border py-2 text-xs font-medium transition ${
                      orderType === "LIMIT"
                        ? "border-[#4184f3] bg-[#e8f0fe] text-[#4184f3]"
                        : "border-[#e0e0e0] text-[#666666] hover:bg-[#fafafa]"
                    }`}
                  >
                    Limit
                  </button>
                </div>
              </div>

              {/* Qty & Price Inputs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[#9b9b9b]">Qty</label>
                  <input
                    type="number"
                    min={1}
                    value={sharesQty}
                    onChange={(e) => setSharesQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full border border-[#cccccc] px-3 py-2 text-sm text-[#222222] focus:border-[#4184f3] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#9b9b9b]">Price (₹)</label>
                  <input
                    type="number"
                    step="0.05"
                    disabled={orderType === "MARKET"}
                    value={orderType === "MARKET" ? company.price : limitPrice}
                    onChange={(e) => setLimitPrice(parseFloat(e.target.value) || company.price)}
                    className="w-full border border-[#cccccc] px-3 py-2 text-sm text-[#222222] disabled:bg-[#f5f5f5] disabled:text-[#999999] focus:border-[#4184f3] focus:outline-none"
                  />
                </div>
              </div>

              {/* Margin Required Strip */}
              <div className="space-y-1.5 border-t border-[#f1f1f1] pt-3 text-xs">
                <div className="flex justify-between text-[#666666]">
                  <span>Margin required</span>
                  <span className="font-semibold text-[#222222]">
                    ₹{totalCost.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-[#9b9b9b]">
                  <span>Margin available</span>
                  <span className="font-medium text-[#4184f3]">
                    ₹{activeBalance.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Buy / Sell Button triggering Risk Analysis */}
              <button
                onClick={handleOpenAnalysis}
                className={`w-full py-3 text-sm font-semibold text-white shadow transition hover:brightness-110 ${
                  orderAction === "BUY" ? "bg-[#4184f3]" : "bg-[#ff5722]"
                }`}
              >
                {orderAction === "BUY" ? "Buy" : "Sell"} {sharesQty} {company.symbol}
              </button>

              <p className="text-center text-[11px] text-[#9b9b9b]">
                Investra Risk Shield: Every order requires interactive analysis confirmation before filling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kite Mobile Sticky Trade Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-[#e0e0e0] bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#222222]">{company.symbol}</span>
            <span className="text-[10px] text-[#666666] font-semibold">₹{company.price.toFixed(2)}</span>
          </div>
          <div className={`text-[10px] font-semibold ${isUp ? "text-[#4caf50]" : "text-[#df514c]"}`}>
            {priceDiff >= 0 ? "+" : ""}₹{priceDiff.toFixed(2)} ({isUp ? "+" : ""}{company.changePercent}%)
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuickOrder("BUY")}
            className="rounded bg-[#4184f3] px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition"
          >
            BUY
          </button>
          <button
            onClick={() => handleQuickOrder("SELL")}
            className="rounded bg-[#ff5722] px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition"
          >
            SELL
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
