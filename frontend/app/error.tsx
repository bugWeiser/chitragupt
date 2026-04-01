"use client";

import { useEffect } from "react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 py-40 max-w-[480px] mx-auto text-center animate-fade-in">
      <h1 className="text-[2rem] text-[#2A1A1E] mb-4" style={{ fontFamily: "var(--font-serif)", lineHeight: "1.2" }}>
        Something went wrong
      </h1>
      <p className="text-[1rem] text-[#5C4A42] mb-10 leading-relaxed font-sans">
        We are having trouble loading this page. Please try again in a moment.
      </p>
      
      <div className="flex flex-col items-center gap-6 w-full">
        <button onClick={() => reset()} className="btn-primary w-full sm:w-auto">
          Try again
        </button>
        <Link href="/" className="text-[0.9375rem] text-[#561C24] font-medium hover:underline underline-offset-4 decoration-[#561C24]/40 transition-all block py-2">
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
