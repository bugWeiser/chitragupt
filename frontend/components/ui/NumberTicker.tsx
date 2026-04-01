"use client";
import React, { useEffect, useRef, useState } from "react";

interface NumberTickerProps {
  value: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimalPlaces?: number;
  duration?: number; // ms
}

export function NumberTicker({
  value,
  className = "",
  suffix = "",
  prefix = "",
  decimalPlaces = 0,
  duration = 1800,
}: NumberTickerProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(eased * value);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {current.toFixed(decimalPlaces)}
      {suffix}
    </span>
  );
}
