English | [中文](README.md)

# Design — Curated Design Systems

A showcase website built on the [geetdesign.md](https://geetdesign.md) data source. The original site has a great collection of design system resources.

This site curates 66 company design systems with interactive light/dark previews and design specification documents.

**Live site: [https://design.false.ltd](https://design.false.ltd)**

## Screenshots

**Homepage**

![Homepage](home.png)

**Detail Page**

![Detail Page](detail.png)

## What is DESIGN.md?

DESIGN.md is a design system file format introduced by [Google Stitch](https://stitch.withgoogle.com/), purpose-built for AI coding agents. It's a plain Markdown document that defines visual rules — color palette, typography scale, component styles, layout principles, and more — so that AI-generated UI stays visually consistent. Drop a DESIGN.md into any project root, and AI coding agents can automatically parse and follow the design spec.

## Features

- 66 companies across 9 industry categories
- Interactive light/dark HTML previews for each design system
- Parsed design specs (colors, typography, key traits)
- Full DESIGN.md document viewer with copy support
- Light/dark mode toggle
- English/Chinese bilingual support

## Tech Stack

- [Nuxt 4](https://nuxt.com/) + [Nuxt UI](https://ui.nuxt.com/)
- [Tailwind CSS 4](https://tailwindcss.com/) + [@tailwindcss/typography](https://github.com/tailwindcss/typography)
- [marked](https://github.com/markedjs/marked) for Markdown rendering
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/) for internationalization

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
pnpm build
pnpm preview
```

## License

MIT
