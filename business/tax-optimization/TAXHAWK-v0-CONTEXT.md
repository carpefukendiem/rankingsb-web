# TaxHawk Development Context — v0 Conversation History
## Background & Technical Decisions | February 23, 2026

---

## 📋 PROJECT ORIGIN

**Previous Work:** Built tax optimization app with v0 over several sessions
**Status:** Core functionality working, categorization engine built
**Current Issues:** GoHighLevel expenses not properly categorized in deductions

---

## 🎯 CORE REQUIREMENTS (From v0 History)

### 1. Automatic Expense Categorization
**Engine:** Rules-based categorization with confidence scoring
**Categories:** 30+ business expense categories aligned with Schedule C
**Goal:** Minimize manual categorization, maximize deductions

### 2. Multi-Account Support
**Business Accounts:** Auto-categorize to business expense categories
**Personal Accounts:** Auto-tag as "Personal Expense" — excluded from business taxes
**Overdraft Protection:** Handle GHL overdraft fees correctly (Bank Fees, not Software)

### 3. Tax Optimization Features
- **Deduction Finder:** Flags missed opportunities
- **Retirement Calculator:** SEP-IRA / Solo 401k contribution optimizer
- **Entity Comparison:** Sole Prop vs LLC vs S-Corp
- **Quarterly Estimator:** Real-time tax liability tracking
- **Amended Return Detection:** Identifies prior year savings

---

## 🔧 TECHNICAL ARCHITECTURE (From v0 Build)

### Categorization Engine
```
Transaction → Rules Engine (370+ patterns) → Category + Confidence
                ↓
        Manual Override (if needed)
                ↓
        Final Category Assignment
```

**Rule Priority System:**
1. **Override Patterns** (highest priority) — e.g., "Overdraft Fee" always = Bank Fees
2. **Vendor Patterns** — exact vendor matches (GHL, Google, etc.)
3. **Keyword Patterns** — partial matches with confidence scoring
4. **Smart Fallback** — income vs expense detection

### Known Issues FIXED:
- ✅ Overdraft fees miscategorized as Software (fixed with priority override)
- ✅ Personal account auto-exclusion (added Personal Account type)
- ✅ GHL truncated patterns (added "gohighle" for Wells Fargo truncation)
- ✅ Debug logging for troubleshooting categorization

### Known Issues REMAINING:
- ⚠️ Software & Web Hosting totals not reflecting GHL charges in dashboard
- ⚠️ Need to verify all 12 months of statements are uploaded
- ⚠️ Some GHL charges may be in different categories (need Force All re-categorization)

---

## 💰 GOHIGHLEVEL EXPENSE TRACKING

### GHL Charge Patterns (From Bank Statements):
- "HighLevel" — agency subscription ($497/mo)
- "HighLevel Inc." — various charges
- "GOHIGHLEVEL" — truncated on some banks
- "gohighle" — Wells Fargo truncation
- "LC Phone" — phone system charges
- "Recurring Payment... HighLevel" — subscription renewals

### Expected Annual GHL Costs:
- Agency subscription: ~$6,000/year ($497 × 12)
- LC Phone: ~$200-500/year
- Additional services: ~$500-1,000/year
- **Total Estimated:** $7,000-8,000/year

### Current Status:
- Categorization rules: ✅ Implemented
- Dashboard totals: ⚠️ Investigating (may be data upload issue)
- Overdraft fees: ✅ Fixed (now Bank Fees, not Software)

---

## 📁 DATA REQUIREMENTS

### For Complete 2025 Tax Analysis:
**Business Bank Accounts:**
- [ ] Business checking (all 12 months)
- [ ] Business savings (if applicable)
- [ ] Business credit cards (all 12 months)

**Personal Accounts (Mark as "Personal"):**
- [ ] Personal checking — auto-exclude from business taxes
- [ ] Personal credit cards — auto-exclude from business taxes

**Supporting Documents:**
- [ ] 2024 tax return (for comparison)
- [ ] 1099s received (if any)
- [ ] 1099s issued (to contractors like Sal)
- [ ] Loan statements (for that $20K payment)
- [ ] Home office measurements
- [ ] Health insurance premium records

---

## 🎯 TAX OPTIMIZATION PRIORITIES (2025)

### Phase 1: Data Collection
1. Upload all 2025 statements
2. Categorize all transactions
3. Verify GHL expenses properly tracked
4. Flag personal vs business expenses

### Phase 2: Deduction Analysis
1. Home office calculation
2. Vehicle mileage log (need to track going forward)
3. Health insurance premiums
4. Retirement contribution strategy
5. Equipment/Section 179 analysis

### Phase 3: Quarterly Planning
1. Q1 2025 estimated payment (due April 15)
2. Set up SEP-IRA or Solo 401k
3. Implement mileage tracking
4. Separate health insurance payments

### Phase 4: Entity Optimization
1. Evaluate S-Corp election for 2025
2. Break-even analysis ($40K net profit threshold)
3. Payroll setup if S-Corp elected

---

## 🐛 DEBUGGING NOTES

### From v0 Session (Most Recent):
- Added debug logging to trace GHL transactions
- Software & Web Hosting showing $2,762.96 (but should be ~$6,000+)
- Possible causes:
  1. Only 5 months of data uploaded (Jan-May)
  2. Some GHL charges categorized elsewhere
  3. Dashboard calculation bug

### Next Steps:
1. Upload remaining 2025 statements (Jun-Dec)
2. Run "Force All" re-categorization
3. Check console logs for GHL transaction tracing
4. Verify totals match expected annual spend

---

## 📊 SUCCESS METRICS

### 2024 Tax Return (Current):
- Net Profit: ~$17,180
- Tax Owed: ~$3,400
- **Goal:** File amended return, claim ~$3,400 refund

### 2025 Tax Plan (Target):
- Target Net Profit: Similar or higher
- Target Tax Liability: **$0**
- Strategy: Maximize deductions + retirement contributions

---

## 🚀 NEXT ACTIONS

### Immediate (This Week):
1. Upload all 2025 bank/credit card statements to `~/Desktop/Johnny5-Inbox/`
2. Upload v0 chat history for reference
3. Run TaxHawk categorization on full 2025 data
4. Verify GHL expenses totaling ~$7,000-8,000

### Short Term (Next 30 Days):
1. Open SEP-IRA or Solo 401k
2. Make 2024 contribution (for amended return)
3. Set up home office documentation
4. Clarify $20K loan payment (interest vs principal)

### Ongoing (2025):
1. Quarterly tax estimates
2. Monthly expense review
3. Mileage tracking (start immediately)
4. Health insurance separation

---

## 📎 REFERENCE FILES

**From v0 Build:**
- Categorization rules engine (370+ patterns)
- Interactive reports dashboard
- Statement uploader with personal account detection
- Income Statement generator
- Tax estimate calculator

**To Be Added:**
- 2025 bank statements (all months)
- 2025 credit card statements
- v0 chat history export
- 2024 tax return (for comparison)

---

*Context compiled: February 23, 2026*  
*Source: v0 conversation history*  
*Status: Development ongoing, awaiting 2025 data upload*

---

## 💬 KEY INSIGHTS FROM V0 CONVERSATIONS

1. **GHL charges are tricky** — appear under multiple names, get truncated by banks
2. **Overdraft fees need special handling** — always Bank Fees, never Software
3. **Personal account separation is critical** — auto-exclude from business taxes
4. **Force All button essential** — re-runs all rules, fixes miscategorizations
5. **Data completeness matters** — need all 12 months for accurate totals

---

**Ready for:** 2025 statement upload and full TaxHawk analysis
