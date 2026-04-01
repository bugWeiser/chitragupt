"use client";
import React from "react";

interface HighlighterProps {
  children: React.ReactNode;
  action?: "highlight" | "underline";
  color?: string;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#F09410",
  className = "",
}: HighlighterProps) {
  if (action === "underline") {
    return (
      <span
        className={`relative inline-block ${className}`}
        style={{
          backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
          backgroundSize: "100% 2px",
          backgroundPosition: "0 100%",
          backgroundRepeat: "no-repeat",
          paddingBottom: "1px",
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`relative inline px-0.5 rounded-sm ${className}`}
      style={{
        background: `${color}30`,
        boxShadow: `inset 0 -2px 0 ${color}60`,
      }}
    >
      {children}
    </span>
  );
}
