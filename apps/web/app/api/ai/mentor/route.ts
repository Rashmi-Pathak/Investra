import { NextResponse } from "next/server";
import { findNseCompany, getNseEquitiesUniverse } from "@/lib/nseUniverse";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// Natural, human-like, conversational response generator (friendly, normal sentences, zero asterisks or markdown clutter)
function buildHumanFriendResponse(params: {
  prompt: string;
  financialMode: string;
  salary: number;
  monthlySip: number;
  brokerWallet: number;
  holdings: any[];
  activeSymbol: string;
  pageContext?: string;
}): string {
  const { prompt, financialMode, monthlySip, brokerWallet, holdings, activeSymbol, pageContext } = params;
  const q = prompt.trim();
  const lower = q.toLowerCase();

  const activeWalletFormatted = "₹" + brokerWallet.toLocaleString("en-IN");
  const holdingCount = holdings?.length || 0;
  const pageName = pageContext || "Investra";

  // 1. Casual Greetings & Friendly Check-ins
  if (
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower.startsWith("hi ") ||
    lower.startsWith("hello ") ||
    lower.startsWith("hey ") ||
    lower === "wassup" ||
    lower === "how are you"
  ) {
    if (pageName.toLowerCase().includes("learn")) {
      return `Hey there! How's it going? I see you're currently in the Learn section exploring the 50 case drills. You've got ${activeWalletFormatted} in your virtual wallet ready whenever you want to test out an idea. What can I help you with today?`;
    }
    if (pageName.toLowerCase().includes("market")) {
      return `Hey! What's up? I see you're browsing the live NSE markets right now. You have ${activeWalletFormatted} in your wallet to practice with. Are you looking at any particular company like Reliance or TCS, or do you want me to help analyze a chart?`;
    }
    if (pageName.toLowerCase().includes("portfolio")) {
      return `Hey! Great to see you checking your portfolio. You currently have ${holdingCount} active stock positions and ${activeWalletFormatted} cash available. How can I help you manage your positions or review your risk today?`;
    }
    return `Hey there! How are you doing today? I see you're on the ${pageName} page. You've got ${activeWalletFormatted} in your wallet ready to trade or learn. What can I help you with? Feel free to ask anything about stocks, charts, or your portfolio.`;
  }

  // 2. Specific question about why a stock moved or analyzing a stock
  const universe = getNseEquitiesUniverse();
  const mentionedStock =
    universe.find((s) => {
      const symLower = s.symbol.toLowerCase();
      return (
        lower.includes(symLower) &&
        (symLower.length >= 3 || new RegExp(`\\b${symLower}\\b`, "i").test(q))
      );
    }) || findNseCompany(activeSymbol || "RELIANCE");

  if (
    lower.includes("move") ||
    lower.includes("why did") ||
    lower.includes("should i buy") ||
    lower.includes("target") ||
    lower.includes("analysis") ||
    lower.includes("what about") ||
    lower.includes(mentionedStock.symbol.toLowerCase())
  ) {
    const changeSign = mentionedStock.changePercent >= 0 ? "up" : "down";
    const changeAbs = Math.abs(mentionedStock.changePercent);
    const daySupport = (mentionedStock.dayLow * 0.99).toFixed(1);
    const dayResistance = (mentionedStock.dayHigh * 1.01).toFixed(1);

    return `So looking at ${mentionedStock.symbol} (${mentionedStock.name}), it's ${changeSign} about ${changeAbs}% today trading around ₹${mentionedStock.price.toFixed(2)}. The day's action has been between ₹${mentionedStock.dayLow} and ₹${mentionedStock.dayHigh}. If you're thinking of buying with your ${activeWalletFormatted} wallet, a sensible technical entry would be near support around ₹${daySupport}, and make sure you set a stop loss around ₹${(mentionedStock.price * 0.97).toFixed(1)} so you never risk more than 2% of your cash on one trade.`;
  }

  // 3. Questions about P/E, P/B, ROE, or Valuation
  if (
    lower.includes("pe") ||
    lower.includes("p/e") ||
    lower.includes("valuation") ||
    lower.includes("roe") ||
    lower.includes("p/b")
  ) {
    return `Think of the P/E ratio simply as how many rupees investors are willing to pay today for every one rupee of profit the company makes in a year. For example, a quality tech giant like TCS might trade at a 29 P/E because it has a high return on equity and zero debt, while a state-run bank like SBI trades at an 11 P/E. Just remember that a low P/E doesn't automatically mean a stock is a bargain, especially if the company has high debt or pledged shares. Always check if their cash flow is positive too!`;
  }

  // 4. Questions about auditing portfolio or SIP risk
  if (
    lower.includes("audit") ||
    lower.includes("portfolio") ||
    lower.includes("sip") ||
    lower.includes("risk") ||
    lower.includes("review")
  ) {
    if (!holdings || holdings.length === 0) {
      return `Right now you haven't bought any stocks yet, so your whole ${activeWalletFormatted} is sitting safely in cash. That's actually a great spot to be in. When you're ready to start building your portfolio, a classic balanced approach is to pick three or four solid large-caps across different sectors like Banking and IT, keeping around 20% to 25% in each, and always leaving some cash on the side for market dips.`;
    }
    const names = holdings.map((h: any) => `${h.symbol} (${h.qty} shares)`).join(", ");
    return `Looking at your current portfolio, you have ${holdingCount} holdings right now: ${names}. You still have ${activeWalletFormatted} in cash left to deploy. My main friendly advice here is to avoid putting more than 25% into any single stock, and make sure you've got stop-loss levels set in case the market takes an unexpected turn.`;
  }

  // 5. Questions about Candlesticks or Technical Analysis
  if (
    lower.includes("candle") ||
    lower.includes("chart") ||
    lower.includes("rsi") ||
    lower.includes("support") ||
    lower.includes("resistance") ||
    lower.includes("volume")
  ) {
    return `When you look at the candlestick charts here, the main body shows where the price opened and closed, while the thin wicks show the extreme highs and lows of the day. If you see a long wick pointing downward with high volume, that's usually institutional buyers stepping in to absorb panic selling. Also, if RSI goes above 70 or 75, that tells you the stock might be overheated in the short term, so it's usually smarter to wait for a dip rather than chasing it.`;
  }

  // 6. Default friendly conversation response
  return `I hear you! When navigating the market, the secret isn't predicting every tick, it's having a calm plan. You currently have ${activeWalletFormatted} in your virtual wallet and you're exploring the platform. If you want, you can ask me about any of the 2,640 NSE companies, how to read a chart, or how to test an order without risking real capital. What would you like to explore next?`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      prompt = "",
      financialMode = "BEGINNER",
      salary = 50000,
      monthlySip = 5000,
      bankBalance = 15000,
      brokerWallet = 100000,
      holdings = [],
      activeSymbol = "RELIANCE",
      pageContext = "",
    } = body;

    const lower = prompt.trim().toLowerCase();

    // Natural conversation handling for greetings and common checks directly
    if (
      lower === "hi" ||
      lower === "hello" ||
      lower === "hey" ||
      lower.startsWith("hi ") ||
      lower.startsWith("hello ") ||
      lower.startsWith("hey ") ||
      lower === "how are you" ||
      lower === "wassup"
    ) {
      const friendlyGreeting = buildHumanFriendResponse({
        prompt,
        financialMode,
        salary,
        monthlySip,
        brokerWallet,
        holdings,
        activeSymbol,
        pageContext,
      });
      return NextResponse.json({
        ok: true,
        provider: "Investra Human Assistant",
        reply: friendlyGreeting,
      });
    }

    // Try Groq openai/gpt-oss-120b or openai/gpt-oss-20b with human-companion system prompt
    if (GROQ_API_KEY) {
      for (const model of ["openai/gpt-oss-120b", "openai/gpt-oss-20b"]) {
        try {
          const groqRes = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${GROQ_API_KEY}`,
              },
              body: JSON.stringify({
                model,
                messages: [
                  {
                    role: "system",
                    content: `You are Investra AI, a friendly, warm, and natural human companion and financial mentor. 
Speak in casual, conversational, human English just like a knowledgeable friend talking to another friend.
Rules:
- DO NOT use markdown bold stars (do not use **word**), bullet stars, or asterisks.
- Speak in natural, complete, clear sentences without robotic section titles or dashes.
- If the user says hi or asks how you are, respond warmly and mention what page they are on or what they can explore.
- User Context: Wallet balance is ₹${brokerWallet.toLocaleString("en-IN")}, mode is ${financialMode}, active stock is ${activeSymbol}.`,
                  },
                  { role: "user", content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 300,
              }),
            }
          );

          if (groqRes.ok) {
            const data = await groqRes.json();
            const rawReply = data.choices?.[0]?.message?.content;
            if (rawReply) {
              // Strip any remaining double asterisks or hashtags to keep it completely natural prose
              const cleanReply = rawReply.replace(/\*\*/g, "").replace(/#{1,6}\s?/g, "");
              return NextResponse.json({
                ok: true,
                provider: `Groq (${model})`,
                reply: cleanReply,
              });
            }
          }
        } catch {
          // Fall through
        }
      }
    }

    // Fallback to our human-crafted conversational builder (guaranteed 0 markdown stars)
    const reply = buildHumanFriendResponse({
      prompt,
      financialMode,
      salary,
      monthlySip,
      brokerWallet,
      holdings,
      activeSymbol,
      pageContext,
    });

    return NextResponse.json({
      ok: true,
      provider: "Investra Natural AI",
      reply,
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err?.message || "AI Mentor request failed",
    });
  }
}
