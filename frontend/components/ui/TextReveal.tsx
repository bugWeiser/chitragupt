"use client";
import React, { useRef, useState, useEffect } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
}

export function TextReveal({ children, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = children.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress 0→1 as element scrolls from bottom of viewport to top 30%
      const raw = (windowH - rect.top) / (windowH * 0.7);
      setProgress(Math.min(Math.max(raw, 0), 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const wordProgress = Math.min(
          Math.max((progress - (i / words.length) * 0.6) / 0.4, 0),
          1
        );
        return (
          <span
            key={i}
            style={{
              opacity: 0.15 + wordProgress * 0.85,
              filter: `blur(${(1 - wordProgress) * 4}px)`,
              transition: "opacity 0.1s, filter 0.1s",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
