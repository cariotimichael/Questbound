// Usage: node scripts/release.js <version> "<patch notes>"
// Example: node scripts/release.js 0.2.0 "Patch 0.2 - Talents & Threads: ..."
//
// Copies the latest exported game file into game/, bumps the version in
// package.json, commits, tags (v<version>), and pushes. Pushing the tag
// triggers the GitHub Actions workflow, which builds the Windows installer
// and publishes it to the GitHub release — the desktop app's auto-updater
// picks it up from there and shows these patch notes to the player.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const version = process.argv[2];
const notes = process.argv[3] || 'Bug fixes and improvements.';

if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error('Usage: node scripts/release.js <version> "<patch notes>"  (e.g. 0.2.0)');
  process.exit(1);
}

const root = path.join(__dirname, '..');
const src = path.join(root, '..', 'your_files', '2d-world-of-warcraft', '2d-world-of-warcraft.html');
const destDir = path.join(root, 'game');
const dest = path.join(destDir, 'questbound.html');

if (!fs.existsSync(src)) {
  console.error(`Game file not found at ${src}. Export the artifact first.`);
  process.exit(1);
}
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log(`Copied game file -> ${dest}`);

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = version;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`Bumped version -> ${version}`);

const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });
run('git add -A');
run(`git commit -m "Questbound v${version}" -m "${notes.replace(/"/g, "'")}"`);
run(`git tag -a v${version} -m "Questbound v${version}\n\n${notes}"`);
run('git push');
run(`git push origin v${version}`);
console.log(`\nDone. The v${version} release is building on GitHub Actions.`);
console.log('Players will see the update (with the patch notes above) on next launch.');
