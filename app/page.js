import DemoConsole from "@/components/demo-console";
import { validationMetrics } from "@/lib/demo-data";

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="JobOps home"><span className="brand-mark">J</span>JobOps</a>
        <div className="nav-links"><a href="#demo">Live demo</a><a href="#architecture">Architecture</a><a href="#safety">Safety</a></div>
        <span className="build-badge"><span /> Built with Codex + GPT-5.6</span>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">AI APPLICATION OPERATIONS</p>
          <h1>Apply with momentum.<br /><span>Stop with judgment.</span></h1>
          <p className="lede">JobOps discovers opportunities, explains fit, routes an approved resume, prepares the form, and records proof—while failing closed whenever identity, policy, or human judgment is uncertain.</p>
          <div className="hero-actions"><a className="button primary" href="#demo">Run the safe demo <span>→</span></a><a className="button secondary" href="#architecture">See how it works</a></div>
          <div className="trust-row"><span>✓ Synthetic public demo</span><span>✓ No CAPTCHA bypass</span><span>✓ Auditable decisions</span></div>
        </div>
        <div className="hero-visual" aria-label="Agent workflow overview">
          <div className="pulse-orbit orbit-one" /><div className="pulse-orbit orbit-two" />
          <div className="core"><span>JOBOPS</span><strong>Agent</strong><small>policy protected</small></div>
          <div className="orbit-card card-discover"><span>01</span><strong>Discover</strong><small>24 ATS sources</small></div>
          <div className="orbit-card card-reason"><span>02</span><strong>Reason</strong><small>GPT-5.6 brief</small></div>
          <div className="orbit-card card-act"><span>03</span><strong>Act</strong><small>guarded browser</small></div>
          <div className="orbit-card card-prove"><span>04</span><strong>Prove</strong><small>confirmation evidence</small></div>
        </div>
      </section>

      <section className="proof-band">
        <div className="shell proof-grid">{validationMetrics.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
      </section>

      <section className="demo-section shell" id="demo">
        <div className="section-heading"><div><p className="eyebrow">INTERACTIVE SHOWCASE</p><h2>Watch every decision, not just the result.</h2></div><p>This demo never visits a real employer or uses personal data. It exercises the same policy, routing, reasoning, and evidence concepts against synthetic fixtures.</p></div>
        <DemoConsole />
      </section>

      <section className="architecture shell" id="architecture">
        <div className="section-heading"><div><p className="eyebrow">LOCAL-FIRST ARCHITECTURE</p><h2>One workflow. Clear boundaries.</h2></div><p>Production compute stays on the user’s Windows workstation, while structured state is isolated in PostgreSQL. OpenAI reasoning is optional and receives only the minimum job context.</p></div>
        <div className="architecture-grid">
          <article><span className="step">01</span><div className="icon">⌕</div><h3>Discover</h3><p>Public ATS APIs and permitted search feeds are normalized, filtered, and deduplicated.</p><small>Bing RSS · Greenhouse · Lever</small></article>
          <article><span className="step">02</span><div className="icon">✦</div><h3>Understand</h3><p>Rules and GPT‑5.6 create an evidence-bound fit brief without inventing candidate facts.</p><small>Responses API · local fallback</small></article>
          <article><span className="step">03</span><div className="icon">↗</div><h3>Prepare</h3><p>The strongest approved resume and verified answers are routed into a guarded form session.</p><small>Policy gate · browser worker</small></article>
          <article><span className="step">04</span><div className="icon">✓</div><h3>Verify</h3><p>A click is not success. Only a recognized success page or matched email confirms submission.</p><small>Evidence log · recovery queue</small></article>
        </div>
      </section>

      <section className="safety" id="safety"><div className="shell safety-inner">
        <div><p className="eyebrow">SAFETY IS A FEATURE</p><h2>The agent knows when<br />not to act.</h2><p>Unknown required answers, changed resumes, CAPTCHA, MFA, assessments, access denials, and ambiguous confirmation states stop the affected workflow and produce a visible reason.</p></div>
        <div className="safety-list"><div><span>01</span><strong>Verified facts only</strong><p>No invented experience, credentials, dates, or demographic answers.</p></div><div><span>02</span><strong>Source-level permissions</strong><p>Automatic, review-first, and discovery-only modes are explicit.</p></div><div><span>03</span><strong>Evidence before success</strong><p>Every confirmed application links to browser or email evidence.</p></div><div><span>04</span><strong>Human control remains</strong><p>Pause, emergency stop, retry, and skip are always available.</p></div></div>
      </div></section>

      <footer className="shell"><div className="brand"><span className="brand-mark">J</span>JobOps</div><p>Built with Codex and GPT‑5.6 for OpenAI Build Week.</p><p className="subtle">Public showcase uses synthetic data only.</p></footer>
    </main>
  );
}
