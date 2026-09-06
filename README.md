# Break Ledger

A break-time tracker for two people, installable on a phone. Lives in
`public/breaks/`.

- **On the phone:** open `/breaks/` in Safari, then Share -> Add to Home Screen.
  It launches full screen with its own icon and works without a connection.
- **Files:** `index.html` is the whole app (all CSS and JS inline, no build
  step, no dependencies). `manifest.webmanifest` and the PNG icons make it
  installable; `sw.js` caches the shell for offline use and is scoped to
  `/breaks/`, so it never intercepts anything else on the domain.
- **Storage:** breaks live in that browser's local storage, so one device
  holds the ledger. Use the Backup & restore panel before clearing browser
  data or moving to a new phone.
- **Shared mode:** the same file detects the claude.ai artifact runtime and
  switches to a shared store there, which is how one page can sync between two
  devices. Served any other way it stays entirely local.

Regenerate the icons from `icon.svg` at 180, 192 and 512 px if the mark changes.

---

# The Shred

The 2 Sep – 28 Dec 2026 training and nutrition plan as a working app, installable
on a phone. Lives in `public/shred/`, and is built the same way as Break Ledger:
`index.html` is the whole app with no build step and no dependencies, `sw.js`
caches the shell for offline use scoped to `/shred/`, and `version.json` backs the
update button.

- **On the phone:** open `/shred/` in Safari, then Share -> Add to Home Screen.
  It works in a gym with no signal.
- **What it does, rather than just shows:** it knows which day of the plan today
  is, so it opens on the right session with the right set count, the right macro
  block and the right step target — and it applies the travel window, the two
  deload weeks, the Saturday refeeds and the December step increase on its own.
- **The seven-day average** is the point. Every decision the plan asks for is made
  on the week-on-week change in that average, never on one weigh-in, so the app
  computes it and reads back the plan's own adjustment rule for the phase you are
  in. It refuses to give a verdict on fewer than four readings in either week.
- **The food is day-wise.** Seven build days, six cut days and the Saturday
  refeed, each built only from the foods the plan names, and each hitting that
  phase's exact target (2,800 / 170 / 69 / 375 in the build; 2,200 / 175 / 67 /
  225 in the cut; 2,600 / 175 / 51 / 360 on a refeed). The foods rotate; the
  numbers the adjustment rules act on never move. Travel stays deliberately
  loose because the plan says to eat local food.
- **Set logging** carries loads forward: once every set of a lift reaches the top
  of its rep range, the next session says to add weight and reset to the bottom.
- **Storage:** everything lives in that browser's local storage. Use the Backup &
  restore panel before clearing browser data or moving to a new phone. Served
  inside the claude.ai artifact runtime it switches to the shared store instead,
  so a phone and a laptop see one log.

The plan's own numbers live in one `PLAN`/`DAYS`/`FOOD` block at the top of the
script — set counts are checked against the exercise lists at boot, so a
transcription slip shows up in the console rather than in a week of training.

Note on the meal rotations: the plan's stated macro targets and its single
example day do not reconcile — priced with standard portions, the example build
day comes to roughly 3,390 kcal and 240 g protein against a stated 2,800 and
170 g. The rotations follow the stated targets, since those are what the
adjustment rules are written against. They were solved numerically rather than
estimated; the working lives outside this repo, but every day lands within a few
kcal and under 3 g on each macro.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
