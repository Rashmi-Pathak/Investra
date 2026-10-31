"use client";

import React, { useEffect, useRef } from "react";

export interface LetterGlitchProps {
  glitchColors?: string[];
  glitchAmount?: number;
  speed?: number;
  flow?: number;
  clickEffect?: "tear" | "pulse" | "none";
  className?: string;
}

const CHARS = "INVESTRA0123456789₹$%+-=<>NIFTYBSEALPHAΔΣΩ";

export default function LetterGlitch({
  glitchColors = ["#FAF7F5", "#C98A4A", "#D8A56D", "#5A463E"],
  glitchAmount = 0.5,
  speed = 1,
  flow = 0.5,
  clickEffect = "tear",
  className = "",
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const fontSize = 15;
    const charWidth = 12;
    const charHeight = 20;
    let cols = 0;
    let rows = 0;
    let grid: { char: string; color: string; alpha: number }[] = [];
    let tearOffset = 0;

    const initGrid = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 800;
      canvas.height = rect.height || 600;
      cols = Math.ceil(canvas.width / charWidth);
      rows = Math.ceil(canvas.height / charHeight);
      grid = Array.from({ length: cols * rows }, () => ({
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: glitchColors[Math.floor(Math.random() * glitchColors.length)],
        alpha: Math.random() * 0.75 + 0.15,
      }));
    };

    initGrid();
    window.addEventListener("resize", initGrid);

    const handleClick = () => {
      if (clickEffect === "tear") {
        tearOffset = 18;
      }
    };
    canvas.addEventListener("click", handleClick);

    let lastTick = 0;
    const render = (timestamp: number) => {
      if (timestamp - lastTick > 55 / Math.max(speed, 0.2)) {
        lastTick = timestamp;
        const updates = Math.floor(grid.length * 0.03 * glitchAmount);
        for (let i = 0; i < updates; i++) {
          const idx = Math.floor(Math.random() * grid.length);
          if (grid[idx]) {
            grid[idx].char = CHARS[Math.floor(Math.random() * CHARS.length)];
            grid[idx].color = glitchColors[Math.floor(Math.random() * glitchColors.length)];
            grid[idx].alpha = Math.random() * 0.8 + 0.2;
          }
        }
      }

      if (tearOffset > 0) tearOffset *= 0.88;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `500 ${fontSize}px 'JetBrains Mono', monospace`;

      for (let r = 0; r < rows; r++) {
        const rowShift = tearOffset > 0.5 && r % 3 === 0 ? Math.sin(r * flow) * tearOffset : 0;
        for (let c = 0; c < cols; c++) {
          const cell = grid[r * cols + c];
          if (!cell) continue;
          ctx.globalAlpha = cell.alpha;
          ctx.fillStyle = cell.color;
          ctx.fillText(cell.char, c * charWidth + rowShift, r * charHeight);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", initGrid);
      canvas.removeEventListener("click", handleClick);
    };
  }, [clickEffect, flow, glitchAmount, glitchColors, speed]);

  return (
    <div className={`pointer-events-none relative size-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
