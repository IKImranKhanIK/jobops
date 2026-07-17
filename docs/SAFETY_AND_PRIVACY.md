# Safety and privacy

Job application data is unusually sensitive. It can include identity, contact information, employment history, education, demographic responses, work authorization, disability disclosures, and credentials to signed-in job sites. JobOps treats safety and privacy as architecture, not prompt wording.

## Public showcase boundary

- Candidate `Jordan Lee` is fictional.
- Employers, jobs, resumes, IDs, and evidence are synthetic fixtures.
- The demo does not navigate to an employer or job board.
- `.env*` files are ignored except `.env.example`.
- A privacy scanner blocks known private identity, resume, and local-path markers.
- OpenAI receives only the synthetic selected-job object in the showcase.

## Action policy

Every source has one explicit mode:

- `automatic`: allowed only after repeated form-level QA evidence.
- `review_first`: the system may prepare the workflow but a human owns submission.
- `discovery_only`: the system may collect the role but cannot fill or submit there.

Unknown sources default to `review_first`.

## Submission invariants

All of the following must be true before an automatic source can proceed:

1. Source policy explicitly allows automation.
2. Identity data has been verified.
3. The selected resume is approved and its identity is unchanged.
4. Every required answer is supported by verified facts.
5. No protected or ambiguous control is present.

These are deterministic checks. A model cannot override them.

## Protected controls

JobOps does not bypass:

- CAPTCHA or bot challenges.
- MFA or device verification.
- Assessments and interviews.
- Login walls or access denial.
- Unknown required questions.
- Background-check authorizations, offer letters, employment agreements, purchases, or paid subscriptions.

The affected workflow moves to attention with a clear stop reason. Other eligible work may continue only when account-level circuit breakers remain healthy.

## Truthful model behavior

The GPT‑5.6 prompt is intentionally narrow. It receives supplied facts, creates a four-part brief, and is instructed not to fabricate qualifications. The model explains evidence; it does not own permissions or candidate truth.

If the OpenAI call is unavailable, the public demo returns a deterministic result with the label `Offline demo · clearly labeled`. This avoids false claims about model usage.

## Confirmation standard

A clicked Submit control creates a pending state. Only one of these can confirm an application:

- A recognized employer success page.
- A matched confirmation email.

Ambiguous pages remain pending or move to attention. The system never turns “probably submitted” into a success metric.
