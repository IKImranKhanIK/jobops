# Architecture

## Responsibility map

```mermaid
flowchart TD
    A["Public ATS APIs and permitted search feeds"] --> B["Discovery agent"]
    B --> C["Normalize and deduplicate"]
    C --> D["Deterministic policy filter"]
    D -->|eligible| E["Track detection and fit scoring"]
    D -->|not eligible| R["Audit trail"]
    E --> F["GPT-5.6 decision brief"]
    F --> G["Approved resume router"]
    G --> H["Verified-answer resolver"]
    H --> I["Guarded browser worker"]
    I -->|recognized success| J["Confirmation evidence"]
    I -->|unknown field / CAPTCHA / MFA / assessment| Q["Recovery queue"]
    J --> R
    Q --> R
```

## Public showcase

The standalone showcase is intentionally small and safe:

- Next.js renders the interactive operations console.
- Synthetic fixtures model the applicant, resumes, jobs, and verified answers.
- `lib/policy.js` owns source permissions and submission invariants.
- `POST /api/brief` calls the OpenAI Responses API.
- GPT‑5.6 receives only the selected synthetic job and a non-fabrication rule.
- When no API key exists, a deterministic local brief is returned with an explicit disclosure.
- No database, real resume, job board account, or employer endpoint is required.

## Private prototype

The validated private prototype has a larger operational architecture:

```mermaid
flowchart LR
    subgraph Windows["Windows workstation"]
      UI["Next.js dashboard"]
      API["FastAPI"]
      ORCH["Scheduled orchestrator"]
      BW["Browser worker"]
      LM["Local model router"]
      LOG["Structured logs and analyzer"]
    end
    subgraph PrivateDB["Private database host"]
      DB[("PostgreSQL")]
    end
    UI <--> API
    API <--> DB
    ORCH <--> API
    ORCH <--> LM
    BW <--> API
    BW --> LOG
    ORCH --> LOG
```

Windows owns application compute, browser control, scheduled work, documents, and local inference. PostgreSQL is isolated behind a private tunnel. The architecture does not require public hosting or shared browser credentials.

## Why the model is not the policy engine

Permissions must be inspectable and stable. The model therefore cannot decide whether a source is allowed, whether a resume hash is approved, whether a required field is complete, or whether a success page counts as confirmation. GPT‑5.6 is used where language understanding adds value: compressing evidence into a clear decision brief and surfacing a watch item.

## Evidence states

```mermaid
stateDiagram-v2
    [*] --> discovered
    discovered --> ranked: eligible and scored
    ranked --> queued: policy allows preparation
    queued --> attention: unknown or protected control
    queued --> pending_confirmation: submit clicked
    pending_confirmation --> confirmed_browser: recognized success page
    pending_confirmation --> confirmed_email: matched confirmation email
    pending_confirmation --> attention: ambiguous or timed out
```

The central invariant is that `submit clicked` and `application confirmed` are different states.
