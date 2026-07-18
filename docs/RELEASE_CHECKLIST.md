# Release checklist

## Code and privacy

- [x] `npm run verify` passes.
- [ ] Repository contains no `.env`, API keys, access tokens, personal resumes, application screenshots, email exports, or browser-profile files.
- [x] `npm run privacy:check` passes on the current release candidate.
- [ ] Git history contains no secrets or private artifacts.
- [x] GitHub repository visibility is public.
- [x] MIT license is visible.

## Product demonstration

- [ ] Hero and interactive console render correctly at 1920×1080 and mobile width.
- [ ] Successful Greenhouse synthetic flow reaches `Confirmed with evidence`.
- [ ] Employer-site synthetic flow stops at `Human review required`.
- [ ] Optional: with funded access and `OPENAI_ENABLED=true`, the decision badge displays `gpt-5.6`.
- [x] With paid API use disabled, the decision badge displays `Offline demo · clearly labeled`.
- [ ] No real employer is contacted.

## Submission assets

- [x] Generate a narrated MP4 draft and WebVTT captions.
- [x] Capture a 16:9 hero image and completed-workflow screenshot.
- [ ] Replace the remaining video and optional live-demo `TODO_*` URLs in `DEVPOST_SUBMISSION.md`.
- [ ] Record and caption the 2:35 demo video.
- [ ] Upload the video and confirm it plays without authentication.
- [ ] Add repository, video, and optional live-demo URLs to Devpost.
- [ ] Review project name, tagline, description, technologies, and team members.
- [ ] Confirm eligibility and accept the official challenge rules personally.
- [ ] Submit before July 21 at 5:00 PM Pacific.

## Suggested screenshots

1. Hero with “Apply with momentum. Stop with judgment.”
2. Completed safe demo with GPT‑5.6 brief and confirmation evidence.
3. Review-first policy stop.
4. Architecture and safety sections.
