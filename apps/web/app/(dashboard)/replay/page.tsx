"use client";

import React, { useEffect, useMemo, useState } from "react";
import { RotateCcw, FastForward, Play, Pause } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { HighchartsStockChart } from "@/components/HighchartsStockChart";
import {
  PreTradeAnalysisModal,
  PendingOrderDraft,
} from "@/components/PreTradeAnalysisModal";
import { useInvestraStore } from "@/store/useInvestraStore";

interface ReplayScenario {
  id: string;
  name: string;
  symbol: string;
  baseOhlcv: number[][];
  events: {
    stepIndex: number;
    dateLabel: string;
    price: number;
    change: string;
    headline: string;
  }[];
}

function buildDenseReplayOhlcv(
  anchors: {
    ts: number;
    open: number;
    high: number;
    low: number;
    close: number;
    vol: number;
  }[]
): number[][] {
  const result: number[][] = [];
  const dayMs = 24 * 60 * 60 * 1000;
  let globalDay = 0;

  for (let i = 0; i < anchors.length - 1; i++) {
    const cur = anchors[i];
    const next = anchors[i + 1];
    const subSteps = 10;
    let prevClose = cur.close;

    for (let s = 0; s < subSteps; s++) {
      const nextRatio = (s + 1) / subSteps;
      const ts = anchors[0].ts + globalDay * dayMs;
      globalDay++;

      const targetTrend = cur.close + (next.close - cur.close) * nextRatio;
      const swing =
        Math.sin(globalDay * 1.15) * (cur.close * 0.014) +
        (globalDay % 2 === 0 ? 1 : -1) * (cur.close * 0.009);

      const open = Number(prevClose.toFixed(2));
      const close = Number(Math.max(100, targetTrend + swing).toFixed(2));
      const high = Number(
        (
          Math.max(open, close) +
          Math.abs(swing) * 0.95 +
          cur.close * 0.008
        ).toFixed(2)
      );
      const low = Number(
        (
          Math.min(open, close) -
          Math.abs(swing) * 0.85 -
          cur.close * 0.007
        ).toFixed(2)
      );
      const vol = Math.round(
        cur.vol +
          (next.vol - cur.vol) * nextRatio +
          ((globalDay * 9311) % 18000000)
      );

      result.push([ts, open, high, low, close, vol]);
      prevClose = close;
    }
  }
  return result;
}

const SCENARIOS: ReplayScenario[] = [
  {
    id: "covid-2020",
    name: "2020 COVID-19 Global Lockdown Crash",
    symbol: "NIFTY 50",
    baseOhlcv: buildDenseReplayOhlcv([
      { ts: Date.UTC(2020, 0, 15), open: 12180, high: 12350, low: 12050, close: 12280, vol: 22000000 },
      { ts: Date.UTC(2020, 1, 1), open: 12280, high: 12320, low: 11920, close: 12113, vol: 26000000 },
      { ts: Date.UTC(2020, 1, 18), open: 12113, high: 12160, low: 11150, close: 11201, vol: 34000000 },
      { ts: Date.UTC(2020, 2, 1), open: 11201, high: 11300, low: 10380, close: 10451, vol: 45000000 },
      { ts: Date.UTC(2020, 2, 12), open: 10451, high: 10520, low: 9120, close: 9197, vol: 58000000 },
      { ts: Date.UTC(2020, 2, 23), open: 9197, high: 9280, low: 7511, close: 7610, vol: 72000000 },
      { ts: Date.UTC(2020, 3, 10), open: 7610, high: 9180, low: 7580, close: 9111, vol: 49000000 },
      { ts: Date.UTC(2020, 4, 1), open: 9111, high: 9910, low: 9020, close: 9826, vol: 39000000 },
      { ts: Date.UTC(2020, 5, 1), open: 9826, high: 12520, low: 9780, close: 12461, vol: 35000000 },
    ]),
    events: [
      { stepIndex: 15, dateLabel: "17 Feb 2020", price: 12113, change: "-0.4%", headline: "Markets near all-time highs; low VIX complacency." },
      { stepIndex: 28, dateLabel: "28 Feb 2020", price: 11201, change: "-7.5%", headline: "Global supply chain fears trigger sharp Friday selloff." },
      { stepIndex: 38, dateLabel: "09 Mar 2020", price: 10451, change: "-13.7%", headline: "Crude oil crashes 25%; FII outflow hits record pace." },
      { stepIndex: 48, dateLabel: "16 Mar 2020", price: 9197, change: "-24.1%", headline: "Emergency rate cuts fail to calm panic selling." },
      { stepIndex: 55, dateLabel: "23 Mar 2020", price: 7610, change: "-37.2%", headline: "Lower Circuit hit! Maximum retail panic capitulation." },
      { stepIndex: 66, dateLabel: "09 Apr 2020", price: 9111, change: "-24.7%", headline: "Pharma & IT lead V-shaped institutional accumulation." },
      { stepIndex: 78, dateLabel: "09 Nov 2020", price: 12461, change: "+2.9%", headline: "Disciplined SIP investors turn strongly profitable!" },
    ],
  },
  {
    id: "gfc-2008",
    name: "2008 Lehman Brothers Financial Crisis",
    symbol: "SENSEX",
    baseOhlcv: buildDenseReplayOhlcv([
      { ts: Date.UTC(2008, 0, 1), open: 20400, high: 21100, low: 20200, close: 20873, vol: 25000000 },
      { ts: Date.UTC(2008, 1, 1), open: 20873, high: 21206, low: 18200, close: 18600, vol: 32000000 },
      { ts: Date.UTC(2008, 2, 10), open: 18600, high: 18950, low: 15400, close: 15644, vol: 41000000 },
      { ts: Date.UTC(2008, 5, 10), open: 15644, high: 15800, low: 12650, close: 12860, vol: 54000000 },
      { ts: Date.UTC(2008, 9, 25), open: 12860, high: 13000, low: 7697, close: 8509, vol: 68000000 },
      { ts: Date.UTC(2009, 2, 10), open: 8509, high: 11200, low: 8300, close: 10900, vol: 49000000 },
      { ts: Date.UTC(2009, 4, 18), open: 10900, high: 14900, low: 10700, close: 14625, vol: 46000000 },
    ]),
    events: [
      { stepIndex: 15, dateLabel: "Jan 2008", price: 20873, change: "+0.0%", headline: "Euphoric valuation peak; retail leverage at extreme." },
      { stepIndex: 28, dateLabel: "Mar 2008", price: 15644, change: "-25.0%", headline: "Bear Stearns liquidity collapse rattles global banks." },
      { stepIndex: 38, dateLabel: "Sep 2008", price: 12860, change: "-38.4%", headline: "Lehman Brothers files for bankruptcy." },
      { stepIndex: 48, dateLabel: "Oct 2008", price: 8509, change: "-59.2%", headline: "Capitulation bottom • P/E drops to 10.8x." },
      { stepIndex: 58, dateLabel: "May 2009", price: 14625, change: "-29.9%", headline: "Post-election upper circuit +17% in a single day!" },
    ],
  },
];

export default function ReplayEnginePage() {
  const {
    financialMode,
    brokerWallet,
    beginnerWallet,
    monthlySip,
    executePaperOrder,
  } = useInvestraStore();

  const [scenarioId, setScenarioId] = useState("covid-2020");
  // Start with 38 dense candles visible so the chart looks identical to the dense /trading chart!
  const [visibleCount, setVisibleCount] = useState(38);
  const [isPlaying, setIsPlaying] = useState(false);
  const [orderDraft, setOrderDraft] = useState<PendingOrderDraft | null>(null);
  const [replayPosition, setReplayPosition] = useState<{
    qty: number;
    avgPrice: number;
  }>({
    qty: 0,
    avgPrice: 0,
  });
  const [aiNotes, setAiNotes] = useState<string[]>([
    "Chess Replay Mode Initialized: Future candles are hidden on the Highcharts OHLCV + Volume chart. Step candle-by-candle and decide whether to Buy SIP tranche, Hold, or Panic Sell.",
  ]);

  const scenario =
    SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
  const totalCandles = scenario.baseOhlcv.length;
  const clampedCount = Math.min(Math.max(20, visibleCount), totalCandles);
  const latestRow =
    scenario.baseOhlcv[clampedCount - 1] || scenario.baseOhlcv[0];
  const firstOpen = scenario.baseOhlcv[0][1] || 12113;
  const currentPrice = latestRow[4];
  const currentHigh = latestRow[2];
  const currentLow = latestRow[3];
  const pctChange = (((currentPrice - firstOpen) / firstOpen) * 100).toFixed(2);
  const activeCash =
    financialMode === "REAL_LIFE" ? brokerWallet : beginnerWallet;

  const activeHeadline = useMemo(() => {
    const matched =
      [...scenario.events]
        .reverse()
        .find((e) => clampedCount >= e.stepIndex) || scenario.events[0];
    return matched;
  }, [scenario, clampedCount]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= totalCandles) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(timer);
  }, [isPlaying, totalCandles]);

  const handleConfirmReplayTrade = () => {
    if (!orderDraft) return;
    const tradeQty = orderDraft.qty ?? orderDraft.quantity ?? 1;
    if (orderDraft.side === "BUY") {
      const newQty = replayPosition.qty + tradeQty;
      const newAvg =
        (replayPosition.qty * replayPosition.avgPrice +
          tradeQty * currentPrice) /
        newQty;
      setReplayPosition({ qty: newQty, avgPrice: Math.round(newAvg) });
      setAiNotes((prev) => [
        `[Candle ${clampedCount}] Confirmed BUY ${tradeQty} units @ ₹${currentPrice}. AI Coach: Accumulating red drawdown candles lowers your average cost basis!`,
        ...prev,
      ]);
    } else {
      setReplayPosition({ qty: 0, avgPrice: 0 });
      setAiNotes((prev) => [
        `[Candle ${clampedCount}] Exited holdings @ ₹${currentPrice}. AI Coach Alert: Selling into panic locks in permanent drawdown.`,
        ...prev,
      ]);
    }

    // Record in global order book (/orders) too!
    executePaperOrder({
      symbol: "RELIANCE",
      side: orderDraft.side,
      qty: tradeQty,
      priceOverride: currentPrice,
      stopLoss: orderDraft.stopLoss,
      orderType: "MARKET",
      productType: "CNC",
    });

    setOrderDraft(null);
    setVisibleCount((c) => Math.min(totalCandles, c + 2));
  };

  const unrealizedPnl =
    replayPosition.qty > 0
      ? (currentPrice - replayPosition.avgPrice) * replayPosition.qty
      : 0;

  return (
    <DashboardShell>
      <PreTradeAnalysisModal
        draft={orderDraft}
        availableCash={activeCash}
        monthlySip={monthlySip}
        financialMode={financialMode}
        onCancel={() => setOrderDraft(null)}
        onConfirm={handleConfirmReplayTrade}
      />

      <div className="space-y-6 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[#C98A4A]/40 bg-[#12100E] p-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C98A4A]">
              HISTORICAL TIME MACHINE • FUTURE CANDLES HIDDEN
            </span>
            <h1 className="mt-1 text-2xl font-extrabold text-[#FAF7F5]">
              {scenario.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setScenarioId(s.id);
                  setVisibleCount(35);
                  setIsPlaying(false);
                  setReplayPosition({ qty: 0, avgPrice: 0 });
                }}
                className={`px-4 py-2 text-xs font-bold transition ${
                  scenarioId === s.id
                    ? "bg-[#C98A4A] text-[#090909]"
                    : "border border-white/15 bg-[#111111] text-[#B9B4B1]"
                }`}
              >
                {s.symbol} (
                {s.id === "covid-2020" ? "2020 Crash" : "2008 Crisis"})
              </button>
            ))}
          </div>
        </div>

        {/* Highcharts Candlestick + Volume Replay Studio (Matches /trading Chart Screenshot) */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 border border-[#C98A4A]/25 bg-[#090B0A] p-4 flex flex-col justify-between">
            <div>
              {/* Terminal Chart Header Bar (Identical to /trading Screenshot 2) */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl font-extrabold text-[#C98A4A]">
                    {scenario.symbol}
                  </h2>
                  <span className="text-base font-bold text-[#FAF7F5]">
                    ₹{currentPrice.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      Number(pctChange) >= 0
                        ? "text-[#3EDC81]"
                        : "text-[#FF5C5C]"
                    }`}
                  >
                    {Number(pctChange) >= 0 ? "+" : ""}
                    {pctChange}%
                  </span>
                  <span className="border border-[#C98A4A]/40 bg-[#181614] px-2 py-0.5 text-[10px] text-[#F2D7B6]">
                    NSE • HIGHCHARTS CANDLESTICK STREAM
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-[#7A7471]">
                  <span>
                    HIGH: <strong className="text-[#3EDC81]">₹{currentHigh}</strong> • LOW:{" "}
                    <strong className="text-[#FF5C5C]">₹{currentLow}</strong>
                  </span>
                  <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="inline-flex items-center gap-1 border border-[#C98A4A] bg-[#181614] px-3 py-1.5 text-xs font-bold text-[#F2D7B6]"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="size-3.5" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-3.5 fill-current" /> Auto-Play
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      setVisibleCount((s) => Math.min(s + 2, totalCandles))
                    }
                    className="inline-flex items-center gap-1 bg-[#C98A4A] px-3.5 py-1.5 text-xs font-extrabold text-[#090909]"
                  >
                    <FastForward className="size-3.5" /> Next Candle ({clampedCount}/{totalCandles})
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setVisibleCount(35);
                      setReplayPosition({ qty: 0, avgPrice: 0 });
                    }}
                    className="border border-white/15 bg-[#111111] p-1.5 text-[#B9B4B1] hover:text-white"
                    title="Reset Replay"
                  >
                    <RotateCcw className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Exact Highcharts Red/Green Candlesticks + Volume Chart from Screenshot 2 */}
              <div className="mt-3">
                <HighchartsStockChart
                  symbol={scenario.symbol}
                  basePrice={currentPrice}
                  customOhlcv={scenario.baseOhlcv}
                  visibleCandlesCount={clampedCount}
                  height={460}
                />
              </div>
            </div>

            <div className="mt-3 border border-[#C98A4A]/30 bg-[#111111] p-3 text-xs text-[#F2D7B6]">
              <strong>Breaking Tape ({activeHeadline.dateLabel}):</strong>{" "}
              {activeHeadline.headline}
            </div>
          </div>

          {/* Right Decision & AI Coach Review */}
          <div className="investra-card lg:col-span-4 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#FAF7F5]">
                Your Replay Decision
              </h3>
              <div className="border border-white/10 bg-[#111111] p-3.5 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#7A7471]">Accumulated Tranches</span>
                  <span className="font-bold text-[#FAF7F5]">
                    {replayPosition.qty} Units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7471]">Average Entry Price</span>
                  <span className="text-[#D8A56D]">
                    {replayPosition.avgPrice
                      ? `₹${replayPosition.avgPrice}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7471]">Replay P&L</span>
                  <span
                    className={`font-bold ${
                      unrealizedPnl >= 0 ? "text-[#3EDC81]" : "text-[#FF5C5C]"
                    }`}
                  >
                    {unrealizedPnl >= 0 ? "+" : ""}₹{unrealizedPnl.toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() =>
                    setOrderDraft({
                      symbol: scenario.symbol,
                      companyName: `${scenario.name} Replay ETF`,
                      sector: "Index Benchmark",
                      side: "BUY",
                      qty: 1,
                      price: currentPrice,
                      productType: "CNC (Delivery)",
                      orderType: "MARKET",
                      stopLoss: Number((currentPrice * 0.95).toFixed(2)),
                    })
                  }
                  className="w-full bg-[#3EDC81] py-3 text-xs font-extrabold text-[#090909] hover:brightness-110"
                >
                  + Invest ₹5,000 SIP Tranche & Step Forward
                </button>
                <button
                  onClick={() =>
                    setVisibleCount((c) => Math.min(totalCandles, c + 2))
                  }
                  className="w-full border border-[#C98A4A]/40 bg-[#211C19] py-3 text-xs font-bold text-[#F2D7B6]"
                >
                  Hold Calmly & Reveal Next Candle
                </button>
                <button
                  onClick={() =>
                    setOrderDraft({
                      symbol: scenario.symbol,
                      companyName: `${scenario.name} Replay ETF`,
                      sector: "Index Benchmark",
                      side: "SELL",
                      qty: Math.max(1, replayPosition.qty),
                      price: currentPrice,
                      productType: "CNC (Delivery)",
                      orderType: "MARKET",
                    })
                  }
                  className="w-full border border-[#FF5C5C]/40 bg-[#FF5C5C]/10 py-3 text-xs font-bold text-[#FF5C5C]"
                >
                  Panic Sell Everything
                </button>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="flex items-center gap-1.5 text-[11px] uppercase text-[#C98A4A]">
                AI Replay Coach Log
              </div>
              <div className="max-h-44 space-y-2 overflow-y-auto text-xs">
                {aiNotes.map((n, i) => (
                  <div
                    key={i}
                    className="border border-white/10 bg-[#111111] p-3 text-[#B9B4B1]"
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
