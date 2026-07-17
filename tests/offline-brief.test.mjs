import test from "node:test";
import assert from "node:assert/strict";
import { jobs } from "../lib/demo-data.js";
import { buildOfflineBrief } from "../lib/offline-brief.js";

test("offline brief is deterministic and evidence bound", () => {
  const first = buildOfflineBrief(jobs[0]);
  const second = buildOfflineBrief(jobs[0]);
  assert.equal(first, second);
  assert.match(first, /91% fit/);
  assert.match(first, /Playwright/);
  assert.match(first, /do not invent experience/i);
});
