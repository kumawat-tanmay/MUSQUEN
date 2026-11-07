"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  pullStrength?: number; // 0 to 1, default 0.35
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  pullStrength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      // Initialize quickTo for buttery 60+ FPS interpolation
      xTo.current = gsap.quickTo(containerRef.current, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(containerRef.current, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !xTo.current || !yTo.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * pullStrength;
    const deltaY = (clientY - centerY) * pullStrength;

    xTo.current(deltaX);
    yTo.current(deltaY);
  };

  const handleMouseLeave = () => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block cursor-pointer will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

