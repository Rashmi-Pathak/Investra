"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { UpstoxDesktopWorkspace } from "@/components/UpstoxDesktopWorkspace";
import { useInvestraStore, OrderRecord } from "@/store/useInvestraStore";

type OrderFilterTab =
  | "ALL"
  | "FILLED"
  | "OPEN"
  | "PARTIALLY_FILLED"
  | "CANCELLED";

export default function OrdersLedgerPage() {
  const { orders, cancelOrder, fillOpenOrder, brokerPreset } = useInvestraStore();
  const [activeTab, setActiveTab] = useState<OrderFilterTab>("ALL");

  // When Upstox Pro preset is selected, render authentic Upstox Pro Orders Workspace (Screenshot 1, 2, 4)
  if (brokerPreset === "upstox") {
    return <UpstoxDesktopWorkspace defaultView="ORDERS" />;
  }

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "ALL") return true;
    return o.status === activeTab;
  });

  const renderStatusBadge = (status: OrderRecord["status"]) => {
    switch (status) {
      case "FILLED":
        return (
          <span className="border border-[#3EDC81]/50 bg-[#3EDC81]/15 px-2.5 py-1 text-[10px] font-bold uppercase text-[#3EDC81]">
            FILLED
          </span>
        );
      case "OPEN":
        return (
          <span className="border border-[#38BDF8]/50 bg-[#38BDF8]/15 px-2.5 py-1 text-[10px] font-bold uppercase text-[#38BDF8]">
            OPEN
          </span>
        );
      case "PARTIALLY_FILLED":
        return (
          <span className="border border-[#FFC857]/50 bg-[#FFC857]/15 px-2.5 py-1 text-[10px] font-bold uppercase text-[#FFC857]">
            PARTIALLY FILLED
          </span>
        );
      case "CANCELLED":
        return (
          <span className="border border-[#FF5C5C]/50 bg-[#FF5C5C]/15 px-2.5 py-1 text-[10px] font-bold uppercase text-[#FF5C5C]">
            CANCELLED
          </span>
        );
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6 font-mono">
        {/* Header Row (Matches Screenshot 3) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#3EDC81]">
              DETERMINISTIC MATCHING ENGINE LEDGER
            </span>
            <h1 className="mt-1 text-2xl font-extrabold text-[#FAF7F5] sm:text-3xl">
              Virtual Order Book & Execution History
            </h1>
            <p className="mt-1 text-xs text-[#7A7471]">
              Immutable audit trail of simulated market orders, fills, limits, and cancellations.
            </p>
          </div>

          <Link
            href="/trading"
            className="bg-[#3EDC81] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-[#090909] shadow-[0_0_25px_rgba(62,220,129,0.35)] hover:brightness-110"
          >
            + PLACE ORDER
          </Link>
        </div>

        {/* Filter Tabs Strip */}
        <div className="flex flex-wrap items-center gap-2 border border-white/10 bg-[#0A0D0C] p-3">
          {(
            [
              { id: "ALL", label: `ALL (${orders.length})` },
              {
                id: "FILLED",
                label: `FILLED (${orders.filter((o) => o.status === "FILLED").length})`,
              },
              {
                id: "OPEN",
                label: `OPEN (NOT FILLED) (${orders.filter((o) => o.status === "OPEN").length})`,
              },
              { id: "PARTIALLY_FILLED", label: "PARTIALLY FILLED" },
              {
                id: "CANCELLED",
                label: `CANCELLED (${orders.filter((o) => o.status === "CANCELLED").length})`,
              },
            ] as { id: OrderFilterTab; label: string }[]
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border px-3.5 py-2 text-xs font-bold transition ${
                  active
                    ? "border-[#3EDC81] bg-[#3EDC81]/15 text-[#3EDC81]"
                    : "border-white/10 bg-[#111111] text-[#7A7471] hover:text-[#FAF7F5]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Order Book Table */}
        <div className="border border-white/10 bg-[#090B0A] overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#0D100F] text-[11px] uppercase tracking-wider text-[#7A7471]">
                <th className="py-3.5 px-4">TIME</th>
                <th className="py-3.5 px-4">SYMBOL</th>
                <th className="py-3.5 px-4">TYPE</th>
                <th className="py-3.5 px-4">SIDE</th>
                <th className="py-3.5 px-4">QUANTITY</th>
                <th className="py-3.5 px-4">PRICE</th>
                <th className="py-3.5 px-4">EXECUTED</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-14 text-center">
                    <p className="text-sm font-bold text-[#FAF7F5]">
                      No orders in this filter yet
                    </p>
                    <p className="mt-1 text-xs text-[#7A7471]">
                      Every stock you buy or sell in the Trade Terminal, Company Page, or Replay Studio automatically appears here.
                    </p>
                    <Link
                      href="/trading"
                      className="mt-4 inline-block border border-[#C98A4A] bg-[#181614] px-4 py-2 text-xs font-bold text-[#F2D7B6] hover:bg-[#211C19]"
                    >
                      Go to Trade Terminal & Place Your First Order →
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-white/[0.02] transition"
                  >
                    <td className="py-4 px-4 text-[#7A7471]">{order.time}</td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/company/${order.symbol}`}
                        className="font-bold text-[#38BDF8] hover:underline"
                      >
                        {order.symbol}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-[#B9B4B1]">
                      {order.orderType} • {order.productType}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-bold ${
                          order.side === "BUY"
                            ? "text-[#3EDC81]"
                            : "text-[#FF5C5C]"
                        }`}
                      >
                        {order.side}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-[#FAF7F5]">
                      {order.qty}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#FAF7F5]">
                      ₹{order.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-[#B9B4B1]">
                      {order.executedQty} / {order.qty}
                    </td>
                    <td className="py-4 px-4">
                      {renderStatusBadge(order.status)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {order.status === "OPEN" ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => fillOpenOrder(order.id)}
                            className="border border-[#3EDC81]/50 bg-[#3EDC81]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[#3EDC81] hover:bg-[#3EDC81] hover:text-[#090909]"
                          >
                            FILL NOW
                          </button>
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="border border-[#FF5C5C]/50 bg-[#FF5C5C]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[#FF5C5C] hover:bg-[#FF5C5C] hover:text-[#090909]"
                          >
                            CANCEL
                          </button>
                        </div>
                      ) : (
                        <Link
                          href={`/company/${order.symbol}`}
                          className="text-[11px] text-[#7A7471] hover:text-[#C98A4A]"
                        >
                          VIEW CHART →
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
