import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.DEMO_URL || "http://127.0.0.1:3100";
const outputDirectory = path.resolve("artifacts/recording");
const outputPath = path.join(outputDirectory, "jobops-demo-silent.webm");
const chromePath = process.env.CHROME_PATH || path.join(process.env.LOCALAPPDATA || "", "Google/Chrome/Application/chrome.exe");
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: outputDirectory, size: { width: 1280, height: 720 } },
  colorScheme: "light",
});
const page = await context.newPage();
await page.goto(baseUrl, { waitUntil: "networkidle" });
const video = page.video();

await page.waitForTimeout(8000);
await page.locator('a[href="#demo"]').first().click();
await page.waitForTimeout(3500);

await page.getByRole("button", { name: "Run safe application demo →", exact: true }).click();
await page.getByText("Confirmed with evidence", { exact: true }).waitFor({ timeout: 15000 });
await page.locator(".console").scrollIntoViewIfNeeded();
await page.waitForTimeout(10000);

await page.getByRole("button", { name: /AI Automation Specialist/ }).click();
await page.waitForTimeout(2000);
await page.getByRole("button", { name: "Run safe application demo →", exact: true }).click();
await page.getByText("Policy agent", { exact: true }).waitFor({ timeout: 10000 });
await page.waitForTimeout(6000);

await page.locator("#architecture").scrollIntoViewIfNeeded();
await page.waitForTimeout(7000);
await page.locator("#safety").scrollIntoViewIfNeeded();
await page.waitForTimeout(8000);
await page.locator("footer").scrollIntoViewIfNeeded();
await page.waitForTimeout(5000);

await page.close();
await context.close();
if (!video) throw new Error("Playwright did not create a video artifact.");
await video.saveAs(outputPath);
await browser.close();
console.log(outputPath);
