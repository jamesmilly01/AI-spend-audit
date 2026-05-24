# Dev Log

## Day 1 — 2026-05-21

**Hours worked:** 3

**What I did:**
Set up the project repository on GitHub. Built the 
main input form with all required AI tools — ChatGPT, 
Claude, Cursor, Copilot, and Gemini — using HTML and 
Bootstrap for layout and styling.

**What I learned:**
Form elements must use `id` attributes for JavaScript 
to access them via getElementById — class names alone 
do not work.

**Blockers / what I'm stuck on:**
Results page was not yet built.

**Plan for tomorrow:**
Build the audit engine logic and results page.

---

## Day 2 — 2026-05-22

**Hours worked:** 4

**What I did:**
Built audit.js with savings logic for all five tools.
Built results.html and results.js to display audit output.
Fixed three bugs:
- Select elements were missing id attributes
- Function name mismatch: auditChatgpt vs auditChatGPT
- Form values were being read as strings instead of numbers

**What I learned:**
JavaScript function names are case-sensitive.
parseInt and parseFloat are essential when reading 
numeric values from HTML form inputs.
Browser DevTools (Ctrl+Shift+I) is the fastest way 
to identify runtime errors.

**Blockers / what I'm stuck on:**
Need to verify savings calculations are accurate 
across all plan combinations.

**Plan for tomorrow:**
Build shareable URL feature.
Polish the UI for better visual quality.

## Day 3 — 2026-05-23

**Hours worked:** 4

**What I did:**
Built shareable URL feature — audit data is encoded 
using btoa/encodeURIComponent and appended to the URL 
as a query parameter. Sensitive data is stripped from 
the public version. Fixed InvalidCharacterError by 
using encodeURIComponent before btoa encoding.
Added share button on results page.

**What I learned:**
btoa() fails with special characters — need 
encodeURIComponent + unescape wrapper to handle 
Unicode safely. URLSearchParams API for reading 
query parameters cleanly.

**Blockers / what I'm stuck on:**
Email capture is still a placeholder — needs 
Supabase backend.

**Plan for tomorrow:**
Set up Supabase for lead storage.
Integrate Gemini API for personalized audit summary.
Add real email capture logic.

## Day 4 — 2026-05-24

**Hours worked:** 5

**What I did:**
Set up Supabase project and created the leads table 
with Row Level Security enabled. Added insert policy 
to allow anonymous lead capture. Integrated Supabase 
client in results.js for real email capture and storage.

Integrated Gemini 1.5 Flash API for personalized 
AI-generated audit summary. Added localStorage caching 
to avoid repeated API calls and stay within free tier 
rate limits. Implemented graceful fallback summary 
in case of API failure.

Fixed config.js with all API keys and added it to 
.gitignore to prevent secrets from being pushed to 
GitHub.

**What I learned:**
Supabase RLS must be enabled with an insert policy 
for anonymous clients to write data — without the 
policy, all inserts are blocked by default.
Gemini free tier has a strict rate limit of 2 requests 
per minute — caching API responses in localStorage 
is essential to avoid 429 errors.
API keys must never be committed to GitHub — 
.gitignore is the first line of defense.

**Blockers / what I'm stuck on:**
Gemini API hitting 429 rate limits frequently on 
free tier. Fallback summary is working correctly 
as a backup. Will test live API response after 
rate limit resets.
Transactional email (Resend) not yet integrated — 
currently only saving to Supabase.

**Plan for tomorrow:**
Deploy the project on Vercel.
Add Open Graph meta tags for shareable link previews.
Integrate Resend for transactional email confirmation.
Write automated tests for audit engine.