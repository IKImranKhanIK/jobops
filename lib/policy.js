export const sourceModes = {
  greenhouse: "automatic",
  lever: "automatic",
  employer_site: "review_first",
  workday: "review_first",
  ashby: "review_first",
  indeed: "discovery_only",
  dice: "discovery_only",
  ziprecruiter: "discovery_only",
};

export function evaluateSource(source) {
  const mode = sourceModes[source] ?? "review_first";
  if (mode === "automatic") {
    return {
      mode,
      allowed: true,
      label: "Approved for guarded automation",
      detail: "Repeated form-level QA evidence exists for this adapter.",
    };
  }
  if (mode === "discovery_only") {
    return {
      mode,
      allowed: false,
      label: "Discovery only",
      detail: "The agent may collect the role, but it will not submit on this source.",
    };
  }
  return {
    mode,
    allowed: false,
    label: "Human review required",
    detail: "The agent prepares the application and stops before submission.",
  };
}

export function canSubmit({ source, hasVerifiedIdentity, hasApprovedResume, requiredAnswersComplete, blockedControl }) {
  const policy = evaluateSource(source);
  const checks = {
    approvedSource: policy.allowed,
    verifiedIdentity: Boolean(hasVerifiedIdentity),
    approvedResume: Boolean(hasApprovedResume),
    requiredAnswers: Boolean(requiredAnswersComplete),
    noProtectedControl: !blockedControl,
  };
  return {
    allowed: Object.values(checks).every(Boolean),
    checks,
    policy,
  };
}
