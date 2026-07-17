import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignored = new Set([".git", ".next", "node_modules", "out", "coverage"]);
const privatePatterns = [
  [/ik_imrankhan@outlook\.com/gi, "private applicant email"],
  [/hamayon\.hussain@gmail\.com/gi, "private browser-profile email"],
  [/C:\\Users\\Imran Khan/gi, "private absolute Windows path"],
  [/Imran_Khan_.*Resume/gi, "private resume filename"],
];

async function filesAt(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesAt(absolute));
    else files.push(absolute);
  }
  return files;
}

const failures = [];
for (const file of await filesAt(root)) {
  if (path.relative(root, file).replaceAll("\\", "/") === "scripts/privacy-check.mjs") continue;
  let text;
  try { text = await readFile(file, "utf8"); } catch { continue; }
  for (const [pattern, label] of privatePatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) failures.push(`${path.relative(root, file)}: ${label}`);
  }
}

if (failures.length) {
  console.error("Privacy check failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
console.log("Privacy check passed: no private production identity, resume, or path markers found.");
