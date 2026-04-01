"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export function BorderBeam({
  size = 120,
  duration = 8,
  colorFrom = "#F09410",
  colorTo = "#BC430D",
  className,
}: BorderBeamProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden", className)}
      aria-hidden
    >
      <div
        style={
          {
            "--size": size,
            "--duration": `${duration}s`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
          } as React.CSSProperties
        }
        className={cn(
          "absolute inset-0 rounded-[inherit]",
          "[background:linear-gradient(to_right,var(--color-from),var(--color-to))]",
          "[mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)]",
          "[mask-composite:xor]",
          "p-[1.5px]",
          "animate-border-beam"
        )}
      />
      {/* The animated glow dot */}
      <div
        style={
          {
            "--size":      `${size}px`,
            "--duration":  `${duration}s`,
            "--color-from": colorFrom,
            "--color-to":   colorTo,
          } as React.CSSProperties
        }
        className="absolute aspect-square animate-border-beam-glow"
      />
    </div>
  );
}

/* Add keyframes via a style tag injected once */
export function BorderBeamStyles() {
  return (
    <style>{`
      @keyframes border-beam-rotate {
        0%   { --angle: 0deg; }
        100% { --angle: 360deg; }
      }
      @property --angle {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
    `}</style>
  );
}
