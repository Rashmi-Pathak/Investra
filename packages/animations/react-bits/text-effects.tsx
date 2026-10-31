"use client";

import React, { useEffect, useState } from "react";

export interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function Typewriter({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 1800,
  className = "",
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length] || "";
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{text}</span>
      <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-[#C98A4A]" />
    </span>
  );
}

const CIPHER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789₹$#@%&*+=<>";

export interface DecryptTextProps {
  text: string;
  speed?: number;
  className?: string;
  triggerOnHover?: boolean;
}

export function DecryptText({
  text,
  speed = 28,
  className = "",
  triggerOnHover = true,
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, runKey]);

  return (
    <span
      onMouseEnter={() => {
        if (triggerOnHover) setRunKey((k) => k + 1);
      }}
      className={`inline-block font-mono tracking-tight ${className}`}
    >
      {displayText}
    </span>
  );
}

export interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: NumberTickerProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = value * eased;
      setCurrent(start);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    requestAnimationFrame(step);
  }, [value]);

  const formatted = current.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function BorderBeam({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-[#C98A4A]/35 [mask-image:linear-gradient(120deg,transparent_20%,#C98A4A_50%,transparent_80%)] animate-pulse ${className}`}
    />
  );
}
