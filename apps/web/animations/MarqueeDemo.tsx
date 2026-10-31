"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magicui/marquee";

const reviews = [
  {
    name: "Aarav Mehta",
    username: "@aarav_trades",
    role: "Real-Life Mode • ₹45k Salary",
    body: "Trading with ₹5,000 monthly savings instead of fake ₹10L completely fixed my FOMO entries. The AI Coach caught my stop-loss mistakes on day one.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Diya Sharma",
    username: "@diyainvests",
    role: "2020 COVID Crash Replay",
    body: "Replaying the March 2020 crash candle-by-candle while the AI analyzed my panic selling was better than 10 finance books combined.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Rohan Verma",
    username: "@rohan_quant",
    role: "Multi-Broker Theme User",
    body: "Switching seamlessly between Investra Bronze, Kite-style compact mode, and TradingView Supercharts helped me master real broker terminals.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Ananya Iyer",
    username: "@ananya_wealth",
    role: "Duolingo Streak • 42 Days",
    body: "Highlighting any financial ratio on screen and clicking 'Ask AI' with my live portfolio holdings is pure magic. Best fintech learning platform.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Kabir Nair",
    username: "@kabir_options",
    role: "Virtual Bank + SIP Planner",
    body: "Watching my virtual salary hit the bank, rent & EMIs deduct automatically, and my ₹8,000 SIP route to the broker wallet feels 100% real.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Vikramaditya Rao",
    username: "@vikram_alpha",
    role: "Bloomberg Terminal AI",
    body: "The Bloomberg-grade AI Mentor explained P/E compression using my actual TCS and HDFC Bank positions. Unmatched luxury UI.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  role,
  body,
}: {
  img: string;
  name: string;
  username: string;
  role: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-[20px] border p-5 transition-all duration-300",
        "border-white/[0.08] bg-[#181614]/85 backdrop-blur-xl",
        "hover:-translate-y-1 hover:border-[#C98A4A]/50 hover:bg-[#211C19]/90 hover:shadow-[0_0_32px_-6px_rgba(201,138,74,0.28)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img
          className="rounded-full border border-[#C98A4A]/40"
          width="36"
          height="36"
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-[#FAF7F5]">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-[#C98A4A]">{username} • {role}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-[#B9B4B1]">
        {body}
      </blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
      <Marquee pauseOnHover className="[--duration:26s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:26s] mt-3">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#090909] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#090909] to-transparent" />
    </div>
  );
}
