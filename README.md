# Break Ledger

A standalone break-time tracker for two people, at `public/break-tracker.html`.

It is one self-contained HTML file: all CSS and JavaScript are inline, there are
no dependencies, and it needs no build step and no network (web fonts are the
only external request, and it falls back cleanly without them).

- Open the file directly from disk, or reach it at `/break-tracker.html` once
  this site is deployed — Vercel serves files in `public/` before applying the
  SPA rewrite.
- Breaks are stored in that browser's local storage, so one device holds the
  ledger. Use the Backup & restore panel before clearing browser data or moving
  to a new phone.
- The file also detects the claude.ai artifact runtime and switches to a shared
  store there, which is how the same page can sync between two devices. Opened
  any other way it stays entirely local.

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
