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