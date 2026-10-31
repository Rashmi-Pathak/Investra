"use client";

import React, { useEffect, useRef } from "react";

export interface ShapeGridProps {
  shape?: "square" | "hexagon" | "circle";
  direction?: "diagonal" | "right" | "left" | "up" | "down";
  lineColor?: string;
  hoverColor?: string;
  hoverFillColor?: string;
  fillOpacity?: number;
  cellSize?: number;
  speed?: number;
  tiltX?: number;
  tiltY?: number;
  rainbow?: boolean;
  className?: string;
}

export default function ShapeGrid({
  shape = "square",
  direction = "diagonal",
  lineColor = "#382B27",
  hoverColor = "#C98A4A",
  hoverFillColor = "#F2D7B6",
  fillOpacity = 0.15,
  cellSize = 40,
  speed = 0.5,
  tiltX = 0,
  tiltY = 0,
  rainbow = false,
  className = "",
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offsetX = 0;
    let offsetY = 0;
    const mouse = { x: -9999, y: -9999 };
    const cellTrail = new Map<string, number>();

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 800;
      canvas.height = rect.height || 600;
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      if (direction === "diagonal") {
        offsetX = (offsetX + speed) % cellSize;
        offsetY = (offsetY + speed) % cellSize;
      } else if (direction === "right") {
        offsetX = (offsetX + speed) % cellSize;
      } else if (direction === "down") {
        offsetY = (offsetY + speed) % cellSize;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / cellSize) + 2;
      const rows = Math.ceil(canvas.height / cellSize) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * cellSize + offsetX;
          const y = r * cellSize + offsetY;
          const key = `${r}-${c}`;

          const isHovered =
            mouse.x >= x &&
            mouse.x <= x + cellSize &&
            mouse.y >= y &&
            mouse.y <= y + cellSize;

          if (isHovered) {
            cellTrail.set(key, 1);
          }

          const intensity = cellTrail.get(key) || 0;
          if (intensity > 0) {
            ctx.save();
            ctx.globalAlpha = intensity * fillOpacity;
            ctx.fillStyle = rainbow
              ? `hsl(${(c * 25 + r * 25) % 360}, 70%, 60%)`
              : hoverFillColor;
            if (shape === "circle") {
              ctx.beginPath();
              ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.45, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillRect(x, y, cellSize, cellSize);
            }
            ctx.restore();

            const next = intensity - 0.025;
            if (next <= 0) cellTrail.delete(key);
            else cellTrail.set(key, next);
          }

          ctx.strokeStyle = intensity > 0.2 ? hoverColor : lineColor;
          ctx.lineWidth = intensity > 0.2 ? 1.2 : 0.75;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [cellSize, direction, fillOpacity, hoverColor, hoverFillColor, lineColor, rainbow, shape, speed]);

  return (
    <div
      className={`pointer-events-auto relative size-full overflow-hidden ${className}`}
      style={{
        transform: tiltX || tiltY ? `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` : undefined,
      }}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
