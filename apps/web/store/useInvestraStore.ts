"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BrokerPresetId, brokerThemePresets } from "@investra/theme";
import { findNseCompany } from "@/lib/nseUniverse";

export interface StockItem {
  symbol: string;
  name: string;
  exchange: "NSE" | "BSE" | "NASDAQ";
  sector: string;
  price: number;
  changePercent: number;
  pe: number;
  pb: number;
  roe: number;
  marketCap: string;
  volume: string;
  high52: number;
  low52: number;
  aiSentiment: "BULLISH" | "NEUTRAL" | "CAUTIOUS";
  aiSummary: string;
  candles: { time: string; open: number; high: number; low: number; close: number; volume: number }[];
}

export interface HoldingItem {
  symbol: string;
  name: string;
  sector: string;
  qty: number;
  avgPrice: number;
  ltp: number;
}

export interface OrderRecord {
  id: string;
  time: string;
  symbol: string;
  name: string;
  orderType: "MARKET" | "LIMIT";
  productType: "CNC" | "MIS";
  side: "BUY" | "SELL";
  qty: number;
  executedQty: number;
  price: number;
  status: "FILLED" | "OPEN" | "PARTIALLY_FILLED" | "CANCELLED";
}

export interface BankTx {
  id: string;
  title: string;
  category: "SALARY" | "EXPENSE" | "SIP_TRANSFER" | "DIVIDEND";
  amount: number;
  type: "CREDIT" | "DEBIT";
  date: string;
}

export interface TradeCoachLog {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  qty: number;
  price: number;
  stopLoss?: number;
  psychologyBadge: "DISCIPLINED" | "FOMO_WARNING" | "NO_STOP_LOSS" | "HIGH_RISK";
  coachFeedback: string;
  timestamp: string;
}

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  contextBadge?: string;
  timestamp: string;
}

export interface AuthUser {
  name: string;
  email: string;
  level: number;
}

const INITIAL_STOCKS: StockItem[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Limited",
    exchange: "NSE",
    sector: "Energy",
    price: 2742.5,
    changePercent: 1.2,
    pe: 26.8,
    pb: 2.4,
    roe: 9.8,
    marketCap: "₹20.18L Cr",
    volume: "6.85M",
    high52: 3217.6,
    low52: 2220.3,
    aiSentiment: "BULLISH",
    aiSummary:
      "Jio ARPU expansion and New Energy gigafactory milestones are driving strong FII inflows above the 50-day EMA.",
    candles: [
      { time: "09:15", open: 2710, high: 2732, low: 2705, close: 2728, volume: 510 },
      { time: "10:15", open: 2728, high: 2744, low: 2720, close: 2736, volume: 480 },
      { time: "11:15", open: 2736, high: 2752, low: 2731, close: 2742.5, volume: 620 },
    ],
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Limited",
    exchange: "NSE",
    sector: "IT",
    price: 3912.8,
    changePercent: 0.85,
    pe: 29.4,
    pb: 14.8,
    roe: 51.2,
    marketCap: "₹14.94L Cr",
    volume: "2.41M",
    high52: 4592.0,
    low52: 3590.0,
    aiSentiment: "BULLISH",
    aiSummary:
      "Order book TCV at $11.2B and 51% ROE keep institutional accumulation strong across BFSI deals.",
    candles: [
      { time: "09:15", open: 3880, high: 3905, low: 3875, close: 3895, volume: 220 },
      { time: "10:15", open: 3895, high: 3920, low: 3890, close: 3912.8, volume: 310 },
    ],
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    exchange: "NSE",
    sector: "IT",
    price: 1845.2,
    changePercent: -0.92,
    pe: 27.6,
    pb: 8.9,
    roe: 31.8,
    marketCap: "₹7.85L Cr",
    volume: "4.6M",
    high52: 1975.0,
    low52: 1358.0,
    aiSentiment: "NEUTRAL",
    aiSummary:
      "GenAI deal pipeline expanding across BFSI clients; upward FY revenue guidance revision supports valuation.",
    candles: [
      { time: "09:15", open: 1860, high: 1865, low: 1840, close: 1845.2, volume: 410 },
    ],
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Limited",
    exchange: "NSE",
    sector: "Banking",
    price: 1682.4,
    changePercent: 0.65,
    pe: 19.2,
    pb: 2.8,
    roe: 16.9,
    marketCap: "₹13.28L Cr",
    volume: "11.2M",
    high52: 1794.0,
    low52: 1363.5,
    aiSentiment: "BULLISH",
    aiSummary:
      "Trading at a historical P/B discount of 2.8x vs 10-year mean of 3.8x while deposit growth outpaces credit growth.",
    candles: [
      { time: "09:15", open: 1670, high: 1688, low: 1665, close: 1682.4, volume: 780 },
    ],
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Limited",
    exchange: "NSE",
    sector: "Banking",
    price: 1248.9,
    changePercent: 1.1,
    pe: 18.4,
    pb: 3.1,
    roe: 18.2,
    marketCap: "₹8.82L Cr",
    volume: "9.4M",
    high52: 1362.0,
    low52: 985.0,
    aiSentiment: "BULLISH",
    aiSummary:
      "Best-in-class retail NIM stability and low gross NPA ratios continue to attract domestic mutual fund flows.",
    candles: [
      { time: "09:15", open: 1235, high: 1252, low: 1232, close: 1248.9, volume: 640 },
    ],
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    exchange: "NSE",
    sector: "Banking",
    price: 812.3,
    changePercent: -2.15,
    pe: 11.2,
    pb: 1.7,
    roe: 19.4,
    marketCap: "₹7.24L Cr",
    volume: "15.1M",
    high52: 912.0,
    low52: 600.0,
    aiSentiment: "NEUTRAL",
    aiSummary:
      "PSU banking bellwether consolidating near 50-DMA support with healthy credit growth.",
    candles: [
      { time: "09:15", open: 828, high: 830, low: 810, close: 812.3, volume: 910 },
    ],
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Limited",
    exchange: "NSE",
    sector: "Telecom",
    price: 1598.6,
    changePercent: 2.91,
    pe: 48.2,
    pb: 9.4,
    roe: 22.1,
    marketCap: "₹9.12L Cr",
    volume: "5.2M",
    high52: 1778.0,
    low52: 1120.0,
    aiSentiment: "BULLISH",
    aiSummary:
      "Tariff repair and 5G monetization driving strong free cash flow deleveraging.",
    candles: [
      { time: "09:15", open: 1555, high: 1605, low: 1550, close: 1598.6, volume: 530 },
    ],
  },
  {
    symbol: "JIOFIN",
    name: "Jio Financial Services Limited",
    exchange: "NSE",
    sector: "Financial Services",
    price: 348.7,
    changePercent: 4.82,
    pe: 92.0,
    pb: 1.6,
    roe: 4.5,
    marketCap: "₹2.21L Cr",
    volume: "28.4M",
    high52: 394.7,
    low52: 204.0,
    aiSentiment: "BULLISH",
    aiSummary:
      "Asset management JV and digital lending product rollout driving strong breakout volume.",
    candles: [
      { time: "09:15", open: 332, high: 351, low: 330, close: 348.7, volume: 1240 },
    ],
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Limited",
    exchange: "NSE",
    sector: "Automobile",
    price: 965.4,
    changePercent: 1.8,
    pe: 11.8,
    pb: 3.6,
    roe: 28.4,
    marketCap: "₹3.55L Cr",
    volume: "12.8M",
    high52: 1179.0,
    low52: 718.0,
    aiSentiment: "BULLISH",
    aiSummary:
      "JLR debt reduction and domestic EV leadership provide strong fundamental cushion.",
    candles: [
      { time: "09:15", open: 948, high: 970, low: 945, close: 965.4, volume: 820 },
    ],
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India Limited",
    exchange: "NSE",
    sector: "Automobile",
    price: 12100.0,
    changePercent: -0.75,
    pe: 26.4,
    pb: 4.2,
    roe: 16.8,
    marketCap: "₹3.80L Cr",
    volume: "0.85M",
    high52: 13680.0,
    low52: 9800.0,
    aiSentiment: "NEUTRAL",
    aiSummary:
      "Hybrid & SUV portfolio mix supporting operating margins despite rural demand moderation.",
    candles: [
      { time: "09:15", open: 12190, high: 12210, low: 12080, close: 12100.0, volume: 190 },
    ],
  },
];

interface InvestraState {
  // Auth & Registration Flow
  user: AuthUser | null;
  isAuthenticated: boolean;
  isNewRegistration: boolean;
  loginUser: (email: string, name?: string) => void;
  registerUser: (email: string, name: string) => void;
  completeOnboarding: (selectedMode?: "REAL_LIFE" | "BEGINNER") => void;
  logoutUser: () => void;

  // Wallet Mode: "BEGINNER" = Fixed ₹1,00,000 Cash Mode (no adding cash) | "REAL_LIFE" = Salary SIP Mode (add once/month from salary)
  financialMode: "REAL_LIFE" | "BEGINNER";
  brokerPreset: BrokerPresetId;
  usdInrRate: number;
  liveFeedStatus: string;
  setFinancialMode: (mode: "REAL_LIFE" | "BEGINNER") => void;
  setBrokerPreset: (preset: BrokerPresetId) => void;
  syncLiveMarketData: (symbol?: string) => Promise<void>;

  salary: number;
  expenses: {
    rent: number;
    food: number;
    travel: number;
    emi: number;
    others: number;
  };
  monthlySip: number;
  bankBalance: number;
  brokerWallet: number;
  beginnerWallet: number;
  simulatedMonth: number;
  xp: number;
  streakDays: number;
  emotionalScore: number;
  bankTransactions: BankTx[];
  updateSalaryAndSip: (salary: number, monthlySip: number) => void;
  updateExpense: (key: "rent" | "food" | "travel" | "emi" | "others", value: number) => void;
  simulateMonthCycle: () => void;
  transferToBroker: (amount: number) => void;

  stocks: StockItem[];
  selectedSymbol: string;
  setSelectedSymbol: (symbol: string) => void;
  holdings: HoldingItem[];
  orders: OrderRecord[];
  tradeCoachLogs: TradeCoachLog[];
  executePaperOrder: (params: {
    symbol: string;
    side: "BUY" | "SELL";
    qty: number;
    priceOverride?: number;
    stopLoss?: number;
    orderType?: "MARKET" | "LIMIT";
    productType?: string;
  }) => void;
  executeVirtualOrder: (params: {
    symbol: string;
    side: "BUY" | "SELL";
    qty: number;
    price: number;
    orderType?: "MARKET" | "LIMIT";
    productType?: string;
  }) => void;
  cancelOrder: (orderId: string) => void;
  fillOpenOrder: (orderId: string) => void;
  addXp: (points: number) => void;

  aiMessages: AIChatMessage[];
  askAITutor: (prompt: string, contextBadge?: string) => Promise<void>;
}

export const useInvestraStore = create<InvestraState>()(
  persist(
    (set, get) => ({
  user: {
    name: "Dhanesh",
    email: "dhanesh@investra.ai",
    level: 1,
  },
  isAuthenticated: true,
  isNewRegistration: false,

  loginUser: (email, name) => {
    const cleanName = name || email.split("@")[0] || "Investor";
    set({
      user: { name: cleanName, email, level: 1 },
      isAuthenticated: true,
      isNewRegistration: false,
    });
  },

  registerUser: (email, name) => {
    const cleanName = name || email.split("@")[0] || "New Investor";
    // Fresh account state: 0 holdings, 0 orders, 0 trading score, ₹1,00,000 in Cash mode wallet!
    set({
      user: { name: cleanName, email, level: 1 },
      isAuthenticated: true,
      isNewRegistration: true,
      financialMode: "BEGINNER",
      beginnerWallet: 100000,
      brokerWallet: 5000,
      bankBalance: 15000,
      simulatedMonth: 1,
      holdings: [],
      orders: [],
      tradeCoachLogs: [],
      emotionalScore: 0,
      xp: 0,
      streakDays: 1,
    });
  },

  completeOnboarding: (selectedMode) => {
    const state = get();
    const mode = selectedMode || state.financialMode;
    const totalExpenses =
      state.expenses.rent +
      state.expenses.food +
      state.expenses.travel +
      state.expenses.emi +
      state.expenses.others;
    const netSavings = Math.max(0, state.salary - totalExpenses);
    const firstMonthSip = Math.min(state.monthlySip, Math.max(1000, netSavings));

    set({
      isNewRegistration: false,
      financialMode: mode,
      beginnerWallet: 100000,
      brokerWallet: firstMonthSip,
      bankBalance: Math.max(0, netSavings - firstMonthSip),
      holdings: [],
      orders: [],
      tradeCoachLogs: [],
      emotionalScore: 0,
    });
  },

  logoutUser: () => {
    set({
      user: null,
      isAuthenticated: false,
      isNewRegistration: false,
    });
  },

  // Default to ₹1,00,000 Cash Mode ("BEGINNER") with 0 holdings so new users see only ₹1,00,000 in wallet
  financialMode: "BEGINNER",
  brokerPreset: "original",
  usdInrRate: 84.12,
  liveFeedStatus: "NSE LIVE",
  setFinancialMode: (financialMode) => set({ financialMode }),
  setBrokerPreset: (brokerPreset) => {
    if (typeof document !== "undefined") {
      const preset = brokerThemePresets[brokerPreset];
      if (preset) {
        document.documentElement.style.setProperty("--investra-accent", preset.accent);
        document.documentElement.style.setProperty("--investra-accent-secondary", preset.accentSecondary);
        document.documentElement.style.setProperty("--investra-surface", preset.surface);
      }
    }
    set({ brokerPreset });
  },

  syncLiveMarketData: async (symbol = "RELIANCE") => {
    try {
      const res = await fetch(`/api/market/live?symbol=${encodeURIComponent(symbol)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.usdInr) {
        set({ usdInrRate: data.usdInr });
      }
    } catch {
      // Retain cached quote
    }
  },

  salary: 50000,
  expenses: {
    rent: 12000,
    food: 5000,
    travel: 3000,
    emi: 6000,
    others: 4000,
  },
  monthlySip: 5000,
  bankBalance: 15000,
  brokerWallet: 5000,
  beginnerWallet: 100000,
  simulatedMonth: 1,
  xp: 0,
  streakDays: 1,
  emotionalScore: 0,
  bankTransactions: [
    {
      id: "tx-1",
      title: "Month 1 Salary Credited",
      category: "SALARY",
      amount: 50000,
      type: "CREDIT",
      date: "Month 1 • 09:00 AM",
    },
    {
      id: "tx-2",
      title: "Month 1 Living Bills Deducted (Rent, Food, Travel, EMI, Misc)",
      category: "EXPENSE",
      amount: 30000,
      type: "DEBIT",
      date: "Month 1 • 10:15 AM",
    },
    {
      id: "tx-3",
      title: "Month 1 Monthly SIP Routed to Broker Wallet",
      category: "SIP_TRANSFER",
      amount: 5000,
      type: "DEBIT",
      date: "Month 1 • 09:15 AM",
    },
  ],

  updateSalaryAndSip: (salary, monthlySip) => set({ salary, monthlySip }),
  updateExpense: (key, value) =>
    set((state) => ({
      expenses: { ...state.expenses, [key]: value },
    })),

  simulateMonthCycle: () => {
    const {
      financialMode,
      salary,
      expenses,
      monthlySip,
      bankBalance,
      brokerWallet,
      simulatedMonth,
      xp,
    } = get();

    // Rule: In ₹1,00,000 Cash Mode ("BEGINNER"), user CANNOT add money to the broker wallet!
    if (financialMode === "BEGINNER") {
      return;
    }

    const nextMonth = simulatedMonth + 1;
    const totalExpenses =
      expenses.rent + expenses.food + expenses.travel + expenses.emi + expenses.others;
    const netSavings = Math.max(0, salary - totalExpenses);
    const actualSip = Math.min(monthlySip, netSavings);
    const remainingToBank = netSavings - actualSip;

    const nowLabel = `Month ${nextMonth}`;
    const newTxs: BankTx[] = [
      {
        id: `tx-sip-${Date.now()}`,
        title: `${nowLabel} Salary SIP Credited to Broker Wallet (1x Monthly Limit)`,
        category: "SIP_TRANSFER",
        amount: actualSip,
        type: "DEBIT",
        date: `${nowLabel} • Auto-SIP`,
      },
      {
        id: `tx-exp-${Date.now() - 1}`,
        title: `${nowLabel} Living Bills Deducted (Rent ₹${expenses.rent.toLocaleString("en-IN")} + Bills)`,
        category: "EXPENSE",
        amount: totalExpenses,
        type: "DEBIT",
        date: `${nowLabel} • Bill Cycle`,
      },
      {
        id: `tx-sal-${Date.now() - 2}`,
        title: `${nowLabel} Salary Credited`,
        category: "SALARY",
        amount: salary,
        type: "CREDIT",
        date: `${nowLabel} • Payroll`,
      },
    ];

    set((state) => ({
      simulatedMonth: nextMonth,
      bankBalance: bankBalance + remainingToBank,
      brokerWallet: brokerWallet + actualSip,
      xp: xp + 100,
      streakDays: state.streakDays + 1,
      bankTransactions: [...newTxs, ...state.bankTransactions.slice(0, 12)],
    }));
  },

  transferToBroker: (amount) => {
    const { financialMode, bankBalance, brokerWallet } = get();
    // Rule: In ₹1,00,000 Cash Mode ("BEGINNER"), user CANNOT add extra cash to the broker!
    if (financialMode === "BEGINNER") return;
    if (amount <= 0 || amount > bankBalance) return;
    set((state) => ({
      bankBalance: bankBalance - amount,
      brokerWallet: brokerWallet + amount,
      bankTransactions: [
        {
          id: `tx-manual-${Date.now()}`,
          title: "Savings Surplus Transfer to Broker Wallet",
          category: "SIP_TRANSFER",
          amount,
          type: "DEBIT",
          date: `Month ${state.simulatedMonth}`,
        },
        ...state.bankTransactions,
      ],
    }));
  },

  stocks: INITIAL_STOCKS,
  selectedSymbol: "RELIANCE",
  setSelectedSymbol: (selectedSymbol) => set({ selectedSymbol }),

  // Fresh start: Empty holdings, empty orders, empty coach logs until the user actually trades!
  holdings: [],
  orders: [],
  tradeCoachLogs: [],

  executePaperOrder: (params: any) => {
    const symbol = params.symbol;
    const side: "BUY" | "SELL" = params.side || "BUY";
    const qty = Number(params.qty ?? params.quantity ?? 1);
    const execPriceOverride = params.priceOverride ?? params.price;
    const stopLoss = params.stopLoss;
    const orderType: "MARKET" | "LIMIT" = params.orderType || "MARKET";
    const rawProduct = String(params.productType || params.product || "CNC");
    const cleanProduct: "CNC" | "MIS" = rawProduct.toUpperCase().includes("MIS") ? "MIS" : "CNC";

    const state = get();
    const matchedStock = state.stocks.find((s) => s.symbol === symbol);
    const nseRow = findNseCompany(symbol);
    const execPrice = Number(execPriceOverride || matchedStock?.price || nseRow.price || 100);
    const companyName = matchedStock?.name || nseRow.name || symbol;
    const sector = matchedStock?.sector || nseRow.sector || "Equities";

    if (qty <= 0) return;

    const orderValue = Number((execPrice * qty).toFixed(2));
    const activeWallet =
      state.financialMode === "REAL_LIFE" ? state.brokerWallet : state.beginnerWallet;

    if (side === "BUY" && orderValue > activeWallet) {
      if (typeof window !== "undefined") {
        alert(
          `Insufficient funds: Required ₹${orderValue.toLocaleString(
            "en-IN"
          )} exceeds available balance ₹${activeWallet.toLocaleString("en-IN")}`
        );
      }
      return;
    }

    // Check if selling shares not owned
    const existingIdx = state.holdings.findIndex((h) => h.symbol === symbol);
    if (side === "SELL" && (existingIdx < 0 || state.holdings[existingIdx].qty < qty)) {
      if (typeof window !== "undefined") {
        alert(
          `Cannot sell ${qty} shares of ${symbol}: You own ${
            existingIdx >= 0 ? state.holdings[existingIdx].qty : 0
          } shares.`
        );
      }
      return;
    }

    const nowTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newOrderRecord: OrderRecord = {
      id: `ord-${Date.now()}`,
      time: nowTime,
      symbol,
      name: companyName,
      orderType,
      productType: cleanProduct,
      side,
      qty,
      executedQty: qty,
      price: execPrice,
      status: "FILLED",
    };

    let psychologyBadge: TradeCoachLog["psychologyBadge"] = "DISCIPLINED";
    let coachFeedback = `Disciplined ${side} on ${symbol}: Position represents ${Math.round(
      (orderValue / Math.max(activeWallet, 1)) * 100
    )}% of available capital with pre-trade risk verification.`;

    if (!stopLoss && side === "BUY") {
      psychologyBadge = "NO_STOP_LOSS";
      coachFeedback = `AI Coach Warning: You confirmed ${qty} shares of ${symbol} at ₹${execPrice.toLocaleString(
        "en-IN"
      )} without a Stop-Loss. Always protect your capital.`;
    } else if (orderValue > activeWallet * 0.3 && side === "BUY") {
      psychologyBadge = "HIGH_RISK";
      coachFeedback = `Concentration Alert: Deploying ${Math.round(
        (orderValue / activeWallet) * 100
      )}% of your wallet in a single trade exceeds the 20% rule.`;
    }

    const updatedHoldings = [...state.holdings];

    if (side === "BUY") {
      if (existingIdx >= 0) {
        const existing = updatedHoldings[existingIdx];
        const totalQty = existing.qty + qty;
        const newAvg =
          (existing.qty * existing.avgPrice + qty * execPrice) / totalQty;
        updatedHoldings[existingIdx] = {
          ...existing,
          qty: totalQty,
          avgPrice: Number(newAvg.toFixed(2)),
          ltp: execPrice,
        };
      } else {
        updatedHoldings.push({
          symbol,
          name: companyName,
          sector,
          qty,
          avgPrice: execPrice,
          ltp: execPrice,
        });
      }
    } else if (side === "SELL" && existingIdx >= 0) {
      const existing = updatedHoldings[existingIdx];
      if (existing.qty <= qty) {
        updatedHoldings.splice(existingIdx, 1);
      } else {
        updatedHoldings[existingIdx] = {
          ...existing,
          qty: existing.qty - qty,
        };
      }
    }

    const walletDelta = side === "BUY" ? -orderValue : orderValue;
    const baseScore = state.emotionalScore === 0 ? 85 : state.emotionalScore;

    const newBrokerWallet =
      state.financialMode === "REAL_LIFE"
        ? Math.max(0, Number((state.brokerWallet + walletDelta).toFixed(2)))
        : state.brokerWallet;
    const newBeginnerWallet =
      state.financialMode === "BEGINNER"
        ? Math.max(0, Number((state.beginnerWallet + walletDelta).toFixed(2)))
        : state.beginnerWallet;

    set({
      holdings: updatedHoldings,
      orders: [newOrderRecord, ...state.orders],
      brokerWallet: newBrokerWallet,
      beginnerWallet: newBeginnerWallet,
      xp: state.xp + 50,
      emotionalScore:
        psychologyBadge === "DISCIPLINED"
          ? Math.min(99, baseScore + 3)
          : Math.max(40, baseScore - 4),
      tradeCoachLogs: [
        {
          id: `coach-${Date.now()}`,
          symbol,
          side,
          qty,
          price: execPrice,
          stopLoss,
          psychologyBadge,
          coachFeedback,
          timestamp: nowTime,
        },
        ...state.tradeCoachLogs,
      ],
    });

    // Also persist to backend API in background so it's stored in SQLite database
    if (typeof window !== "undefined") {
      try {
        fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order: newOrderRecord,
            holdings: updatedHoldings,
            walletBalance:
              state.financialMode === "BEGINNER"
                ? newBeginnerWallet
                : newBrokerWallet,
          }),
        }).catch(() => {});
      } catch {}
    }
  },

  executeVirtualOrder: ({ symbol, side, qty, price, orderType = "MARKET", productType = "CNC" }) => {
    get().executePaperOrder({
      symbol,
      side,
      qty,
      priceOverride: price,
      orderType,
      productType,
    });
  },

  cancelOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId && o.status === "OPEN" ? { ...o, status: "CANCELLED" } : o
      ),
    }));
  },

  fillOpenOrder: (orderId) => {
    const state = get();
    const target = state.orders.find((o) => o.id === orderId && o.status === "OPEN");
    if (!target) return;

    // Remove the OPEN record and execute as MARKET fill
    set({
      orders: state.orders.filter((o) => o.id !== orderId),
    });
    get().executePaperOrder({
      symbol: target.symbol,
      side: target.side,
      qty: target.qty,
      priceOverride: target.price,
      orderType: "MARKET",
      productType: target.productType,
    });
  },

  addXp: (points) => set((state) => ({ xp: state.xp + points })),

  aiMessages: [
    {
      id: "ai-welcome",
      role: "assistant",
      contextBadge: "INVESTRA AI OS • VOICE & PORTFOLIO CONTEXT",
      content:
        "Welcome to Investra AI Mentor. Tap the microphone icon to speak your question or type below. I have live context on all 2,640 NSE equities and your portfolio.",
      timestamp: "Live Session",
    },
  ],

  askAITutor: async (prompt, contextBadge = "AI MENTOR") => {
    const state = get();
    const userMsgId = `u-${Date.now()}`;
    set((s) => ({
      aiMessages: [
        ...s.aiMessages,
        {
          id: userMsgId,
          role: "user",
          content: prompt,
          timestamp: "Just now",
        },
      ],
    }));

    try {
      const res = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          financialMode: state.financialMode,
          salary: state.salary,
          monthlySip: state.monthlySip,
          bankBalance: state.bankBalance,
          brokerWallet:
            state.financialMode === "REAL_LIFE"
              ? state.brokerWallet
              : state.beginnerWallet,
          emotionalScore: state.emotionalScore,
          holdings: state.holdings,
          activeSymbol: state.selectedSymbol,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        set((s) => ({
          aiMessages: [
            ...s.aiMessages,
            {
              id: `a-${Date.now()}`,
              role: "assistant",
              contextBadge: `${data.provider || contextBadge}`,
              content: data.reply,
              timestamp: "Just now",
            },
          ],
        }));
        return;
      }
    } catch {
      // Fallback
    }

    set((s) => ({
      aiMessages: [
        ...s.aiMessages,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          contextBadge,
          content: `In your ${
            state.financialMode === "REAL_LIFE"
              ? `₹${state.monthlySip.toLocaleString("en-IN")}/month Real-Life Salary Mode`
              : "₹1,00,000 Fixed Cash Mode"
          }, evaluating "${prompt}" with strict stop-loss discipline keeps your capital protected. Let me know if you would like to explore any specific stock or setup.`,
          timestamp: "Just now",
        },
      ],
    }));
  },
    }),
    {
      name: "investra-trading-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        financialMode: state.financialMode,
        brokerPreset: state.brokerPreset,
        salary: state.salary,
        expenses: state.expenses,
        monthlySip: state.monthlySip,
        bankBalance: state.bankBalance,
        brokerWallet: state.brokerWallet,
        beginnerWallet: state.beginnerWallet,
        simulatedMonth: state.simulatedMonth,
        bankTransactions: state.bankTransactions,
        holdings: state.holdings,
        orders: state.orders,
        tradeCoachLogs: state.tradeCoachLogs,
        emotionalScore: state.emotionalScore,
        xp: state.xp,
        streakDays: state.streakDays,
      }),
    }
  )
);
