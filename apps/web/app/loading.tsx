"use client";

import { usePathname } from "next/navigation";
import LetterGlitch from "@/animations/LetterGlitch";
import { DecryptText } from "@investra/animations";

export default function Loading() {
  const pathname = usePathname();
  const shouldShowTelemetryLoader =
    pathname === "/learn" ||
    pathname === "/ai" ||
    pathname === "/news" ||
    pathname?.startsWith("/learn/") ||
    pathname?.startsWith("/ai/") ||
    pathname?.startsWith("/news/");

  if (!shouldShowTelemetryLoader) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#090909] px-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <LetterGlitch
          glitchColors={["#FAF7F5", "#C98A4A", "#D8A56D"]}
          glitchAmount={0.5}
          speed={1}
          flow={0.5}
          clickEffect="tear"
        />
      </div>

      <div className="relative z-10 w-full max-w-md border border-[#C98A4A]/35 bg-[#181614]/90 p-6 shadow-[0_0_50px_-10px_rgba(201,138,74,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C98A4A]">
            <DecryptText text="SYNCHRONIZING MARKET TELEMETRY..." />
          </span>
          <span className="size-2.5 bg-[#3EDC81] animate-ping" />
        </div>
        <div className="mt-5 space-y-3">
          <div className="h-4 w-3/4 bg-gradient-to-r from-[#211C19] via-[#C98A4A]/25 to-[#211C19] bg-[length:200%_100%] animate-shimmer" />
          <div className="h-24 w-full bg-gradient-to-r from-[#211C19] via-[#C98A4A]/20 to-[#211C19] bg-[length:200%_100%] animate-shimmer" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 bg-[#211C19] animate-pulse" />
            <div className="h-10 bg-[#211C19] animate-pulse" />
            <div className="h-10 bg-[#211C19] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
