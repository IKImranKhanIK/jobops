# Devpost submission copy

Copy these sections into Devpost after replacing the three `TODO` links.

## Project name

JobOps

## Tagline

An auditable AI agent that moves job applications forward—and knows when to stop.

## One-sentence pitch

JobOps discovers roles, explains fit with GPT‑5.6, routes an approved resume, prepares verified application answers, and records proof while failing closed whenever identity, policy, or human judgment is uncertain.

## Project links

- Repository: https://github.com/IKImranKhanIK/jobops
- Demo video: `TODO_DEMO_VIDEO_URL`
- Optional live demo: `TODO_LIVE_DEMO_URL`

## Inspiration

Searching for work looks simple from the outside, but it is really a fragmented operations workflow. A candidate has to discover roles across dozens of sources, remove duplicates, interpret salary and location restrictions, select the correct resume, answer the same questions repeatedly, keep track of unfinished applications, and later prove what was actually submitted.

Most automation treats the problem as a race for application volume. That creates a trust problem: the candidate cannot tell why the system acted, which facts it used, or whether it confused a button click with a completed application. We built JobOps around a different question: **what would job automation look like if every action had to be explainable, reversible, and supported by evidence?**

## What it does

JobOps is a local-first job application operations agent. It:

1. Discovers roles from public ATS feeds and permitted search sources.
2. Normalizes links, removes tracking parameters, and deduplicates opportunities.
3. Filters by location, salary, employment type, and clearance requirements.
4. Detects the career track and scores the role against an approved resume.
5. Uses GPT‑5.6 to create a concise, evidence-bound decision brief.
6. Routes the correct approved resume and verified candidate answers.
7. Applies only when the source and all required facts pass explicit safety gates.
8. Stops on CAPTCHA, MFA, assessments, unknown required questions, or ambiguous success states.
9. Treats submission as confirmed only when browser or email evidence exists.
10. Records every decision in an audit trail and recovery queue.

The public showcase contains only synthetic candidate data, fictional employers, and a local ATS simulation. It demonstrates the complete decision path without contacting a real employer.

## How we built it

Codex was used as the engineering partner across the full lifecycle: repository archaeology, architecture decisions, browser-worker debugging, policy regression tests, UI implementation, privacy review, and packaging the public showcase.

The showcase is built with Next.js 15 and React 19. Its server-side decision-brief route calls the OpenAI Responses API with GPT‑5.6. The prompt provides only synthetic job context and enforces an evidence boundary: the model must use supplied facts and must not fabricate qualifications. If no API key is configured, JobOps uses deterministic rules and labels the result as offline demo content instead of pretending it is model output.

The production prototype is local-first: Windows hosts the dashboard, API, browser worker, and local inference; PostgreSQL is isolated behind a private tunnel. Its browser layer uses source-level permissions, persistent identity controls, pacing locks, tab cleanup, explicit confirmation detection, structured logs, and a recovery queue.

## Thoughtful use of GPT‑5.6

GPT‑5.6 is not used to make an opaque yes/no decision or invent a more impressive candidate. It receives a minimized, structured view of one synthetic role and produces a short decision brief with four required parts: fit verdict, evidence, watch item, and recommendation. The result is visible beside the policy and resume-routing evidence, so a user can compare model reasoning with deterministic controls.

This separation is intentional:

- Deterministic code owns permissions, required checks, and whether an action is allowed.
- GPT‑5.6 owns explanation and nuanced synthesis.
- Human control owns unknown or consequential decisions.

## Challenges we ran into

The hardest problems were not selectors. They were state and truth.

- A browser click is not proof that an application was accepted.
- Hidden duplicate buttons can look identical to visible controls.
- Cleanup jobs can accidentally race with an active application.
- A stale signed-in browser profile can silently become a different identity.
- Job pages contain words like “CAPTCHA” in scripts and styles even when no challenge is visible.
- A system that searches reliably still needs to distinguish automatic, review-first, and discovery-only sources.

We addressed these with confirmation evidence, visible-element selection, shared profile locks, singleton workers, visible-text challenge detection, source-specific circuit breakers, immutable resume hashes, and fail-closed policies.

## Accomplishments that we are proud of

- Built a full operational loop rather than a single form-filling script.
- Validated one discovery run against 5,450 listings from 24 ATS sources.
- Verified all 16 read-only API surfaces in the private prototype.
- Recorded 10 confirmed applications backed by browser or email evidence.
- Made safety behavior visible and testable instead of hiding it in prompts.
- Created a public demo that is useful without exposing personal resumes, job history, accounts, or production configuration.

## What we learned

Reliable agents need two kinds of intelligence. Models are strong at synthesis, classification, and explaining tradeoffs. Deterministic systems are better at permissions, invariants, and evidence. The strongest workflow assigns each responsibility deliberately.

We also learned that failure states are part of the user experience. A clear “stopped because this required answer is unknown” is more valuable than a superficially autonomous system that guesses.

## What is next

- Add evaluation datasets for fit briefs and stop-reason accuracy.
- Expand repeatedly verified adapters while keeping new sources review-first.
- Add privacy-preserving outcome analytics that learn which job and resume combinations produce interviews.
- Add optional encrypted multi-device access without exposing browser sessions publicly.
- Turn the policy and evidence engine into a reusable toolkit for other high-stakes browser workflows.

## Built with

Codex, GPT‑5.6, OpenAI Responses API, Next.js, React, Node.js, PostgreSQL, FastAPI, Playwright, Selenium, Ollama, Docker, and Windows Task Scheduler.

## Safety disclosure

The public demo never contacts a real employer. JobOps does not bypass CAPTCHA or MFA, fabricate candidate facts, accept employment contracts, or claim success without evidence. Sources without repeated form-level QA evidence default to review-first or discovery-only.
