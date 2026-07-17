# Validation notes

The showcase is synthetic, but its architecture comes from a private working prototype that underwent an A-to-Z QA run on July 16, 2026.

## Snapshot

- Automation state: running.
- Automatic submission: enabled only for approved sources.
- 87 jobs saved.
- 23 ranked or interested.
- 10 confirmed applications.
- 0 pending confirmations.
- 0 failed sessions at the snapshot.
- Exactly one browser-worker process.
- 16 of 16 read-only API features returned HTTP 200.
- All-source QA: 54 working, 6 policy-protected, 2 degraded, 1 not implemented, 0 blocked.
- One full discovery run examined 5,450 listings from 24 public ATS sources.

## Confirmation evidence

Of the 10 confirmed applications in the snapshot:

- Seven had recognized browser success-page evidence.
- Three also had matching confirmation-email metadata.

The public repository does not contain application URLs, employer responses, candidate records, screenshots, resumes, or email metadata from those runs.

## Bugs found by the A-to-Z audit

- Discovery was incorrectly coupled to the application pause state.
- A hidden duplicate Apply button could win over the visible control.
- Embedded ATS iframe URL detection failed in one execution context.
- Scheduled tab cleanup could race with an active application.
- A required approved resume copy was missing from the upload allowlist.
- Dashboard dates could produce server/client hydration mismatches.
- Duplicate activity-map keys could show the oldest run instead of the newest.
- Static CSS text could be mistaken for a visible CAPTCHA.

Each issue received a regression test or a durable synchronization/policy fix in the private prototype.

## Known limitations

- Google search was not implemented; Bing RSS and DuckDuckGo fallback were used.
- Some public ATS sample URLs were stale and remained review-first.
- The email monitor required a separately configured Microsoft Graph client.
- CAPTCHA, MFA, assessments, access denial, and unknown required answers stop the application.

These limitations are disclosed because a trustworthy automation showcase should separate verified capability from aspiration.
