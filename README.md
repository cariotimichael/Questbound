# Questbound

**Tiny heroes. Big adventure.** Questbound is a 2D top-down action RPG inspired by classic MMOs — explore the wilds of Emberhold, battle gnoll camps, delve the Emberdeep dungeon, and face bosses with real mechanics, like Kezath the Sealed Flame.

## Features

- **4 classes, 5 races** — Warrior, Mage, Hunter, Necromancer; Emberkin, Ogrun, Astren, Wildkin, Human, each with thematic racial passives and distinct customization
- **Real boss fights** — telegraphed AoEs, summoned adds, phase changes, and enrages
- **Dungeons with loot** — multi-room crawls ending in lootable boss chests with class-unique rewards
- **136+ gear pieces** across 7 slots, including Legendary tier, plus class quests and talent trees
- **5 skills per class**, specialization-friendly talent UI, and full hotkey rebinding
- **Quest tracker, split quest log** (Active/Completed), specialized vendors with level-progressed stock
- **Options menu** — graphics, audio (master/music/SFX), screen shake, damage numbers, custom cursor
- **Thematic music, ambient audio, and particle effects** throughout
- **3 character slots** with fully separate saves
- **Desktop + mobile** — fullscreen native Windows app and touch-friendly browser play

## Play

Download the latest `Questbound-Setup-X.Y.Z.exe` from the [Releases](../../releases) page, run it (Windows will ask you to confirm — select **More info → Run anyway**), and you're in. The app **updates itself** — when a new version drops, you'll get a popup with patch notes. Just hit Download & Install.

You can also play the latest build right in your browser — it's a single self-contained HTML file.

## Controls (default)

| Action | Key |
|---|---|
| Move | WASD / Arrow keys |
| Abilities | 1–5 |
| Interact | E |
| Quest log | Q |
| Options | Esc |

All keybinds are rebindable in Options. Touch controls are supported on mobile.

## Development

Questbound's game code is a single HTML file (`game/questbound.html`) wrapped in Electron for the desktop build. Patches ship through GitHub Releases — tagging a version kicks off a cloud build, and every installed copy self-updates with the release notes.

Built solo, one patch at a time.

## Tech

HTML5 Canvas · WebAudio (all art and sound generated in-code) · Electron + electron-updater
