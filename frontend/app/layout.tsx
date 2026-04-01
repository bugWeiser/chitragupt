import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import EmergencyMode from "@/components/ui/EmergencyMode";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { CaseProvider } from "@/context/CaseContext";
import { LanguageProvider } from "@/context/LanguageContext";
import AiChatWidget from "@/components/AiChatWidget";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chitragupt — India's Legal First-Response System",
  description: "AI-powered legal aid for every Indian citizen. Get instant clarity. Know your rights. Take action.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col antialiased`}>
        <LanguageProvider>
          <CaseProvider>
            <a href="#main-content" className="skip-to-content">Skip to content</a>
            <Navbar />
            <main id="main-content" role="main" className="flex-1 flex flex-col relative overflow-x-hidden">
              {children}
            </main>
            <AiChatWidget />
            <EmergencyMode />
            <ScrollToTop />
            <Footer />
          </CaseProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
