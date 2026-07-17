export function buildOfflineBrief(job) {
  const strengths = job.matchedSkills.slice(0, 3).join(", ");
  const gap = job.missingSkills[0] ?? "No material gap identified";
  return [
    `Strong ${job.match}% fit for the ${job.track} track.`,
    `Evidence: the candidate profile aligns with ${strengths}.`,
    `Watch item: ${gap}. Treat this as a discussion point, not a disqualifier.`,
    `Recommendation: proceed using ${job.resume}; do not invent experience or alter verified facts.`,
  ].join("\n\n");
}
