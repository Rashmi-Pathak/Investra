"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.2,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${
          glare.active ? "1.02, 1.02, 1.02" : "1, 1, 1"
        })`,
        transition: glare.active ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Spotlight Glare */}
      {glare.active && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(242, 215, 182, ${glareOpacity}), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
