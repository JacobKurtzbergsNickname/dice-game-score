# CLAUDE.md

## Project Overview

**dice-game-score** is an Angular 21 web application for tracking scores in a dice game. It supports multiple players, with score entry and automatic score calculation per player.

## Tech Stack

- **Framework**: Angular 21 (standalone components, signals)
- **UI**: Angular Material, Tailwind CSS v4
- **SSR**: Angular SSR with Express
- **Deployment**: Netlify
- **Testing**: Vitest (Angular unit-test builder)
- **Linting**: ESLint + angular-eslint
- **Formatting**: Prettier

## Common Commands

```bash
# Development server (http://localhost:4200)
npm start

# Build
npm run build

# Run all tests (unit + e2e)
npm test

# Run unit tests only
npm run test:unit

# Run e2e tests only
npm run test:e2e

# Lint
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check

# Serve SSR build
npm run serve:ssr:dice-game-score
```

## Project Structure

```directory
src/app/
  landing-page/       # Home/welcome screen
  score-board/        # Main game board with player management
  score-tile/         # Per-player score tile component
  name-input/         # Player name input component
  actual-score/       # Score display + calculateScore logic
```

## Score Calculation Logic

`src/app/actual-score/calculate-score.ts`

- Scores are summed as entries are added.
- Three consecutive zeros **reset** the running total to 0.

## Routing

| Path    | Component            |
| ------- | -------------------- |
| `/`     | LandingPageComponent |
| `/game` | ScoreBoardComponent  |

## Component Selector Prefix

All components use the `pairodice-` selector prefix (e.g. `pairodice-root`, `pairodice-score-board`).

## Code Style

- Standalone components (no NgModules)
- Angular signals for state (`signal()`, `computed()`)
- Prettier for formatting — run `npm run format` before committing
- ESLint enforced — run `npm run lint` before committing
