"use client";

import React, { useEffect, useRef } from "react";

export interface GlobeProps {
  className?: string;
  accentColor?: string;
  secondaryColor?: string;
}

interface MarketHub {
  name: string;
  code: string;
  lat: number;
  lng: number;
  change: string;
  positive: boolean;
}

const MARKET_HUBS: MarketHub[] = [
  { name: "Mumbai NSE/BSE", code: "NIFTY 50", lat: 19.076, lng: 72.8777, change: "+1.42%", positive: true },
  { name: "New York NYSE", code: "S&P 500", lat: 40.7128, lng: -74.006, change: "+0.88%", positive: true },
  { name: "London LSE", code: "FTSE 100", lat: 51.5074, lng: -0.1278, change: "-0.24%", positive: false },
  { name: "Tokyo TSE", code: "NIKKEI 225", lat: 35.6762, lng: 139.6503, change: "+1.95%", positive: true },
  { name: "Singapore SGX", code: "STI", lat: 1.3521, lng: 103.8198, change: "+0.61%", positive: true },
  { name: "Frankfurt XETRA", code: "DAX", lat: 50.1109, lng: 8.6821, change: "+0.53%", positive: true },
  { name: "Hong Kong HKEX", code: "HSI", lat: 22.3193, lng: 114.1694, change: "-0.41%", positive: false },
];

export function Globe({
  className = "",
  accentColor = "#C98A4A",
  secondaryColor = "#F2D7B6",
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phi = 0.8;
    let theta = 0.25;
    let width = 520;
    let height = 520;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 520;
      height = rect.height || 520;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Precompute sphere lattice dots
    const dots: { lat: number; lng: number }[] = [];
    const latSteps = 28;
    for (let i = -latSteps / 2; i <= latSteps / 2; i++) {
      const lat = (i / (latSteps / 2)) * (Math.PI / 2);
      const circumference = Math.cos(lat);
      const lngDots = Math.max(6, Math.floor(circumference * 56));
      for (let j = 0; j < lngDots; j++) {
        const lng = (j / lngDots) * Math.PI * 2;
        dots.push({ lat, lng });
      }
    }

    const project = (lat: number, lng: number, radius: number, rotPhi: number, rotTheta: number) => {
      const x = Math.cos(lat) * Math.sin(lng + rotPhi);
      const y =
        Math.sin(lat) * Math.cos(rotTheta) -
        Math.cos(lat) * Math.cos(lng + rotPhi) * Math.sin(rotTheta);
      const z =
        Math.sin(lat) * Math.sin(rotTheta) +
        Math.cos(lat) * Math.cos(lng + rotPhi) * Math.cos(rotTheta);
      return {
        x: width / 2 + x * radius,
        y: height / 2 - y * radius,
        z,
      };
    };

    let tick = 0;

    const render = () => {
      tick += 0.02;
      if (pointerInteracting.current === null) {
        phi += 0.0045;
      }
      const activePhi = phi + pointerInteractionMovement.current;
      const radius = Math.min(width, height) * 0.39;

      ctx.clearRect(0, 0, width, height);

      // Ambient Bronze Halo
      const halo = ctx.createRadialGradient(
        width / 2,
        height / 2,
        radius * 0.3,
        width / 2,
        height / 2,
        radius * 1.28
      );
      halo.addColorStop(0, "rgba(201, 138, 74, 0.22)");
      halo.addColorStop(0.65, "rgba(90, 70, 62, 0.10)");
      halo.addColorStop(1, "rgba(9, 9, 9, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius * 1.28, 0, Math.PI * 2);
      ctx.fill();

      // Core Dark Sphere
      const sphereGrad = ctx.createRadialGradient(
        width / 2 - radius * 0.3,
        height / 2 - radius * 0.3,
        radius * 0.1,
        width / 2,
        height / 2,
        radius
      );
      sphereGrad.addColorStop(0, "rgba(33, 28, 25, 0.92)");
      sphereGrad.addColorStop(0.7, "rgba(17, 17, 17, 0.95)");
      sphereGrad.addColorStop(1, "rgba(9, 9, 9, 0.98)");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.fill();

      // Rim border
      ctx.strokeStyle = "rgba(201, 138, 74, 0.35)";
      ctx.lineWidth = 1.25;
      ctx.stroke();

      // Draw lattice dots
      for (const dot of dots) {
        const p = project(dot.lat, dot.lng, radius, activePhi, theta);
        if (p.z > -0.15) {
          const alpha = Math.max(0.08, (p.z + 0.2) * 0.55);
          ctx.fillStyle =
            p.z > 0.45
              ? `rgba(242, 215, 182, ${alpha})`
              : `rgba(201, 138, 74, ${alpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.z > 0.5 ? 1.7 : 1.15, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw arcs from Mumbai (index 0) to other visible hubs
      const mumbai = MARKET_HUBS[0];
      const mLat = (mumbai.lat * Math.PI) / 180;
      const mLng = (mumbai.lng * Math.PI) / 180;
      const mProj = project(mLat, mLng, radius, activePhi, theta);

      MARKET_HUBS.forEach((hub, idx) => {
        const hLat = (hub.lat * Math.PI) / 180;
        const hLng = (hub.lng * Math.PI) / 180;
        const hProj = project(hLat, hLng, radius, activePhi, theta);

        if (idx > 0 && (mProj.z > 0 || hProj.z > 0)) {
          const midX = (mProj.x + hProj.x) / 2;
          const midY = (mProj.y + hProj.y) / 2 - 28;
          ctx.strokeStyle = "rgba(216, 165, 109, 0.32)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(mProj.x, mProj.y);
          ctx.quadraticCurveTo(midX, midY, hProj.x, hProj.y);
          ctx.stroke();
        }

        if (hProj.z > 0.05) {
          const pulse = (Math.sin(tick * 2 + idx) + 1) * 4 + 4;
          ctx.strokeStyle = hub.positive
            ? "rgba(62, 220, 129, 0.45)"
            : "rgba(255, 92, 92, 0.45)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(hProj.x, hProj.y, pulse, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = hub.positive ? "#3EDC81" : accentColor;
          ctx.beginPath();
          ctx.arc(hProj.x, hProj.y, 3.5, 0, Math.PI * 2);
          ctx.fill();

          if (hProj.z > 0.38) {
            ctx.font = "600 10px 'JetBrains Mono', monospace";
            ctx.fillStyle = secondaryColor;
            ctx.fillText(`${hub.code} ${hub.change}`, hProj.x + 8, hProj.y + 3);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [accentColor, secondaryColor]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current * 200;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        className="size-full max-h-[480px] max-w-[480px] cursor-grab transition-opacity duration-500"
      />
    </div>
  );
}
