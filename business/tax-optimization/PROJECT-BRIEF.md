# Tax Optimization App — Project Brief
## Custom Accounting Software (Bench.io Alternative)

---

## Problem Statement

**Current Situation:**
- Using Bench.io for accounting
- Extensive transaction categorization done manually
- Output: Still owe $5,000 for 2024
- Ruben's assessment: Should be much lower (closer to $0)
- Goal: Minimize taxes legally to as close to $0 as possible

**Pain Points with Bench:**
- Hit roadblocks/limits with optimization
- Can't minimize further despite extensive work
- Lacks aggressive deduction strategies
- Generic approach, not tailored to Ruben's situation

---

## Project Objective

Build a custom tax optimization app that:
1. **Imports transactions** (from bank, credit cards, Bench export)
2. **Smart categorization** — AI-assisted with tax code awareness
3. **Deduction finder** — Flags missed opportunities automatically
4. **Entity optimizer** — Compares Sole Prop vs LLC vs S-Corp
5. **Quarterly estimator** — Real-time tax liability tracking
6. **Strategy engine** — Suggests legal moves to reduce liability
7. **Document generator** — Produces Schedule C, quarterly filings

**Target:** $0 tax liability for 2025 (and amend 2024 if possible)

---

## Core Features

### 1. Transaction Import
**Sources:**
- CSV upload (bank exports)
- Plaid integration (automatic bank sync)
- Bench.io data export/import
- Manual entry for cash expenses

**Format:**
- Date, Description, Amount, Category, Deductible?, Notes

### 2. Smart Categorization
**Tax Code-Aware Categories:**
- Advertising & Marketing (100% deductible)
- Vehicle Expenses (actual or mileage)
- Home Office (simplified or actual expense)
- Meals (50% deductible — common mistake!)
- Travel (100% if business purpose)
- Equipment & Software (Section 179 or depreciation)
- Professional Development (courses, books)
- Health Insurance (above-line deduction)
- Retirement Contributions (SEP-IRA, Solo 401k)
- Contractors/Payments to Sal (1099s)

**AI Features:**
- Auto-suggest category based on vendor/description
- Learn from Ruben's patterns
- Flag unusual transactions
- Warn about personal vs. business mixing

### 3. Deduction Maximizer
**Automatic Detection:**
- Home office square footage calculator
- Vehicle mileage tracker (GPS integration?)
- Business meal suggestions
- Subscription services (software, tools)
- Phone/internet % business use
- Health insurance premiums
- Qualified business income (QBI) deduction

**What-If Scenarios:**
- "What if I contribute $10K to SEP-IRA?"
- "What if I elect S-Corp status?"
- "What if I accelerate equipment purchases?"

### 4. Entity Structure Optimizer
**Compares:**
- Sole Proprietorship (current?)
- Single-Member LLC
- S-Corporation
- Partnership (if applicable)

**Calculates:**
- Self-employment tax savings
- Admin costs vs. tax savings
- Break-even analysis
- Recommendation with ROI

### 5. Real-Time Tax Dashboard
**Shows:**
- Estimated annual tax liability
- Quarterly payment recommendations
- Safe harbor calculations (110% of last year)
- Current deductions claimed
- Potential deductions available
- Progress to $0 goal

### 6. Document Generation
**Outputs:**
- Schedule C (Form 1040)
- Quarterly 1040-ES vouchers
- 1099-NEC for contractors (Sal)
- Mileage logs
- Home office documentation
- Asset depreciation schedules

---

## Technical Stack

**Frontend:**
- Next.js (consistent with Rankingsb site)
- shadcn/ui components
- Charts: Recharts or Chart.js
- Forms: React Hook Form + Zod

**Backend:**
- Next.js API routes
- Database: Supabase (same as memory system)
- Auth: Supabase Auth (Ruben + TaxHawk agent)
- File storage: Supabase Storage (receipts)

**Integrations:**
- Plaid (bank sync) — optional Phase 2
- IRS e-file API — future
- Bench.io export parser — immediate

**AI/ML:**
- OpenAI API for categorization
- Custom rules engine for deductions

---

## User Flow

### Daily Use:
1. Upload/Review transactions
2. AI suggests categories
3. Ruben confirms/corrects
4. System calculates tax impact
5. Dashboard updates in real-time

### Monthly Review:
1. Review categorized expenses
2. Check for missed deductions
3. Optimize entity structure (quarterly)
4. Adjust quarterly payment estimates

### Tax Season:
1. Generate all forms
2. Review with TaxHawk agent
3. File or send to CPA
4. Plan next year strategy

---

## Success Metrics

**Phase 1 (Immediate):**
- Import 2024 transactions from Bench
- Find $5K+ in missed deductions
- File amended return if beneficial

**Phase 2 (2025):**
- Real-time quarterly tracking
- Stay at $0 liability
- Quarterly tax payments optimized

**Phase 3 (Ongoing):**
- Entity structure optimized
- Retirement contributions maximized
- Audit-proof documentation

---

## Comparison to Bench.io

| Feature | Bench | TaxHawk App |
|---------|-------|-------------|
| Transaction import | ✅ | ✅ |
| Basic categorization | ✅ | ✅ |
| Tax code optimization | ❌ Basic | ✅ Aggressive |
| Entity comparison | ❌ | ✅ |
| What-if scenarios | ❌ | ✅ |
| Real-time estimator | ❌ | ✅ |
| Deduction finder | ❌ | ✅ AI-powered |
| Custom for Ruben | ❌ | ✅ |
| Cost | $199+/mo | $0 (self-hosted) |

---

## Roadblock Analysis

**Where Ruben Got Stuck with V0:**
Likely issues:
- Complex tax logic implementation
- Entity structure calculations
- Integration with financial data
- Document generation
- State tax nuances (California)

**TaxHawk Agent Will Solve:**
- Tax code expertise
- Strategy recommendations
- Validation of calculations
- Filing guidance
- Ongoing optimization

---

## Immediate Next Steps

1. **Export Bench Data** — Get 2024 transactions CSV
2. **Entity Verification** — Confirm current structure
3. **Transaction Import** — Load data into new system
4. **Deduction Audit** — Find the $5K+ in savings
5. **Strategy Session** — Plan 2025 to stay at $0

---

## File Locations

```
workspace/
├── projects/
│   └── tax-optimizer/           # New app
│       ├── app/
│       ├── components/
│       ├── lib/
│       │   └── tax-engine/      # Deduction logic
│       └── supabase/
│           └── schema.sql       # Transactions table
├── agents/
│   └── TaxHawk-CONFIG.md        # Agent configuration
└── business/
    └── tax-optimization/
        ├── 2024-transactions/   # Exported data
        └── strategy-notes.md    # TaxHawk's analysis
```

---

**Project Created:** February 22, 2026  
**Agent:** TaxHawk 🦅  
**Goal:** $0 tax liability legally  
**Status:** Ready to begin audit
