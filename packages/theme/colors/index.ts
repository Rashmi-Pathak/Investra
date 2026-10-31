export const investraColors = {
  background: {
    primary: "#090909",
    secondary: "#111111",
    surface: "#181614",
    elevated: "#211C19",
    glass: "rgba(255, 255, 255, 0.05)",
  },
  bronze: {
    primary: "#C98A4A",
    secondary: "#D8A56D",
    warmBrown: "#5A463E",
    deepBrown: "#382B27",
    warmBeige: "#F2D7B6",
  },
  text: {
    white: "#FFFFFF",
    primary: "#FAF7F5",
    secondary: "#B9B4B1",
    muted: "#7A7471",
  },
  status: {
    success: "#3EDC81",
    loss: "#FF5C5C",
    warning: "#FFC857",
  },
  border: {
    subtle: "rgba(255, 255, 255, 0.08)",
    bronzeGlow: "rgba(201, 138, 74, 0.35)",
  },
} as const;

export type BrokerPresetId =
  | "original"
  | "kite"
  | "groww"
  | "upstox";

export interface BrokerThemePreset {
  id: BrokerPresetId;
  name: string;
  tagline: string;
  accent: string;
  accentSecondary: string;
  surface: string;
  density: "comfortable" | "compact" | "terminal";
  layoutStyle: string;
}

export const brokerThemePresets: Record<BrokerPresetId, BrokerThemePreset> = {
  original: {
    id: "original",
    name: "Investra (Default)",
    tagline: "Signature Glowing Bronze & Obsidian Ecosystem",
    accent: "#C98A4A",
    accentSecondary: "#F2D7B6",
    surface: "#181614",
    density: "comfortable",
    layoutStyle: "Bloomberg + Linear Luxury Glass",
  },
  kite: {
    id: "kite",
    name: "Zerodha Kite",
    tagline: "Ultra-fast marketwatch left rail & compact order window",
    accent: "#FF5722",
    accentSecondary: "#FF8A65",
    surface: "#FFFFFF",
    density: "compact",
    layoutStyle: "Split Marketwatch + Console Holdings",
  },
  groww: {
    id: "groww",
    name: "Groww",
    tagline: "Clean consumer wealth layout with simplified cards",
    accent: "#00D09C",
    accentSecondary: "#7FF5D6",
    surface: "#121816",
    density: "comfortable",
    layoutStyle: "Clean Consumer Card Grid",
  },
  upstox: {
    id: "upstox",
    name: "Upstox Pro",
    tagline: "Options-ready pro layout with quick scalping controls",
    accent: "#9C6ADE",
    accentSecondary: "#C8A8F9",
    surface: "#16131D",
    density: "compact",
    layoutStyle: "Dual Chain & Chart Workspace",
  },
};
