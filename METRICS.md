# Metrics

## North Star Metric

**Audits Completed per Week**

This is the single number that matters most at 
this stage. An audit completed means:
- User understood the value proposition
- User trusted the tool enough to enter real data
- User is now a qualified lead

Everything else — emails captured, consultations 
booked, credits purchased — flows downstream from 
this number. If audits completed is growing, the 
business is growing.

Why not "emails captured"? Because email capture 
happens after the audit — optimizing for emails 
would incentivize dark patterns like gating results. 
Audits completed keeps the product honest.

Why not "visitors"? Visitors without audits means 
the landing page or form is failing. Visitors is 
a vanity metric at this stage.

---

## 3 Input Metrics That Drive the North Star

### 1. Landing Page → Form Start Rate
**Target: >40%**

What percentage of visitors who land on index.html 
actually start filling the form. If this is low, 
the headline or CTA is not resonating. This is 
the first filter in the funnel.

### 2. Form Start → Audit Completion Rate
**Target: >60%**

What percentage of users who start the form 
actually submit it. Drop-off here means the form 
is too long, too confusing, or asking for data 
users don't have handy. Fix: progressive disclosure, 
fewer required fields, better placeholder text.

### 3. Audit Completion → Email Capture Rate
**Target: >25%**

What percentage of users who see results choose 
to save their report. This is the lead generation 
conversion. Low rate means results are not 
compelling enough, or the email ask feels too 
early/aggressive.

---

## What to Instrument First

In order of priority:

1. **Audit completions** — fire an event every time 
   results.html loads with valid audit data

2. **Form start rate** — fire an event on first 
   interaction with the form (first select change)

3. **Email captures** — already tracked via Supabase 
   leads table — query count daily

4. **High-savings audits** — count audits where 
   totalMonthlySavings > $500 — these are the 
   Credex-qualified leads

5. **Shareable link copies** — track copyShareLink() 
   calls — this measures viral coefficient

Tool: Plausible Analytics (privacy-friendly, 
$9/month) or self-hosted via Supabase events table.

---

## What Number Triggers a Pivot Decision

**If after 30 days:**

- Audit completion rate < 15%
  → Form is broken or too complex
  → Pivot: reduce to 3 tools max, show partial 
    results immediately

- Email capture rate < 10%
  → Results are not compelling
  → Pivot: add benchmark comparison to results page,
    make savings number bigger and more visual

- Consultations booked = 0 after 50+ audits
  → Credex CTA placement is wrong, or savings 
    threshold ($500) is too high
  → Pivot: lower threshold to $200, test different 
    CTA copy

- Zero organic shares after 100 audits
  → Shareable URL feature not being used
  → Pivot: add "Share your savings" prompt 
    immediately after results render, before 
    email capture