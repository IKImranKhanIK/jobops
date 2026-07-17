import "./globals.css";

export const metadata = {
  title: "JobOps — Safe job-search automation",
  description: "An auditable, safety-aware job application operations agent built with Codex and GPT-5.6.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
