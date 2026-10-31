"use client";

import React from "react";
import { ShieldAlert, CheckCircle2, AlertTriangle, Sparkles, X } from "lucide-react";

export interface PendingOrderDraft {
  symbol: string;
  name?: string;
  companyName?: string;
  sector?: string;
  side: "BUY" | "SELL";
  qty?: number;
  quantity?: number;
  price: number;
  product?: string;
  productType?: string;
  orderType?: "MARKET" | "LIMIT" | string;
  stopLoss?: number;
  target?: number;
  estimatedCost?: number;
}

export interface PreTradeAnalysisModalProps {
  draft: PendingOrderDraft | null;
  availableCash?: number;
  monthlySip?: number;
  financialMode?: "REAL_LIFE" | "BEGINNER" | string;
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm: (finalOrder?: any) => void;
}

export function PreTradeAnalysisModal({
  draft,
  availableCash = 100000,
  monthlySip = 5000,
  financialMode = "BEGINNER",
  onCancel,
  onClose,
  onConfirm,
}: PreTradeAnalysisModalProps) {
  if (!draft) return null;

  const handleDismiss = onCancel || onClose || (() => {});
  const quantity = Number(draft.qty ?? draft.quantity ?? 1);
  const price = Number(draft.price || 100);
  const grossValue = Number((quantity * price).toFixed(2));
  const brokerageAndTaxes = Number((20 + grossValue * 0.0011).toFixed(2));
  const netTotal =
    draft.side === "BUY"
      ? Number((grossValue + brokerageAndTaxes).toFixed(2))
      : Number((grossValue - brokerageAndTaxes).toFixed(2));

  const effectiveCash = Math.max(availableCash || 100000, 1);
  const effectiveSip = Math.max(monthlySip || 5000, 1);

  const walletPct = Math.round((grossValue / effectiveCash) * 100);
  const sipMonthsEquivalent = (grossValue / effectiveSip).toFixed(1);
  const downside5Pct = Number((grossValue * 0.05).toFixed(2));
  const downside10Pct = Number((grossValue * 0.1).toFixed(2));

  const hasStopLoss = Boolean(draft.stopLoss && draft.stopLoss > 0);
  const isOverConcentrated = walletPct > 25;
  const productLabel = String(draft.productType || draft.product || "CNC");
  const isIntraday =
    productLabel.toUpperCase().includes("MIS") ||
    productLabel.toUpperCase().includes("INTRADAY");
  const insufficientFunds = draft.side === "BUY" && netTotal > effectiveCash;

  const displayName = draft.companyName || draft.name || draft.symbol;
  const displaySector = draft.sector || "Equities";
  const displayOrderType = draft.orderType || "MARKET";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto border border-[#C98A4A] bg-[#0B0B0B] p-4 sm:p-6 shadow-[0_0_60px_rgba(201,138,74,0.35)] font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C98A4A]/30 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C98A4A]">
              MANDATORY PRE-TRADE RISK &amp; IMPACT ANALYSIS
            </span>
            <h2 className="mt-1 text-xl font-extrabold text-[#FAF7F5]">
              {draft.side} {quantity} SHARES OF {draft.symbol} @ ₹{price.toLocaleString("en-IN")}
            </h2>
            <p className="text-xs text-[#B9B4B1]">
              {displayName} &bull; Sector: {displaySector} &bull; {productLabel} &bull; {displayOrderType}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="border border-white/15 bg-[#141414] p-2 text-[#B9B4B1] hover:border-[#C98A4A] hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Section 1: Capital & Cost Breakdown */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
          <div className="border border-white/10 bg-[#121212] p-3">
            <span className="text-[10px] text-[#7A7471]">TRADE VALUE</span>
            <div className="mt-1 text-sm font-bold text-[#FAF7F5]">
              ₹{grossValue.toLocaleString("en-IN")}
            </div>
          </div>
          <div className="border border-white/10 bg-[#121212] p-3">
            <span className="text-[10px] text-[#7A7471]">CHARGES (BROK+STT)</span>
            <div className="mt-1 text-sm font-bold text-[#FFC857]">
              ₹{brokerageAndTaxes.toLocaleString("en-IN")}
            </div>
          </div>
          <div className="border border-white/10 bg-[#121212] p-3">
            <span className="text-[10px] text-[#7A7471]">WALLET ALLOCATION</span>
            <div
              className={`mt-1 text-sm font-bold ${
                isOverConcentrated ? "text-[#FF5C5C]" : "text-[#3EDC81]"
              }`}
            >
              {walletPct}% of Cash
            </div>
          </div>
          <div className="border border-white/10 bg-[#121212] p-3">
            <span className="text-[10px] text-[#7A7471]">REAL-LIFE SIP EFFORT</span>
            <div className="mt-1 text-sm font-bold text-[#F2D7B6]">
              {sipMonthsEquivalent} Months SIP
            </div>
          </div>
        </div>

        {/* Section 2: Risk Scenarios & AI Guidance */}
        <div className="mt-4 space-y-2.5 border border-[#C98A4A]/30 bg-[#12100E] p-4 text-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#C98A4A]">
            <Sparkles className="size-4" /> Pre-Trade Stress Test &amp; Position Sizing
          </div>

          <div className="grid gap-2 sm:grid-cols-2 pt-1">
            <div className="border border-white/10 bg-[#090909] p-3">
              <span className="text-[10px] uppercase text-[#D8A56D]">
                1. Position Sizing &amp; Concentration
              </span>
              <p className="mt-1 text-[#B9B4B1] leading-relaxed">
                {isOverConcentrated ? (
                  <span className="text-[#FF5C5C]">
                    High Concentration Risk: Deploying {walletPct}% of your cash in a single order exceeds the disciplined 20% limit.
                  </span>
                ) : (
                  <span className="text-[#3EDC81]">
                    Healthy Sizing: Uses {walletPct}% of funds, leaving ample liquidity.
                  </span>
                )}
              </p>
            </div>

            <div className="border border-white/10 bg-[#090909] p-3">
              <span className="text-[10px] uppercase text-[#D8A56D]">
                2. Downside Drawdown Stress Test
              </span>
              <p className="mt-1 text-[#B9B4B1] leading-relaxed">
                &bull; A <strong>-5% dip</strong> will cost{" "}
                <strong className="text-[#FF5C5C]">-₹{downside5Pct.toLocaleString("en-IN")}</strong>.
                <br />&bull; A <strong>-10% shock</strong> will cost{" "}
                <strong className="text-[#FF5C5C]">-₹{downside10Pct.toLocaleString("en-IN")}</strong>.
              </p>
            </div>

            <div className="border border-white/10 bg-[#090909] p-3">
              <span className="text-[10px] uppercase text-[#D8A56D]">
                3. Stop-Loss &amp; Risk Armor
              </span>
              <p className="mt-1 leading-relaxed">
                {hasStopLoss ? (
                  <span className="text-[#3EDC81]">
                    &check; Stop-Loss set at ₹{draft.stopLoss}. Capital is protected from deep drawdowns.
                  </span>
                ) : (
                  <span className="text-[#FFC857]">
                    &empty; No Stop-Loss defined. Entering without a stop-loss exposes your{" "}
                    {financialMode === "REAL_LIFE" ? "monthly salary SIP" : "virtual wallet"}{" "}
                    to unhedged losses.
                  </span>
                )}
              </p>
            </div>

            <div className="border border-white/10 bg-[#090909] p-3">
              <span className="text-[10px] uppercase text-[#D8A56D]">
                4. Settlement &amp; Holding Type
              </span>
              <p className="mt-1 text-[#B9B4B1] leading-relaxed">
                {isIntraday
                  ? "MIS Intraday: Auto squares-off before market close (3:20 PM). High intraday volatility."
                  : "CNC Delivery: Transferred directly into your Demat holdings with zero leverage decay."}
              </p>
            </div>
          </div>
        </div>

        {insufficientFunds && (
          <div className="mt-3 border border-[#FF5C5C] bg-[#FF5C5C]/10 p-3 text-xs text-[#FF5C5C]">
            INSUFFICIENT FUNDS: Required ₹{netTotal.toLocaleString("en-IN")} exceeds available wallet balance ₹
            {effectiveCash.toLocaleString("en-IN")}. Reduce quantity or wait for salary SIP credit.
          </div>
        )}

        {/* Footer Confirm / Cancel Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={handleDismiss}
            className="border border-white/20 bg-[#141414] px-5 py-3 text-xs font-bold uppercase text-[#B9B4B1] hover:border-white hover:text-white transition"
          >
            Cancel / Modify Order
          </button>

          <button
            type="button"
            disabled={insufficientFunds}
            onClick={() => onConfirm(draft)}
            className={`px-7 py-3 text-xs font-extrabold uppercase tracking-wider text-[#090909] transition ${
              insufficientFunds
                ? "cursor-not-allowed bg-[#382B27] text-[#7A7471]"
                : draft.side === "BUY"
                ? "bg-[#3EDC81] hover:brightness-110 shadow-[0_0_25px_rgba(62,220,129,0.4)]"
                : "bg-[#FF5C5C] hover:brightness-110 shadow-[0_0_25px_rgba(255,92,92,0.4)]"
            }`}
          >
            Confirm {draft.side} ({quantity} {draft.symbol} &bull; ₹{netTotal.toLocaleString("en-IN")})
          </button>
        </div>
      </div>
    </div>
  );
}
