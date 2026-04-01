"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "crimson" | "amber" | "sand";
}

export function InteractiveHoverButton({
  children,
  variant = "crimson",
  className,
  ...props
}: InteractiveHoverButtonProps) {
  const baseTrack =
    variant === "amber"
      ? "bg-amber"
      : variant === "sand"
      ? "bg-sand"
      : "bg-crimson";

  const baseText =
    variant === "amber"
      ? "text-darkbrown group-hover:text-darkbrown"
      : variant === "sand"
      ? "text-crimson group-hover:text-crimson"
      : "text-sand group-hover:text-sand";

  return (
    <button
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[8px] border",
        variant === "crimson" && "border-burgundy bg-transparent text-burgundy",
        variant === "amber"   && "border-amber bg-transparent text-amber",
        variant === "sand"    && "border-[#C7B7A3] bg-transparent text-[#5C4A42]",
        "px-7 py-3 font-semibold text-sm tracking-wide transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* sliding track */}
      <div
        className={cn(
          "absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full",
          baseTrack
        )}
      />
      {/* dot indicator */}
      <div
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full transition-all duration-300",
          "group-hover:scale-[100] group-hover:opacity-0",
          variant === "crimson" && "bg-burgundy",
          variant === "amber"   && "bg-amber",
          variant === "sand"    && "bg-[#5C4A42]"
        )}
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-300",
          baseText
        )}
      >
        {children}
      </span>
    </button>
  );
}
