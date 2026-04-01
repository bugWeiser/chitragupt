"use client";
import React, { useEffect, useRef, useState } from "react";

interface TypingAnimationProps {
  children: string;
  className?: string;
  speed?: number; // ms per char
  delay?: number; // ms before starting
}

export function TypingAnimation({
  children,
  className = "",
  speed = 50,
  delay = 0,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(start);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < children.length) {
        setDisplayed(children.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, children, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-current align-middle ml-[1px] animate-[blink_1s_step-end_infinite]" />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
