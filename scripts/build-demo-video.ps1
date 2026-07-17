param([switch]$SkipRecording)

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot
$recordingDirectory = Join-Path $repo "artifacts\recording"
$silentVideo = Join-Path $recordingDirectory "jobops-demo-silent.webm"
$narrationPath = Join-Path $recordingDirectory "jobops-narration.wav"
$outputVideo = Join-Path $repo "public\jobops-demo.mp4"

try {
    $health = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:3100" -TimeoutSec 3
    if ($health.StatusCode -ne 200) { throw "Showcase server returned $($health.StatusCode)." }
} catch {
    throw "Start the production showcase on port 3100 before recording: npm run build; npm run start -- -p 3100"
}

New-Item -ItemType Directory -Path $recordingDirectory -Force | Out-Null
if (-not $SkipRecording) {
    Push-Location $repo
    try {
        node .\scripts\record-demo.mjs
    } finally {
        Pop-Location
    }
} elseif (-not (Test-Path -LiteralPath $silentVideo)) {
    throw "The silent recording is missing; rerun without -SkipRecording."
}

Add-Type -AssemblyName System.Speech
$narration = @"
Job searching is not one task. It is a long-running operations workflow across discovery, research, resumes, repetitive forms, and follow-up. Most automation optimizes for volume. JobOps optimizes for trust.

This public demo uses a fictional candidate and employer. The discovery agent normalizes the role. A deterministic policy engine checks the source, location, salary, and clearance rules. GPT-5.6 creates an evidence-bound fit brief. JobOps then routes an approved resume, fills only verified answers, and confirms success only after evidence exists.

On an unverified employer source, the same workflow stops for human review. The agent cannot silently expand its own permissions. CAPTCHA, multi-factor authentication, assessments, unknown answers, and ambiguous confirmations use the same fail-closed pattern.

Deterministic code owns permissions. GPT-5.6 owns explanation. Human judgment owns consequential unknowns. Apply with momentum. Stop with judgment.
"@
$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voice.Rate = -1
$voice.Volume = 100
$voice.SetOutputToWaveFile($narrationPath)
$voice.Speak($narration)
$voice.Dispose()

$ffmpegCommand = Get-Command ffmpeg -ErrorAction SilentlyContinue
$ffmpegPath = if ($ffmpegCommand) { $ffmpegCommand.Source } else {
    Get-ChildItem -Path "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_*\ffmpeg-*\bin\ffmpeg.exe" -ErrorAction SilentlyContinue |
        Sort-Object FullName -Descending |
        Select-Object -First 1 -ExpandProperty FullName
}
if (-not $ffmpegPath) { throw "Full FFmpeg is missing. Install it with: winget install --id Gyan.FFmpeg --exact" }

& $ffmpegPath -y -i $silentVideo -i $narrationPath -filter:a "atempo=1.52" -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart $outputVideo
if ($LASTEXITCODE -ne 0) { throw "FFmpeg failed with exit code $LASTEXITCODE." }
Write-Host "Created $outputVideo"
