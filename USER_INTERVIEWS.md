# User Interviews

Three conversations conducted during the week of 
May 21-27, 2026 with potential users of the 
AI Spend Audit tool.

---

## Interview 1

**Name:** Kanishk Rathore
**Role:** Student / Aspiring Developer
**Company stage:** Pre-employment, active placement 
preparation

**Direct Quotes:**
- "I switch between them depending on what I need 
  because each one is good at different things."
- "As a student, the free versions handle most of 
  my work. I only feel the need for paid plans 
  sometimes when I hit limits."
- "Teams can end up paying for multiple AI tools 
  that do similar things, so having something that 
  shows where money can be saved would help."

**Most Surprising Thing:**
Kanishk uses 5 different AI tools daily — ChatGPT, 
Claude, Gemini, Codex, and Cursor — but has never 
paid for any of them. The surprising part was not 
the free usage, but the sophistication: he 
consciously switches between tools based on 
task type. This is exactly the behavior that 
leads to duplicate spending once he enters 
a paid team environment.

**What It Changed About the Design:**
This conversation made me realize the tool needs 
to serve a future user, not just a current one. 
Added a note on the results page for zero-spend 
users: "Starting a job soon? See what your team 
will likely spend." This keeps the tool relevant 
for students who are 3-6 months away from being 
the exact target customer.

---

## Interview 2

**Name:** Kartikey (last name withheld)
**Role:** Student
**Company stage:** Pre-employment

**Direct Quotes:**
- "Basic work can be done without any prepaid plan."
- "Yes, of course" — on whether a spend analysis 
  tool would be useful for teams.
- Uses ChatGPT and Gemini daily, approximately 
  1 hour per day.

**Most Surprising Thing:**
The brevity of the answers was itself revealing. 
Kartikey had no hesitation — "basic work can be 
done without paying" was stated as obvious fact, 
not a considered opinion. This suggests that 
for student users, the free tier is not a 
compromise — it genuinely meets their needs. 
The pain point only emerges at the team level 
where someone else is making purchasing decisions.

**What It Changed About the Design:**
Reinforced the decision to keep the tool's 
primary CTA focused on team spend, not 
individual spend. Solo users on free plans 
are not the conversion target — but they 
are future leads worth nurturing.

---

## Interview 3

**Name:** Rohan Mehta
**Role:** Student / Developer
**Company stage:** Pre-employment, active in 
hackathons and project work

**Direct Quotes:**
- "During project deadlines or hackathons it can 
  easily go higher because I rely on AI tools a 
  lot for faster development and problem solving."
- "The main thing stopping me is budget — as a 
  student, it's hard to justify paying monthly 
  unless I'm using it heavily for professional work."
- "Most teams probably end up paying for overlapping 
  AI tools without fully using all the features."

**Most Surprising Thing:**
Rohan already uses 4 different AI tools — ChatGPT, 
Gemini, Claude, and GitHub Copilot — and has 
independently identified the overlap problem 
without being prompted. He used the phrase 
"overlapping AI tools" unprompted, which is 
exactly the core value proposition of this tool. 
This suggests the problem is real and users can 
articulate it themselves — the tool does not need 
to educate users about the problem, just solve it.

**What It Changed About the Design:**
Rohan's combination of ChatGPT + Copilot as his 
ideal company stack validated the duplicate coding 
tools detection feature. He sees them as 
complementary — ChatGPT for planning and debugging, 
Copilot for inline coding. This means the audit 
engine should not always flag ChatGPT + Copilot 
as duplicate — context and use case matter. 
Updated the duplicate tools logic to only flag 
overlap when both tools serve identical purposes 
for the same use case.