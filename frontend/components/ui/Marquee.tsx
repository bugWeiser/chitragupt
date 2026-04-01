"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  duration?: number; // seconds
}

export function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  className,
  duration = 30,
}: MarqueeProps) {
  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      {/* Two copies so the scroll is seamless */}
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 gap-4",
            "animate-marquee",
            reverse && "animate-marquee-reverse",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
