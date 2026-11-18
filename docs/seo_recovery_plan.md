# Comprehensive Recovery & Optimization Plan: SEO / AEO / GEO Architecture

## Executive Overview
The AI audit indicates an advanced engineering implementation blocked by fundamental crawler friction: **301 redirect loops (`trailingSlash` vs `canonical`) on GitHub Pages**, **search cannibalization by the public GitHub repository**, **snippet pollution from DOM service controls**, **lack of raster media for Schema.org and OpenGraph**, and **regional B2B trust limitations**. 

This plan is structured into sequentially executable phases, tasks, and granular subtasks.

---

## Phase 1: Critical Crawling & Indexation Pipeline Fixes (P0)
*Objective: Eliminate 301 redirect loops, enforce strict URL parity across static pre-rendering, sitemaps, canonicals, and Schema.org, restoring indexation for all 19 internal routes.*

### Task 1.1: Enforce Strict Trailing Slash Configuration in SvelteKit
- [x] **Subtask 1.1.1:** (Completed 2026-11-18) Inspect and configure `src/routes/+layout.ts` to export:
  ```typescript
  export const prerender = true;
  export const trailingSlash = 'always';
  ```
  *(Ensures static generator creates `/route/index.html` folders accessed directly with `200 OK` rather than generating file/folder ambiguities on GitHub Pages).*
- [x] **Subtask 1.1.2:** (Completed 2026-11-18) Audit client-side and server-side link generation across all components (`Header.svelte`, `Footer.svelte`, `Breadcrumbs.svelte`, and page templates) to ensure all internal links terminate with `/` (e.g., `href="{base}/frezernye-raboty-chpu/"`).

### Task 1.2: Canonical URL & Sitemap Synchronization
- [x] **Subtask 1.2.1:** (Completed 2026-11-18) Standardize `siteConfig.siteDomain` and URL builders in `src/lib/config/site.ts` to strictly maintain trailing slashes for directory routes while preserving bare paths for root and static asset files (`.xml`, `.txt`, `.json`, `.webp`). Added unit tests in `site.spec.ts`.
- [x] **Subtask 1.2.2:** (Completed 2026-11-18) Audit `src/routes/sitemap.xml/+server.ts` and `sitemap-registry.ts` to guarantee that all 20 listed `<loc>` entries match the exact target URL:
  * Root: `https://t1kh0n.github.io/`
  * Subpages: `https://t1kh0n.github.io/<slug>/`
  *(Fixed trailing slash discrepancies in article slugs).*
- [x] **Subtask 1.2.3:** (Completed 2026-11-18) Standardize `<link rel="canonical" href="...">` across all routes to reflect the exact 200 OK URL with trailing slash, eliminating the *"Duplicate without user-selected canonical"* and *"Page with redirect"* flags in Google Search Console. Added missing canonicals to `/stati/` and `/sitemap/`.

### Task 1.3: Verification of Pre-rendered Output
- [x] **Subtask 1.3.1:** (Completed 2026-11-18) Run `pnpm build` and verify that the emitted `build/` directory matches the expected route tree structure (20 static `index.html` directories + `sitemap.xml`).
- [x] **Subtask 1.3.2:** (Completed 2026-11-18) Execute automated curl / HTTP status code simulation against `build/` routes or staged deployment to ensure zero `301 Moved Permanently` headers for sitemap-listed URLs.

---

## Phase 2: GitHub Repository Search Cannibalization Mitigation (P0)
*Objective: Deprecate `github.com/T1kh0n/t1kh0n.github.io` from ranking for commercial CNC machining queries in Google and Yandex instead of the production website.*

### Task 2.1: Isolate Repository Documentation from Search Bots
- [x] **Subtask 2.1.1:** (Completed 2026-11-18) Neutralize keyword-heavy meta descriptions and headings in the public `README.md`. Replace commercial keywords (*"Токарные и фрезерные работы ЧПУ в Калининграде"*, etc.) with technical developer-focused framing (*"SvelteKit static portfolio application with CAD parser engine"*).
- [x] **Subtask 2.1.2:** (Completed 2026-11-18) Relocate verbose SEO/GEO audits, market research, and prompt tracking documents (`PROJ.md`, `docs/seo_aeo_geo_implementation_plan.md`) out of the public branch or redact commercial keyword density that competes with the live domain.
- [x] **Subtask 2.1.3:** (Completed 2026-11-18) Configure repository branching architecture:
  * Verified production output deploys purely from compiled `build/` artifact via GitHub Actions (`.github/workflows/deploy.yml`).
  * GitHub repo source code contains only developer documentation and English technical guides, preventing search engine cannibalization.

---

## Phase 3: Snippet Sanitization, Microcopy & Tag Engineering (P1)
*Objective: Prevent search engines from compiling noisy snippets from accessibility buttons, hamburger icons, and UI widgets, while calibrating titles to display without truncation.*

### Task 3.1: DOM Snippet Isolation (`data-nosnippet` & `<!--noindex-->`)
- [x] **Subtask 3.1.1:** (Completed 2026-11-18) Add `data-nosnippet` and `<!--noindex-->` wrappers to `src/lib/components/Header.svelte` around the mobile drawer trigger, navigation links, and utility buttons.
- [x] **Subtask 3.1.2:** (Completed 2026-11-18) Wrap `src/lib/components/AccessibilityPanel.svelte` (the GOST R 52872-2019 visually-impaired panel) in `data-nosnippet` and `<!--noindex-->` so Google and Yandex exclude words like *"Слабовидящим"*, *"Размер шрифта"*, and *"Черно-белая версия"* from the organic snippet.
- [x] **Subtask 3.1.3:** (Completed 2026-11-18) Apply `data-nosnippet` to `src/lib/components/CookieNotice.svelte` and interactive stepper headers in `CostCalculator.svelte`.

### Task 3.2: `<title>` and Meta Description Length Optimization
- [x] **Subtask 3.2.1:** (Completed 2026-11-18) Condense the homepage `<title>` to fit within the 580px (~55-60 characters) desktop/mobile rendering limit:
  * *Current (Truncated):* `МеталлПром39 — Металлообработка с ЧПУ в Калининграде: токарные и фрезерные работы` (78 chars)
  * *Target:* `МеталлПром39 — Металлообработка ЧПУ в Калининграде` (48 chars).
- [x] **Subtask 3.2.2:** (Completed 2026-11-18) Optimize primary landing page titles (`/tokarnye-raboty-chpu/`, `/frezernye-raboty-chpu/`, `/kalkulyator-stoimosti-chpu/`) to lead with high-intent keywords + brand suffix.
- [x] **Subtask 3.2.3:** (Completed 2026-11-18) Frontload commercial purchase triggers in `meta description` within the first 120 characters: *"Обработка по чертежам и STEP-моделям от 1 шт. до серий. Допуск IT7, шероховатость Ra 1.25, расчет с НДС 22%."*

### Task 3.3: Heading Hygiene & FAQ Parsing Clean-up
- [x] **Subtask 3.3.1:** (Completed 2026-11-18) In FAQ sections across `+page.svelte` and service templates, extract numerical indices (`01`, `02`) and toggle glyphs (`+`, `−`) out of the `<h3>` and `<summary>` text nodes into `<span aria-hidden="true">` elements.
- [x] **Subtask 3.3.2:** (Completed 2026-11-18) Verify that Schema.org `FAQPage` `name` properties contain clean question strings identical to the DOM text.

---

## Phase 4: Visual Assets, OpenGraph & Raster Media Pipeline (P1)
*Objective: Satisfy Schema.org and Google Rich Results raster image requirements, unlock image search discovery, and maximize CTR on social cards.*

### Task 4.1: Production OpenGraph & Social Image Creation
- [ ] **Subtask 4.1.1:** Generate and place production-grade raster images in `static/og/`:
  * `default.webp` and fallback `default.jpg` (1200×630 px, under 180 KB) featuring CNC milling/lathe machinery and clean brand typography.
- [ ] **Subtask 4.1.2:** Update `schema.ts`:
  * Map `Organization.logo` to an explicit image URL.
  * Populate `LocalBusiness.image` with `https://t1kh0n.github.io/og/default.webp` (replacing any SVG references).
  * Provide `TechArticle.image` arrays formatted as 16:9, 4:3, and 1:1 image variants according to Google Search Central requirements.

### Task 4.2: Workpiece & Workshop Image Integration
- [ ] **Subtask 4.2.1:** Create a dedicated asset directory: `static/images/parts/`.
- [ ] **Subtask 4.2.2:** Add optimized modern format (.webp, with appropriate fallback/dimensions) images:
  * Shafts and bushings (`valy-vtulki.webp`)
  * CNC milled housings from D16T alloy (`korpus-d16t.webp`)
  * Spur and helical gears (`shesterni-gost.webp`)
- [ ] **Subtask 4.2.3:** Integrate these images into `/tokarnye-raboty-chpu/`, `/frezernye-raboty-chpu/`, and `/zuboreznye-i-shlifovalnye-raboty/` with descriptive Russian `alt` attributes, explicit `width`/`height` to avoid CLS, and `loading="lazy"`.

---

## Phase 5: Content Layer & Slug Consistency Alignment (P2)
*Objective: Eliminate discrepancies between internal markdown content registries and SvelteKit route endpoints.*

### Task 5.1: Content Slug Refactoring
- [ ] **Subtask 5.1.1:** Rename `src/content/pages/zuboreznye-raboty.md` to `zuboreznye-i-shlifovalnye-raboty.md`.
- [ ] **Subtask 5.1.2:** Update `pages-loader.ts` and `content.ts` to ensure consistent slug resolution without fallback redirects or mismatch warnings.
- [ ] **Subtask 5.1.3:** Run automated unit tests (`pnpm test:unit`) to confirm all content tests pass with zero regression.

---

## Phase 6: Regional B2B E-E-A-T & Custom Domain Transition (P2) — [STATUS: UNCONFIRMED / PENDING USER APPROVAL]
*Objective: Establish regional commercial trust factors (Yandex Commercial Ranking Factors) and eliminate developer subdomain friction.*

> [!NOTE]
> **Status: UNCONFIRMED by user.**
> This phase is currently on hold pending explicit decision from the site owner regarding budget, domain registration, and hosting architecture. No changes in this phase will be implemented until confirmed.

### Task 6.1: Custom Second-Level Domain Integration (`.ru`) [PENDING]
- [ ] **Subtask 6.1.1:** Acquire or configure target custom domain (e.g., `metalprom39.ru`).
- [ ] **Subtask 6.1.2:** Place domain name in `static/CNAME` and configure GitHub Pages DNS (A records to GitHub IP addresses, CNAME for `www`).
- [ ] **Subtask 6.1.3:** Update `siteDomain` in `src/lib/config/site.ts` and regenerate verification tags for Yandex Webmaster and Google Search Console.

### Task 6.2: Regional Commercial Entity Signals (Compliant with Zero-PII Policy) [PENDING]
- [ ] **Subtask 6.2.1:** Display a dedicated regional phone number or virtual PBX redirect (`+7 (4012) ...`) in the header and footer.
- [ ] **Subtask 6.2.2:** Specify the exact industrial district/street zone in Kaliningrad in the contact block (e.g., *г. Калининград, Московский район / Правая набережная*) to satisfy local geo-parsing algorithms without exposing personal resident data.
- [ ] **Subtask 6.2.3:** Integrate Yandex Business (Яндекс.Бизнес) profile and embed an interactive Yandex Maps / Static Map preview of the Kaliningrad manufacturing location.

---

## Summary Timeline & Implementation Milestones

| Milestone | Deliverables | Target Impact |
| :--- | :--- | :--- |
| **Milestone 1** | Phase 1 + Phase 2 | Resolves 301 loop; enables indexation of 19 internal URLs; stops GitHub repository cannibalization. |
| **Milestone 2** | Phase 3 + Phase 4 | Clean SERP snippets; removes UI junk text; adds 1200×630 raster images for Google Rich Results. |
| **Milestone 3** | Phase 5 | Cohesive content layer, matching slugs, zero markdown registry warnings. |
| **Milestone 4** | Phase 6 *(Unconfirmed)* | Regional domain trust (`.ru`) and Yandex Commercial Ranking compliance. |
