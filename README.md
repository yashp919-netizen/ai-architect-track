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

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
