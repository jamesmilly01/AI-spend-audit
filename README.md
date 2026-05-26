# AI Spend Audit

A free web tool that helps startup founders and 
engineering managers discover where they are 
overspending on AI tools — and what to do about it.

Built as a lead-generation asset for Credex, which 
sells discounted AI infrastructure credits.

## Screenshots

[Add 3 screenshots here after deployment]
Or Loom recording: [Add link]

## Live Demo

[Your Vercel URL here]

## Quick Start

### Run Locally
1. Clone the repo:
```bash
   git clone https://github.com/jamesmilly01/AI-spend-audit
   cd AI-spend-audit
```
2. Open `index.html` in your browser via Live Server
   (VS Code Live Server extension)

3. Create `config.js` in root with your keys:
```js
   // Never commit this file
   const GEMINI_API_KEY = 'your_key'
   const SUPABASE_URL = 'your_url'
   const SUPABASE_ANON_KEY = 'your_key'
```

### Deploy
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy

### Run Tests
```bash
npm test
```

## Decisions

1. **Vanilla JS over React/Next.js**
   Chose vanilla JS to ship faster within the 7-day
   window. The audit engine is pure logic with no 
   complex state management — a framework would add 
   complexity without benefit here. Justified per 
   assignment guidelines which explicitly allow vanilla.

2. **Supabase over Firebase**
   Supabase has a generous free tier, a simple REST 
   API, and Row Level Security built in. Firebase 
   would require more configuration for the same 
   result. Supabase also gives a direct SQL interface 
   which made debugging easier.

3. **Gemini API over Anthropic API**
   Anthropic API requires a credit card even for 
   free tier access. Gemini offers 1500 free requests
   per day via AI Studio with no card required — 
   better fit for a 7-day assignment with no budget.

4. **Vercel Serverless Functions for API calls**
   API keys cannot be hidden in vanilla JS on the 
   client side. Vercel Functions move key usage to 
   the server, preventing exposure in browser source.
   This adds a small latency cost but is non-negotiable
   for security.

5. **Base64 encoded shareable URLs over database IDs**
   Storing each audit in a database and returning an 
   ID would require an extra API call and database 
   read on every share. Base64 encoding the audit 
   data into the URL itself is stateless, faster, 
   and works without authentication — better fit for 
   a viral sharing use case.
