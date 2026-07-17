export const candidate = {
  name: "Jordan Lee",
  location: "Austin, TX",
  authorization: "Authorized to work in the United States",
  preferences: ["Remote", "Hybrid", "Austin"],
  minimumSalary: 70000,
};

export const jobs = [
  {
    id: "northstar-qa-1842",
    title: "Quality Assurance Engineer",
    company: "Northstar Labs",
    location: "Austin, TX · Hybrid",
    salary: "$92k–$112k",
    source: "greenhouse",
    track: "QA Engineering",
    match: 91,
    skills: ["Playwright", "API testing", "CI/CD", "SQL"],
    matchedSkills: ["Playwright", "API testing", "SQL"],
    missingSkills: ["Kubernetes test environments"],
    resume: "Jordan_Lee_QA_Engineer_Resume.pdf",
    summary: "Own release quality for a growing developer platform through browser, API, and integration testing.",
  },
  {
    id: "meridian-grc-771",
    title: "Cybersecurity GRC Analyst",
    company: "Meridian Trust",
    location: "Remote · United States",
    salary: "$88k–$105k",
    source: "lever",
    track: "Cybersecurity GRC",
    match: 86,
    skills: ["SOC 2", "Risk registers", "Vendor review", "Policy writing"],
    matchedSkills: ["SOC 2", "Risk registers", "Policy writing"],
    missingSkills: ["FedRAMP exposure"],
    resume: "Jordan_Lee_GRC_Analyst_Resume.pdf",
    summary: "Translate security controls into clear evidence, policies, and risk decisions for a distributed company.",
  },
  {
    id: "lattice-ai-490",
    title: "AI Automation Specialist",
    company: "LatticeWorks",
    location: "Houston, TX · On-site",
    salary: "$96k–$120k",
    source: "employer_site",
    track: "AI Automation",
    match: 82,
    skills: ["Python", "LLM workflows", "REST APIs", "Process design"],
    matchedSkills: ["Python", "LLM workflows", "REST APIs"],
    missingSkills: ["UiPath"],
    resume: "Jordan_Lee_AI_Automation_Resume.pdf",
    summary: "Build practical AI-assisted workflows that reduce repetitive operations work across business teams.",
  },
];

export const verifiedAnswers = {
  workAuthorization: "Yes",
  sponsorshipRequired: "No",
  relocation: "Open to the right opportunity",
  termsAccepted: "Standard application privacy terms only",
};

export const validationMetrics = [
  { value: "5,450", label: "listings examined in one validation run" },
  { value: "24", label: "public ATS sources searched" },
  { value: "16/16", label: "read-only API surfaces verified" },
  { value: "10", label: "applications confirmed with evidence" },
];
