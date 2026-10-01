# Questbound — Desktop Edition

Windows desktop wrapper for the Questbound 2D action RPG, with a native
auto-updater that ships patch notes with every release.

## How updates flow

1. We build a patch in the browser (the artifact).
2. The latest game file is exported to `game/questbound.html`.
3. `node scripts/release.js <version> "<patch notes>"` commits, tags, and pushes.
4. GitHub Actions builds the Windows installer and publishes it to the GitHub release.
5. Players get a "Questbound X.Y.Z is available" popup **with the patch notes**
   on next launch. One click downloads and installs it.

## First-time setup on your Windows PC

1. **Install Node.js 20 (LTS)** from https://nodejs.org — take all defaults.
2. **Install Git** from https://git-scm.com/download/win — take all defaults.
3. **Create a free GitHub account** at https://github.com/signup (if you don't have one).
4. **Create a new repository** called `questbound` (public or private — updater works with either).
5. Open **PowerShell** and run:
   ```powershell
   git clone https://github.com/YOUR_GITHUB_USER/questbound.git
   cd questbound
   # copy all files from this folder into it
   npm install
   npm start
   ```
   The game should open in its own window. Close it with `Ctrl+C` in PowerShell.
6. **Point the updater at your repo:** in `package.json`, under `build.publish`,
   replace `YOUR_GITHUB_USER` with your GitHub username.
7. **First release:**
   ```powershell
   git add -A
   git commit -m "Questbound desktop v0.1.0"
   git push -u origin main
   npm run dist
   ```
   The installer lands in `dist/Questbound-Setup-0.1.0.exe` — run it to install.
8. **Ship it like a real game:** for every later patch,
   ```powershell
   node scripts/release.js 0.2.0 "Patch 0.2 - Talents & Threads: ..."
   ```
   Tagging `v0.2.0` triggers the cloud build; the `.exe` appears on your
   GitHub release page, and every installed copy updates itself with the notes.

## Notes

- Saves live in the app's local storage on each PC (same as the browser version).
  Cloud cross-progression is a later step and needs a small server.
- No code signing yet: Windows SmartScreen will show a warning on first install.
  Click "More info" → "Run anyway". A code-signing certificate removes this
  (~$100+/yr) — optional.
- The mobile (Android) wrapper is a separate step (Capacitor) — desktop first.
