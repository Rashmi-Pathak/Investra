"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { UpstoxDesktopWorkspace } from "@/components/UpstoxDesktopWorkspace";
import { useInvestraStore } from "@/store/useInvestraStore";
import { NumberTicker } from "@investra/animations";

export default function PortfolioAndBankPage() {
  const {
    user,
    brokerPreset,
    financialMode,
    setFinancialMode,
    salary,
    expenses,
    monthlySip,
    bankBalance,
    brokerWallet,
    beginnerWallet,
    simulatedMonth,
    bankTransactions,
    updateSalaryAndSip,
    updateExpense,
    simulateMonthCycle,
    transferToBroker,
    holdings,
  } = useInvestraStore();

  const [photoMenuOpen, setPhotoMenuOpen] = useState(true);

  // When Upstox Pro preset is selected, render authentic Upstox Pro Holdings & Positions Workspace (Screenshot 4)
  if (brokerPreset === "upstox") {
    return <UpstoxDesktopWorkspace defaultView="HOLDINGS" />;
  }

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
  const totalPnl = portfolioCurrent - portfolioInvested;

  // ============================================================================
  // ZERODHA KITE LIGHT-MODE PROFILE & PORTFOLIO VIEW (WHEN brokerPreset === "kite")
  // Matches Screenshot 3 (Profile, Account, Segments, Bank accounts) + Live Wallet Mode & Holdings
  // ============================================================================
  if (brokerPreset === "kite") {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-5xl bg-white text-[#444444] font-sans space-y-8 py-2">
          {/* Profile Header Row */}
          <div className="flex items-center justify-between border-b border-[#f1f1f1] pb-4">
            <h1 className="text-xl font-normal text-[#444444]">Profile</h1>
            <button className="text-xs text-[#4184f3] hover:underline">
              Change password
            </button>
          </div>

          {/* Avatar + User Name + Edit Photo Dropdown (Exact Screenshot 3 Layout) */}
          <div className="flex flex-wrap items-start gap-8 border-b border-[#f1f1f1] pb-12 pt-2">
            <div className="relative flex flex-col items-center">
              <div className="size-24 overflow-hidden border border-[#eeeeee] bg-[#f5e6e0]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt={user?.name || "Zerodha"}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                onClick={() => setPhotoMenuOpen((v) => !v)}
                className="mt-2 text-xs text-[#4184f3] hover:underline"
              >
                Edit photo
              </button>

              {photoMenuOpen && (
                <div className="mt-1.5 w-32 border border-[#e0e0e0] bg-white py-1.5 text-left text-xs shadow-md">
                  <button
                    onClick={() => setPhotoMenuOpen(false)}
                    className="block w-full px-3.5 py-1.5 text-left text-[#444444] hover:bg-[#f9f9f9]"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setPhotoMenuOpen(false)}
                    className="block w-full px-3.5 py-1.5 text-left text-[#9b9b9b] hover:bg-[#f9f9f9]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3">
              <h2 className="text-xl font-normal text-[#444444]">
                {user?.name || "Zerodha"}
              </h2>
              <p className="mt-1 text-xs text-[#9b9b9b]">
                Last login: 31 October 2026 23:15:17
              </p>
            </div>
          </div>

          {/* E-mail, PAN, Phone, DP IDs Grid (Exact Screenshot 3 Layout) */}
          <div className="grid gap-y-4 gap-x-12 border-b border-[#f1f1f1] pb-6 text-xs sm:grid-cols-2">
            <div className="grid grid-cols-3">
              <span className="text-[#9b9b9b]">E-mail</span>
              <span className="col-span-2 text-[#444444]">
                {user?.email || "email@zerodha.com"}
              </span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-[#9b9b9b]">PAN</span>
              <span className="col-span-2 text-[#444444]">*SOXP0558T</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-[#9b9b9b]">Phone</span>
              <span className="col-span-2 text-[#444444]">*855451452</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-[#9b9b9b]">DP IDs</span>
              <span className="col-span-2 text-[#444444]">01234567</span>
            </div>
          </div>

          {/* Account Section (Segments, Products, Order types) */}
          <div className="border-b border-[#f1f1f1] pb-6">
            <h3 className="border-b border-[#f5f5f5] pb-3 text-lg font-normal text-[#444444]">
              Account
            </h3>
            <div className="mt-4 max-w-xl space-y-3.5 text-xs">
              <div className="grid grid-cols-3">
                <span className="text-[#9b9b9b]">Segments</span>
                <span className="col-span-2 text-[#444444]">
                  NSE, BSE, BFO, NFO, CDS, MCX
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#9b9b9b]">Products</span>
                <span className="col-span-2 text-[#444444]">
                  BO, CNC, CO, MIS, NRML
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#9b9b9b]">Order types</span>
                <span className="col-span-2 text-[#444444]">
                  LIMIT, MARKET, SL, SL-M
                </span>
              </div>
            </div>
          </div>

          {/* Bank Accounts Section */}
          <div className="border-b border-[#f1f1f1] pb-6">
            <h3 className="border-b border-[#f5f5f5] pb-3 text-lg font-normal text-[#444444]">
              Bank accounts
            </h3>
            <div className="mt-4 grid gap-y-4 gap-x-12 text-xs sm:grid-cols-2">
              <div className="grid grid-cols-3">
                <span className="text-[#9b9b9b]">Account</span>
                <span className="col-span-2 text-[#444444]">*224551145789</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#9b9b9b]">Bank</span>
                <span className="col-span-2 text-[#444444]">HDFC</span>
              </div>
            </div>
          </div>

          {/* Zerodha Light-Mode Virtual Wallet Mode Controller & Holdings Summary */}
          <div className="space-y-6 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-4 border border-[#eeeeee] bg-[#fafafa] p-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[#666666]">
                  Virtual Wallet & Portfolio Mode
                </div>
                <div className="mt-1 text-lg font-normal text-[#444444]">
                  {isCash100kMode
                    ? "₹1,00,000 Fixed Cash Mode (Active Wallet: ₹" +
                      activeWalletBalance.toLocaleString("en-IN") +
                      ")"
                    : `Real-Life Salary Mode (Month ${simulatedMonth} • Active Wallet: ₹${activeWalletBalance.toLocaleString("en-IN")})`}
                </div>
                <p className="mt-0.5 text-xs text-[#9b9b9b]">
                  {isCash100kMode
                    ? "In ₹1,00,000 Cash Mode, adding extra money to the broker wallet is locked."
                    : `Credit your ₹${monthlySip.toLocaleString("en-IN")} monthly salary SIP once per simulated month.`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex border border-[#dcdcdc] bg-white p-0.5 text-xs">
                  <button
                    onClick={() => setFinancialMode("BEGINNER")}
                    className={`px-3.5 py-1.5 font-medium transition ${
                      isCash100kMode
                        ? "bg-[#4184f3] text-white"
                        : "text-[#666666] hover:text-[#222222]"
                    }`}
                  >
                    ₹1,00,000 Cash Mode
                  </button>
                  <button
                    onClick={() => setFinancialMode("REAL_LIFE")}
                    className={`px-3.5 py-1.5 font-medium transition ${
                      !isCash100kMode
                        ? "bg-[#4caf50] text-white"
                        : "text-[#666666] hover:text-[#222222]"
                    }`}
                  >
                    Real-Life Salary Mode
                  </button>
                </div>

                {isCash100kMode ? (
                  <span className="inline-flex items-center gap-1.5 border border-[#e0e0e0] bg-white px-3 py-1.5 text-xs text-[#9b9b9b]">
                    <Lock className="size-3.5" /> Adding money locked in ₹1,00,000 mode
                  </span>
                ) : (
                  <button
                    onClick={simulateMonthCycle}
                    className="bg-[#4184f3] px-3.5 py-1.5 text-xs font-medium text-white hover:brightness-110"
                  >
                    + Credit Month {simulatedMonth + 1} Salary (₹
                    {Math.min(monthlySip, availableSurplus).toLocaleString("en-IN")})
                  </button>
                )}
              </div>
            </div>

            {/* Clean Light Zerodha Demat Holdings Table */}
            <div className="border border-[#eeeeee] bg-white p-5">
              <div className="flex items-center justify-between border-b border-[#f1f1f1] pb-3">
                <h3 className="text-base font-normal text-[#444444]">
                  Holdings ({holdings.length})
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#666666]">
                  <span>
                    Available Cash:{" "}
                    <strong className="text-[#444444]">
                      ₹{activeWalletBalance.toLocaleString("en-IN")}
                    </strong>
                  </span>
                  <span>
                    Current Value:{" "}
                    <strong className="text-[#444444]">
                      ₹{Math.round(portfolioCurrent).toLocaleString("en-IN")}
                    </strong>
                  </span>
                </div>
              </div>

              {holdings.length === 0 ? (
                <div className="py-10 text-center text-xs text-[#9b9b9b]">
                  <p className="text-sm text-[#444444]">
                    You don&apos;t have any holdings yet (0 holdings • ₹0 invested)
                  </p>
                  <p className="mt-1">
                    Your virtual equity cash balance is{" "}
                    <strong className="text-[#444444]">
                      ₹{activeWalletBalance.toLocaleString("en-IN")}
                    </strong>
                    . Use the left Marketwatch or Trade terminal to place an order.
                  </p>
                  <Link
                    href="/trading"
                    className="mt-4 inline-block bg-[#4184f3] px-4 py-2 text-xs font-medium text-white hover:brightness-110"
                  >
                    Get started
                  </Link>
                </div>
              ) : (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#eeeeee] text-[#9b9b9b]">
                        <th className="py-2.5">Instrument</th>
                        <th className="py-2.5">Qty.</th>
                        <th className="py-2.5">Avg. cost</th>
                        <th className="py-2.5">LTP</th>
                        <th className="py-2.5">Cur. val</th>
                        <th className="py-2.5">P&amp;L</th>
                        <th className="py-2.5 text-right">Net chg.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5f5f5]">
                      {holdings.map((h) => {
                        const curVal = h.qty * h.ltp;
                        const pnl = (h.ltp - h.avgPrice) * h.qty;
                        const pct =
                          h.avgPrice > 0
                            ? ((h.ltp - h.avgPrice) / h.avgPrice) * 100
                            : 0;
                        return (
                          <tr key={h.symbol} className="hover:bg-[#fafafa]">
                            <td className="py-3 font-medium text-[#444444]">
                              <Link
                                href={`/company/${h.symbol}`}
                                className="hover:text-[#4184f3]"
                              >
                                {h.symbol}
                              </Link>
                            </td>
                            <td className="py-3 text-[#444444]">{h.qty}</td>
                            <td className="py-3 text-[#666666]">
                              {h.avgPrice.toFixed(2)}
                            </td>
                            <td className="py-3 text-[#444444]">
                              {h.ltp.toFixed(2)}
                            </td>
                            <td className="py-3 text-[#444444]">
                              {curVal.toFixed(2)}
                            </td>
                            <td
                              className={`py-3 font-medium ${
                                pnl >= 0 ? "text-[#4caf50]" : "text-[#df514c]"
                              }`}
                            >
                              {pnl >= 0 ? "+" : ""}
                              {pnl.toFixed(2)}
                            </td>
                            <td
                              className={`py-3 text-right ${
                                pct >= 0 ? "text-[#4caf50]" : "text-[#df514c]"
                              }`}
                            >
                              {pct >= 0 ? "+" : ""}
                              {pct.toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  // ============================================================================
  // DEFAULT INVESTRA DARK PORTFOLIO & WALLET PAGE
  // ============================================================================
  return (
    <DashboardShell>
      <div className="space-y-6 font-mono">
        {/* Top Mode Toggle Banner: ₹1,00,000 Cash Mode vs Real-Life Salary Mode */}
        <div className="border border-[#C98A4A]/40 bg-[#141210] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C98A4A]">
                PORTFOLIO & WALLET MODE CONTROLLER
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-[#FAF7F5] sm:text-3xl">
                {isCash100kMode
                  ? "₹1,00,000 Fixed Cash Mode"
                  : `Real-Life Salary Mode (Month ${simulatedMonth})`}
              </h1>
              <p className="mt-1 text-xs text-[#B9B4B1]">
                {isCash100kMode
                  ? "Fixed ₹1,00,000 starting capital. Adding extra money to the broker wallet is locked."
                  : `Driven by your ₹${salary.toLocaleString("en-IN")} monthly salary. You can credit your ₹${monthlySip.toLocaleString("en-IN")} SIP once per simulated month.`}
              </p>
            </div>

            {/* Interactive Mode Toggle Switch */}
            <div className="flex items-center border border-[#C98A4A] bg-[#090909] p-1">
              <button
                onClick={() => setFinancialMode("BEGINNER")}
                className={`px-4 py-2.5 text-xs font-extrabold uppercase transition ${
                  isCash100kMode
                    ? "bg-[#C98A4A] text-[#090909]"
                    : "text-[#B9B4B1] hover:text-[#FAF7F5]"
                }`}
              >
                ₹1,00,000 Cash Mode
              </button>
              <button
                onClick={() => setFinancialMode("REAL_LIFE")}
                className={`px-4 py-2.5 text-xs font-extrabold uppercase transition ${
                  !isCash100kMode
                    ? "bg-[#3EDC81] text-[#090909]"
                    : "text-[#B9B4B1] hover:text-[#FAF7F5]"
                }`}
              >
                Real-Life Salary Mode
              </button>
            </div>
          </div>

          {/* Wallet Balance & Action Controls */}
          <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
            <div className="border border-[#C98A4A]/40 bg-[#0B0B0B] p-4">
              <span className="text-[11px] uppercase text-[#D8A56D]">
                ACTIVE BROKER WALLET BALANCE
              </span>
              <div className="mt-1 text-3xl font-extrabold text-[#3EDC81]">
                ₹<NumberTicker value={activeWalletBalance} />
              </div>
              <span className="mt-1 block text-[11px] text-[#7A7471]">
                {isCash100kMode
                  ? "Fixed ₹1,00,000 Sandbox Allocation"
                  : `Credited from ₹${salary.toLocaleString("en-IN")}/mo Salary`}
              </span>
            </div>

            <div className="border border-white/10 bg-[#0B0B0B] p-4">
              <span className="text-[11px] uppercase text-[#B9B4B1]">
                PORTFOLIO HOLDINGS VALUE
              </span>
              <div className="mt-1 text-3xl font-extrabold text-[#FAF7F5]">
                ₹{Math.round(portfolioCurrent).toLocaleString("en-IN")}
              </div>
              <span className="mt-1 block text-[11px] text-[#7A7471]">
                {holdings.length === 0
                  ? "No stocks purchased yet (₹0 invested)"
                  : `${holdings.length} Active Positions • P&L: ${
                      totalPnl >= 0 ? "+" : ""
                    }₹${totalPnl.toFixed(0)}`}
              </span>
            </div>

            <div className="flex flex-col justify-between border border-white/10 bg-[#0B0B0B] p-4">
              <span className="text-[11px] uppercase text-[#B9B4B1]">
                BROKER FUNDING ACTION
              </span>
              {isCash100kMode ? (
                <div className="mt-2 flex items-center gap-2 border border-[#FF5C5C]/40 bg-[#1A0E0E] px-3 py-2.5 text-xs text-[#FF5C5C]">
                  <Lock className="size-4 shrink-0" />
                  <span>
                    Adding cash is locked in ₹1,00,000 mode. Switch to Real-Life Mode to credit monthly salary.
                  </span>
                </div>
              ) : (
                <div className="mt-2 flex flex-col gap-2">
                  <button
                    onClick={simulateMonthCycle}
                    className="w-full bg-[#3EDC81] py-2.5 text-xs font-extrabold uppercase text-[#090909] hover:brightness-110"
                  >
                    + Credit Month {simulatedMonth + 1} Salary SIP (+₹
                    {Math.min(monthlySip, availableSurplus).toLocaleString(
                      "en-IN"
                    )}
                    )
                  </button>
                  <button
                    onClick={() => transferToBroker(2000)}
                    disabled={bankBalance < 2000}
                    className="w-full border border-[#C98A4A]/50 bg-[#181614] py-1.5 text-[11px] font-bold text-[#F2D7B6] disabled:opacity-40"
                  >
                    Transfer ₹2,000 from Savings Bank (₹
                    {bankBalance.toLocaleString("en-IN")})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="investra-card p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-[#C98A4A]" />
              <h2 className="text-lg font-bold text-[#FAF7F5]">
                Your Demat Holdings ({holdings.length})
              </h2>
            </div>
            <Link
              href="/trading"
              className="border border-[#C98A4A] bg-[#211C19] px-3.5 py-1.5 text-xs font-bold text-[#F2D7B6] hover:bg-[#C98A4A] hover:text-[#090909]"
            >
              + Trade Stocks
            </Link>
          </div>

          {holdings.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-bold text-[#FAF7F5]">
                Your portfolio has 0 holdings (₹0 Market Value)
              </p>
              <p className="mt-1 text-xs text-[#7A7471]">
                You currently have{" "}
                <strong className="text-[#3EDC81]">
                  ₹{activeWalletBalance.toLocaleString("en-IN")}
                </strong>{" "}
                in your wallet. Buy your first stock in the Trade Terminal to build your portfolio.
              </p>
              <Link
                href="/trading"
                className="mt-4 inline-block bg-[#C98A4A] px-5 py-2.5 text-xs font-extrabold uppercase text-[#090909]"
              >
                Open Trade Terminal →
              </Link>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] uppercase text-[#7A7471]">
                    <th className="pb-3">SYMBOL</th>
                    <th className="pb-3">QTY</th>
                    <th className="pb-3">AVG BUY</th>
                    <th className="pb-3">LTP</th>
                    <th className="pb-3">CURRENT VALUE</th>
                    <th className="pb-3">NET P&L</th>
                    <th className="pb-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {holdings.map((h) => {
                    const curVal = h.qty * h.ltp;
                    const pnl = (h.ltp - h.avgPrice) * h.qty;
                    const pct = ((h.ltp - h.avgPrice) / h.avgPrice) * 100;
                    return (
                      <tr key={h.symbol}>
                        <td className="py-3.5 font-bold text-[#FAF7F5]">
                          {h.symbol}
                          <span className="block text-[10px] text-[#7A7471]">
                            {h.sector}
                          </span>
                        </td>
                        <td className="py-3.5">{h.qty}</td>
                        <td className="py-3.5 text-[#B9B4B1]">
                          ₹{h.avgPrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 font-bold text-[#FAF7F5]">
                          ₹{h.ltp.toFixed(2)}
                        </td>
                        <td className="py-3.5 font-bold text-[#FAF7F5]">
                          ₹{curVal.toFixed(2)}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={
                              pnl >= 0 ? "text-[#3EDC81]" : "text-[#FF5C5C]"
                            }
                          >
                            {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)} (
                            {pct.toFixed(2)}%)
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <Link
                            href={`/company/${h.symbol}`}
                            className="inline-flex items-center gap-1 border border-white/15 bg-[#181614] px-2.5 py-1 text-[11px] text-[#F2D7B6]"
                          >
                            Chart <ArrowUpRight className="size-3" />
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

        {/* Real-Life Salary & Expense Configurator */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="investra-card lg:col-span-6 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h2 className="text-lg font-bold text-[#FAF7F5]">
                  Monthly Salary & Bill Deductions
                </h2>
                <p className="text-[11px] text-[#7A7471]">
                  {isCash100kMode
                    ? "Switch to Real-Life Salary Mode above to fund your broker from monthly salary."
                    : "Determines how much cash you can add once per month."}
                </p>
              </div>
              <span className="text-xs text-[#3EDC81]">
                Surplus: ₹{availableSurplus.toLocaleString("en-IN")}/mo
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs">
                <span className="text-[#B9B4B1]">Monthly Salary Credit</span>
                <span className="font-bold text-[#FAF7F5]">
                  ₹{salary.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={25000}
                max={200000}
                step={5000}
                value={salary}
                onChange={(e) =>
                  updateSalaryAndSip(Number(e.target.value), monthlySip)
                }
                className="mt-2 h-1.5 w-full cursor-pointer appearance-none bg-[#382B27] accent-[#C98A4A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {(
                [
                  ["rent", "Monthly Rent"],
                  ["food", "Food & Groceries"],
                  ["travel", "Commute & Travel"],
                  ["emi", "Loans / EMI"],
                  ["others", "Insurance & Misc"],
                ] as const
              ).map(([key, label]) => (
                <div
                  key={key}
                  className="border border-white/[0.06] bg-[#111111] p-3"
                >
                  <label className="text-[#B9B4B1]">{label}</label>
                  <input
                    type="number"
                    step={500}
                    value={expenses[key]}
                    onChange={(e) =>
                      updateExpense(key, Math.max(0, Number(e.target.value)))
                    }
                    className="mt-1 w-full bg-transparent text-sm font-bold text-[#FAF7F5] focus:outline-none"
                  />
                </div>
              ))}

              <div className="border border-[#C98A4A]/40 bg-[#211C19] p-3">
                <label className="text-[#F2D7B6]">Monthly Broker SIP</label>
                <input
                  type="number"
                  step={500}
                  value={monthlySip}
                  onChange={(e) =>
                    updateSalaryAndSip(
                      salary,
                      Math.max(500, Number(e.target.value))
                    )
                  }
                  className="mt-1 w-full bg-transparent text-sm font-extrabold text-[#3EDC81] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right: Virtual Bank Statement */}
          <div className="investra-card lg:col-span-6 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D8A56D]">
                Virtual Bank Statement (Real-Life Ledger)
              </h3>
              <span className="text-xs text-[#B9B4B1]">
                Bank Savings: ₹{bankBalance.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {bankTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between border border-white/[0.06] bg-[#111111] px-4 py-2.5 text-xs"
                >
                  <div>
                    <p className="font-semibold text-[#FAF7F5]">{tx.title}</p>
                    <span className="text-[10px] text-[#7A7471]">{tx.date}</span>
                  </div>
                  <span
                    className={`font-bold ${
                      tx.type === "CREDIT" ? "text-[#3EDC81]" : "text-[#F2D7B6]"
                    }`}
                  >
                    {tx.type === "CREDIT" ? "+" : "-"}₹
                    {tx.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
