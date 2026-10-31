export interface LearnQuestion {
  id: string;
  caseNumber: number;
  topic: string;
  badge: string;
  xp: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const LEARN_SECTIONS_DATA: Record<string, LearnQuestion[]> = {
  "CURRICULUM": [
    {
      "id": "CURRICULUM_1",
      "caseNumber": 1,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 210,
      "question": "Case #1: If your monthly salary is ₹37,500 and your surplus is ₹13,125, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹9188 (leaving ₹3938 in emergency savings)",
        "100% of your ₹37500 salary using leverage",
        "₹26250 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_2",
      "caseNumber": 2,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 220,
      "question": "Case #2: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_3",
      "caseNumber": 3,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 230,
      "question": "Case #3: A stock drops 7.5% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_4",
      "caseNumber": 4,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 240,
      "question": "Case #4: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_5",
      "caseNumber": 5,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 250,
      "question": "Case #5: You receive an unexpected annual bonus of ₹50,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_6",
      "caseNumber": 6,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 260,
      "question": "Case #6: If your monthly salary is ₹50,000 and your surplus is ₹17,500, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹12250 (leaving ₹5250 in emergency savings)",
        "100% of your ₹50000 salary using leverage",
        "₹35000 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_7",
      "caseNumber": 7,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 270,
      "question": "Case #7: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_8",
      "caseNumber": 8,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 280,
      "question": "Case #8: A stock drops 4.5% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_9",
      "caseNumber": 9,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 290,
      "question": "Case #9: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_10",
      "caseNumber": 10,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 200,
      "question": "Case #10: You receive an unexpected annual bonus of ₹75,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_11",
      "caseNumber": 11,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 210,
      "question": "Case #11: If your monthly salary is ₹62,500 and your surplus is ₹21,875, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹15312 (leaving ₹6563 in emergency savings)",
        "100% of your ₹62500 salary using leverage",
        "₹43750 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_12",
      "caseNumber": 12,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 220,
      "question": "Case #12: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_13",
      "caseNumber": 13,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 230,
      "question": "Case #13: A stock drops 12.0% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_14",
      "caseNumber": 14,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 240,
      "question": "Case #14: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_15",
      "caseNumber": 15,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 250,
      "question": "Case #15: You receive an unexpected annual bonus of ₹1,00,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_16",
      "caseNumber": 16,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 260,
      "question": "Case #16: If your monthly salary is ₹75,000 and your surplus is ₹26,250, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹18375 (leaving ₹7875 in emergency savings)",
        "100% of your ₹75000 salary using leverage",
        "₹52500 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_17",
      "caseNumber": 17,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 270,
      "question": "Case #17: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_18",
      "caseNumber": 18,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 280,
      "question": "Case #18: A stock drops 9.0% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_19",
      "caseNumber": 19,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 290,
      "question": "Case #19: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_20",
      "caseNumber": 20,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 200,
      "question": "Case #20: You receive an unexpected annual bonus of ₹1,25,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_21",
      "caseNumber": 21,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 210,
      "question": "Case #21: If your monthly salary is ₹87,500 and your surplus is ₹30,625, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹21438 (leaving ₹9188 in emergency savings)",
        "100% of your ₹87500 salary using leverage",
        "₹61250 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_22",
      "caseNumber": 22,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 220,
      "question": "Case #22: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_23",
      "caseNumber": 23,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 230,
      "question": "Case #23: A stock drops 6.0% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_24",
      "caseNumber": 24,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 240,
      "question": "Case #24: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_25",
      "caseNumber": 25,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 250,
      "question": "Case #25: You receive an unexpected annual bonus of ₹1,50,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_26",
      "caseNumber": 26,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 260,
      "question": "Case #26: If your monthly salary is ₹1,00,000 and your surplus is ₹35,000, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹24500 (leaving ₹10500 in emergency savings)",
        "100% of your ₹100000 salary using leverage",
        "₹70000 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_27",
      "caseNumber": 27,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 270,
      "question": "Case #27: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_28",
      "caseNumber": 28,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 280,
      "question": "Case #28: A stock drops 3.0% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_29",
      "caseNumber": 29,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 290,
      "question": "Case #29: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_30",
      "caseNumber": 30,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 200,
      "question": "Case #30: You receive an unexpected annual bonus of ₹1,75,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_31",
      "caseNumber": 31,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 210,
      "question": "Case #31: If your monthly salary is ₹1,12,500 and your surplus is ₹39,375, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹27563 (leaving ₹11813 in emergency savings)",
        "100% of your ₹112500 salary using leverage",
        "₹78750 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_32",
      "caseNumber": 32,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 220,
      "question": "Case #32: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_33",
      "caseNumber": 33,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 230,
      "question": "Case #33: A stock drops 10.5% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_34",
      "caseNumber": 34,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 240,
      "question": "Case #34: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_35",
      "caseNumber": 35,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 250,
      "question": "Case #35: You receive an unexpected annual bonus of ₹2,00,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_36",
      "caseNumber": 36,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 260,
      "question": "Case #36: If your monthly salary is ₹1,25,000 and your surplus is ₹43,750, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹30625 (leaving ₹13125 in emergency savings)",
        "100% of your ₹125000 salary using leverage",
        "₹87500 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_37",
      "caseNumber": 37,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 270,
      "question": "Case #37: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_38",
      "caseNumber": 38,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 280,
      "question": "Case #38: A stock drops 7.5% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_39",
      "caseNumber": 39,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 290,
      "question": "Case #39: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_40",
      "caseNumber": 40,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 200,
      "question": "Case #40: You receive an unexpected annual bonus of ₹2,25,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_41",
      "caseNumber": 41,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 210,
      "question": "Case #41: If your monthly salary is ₹1,37,500 and your surplus is ₹48,125, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹33688 (leaving ₹14438 in emergency savings)",
        "100% of your ₹137500 salary using leverage",
        "₹96250 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_42",
      "caseNumber": 42,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 220,
      "question": "Case #42: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_43",
      "caseNumber": 43,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 230,
      "question": "Case #43: A stock drops 4.5% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_44",
      "caseNumber": 44,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 240,
      "question": "Case #44: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_45",
      "caseNumber": 45,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 250,
      "question": "Case #45: You receive an unexpected annual bonus of ₹2,50,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    },
    {
      "id": "CURRICULUM_46",
      "caseNumber": 46,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 260,
      "question": "Case #46: If your monthly salary is ₹1,50,000 and your surplus is ₹52,500, what is the maximum monthly SIP you should commit to equity?",
      "options": [
        "Up to ₹36750 (leaving ₹15750 in emergency savings)",
        "100% of your ₹150000 salary using leverage",
        "₹105000 by taking a personal loan"
      ],
      "correct": 0,
      "explanation": "Never invest money required for next 6 months of living expenses. Always protect a liquidity buffer."
    },
    {
      "id": "CURRICULUM_47",
      "caseNumber": 47,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 270,
      "question": "Case #47: Why does risking real salary capital create psychological discipline that fake ₹10,00,000 simulators fail to teach?",
      "options": [
        "Loss aversion triggers genuine pain and forces strict adherence to stop-losses and sizing",
        "Simulators charge hidden brokerage taxes on every trade",
        "Fake money trades settle on an offshore crypto ledger"
      ],
      "correct": 0,
      "explanation": "Behavioral economics shows humans treat hard-earned salary with far greater psychological vigilance than arbitrary demo allocations."
    },
    {
      "id": "CURRICULUM_48",
      "caseNumber": 48,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 280,
      "question": "Case #48: A stock drops 12.0% immediately after your entry. Your pre-defined stop loss was 2% of portfolio. What is the disciplined action?",
      "options": [
        "Exit immediately at your stop-loss without emotional hesitation",
        "Average down with 3x more quantity to lower break-even",
        "Hold indefinitely hoping it becomes a multi-bagger"
      ],
      "correct": 0,
      "explanation": "Honoring predefined stop losses is what differentiates professional longevity from account blowing."
    },
    {
      "id": "CURRICULUM_49",
      "caseNumber": 49,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 290,
      "question": "Case #49: What is the risk-of-ruin mathematical danger of risking >10% of total capital on a single speculative stock?",
      "options": [
        "Four consecutive losses require an unsustainable +67% gain just to break even",
        "The exchange automatically changes your Demat to a corporate entity",
        "You earn double dividend yield from the clearing corporation"
      ],
      "correct": 0,
      "explanation": "As drawdowns deepen, the required recovery percentage escalates exponentially: a 50% loss requires a 100% gain to recover."
    },
    {
      "id": "CURRICULUM_50",
      "caseNumber": 50,
      "topic": "Salary Allocation & Risk Sizing",
      "badge": "FOUNDATION",
      "xp": 200,
      "question": "Case #50: You receive an unexpected annual bonus of ₹2,75,000. How should a disciplined investor deploy it?",
      "options": [
        "Stagger deployment across 6-12 months via weekly/monthly tranches (STP)",
        "Buy an out-of-the-money weekly call option on expiry day",
        "Put the entire amount into a single trending penny stock on social media"
      ],
      "correct": 0,
      "explanation": "Lump-sum averaging into volatile markets prevents entry-point regret and averages volatility."
    }
  ],
  "BLIND_CHART": [
    {
      "id": "BLIND_CHART_1",
      "caseNumber": 1,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 260,
      "question": "Case #1: A high-volume green candle with a long lower shadow (wick) rejects the ₹197.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_2",
      "caseNumber": 2,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 270,
      "question": "Case #2: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_3",
      "caseNumber": 3,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 280,
      "question": "Case #3: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹291.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_4",
      "caseNumber": 4,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 290,
      "question": "Case #4: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_5",
      "caseNumber": 5,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 300,
      "question": "Case #5: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_6",
      "caseNumber": 6,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 310,
      "question": "Case #6: A high-volume green candle with a long lower shadow (wick) rejects the ₹432.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_7",
      "caseNumber": 7,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 320,
      "question": "Case #7: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_8",
      "caseNumber": 8,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 330,
      "question": "Case #8: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹526.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_9",
      "caseNumber": 9,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 340,
      "question": "Case #9: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_10",
      "caseNumber": 10,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 250,
      "question": "Case #10: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_11",
      "caseNumber": 11,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 260,
      "question": "Case #11: A high-volume green candle with a long lower shadow (wick) rejects the ₹667.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_12",
      "caseNumber": 12,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 270,
      "question": "Case #12: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_13",
      "caseNumber": 13,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 280,
      "question": "Case #13: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹761.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_14",
      "caseNumber": 14,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 290,
      "question": "Case #14: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_15",
      "caseNumber": 15,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 300,
      "question": "Case #15: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_16",
      "caseNumber": 16,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 310,
      "question": "Case #16: A high-volume green candle with a long lower shadow (wick) rejects the ₹902.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_17",
      "caseNumber": 17,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 320,
      "question": "Case #17: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_18",
      "caseNumber": 18,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 330,
      "question": "Case #18: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹996.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_19",
      "caseNumber": 19,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 340,
      "question": "Case #19: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_20",
      "caseNumber": 20,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 250,
      "question": "Case #20: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_21",
      "caseNumber": 21,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 260,
      "question": "Case #21: A high-volume green candle with a long lower shadow (wick) rejects the ₹1137.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_22",
      "caseNumber": 22,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 270,
      "question": "Case #22: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_23",
      "caseNumber": 23,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 280,
      "question": "Case #23: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹1231.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_24",
      "caseNumber": 24,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 290,
      "question": "Case #24: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_25",
      "caseNumber": 25,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 300,
      "question": "Case #25: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_26",
      "caseNumber": 26,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 310,
      "question": "Case #26: A high-volume green candle with a long lower shadow (wick) rejects the ₹1372.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_27",
      "caseNumber": 27,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 320,
      "question": "Case #27: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_28",
      "caseNumber": 28,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 330,
      "question": "Case #28: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹1466.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_29",
      "caseNumber": 29,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 340,
      "question": "Case #29: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_30",
      "caseNumber": 30,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 250,
      "question": "Case #30: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_31",
      "caseNumber": 31,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 260,
      "question": "Case #31: A high-volume green candle with a long lower shadow (wick) rejects the ₹1607.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_32",
      "caseNumber": 32,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 270,
      "question": "Case #32: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_33",
      "caseNumber": 33,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 280,
      "question": "Case #33: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹1701.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_34",
      "caseNumber": 34,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 290,
      "question": "Case #34: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_35",
      "caseNumber": 35,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 300,
      "question": "Case #35: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_36",
      "caseNumber": 36,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 310,
      "question": "Case #36: A high-volume green candle with a long lower shadow (wick) rejects the ₹1842.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_37",
      "caseNumber": 37,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 320,
      "question": "Case #37: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_38",
      "caseNumber": 38,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 330,
      "question": "Case #38: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹1936.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_39",
      "caseNumber": 39,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 340,
      "question": "Case #39: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_40",
      "caseNumber": 40,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 250,
      "question": "Case #40: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_41",
      "caseNumber": 41,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 260,
      "question": "Case #41: A high-volume green candle with a long lower shadow (wick) rejects the ₹2077.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_42",
      "caseNumber": 42,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 270,
      "question": "Case #42: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_43",
      "caseNumber": 43,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 280,
      "question": "Case #43: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹2171.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_44",
      "caseNumber": 44,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 290,
      "question": "Case #44: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_45",
      "caseNumber": 45,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 300,
      "question": "Case #45: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    },
    {
      "id": "BLIND_CHART_46",
      "caseNumber": 46,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 310,
      "question": "Case #46: A high-volume green candle with a long lower shadow (wick) rejects the ₹2312.0 support zone. What does this signal?",
      "options": [
        "Institutional limit orders absorbed retail panic selling and pushed price back up",
        "The company announced an immediate stock split",
        "Sellers have completely exhausted all liquidity at higher levels"
      ],
      "correct": 0,
      "explanation": "A long lower wick at support with high volume is classic institutional liquidity absorption."
    },
    {
      "id": "BLIND_CHART_47",
      "caseNumber": 47,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 320,
      "question": "Case #47: Price breaks out above resistance on 0.4x average 20-day volume. What is the high-probability outcome?",
      "options": [
        "A bull-trap (false breakout) likely to retrace back inside the consolidation range",
        "A runaway trend that will surge 50% without pausing",
        "The stock will immediately enter a trading halt"
      ],
      "correct": 0,
      "explanation": "Breakouts without volume expansion indicate lack of institutional backing and frequently trap late retail buyers."
    },
    {
      "id": "BLIND_CHART_48",
      "caseNumber": 48,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 330,
      "question": "Case #48: What is the key takeaway when RSI diverges bearishly while price makes a higher high at ₹2406.0?",
      "options": [
        "Momentum velocity is diminishing even as price rises, warning of imminent exhaustion",
        "The company is generating record high free cash flows",
        "RSI divergence guarantees an immediate gap-up tomorrow"
      ],
      "correct": 0,
      "explanation": "Bearish divergence indicates waning buying momentum and often precedes a sharp mean-reversion."
    },
    {
      "id": "BLIND_CHART_49",
      "caseNumber": 49,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 340,
      "question": "Case #49: When observing Volume Weighted Average Price (VWAP) intraday, a stock trading consistently above VWAP indicates:",
      "options": [
        "Institutional buyers are paying a premium to average market price; buyers in control",
        "The stock is overvalued by exactly 50%",
        "The exchange will cancel all pending limit orders"
      ],
      "correct": 0,
      "explanation": "Institutions use VWAP as their benchmark; price above VWAP indicates institutional demand."
    },
    {
      "id": "BLIND_CHART_50",
      "caseNumber": 50,
      "topic": "Price Action & Volume Profiles",
      "badge": "TECHNICAL LAB",
      "xp": 250,
      "question": "Case #50: What does a Bearish Engulfing pattern on high volume at a 52-week high resistance level imply?",
      "options": [
        "Institutional distribution where sellers completely overwhelmed opening buyer momentum",
        "A healthy sign that the stock will quadruple in 3 days",
        "That all short sellers have been forced to cover"
      ],
      "correct": 0,
      "explanation": "Engulfing candles with high turnover at tops indicate major institutional profit-taking and distribution."
    }
  ],
  "FORENSIC_XRAY": [
    {
      "id": "FORENSIC_XRAY_1",
      "caseNumber": 1,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 310,
      "question": "Case #1: A company reports ₹1285 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹215 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_2",
      "caseNumber": 2,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 320,
      "question": "Case #2: Company promoters have pledged 37% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_3",
      "caseNumber": 3,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 330,
      "question": "Case #3: A company trades at a low P/E of 11x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_4",
      "caseNumber": 4,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 340,
      "question": "Case #4: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_5",
      "caseNumber": 5,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 350,
      "question": "Case #5: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_6",
      "caseNumber": 6,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 360,
      "question": "Case #6: A company reports ₹1710 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹290 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_7",
      "caseNumber": 7,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 370,
      "question": "Case #7: Company promoters have pledged 42% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_8",
      "caseNumber": 8,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 380,
      "question": "Case #8: A company trades at a low P/E of 16x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_9",
      "caseNumber": 9,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 390,
      "question": "Case #9: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_10",
      "caseNumber": 10,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 300,
      "question": "Case #10: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_11",
      "caseNumber": 11,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 310,
      "question": "Case #11: A company reports ₹2135 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹365 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_12",
      "caseNumber": 12,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 320,
      "question": "Case #12: Company promoters have pledged 47% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_13",
      "caseNumber": 13,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 330,
      "question": "Case #13: A company trades at a low P/E of 21x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_14",
      "caseNumber": 14,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 340,
      "question": "Case #14: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_15",
      "caseNumber": 15,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 350,
      "question": "Case #15: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_16",
      "caseNumber": 16,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 360,
      "question": "Case #16: A company reports ₹2560 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹440 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_17",
      "caseNumber": 17,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 370,
      "question": "Case #17: Company promoters have pledged 52% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_18",
      "caseNumber": 18,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 380,
      "question": "Case #18: A company trades at a low P/E of 11x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_19",
      "caseNumber": 19,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 390,
      "question": "Case #19: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_20",
      "caseNumber": 20,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 300,
      "question": "Case #20: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_21",
      "caseNumber": 21,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 310,
      "question": "Case #21: A company reports ₹2985 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹515 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_22",
      "caseNumber": 22,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 320,
      "question": "Case #22: Company promoters have pledged 57% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_23",
      "caseNumber": 23,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 330,
      "question": "Case #23: A company trades at a low P/E of 16x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_24",
      "caseNumber": 24,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 340,
      "question": "Case #24: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_25",
      "caseNumber": 25,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 350,
      "question": "Case #25: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_26",
      "caseNumber": 26,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 360,
      "question": "Case #26: A company reports ₹3410 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹590 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_27",
      "caseNumber": 27,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 370,
      "question": "Case #27: Company promoters have pledged 62% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_28",
      "caseNumber": 28,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 380,
      "question": "Case #28: A company trades at a low P/E of 21x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_29",
      "caseNumber": 29,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 390,
      "question": "Case #29: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_30",
      "caseNumber": 30,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 300,
      "question": "Case #30: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_31",
      "caseNumber": 31,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 310,
      "question": "Case #31: A company reports ₹3835 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹665 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_32",
      "caseNumber": 32,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 320,
      "question": "Case #32: Company promoters have pledged 67% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_33",
      "caseNumber": 33,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 330,
      "question": "Case #33: A company trades at a low P/E of 11x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_34",
      "caseNumber": 34,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 340,
      "question": "Case #34: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_35",
      "caseNumber": 35,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 350,
      "question": "Case #35: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_36",
      "caseNumber": 36,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 360,
      "question": "Case #36: A company reports ₹4260 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹740 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_37",
      "caseNumber": 37,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 370,
      "question": "Case #37: Company promoters have pledged 72% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_38",
      "caseNumber": 38,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 380,
      "question": "Case #38: A company trades at a low P/E of 16x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_39",
      "caseNumber": 39,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 390,
      "question": "Case #39: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_40",
      "caseNumber": 40,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 300,
      "question": "Case #40: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_41",
      "caseNumber": 41,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 310,
      "question": "Case #41: A company reports ₹4685 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹815 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_42",
      "caseNumber": 42,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 320,
      "question": "Case #42: Company promoters have pledged 37% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_43",
      "caseNumber": 43,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 330,
      "question": "Case #43: A company trades at a low P/E of 21x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_44",
      "caseNumber": 44,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 340,
      "question": "Case #44: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_45",
      "caseNumber": 45,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 350,
      "question": "Case #45: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    },
    {
      "id": "FORENSIC_XRAY_46",
      "caseNumber": 46,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 360,
      "question": "Case #46: A company reports ₹5110 Cr Net Profit, but Operating Cash Flow (OCF) is negative (-₹890 Cr). What does this reveal?",
      "options": [
        "Profits are trapped in unpaid receivables (accrual accounting), signaling poor cash conversion",
        "The company has zero operational costs",
        "The company is legally exempt from paying taxes"
      ],
      "correct": 0,
      "explanation": "Profit is an opinion; cash flow is a fact. Divergence between PAT and OCF is a classic forensic accounting red flag."
    },
    {
      "id": "FORENSIC_XRAY_47",
      "caseNumber": 47,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 370,
      "question": "Case #47: Company promoters have pledged 42% of their equity stake as collateral for corporate debt. What is the hazard?",
      "options": [
        "A minor stock correction can trigger margin calls and forced liquidation by lenders",
        "Promoters receive double dividends from the clearing house",
        "The stock automatically gets added to the NIFTY 50 index"
      ],
      "correct": 0,
      "explanation": "High promoter pledge creates a death spiral: falling share prices trigger lender sell-offs, causing deeper drops."
    },
    {
      "id": "FORENSIC_XRAY_48",
      "caseNumber": 48,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 380,
      "question": "Case #48: A company trades at a low P/E of 11x, but Debt-to-Equity is 3.0x and ROE is only 4%. Is this a value buy?",
      "options": [
        "No, it is a classic Value Trap burdened by interest solvency risk",
        "Yes, low P/E is the only metric required for safe investing",
        "Yes, high debt always increases shareholder wealth"
      ],
      "correct": 0,
      "explanation": "Low valuation multiples often reflect permanent business impairment, heavy debt burdens, and poor capital returns."
    },
    {
      "id": "FORENSIC_XRAY_49",
      "caseNumber": 49,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 390,
      "question": "Case #49: Which metric measures the true operating cash return generated on total capital invested in the business?",
      "options": [
        "ROCE (Return on Capital Employed)",
        "P/E (Price to Earnings)",
        "Trailing 12-month share turnover"
      ],
      "correct": 0,
      "explanation": "ROCE reveals how efficiently management allocates both debt and equity capital to generate operating profit (EBIT)."
    },
    {
      "id": "FORENSIC_XRAY_50",
      "caseNumber": 50,
      "topic": "Balance Sheet & Governance Forensics",
      "badge": "FUNDAMENTALS",
      "xp": 300,
      "question": "Case #50: When Auditor notes mention frequent changes in revenue recognition policy or qualifications, an investor should:",
      "options": [
        "Treat it as a serious governance warning and avoid or exit the stock",
        "Invest aggressively because auditors love creative companies",
        "Ignore the annual report notes completely"
      ],
      "correct": 0,
      "explanation": "Auditor resignations and accounting policy changes are early indicators of financial irregularities."
    }
  ],
  "RISK_SIMULATOR": [
    {
      "id": "RISK_SIMULATOR_1",
      "caseNumber": 1,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 260,
      "question": "Case #1: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_2",
      "caseNumber": 2,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 270,
      "question": "Case #2: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_3",
      "caseNumber": 3,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 280,
      "question": "Case #3: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_4",
      "caseNumber": 4,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 290,
      "question": "Case #4: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_5",
      "caseNumber": 5,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 300,
      "question": "Case #5: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_6",
      "caseNumber": 6,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 310,
      "question": "Case #6: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_7",
      "caseNumber": 7,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 320,
      "question": "Case #7: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_8",
      "caseNumber": 8,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 330,
      "question": "Case #8: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_9",
      "caseNumber": 9,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 340,
      "question": "Case #9: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_10",
      "caseNumber": 10,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 250,
      "question": "Case #10: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_11",
      "caseNumber": 11,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 260,
      "question": "Case #11: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_12",
      "caseNumber": 12,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 270,
      "question": "Case #12: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_13",
      "caseNumber": 13,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 280,
      "question": "Case #13: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_14",
      "caseNumber": 14,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 290,
      "question": "Case #14: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_15",
      "caseNumber": 15,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 300,
      "question": "Case #15: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_16",
      "caseNumber": 16,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 310,
      "question": "Case #16: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_17",
      "caseNumber": 17,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 320,
      "question": "Case #17: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_18",
      "caseNumber": 18,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 330,
      "question": "Case #18: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_19",
      "caseNumber": 19,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 340,
      "question": "Case #19: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_20",
      "caseNumber": 20,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 250,
      "question": "Case #20: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_21",
      "caseNumber": 21,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 260,
      "question": "Case #21: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_22",
      "caseNumber": 22,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 270,
      "question": "Case #22: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_23",
      "caseNumber": 23,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 280,
      "question": "Case #23: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_24",
      "caseNumber": 24,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 290,
      "question": "Case #24: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_25",
      "caseNumber": 25,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 300,
      "question": "Case #25: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_26",
      "caseNumber": 26,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 310,
      "question": "Case #26: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_27",
      "caseNumber": 27,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 320,
      "question": "Case #27: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_28",
      "caseNumber": 28,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 330,
      "question": "Case #28: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_29",
      "caseNumber": 29,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 340,
      "question": "Case #29: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_30",
      "caseNumber": 30,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 250,
      "question": "Case #30: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_31",
      "caseNumber": 31,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 260,
      "question": "Case #31: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_32",
      "caseNumber": 32,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 270,
      "question": "Case #32: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_33",
      "caseNumber": 33,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 280,
      "question": "Case #33: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_34",
      "caseNumber": 34,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 290,
      "question": "Case #34: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_35",
      "caseNumber": 35,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 300,
      "question": "Case #35: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_36",
      "caseNumber": 36,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 310,
      "question": "Case #36: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_37",
      "caseNumber": 37,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 320,
      "question": "Case #37: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_38",
      "caseNumber": 38,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 330,
      "question": "Case #38: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_39",
      "caseNumber": 39,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 340,
      "question": "Case #39: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_40",
      "caseNumber": 40,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 250,
      "question": "Case #40: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_41",
      "caseNumber": 41,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 260,
      "question": "Case #41: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_42",
      "caseNumber": 42,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 270,
      "question": "Case #42: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_43",
      "caseNumber": 43,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 280,
      "question": "Case #43: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_44",
      "caseNumber": 44,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 290,
      "question": "Case #44: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_45",
      "caseNumber": 45,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 300,
      "question": "Case #45: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    },
    {
      "id": "RISK_SIMULATOR_46",
      "caseNumber": 46,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 310,
      "question": "Case #46: During a volatile market surge, you place a MARKET order for 500 shares instead of a LIMIT order. What risk do you face?",
      "options": [
        "Price slippage—your order fills at the highest available Ask price deep in the book",
        "Your broker wallet automatically doubles",
        "The stock gets delisted before settlement"
      ],
      "correct": 0,
      "explanation": "Market orders sweep the order book and will execute at whatever prices sellers are asking, causing severe slippage in thin books."
    },
    {
      "id": "RISK_SIMULATOR_47",
      "caseNumber": 47,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 320,
      "question": "Case #47: What is the key functional difference between CNC (Cash & Carry) and MIS (Margin Intraday Square-off)?",
      "options": [
        "CNC requires full cash and delivers shares to your Demat; MIS auto-squares off by 3:20 PM",
        "CNC gives 5x leverage while MIS cannot be sold",
        "MIS orders are sent to the RBI while CNC orders stay with SEBI"
      ],
      "correct": 0,
      "explanation": "CNC is meant for delivery-based equity investing without intraday liquidation risk."
    },
    {
      "id": "RISK_SIMULATOR_48",
      "caseNumber": 48,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 330,
      "question": "Case #48: A stock hits its 10% Upper Circuit. You want to buy 100 shares. What happens to your Limit Buy order?",
      "options": [
        "It joins the pending bid queue; it will only execute if someone agrees to sell",
        "The broker forcibly takes shares from other clients to fill your order",
        "The order executes immediately at zero price"
      ],
      "correct": 0,
      "explanation": "At upper circuit, there are only buyers and zero sellers; orders sit unfilled in the queue."
    },
    {
      "id": "RISK_SIMULATOR_49",
      "caseNumber": 49,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 340,
      "question": "Case #49: What is the purpose of placing a GTT (Good Till Triggered) order on your long-term holdings?",
      "options": [
        "It automatically triggers an exit order if the price falls below your safety threshold, valid for up to 1 year",
        "It forces the company to pay quarterly dividends early",
        "It converts equity shares into government gold bonds"
      ],
      "correct": 0,
      "explanation": "GTT lets investors maintain automated stop-loss protection without needing to monitor the terminal daily."
    },
    {
      "id": "RISK_SIMULATOR_50",
      "caseNumber": 50,
      "topic": "Order Types, Slippage & Circuit Filters",
      "badge": "EXECUTION",
      "xp": 250,
      "question": "Case #50: How is Bid-Ask spread an implicit transaction cost for active traders?",
      "options": [
        "Crossing the spread means buying at Ask and selling at Bid, instantly incurring a loss equal to the spread",
        "The spread is a tax paid directly to the local municipality",
        "Widened spreads guarantee higher dividend yield"
      ],
      "correct": 0,
      "explanation": "In illiquid stocks, a wide bid-ask spread creates massive friction that drains trading capital."
    }
  ],
  "EARNINGS_AUDIO": [
    {
      "id": "EARNINGS_AUDIO_1",
      "caseNumber": 1,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 285,
      "question": "Case #1: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_2",
      "caseNumber": 2,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 295,
      "question": "Case #2: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_3",
      "caseNumber": 3,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 305,
      "question": "Case #3: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_4",
      "caseNumber": 4,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 315,
      "question": "Case #4: Why does a high-P/E (12x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_5",
      "caseNumber": 5,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 325,
      "question": "Case #5: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_6",
      "caseNumber": 6,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 335,
      "question": "Case #6: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_7",
      "caseNumber": 7,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 345,
      "question": "Case #7: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_8",
      "caseNumber": 8,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 355,
      "question": "Case #8: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_9",
      "caseNumber": 9,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 365,
      "question": "Case #9: Why does a high-P/E (17x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_10",
      "caseNumber": 10,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 275,
      "question": "Case #10: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_11",
      "caseNumber": 11,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 285,
      "question": "Case #11: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_12",
      "caseNumber": 12,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 295,
      "question": "Case #12: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_13",
      "caseNumber": 13,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 305,
      "question": "Case #13: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_14",
      "caseNumber": 14,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 315,
      "question": "Case #14: Why does a high-P/E (22x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_15",
      "caseNumber": 15,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 325,
      "question": "Case #15: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_16",
      "caseNumber": 16,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 335,
      "question": "Case #16: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_17",
      "caseNumber": 17,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 345,
      "question": "Case #17: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_18",
      "caseNumber": 18,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 355,
      "question": "Case #18: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_19",
      "caseNumber": 19,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 365,
      "question": "Case #19: Why does a high-P/E (12x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_20",
      "caseNumber": 20,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 275,
      "question": "Case #20: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_21",
      "caseNumber": 21,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 285,
      "question": "Case #21: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_22",
      "caseNumber": 22,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 295,
      "question": "Case #22: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_23",
      "caseNumber": 23,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 305,
      "question": "Case #23: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_24",
      "caseNumber": 24,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 315,
      "question": "Case #24: Why does a high-P/E (17x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_25",
      "caseNumber": 25,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 325,
      "question": "Case #25: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_26",
      "caseNumber": 26,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 335,
      "question": "Case #26: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_27",
      "caseNumber": 27,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 345,
      "question": "Case #27: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_28",
      "caseNumber": 28,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 355,
      "question": "Case #28: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_29",
      "caseNumber": 29,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 365,
      "question": "Case #29: Why does a high-P/E (22x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_30",
      "caseNumber": 30,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 275,
      "question": "Case #30: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_31",
      "caseNumber": 31,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 285,
      "question": "Case #31: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_32",
      "caseNumber": 32,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 295,
      "question": "Case #32: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_33",
      "caseNumber": 33,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 305,
      "question": "Case #33: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_34",
      "caseNumber": 34,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 315,
      "question": "Case #34: Why does a high-P/E (12x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_35",
      "caseNumber": 35,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 325,
      "question": "Case #35: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_36",
      "caseNumber": 36,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 335,
      "question": "Case #36: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_37",
      "caseNumber": 37,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 345,
      "question": "Case #37: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_38",
      "caseNumber": 38,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 355,
      "question": "Case #38: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_39",
      "caseNumber": 39,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 365,
      "question": "Case #39: Why does a high-P/E (17x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_40",
      "caseNumber": 40,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 275,
      "question": "Case #40: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_41",
      "caseNumber": 41,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 285,
      "question": "Case #41: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_42",
      "caseNumber": 42,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 295,
      "question": "Case #42: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_43",
      "caseNumber": 43,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 305,
      "question": "Case #43: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_44",
      "caseNumber": 44,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 315,
      "question": "Case #44: Why does a high-P/E (22x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_45",
      "caseNumber": 45,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 325,
      "question": "Case #45: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    },
    {
      "id": "EARNINGS_AUDIO_46",
      "caseNumber": 46,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 335,
      "question": "Case #46: A company reports 24% YoY revenue growth, but operating margin contracted by 450 bps and management lowered guidance. What happens?",
      "options": [
        "The stock often falls heavily because guidance and margin quality matter more than trailing top-line growth",
        "The stock is guaranteed to hit upper circuit on revenue beat",
        "The company issues a 1:1 free bonus share"
      ],
      "correct": 0,
      "explanation": "Markets are forward-looking. A downgrade in forward guidance or margin compression will punish a stock despite trailing revenue beats."
    },
    {
      "id": "EARNINGS_AUDIO_47",
      "caseNumber": 47,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 345,
      "question": "Case #47: During an earnings conference call, the CEO answers analyst debt questions with vague non-committal statements. An investor should:",
      "options": [
        "Recognize evasive management language as an operational warning sign",
        "Double position size because CEOs love secrecy",
        "Assume the company has secret hidden profits"
      ],
      "correct": 0,
      "explanation": "Con-call transparency is vital. When management dodges balance sheet questions, institutional confidence erodes rapidly."
    },
    {
      "id": "EARNINGS_AUDIO_48",
      "caseNumber": 48,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 355,
      "question": "Case #48: What is a One-off Exceptional Item in a quarterly report that artificially inflates Net Profit?",
      "options": [
        "Non-recurring profit (e.g., land or subsidiary sale) that will not repeat in regular operations",
        "A recurring daily product sale",
        "A dividend received from the central government"
      ],
      "correct": 0,
      "explanation": "Always analyze Operating Profit (EBITDA) before exceptional items to assess true repeatable core business performance."
    },
    {
      "id": "EARNINGS_AUDIO_49",
      "caseNumber": 49,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 365,
      "question": "Case #49: Why does a high-P/E (12x) growth stock plunge 15% after matching consensus earnings expectations?",
      "options": [
        "Sky-high valuations price in perfection; matching consensus without a beat triggers valuation de-rating",
        "The stock exchange randomly penalizes technology companies",
        "Brokerage firms are required to dump 15% of shares quarterly"
      ],
      "correct": 0,
      "explanation": "At extreme valuation multiples, mere in-line performance fails to justify the premium, leading to sharp profit taking."
    },
    {
      "id": "EARNINGS_AUDIO_50",
      "caseNumber": 50,
      "topic": "Quarterly Results, Guidance & Con-calls",
      "badge": "EARNINGS LAB",
      "xp": 275,
      "question": "Case #50: What does a sudden surge in Days Sales Outstanding (DSO) reported in quarterly metrics suggest?",
      "options": [
        "The company is taking longer to collect cash from customers, indicating potential channel stuffing",
        "Customers are prepaying 5 years in advance",
        "The company has zero inventory risk"
      ],
      "correct": 0,
      "explanation": "Rising DSO indicates credit-driven sales where customers are struggling or delaying payments."
    }
  ],
  "PORTFOLIO_DOCTOR": [
    {
      "id": "PORTFOLIO_DOCTOR_1",
      "caseNumber": 1,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 310,
      "question": "Case #1: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_2",
      "caseNumber": 2,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 320,
      "question": "Case #2: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_3",
      "caseNumber": 3,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 330,
      "question": "Case #3: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_4",
      "caseNumber": 4,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 340,
      "question": "Case #4: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_5",
      "caseNumber": 5,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 350,
      "question": "Case #5: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_6",
      "caseNumber": 6,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 360,
      "question": "Case #6: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_7",
      "caseNumber": 7,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 370,
      "question": "Case #7: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_8",
      "caseNumber": 8,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 380,
      "question": "Case #8: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_9",
      "caseNumber": 9,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 390,
      "question": "Case #9: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_10",
      "caseNumber": 10,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 300,
      "question": "Case #10: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_11",
      "caseNumber": 11,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 310,
      "question": "Case #11: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_12",
      "caseNumber": 12,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 320,
      "question": "Case #12: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_13",
      "caseNumber": 13,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 330,
      "question": "Case #13: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_14",
      "caseNumber": 14,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 340,
      "question": "Case #14: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_15",
      "caseNumber": 15,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 350,
      "question": "Case #15: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_16",
      "caseNumber": 16,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 360,
      "question": "Case #16: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_17",
      "caseNumber": 17,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 370,
      "question": "Case #17: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_18",
      "caseNumber": 18,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 380,
      "question": "Case #18: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_19",
      "caseNumber": 19,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 390,
      "question": "Case #19: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_20",
      "caseNumber": 20,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 300,
      "question": "Case #20: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_21",
      "caseNumber": 21,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 310,
      "question": "Case #21: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_22",
      "caseNumber": 22,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 320,
      "question": "Case #22: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_23",
      "caseNumber": 23,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 330,
      "question": "Case #23: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_24",
      "caseNumber": 24,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 340,
      "question": "Case #24: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_25",
      "caseNumber": 25,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 350,
      "question": "Case #25: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_26",
      "caseNumber": 26,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 360,
      "question": "Case #26: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_27",
      "caseNumber": 27,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 370,
      "question": "Case #27: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_28",
      "caseNumber": 28,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 380,
      "question": "Case #28: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_29",
      "caseNumber": 29,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 390,
      "question": "Case #29: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_30",
      "caseNumber": 30,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 300,
      "question": "Case #30: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_31",
      "caseNumber": 31,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 310,
      "question": "Case #31: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_32",
      "caseNumber": 32,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 320,
      "question": "Case #32: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_33",
      "caseNumber": 33,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 330,
      "question": "Case #33: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_34",
      "caseNumber": 34,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 340,
      "question": "Case #34: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_35",
      "caseNumber": 35,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 350,
      "question": "Case #35: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_36",
      "caseNumber": 36,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 360,
      "question": "Case #36: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_37",
      "caseNumber": 37,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 370,
      "question": "Case #37: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_38",
      "caseNumber": 38,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 380,
      "question": "Case #38: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_39",
      "caseNumber": 39,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 390,
      "question": "Case #39: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_40",
      "caseNumber": 40,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 300,
      "question": "Case #40: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_41",
      "caseNumber": 41,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 310,
      "question": "Case #41: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_42",
      "caseNumber": 42,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 320,
      "question": "Case #42: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_43",
      "caseNumber": 43,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 330,
      "question": "Case #43: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_44",
      "caseNumber": 44,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 340,
      "question": "Case #44: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_45",
      "caseNumber": 45,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 350,
      "question": "Case #45: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    },
    {
      "id": "PORTFOLIO_DOCTOR_46",
      "caseNumber": 46,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 360,
      "question": "Case #46: A beginner portfolio has 85% allocated to 12 penny stocks (<₹20) with no stop-losses. What is the diagnosis?",
      "options": [
        "Critical lottery-ticket bias; extreme ruin risk from illiquidity and capital destruction",
        "Optimal multi-bagger portfolio designed for institutional compounding",
        "Safe low-risk strategy since shares cost under ₹20"
      ],
      "correct": 0,
      "explanation": "Share price is not valuation. Penny stocks suffer from manipulation, poor fundamentals, and illiquid exits."
    },
    {
      "id": "PORTFOLIO_DOCTOR_47",
      "caseNumber": 47,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 370,
      "question": "Case #47: A user holds 6 banking stocks making up 80% of their total equity portfolio. What is the main vulnerability?",
      "options": [
        "Severe sectoral concentration: an interest rate or NPA shock will devastate the entire portfolio simultaneously",
        "They will receive too many bank debit cards in the mail",
        "The portfolio has negative correlation to the banking sector"
      ],
      "correct": 0,
      "explanation": "Holding multiple stocks within the same sector does not provide true diversification because their returns are highly correlated."
    },
    {
      "id": "PORTFOLIO_DOCTOR_48",
      "caseNumber": 48,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 380,
      "question": "Case #48: When rebalancing a portfolio that has grown to 40 stocks with <2% in each, what should the investor do?",
      "options": [
        "Consolidate into 12-20 highest-conviction quality businesses to eliminate overdiversification (diworsification)",
        "Buy 40 more stocks to reach 80 holdings",
        "Convert all holdings into weekly options"
      ],
      "correct": 0,
      "explanation": "Overdiversification dilutes portfolio alpha and turns the account into an unmanageable index with high transaction costs."
    },
    {
      "id": "PORTFOLIO_DOCTOR_49",
      "caseNumber": 49,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 390,
      "question": "Case #49: What is the benefit of adding an asset with low or negative correlation (like Gold or Debt) to an equity portfolio?",
      "options": [
        "It cushions overall portfolio drawdowns and improves the Sharpe ratio without destroying long-term compound growth",
        "It guarantees zero tax liability forever",
        "It makes all equity stocks rise simultaneously"
      ],
      "correct": 0,
      "explanation": "Non-correlated assets smooth volatility, preventing panic selling during steep equity drawdowns."
    },
    {
      "id": "PORTFOLIO_DOCTOR_50",
      "caseNumber": 50,
      "topic": "Diversification, Correlation & Beta Management",
      "badge": "PORTFOLIO LAB",
      "xp": 300,
      "question": "Case #50: How often should a disciplined long-term retail investor review and rebalance their portfolio asset allocation?",
      "options": [
        "Semi-annually or annually, or when asset weight drifts by >5% from the target allocation",
        "Every 15 minutes during market hours",
        "Never—once bought, holdings should never be reviewed"
      ],
      "correct": 0,
      "explanation": "Periodic rebalancing enforces buying low (underweight assets) and selling high (overweight assets) systematically."
    }
  ],
  "OPENING_BELL_DRILL": [
    {
      "id": "OPENING_BELL_DRILL_1",
      "caseNumber": 1,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 290,
      "question": "Case #1: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_2",
      "caseNumber": 2,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 300,
      "question": "Case #2: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_3",
      "caseNumber": 3,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 310,
      "question": "Case #3: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_4",
      "caseNumber": 4,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 320,
      "question": "Case #4: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_5",
      "caseNumber": 5,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 330,
      "question": "Case #5: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_6",
      "caseNumber": 6,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 340,
      "question": "Case #6: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_7",
      "caseNumber": 7,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 350,
      "question": "Case #7: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_8",
      "caseNumber": 8,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 360,
      "question": "Case #8: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_9",
      "caseNumber": 9,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 370,
      "question": "Case #9: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_10",
      "caseNumber": 10,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 280,
      "question": "Case #10: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_11",
      "caseNumber": 11,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 290,
      "question": "Case #11: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_12",
      "caseNumber": 12,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 300,
      "question": "Case #12: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_13",
      "caseNumber": 13,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 310,
      "question": "Case #13: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_14",
      "caseNumber": 14,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 320,
      "question": "Case #14: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_15",
      "caseNumber": 15,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 330,
      "question": "Case #15: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_16",
      "caseNumber": 16,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 340,
      "question": "Case #16: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_17",
      "caseNumber": 17,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 350,
      "question": "Case #17: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_18",
      "caseNumber": 18,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 360,
      "question": "Case #18: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_19",
      "caseNumber": 19,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 370,
      "question": "Case #19: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_20",
      "caseNumber": 20,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 280,
      "question": "Case #20: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_21",
      "caseNumber": 21,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 290,
      "question": "Case #21: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_22",
      "caseNumber": 22,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 300,
      "question": "Case #22: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_23",
      "caseNumber": 23,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 310,
      "question": "Case #23: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_24",
      "caseNumber": 24,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 320,
      "question": "Case #24: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_25",
      "caseNumber": 25,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 330,
      "question": "Case #25: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_26",
      "caseNumber": 26,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 340,
      "question": "Case #26: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_27",
      "caseNumber": 27,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 350,
      "question": "Case #27: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_28",
      "caseNumber": 28,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 360,
      "question": "Case #28: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_29",
      "caseNumber": 29,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 370,
      "question": "Case #29: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_30",
      "caseNumber": 30,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 280,
      "question": "Case #30: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_31",
      "caseNumber": 31,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 290,
      "question": "Case #31: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_32",
      "caseNumber": 32,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 300,
      "question": "Case #32: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_33",
      "caseNumber": 33,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 310,
      "question": "Case #33: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_34",
      "caseNumber": 34,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 320,
      "question": "Case #34: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_35",
      "caseNumber": 35,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 330,
      "question": "Case #35: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_36",
      "caseNumber": 36,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 340,
      "question": "Case #36: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_37",
      "caseNumber": 37,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 350,
      "question": "Case #37: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_38",
      "caseNumber": 38,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 360,
      "question": "Case #38: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_39",
      "caseNumber": 39,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 370,
      "question": "Case #39: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_40",
      "caseNumber": 40,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 280,
      "question": "Case #40: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_41",
      "caseNumber": 41,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 290,
      "question": "Case #41: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_42",
      "caseNumber": 42,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 300,
      "question": "Case #42: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_43",
      "caseNumber": 43,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 310,
      "question": "Case #43: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_44",
      "caseNumber": 44,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 320,
      "question": "Case #44: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_45",
      "caseNumber": 45,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 330,
      "question": "Case #45: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    },
    {
      "id": "OPENING_BELL_DRILL_46",
      "caseNumber": 46,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 340,
      "question": "Case #46: Between 9:00 AM and 9:08 AM, the NSE pre-market call auction runs. What is determined during this window?",
      "options": [
        "The equilibrium opening price where maximum trading volume executes without slippage",
        "The dividend payout ratio for the upcoming fiscal quarter",
        "Which retail traders are banned for the day"
      ],
      "correct": 0,
      "explanation": "Pre-open discovery aggregates all limit and market orders to calculate a single equilibrium price, reducing opening volatility."
    },
    {
      "id": "OPENING_BELL_DRILL_47",
      "caseNumber": 47,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 350,
      "question": "Case #47: At 9:15:02 AM immediately after the market opens, bid-ask spreads for a mid-cap stock widen from ₹0.20 to ₹6.50. Why?",
      "options": [
        "Market makers and liquidity providers pull quotes to assess opening overnight news and volatility",
        "The stock exchange is rebooting its matching servers",
        "Trading has been permanently halted by the government"
      ],
      "correct": 0,
      "explanation": "At the opening bell, liquidity providers temporarily widen spreads until true two-way order flow stabilizes."
    },
    {
      "id": "OPENING_BELL_DRILL_48",
      "caseNumber": 48,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 360,
      "question": "Case #48: If you must enter a position at 9:15 AM following positive overnight earnings, which execution prevents catastrophic slippage?",
      "options": [
        "Place a Limit Order near the pre-market equilibrium price; do NOT use a Market order",
        "Use an aggressive Market order with 5x MIS leverage",
        "Send multiple unpriced market orders across three brokers"
      ],
      "correct": 0,
      "explanation": "A limit order caps your worst-case fill price, shielding you from opening spread expansion."
    },
    {
      "id": "OPENING_BELL_DRILL_49",
      "caseNumber": 49,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 370,
      "question": "Case #49: A stock gaps down -6% at 9:15 AM on rumors. Retail panic-sellers hit Market Sell. What do institutional smart-money algorithms often do?",
      "options": [
        "Provide limit bids at key technical support levels to absorb cheap retail inventory (opening liquidity grab)",
        "Shut down their algorithms and go home",
        "Immediately declare corporate bankruptcy"
      ],
      "correct": 0,
      "explanation": "Large institutions utilize opening panic liquidity to accumulate large share quantities without driving the price against themselves."
    },
    {
      "id": "OPENING_BELL_DRILL_50",
      "caseNumber": 50,
      "topic": "Pre-Market Sessions & 9:15 AM Spreads",
      "badge": "DRILL LAB",
      "xp": 280,
      "question": "Case #50: What is the golden rule for beginners regarding trading during the first 15 minutes (9:15 AM - 9:30 AM)?",
      "options": [
        "Observe price action and let the opening range form before entering positions to avoid noise and erratic whipsaws",
        "Trade with maximum leverage on 1-minute chart signals",
        "Only buy stocks that have already surged >15%"
      ],
      "correct": 0,
      "explanation": "Allowing the Opening Range (e.g. 15-minute ORB) to establish lets supply and demand settle into a genuine trend."
    }
  ]
};
