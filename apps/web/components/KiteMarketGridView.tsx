"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, Plus, ArrowUpRight } from "lucide-react";
import { getNseEquitiesUniverse } from "@/lib/nseUniverse";

export function KiteMarketGridView() {
  const allCompanies = getNseEquitiesUniverse();
  const [tabFilter, setTabFilter] = useState<"ALL" | "GAINERS" | "LOSERS">("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const TOP_GAINERS = [
    { symbol: "JIOFIN", sector: "Financial Services", price: 348.7, change: "+4.82%" },
    { symbol: "TATASTEEL", sector: "Metals", price: 154.2, change: "+3.45%" },
    { symbol: "BHARTIARTL", sector: "Telecom", price: 1598.6, change: "+2.91%" },
    { symbol: "RELIANCE", sector: "Energy", price: 2742.5, change: "+1.20%" },
  ];

  const TOP_LOSERS = [
    { symbol: "SBIN", sector: "Banking", price: 812.3, change: "-2.15%" },
    { symbol: "HINDUNILVR", sector: "FMCG", price: 2380.0, change: "-1.84%" },
    { symbol: "INFY", sector: "IT", price: 1845.2, change: "-0.92%" },
    { symbol: "MARUTI", sector: "Automobile", price: 12100.0, change: "-0.75%" },
  ];

  const filtered = allCompanies.filter((c) => {
    if (tabFilter === "GAINERS" && c.changePercent < 0) return false;
    if (tabFilter === "LOSERS" && c.changePercent >= 0) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 text-[#444444] font-sans">
      {/* Kite Top Summary Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eeeeee] pb-4">
        <div>
          <h1 className="text-xl font-normal text-[#444444]">
            Market Directory
          </h1>
          <p className="mt-0.5 text-xs text-[#9b9b9b]">
            National Stock Exchange of India • {allCompanies.length.toLocaleString("en-IN")} Securities Listed
          </p>
        </div>

        <Link
          href="/trading"
          className="bg-[#ff5722] px-4 py-2 text-xs font-medium text-white hover:brightness-105 transition"
        >
          + Quick Trade Desk
        </Link>
      </div>

      {/* Benchmark Indices Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: "NIFTY 50", val: "24,315.80", chg: "+0.59%", up: true },
          { name: "SENSEX", val: "79,942.20", chg: "+0.61%", up: true },
          { name: "BANK NIFTY", val: "51,840.40", chg: "-0.25%", up: false },
          { name: "NIFTY IT", val: "38,740.10", chg: "+1.15%", up: true },
        ].map((idx) => (
          <div key={idx.name} className="border border-[#eeeeee] bg-[#fafafa] p-4">
            <div className="flex items-center justify-between text-xs text-[#9b9b9b]">
              <span>{idx.name}</span>
              <span className={idx.up ? "text-[#4caf50]" : "text-[#df514c]"}>{idx.chg}</span>
            </div>
            <div className="mt-2 text-xl font-medium text-[#444444]">{idx.val}</div>
          </div>
        ))}
      </div>

      {/* Top Gainers & Losers Light Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border border-[#eeeeee] bg-white p-4">
          <div className="flex items-center gap-2 border-b border-[#f1f1f1] pb-2 text-xs font-semibold text-[#4caf50]">
            <span className="size-2 bg-[#4caf50] inline-block" />
            Top Gainers (NSE)
          </div>
          <div className="mt-3 divide-y divide-[#f9f9f9] text-xs">
            {TOP_GAINERS.map((g) => (
              <Link
                key={g.symbol}
                href={`/company/${g.symbol}`}
                className="flex items-center justify-between py-2.5 hover:text-[#4184f3]"
              >
                <div>
                  <span className="font-semibold text-[#444444]">{g.symbol}</span>
                  <span className="ml-2 text-[#9b9b9b] text-[11px]">{g.sector}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-[#444444]">₹{g.price}</span>
                  <span className="ml-2 font-semibold text-[#4caf50]">{g.change}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="border border-[#eeeeee] bg-white p-4">
          <div className="flex items-center gap-2 border-b border-[#f1f1f1] pb-2 text-xs font-semibold text-[#df514c]">
            <span className="size-2 bg-[#df514c] inline-block" />
            Top Losers (NSE)
          </div>
          <div className="mt-3 divide-y divide-[#f9f9f9] text-xs">
            {TOP_LOSERS.map((l) => (
              <Link
                key={l.symbol}
                href={`/company/${l.symbol}`}
                className="flex items-center justify-between py-2.5 hover:text-[#4184f3]"
              >
                <div>
                  <span className="font-semibold text-[#444444]">{l.symbol}</span>
                  <span className="ml-2 text-[#9b9b9b] text-[11px]">{l.sector}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-[#444444]">₹{l.price}</span>
                  <span className="ml-2 font-semibold text-[#df514c]">{l.change}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Stock Universe Table */}
      <div className="border border-[#eeeeee] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f1f1f1] p-4 text-xs">
          <div className="flex border border-[#e0e0e0] p-0.5">
            {(["ALL", "GAINERS", "LOSERS"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTabFilter(t);
                  setPage(1);
                }}
                className={`px-3 py-1 text-xs font-medium ${
                  tabFilter === t ? "bg-[#ff5722] text-white" : "text-[#666666]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border border-[#e0e0e0] px-3 py-1.5 w-72">
            <Search className="size-3.5 text-[#9b9b9b]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search eg: infy, tcs, reliance"
              className="w-full bg-transparent text-xs text-[#444444] placeholder-[#9b9b9b] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#eeeeee] text-[#9b9b9b] text-[11px]">
                <th className="py-3 px-4">Instrument</th>
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">LTP</th>
                <th className="py-3 px-4">Chg %</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f9f9f9]">
              {pageRows.map((s) => {
                const isUp = s.changePercent >= 0;
                return (
                  <tr key={s.symbol} className="hover:bg-[#fafafa]">
                    <td className="py-3.5 px-4 font-semibold text-[#444444]">
                      <Link href={`/company/${s.symbol}`} className="hover:text-[#4184f3]">
                        {s.symbol}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-[#666666]">{s.name}</td>
                    <td className="py-3.5 px-4 text-[#9b9b9b]">{s.sector}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#444444]">
                      ₹{s.price.toFixed(2)}
                    </td>
                    <td className={`py-3.5 px-4 font-semibold ${isUp ? "text-[#4caf50]" : "text-[#df514c]"}`}>
                      {isUp ? "+" : ""}{s.changePercent}%
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/company/${s.symbol}`}
                        className="border border-[#4184f3] px-3 py-1 text-xs text-[#4184f3] hover:bg-[#e8f0fe]"
                      >
                        Trade
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#eeeeee] p-4 text-xs text-[#9b9b9b]">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="border border-[#e0e0e0] px-3 py-1 disabled:opacity-40 hover:bg-[#f9f9f9]"
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="bg-[#4184f3] px-4 py-1 text-white disabled:opacity-40 hover:brightness-105"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
