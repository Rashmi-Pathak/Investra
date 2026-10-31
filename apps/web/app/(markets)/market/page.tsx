"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { GrowwDesktopMarketView } from "@/components/GrowwDesktopMarketView";
import { KiteMarketGridView } from "@/components/KiteMarketGridView";
import { getNseEquitiesUniverse } from "@/lib/nseUniverse";
import { useInvestraStore } from "@/store/useInvestraStore";

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

export default function MarketDashboardPage() {
  const router = useRouter();
  const setSelectedSymbol = useInvestraStore((s) => s.setSelectedSymbol);
  const brokerPreset = useInvestraStore((s) => s.brokerPreset);

  const allCompanies = useMemo(() => getNseEquitiesUniverse(), []);
  const [tabFilter, setTabFilter] = useState<"ALL" | "GAINERS" | "LOSERS">("ALL");
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const filtered = useMemo(() => {
    return allCompanies.filter((c) => {
      if (tabFilter === "GAINERS" && c.changePercent < 0) return false;
      if (tabFilter === "LOSERS" && c.changePercent >= 0) return false;
      if (sectorFilter !== "ALL" && c.sector !== sectorFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          c.symbol.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allCompanies, tabFilter, sectorFilter, search]);

  if (brokerPreset === "groww") {
    return <GrowwDesktopMarketView />;
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <DashboardShell>
      {brokerPreset === "kite" ? (
        <KiteMarketGridView />
      ) : (
        <div className="space-y-6">
          {/* Top Directory Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C98A4A]/25 pb-5">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#C98A4A]">
                NATIONAL STOCK EXCHANGE OF INDIA &bull; DIRECTORY
              </p>
              <h1 className="mt-1 font-mono text-3xl font-extrabold text-[#FAF7F5]">
                NSE Securities Exchange
              </h1>
              <p className="mt-1 font-mono text-xs text-[#B9B4B1]">
                Browse real-time metrics across {allCompanies.length.toLocaleString("en-IN")} listed equities, sectoral indices, and virtual order endpoints.
              </p>
            </div>

            <Link
              href="/trading"
              className="bg-[#C98A4A] px-5 py-3 font-mono text-xs font-extrabold uppercase tracking-wider text-[#090909] shadow-[0_0_25px_rgba(201,138,74,0.4)] hover:brightness-110"
            >
              + QUICK ORDER DESK
            </Link>
          </div>

          {/* 4 Benchmark Index Boxes */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono">
            {[
              { name: "NIFTY 50", value: "24,315.80", change: "+0.59%", up: true, high: "Rs 24,380", low: "Rs 24,190.2" },
              { name: "SENSEX", value: "79,942.20", change: "+0.61%", up: true, high: "Rs 80,120.4", low: "Rs 79,540.1" },
              { name: "BANK NIFTY", value: "51,840.40", change: "-0.25%", up: false, high: "Rs 52,100", low: "Rs 51,650" },
              { name: "NIFTY IT", value: "38,740.10", change: "+1.15%", up: true, high: "Rs 38,920", low: "Rs 38,350" },
            ].map((idx) => (
              <div
                key={idx.name}
                className="border border-[#C98A4A]/25 bg-[#0C0E0D] p-5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#D8A56D]">{idx.name}</span>
                  <span className={idx.up ? "text-[#3EDC81]" : "text-[#FF5C5C]"}>
                    {idx.change}
                  </span>
                </div>
                <div className="mt-2 text-2xl font-extrabold text-[#FAF7F5]">
                  {idx.value}
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-[#7A7471]">
                  <span>H: {idx.high}</span>
                  <span>L: {idx.low}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Top Gainers & Top Losers Side-by-Side Boxes */}
          <div className="grid gap-6 lg:grid-cols-2 font-mono">
            {/* Top Gainers */}
            <div className="border border-[#3EDC81]/35 bg-[#0A0E0C] p-5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs font-bold uppercase text-[#3EDC81]">
                <span className="size-2 bg-[#3EDC81] inline-block" />
                TOP GAINERS (NSE)
              </div>
              <div className="mt-3 space-y-2">
                {TOP_GAINERS.map((g) => (
                  <Link
                    key={g.symbol}
                    href={`/company/${g.symbol}`}
                    className="flex items-center justify-between border border-white/5 bg-[#0F1412] px-4 py-3 text-xs hover:border-[#C98A4A]/50"
                  >
                    <div>
                      <span className="font-bold text-[#D8A56D]">{g.symbol}</span>
                      <span className="ml-2 text-[#7A7471]">{g.sector}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#FAF7F5]">Rs {g.price}</span>
                      <span className="font-bold text-[#3EDC81]">{g.change}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="border border-[#FF5C5C]/35 bg-[#0E0A0A] p-5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs font-bold uppercase text-[#FF5C5C]">
                <span className="size-2 bg-[#FF5C5C] inline-block" />
                TOP LOSERS (NSE)
              </div>
              <div className="mt-3 space-y-2">
                {TOP_LOSERS.map((l) => (
                  <Link
                    key={l.symbol}
                    href={`/company/${l.symbol}`}
                    className="flex items-center justify-between border border-white/5 bg-[#140F0F] px-4 py-3 text-xs hover:border-[#C98A4A]/50"
                  >
                    <div>
                      <span className="font-bold text-[#D8A56D]">{l.symbol}</span>
                      <span className="ml-2 text-[#7A7471]">{l.sector}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#FAF7F5]">Rs {l.price}</span>
                      <span className="font-bold text-[#FF5C5C]">{l.change}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border border-[#C98A4A]/25 bg-[#0C0C0C] p-4 font-mono">
            <div className="flex items-center gap-2">
              {(["ALL", "GAINERS", "LOSERS"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTabFilter(t);
                    setPage(1);
                  }}
                  className={`border px-4 py-2 text-xs font-bold transition ${
                    tabFilter === t
                      ? "border-[#C98A4A] bg-[#C98A4A]/20 text-[#C98A4A]"
                      : "border-white/10 bg-[#121212] text-[#7A7471] hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search symbol, company (e.g. RELIANCE, 21STCENMGM)..."
                className="w-72 border border-white/15 bg-[#080808] px-3.5 py-2 text-xs text-[#FAF7F5] placeholder-[#7A7471] focus:border-[#C98A4A] focus:outline-none"
              />

              <select
                value={sectorFilter}
                onChange={(e) => {
                  setSectorFilter(e.target.value);
                  setPage(1);
                }}
                className="border border-white/15 bg-[#080808] px-3.5 py-2 text-xs text-[#FAF7F5] focus:border-[#C98A4A] focus:outline-none"
              >
                <option value="ALL">ALL SECTORS ({allCompanies.length})</option>
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
          </div>

          {/* Full 2,640 NSE Equities Table */}
          <div className="border border-[#C98A4A]/25 bg-[#0A0A0A] overflow-x-auto font-mono">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#C98A4A]/25 bg-[#111111] text-[11px] uppercase text-[#7A7471]">
                  <th className="px-5 py-3.5">SYMBOL</th>
                  <th className="px-5 py-3.5">COMPANY NAME</th>
                  <th className="px-5 py-3.5">SECTOR</th>
                  <th className="px-5 py-3.5">SERIES</th>
                  <th className="px-5 py-3.5">EST. LTP</th>
                  <th className="px-5 py-3.5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {pageRows.map((row) => (
                  <tr
                    key={row.symbol}
                    className="hover:bg-[#141210] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/company/${row.symbol}`}
                        className="font-bold text-[#D8A56D] hover:text-[#C98A4A] hover:underline"
                      >
                        {row.symbol}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-[#FAF7F5]">{row.name}</td>
                    <td className="px-5 py-3.5">
                      <span className="border border-[#C98A4A]/30 bg-[#181614] px-2 py-0.5 text-[10px] text-[#F2D7B6]">
                        {row.sector}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#7A7471]">{row.series}</td>
                    <td className="px-5 py-3.5">
                      <span className="font-bold text-[#FAF7F5]">
                        Rs {row.price.toFixed(2)}
                      </span>
                      <span
                        className={`ml-2 text-[11px] ${
                          row.changePercent >= 0
                            ? "text-[#3EDC81]"
                            : "text-[#FF5C5C]"
                        }`}
                      >
                        {row.changePercent >= 0 ? "+" : ""}
                        {row.changePercent}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/company/${row.symbol}`}
                          className="border border-white/15 bg-[#141414] px-3 py-1.5 text-[11px] font-bold text-[#FAF7F5] hover:border-[#C98A4A]"
                        >
                          CHART
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedSymbol(row.symbol);
                            router.push(`/company/${row.symbol}`);
                          }}
                          className="bg-[#3EDC81] px-3 py-1.5 text-[11px] font-extrabold text-[#090909] hover:brightness-110"
                        >
                          TRADE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#C98A4A]/25 bg-[#111111] px-5 py-3.5 text-xs">
              <span className="text-[#B9B4B1]">
                Showing{" "}
                <strong className="text-[#FAF7F5]">
                  {(currentPage - 1) * pageSize + 1}&ndash;
                  {Math.min(currentPage * pageSize, filtered.length)}
                </strong>{" "}
                of{" "}
                <strong className="text-[#C98A4A]">
                  {filtered.length.toLocaleString("en-IN")}
                </strong>{" "}
                NSE Listed Companies
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="border border-white/15 bg-[#181614] px-3.5 py-1.5 font-bold text-[#FAF7F5] disabled:opacity-40 hover:border-[#C98A4A]"
                >
                  &larr; PREV
                </button>
                <span className="px-3 text-[#F2D7B6]">
                  Page <strong>{currentPage}</strong> of{" "}
                  <strong>{totalPages}</strong>
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="border border-[#C98A4A] bg-[#C98A4A] px-3.5 py-1.5 font-extrabold text-[#090909] disabled:opacity-40 hover:brightness-110"
                >
                  NEXT &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
