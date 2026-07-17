"use client";

import { useMemo, useState } from "react";
import { candidate, jobs, verifiedAnswers } from "@/lib/demo-data";
import { canSubmit, evaluateSource } from "@/lib/policy";

const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const stageCopy = {
  discover: ["Discovery agent", "Normalized job and removed tracking parameters"],
  policy: ["Policy agent", "Checked source permission, location, salary, and clearance rules"],
  reason: ["Reasoning agent", "Generated an evidence-bound fit decision brief"],
  route: ["Resume router", "Selected the approved resume for this career track"],
  prepare: ["Application agent", "Filled the synthetic form using verified answers only"],
  verify: ["Evidence agent", "Verified the local success state and wrote confirmation evidence"],
};

export default function DemoConsole() {
  const [selectedId, setSelectedId] = useState(jobs[0].id);
  const [events, setEvents] = useState([]);
  const [brief, setBrief] = useState(null);
  const [running, setRunning] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const selected = useMemo(() => jobs.find((job) => job.id === selectedId) ?? jobs[0], [selectedId]);
  const policy = evaluateSource(selected.source);

  function chooseJob(id) {
    if (running) return;
    setSelectedId(id);
    setEvents([]);
    setBrief(null);
    setConfirmed(false);
  }

  async function runDemo() {
    if (running) return;
    setRunning(true);
    setEvents([]);
    setBrief(null);
    setConfirmed(false);
    const stages = ["discover", "policy", "reason", "route", "prepare", "verify"];
    for (const stage of stages) {
      setEvents((current) => [...current, { stage, status: "active", ...stageCopy[stage] }]);
      if (stage === "reason") {
        try {
          const response = await fetch("/api/brief", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jobId: selected.id }) });
          const payload = await response.json();
          setBrief(response.ok ? payload : { error: payload.error ?? "Decision brief unavailable." });
        } catch {
          setBrief({ error: "Decision brief unavailable." });
        }
      }
      await sleep(560);
      setEvents((current) => current.map((event) => event.stage === stage ? { ...event, status: "done" } : event));
      if (stage === "policy" && !policy.allowed) break;
    }
    const decision = canSubmit({ source: selected.source, hasVerifiedIdentity: true, hasApprovedResume: true, requiredAnswersComplete: true, blockedControl: false });
    setConfirmed(decision.allowed);
    setRunning(false);
  }

  return (
    <div className="console">
      <div className="console-top"><div><span className="live-dot" /> SAFE DEMO ENVIRONMENT</div><div>synthetic-data.local <span className="lock">⌁</span></div></div>
      <div className="console-grid">
        <aside className="job-picker">
          <p className="console-label">DISCOVERED JOBS</p>
          {jobs.map((job) => <button className={job.id === selected.id ? "job-option selected" : "job-option"} key={job.id} onClick={() => chooseJob(job.id)} disabled={running}><span className="match-ring" style={{ "--match": `${job.match * 3.6}deg` }}><i>{job.match}</i></span><span><strong>{job.title}</strong><small>{job.company}<br />{job.location}</small></span></button>)}
          <div className="candidate-card"><p className="console-label">SYNTHETIC CANDIDATE</p><strong>{candidate.name}</strong><small>{candidate.location}</small><div>{candidate.preferences.map((preference) => <span key={preference}>{preference}</span>)}</div></div>
        </aside>

        <section className="run-panel">
          <div className="selected-job"><div><p className="console-label">SELECTED OPPORTUNITY</p><h3>{selected.title}</h3><p>{selected.company} · {selected.salary}</p></div><div className={`policy-chip ${policy.mode}`}>{policy.label}</div></div>
          <div className="job-summary"><p>{selected.summary}</p><div>{selected.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
          <div className="timeline">
            {events.length === 0 ? <div className="empty-timeline"><span>◎</span><strong>Ready to run</strong><p>Select a synthetic job, then watch the agents make and record each decision.</p></div> : events.map((event, index) => <div className={`timeline-event ${event.status}`} key={event.stage}><span className="event-index">{String(index + 1).padStart(2, "0")}</span><div><strong>{event[0]}</strong><p>{event[1]}</p></div><span className="event-state">{event.status === "done" ? "✓" : "•••"}</span></div>)}
          </div>
          <button className="run-button" onClick={runDemo} disabled={running}>{running ? "Agents are working…" : events.length ? "Run again" : "Run safe application demo"}<span>→</span></button>
        </section>

        <aside className="evidence-panel">
          <p className="console-label">DECISION & EVIDENCE</p>
          <div className="evidence-card"><span className="evidence-icon">✦</span><div><small>MODEL DECISION BRIEF</small>{brief?.brief ? <p className="brief-text">{brief.brief}</p> : brief?.error ? <p className="error-text">{brief.error}</p> : <p>Run the demo to generate an evidence-bound explanation.</p>}{brief?.provider && <span className={`provider ${brief.provider}`}>{brief.provider === "openai" ? brief.model : "Offline demo · clearly labeled"}</span>}</div></div>
          <div className="evidence-card"><span className="evidence-icon">▤</span><div><small>RESUME ROUTE</small><strong>{events.some((event) => event.stage === "route") ? selected.resume : "Pending"}</strong><p>{selected.track} track · approved fixture</p></div></div>
          <div className="answer-grid"><div><small>WORK AUTHORIZATION</small><strong>{verifiedAnswers.workAuthorization}</strong></div><div><small>SPONSORSHIP</small><strong>{verifiedAnswers.sponsorshipRequired}</strong></div></div>
          <div className={confirmed ? "confirmation confirmed" : "confirmation"}><span>{confirmed ? "✓" : "○"}</span><div><small>APPLICATION STATE</small><strong>{confirmed ? "Confirmed with evidence" : policy.allowed ? "Not started" : "Human review required"}</strong>{confirmed && <p>Local ATS success fixture · event JOBOPS-DEMO-1842</p>}</div></div>
          <p className="demo-disclosure">No real employer system is contacted. This console demonstrates orchestration and safety behavior with synthetic fixtures.</p>
        </aside>
      </div>
    </div>
  );
}
