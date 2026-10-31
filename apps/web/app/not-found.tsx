"use client";

import Link from "next/link";
import LetterGlitch from "@/animations/LetterGlitch";
import { DecryptText } from "@investra/animations";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#090909] px-6 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <LetterGlitch
          glitchColors={["#FAF7F5", "#C98A4A", "#D8A56D"]}
          glitchAmount={0.5}
          speed={1}
          flow={0.5}
          clickEffect="tear"
        />
      </div>
      <div className="relative z-10 max-w-lg rounded-[24px] border border-[#C98A4A]/35 bg-[#181614]/85 p-10 backdrop-blur-2xl shadow-[0_0_55px_-10px_rgba(201,138,74,0.3)]">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C98A4A]">
          <DecryptText text="ERR_404 // TICKER DELISTED" />
        </p>
        <h1 className="mt-3 text-5xl font-bold text-[#FAF7F5]">Route Not Found</h1>
        <p className="mt-3 text-sm text-[#B9B4B1]">
          The market endpoint or lesson you requested does not exist in the Investra terminal.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-[14px] border border-white/10 bg-[#211C19] px-5 py-2.5 text-sm font-semibold text-[#FAF7F5] transition hover:border-[#C98A4A]/50"
          >
            Landing Page
          </Link>
          <Link
            href="/dashboard"
            className="rounded-[14px] bg-gradient-to-r from-[#C98A4A] to-[#D8A56D] px-5 py-2.5 text-sm font-bold text-[#090909] shadow-[0_0_25px_rgba(201,138,74,0.4)] transition hover:scale-105"
          >
            Open Command Center
          </Link>
        </div>
      </div>
    </div>
  );
}
