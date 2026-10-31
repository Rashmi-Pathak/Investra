"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShapeGrid from "@/animations/ShapeGrid";
import { useInvestraStore } from "@/store/useInvestraStore";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const registerUser = useInvestraStore((s) => s.registerUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(email || "newuser@investra.ai", name || "Market Pioneer");
    // Newly registered users proceed to /onboarding
    router.push("/onboarding");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-6 py-12 text-[#FAF7F5]">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="#2a221e"
          hoverColor="#C98A4A"
          hoverFillColor="#F2D7B6"
          fillOpacity={0.15}
          cellSize={40}
          speed={0.5}
        />
      </div>

      <div className="relative z-10 w-full max-w-md border border-[#C98A4A] bg-[#0B0B0B]/95 p-8 shadow-[0_0_55px_rgba(201,138,74,0.3)]">
        <div className="border-b border-[#C98A4A]/30 pb-4">
          <Link href="/" className="font-mono text-xs font-bold text-[#C98A4A]">
            ← BACK TO INVESTRA
          </Link>
          <h1 className="mt-2 font-mono text-2xl font-extrabold uppercase text-[#FAF7F5]">
            Register New Investor
          </h1>
          <p className="mt-1 text-xs text-[#B9B4B1]">
            Step 1 of 2: Create your credentials to unlock Personalized Financial Onboarding.
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label className="block font-mono text-xs uppercase text-[#D8A56D]">
              Full Name
            </label>
            <div className="mt-1.5 flex items-center gap-2 border border-[#C98A4A]/40 bg-[#141414] px-3 py-2.5">
              <User className="size-4 text-[#C98A4A]" />
              <input
                type="text"
                required
                placeholder="e.g. Aarav Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent font-mono text-xs text-[#FAF7F5] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase text-[#D8A56D]">
              Email Address
            </label>
            <div className="mt-1.5 flex items-center gap-2 border border-[#C98A4A]/40 bg-[#141414] px-3 py-2.5">
              <Mail className="size-4 text-[#C98A4A]" />
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent font-mono text-xs text-[#FAF7F5] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase text-[#D8A56D]">
              Create Password
            </label>
            <div className="mt-1.5 flex items-center gap-2 border border-[#C98A4A]/40 bg-[#141414] px-3 py-2.5">
              <Lock className="size-4 text-[#C98A4A]" />
              <input
                type="password"
                required
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent font-mono text-xs text-[#FAF7F5] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 bg-[#C98A4A] py-3 font-mono text-xs font-extrabold uppercase tracking-wider text-[#090909] hover:brightness-110"
          >
            Register & Continue to Onboarding <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="mt-5 grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              registerUser("google.new@investra.ai", "New Google Investor");
              router.push("/onboarding");
            }}
            className="border border-white/15 bg-[#141414] py-2.5 font-mono text-xs text-[#FAF7F5] hover:border-[#C98A4A]"
          >
            Sign Up with Google
          </button>
          <button
            type="button"
            onClick={() => {
              registerUser("github.new@investra.ai", "New GitHub Investor");
              router.push("/onboarding");
            }}
            className="border border-white/15 bg-[#141414] py-2.5 font-mono text-xs text-[#FAF7F5] hover:border-[#C98A4A]"
          >
            Sign Up with GitHub
          </button>
        </div>

        <p className="mt-6 text-center font-mono text-xs text-[#B9B4B1]">
          Already registered?{" "}
          <Link href="/login" className="font-bold text-[#3EDC81] underline">
            Sign In Directly to Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
