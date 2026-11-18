# MetalProm39 Web Client (`metal-prom-web`)

Static SvelteKit web client and client-side engineering calculator for high-precision contract CNC machining services.

## Overview

`metal-prom-web` is a static application designed for industrial B2B users. It incorporates an in-browser CAD parsing engine, real-time material pricing logic, technical knowledge base articles, and strict privacy/accessibility compliance.

## Key Technical Features

- **SvelteKit 2 & Svelte 5:** Utilizes modern Svelte 5 Runes (`$state`, `$derived`, `$props`) with `@sveltejs/adapter-static` for 100% pre-rendered static output.
- **Client-Side CAD Engine:** Web Worker-based streaming STL parser (ASCII and binary) with $O(N)$ typed-array processing, divergence theorem volume calculation, and zero idle CPU overhead.
- **Industrial Hallmark Design:** Pure monochromatic industrial aesthetics (zinc and amber palette, 1px precision borders, monospace numeric tables, no AI visual clichés).
- **Zero-Personal-Data Architecture (152-FZ / 149-FZ):** Zero input fields for personal credentials (name, phone, personal email). Voluntary, passive inbound contact model only.
- **Local Font Self-Hosting:** Self-hosted `Geologica` WOFF2 fonts with `<link rel="preload">`, eliminating third-party CDN latency, layout shifts (CLS = 0), and cross-border IP transfers.
- **AEO / GEO Knowledge Engine:** Full Schema.org JSON-LD structured data (`LocalBusiness`, `TechArticle`, `FAQPage`, `BreadcrumbList`), machine-readable `llms.txt`, and automated sitemaps.

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 5 (Runes)
- **Adapter:** `@sveltejs/adapter-static`
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Math & Typography:** KaTeX (LaTeX formula rendering in engineering articles)
- **Unit Testing:** Vitest (50+ unit tests)
- **E2E Testing:** Playwright (166+ automated checks across viewports from 320px to 1440px)
- **Package Manager:** `pnpm`

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Quality Verification Pipeline

```bash
# Type check and Svelte verification
pnpm check

# Unit tests
pnpm test:unit

# Production build
pnpm build

# End-to-end tests
pnpm test:e2e
```

## Static Build & Deployment

The static output is compiled into the `build/` directory with strict trailing slash folder formatting (`/route/index.html`), ensuring instant `200 OK` responses across static hosting providers without server-side redirects.

```bash
pnpm build
```

## License

Private / Commercial Proprietary.
