"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { GrowwCompanyDetailView } from "@/components/GrowwCompanyDetailView";
import { KiteCompanyDetailView } from "@/components/KiteCompanyDetailView";
import { UpstoxCompanyDetailView } from "@/components/UpstoxCompanyDetailView";
import { HighchartsStockChart } from "@/components/HighchartsStockChart";
import {
  PreTradeAnalysisModal,
  PendingOrderDraft,
} from "@/components/PreTradeAnalysisModal";
import { findNseCompany } from "@/lib/nseUniverse";
import { useInvestraStore } from "@/store/useInvestraStore";

const RELATED_SECURITIES = [
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3912.8, change: "+0.85%", up: true },
  { symbol: "INFY", name: "Infosys Limited", price: 1845.2, change: "-0.42%", up: false },
  { symbol: "HDFCBANK", name: "HDFC Bank Limited", price: 1682.4, change: "+0.65%", up: true },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1598.6, change: "+0.95%", up: true },
];

export default function CompanyDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = use(params);
  const company = findNseCompany(symbol);

  const {
    brokerPreset,
    financialMode,
    brokerWallet,
    beginnerWallet,
    monthlySip,
    executePaperOrder,
  } = useInvestraStore();

  const [timeframe, setTimeframe] = useState("1M");
  const [indicators, setIndicators] = useState<string[]>(["VOLUME"]);
  const [orderDraft, setOrderDraft] = useState<PendingOrderDraft | null>(null);
  const [aiInsight, setAiInsight] = useState(
    `Investra Intelligence: ${company.symbol} is an actively traded component of Indian domestic equity benchmarks (${company.sector}). Its trading volume (${company.volume}) typically reflects macroeconomic sentiment and institutional flows. Use technical stops near ₹${company.dayLow} and position-size constraints to manage downside volatility.`
  );
  const [refreshingAi, setRefreshingAi] = useState(false);

  // If in Groww preset, render authentic Groww stock view with interactive chart & order desk
  if (brokerPreset === "groww") {
    return <GrowwCompanyDetailView company={company} />;
  }

  // If in Zerodha Kite preset, render authentic Kite light stock terminal with 5-depth order book
  if (brokerPreset === "kite") {
    return <KiteCompanyDetailView company={company} />;
  }

  // If in Upstox Pro preset, render authentic Upstox Pro stock view with full depth & order desk
  if (brokerPreset === "upstox") {
    return <UpstoxCompanyDetailView company={company} />;
  }

  const activeBalance =
    financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;
  const priceChangeAbs = Number((company.price - company.prevClose).toFixed(2));
  const tenShareCost = Number((company.price * 10).toFixed(2));
  const tenSharePct = ((tenShareCost / Math.max(activeBalance, 1)) * 100).toFixed(1);

  const toggleIndicator = (ind: string) => {
    setIndicators((prev) =>
      prev.includes(ind) ? prev.filter((x) => x !== ind) : [...prev, ind]
    );
  };

  const refreshPedagogicalInsight = async () => {
    setRefreshingAi(true);
    try {
      const res = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Provide a 3-sentence pedagogical risk & technical analysis for ${company.symbol} (${company.name}) trading at ₹${company.price} in the ${company.sector} sector.`,
          activeSymbol: company.symbol,
          financialMode,
          monthlySip,
          brokerWallet: activeBalance,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setAiInsight(data.reply);
      }
    } catch {
      // Keep default insight
    } finally {
      setRefreshingAi(false);
    }
  };

  return (
    <DashboardShell>
      {/* Mandatory Pre-Trade Risk & Impact Modal */}
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
            qty: orderDraft.qty || orderDraft.quantity || 1,
            priceOverride: orderDraft.price,
            stopLoss: orderDraft.stopLoss,
          });
          setOrderDraft(null);
        }}
      />

      <div className="space-y-6 font-mono">
        {/* Top Company Header Box (Matches Screenshot 3) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[#C98A4A]/30 bg-[#0B0E0D] p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-3xl font-extrabold text-[#C98A4A]">
                {company.symbol}
              </h1>
              <span className="border border-[#C98A4A]/40 bg-[#181614] px-2 py-0.5 text-[10px] font-bold text-[#F2D7B6]">
                NSE • {company.series}
              </span>
              <span className="border border-white/15 bg-[#121615] px-2 py-0.5 text-[10px] text-[#D8A56D]">
                {company.sector}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-[#B9B4B1]">{company.name}</p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="text-right">
              <div className="text-3xl font-extrabold text-[#FAF7F5]">
                ₹{company.price.toFixed(2)}
              </div>
              <div
                className={`text-xs font-bold ${
                  company.changePercent >= 0
                    ? "text-[#3EDC81]"
                    : "text-[#FF5C5C]"
                }`}
              >
                {priceChangeAbs >= 0 ? "+" : ""}₹{priceChangeAbs} (
                {company.changePercent >= 0 ? "+" : ""}
                {company.changePercent}%)
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/replay"
                className="flex items-center gap-1.5 border border-[#C98A4A]/50 bg-[#141210] px-4 py-3 text-xs font-bold text-[#F2D7B6] hover:border-[#C98A4A]"
              >
                <Play className="size-3.5 fill-current text-[#C98A4A]" />
                REPLAY THIS STOCK
              </Link>
              <button
                onClick={() =>
                  setOrderDraft({
                    symbol: company.symbol,
                    companyName: company.name,
                    sector: company.sector,
                    side: "BUY",
                    qty: 10,
                    price: company.price,
                    productType: "CNC (Delivery)",
                    orderType: "MARKET",
                    stopLoss: Number((company.price * 0.97).toFixed(2)),
                  })
                }
                className="bg-[#3EDC81] px-5 py-3 text-xs font-extrabold text-[#090909] hover:brightness-110"
              >
                BUY
              </button>
              <button
                onClick={() =>
                  setOrderDraft({
                    symbol: company.symbol,
                    companyName: company.name,
                    sector: company.sector,
                    side: "SELL",
                    qty: 10,
                    price: company.price,
                    productType: "CNC (Delivery)",
                    orderType: "MARKET",
                  })
                }
                className="bg-[#FF5C5C] px-5 py-3 text-xs font-extrabold text-[#090909] hover:brightness-110"
              >
                SELL
              </button>
            </div>
          </div>
        </div>

        {/* Middle Row: 8 Cols Highcharts Stock Chart + 4 Cols Market Statistics */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left 8 Cols: Interactive Highcharts Candlestick + Volume */}
          <div className="lg:col-span-8 border border-[#C98A4A]/25 bg-[#0A0C0B] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-1">
                {["1D", "1W", "1M", "3M", "6M", "1Y", "5Y"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`border px-2.5 py-1 text-xs font-bold ${
                      timeframe === tf
                        ? "border-[#C98A4A] bg-[#C98A4A] text-[#090909]"
                        : "border-white/10 bg-[#121212] text-[#7A7471] hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[10px] text-[#7A7471] mr-1">
                  INDICATORS:
                </span>
                {["VOLUME", "MACD", "RSI"].map((ind) => (
                  <button
                    key={ind}
                    onClick={() => toggleIndicator(ind)}
                    className={`border px-2.5 py-1 text-[10px] font-bold ${
                      indicators.includes(ind)
                        ? "border-[#C98A4A] bg-[#211C19] text-[#F2D7B6]"
                        : "border-white/10 bg-[#121212] text-[#7A7471]"
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <div>
                <span className="font-bold text-[#C98A4A]">{company.symbol}</span>
                <span className="ml-2 text-[10px] text-[#7A7471]">
                  NSE • REAL-TIME HIGHCHARTS FEED ({timeframe})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#FAF7F5]">
                  ₹{company.price.toFixed(2)}
                </span>
                <span className="border border-[#3EDC81]/30 bg-[#3EDC81]/10 px-2 py-0.5 text-[10px] text-[#3EDC81]">
                  {company.changePercent >= 0 ? "+" : ""}
                  {company.changePercent}%
                </span>
              </div>
            </div>

            <HighchartsStockChart
              symbol={company.symbol}
              basePrice={company.price}
              height={420}
            />
          </div>

          {/* Right 4 Cols: Market Statistics + Virtual Allocation Estimate */}
          <div className="lg:col-span-4 border border-[#C98A4A]/25 bg-[#0A0C0B] p-6 flex flex-col justify-between">
            <div>
              <h2 className="border-b border-white/10 pb-3 text-xs font-extrabold uppercase tracking-wider text-[#C98A4A]">
                MARKET STATISTICS
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-y-6 gap-x-4 text-xs">
                <div>
                  <span className="text-[10px] text-[#7A7471] block">OPEN</span>
                  <span className="mt-1 block text-sm font-bold text-[#FAF7F5]">
                    ₹{company.open.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7471] block">
                    PREV. CLOSE
                  </span>
                  <span className="mt-1 block text-sm font-bold text-[#FAF7F5]">
                    ₹{company.prevClose.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7471] block">
                    DAY HIGH
                  </span>
                  <span className="mt-1 block text-sm font-bold text-[#3EDC81]">
                    ₹{company.dayHigh.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7471] block">
                    DAY LOW
                  </span>
                  <span className="mt-1 block text-sm font-bold text-[#FF5C5C]">
                    ₹{company.dayLow.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7471] block">
                    VOLUME
                  </span>
                  <span className="mt-1 block text-sm font-bold text-[#FAF7F5]">
                    {company.volume}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7471] block">
                    MARKET CAP
                  </span>
                  <span className="mt-1 block text-sm font-bold text-[#F2D7B6]">
                    {company.marketCap}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7471] block">
                    52W HIGH
                  </span>
                  <span className="mt-1 block text-sm font-bold text-[#3EDC81]">
                    ₹{company.high52.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7471] block">
                    52W LOW
                  </span>
                  <span className="mt-1 block text-sm font-bold text-[#FF5C5C]">
                    ₹{company.low52.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-[#C98A4A]/30 bg-[#12100E] p-4 text-xs">
              <span className="text-[10px] uppercase text-[#7A7471] block">
                VIRTUAL ALLOCATION ESTIMATE
              </span>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-[#FAF7F5]">10 Shares:</span>
                <span className="font-bold text-[#3EDC81]">
                  ₹{tenShareCost.toLocaleString("en-IN")}
                </span>
              </div>
              <span className="mt-1 block text-[11px] text-[#7A7471]">
                ~{tenSharePct}% of your ₹{activeBalance.toLocaleString("en-IN")} balance
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row (Matches Screenshot 4): AI Pedagogical Analysis & Overview + Related Securities & Disclosures */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left 8 Cols */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-[#C98A4A]/40 bg-[#0A0E0E] p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="flex items-center gap-2 text-xs font-bold uppercase text-[#C98A4A]">
                  <span className="size-2 bg-[#C98A4A] inline-block" />
                  AI PEDAGOGICAL ANALYSIS
                </span>
                <button
                  onClick={refreshPedagogicalInsight}
                  className="border border-[#C98A4A]/50 bg-[#161412] px-3 py-1.5 text-[10px] font-bold text-[#F2D7B6] hover:border-[#C98A4A]"
                >
                  {refreshingAi ? "ANALYZING..." : "REFRESH AI INSIGHT"}
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#B9B4B1] whitespace-pre-line">
                {aiInsight}
              </p>
            </div>

            <div className="border border-white/10 bg-[#0A0C0B] p-6">
              <h3 className="text-xs font-bold uppercase text-[#3EDC81]">
                COMPANY OVERVIEW
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#B9B4B1]">
                {company.name} is one of India&apos;s publicly listed corporate entities on the National Stock Exchange of India (NSE). It operates within the {company.sector} sector, maintaining active liquidity across domestic institutional and retail order books.
              </p>
              <div className="mt-4 flex flex-wrap gap-6 border-t border-white/10 pt-3 text-[11px]">
                <span>
                  <span className="text-[#7A7471]">ISIN:</span>{" "}
                  <strong className="text-[#FAF7F5]">{company.isin}</strong>
                </span>
                <span>
                  <span className="text-[#7A7471]">SERIES:</span>{" "}
                  <strong className="text-[#FAF7F5]">{company.series}</strong>
                </span>
                <span>
                  <span className="text-[#7A7471]">STATUS:</span>{" "}
                  <strong className="text-[#3EDC81]">ACTIVE TRADING</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right 4 Cols */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-white/10 bg-[#0A0C0B] p-5">
              <h3 className="border-b border-white/10 pb-3 text-xs font-bold uppercase text-[#3EDC81]">
                RELATED SECURITIES
              </h3>
              <div className="mt-3 space-y-2">
                {RELATED_SECURITIES.map((rel) => (
                  <Link
                    key={rel.symbol}
                    href={`/company/${rel.symbol}`}
                    className="flex items-center justify-between border border-white/5 bg-[#101312] px-3.5 py-2.5 text-xs hover:border-[#C98A4A]/50"
                  >
                    <div>
                      <span className="font-bold text-[#D8A56D]">
                        {rel.symbol}
                      </span>
                      <span className="block text-[10px] text-[#7A7471]">
                        {rel.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-[#FAF7F5]">
                        ₹{rel.price.toFixed(2)}
                      </span>
                      <span
                        className={`text-[10px] ${
                          rel.up ? "text-[#3EDC81]" : "text-[#FF5C5C]"
                        }`}
                      >
                        {rel.change}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-[#0A0C0B] p-5">
              <h3 className="border-b border-white/10 pb-3 text-xs font-bold uppercase text-[#3EDC81]">
                LATEST MARKET DISCLOSURES
              </h3>
              <div className="mt-3 space-y-3 text-xs">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[10px] text-[#7A7471]">
                    EXCHANGE WIRE • 2H AGO
                  </span>
                  <p className="mt-1 text-[#FAF7F5]">
                    Institutional volume surges in {company.symbol} following quarterly financial briefing.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7471]">
                    SECTOR ANALYSIS • 5H AGO
                  </span>
                  <p className="mt-1 text-[#FAF7F5]">
                    Foreign portfolio investors increase net long positions across {company.sector} benchmark heavyweights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investra Mobile Sticky Trade Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-[#C98A4A]/30 bg-[#0B0B0B]/95 px-4 py-2.5 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.5)] md:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#FAF7F5]">{company.symbol}</span>
            <span className="font-mono text-[10px] text-[#B9B4B1]">₹{company.price.toFixed(2)}</span>
          </div>
          <div className={`font-mono text-[10px] font-bold ${priceChangeAbs >= 0 ? "text-[#3EDC81]" : "text-[#FF5C5C]"}`}>
            {priceChangeAbs >= 0 ? "+" : ""}₹{priceChangeAbs} ({company.changePercent >= 0 ? "+" : ""}{company.changePercent}%)
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={() =>
              setOrderDraft({
                symbol: company.symbol,
                companyName: company.name,
                sector: company.sector,
                side: "BUY",
                qty: 10,
                price: company.price,
                productType: "CNC (Delivery)",
                orderType: "MARKET",
                stopLoss: Number((company.price * 0.97).toFixed(2)),
              })
            }
            className="border border-[#3EDC81] bg-[#3EDC81] px-4 py-2 text-xs font-extrabold text-[#090909] active:scale-95 transition"
          >
            BUY
          </button>
          <button
            onClick={() =>
              setOrderDraft({
                symbol: company.symbol,
                companyName: company.name,
                sector: company.sector,
                side: "SELL",
                qty: 10,
                price: company.price,
                productType: "CNC (Delivery)",
                orderType: "MARKET",
              })
            }
            className="border border-[#FF5C5C] bg-[#FF5C5C] px-4 py-2 text-xs font-extrabold text-[#090909] active:scale-95 transition"
          >
            SELL
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
