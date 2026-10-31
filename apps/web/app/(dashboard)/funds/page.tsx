"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, Lock } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useInvestraStore } from "@/store/useInvestraStore";

export default function FundsPage() {
  const {
    user,
    financialMode,
    setFinancialMode,
    salary,
    expenses,
    monthlySip,
    bankBalance,
    brokerWallet,
    beginnerWallet,
    simulatedMonth,
    holdings,
    simulateMonthCycle,
    transferToBroker,
  } = useInvestraStore();

  const isCash100kMode = financialMode === "BEGINNER";
  const activeWalletBalance = isCash100kMode ? beginnerWallet : brokerWallet;

  const totalExpenses =
    expenses.rent +
    expenses.food +
    expenses.travel +
    expenses.emi +
    expenses.others;
  const availableSurplus = Math.max(0, salary - totalExpenses);

  const portfolioInvested = holdings.reduce(
    (acc, h) => acc + h.qty * h.avgPrice,
    0
  );
  const portfolioCurrent = holdings.reduce((acc, h) => acc + h.qty * h.ltp, 0);
  const equityAccountValue = activeWalletBalance + portfolioCurrent;

  // Dynamic Donut Percentages based on live virtual wallet + holdings
  const totalPool = Math.max(1, activeWalletBalance + portfolioCurrent + portfolioInvested);
  const freeCashPct = Math.round((activeWalletBalance / totalPool) * 100);
  const holdingsPct = Math.round((portfolioCurrent / totalPool) * 100);
  const marginBlockedPct = Math.max(0, 100 - freeCashPct - holdingsPct);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-5xl bg-white text-[#444444] font-sans space-y-8 py-2">
        {/* Top Q Beta Feedback Bar */}
        <div className="bg-[#f4f4f4] px-3.5 py-1.5 text-[11px] text-[#666666] inline-block">
          Hi <span className="font-semibold text-[#444444]">{user?.name || "Dhanesh"}</span>, this is a beta version of Q. Please send your feedback/queries to india@zerodha.com
        </div>

        {/* Greeting + Flashback Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-light text-[#444444]">
            Hi <span className="font-normal">{user?.name || "Dhanesh"}</span>
          </h1>

          <Link
            href="/replay"
            className="flex items-center gap-3.5 border border-[#dcdcdc] bg-white px-5 py-3 hover:border-[#e65100] transition"
          >
            <div className="flex size-9 items-center justify-center border-2 border-[#e65100] text-[#e65100]">
              <RotateCcw className="size-4" />
            </div>
            <div>
              <div className="text-[11px] text-[#666666]">
                Now Analyze your trades on historical charts
              </div>
              <div className="text-sm font-bold text-[#e65100]">
                Flashback - of your trades
              </div>
            </div>
          </Link>
        </div>

        {/* Clean Zerodha Light-Mode Wallet Mode Bar (₹1,00,000 Cash vs Real-Life Salary) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[#e8e8e8] bg-[#fafafa] px-5 py-3.5 text-xs">
          <div>
            <span className="font-semibold text-[#444444]">
              Virtual Wallet Mode:{" "}
            </span>
            <span className="text-[#666666]">
              {isCash100kMode
                ? "₹1,00,000 Fixed Cash Mode (Adding extra money to broker is locked)"
                : `Real-Life Salary Mode (Month ${simulatedMonth} • ₹${salary.toLocaleString("en-IN")}/mo salary)`}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex border border-[#dcdcdc] bg-white p-0.5">
              <button
                onClick={() => setFinancialMode("BEGINNER")}
                className={`px-3 py-1.5 text-xs font-medium transition ${
                  isCash100kMode
                    ? "bg-[#4184f3] text-white"
                    : "text-[#666666] hover:text-[#222222]"
                }`}
              >
                ₹1,00,000 Cash
              </button>
              <button
                onClick={() => setFinancialMode("REAL_LIFE")}
                className={`px-3 py-1.5 text-xs font-medium transition ${
                  !isCash100kMode
                    ? "bg-[#4caf50] text-white"
                    : "text-[#666666] hover:text-[#222222]"
                }`}
              >
                Real-Life Salary
              </button>
            </div>

            {isCash100kMode ? (
              <span className="inline-flex items-center gap-1 border border-[#eeeeee] bg-white px-3 py-1.5 text-[11px] text-[#9b9b9b]">
                <Lock className="size-3" /> Top-up locked in ₹1L mode
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={simulateMonthCycle}
                  className="bg-[#4184f3] px-3 py-1.5 text-xs font-medium text-white hover:brightness-110"
                >
                  + Add Month {simulatedMonth + 1} Salary SIP (₹
                  {Math.min(monthlySip, availableSurplus).toLocaleString("en-IN")})
                </button>
                {bankBalance >= 2000 && (
                  <button
                    onClick={() => transferToBroker(2000)}
                    className="border border-[#4184f3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#4184f3] hover:bg-[#f0f6ff]"
                  >
                    + ₹2,000 from Bank
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Two Columns: EQUITY ACCOUNT VALUE & COMMODITY ACCOUNT VALUE (Exact Screenshot 2 Layout) */}
        <div className="grid gap-10 md:grid-cols-2 pt-2">
          {/* LEFT: EQUITY ACCOUNT VALUE */}
          <div className="md:border-r md:border-dashed md:border-[#dddddd] md:pr-10">
            <div className="text-xs uppercase tracking-wide text-[#666666]">
              EQUITY ACCOUNT VALUE
            </div>
            <div className="mt-1 text-3xl font-light text-[#444444]">
              ₹
              {equityAccountValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Equity Donut Chart + Legend */}
            <div className="my-8 flex flex-wrap items-center gap-8 sm:flex-nowrap">
              <div className="relative flex size-48 shrink-0 items-center justify-center">
                <svg viewBox="0 0 36 36" className="size-48 -rotate-90">
                  {/* Background Ring */}
                  <circle
                    cx="18"
                    cy="18"
                    r="13.5"
                    fill="none"
                    stroke="#eeeeee"
                    strokeWidth="6.5"
                  />
                  {/* Free Cash Slice (Green / Orange when 100%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="13.5"
                    fill="none"
                    stroke="#ff8c00"
                    strokeWidth="6.5"
                    strokeDasharray={`${freeCashPct * 0.848} 100`}
                    strokeDashoffset="0"
                  />
                  {/* Holdings Slice (Light Blue) */}
                  {holdingsPct > 0 && (
                    <circle
                      cx="18"
                      cy="18"
                      r="13.5"
                      fill="none"
                      stroke="#4fc3f7"
                      strokeWidth="6.5"
                      strokeDasharray={`${holdingsPct * 0.848} 100`}
                      strokeDashoffset={`-${freeCashPct * 0.848}`}
                    />
                  )}
                  {/* Margin Blocked Slice (Yellow) */}
                  {marginBlockedPct > 0 && (
                    <circle
                      cx="18"
                      cy="18"
                      r="13.5"
                      fill="none"
                      stroke="#fdd835"
                      strokeWidth="6.5"
                      strokeDasharray={`${marginBlockedPct * 0.848} 100`}
                      strokeDashoffset={`-${(freeCashPct + holdingsPct) * 0.848}`}
                    />
                  )}
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-2 text-[11px] text-[#666666]">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 size-2.5 shrink-0 bg-[#5cb85c] inline-block" />
                  <span>Free cash from short option premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 bg-[#ff8c00] inline-block" />
                  <span>
                    Free Cash ({freeCashPct}% • ₹
                    {activeWalletBalance.toLocaleString("en-IN")})
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 size-2.5 shrink-0 bg-[#fdd835] inline-block" />
                  <span>
                    Margin blocked ({marginBlockedPct}% • ₹
                    {Math.round(portfolioInvested).toLocaleString("en-IN")})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 bg-[#4fc3f7] inline-block" />
                  <span>
                    Holdings ({holdingsPct}% • ₹
                    {Math.round(portfolioCurrent).toLocaleString("en-IN")})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 bg-[#0288d1] inline-block" />
                  <span>Pledged Value (₹0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 bg-[#66bb6a] inline-block" />
                  <span>Long option value (₹0)</span>
                </div>
              </div>
            </div>

            {/* Equity Numeric Breakdown Rows */}
            <div className="max-w-xs space-y-2 text-xs">
              <div className="flex justify-between text-[#666666]">
                <span>Equity cash balance</span>
                <span className="text-[#444444]">
                  ₹
                  {activeWalletBalance.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between font-bold text-[#222222]">
                <span>Equity Balance</span>
                <span>
                  ₹
                  {equityAccountValue.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="pt-4 space-y-2 text-[#666666]">
                <div className="flex justify-between">
                  <span>Margin blocked</span>
                  <span className="text-[#444444]">
                    ₹
                    {portfolioInvested.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Holdings value</span>
                  <span className="text-[#444444]">
                    ₹
                    {portfolioCurrent.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Long option value</span>
                  <span className="text-[#444444]">₹0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: COMMODITY ACCOUNT VALUE */}
          <div>
            <div className="text-xs uppercase tracking-wide text-[#666666]">
              COMMODITY ACCOUNT VALUE
            </div>
            <div className="mt-1 text-3xl font-light text-[#444444]">₹0.00</div>

            {/* Commodity Donut Chart + Legend */}
            <div className="my-8 flex flex-wrap items-center gap-8 sm:flex-nowrap">
              <div className="relative flex size-48 shrink-0 items-center justify-center">
                <svg viewBox="0 0 36 36" className="size-48 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="13.5"
                    fill="none"
                    stroke="#2ecc71"
                    strokeWidth="6.5"
                  />
                </svg>
              </div>

              <div className="space-y-2 text-[11px] text-[#666666]">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 bg-[#2ecc71] inline-block" />
                  <span>Free cash (₹0.00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 bg-[#fdd835] inline-block" />
                  <span>Margin blocked (₹0.00)</span>
                </div>
              </div>
            </div>

            {/* Commodity Breakdown */}
            <div className="max-w-xs space-y-2 text-xs">
              <div className="flex justify-between font-bold text-[#222222]">
                <span>Commodity cash balance</span>
                <span>₹0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Bulletin & Z-Connect (Exact Screenshot 2 Layout) */}
        <div className="grid gap-10 border-t border-[#eeeeee] pt-8 md:grid-cols-2">
          {/* Bulletin */}
          <div className="space-y-4">
            <h2 className="text-xl font-light text-[#444444]">Bulletin</h2>
            <div className="space-y-3.5 text-xs text-[#666666]">
              <div className="flex items-start gap-3">
                <span className="shrink-0 bg-[#2c3e50] px-2 py-0.5 text-[10px] font-medium text-white">
                  30 Oct 2026
                </span>
                <span>
                  Expiry day today, Ensure to square off all your ITM options
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 bg-[#2c3e50] px-2 py-0.5 text-[10px] font-medium text-white">
                  17 Oct 2026
                </span>
                <span>
                  Global Indices Expiry : Standard T+1 settlement cycle active for NSE cash equities
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 bg-[#2c3e50] px-2 py-0.5 text-[10px] font-medium text-white">
                  05 Oct 2026
                </span>
                <span>
                  Ensure sufficient free cash margin before placing intraday MIS bracket orders
                </span>
              </div>
            </div>
          </div>

          {/* Z-Connect */}
          <div className="space-y-4">
            <h2 className="text-xl font-light text-[#444444]">Z-Connect</h2>
            <div className="space-y-3.5 text-xs text-[#666666]">
              <div className="flex items-start gap-3">
                <span className="shrink-0 bg-[#2c3e50] px-2 py-0.5 text-[10px] font-medium text-white">
                  30 Oct 2026
                </span>
                <span>Zerodha Kite & Console Updates – October 2026</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 bg-[#2c3e50] px-2 py-0.5 text-[10px] font-medium text-white">
                  23 Oct 2026
                </span>
                <span>Latest updates on Highcharts Stock & Order-Book Replay</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 bg-[#2c3e50] px-2 py-0.5 text-[10px] font-medium text-white">
                  09 Oct 2026
                </span>
                <span>Understanding Real-Life Salary SIP vs Fixed ₹1L Cash Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
