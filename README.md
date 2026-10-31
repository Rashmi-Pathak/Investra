# INVESTRA — Next-Generation Stock Market Learning OS

> **The Anti-Gambling Stock Simulator Grounded in Real-Life Salaries & Flight-Ready Drills**

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Highcharts](https://img.shields.io/badge/Highcharts-Stock%20Engine-black?style=flat)](https://www.highcharts.com/)

---

## 🏛️ Overview

Traditional stock simulators give beginners **₹10,00,000 in fake money**, encouraging reckless intraday gambles that ruin them in real life. **Investra** replaces fake paper billions with an authentic **Real-Life Salary & Disciplined SIP Engine**, preparing investors across **4 authentic broker terminals** before they risk real capital.

---

## ⚡ Core Pillars

### 1. 💼 Real-Life Salary Mode (Anti-Gambling Protocol)
- Grounded in your actual monthly earnings (e.g. ₹45,000 salary - ₹30,000 expenses = ₹15,000 surplus).
- Simulates realistic ₹5,000 monthly SIP allocations.
- Dynamic loss-aversion discipline: Every stop-out affects your real monthly surplus.
- Optional ₹1,00,000 Fixed Cash mode for beginners.

### 2. 🖥️ 4 Interchangeable Broker Terminal Environments
Seamlessly switch between broker presets with live unified database synchronization:
- **Investra Terminal (Native)**: Signature luxury obsidian (`#090909`) & bronze (`#C98A4A`) theme with crisp 0px corners.
- **Zerodha Kite**: Exact 1–7 Marketwatch tabs, 5-level Market Depth, P&L color bands, and Console view.
- **Groww**: Clean modern white & emerald (`#00d09c`) interface, sector filters, market cap segmentation, and stocks in news.
- **Upstox Pro**: Professional violet (`#6b21a8`) workspace, Open Interest (OI) Call vs Put strike analyzer, and Positions tracking.

### 3. 🧪 7 Interactive Financial Flight Simulator Labs
Hands-on financial simulators to build real intuition before trading:
1. **Psychology Lab**: Real-Life Salary vs Fake ₹10L Gambles (50 Case Studies).
2. **Candlesticks Lab**: Volume & Institutional Absorption, Hammer signals, Lower-Wick tests (50 Case Studies).
3. **Forensics Lab**: Spotting P/E Value Traps, Negative Cash Flow, and Promoter Pledges (50 Case Studies).
4. **Order Books Lab**: Market vs Limit, Bid-Ask Spread, and Slippage Economics (50 Case Studies).
5. **Earnings Call Lab**: Live Voice Audio playback, CEO euphemism traps, and transcript red flags (50 Con-Calls).
6. **Portfolio Doctor Mode**: Diagnosing and remediating over-concentrated, unhedged portfolios (50 Fix Cases).
7. **9:15 AM Opening Bell Drill**: High-volatility L2 order-book slippage simulation (50 L2 Drills).
*Total: 350 curated, real-market questions & case studies.*

### 4. 🧠 Investra Global AI Mentor & Selection Intelligence
- **Persistent AI Mentor**: Floating voice-enabled coach powered by Web Speech API with real-time portfolio and salary context.
- **Ask AI on Selection**: Highlight any text on the website to open a centered, responsive financial explainer modal.
- **Pre-Trade Risk Shield**: Evaluates every order for FOMO, capital risk percentage (<15% cap), and stop-loss distance.

### 5. ⏳ COVID Crash Replay Engine (Feb–Nov 2020)
- Step through the 38% market crash candle-by-candle.
- Test whether your psychology would panic-sell at the 7,610 bottom or execute disciplined SIP tranches into recovery.

### 6. 📱 100% Mobile Responsive Architecture
- Native mobile bottom navigation bars across all broker environments.
- Mobile slide-up watchlist drawers with instant search across all 2,640 NSE equities.
- Sticky 1-tap `[ BUY ]` and `[ SELL ]` action bars on all company pages.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15.1.3](https://nextjs.org/) (App Router, Server Components)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/) (Strict Zero-Error Typing)
- **Monorepo**: [Turborepo 2](https://turbo.build/repo)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Charts**: [Highcharts](https://www.highcharts.com/) (Interactive Candlesticks, OHLCV, Volume)
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand) with localStorage persistence
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio & Voice**: Web Speech API (SpeechSynthesis & SpeechRecognition)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm 10.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Rashmi-Pathak/Investra.git
cd Investra

# Install dependencies
npm install

# Start local development server
npm run dev:web
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Verify TypeScript compilation
npx tsc --project apps/web/tsconfig.json --noEmit

# Build production bundle
npm run build --workspace=@investra/web
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
