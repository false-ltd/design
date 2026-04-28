# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Design system showcase — a curated collection of 66 company design systems across 9 industries. Users browse design cards on the homepage, click into detail pages to see light/dark HTML previews alongside parsed color palettes, typography, and key traits, and can view the full `design.md` spec in a modal.

**URL**: https://design.false.ltd

## Commands

```bash
pnpm dev          # Start dev server (SPA mode, no SSR)
pnpm generate     # Build static site to .output/public
pnpm build        # Build for server rendering (not used in production)
pnpm preview      # Preview the generated static site locally
```

No test suite or linter is configured.

## Tech Stack

- **Nuxt 4** (SPA mode — `ssr: false`) with **Nuxt UI v4** component library
- **Tailwind CSS v4** with `@tailwindcss/typography` plugin
- **@nuxtjs/i18n** — English/Chinese, `prefix_except_default` strategy
- **@nuxtjs/color-mode** — light/dark toggle
- **marked** — renders `design.md` files as HTML in modal
- **pnpm** — package manager (required, lockfile present)

## Architecture

### Routing

| Route | Layout | Description |
|-------|--------|-------------|
| `/` | `default` | Homepage with hero, category pills, card grid |
| `/:slug` | `detail` | Design detail with sidebar spec + iframe preview |

### Key Files

- `app/composables/useDesigns.ts` — Static design registry (`DESIGNS[]` array), category definitions, avatar/preview URL helpers. Adding a new design means adding an entry here plus placing `index.html`, `dark.html`, and `design.md` in `public/designs/<slug>/`.
- `app/composables/useDesignSpec.ts` — Parses `design.md` into structured `DesignSpec` (colors, fonts, traits) via regex.
- `app/assets/css/main.css` — CSS custom properties (`--c-bg`, `--c-text`, `--c-accent`, etc.) for light/dark theming. All components reference these variables.
- `i18n/locales/en.json` / `i18n/locales/zh.json` — Translation files. All UI strings use `t()` keys.

### Design Data Flow

1. `DESIGNS` array in `useDesigns.ts` is the single source of truth for the catalog
2. Each design has a `slug` that maps to `public/designs/<slug>/` containing static assets
3. `design.md` files are fetched at runtime via `useFetch` and parsed by `useDesignSpec`
4. HTML previews (`index.html`, `dark.html`) are loaded in iframes via `PreviewFrame`

### Layouts

- **default** — Sticky header with logo, homepage content below
- **detail** — Sticky header with breadcrumb (`/ slug`), sidebar + iframe split on desktop, stacked on mobile

## Deployment

- **Docker**: Multi-stage `Dockerfile` (node:22-alpine build → nginx:alpine serve)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) — builds multi-arch image, pushes to GHCR, deploys to k3s via `k8s.yml`
- **nginx**: Serves static files from `.output/public`, with `try_files` for SPA routing and `text/plain` content-type for `.md` files

## Conventions

- Components use Nuxt UI components (`UApp`, `UModal`, `UIcon`, `UColorModeButton`, `UDropdownMenu`, `ULink`)
- Icons use `lucide` set via `i-lucide-*` names
- CSS uses custom properties (`--c-*`) from `main.css`, not Tailwind's built-in color palette
- All user-facing strings must go through `useI18n()` `t()` function
- Design entries require matching static files in `public/designs/<slug>/`: `index.html`, `dark.html`, `design.md`
