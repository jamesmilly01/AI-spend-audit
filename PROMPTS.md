# Prompts

## AI Summary Generation Prompt

### Where it's used:
`results.js` → `generateAISummary()` function
Called via `/api/gemini` Vercel serverless function.

### The Prompt:
You are an AI spend optimization expert. A startup
has completed an AI tool audit with these results:
[TOOL_LIST]
Total potential monthly savings: $[MONTHLY]
Total potential annual savings: $[ANNUAL]
Write a concise 80-100 word personalized summary
of their AI spending situation. Be specific, mention
actual numbers, and give one clear action they should
take first. Be direct and professional, not salesy.

### Why I wrote it this way:
- Role assignment ("You are an AI spend optimization 
  expert") grounds the model in the right context
- Providing actual numbers forces specific output 
  rather than generic advice
- "80-100 words" constraint prevents verbose responses
- "not salesy" instruction prevents the model from 
  pushing Credex — the audit must feel trustworthy first
- "one clear action" forces prioritization — 
  users with 5 recommendations do nothing

### What I tried that didn't work:
- Without the word limit, responses were 200+ words 
  and too generic
- Without "not salesy", model kept recommending 
  premium upgrades unprompted
- Asking for bullet points made output feel robotic — 
  prose paragraph converts better

### Fallback behavior:
If Gemini API fails (rate limit, network error), 
a templated summary is shown:

"Your audit identified $X/month in potential savings
across N tools. The biggest opportunity is to review
your current plans — switching to better-fit tiers
could save you $Y annually."

### Model used:
gemini-2.0-flash-lite via Google AI Studio free tier
Endpoint: generativelanguage.googleapis.com/v1beta/