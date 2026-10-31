import { NextResponse } from "next/server";

const FINNHUB_KEY =
  process.env.FINNHUB_API_KEY || "d7efoj1r01qi33g63os0d7efoj1r01qi33g63osg";
const TWELVE_DATA_KEY =
  process.env.TWELVE_DATA_API_KEY || "442e22c0b6774616aeaddbd00574ab2a";
const EXCHANGERATE_KEY =
  process.env.EXCHANGERATE_API_KEY || "6e9aeea72ddda03fafe32f59";
const ALPHA_VANTAGE_KEY =
  process.env.ALPHA_VANTAGE_API_KEY || "HSIWQCV5G80FUVN8";
const TEJHQ_KEY =
  process.env.TEJHQ_API_KEY || "tej_live_09afb631b419684778aea9547ade1488";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") || "NVDA";

  const [finnhubRes, fxRes, twelveRes] = await Promise.allSettled([
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(
        symbol
      )}&token=${FINNHUB_KEY}`,
      { next: { revalidate: 30 }, signal: AbortSignal.timeout(1500) }
    ).then((r) => (r.ok ? r.json() : null)),

    fetch(
      `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_KEY}/latest/USD`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(1500) }
    ).then((r) => (r.ok ? r.json() : null)),

    fetch(
      `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(
        symbol
      )}&apikey=${TWELVE_DATA_KEY}`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(1500) }
    ).then((r) => (r.ok ? r.json() : null)),
  ]);

  const quote =
    finnhubRes.status === "fulfilled" && finnhubRes.value?.c
      ? {
          provider: "Finnhub Live",
          price: Number(finnhubRes.value.c),
          changePercent: Number(finnhubRes.value.dp || 0),
          high: Number(finnhubRes.value.h || finnhubRes.value.c),
          low: Number(finnhubRes.value.l || finnhubRes.value.c),
          open: Number(finnhubRes.value.o || finnhubRes.value.c),
        }
      : twelveRes.status === "fulfilled" && twelveRes.value?.close
      ? {
          provider: "TwelveData Live",
          price: Number(twelveRes.value.close),
          changePercent: Number(twelveRes.value.percent_change || 0),
          high: Number(twelveRes.value.high || twelveRes.value.close),
          low: Number(twelveRes.value.low || twelveRes.value.close),
          open: Number(twelveRes.value.open || twelveRes.value.close),
        }
      : null;

  const usdInr =
    fxRes.status === "fulfilled" && fxRes.value?.conversion_rates?.INR
      ? Number(fxRes.value.conversion_rates.INR)
      : 84.12;

  return NextResponse.json({
    ok: true,
    symbol,
    usdInr,
    quote,
    configuredProviders: {
      finnhub: Boolean(FINNHUB_KEY),
      twelveData: Boolean(TWELVE_DATA_KEY),
      alphaVantage: Boolean(ALPHA_VANTAGE_KEY),
      tejhq: Boolean(TEJHQ_KEY),
      exchangeRate: Boolean(EXCHANGERATE_KEY),
    },
    timestamp: new Date().toISOString(),
  });
}
