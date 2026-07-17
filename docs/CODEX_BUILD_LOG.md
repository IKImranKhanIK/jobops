# Codex build log

Codex served as the engineering partner for both the private prototype and this public-safe showcase.

## Repository understanding

- Mapped a multi-service Windows/Pi architecture.
- Traced job discovery, model routing, browser automation, confirmation, and recovery paths.
- Compared live API state, scheduled workers, database records, logs, and QA reports instead of relying on stale summaries.

## Reliability work

- Diagnosed browser-profile and tab-lifecycle failures.
- Corrected visible-element and embedded-frame handling.
- Added process, pacing, and profile locks.
- Added structured failure clustering and redacted logs.
- Built regression coverage for URL preflight, policy routing, uploads, required answers, tab cleanup, singleton workers, and confirmation behavior.

## Safety work

- Moved high-risk job boards to discovery-only policy.
- Restricted automatic submission to repeatedly verified ATS adapters.
- Preserved fail-closed behavior for unknown fields and protected controls.
- Separated Submit clicks from confirmed application evidence.

## Showcase work

- Recommended a separate public repository to protect personal data and working automation state.
- Designed a fictional candidate, employers, jobs, resumes, answers, and evidence events.
- Implemented the interactive JobOps console and GPT‑5.6 Responses API route.
- Added a deterministic, visibly labeled offline fallback.
- Wrote unit tests, a privacy scan, CI, architecture documentation, safety documentation, Devpost copy, and a timed demo-video script.

## Human decisions retained

The user chose the problem, target job tracks, location and salary preferences, approved resumes, local-first deployment, and the goal of sustained automation. Codex implemented and tested the system within those constraints. CAPTCHA, MFA, unknown candidate facts, and consequential agreements remain outside autonomous control.
