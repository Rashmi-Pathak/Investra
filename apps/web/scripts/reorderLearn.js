const fs = require('fs');

let code = fs.readFileSync('apps/web/app/(learn)/learn/page.tsx', 'utf8');

// In LearnPage, place <SectionCasesRunner /> right after the 7 lab button selectors in the top banner!
// Find the closing div of the top banner:
const targetSnippet = `          </div>
        </div>

        {/* LAB 1: DUOLINGO-STYLE SKILL TREE & INTERACTIVE QUIZZES */}`;

const replacement = `          </div>
        </div>

        {/* 50 INTERACTIVE CASES PER SECTION (ALL 7 SECTIONS) */}
        <SectionCasesRunner activeLab={activeLab} xp={xp} addXp={addXp} />

        {/* LAB 1: DUOLINGO-STYLE SKILL TREE & INTERACTIVE QUIZZES */}`;

if (code.includes(targetSnippet)) {
  code = code.replace(targetSnippet, replacement);
  console.log('Placed SectionCasesRunner right below top tabs successfully!');
} else {
  console.log('Target snippet not matched');
}

// Remove the old injection if it was down below
if (code.includes('        {/* 50 CASES RUNNER FOR THE CURRENT SECTION */}\n        <SectionCasesRunner activeLab={activeLab} xp={xp} addXp={addXp} />\n\n        {/* LAB 7 (IDEA C): 9:15 AM OPENING BELL ORDER-BOOK DRILL */}')) {
  code = code.replace(
    '        {/* 50 CASES RUNNER FOR THE CURRENT SECTION */}\n        <SectionCasesRunner activeLab={activeLab} xp={xp} addXp={addXp} />\n\n        {/* LAB 7 (IDEA C): 9:15 AM OPENING BELL ORDER-BOOK DRILL */}',
    '        {/* LAB 7 (IDEA C): 9:15 AM OPENING BELL ORDER-BOOK DRILL */}'
  );
  console.log('Cleaned up previous duplicate placement');
}

fs.writeFileSync('apps/web/app/(learn)/learn/page.tsx', code);
console.log('Saved learn/page.tsx');
