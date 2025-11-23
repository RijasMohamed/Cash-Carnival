# Cash Carnival

Cash Carnival is a simple slot-machine game that can be played either from the Node.js command-line or from a friendly browser interface (served from the `docs/` folder for GitHub Pages).

## Highlights
- Single game engine powers both the CLI and web builds.
- Input is validated end-to-end to avoid impossible bets or negative balances.
- Weighted reels and payouts keep the gameplay deterministic but fun.
- Browser UI mirrors the CLI loop with responsive styling and animations.

## Technologies Used
- **Node.js** – hosts the CLI version, runs the prompt flow, and shares logic with the browser build.
- **prompt-sync** – synchronous terminal input so the CLI can prompt for deposits, line count, and bets.
- **Vanilla JavaScript (ES6+)** – encapsulates the slot-machine engine (`src/engine/slotMachine.js`) and browser controller (`docs/app.js`).
- **HTML5 & CSS3** – layout/styling for the responsive front end served from the `docs/` directory.
- **lite-server** – lightweight dev server used for local testing of the static site / GitHub Pages build.
- **GitHub Pages** – static hosting target for the `docs/` folder so the game is playable online.

## Core Concepts
- **Modular Game Engine** – the reel generation, transpose logic, row formatting, and winnings calculation live in a reusable module consumed by both the CLI and the browser UI, ensuring deterministic behavior everywhere.
- **User Input Validation** – deposits, line selection (1–3), and per-line bets are validated server/client-side to avoid negative balances or impossible wagers.
- **Stateful Bankroll Management** – both environments track the player balance, deduct bets up front, add winnings afterward, and block play when funds hit zero.
- **Probabilistic Reels** – each spin samples from a weighted symbol pool (`SYMBOLS_COUNT`) to simulate different rarity levels for A–D symbols.
- **Browser UX Loop** – simple SPA-style flow with form submissions, buttons, DOM updates, and message logs to mirror the CLI experience graphically.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ recommended

### Install dependencies
```powershell
npm install
```

### Build shared engine for the browser
```powershell
npm run build:engine
```
Copies `src/engine/slotMachine.js` into `docs/js/` so the static site stays in sync. This command also runs automatically before `npm run dev`, but you can trigger it manually when committing.

### Play in the terminal
```powershell
npm run start
```
Follow the prompts to deposit funds, pick up to three lines, set your bet per line, and spin until you decide to stop or run out of balance.

### Run the browser version locally
```powershell
npm run dev
```
This command launches `lite-server`, copies the latest engine into `docs/js/`, and serves the static files from the `docs/` directory. Open the reported URL in your browser to play.

## Architecture

### Shared Engine (`src/engine/slotMachine.js`)
- UMD module so it can be required from Node or attached to `window` in the browser.
- Exposes helpers: `spin`, `transpose`, `getWinnings`, `formatRows`, along with symbol definitions and board dimensions.

### CLI (`src/cli/index.js`)
- Uses `prompt-sync` for synchronous terminal prompts.
- Handles deposit/line/bet validation, displays rows using `formatRows`, and loops until the bankroll is empty or the player quits.

### Browser UI (`docs/`)
- Static HTML/CSS/JS site served locally via `lite-server` or published via GitHub Pages.
- `docs/app.js` imports the shared engine (copied into `docs/js/slotMachine.js`) and mirrors the CLI flow with DOM updates, status messages, and reel animations.

### Tooling
- `scripts/copy-engine.js` is the single source of truth for syncing engine updates into the `docs/` bundle.
- NPM scripts ensure the sync occurs automatically while developing.

## Deploying to GitHub Pages
1. Commit and push the repository to GitHub.
2. In the repository settings, enable GitHub Pages and select the `main` branch with `/docs` as the root.
3. After Pages finishes building, visit the published URL to play in the browser.

## Project Structure
```
package.json
README.md
.gitignore
node_modules/
scripts/
  |- copy-engine.js      # Utility to sync shared engine into docs/
src/
  |- cli/
     |- index.js         # CLI entrypoint
  |- engine/
     |- slotMachine.js   # Shared game logic (UMD)
docs/
  |- index.html          # Browser UI
  |- styles.css          # Styling
  |- app.js              # Browser controller
  |- js/slotMachine.js   # Generated copy for GitHub Pages
```

## Scripts
- `npm run build:engine` – sync the reusable engine into `docs/js/`
- `npm run start` / `npm run cli` – launch the command-line game
- `npm run dev` – sync the engine then serve the browser build from `docs/` via lite-server
- `npm test` – placeholder

## License
ISC
