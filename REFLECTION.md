# Reflection

## 1. The Hardest Bug

The hardest bug I faced was on the audit results page, where the savings always showed `$0` no matter what input was entered.

At first, the form seemed to be working perfectly. The data was being collected correctly and stored in `localStorage`, so I assumed the issue had to be inside the audit engine itself. I spent a good amount of time going through all the `if/else` conditions manually, checking whether the logic made sense.

Eventually, I opened the browser console and found this error:

`Uncaught ReferenceError: auditChatGpt is not defined`

The issue was surprisingly small — the function was originally named `auditChatGPT` (capital GPT), but somewhere else it was being called as `auditChatgpt` (lowercase). Since JavaScript is case-sensitive, that one-character mismatch silently broke the entire engine.

After fixing that, I expected everything to work, but the savings still showed `0`. My next assumption was that the problem was related to data types. HTML form values are always returned as strings, while my logic was using numeric comparisons like `seats > 1`.

Initially, this looked fine because JavaScript automatically coerces values, so expressions like `"5" > 1` still evaluate to `true`. But the actual problem was that I forgot to use `parseInt` and `parseFloat` when reading the form values. Because of that, operations like `spend - teamCost` were behaving incorrectly due to string handling instead of proper arithmetic.

Once I added `parseInt` and `parseFloat` everywhere necessary, the savings calculations finally worked as expected.

**Lesson learned:** open DevTools early. I spent almost 30 minutes re-reading logic that looked correct, when the console had already pointed directly to the real issue.

---

## 2. A Decision I Reversed

Initially, I planned to use the Anthropic API for the AI summary feature because the assignment recommended it, and it felt like the safest choice to follow.

I created an account on `console.anthropic.com`, only to realize that even the free tier required a credit card. Since this assignment is unpaid and there’s no guaranteed outcome, spending money on API credits didn’t feel reasonable.

Because of that, I changed the approach and switched to the Gemini API through Google AI Studio, which provides around 1500 free requests per day without requiring a card.

This decision also taught me an important lesson about reading requirements carefully. The assignment mentioned that the “Anthropic API is preferred” and suggested applying for free credits if needed. I initially interpreted “preferred” as “mandatory.” After reading it again properly, I realized the assignment explicitly allowed using any LLM.

That distinction mattered. “Preferred” was guidance, not a strict requirement.

In a real startup environment, making cost-conscious decisions is part of good judgment, and using a free API for an unvalidated product was the practical choice here.

---

## 3. What I Would Build in Week 2

If I had another week, these would be the top three priorities:

### 1. Benchmark Mode

The idea is to show users how their AI spending compares with similar teams.

For example:

“Your AI spend per developer is $47/month — companies your size average $31/month.”

Since audit data is already being stored in Supabase, the next step would be building aggregation queries and displaying benchmark insights directly on the results page.

I think this feature has the highest viral potential because people naturally like comparing themselves with peers.

### 2. Embeddable Widget

I would create a simple `<script>`-based widget that developers or newsletters could embed directly into blogs.

The widget would contain a lightweight version of the audit form — probably just tool selection and monthly spend — and redirect users to the full audit experience.

From a product perspective, this becomes a distribution channel. Every website embedding the widget effectively turns into a lead source.

### 3. Resend Transactional Emails

Currently, leads are saved to Supabase, but users don’t receive any follow-up communication.

Week 2 would include integrating Resend to:

* Send a confirmation email with the audit summary PDF
* Trigger follow-up emails a few days later for high-savings cases
* Potentially redirect qualified leads toward Credex services

---

## 4. How I Used AI Tools

### Tools Used

* Claude (`claude.ai`) for architecture guidance, debugging support, and writing help
* GitHub Copilot free tier for inline code suggestions

### What I Used AI For

* Generating boilerplate structures
* Debugging errors by pasting stack traces and asking for possible causes
* Expanding and polishing markdown documentation after writing the first drafts myself
* Understanding unfamiliar APIs like Supabase RLS and Vercel Functions

### What I Did *Not* Trust AI With

* The audit engine logic itself. I wrote all the `if/else` rules manually because the reasoning behind the savings calculations needed to be defensible and accurate. AI-generated versions felt too generic, and I caught multiple cases where the calculations were wrong.
* Final architecture decisions. AI repeatedly suggested using Next.js, but for this assignment, vanilla JavaScript was simply the better fit in terms of scope, speed, and complexity.

### One Case Where AI Was Wrong

At one point, Claude suggested using `btoa()` directly on the audit JSON to create a shareable URL.

That caused this error:

`InvalidCharacterError`

The problem was that the JSON contained characters outside the Latin1 range, including special symbols inside recommendation strings.

The eventual fix was:

`btoa(unescape(encodeURIComponent(...)))`

I had to figure that out manually after the AI’s first two solutions failed as well.

---

## 5. Self Rating

### Discipline — 6/10

I started the project well, but I underestimated the setup time and ended up completing most of Day 1’s planned work on Day 2. The repository still has commits spread across 6 different days, but the workload distribution was definitely uneven, with most progress happening during the second half of the week.

### Code Quality — 6/10

The audit engine itself is fairly clean and readable, with properly named functions and understandable logic. However, `results.js` became messy over time as features were added incrementally. It would benefit from a proper refactor. Also, the absence of TypeScript is a noticeable weakness.

### Design Sense — 5/10

I used Bootstrap mainly for speed and practicality. The UI is functional, readable, and easy to navigate, but visually it still feels generic. The results page hierarchy is decent, though the product lacks a more distinctive visual identity. With another week, I would spend more time on custom styling and polish.

### Problem Solving — 7/10

Once I started relying more on the browser console and debugging systematically, problem-solving became much faster. I also made practical decisions under time pressure, such as choosing Gemini over Anthropic and sticking with vanilla JS instead of overengineering with Next.js. That said, better upfront planning for file structure would have reduced some later chaos.

### Entrepreneurial Thinking — 7/10

I understood fairly early that this product is essentially a lead-generation tool packaged as a useful utility. The GTM thinking and cost assumptions are grounded in realistic numbers rather than vague ideas. User interviews also helped me realize that even non-paying users provide valuable insight into perceived AI tool value. The score would likely be higher if I had more time to implement the benchmark and sharing systems.
