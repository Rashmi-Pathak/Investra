const fs = require('fs');

let code = fs.readFileSync('apps/web/app/(learn)/learn/page.tsx', 'utf8');

// 1. Add LEARN_SECTIONS_DATA import if not present
if (!code.includes('learnCurriculumData')) {
  code = code.replace(
    'import { useInvestraStore } from "@/store/useInvestraStore";',
    'import { useInvestraStore } from "@/store/useInvestraStore";\nimport { LEARN_SECTIONS_DATA, LearnQuestion } from "@/lib/learnCurriculumData";'
  );
}

// 2. Add state for section questions
if (!code.includes('sectionCaseIdx')) {
  code = code.replace(
    '  const [selectedMod, setSelectedMod] = useState(SKILL_MODULES[0]);',
    '  const [selectedMod, setSelectedMod] = useState(SKILL_MODULES[0]);\n  const [sectionCaseIdx, setSectionCaseIdx] = useState<Record<string, number>>({\n    CURRICULUM: 0,\n    BLIND_CHART: 0,\n    FORENSIC_XRAY: 0,\n    RISK_SIMULATOR: 0,\n    EARNINGS_AUDIO: 0,\n    PORTFOLIO_DOCTOR: 0,\n    OPENING_BELL_DRILL: 0,\n  });\n  const [sectionCaseAns, setSectionCaseAns] = useState<Record<string, number | null>>({});'
  );
}

fs.writeFileSync('apps/web/app/(learn)/learn/page.tsx', code);
console.log('Successfully injected state into learn/page.tsx');
