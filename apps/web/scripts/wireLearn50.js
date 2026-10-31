const fs = require('fs');

let code = fs.readFileSync('apps/web/app/(learn)/learn/page.tsx', 'utf8');

// Replace tab definition
const oldTabBlock = `            {[
              {
                id: "CURRICULUM",
                label: "1. Skill Tree",
                sub: "XP Checkpoints",
                icon: BookOpen,
              },
              {
                id: "EARNINGS_AUDIO",
                label: "2. Earnings Call",
                sub: "CEO Audio Trap",
                icon: Volume2,
              },
              {
                id: "PORTFOLIO_DOCTOR",
                label: "3. Doctor Mode",
                sub: "Fix Broken Folio",
                icon: Stethoscope,
              },
              {
                id: "OPENING_BELL_DRILL",
                label: "4. 9:15 AM Drill",
                sub: "L2 Slippage Game",
                icon: Clock,
              },
              {
                id: "BLIND_CHART",
                label: "5. Blind Chart",
                sub: "Spot Breakouts",
                icon: Eye,
              },
              {
                id: "FORENSIC_XRAY",
                label: "6. Forensic X-Ray",
                sub: "Spot Value Traps",
                icon: ShieldAlert,
              },
              {
                id: "RISK_SIMULATOR",
                label: "7. Risk Math Lab",
                sub: "Drawdown Survival",
                icon: Sliders,
              },
            ]`;

const newTabBlock = `            {[
              {
                id: "CURRICULUM",
                label: "1. Psychology",
                sub: "50 Real Cases",
                icon: BookOpen,
              },
              {
                id: "BLIND_CHART",
                label: "2. Candlesticks",
                sub: "50 Chart Cases",
                icon: Eye,
              },
              {
                id: "FORENSIC_XRAY",
                label: "3. Forensics",
                sub: "50 X-Ray Cases",
                icon: ShieldAlert,
              },
              {
                id: "RISK_SIMULATOR",
                label: "4. Order Books",
                sub: "50 Math Cases",
                icon: Sliders,
              },
              {
                id: "EARNINGS_AUDIO",
                label: "5. Earnings Trap",
                sub: "50 Con-Calls",
                icon: Volume2,
              },
              {
                id: "PORTFOLIO_DOCTOR",
                label: "6. Doctor Mode",
                sub: "50 Fix Cases",
                icon: Stethoscope,
              },
              {
                id: "OPENING_BELL_DRILL",
                label: "7. 9:15 AM Bell",
                sub: "50 L2 Drills",
                icon: Clock,
              },
            ]`;

if (code.includes(oldTabBlock)) {
  code = code.replace(oldTabBlock, newTabBlock);
  console.log('Replaced old tab block successfully!');
} else {
  console.log('Old tab block not found verbatim');
}

// Add SectionCasesRunner component at bottom or render it for all active tabs
const runnerComponent = `
function SectionCasesRunner({
  activeLab,
  xp,
  addXp,
}: {
  activeLab: string;
  xp: number;
  addXp: (amount: number) => void;
}) {
  const questions = LEARN_SECTIONS_DATA[activeLab] || LEARN_SECTIONS_DATA["CURRICULUM"];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answeredSet, setAnsweredSet] = useState<Record<number, { chosen: number; correct: boolean }>>({});

  const currentQ = questions[currentIdx] || questions[0];
  const totalCases = questions.length;
  const answeredCount = Object.keys(answeredSet).length;

  const handleSelectOption = (idx: number) => {
    if (answeredSet[currentIdx]) return;
    const isCorrect = idx === currentQ.correct;
    setSelectedOpt(idx);
    setAnsweredSet((prev) => ({
      ...prev,
      [currentIdx]: { chosen: idx, correct: isCorrect },
    }));
    if (isCorrect) {
      addXp(currentQ.xp);
    }
  };

  return (
    <div className="border border-[#C98A4A]/30 bg-[#12100E] p-6 space-y-6">
      {/* Top Section Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C98A4A]">
            {currentQ.badge} • 50 INTERACTIVE CASES
          </span>
          <h2 className="mt-1 text-lg font-extrabold text-[#FAF7F5]">
            {currentQ.topic} (Case #{currentIdx + 1} of {totalCases})
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="border border-[#3EDC81]/30 bg-[#1e2820] px-3 py-1 text-xs font-bold text-[#3EDC81]">
            {answeredCount} / {totalCases} Completed
          </span>
          <span className="border border-[#C98A4A]/40 bg-[#211C19] px-3 py-1 text-xs font-bold text-[#D8A56D]">
            +{currentQ.xp} XP
          </span>
        </div>
      </div>

      {/* Case Navigator Pill Bar (1 to 50) */}
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] text-[#7A7471]">
          <span>Jump to Case (1 to 50):</span>
          <span>Click any case button to practice</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1 bg-[#090909] border border-white/10">
          {questions.map((q, i) => {
            const ans = answeredSet[i];
            const isCurrent = i === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIdx(i);
                  setSelectedOpt(answeredSet[i]?.chosen ?? null);
                }}
                className={\`size-7 text-[11px] font-bold transition \${
                  isCurrent
                    ? "border-2 border-[#C98A4A] bg-[#C98A4A] text-[#090909]"
                    : ans
                    ? ans.correct
                      ? "border border-[#3EDC81] bg-[#1a2c20] text-[#3EDC81]"
                      : "border border-[#FF5C5C] bg-[#2d1818] text-[#FF5C5C]"
                    : "border border-white/10 bg-[#161616] text-[#B9B4B1] hover:border-white/30"
                }\`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="border border-white/10 bg-[#0c0c0c] p-6 space-y-4">
        <p className="text-sm font-bold text-[#FAF7F5] leading-relaxed">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, oIdx) => {
            const ans = answeredSet[currentIdx];
            const chosen = ans ? ans.chosen === oIdx : selectedOpt === oIdx;
            const isCorrect = oIdx === currentQ.correct;

            return (
              <button
                key={oIdx}
                disabled={Boolean(ans)}
                onClick={() => handleSelectOption(oIdx)}
                className={\`w-full border p-4 text-left text-xs font-semibold transition \${
                  ans
                    ? isCorrect
                      ? "border-[#3EDC81] bg-[#1a2c20] text-[#3EDC81]"
                      : chosen
                      ? "border-[#FF5C5C] bg-[#2d1818] text-[#FF5C5C]"
                      : "border-white/5 bg-[#121212] text-[#7A7471] opacity-60"
                    : "border-white/10 bg-[#141414] text-[#FAF7F5] hover:border-[#C98A4A]"
                }\`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center border border-current text-[10px]">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span>{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {answeredSet[currentIdx] && (
          <div className="mt-4 border border-white/10 bg-[#181614] p-4 text-xs space-y-1">
            <span
              className={\`font-bold \${
                answeredSet[currentIdx].correct
                  ? "text-[#3EDC81]"
                  : "text-[#FF5C5C]"
              }\`}
            >
              {answeredSet[currentIdx].correct
                ? "✓ Correct Institutional Call! XP added."
                : "✗ Incorrect Strategy Choice."}
            </span>
            <p className="text-[#B9B4B1] leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Prev / Next Controls */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
        <button
          disabled={currentIdx === 0}
          onClick={() => {
            const prev = currentIdx - 1;
            setCurrentIdx(prev);
            setSelectedOpt(answeredSet[prev]?.chosen ?? null);
          }}
          className="border border-white/15 bg-[#181614] px-4 py-2 font-bold text-[#FAF7F5] disabled:opacity-40 hover:border-[#C98A4A]"
        >
          ← Previous Case
        </button>

        <span className="text-[#D8A56D]">
          Case {currentIdx + 1} of {totalCases}
        </span>

        <button
          disabled={currentIdx >= totalCases - 1}
          onClick={() => {
            const next = currentIdx + 1;
            setCurrentIdx(next);
            setSelectedOpt(answeredSet[next]?.chosen ?? null);
          }}
          className="border border-[#C98A4A] bg-[#C98A4A] px-5 py-2 font-extrabold text-[#090909] disabled:opacity-40 hover:brightness-110"
        >
          Next Case →
        </button>
      </div>
    </div>
  );
}
`;

// Inject SectionCasesRunner above export default or at bottom
if (!code.includes('function SectionCasesRunner')) {
  code = code + '\n' + runnerComponent;
}

// In the render return, before the closing </div> of LearnPage, inject SectionCasesRunner
if (!code.includes('<SectionCasesRunner')) {
  code = code.replace(
    '        {/* LAB 7 (IDEA C): 9:15 AM OPENING BELL ORDER-BOOK DRILL */}',
    '        {/* 50 CASES RUNNER FOR THE CURRENT SECTION */}\n        <SectionCasesRunner activeLab={activeLab} xp={xp} addXp={addXp} />\n\n        {/* LAB 7 (IDEA C): 9:15 AM OPENING BELL ORDER-BOOK DRILL */}'
  );
}

fs.writeFileSync('apps/web/app/(learn)/learn/page.tsx', code);
console.log('Successfully injected SectionCasesRunner and 50 cases per section into learn page!');
