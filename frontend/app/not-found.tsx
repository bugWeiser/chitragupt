import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 py-40 max-w-[480px] mx-auto text-center animate-fade-in">
      <h1 className="text-[2.5rem] text-[#2A1A1E] mb-4" style={{ fontFamily: "var(--font-serif)", lineHeight: "1.15" }}>
        Page not found
      </h1>
      <p className="text-[1rem] text-[#5C4A42] mb-10 leading-relaxed font-sans">
        The page you are looking for does not exist or has been moved.
      </p>
      
      <div className="flex flex-col items-center gap-6 w-full">
        <Link href="/" className="w-full">
          <InteractiveHoverButton variant="crimson" className="w-full">
            Go to homepage
          </InteractiveHoverButton>
        </Link>
        <Link href="/issues" className="text-[0.9375rem] text-[#561C24] font-medium hover:underline underline-offset-4 decoration-[#561C24]/40 transition-all block py-2">
          Browse legal categories
        </Link>
      </div>
    </div>
  );
}
