import type { Metadata } from "next";
import "@/styles/globals.css";
import { AskAISelectionPopup } from "@/components/AskAISelectionPopup";

export const metadata: Metadata = {
  title: "INVESTRA | AI-Powered Stock Market Learning & Real-Life Financial Ecosystem",
  description:
    "Learn the stock market like the real world. Real-Life Salary Mode, Virtual Bank, Historical Crash Replay Engine, Bloomberg AI Mentor, and Multi-Broker UI Themes.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "INVESTRA | Stock Market Learning OS",
    description: "Simulate real salary budgeting, trade 2,640 live NSE stocks, and test strategies in crash replay flight simulators.",
    images: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#090909] text-[#FAF7F5] selection:bg-[#C98A4A]/30 selection:text-[#F2D7B6]">
        {/* Global Ask-AI on Highlighted Text Popup (Perplexity / Notion AI style) */}
        <AskAISelectionPopup />
        {children}
      </body>
    </html>
  );
}
