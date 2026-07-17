import test from "node:test";
import assert from "node:assert/strict";
import { canSubmit, evaluateSource } from "../lib/policy.js";

test("only repeatedly verified ATS sources are automatic", () => {
  assert.equal(evaluateSource("greenhouse").mode, "automatic");
  assert.equal(evaluateSource("lever").mode, "automatic");
  assert.equal(evaluateSource("indeed").mode, "discovery_only");
  assert.equal(evaluateSource("employer_site").mode, "review_first");
});

test("all safety checks must pass before a submission is allowed", () => {
  const ready = canSubmit({
    source: "greenhouse",
    hasVerifiedIdentity: true,
    hasApprovedResume: true,
    requiredAnswersComplete: true,
    blockedControl: false,
  });
  assert.equal(ready.allowed, true);

  for (const changed of [
    { source: "indeed" },
    { hasVerifiedIdentity: false },
    { hasApprovedResume: false },
    { requiredAnswersComplete: false },
    { blockedControl: true },
  ]) {
    const result = canSubmit({
      source: "greenhouse",
      hasVerifiedIdentity: true,
      hasApprovedResume: true,
      requiredAnswersComplete: true,
      blockedControl: false,
      ...changed,
    });
    assert.equal(result.allowed, false);
  }
});

test("unknown sources fail to human review", () => {
  const policy = evaluateSource("new_ats");
  assert.equal(policy.mode, "review_first");
  assert.equal(policy.allowed, false);
});
