"use client";

import { Globe } from "@/registry/magicui/globe";

export function GlobeDemo() {
  return (
    <div className="relative flex size-full min-h-[440px] w-full items-center justify-center overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#181614]/75 px-6 pt-8 pb-12 backdrop-blur-xl shadow-[0_0_45px_-10px_rgba(201,138,74,0.22)]">
      <div className="pointer-events-none absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C98A4A]/30 bg-[#211C19]/90 px-3 py-1 text-xs font-medium text-[#F2D7B6]">
            <span className="size-2 rounded-full bg-[#3EDC81] animate-ping" />
            GLOBAL LIQUIDITY NEXUS
          </span>
          <h4 className="mt-2 bg-gradient-to-b from-[#FAF7F5] via-[#F2D7B6] to-[#C98A4A]/60 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl">
            NSE • BSE • NYSE • LSE • TSE
          </h4>
        </div>
        <div className="hidden text-right font-mono text-xs text-[#B9B4B1] sm:block">
          <div className="text-[#3EDC81]">FII NET: +₹2,840 Cr</div>
          <div className="text-[#F2D7B6]">DII NET: +₹1,920 Cr</div>
        </div>
      </div>

      <span className="pointer-events-none select-none bg-gradient-to-b from-[#F2D7B6]/20 to-transparent bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent md:text-8xl">
        INVESTRA
      </span>

      <div className="absolute inset-0 flex items-center justify-center pt-10">
        <Globe className="size-[390px] md:size-[440px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(201,138,74,0.18),rgba(9,9,9,0))]" />
      <div className="pointer-events-none absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#7A7471]">
        <span>Drag globe to inspect cross-market capital flows</span>
        <span className="font-mono text-[#D8A56D]">LIVE TELEMETRY • 60 FPS</span>
      </div>
    </div>
  );
}
