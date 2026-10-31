"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShapeGrid from "@/animations/ShapeGrid";
import { useInvestraStore } from "@/store/useInvestraStore";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const {
    isNewRegistration,
    completeOnboarding,
    salary,
    monthlySip,
    updateSalaryAndSip,
    setFinancialMode,
  } = useInvestraStore();

  const [experience, setExperience] = useState("Beginner");
  const [risk, setRisk] = useState("Medium");
  const [selectedWalletMode, setSelectedWalletMode] = useState<"BEGINNER" | "REAL_LIFE">("BEGINNER");
  const [markets, setMarkets] = useState<string[]>(["NSE", "BSE", "US Tech"]);

  // Guard: Onboarding is ONLY visible to newly registering users!
  useEffect(() => {
    if (!isNewRegistration) {
      router.replace("/dashboard");
    }
  }, [isNewRegistration, router]);

  const toggleMarket = (m: string) => {
    setMarkets((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  if (!isNewRegistration) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-6 py-12 text-[#FAF7F5]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="#2a221e"
          hoverColor="#C98A4A"
          hoverFillColor="#F2D7B6"
          fillOpacity={0.16}
          cellSize={40}
          speed={0.5}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl border border-[#C98A4A] bg-[#0B0B0B]/95 p-8 shadow-[0_0_60px_-10px_rgba(201,138,74,0.38)] space-y-6">
        <div className="flex items-center justify-between border-b border-[#C98A4A]/30 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C98A4A]">
              NEW REGISTRATION • STEP 2 OF 2: PERSONALIZED ONBOARDING
            </span>
            <h1 className="mt-1 font-mono text-2xl font-extrabold text-[#FAF7F5]">
              Configure Your Real-Life Financial Profile
            </h1>
          </div>
          <Sparkles className="size-6 text-[#C98A4A]" />
        </div>

        {/* Step 1: Experience */}
        <div>
          <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#D8A56D]">
            1. Investing Experience
          </label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {["Never Invested", "Beginner", "Intermediate", "Expert"].map(
              (exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => setExperience(exp)}
                  className={`border py-2.5 font-mono text-xs font-semibold transition ${
                    experience === exp
                      ? "border-[#C98A4A] bg-[#211C19] text-[#F2D7B6]"
                      : "border-white/10 bg-[#111111] text-[#B9B4B1]"
                  }`}
                >
                  {exp}
                </button>
              )
            )}
          </div>
        </div>

        {/* Step 2: Choose Wallet Mode (₹1,00,000 Fixed Cash vs Real-Life Salary Mode) */}
        <div>
          <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#D8A56D]">
            2. Select Starting Wallet Mode (Can be toggled later on Portfolio page)
          </label>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setSelectedWalletMode("BEGINNER")}
              className={`border p-4 text-left font-mono transition ${
                selectedWalletMode === "BEGINNER"
                  ? "border-[#C98A4A] bg-[#211C19]"
                  : "border-white/10 bg-[#111111]"
              }`}
            >
              <div className="text-xs font-extrabold text-[#FAF7F5]">
                ₹1,00,000 Fixed Cash Mode
              </div>
              <p className="mt-1 text-[11px] text-[#B9B4B1]">
                Starts with ₹1,00,000 in wallet (0 holdings). Adding extra cash is locked.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setSelectedWalletMode("REAL_LIFE")}
              className={`border p-4 text-left font-mono transition ${
                selectedWalletMode === "REAL_LIFE"
                  ? "border-[#3EDC81] bg-[#142019]"
                  : "border-white/10 bg-[#111111]"
              }`}
            >
              <div className="text-xs font-extrabold text-[#3EDC81]">
                Real-Life Salary SIP Mode
              </div>
              <p className="mt-1 text-[11px] text-[#B9B4B1]">
                Starts with your monthly SIP (₹{monthlySip.toLocaleString("en-IN")}) and lets you add cash once per month from salary.
              </p>
            </button>
          </div>
        </div>

        {/* Step 3: Income & Monthly SIP */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-white/10 bg-[#111111] p-4">
            <label className="font-mono text-xs text-[#B9B4B1]">
              Monthly Salary (₹)
            </label>
            <input
              type="number"
              step={5000}
              value={salary}
              onChange={(e) =>
                updateSalaryAndSip(Number(e.target.value), monthlySip)
              }
              className="mt-1 w-full bg-transparent font-mono text-xl font-bold text-[#FAF7F5] focus:outline-none"
            />
          </div>
          <div className="border border-[#C98A4A]/40 bg-[#211C19] p-4">
            <label className="font-mono text-xs text-[#F2D7B6]">
              Monthly SIP Investment (₹)
            </label>
            <input
              type="number"
              step={1000}
              value={monthlySip}
              onChange={(e) =>
                updateSalaryAndSip(salary, Number(e.target.value))
              }
              className="mt-1 w-full bg-transparent font-mono text-xl font-bold text-[#3EDC81] focus:outline-none"
            />
          </div>
        </div>

        {/* Step 3: Risk & Markets */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#D8A56D]">
              Risk Appetite
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRisk(r)}
                  className={`border py-2 font-mono text-xs font-semibold ${
                    risk === r
                      ? "border-[#C98A4A] bg-[#211C19] text-[#F2D7B6]"
                      : "border-white/10 bg-[#111111] text-[#B9B4B1]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#D8A56D]">
              Preferred Markets
            </label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["NSE", "BSE", "US Tech", "ETFs", "Mutual Funds"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMarket(m)}
                  className={`border px-3 py-1 font-mono text-xs ${
                    markets.includes(m)
                      ? "border-[#3EDC81] bg-[#3EDC81]/15 text-[#3EDC81]"
                      : "border-white/10 bg-[#111111] text-[#B9B4B1]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-[#C98A4A]/30 bg-[#111111] p-4 font-mono text-xs text-[#F2D7B6]">
          <div className="flex items-center gap-2 font-bold text-[#C98A4A]">
            <CheckCircle2 className="size-4 text-[#3EDC81]" />
            AI Personal Roadmap Ready
          </div>
          <p className="mt-1 text-[#B9B4B1]">
            Calibrated for a <strong>{experience}</strong> investor with a{" "}
            <strong>₹{salary.toLocaleString("en-IN")}</strong> monthly salary,{" "}
            <strong>₹{monthlySip.toLocaleString("en-IN")}/mo</strong> SIP, and{" "}
            <strong>{risk}</strong> risk profile.
          </p>
        </div>

        <button
          onClick={() => {
            completeOnboarding(selectedWalletMode);
            router.push("/dashboard");
          }}
          className="flex w-full items-center justify-center gap-2 bg-[#C98A4A] py-3.5 font-mono text-xs font-extrabold uppercase tracking-wider text-[#090909] hover:brightness-110"
        >
          Complete Onboarding & Enter Dashboard <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
