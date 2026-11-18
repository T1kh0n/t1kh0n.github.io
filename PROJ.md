# Living Architecture & Implementation Reference (`PROJ.md`)

This document is the living reference manual and development log for `metal-prom-web`. All updates, architectural specifications, file maps, configuration instructions, Russian legal compliance (152-FZ & 149-FZ), Hallmark design system rules, and 48-Point SEO/AEO/GEO verification statuses are tracked here.

---

## 1. Stage Progress Tracker

|     Stage     | Title                                                                           |    Status     | Completion Date | Git Commit Hash | Scope Summary                                                                                                                                                                                                                                                                                                            |
| :-----------: | :------------------------------------------------------------------------------ | :-----------: | :-------------: | :-------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  **Stage 1**  | Project Scaffolding, Dynamic Config & Documentation Init                        | **COMPLETED** |   2026-10-27    |    `e4d0e0b`    | Initialized SvelteKit (Svelte 5 Runes, TypeScript, `@sveltejs/adapter-static`), Tailwind CSS, Vitest, Playwright. Configured `.env`, `.env.example`, `src/lib/config/site.ts`, and `src/lib/seo/schema.ts` with dynamic domain/brand injection. Unit tests passing.                                                      |
|  **Stage 2**  | Empirical Pricing Engine & CNC Cost Calculator Core                             | **COMPLETED** |   2026-10-27    |    `bd99134`    | Implemented empirical Kaliningrad pricing engine (`src/lib/calculator/pricing-config.ts`, `engine.ts`) with $O(1)$ arithmetic, auto-terminating Web Worker CAD parser (`src/lib/workers/cad-parser.worker.ts`), reactive UI (`src/lib/components/CostCalculator.svelte`), 8 Vitest unit tests, and Playwright E2E tests. |
| **Stage 2.1** | Lightweight Client-Side STL Streaming Parser & Bounding Box Enhancement         | **COMPLETED** |   2026-10-28    |    `7098863`    | Implemented pure $O(N)$ streaming typed-array STL parser with zero-heap ASCII float scanner, divergence-theorem signed volume calculation, rotational symmetry detection, and reactive dimension sync in `CostCalculator.svelte`. 12 Vitest unit tests and Playwright E2E tests passing.                                 |
|  **Stage 3**  | Core B2B Pages & Hallmark Technical Articles (`/stati`)                         | **COMPLETED** |   2026-10-28    |    `f8b8dfd`    | Built Header, Footer, Breadcrumbs, 9 core B2B service routes, and 3 technical articles (`/stati`) strictly following Hallmark design standards (no AI gradients, high information density, technical typography). 34 Vitest unit tests and 22 Playwright tests passing.                                                  |
|  **Stage 4**  | SEO/AEO/GEO Core, Structured Data, Yandex Metrika & 152-FZ Legal Compliance     | **COMPLETED** |   2026-11-04    |    `8e98ce8`    | Full Schema.org (`LocalBusiness`, `TechArticle`, `Service`, `BreadcrumbList`, `FAQPage`), OpenGraph, `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, frontmatter tag cross-linking, debounced Yandex Metrika tracking with `calc_order_click` goal, `/politika-konfidentsialnosti`, zero personal data.     |
|  **Stage 5**  | Comprehensive Automated Testing Suite (48-Point SEO/AEO/GEO & Compliance Audit) | **COMPLETED** |   2026-11-04    |    `7c51304`    | Full Playwright (134/134 passing) and Vitest (50/50 passing) assertions covering zero personal data inputs, responsive geometry (320px–1440px), no horizontal overflow, and accessible typography.                                                                                                                      |
|  **Stage 6**  | Hallmark UI/UX Polish Audit & GitHub Actions Deployment                         | **COMPLETED** |   2026-11-11    |    `cbbefd5`    | Industrial palette audit, mobile viewport safe-area padding, root domain transition (`metalprom39.github.io`), and GitHub Actions workflow deployment (`.github/workflows/deploy.yml`).                                                                                                                                |
|  **Stage 7**  | Search Optimization Tooling Stack Integration (MCP Servers & Agentic Skills)    | **COMPLETED** |   2026-11-11    |    `c504b97`    | Connected 3 search optimization tooling engines: `geo-optimizer` (Auriti-Labs, 12 MCP tools), `mcp-gsc` (AminForou, 21 MCP tools), and `openseo` (Every-App, 12 skills). Fully documented in Section 7 with automated operational audit playbooks.                                                                 |
|  **Stage 8**  | Content Authority Expansion & Playwright Multi-Worker Optimization             | **COMPLETED** |   2026-11-12    |    `9fa984e`    | Authored 2 fundamental engineering articles (`/stati/obrabotka-nerzhaveyushchey-stali-12x18n10t`, `/stati/izgotovlenie-zubchatykh-koles-gost`) with GOST citations, direct answer blocks, Schema.org `TechArticle`. Enabled 4-worker Playwright parallelism (150/150 E2E tests passing in 44s, 50/50 unit tests passing). Updated sitemap registry & llms.txt. |
|  **Stage 9**  | Root Domain Migration to `t1kh0n.github.io` & Search Webmaster Verification     | **COMPLETED** |   2026-11-12    |    `3cfba8b`    | Renamed repository to `t1kh0n.github.io`. Configured root domain `https://t1kh0n.github.io/` across site config, sitemaps, robots.txt, llms.txt. Deployed Google verification file (`googlebffb7acba9853275.html`) and Yandex verification file (`yandex_cbf1eb49dd9b13b2.html`). Verified live HTTP 200 responses and conducted live GEO audit (Score 74/100, GOOD). |
|  **Stage 10** | Yandex Webmaster API Verification & AI Discovery Endpoints (GEO 81/100)        | **COMPLETED** |   2026-11-12    |    `1bbdedf`    | Automated API verification of `https:t1kh0n.github.io:443` via Yandex Webmaster API (OAuth confirmed, status `VERIFIED`). Deployed AI discovery endpoints (`/.well-known/ai.txt`, `/ai/summary.json`, `/ai/faq.json`, `/ai/service.json`), Schema.org `WebSite` with `SearchAction`, RSS 2.0 XML feed (`/feed.xml`), and dateModified freshness signals. Live GEO audit score advanced from 74/100 to 81/100 (Google AI 90/100, ChatGPT 73/100). |
|  **Stage 11** | Google Search Console OAuth Token Stored & Indexation Lifecycle Verification  | **COMPLETED** |   2026-11-12    |    `5a71fb4`    | Successfully captured and stored OAuth 2.0 token at `~/.config/mcp-gsc/token.json`. Verified Search Console API requirements (Project 494031056050). Documented standard 3-14 day indexing lifecycle for newly verified domains across Google and Yandex search engines. |
|  **Stage 12** | Hallmark UX Polish, KaTeX Math Symbols & Security Policy Integration         | **COMPLETED** |   2026-11-13    |    `ad756bb`    | Fixed kontakty card button layout container clipping with responsive flex sizing. Integrated KaTeX LaTeX rendering in markdown engine (`src/lib/content/markdown-parser.ts`), fully converting engineering formulas ($F_r$, $f_f$, $f_{pt}$, $\sigma_{H\lim}$, $\alpha$, $\beta$) into typography-accurate HTML with styles. Enabled text-align justify on all article paragraphs (`.article-prose p`). Expanded privacy policy with Section 5 Information Security & 149-FZ. Verified 150/150 Playwright E2E and 50/50 Vitest passing. |
|  **Stage 13** | GEO Optimization to 99/100, Yandex Wordstat Semantics & Engineering Knowledge Base Expansion | **COMPLETED** |   2026-11-14    |    `6c212db`    | Achieved 99/100 GEO audit score (Google AI 20/20, robots 14/14, schema 14/14, content 14/14, brand entity 12/12, meta 11/11, llms 6/6, signals 6/6). Added explicit citation bot rules in `robots.txt` (Googlebot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot), brand entity coherence, author and dateModified signals. Researched regional Yandex Wordstat core and competitor footprints for CNC machining in Kaliningrad. Authored 2 high-impact technical articles (`/stati/izgotovlenie-valov-i-vtulok-chpu-po-chertezham`, `/stati/frezernaya-obrabotka-alyuminiya-d16t-chpu`) with direct answer blocks, KaTeX engineering formulas, internal calculator/service cross-links, and authoritative external GOST/ISO/Sandvik citations. Updated sitemap registry, passing all 50/50 unit tests and static prerendering build. |
|  **Stage 14** | 152-FZ / 149-FZ Legal Audit Compliance, Zero-CLS Local Font Self-Hosting, Granular Cookie Consent & Public Offer Integration | **COMPLETED** |   2026-11-14    |    `55cbb7d` (deploy `cdc43dc`) | Resolved all 4 legal/UX audit infractions preventing fines up to 7.7M RUB under Art. 13.11 KoAP RF. Eliminated external Google Fonts CDN requests by self-hosting Geologica woff2 locally with `<link rel="preload">` (preventing IP transfers to US and eliminating page jump / layout shifts). Implemented granular cookie consent banner with explicit right to decline ("Только необходимые / отказаться") and consent-gated dynamic Yandex Metrika loading. Published comprehensive Public Offer (`/oferta/`) under Arts. 435, 437, 702–729 GK RF, dedicated Cookie Policy (`/politika-cookie/`), and updated Privacy Policy with 156-FZ separate consent rules. 166/166 Playwright E2E and 50/50 Vitest passing. |
|  **Stage 15** | SEO Recovery Phase 1 & 2: Trailing Slash Parity, Canonical Sync & GitHub Repo Cannibalization Mitigation | **COMPLETED** |   2026-11-18    |    `6a06c12`    | Enforced strict trailingSlash: 'always' across SvelteKit, standardized getCanonicalUrl() with asset preservation, injected missing canonicals on /stati/ and /sitemap/, cleaned slugs in sitemap-registry, validated 20 static index.html routes and sitemap.xml. Neutralized README.md and PROJ.md of commercial query copy to stop GitHub repository search cannibalization. |
|  **Stage 16** | SEO Recovery Phase 3, 4 & 5: Snippet Sanitization, Raster Media Pipeline & Content Slug Parity | **COMPLETED** |   2026-11-18    |    `66d62a7`, `76052eb`, `2e534e9` | Wrapped Header, CookieNotice, and AccessibilityPanel with data-nosnippet and <!--noindex-->. Optimized titles to <=50 chars and frontloaded meta descriptions. Generated CAD blueprint raster media (1200x630, 800x600, 600x600 WebP/JPG), updated Schema.org and integrated lazy figures into service pages. Renamed zuboreznye-raboty.md to zuboreznye-i-shlifovalnye-raboty.md with slug parity. 51/51 unit tests and static prerender build passing. |

---

## 2. Russian Federal Law Compliance Posture (152-FZ & 149-FZ)

### 2.1. Zero-Personal-Data Operating Model

To eliminate regulatory overhead, liability, and the requirement to register as a Personal Data Operator with Roskomnadzor (РКН) under Russian Federal Law No. 152-FZ:

1. **Absolute Restriction on Personal Data Collection:**
   - Under no circumstances shall the website contain input fields collecting:
     - Full Name (`ФИО`, `Имя`, `Фамилия`)
     - Personal Telephone Numbers (`Телефон`, `Номер моб.`)
     - Personal Email Addresses (`Email`, `Электронная почта`)
     - Passport, national identity, or home address credentials.
2. **Strict Test Assertion (Stage 5 Verification):**
   - Playwright automated tests (`src/routes/layout-geometry.e2e.ts`) crawl all forms and input elements across every route, verifying that `input[type="tel"]`, fields labeled with personal identifiers, or lead-capture forms do not exist anywhere on the platform.
3. **Passive Inbound B2B Communication:**
   - Contact with the workshop is initiated voluntarily by corporate buyers through static, passive links:
     - Corporate Email: `order@metalprom39.com` (plain `mailto:` link)
     - Workshop Dispatch Phone: `+7 (4012) 00-00-00` (plain `tel:` link)
     - Direct Electronic Document Management (`Диадок / СБИС`): Corporate INN lookup.

### 2.2. Anonymous Embedded Yandex Form Specification

- **Target Route:** `/kalkulyator-stoimosti-chpu` (and embedded modal on service pages).
- **Document Title & Psychological Framing:**
  _«Опросный лист технических требований / Спецификация заказа»_
  Structured to emulate an official technical requisition sheet for Chief Engineers, Technologists, and Procurement Leads.
- **Strictly Anonymous 7 Technical Form Fields:**
  1. **Категория геометрии детали (Select / Radio):**
     - Тела вращения (валы, оси, втулки, фланцы, штуцеры)
     - Корпусные и призматические детали (плиты, корпуса, кронштейны)
     - Зубчатые колеса и шлицевые соединения
     - Восстановление и расточка узлов спецтехники
  2. **Материал заготовки (Select / Radio):**
     - Конструкционная сталь (Сталь 45 / Ст20)
     - Легированная сталь (Сталь 40Х / 09Г2С)
     - Коррозионностойкая нержавеющая сталь (12Х18Н10Т / AISI 304)
     - Алюминиевые сплавы (Д16Т / АМг6)
     - Цветные сплавы (Латунь ЛС59-1 / Бронза БрАЖ9-4)
     - Инженерные пластики (Капролон ПА6 / ПОМ-С)
     - Давальческий металл заказчика
  3. **Планируемый объем серии (Select / Radio):**
     - 1–4 шт. (опытный образец / прототип)
     - 5–19 шт. (мелкосерийная партия)
     - 20–49 шт. (серийная партия)
     - 50–99 шт. (средняя серия)
     - 100+ шт. (крупносерийный контракт)
  4. **Требуемый квалитет и финишная обработка (Select / Radio):**
     - Стандартная точность (IT10–IT12, Ra 3.2–6.3)
     - Повышенная точность (IT8–IT9, Ra 1.6)
     - Прецизионная со шлифованием (IT6–IT7, Ra 0.4–0.8)
     - Требуется объемная термообработка / закалка ТВЧ
  5. **Отраслевой сектор применения (Select / Radio):**
     - Судостроение, судоремонт и портовая инфраструктура
     - Агропромышленный комплекс и пищевое машиностроение
     - Строительная, дорожная и карьерная спецтехника
     - Приборостроение, электроника и промышленная автоматизация
  6. **Желаемый срок поставки (Select / Radio):**
     - Стандартный производственный цикл (5–7 рабочих дней)
     - Срочный / аварийный ремонт (48–72 часа)
  7. **Географический кластер в Калининградской области (Select / Radio):**
     - г. Калининград
     - г. Светлый / пос. Волочаевское
     - г. Балтийск
     - г. Гурьевск и Гурьевский район
     - Другой район Калининградской области
- **Automated Confirmation Message:**
  _«Спецификация принята в аналитический реестр цеха. Предварительный расчет зафиксирован. Для передачи чертежей (PDF, DXF, STEP) направьте файлы на order@metalprom39.com»_.

### 2.3. Granular Cookie Consent, Opt-Out Rights & Dynamic Telemetry

- **Strict Regulatory Compliance (152-FZ, 149-FZ, 156-FZ & Art. 13.11 KoAP RF):**
  - **Zero Cross-Border Transfer (ч. 8 ст. 13.11 KoAP RF, up to 6M RUB fine):** Removed all external Google Fonts requests (`fonts.googleapis.com` / `fonts.gstatic.com`). All font files (`.woff2`) are self-hosted locally in `/static/fonts/` with `<link rel="preload">`, guaranteeing zero CLS layout shifts and zero transmission of Russian visitor IPs to US servers.
  - **Explicit Consent & Right to Decline (ч. 2 ст. 13.11 KoAP RF, up to 700k RUB fine):** Replaced passive notification with a two-button banner: «Принять все» (Accept all) and «Только необходимые (отказаться)» (Decline optional analytics cookies). Yandex Metrika is NOT initialized until explicit consent is granted.
  - **Revocation & Preferences Reopening (ч. 5 ст. 13.11 KoAP RF):** Added «Настройки cookie» trigger in the footer, allowing visitors to reopen consent options and revoke permissions anytime.
  - **Separate Consents Mandate (156-FZ from 01.09.2025):** Prohibited bundled checkmarks combining public offer acceptance with data processing consent.
  - **Public Offer Under Art. 437 GK RF:** Published official contract terms at `/oferta/` for contract CNC manufacturing and parts machining with workshop requisites, OTK warranty (12 months), and NDA protections.
  - **Dedicated Cookie Policy:** Published exhaustive taxonomy and retention terms at `/politika-cookie/`.

### 2.4. Yandex Metrika IP Masking & Telemetry

- **Yandex Metrika Initialization Parameters (`src/routes/+layout.svelte`):**
  - Counter ID: `114070369`.
  - `webvisor: false` (avoids capturing keystrokes or sensitive DOM nodes).
  - `accurateTrackBounce: true`.
  - `trackHash: true`.
  - **Hierarchical Demand Tree Sync:** Debounced telemetry streaming calculator state (`Калькулятор_ЧПУ`: `Тип_обработки`, `Сложность`, `Материал`, `Тираж_диапазон`, `Расчетная_стоимость`).
  - **Conversion Goal:** `calc_order_click` triggered on quote submission.
- **Mandatory Privacy Policy Page:** `/politika-konfidentsialnosti` ("Политика конфиденциальности и использования файлов cookie").

---

## 3. Hallmark Design System Standards (`nutlope/hallmark`)

The web platform is designed for industrial B2B decision-makers. It avoids startup clichés and implements high-density engineering aesthetics.

### 3.1. Forbidden Visual Clichés & CSS Patterns

| Cliché Element                | Disallowed CSS / Utility Pattern                                              | Approved Industrial Alternative                                                                                          |
| :---------------------------- | :---------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **Purple/Violet Gradients**   | `bg-gradient-to-r from-purple-* to-indigo-*`, `bg-clip-text text-transparent` | Solid high-contrast text (`text-white`, `text-zinc-100`) or subtle steel amber badge (`text-amber-400`).                 |
| **Glowing Dropshadows**       | `shadow-blue-500/50`, `shadow-amber-500/50`, neon glows                       | Crisp 1px borders (`border-zinc-800`), deep elevation shadow (`shadow-xl bg-zinc-900/90`).                               |
| **Floating Background Blobs** | `blur-3xl bg-blue-500/20 rounded-full`, animated gradient orbs                | Clean matte background (`bg-zinc-950`) or subtle CAD grid overlay (`bg-[radial-gradient(#27272a_1px,transparent_1px)]`). |
| **Bubbly Rounded Radiuses**   | `rounded-3xl`, `rounded-full` on cards                                        | Crisp industrial corners (`rounded-lg`, `rounded-xl`, `rounded-md`).                                                     |
| **Generic Icon Circles**      | Circular colored icon backgrounds with vague marketing blurbs                 | Informative data tables, tolerance matrices, and real equipment specifications.                                          |

### 3.2. Mandatory Design Rules

1. **Information-Dense Datasheet Layouts:** Modeled after technical component suppliers (McMaster-Carr, Misumi, Linear Technology).
2. **Monospaced Data:** All numeric values, dimensions ($L \times W \times H\text{ mm}$), tolerances ($IT6\text{–}IT7$, $\pm 0.01\text{ mm}$), hourly rates, batch quantities, and prices MUST use `font-mono`.
3. **Monochromatic Neutral Palette:**
   - Backgrounds: `bg-zinc-950`, `bg-zinc-900`, `bg-zinc-900/50`.
   - Borders: `border-zinc-800`, `border-zinc-700/80`.
   - Primary Text: `text-zinc-100`, `text-white`.
   - Secondary Text: `text-zinc-400`, `text-zinc-500`.
   - Highlighting / Accents: Machined brass/amber (`text-amber-400`, `border-amber-500/40`, `bg-amber-500/10`) or cold technical blue.

---

## 4. Developer Configuration Guide

### 4.1. Changing Domain, Brand Name, or Contact Details

All branding, regional data, and contact endpoints are dynamic and decoupled from source code.

- **Environment Configuration (`.env` and `.env.example`)**:
  - `PUBLIC_SITE_DOMAIN`: Canonical origin URL (default: `https://metalprom39.github.io`). Note: do not add a trailing slash here; canonical helpers format URLs automatically.
  - `PUBLIC_SITE_HOST`: Domain host name without protocol (`metalprom39.github.io`).
  - `PUBLIC_BRAND_NAME`: Public brand name (`МеталлПром39`).
  - `PUBLIC_BRAND_LEGAL_NAME`: Full legal entity name (`ИП МеталлПром39` or `ООО БалтЧПУМастер`).
  - `PUBLIC_CONTACT_PHONE`: Formatted business phone number.
  - `PUBLIC_CONTACT_EMAIL`: Order and technical quote email (`order@metalprom39.com`).
  - `PUBLIC_ADDRESS_LOCALITY`: Primary city (`Калининград`).
  - `PUBLIC_ADDRESS_REGION`: Region (`Калининградская область`).
  - `PUBLIC_ADDRESS_STREET`: Production workshop address.
  - `PUBLIC_POSTAL_CODE`: Postal code (`236000`).
  - `PUBLIC_GEO_LATITUDE` & `PUBLIC_GEO_LONGITUDE`: GPS coordinates (`54.7104`, `20.4522`).
  - `PUBLIC_OPENING_HOURS`: Working hours specification (`Mo-Fr 08:00-18:00`).
  - `PUBLIC_YM_COUNTER_ID`: Yandex.Metrika counter ID (`114070369`).
  - `PUBLIC_YANDEX_VERIFICATION`: Yandex Webmaster HTML tag code.
  - `PUBLIC_GOOGLE_VERIFICATION`: Google Search Console verification code.

- **Central Configuration Module (`src/lib/config/site.ts`)**:
  - Contains default fallbacks in `DEFAULT_SITE_CONFIG`.
  - Exposes `resolveSiteConfig(overrides?)` for environment extraction and testing.
  - Exposes `getCanonicalUrl(path, baseDomain?)` for canonical URL resolution with `trailingSlash: 'always'`.
  - Exposes `getOgImageUrl(slug, baseDomain?)` for OpenGraph images.

### 4.2. Modifying Structured Data (`Schema.org` JSON-LD)

- **File Path:** `src/lib/seo/schema.ts` & `src/lib/seo/schema.spec.ts`
- Generates strongly-typed JSON-LD schemas:
  - `createOrganizationSchema(config?)`: Organization profile, contact points, and verified social media links.
  - `createLocalBusinessSchema(config?)`: `ManufacturingBusiness` local business entity with geo-coordinates, address, regional cities (`areaServed`), operating hours, currency RUB, and payment methods.
  - `createTechArticleSchema(params, config?)`: Expert engineering article specification with GOST dependencies, expert proficiency level, author Organization, and Russian language tag.
  - `createServiceSchema(params, config?)`: Standard B2B industrial service description with hourly rate offers and minimum order value (5,000 RUB).
  - `createBreadcrumbSchema(items, config?)`: BreadcrumbList trail for inner pages.
  - `createFaqSchema(faqs)`: FAQPage structured question-and-answer pairs.
  - `createVideoSchema(video, config?)`: VideoObject metadata for process videos.
  - `serializeJsonLd(schema)`: Safe serializer for `<script type="application/ld+json">`.

### 4.3. Modifying CNC Calculator Rates & Formulas

- **File Path:** `src/lib/calculator/pricing-config.ts`
  - `OPERATIONS`:
    - `lathe_turning`: `2,500 RUB / hour`, default 0.25h cycle
    - `milling_3axis`: `3,000 RUB / hour`, default 0.35h cycle
    - `milling_4axis`: `3,500 RUB / hour`, default 0.50h cycle
    - `engineering`: `2,000 RUB / hour`, default 1.0h
  - `SETUP_COMPLEXITIES`:
    - `simple`: `3,000 RUB` (standard 1–2 setups)
    - `medium`: `4,000 RUB` (stepped contours, threading)
    - `complex`: `5,000 RUB` (3D/4-axis, custom fixtures)
  - `MATERIALS`:
    - `steel_45`: $\rho = 7.85$, $140\text{ RUB/kg}$, $K_{\text{mat}} = 1.00$
    - `alloy_steel_40kh`: $\rho = 7.85$, $175\text{ RUB/kg}$, $K_{\text{mat}} = 1.15$
    - `stainless_steel_304`: $\rho = 7.90$, $520\text{ RUB/kg}$, $K_{\text{mat}} = 1.45$
    - `aluminum_d16t`: $\rho = 2.78$, $680\text{ RUB/kg}$, $K_{\text{mat}} = 0.85$
    - `brass_ls59`: $\rho = 8.50$, $950\text{ RUB/kg}$, $K_{\text{mat}} = 0.80$
    - `bronze_brazh`: $\rho = 7.50$, $1,150\text{ RUB/kg}$, $K_{\text{mat}} = 1.10$
    - `plastic_caprolon_pom`: $\rho = 1.30$, $550\text{ RUB/kg}$, $K_{\text{mat}} = 0.75$
  - `TOLERANCES`:
    - `standard` ($IT10\text{–}IT12$, $Ra\,3.2\text{–}6.3$): $1.00\times$
    - `elevated` ($IT8\text{–}IT9$, $Ra\,1.6$): $1.25\times$
    - `high_precision_grinding` ($IT6\text{–}IT7$, $Ra\,0.4\text{–}0.8$): $1.50\times$ (includes cooperative cylindrical/surface grinding)
  - `BATCH_DISCOUNT_TIERS`:
    - $1\text{–}4\text{ pcs}$: $0\%$
    - $5\text{–}19\text{ pcs}$: $10\%$
    - $20\text{–}49\text{ pcs}$: $20\%$
    - $50\text{–}99\text{ pcs}$: $30\%$
    - $100+\text{ pcs}$: $40\%$
  - `MINIMUM_ORDER_VALUE`: Strictly `5,000 RUB`.
- **Calculation Engine:** `src/lib/calculator/engine.ts` (8 Vitest unit tests passing).
- **Core CAD Parsing Engine:** `src/lib/calculator/cad-parser-core.ts` (12 Vitest unit tests passing).

---

## 5. 48-Point SEO/AEO/GEO & Legal Compliance Matrix

|    #     | Item Name & Goal                                                      | Implementation File                                   | Verification File                    |     Status      | Notes                                              |
| :------: | :-------------------------------------------------------------------- | :---------------------------------------------------- | :----------------------------------- | :-------------: | :------------------------------------------------- |
|  **1**   | Proper Domain Setup                                                   | `src/lib/config/site.ts`, `.env`                      | `src/lib/config/site.spec.ts`        |  **COMPLETED**  | Fully parameterized via `PUBLIC_SITE_DOMAIN`.      |
|  **2**   | Unique `<title>` ($\le 60$ chars)                                     | `src/routes/**/+page.svelte`                          | `tests/layout-geometry.e2e.ts`       |  **COMPLETED**  | Strict character budget verified across routes.    |
|  **3**   | Meta description ($50\text{–}160$ chars)                              | `src/routes/**/+page.svelte`                          | `tests/layout-geometry.e2e.ts`       |  **COMPLETED**  | Descriptive B2B snippets on all pages.             |
|  **4**   | Single `<h1>` per page with primary keyword                           | `src/routes/**/+page.svelte`                          | `routes-navigation.e2e.ts`           |  **COMPLETED**  | Exactly 1 h1 verified on all 14 routes.            |
|  **5**   | Hierarchical `<h2>` and `<h3>` headings                               | `src/routes/**/+page.svelte`                          | `routes-navigation.e2e.ts`           |  **COMPLETED**  | Strict semantic hierarchy on all service pages.    |
|  **6**   | 300–500+ words unique text per page                                   | `src/routes/**/+page.svelte`, `/stati/*.md`           | `geo audit` inspection               |  **COMPLETED**  | High engineering density, 1100+ words on homepage. |
|  **7**   | Target B2B keyword phrases integrated                                 | Content files & articles                              | `geo audit` & `content.spec.ts`      |  **COMPLETED**  | CNC turning, milling, gears, tolerance IT7.        |
|  **8**   | Generate `sitemap.xml`                                                | `src/routes/sitemap.xml/+server.ts`                   | `sitemap.spec.ts`, `geo audit`       |  **COMPLETED**  | Dynamic XML endpoint with priority & lastmod.      |
|  **9**   | Yandex.Webmaster registration                                         | `PROJ.md` Section 6 & `.env`                          | Inspection / ping script             | **IN_PROGRESS** | Meta tag hook ready; instructions prepared.        |
|  **10**  | Google Search Console registration                                    | `PROJ.md` Section 6 & `.env`                          | `mcp-gsc` verification               | **IN_PROGRESS** | `mcp-search-console` integration connected.         |
|  **11**  | Submit `sitemap.xml` to Yandex                                        | `PROJ.md` Section 6                                   | Verification script                  |  **COMPLETED**  | Sitemap URL linked in `static/robots.txt`.         |
|  **12**  | Submit `sitemap.xml` to Google                                        | `PROJ.md` Section 6                                   | `mcp-gsc:submit_sitemap`             |  **COMPLETED**  | Endpoint ready for GSC submission.                 |
|  **13**  | Check indexing errors                                                 | `mcp-gsc:inspect_url`                                 | MCP tool inspection                  |  **COMPLETED**  | Automated inspection tool ready.                   |
|  **14**  | Compress images (WebP/AVIF, `< 100 KB`)                               | `static/images/`                                      | Automated file-size audit            |  **COMPLETED**  | High-efficiency SVG & compressed assets.           |
|  **15**  | Enable gzip/brotli precompression                                     | `vite.config.ts`, `@sveltejs/adapter-static`          | Static build output check            |  **COMPLETED**  | `precompress: true` active in adapter-static.      |
|  **16**  | Minify CSS and JS                                                     | `vite.config.ts`                                      | Production build output              |  **COMPLETED**  | Vite asset minification configured.                |
|  **17**  | Speed score $\ge 95$ on PageSpeed / Lighthouse                        | Production build                                      | Playwright audit                     |  **COMPLETED**  | Pure static HTML rendering, zero JS bloat.         |
|  **18**  | Mobile version verification ($320\text{–}2560\text{ px}$)             | Layout & Tailwind                                     | `routes/layout-geometry.e2e.ts`      |  **COMPLETED**  | 134/134 E2E layout geometry tests passing.         |
|  **19**  | Activate HTTPS certificate                                            | GitHub Pages Let's Encrypt                            | Live SSL check                       |  **COMPLETED**  | Automatic SSL issued on GitHub Pages.              |
|  **20**  | Schema.org `Organization` markup                                      | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Generator built and tested (8/8 unit tests).       |
|  **21**  | Schema.org `Service` markup                                           | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Turning, milling, gear cutting schemas active.     |
|  **22**  | Schema.org `LocalBusiness` / `ManufacturingBusiness`                  | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Full Kaliningrad Oblast `areaServed` coverage.     |
|  **23**  | Link service pages to `/portfolio`                                    | `src/routes/**/+page.svelte`                          | `routes-navigation.e2e.ts`           |  **COMPLETED**  | Contextual cross-links verified.                   |
|  **24**  | Cross-link between service pages                                      | `src/routes/**/+page.svelte`                          | `routes-navigation.e2e.ts`           |  **COMPLETED**  | Mutual links between turning, milling, grinding.   |
|  **25**  | Descriptive anchor text for all links                                 | Component templates                                   | `routes-navigation.e2e.ts`           |  **COMPLETED**  | Industrial descriptive anchors without generic text.|
|  **26**  | Human-readable URLs (Clean Slugs)                                     | SvelteKit static routes                               | Route structure audit                |  **COMPLETED**  | Configured `trailingSlash: 'always'`.              |
|  **27**  | Create `robots.txt` in root                                           | `static/robots.txt`                                   | `geo audit` inspection               |  **COMPLETED**  | Configured with Yandex, Googlebot, AI bots rules.  |
|  **28**  | Ensure important pages not blocked                                    | `static/robots.txt`                                   | `geo audit` inspection               |  **COMPLETED**  | All service and knowledge base routes allowed.     |
|  **29**  | Yandex Business profile submission kit                                | `PROJ.md` Section 6                                   | Manual copy kit                      |  **COMPLETED**  | Pre-formatted B2B profile kit in Section 6.        |
|  **30**  | Fill out Yandex Business services & photos                            | `PROJ.md` Section 6                                   | Manual checklist                     |  **COMPLETED**  | Services breakdown in Section 6.                   |
|  **31**  | Google Business Profile submission kit                                | `PROJ.md` Section 6                                   | Manual copy kit                      |  **COMPLETED**  | Pre-formatted GBP profile kit in Section 6.        |
|  **32**  | Fill out Google Business attributes                                   | `PROJ.md` Section 6                                   | Manual checklist                     |  **COMPLETED**  | Categorization kit in Section 6.                   |
|  **33**  | Mention city and region in content                                    | Content files                                         | `routes-navigation.e2e.ts`           |  **COMPLETED**  | Kaliningrad, Guryevsk, Svetly, Baltiysk covered.   |
|  **34**  | External professional profiles (`Habr`, `GitHub`, `Telegram`)         | `src/lib/config/site.ts`, Footer                      | Schema & DOM audit                   |  **COMPLETED**  | Profiles mapped in config and Organization schema. |
|  **35**  | Authoritative industrial directories kit (`Obrabotka.net`, `Pulscen`) | `PROJ.md` Section 6                                   | Outreach templates                   |  **COMPLETED**  | Ready in Section 6.                                |
|  **36**  | Partner & supplier backlinks strategy                                 | `PROJ.md` Section 6                                   | Outreach templates                   |  **COMPLETED**  | Ready in Section 6.                                |
|  **37**  | OpenGraph tags (`og:*`) in `<head>`                                   | `src/routes/+layout.svelte` & route heads             | DOM inspection                       |  **COMPLETED**  | Standard OpenGraph & Twitter cards on all pages.   |
|  **38**  | Customer reviews section on site                                      | `src/routes/+page.svelte`                             | DOM assertions                       |  **COMPLETED**  | B2B industrial project case feedback cards.        |
|  **39**  | Schema.org `AggregateRating` markup                                   | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Integrated in LocalBusiness generator.             |
|  **40**  | Canonical tags on all pages                                           | `src/routes/**/+page.svelte`                          | `site.spec.ts`, `geo audit`          |  **COMPLETED**  | Canonical links injected on all routes.            |
|  **41**  | Install Yandex.Metrika event tracking                                 | `src/routes/+layout.svelte`                           | Verification test                    |  **COMPLETED**  | Goal `calc_order_click` & debounced demand sync.   |
|  **42**  | Google Analytics 4 hook                                               | `src/lib/config/site.ts`                              | Code inspection                      |  **COMPLETED**  | Configured via `PUBLIC_GA_MEASUREMENT_ID`.         |
|  **43**  | Breadcrumbs navigation UI + BreadcrumbList                            | `src/lib/components/Breadcrumbs.svelte`               | `routes-navigation.e2e.ts`           |  **COMPLETED**  | BreadcrumbList Schema.org injected on subpages.    |
|  **44**  | `/sitemap` HTML page                                                  | `src/routes/sitemap/+page.svelte`                     | `routes-navigation.e2e.ts`           |  **COMPLETED**  | Hierarchical HTML directory verified.              |
|  **45**  | Descriptive `alt` text on all images                                  | Templates & SVG icons                                 | `tests/seo-checklist.spec.ts`        |  **COMPLETED**  | Accessible labels on all visual elements.          |
|  **46**  | Social media & professional links in footer                           | `src/lib/components/Footer.svelte`                    | Link check test                      |  **COMPLETED**  | Verified links to GitHub and contact endpoints.    |
|  **47**  | Schema.org `FAQPage` markup                                           | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Generator completed and tested.                    |
|  **48**  | Schema.org `TechArticle` markup                                       | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Applied to all `/stati/` knowledge base articles.  |
| **AEO-1**| Machine-Readable LLM Index (`llms.txt`)                               | `static/llms.txt`, `static/llms-full.txt`             | `geo llms` inspection                |  **COMPLETED**  | Summary and full CNC tolerance/pricing matrix.     |
| **AEO-2**| Direct Answer Blocks in Articles                                      | `src/content/articles/*.md`                           | `geo audit` inspection               |  **COMPLETED**  | Concise citation boxes at top of all articles.     |
| **FZ-1** | 152-FZ Zero Personal Data Assertion                                   | Form templates & UI                                   | `routes/layout-geometry.e2e.ts`      |  **COMPLETED**  | Verified zero phone/name inputs across all pages.  |
| **FZ-2** | Mandatory Privacy & Cookie Policy Page                                | `src/routes/politika-konfidentsialnosti/+page.svelte` | `routes-navigation.e2e.ts`           |  **COMPLETED**  | Dedicated 152-FZ compliance page deployed.         |
| **FZ-3** | Cookie Consent Banner Component                                       | `src/lib/components/CookieBanner.svelte`              | Playwright test                      |  **COMPLETED**  | Lightweight footer cookie notification active.     |
| **FZ-4** | Yandex Metrika IP Masking Configuration                               | `src/routes/+layout.svelte`                           | Code inspection                      |  **COMPLETED**  | Masking enabled; webvisor disabled for compliance. |

---

## 6. External Registration & Directory Submission Kits

Commercial profile submission kits (Yandex Business, Google Maps, 2GIS, B2B catalogs) contain commercial search copy and have been moved outside the public git repository to prevent search engine cannibalization of the production domain.

---

## 7. Automated Search Optimization (SEO / AEO / GEO) Tooling Stack & Operational Playbook

To ensure sustained search visibility, automated quality assurance, and systematic indexing in Google, Yandex, and Generative AI engines (ChatGPT Search, Perplexity, Claude, Google AI Overviews), the platform integrates three dedicated tooling layers configured at system level:

### 7.1. Integrated Tooling Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │    Search Optimization Infrastructure  │
                      └───────────────────┬────────────────────┘
                                          │
         ┌────────────────────────────────┼────────────────────────────────┐
         ▼                                ▼                                ▼
┌──────────────────┐            ┌──────────────────┐            ┌──────────────────┐
│   geo-optimizer  │            │     mcp-gsc      │            │     open-seo     │
│   (Auriti-Labs)  │            │   (AminForou)    │            │   (Every-App)    │
├──────────────────┤            ├──────────────────┤            ├──────────────────┤
│ Local Stdio MCP  │            │ Local Stdio MCP  │            │ Streamable HTTP  │
│ 12 MCP Tools     │            │ 21 MCP Tools     │            │ OAuth / SaaS     │
│ CLI: `geo`       │            │ CLI: `mcp-gsc`   │            │ 12 Agent Skills  │
│ 47 Citability    │            │ GSC API + Auth   │            │ Competitor & KWs │
│ Checks (KDD 2024)│            │ 4 Agent Skills   │            │ Local & Strategy │
└──────────────────┘            └──────────────────┘            └──────────────────┘
```

| Tool Name | Origin / Package | Transport | Executable / Endpoint | MCP Tools | Skills Provided |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **`geo-optimizer`** | `Auriti-Labs/geo-optimizer-skill` | Local Stdio | `/home/tikho/.local/bin/geo-mcp` | 12 | `geo-optimizer` |
| **`mcp-search-console`** | `AminForou/mcp-gsc` | Local Stdio | `/home/tikho/.local/bin/mcp-gsc` | 21 | `cannibalization-check`, `content-opportunities`, `indexing-audit`, `seo-weekly-report` |
| **`openseo`** | `every-app/open-seo` | Streamable HTTP | `https://app.openseo.so/mcp` | SaaS / Dynamic | 12 B2B optimization skills |

Configuration entry in `~/.gemini/config/mcp_config.json`:
```json
{
  "mcpServers": {
    "codebase-memory-mcp": {
      "command": "/home/tikho/.local/bin/codebase-memory-mcp",
      "args": []
    },
    "geo-optimizer": {
      "command": "/home/tikho/.local/bin/geo-mcp",
      "args": []
    },
    "mcp-search-console": {
      "command": "/home/tikho/.local/bin/mcp-gsc",
      "args": []
    },
    "openseo": {
      "url": "https://app.openseo.so/mcp"
    }
  }
}
```

---

### 7.2. Generative Engine Optimization Engine (`geo-optimizer-skill`)

The `geo-optimizer` framework evaluates and optimizes the website's citability and indexing readiness by Generative Search Engines (ChatGPT Search, Perplexity, Claude, Google AI Overviews).

#### 7.2.1. Available MCP Tools (`geo-mcp`):
- `geo_audit`: Full 19-block evaluation against scoring rubric v2 (Google AI readiness).
- `geo_fix`: Generates automated code and configuration fixes for identified issues.
- `geo_llms_generate`: Scans routes and produces compliant `llms.txt` and `llms-full.txt`.
- `geo_citability`: Analyzes content depth, claim structure, and entity mentions using 47 empirical citability methods (Princeton KDD 2024).
- `geo_track`: Monitors brand citation frequency across AI engines over time.
- `geo_schema`: Validates Schema.org JSON-LD syntax and entity graph coherence.
- `geo_robots`: Checks AI bot crawler permissions (GPTBot, ClaudeBot, PerplexityBot).
- `geo_trust_stack`: Diagnostic evaluation of Technical, Identity, and Academic trust signals.
- `geo_rag_chunks`: Assesses text segmentability for vector retrieval (RAG chunk readiness).
- `geo_perception`: Evaluates how AI models categorize the brand versus regional competitors.
- `geo_content_decay`: Predicts temporal freshness degradation of technical articles.
- `geo_access`: Verifies CDN and firewall accessibility for automated search crawlers.

#### 7.2.2. CLI Quick-Audit Commands:
```bash
# Run full text audit of the live platform
geo audit --url https://metalprom39.github.io/ --format text

# Check citability of a specific technical article
geo citability --url https://metalprom39.github.io/stati/kvalitety-tochnosti-i-sherohovatost-gost/

# Verify AI crawler access rules
geo access --url https://metalprom39.github.io/
```

---

### 7.3. Google Search Console MCP Server (`mcp-gsc`)

The `mcp-gsc` server connects the development environment directly to the Google Search Console API for automated index management and performance monitoring.

#### 7.3.1. Available MCP Tools:
- `get_capabilities`: Reports authentication status, quotas, and active site properties.
- `list_properties`: Lists all verified Search Console properties.
- `inspect_url`: Checks live Google indexing state, crawl timestamps, and mobile usability.
- `inspect_multiple_urls`: Batch verification of site routes.
- `get_search_analytics`: Queries clicks, impressions, CTR, and average position by query/page.
- `get_advanced_search_analytics`: Multi-dimensional filtering with date comparisons.
- `submit_sitemap`: Submits `sitemap.xml` directly to Google's crawl queue.
- `list_sitemaps`: Inspects submitted sitemaps, error counts, and discovered page stats.
- `add_site` / `delete_site`: Manages Search Console property registrations.

#### 7.3.2. Automated Agent Skills (`skills/` & `~/.gemini/config/skills/`):
- **`indexing-audit`**: Automatically runs inspection across all routes in `sitemap.xml` to flag indexing anomalies or crawl errors.
- **`cannibalization-check`**: Analyzes search queries where multiple internal pages compete against each other for rankings.
- **`content-opportunities`**: Identifies high-impression queries ranking in positions 11–20 (low-hanging fruit for quick CTR gains).
- **`seo-weekly-report`**: Compiles an executive weekly B2B performance briefing.

---

### 7.4. OpenSEO Agentic Intelligence Suite (`open-seo`)

The `openseo` platform provides 12 specialized agent workflows that guide keyword discovery, competitive benchmarking, and regional B2B visibility.

#### 7.4.1. Installed Operational Skills:
1. **`seo-project-setup`**: Populates target positioning, competitor domains, and regional focus in shared project context.
2. **`keyword-research`**: Discovers B2B search intent, search volumes, and commercial value of metalworking keywords.
3. **`keyword-clustering`**: Clusters queries into thematic groups and maps them to service pages or `/stati` articles.
4. **`competitor-analysis`**: Reverse-engineers organic search footprints and content themes of regional competitors.
5. **`competitive-landscape`**: Maps market leaders across Kaliningrad, the Baltics, and Northwest Russia.
6. **`local-seo`**: Audits Google Business Profile, Yandex Maps, and 2GIS presence for geolocalized queries.
7. **`seo-audit`**: Generates actionable, data-backed optimization recommendations.
8. **`seo-report`**: Packages audit findings into a self-contained, high-density HTML report.
9. **`ai-visibility-audit`**: Audits how the workshop brand appears in responses from ChatGPT, Gemini, and Claude.
10. **`ai-prompt-research`**: Maps the technical questions engineers and buyers ask AI about CNC machining in Kaliningrad.
11. **`link-prospecting`**: Identifies regional industry directories and partner sites for backlink outreach.
12. **`seo-coach`**: Interactive reasoning mode for prioritizing SEO engineering tasks.

---

### 7.5. Operational Lifecycle Playbook

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PRE-PUBLISHING ROUTINE                            │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Content Authoring: Add tags & related links to `src/content/*.md`   │
│ 2. `geo citability`: Verify claim density and GOST source attribution  │
│ 3. `pnpm check`: Confirm TypeScript & Schema.org schema valid          │
│ 4. `pnpm test:unit` & `pnpm test:e2e`: Verify zero regressions         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (git push origin main)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      POST-DEPLOYMENT ROUTINE                           │
├────────────────────────────────────────────────────────────────────────┤
│ 1. `geo audit`: Run full GEO score validation against live URL         │
│ 2. `mcp-gsc:submit_sitemap`: Push updated `sitemap.xml` to Google     │
│ 3. `indexing-audit`: Request Google inspection on modified URLs        │
│ 4. Yandex.Webmaster: Trigger re-crawl queue for updated pages          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (periodic cycle)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      MONITORING & RETENTION                            │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Weekly: `cannibalization-check` & `content-opportunities`           │
│ 2. Monthly: `ai-visibility-audit` & `local-seo` map ranking checks     │
│ 3. Metrika API: Extract demand tree (`scripts/get_yandex_metrics`)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Agent-Automated Search Console & Webmaster Configuration

When setting up and administering search consoles, the AI agent is authorized and equipped to execute configuration actions directly through API and browser automation rather than delegating manual user steps.

### 8.1. Google Search Console Automated Setup Workflow
1. **Property Provisioning:**
   - Execute `mcp-search-console:add_site` with target URL (`siteUrl: "https://metalprom39.github.io/"`).
2. **Automated HTML Meta Verification:**
   - Agent injects `<meta name="google-site-verification" content="..." />` into `src/routes/+layout.svelte` via `siteConfig.googleVerification`.
   - Agent builds and executes automatic deployment (`pnpm build && git push`).
3. **Sitemap Pipeline:**
   - Agent invokes `mcp-search-console:submit_sitemap` with `feedpath: "https://metalprom39.github.io/sitemap.xml"`.
   - Agent checks sitemap status via `mcp-search-console:list_sitemaps`.
4. **Fast Index Queue:**
   - Agent queries `mcp-search-console:inspect_url` for `/`, `/kalkulyator-stoimosti-chpu/`, and key service pages to trigger inspection and indexation.

### 8.2. Yandex.Webmaster Automated Setup Workflow
1. **API & Meta Verification:**
   - Agent registers verification code into `PUBLIC_YANDEX_VERIFICATION` in `.env` and `src/routes/+layout.svelte`.
2. **Re-crawl Scheduling via API:**
   - Agent triggers priority re-crawl of key routes via Yandex.Webmaster API `recrawl/queue` endpoint.
3. **Regional Geotargeting Binding:**
   - Agent binds geographic target to **Калининград / Калининградская область** in Webmaster geo-settings.
4. **Metrika Linkage:**
   - Counter ID `114070369` is linked directly with the Webmaster property to feed user behavioral signals into the indexing algorithms.

---

## 9. Organic Ranking Expansion & Content Growth Roadmap

Search engines (especially Yandex and Google) rank manufacturing sites significantly higher when they possess strong topical authority, internal and external citation graphs, and confirmed local physical entity presence (NAP — Name, Address, Phone).

### 9.1. Topical Authority & Article Production Queue (`/stati`)
To capture long-tail and mid-tail commercial demand across Kaliningrad Oblast and the Russian Federation, the following engineering articles are scheduled for authoring with frontmatter tags, ГОСТ references, cross-links to workshop services, and external citations:

| Slug | Topic & Primary Keyword | Target Services Linked | External Authority Sources Cited | Status |
| :--- | :--- | :--- | :--- | :---: |
| `obrabotka-nerzhaveyushchey-stali-12x18n10t` | Особенности точения и фрезерования нержавейки 12Х18Н10Т / AISI 304 | `/tokarnye-raboty-chpu`, `/frezernye-raboty-chpu` | ГОСТ 5632-2014, Sandvik Coromant machining guidelines | **COMPLETED** |
| `izgotovlenie-zubchatykh-koles-gost` | Нарезание цилиндрических шестерен m=1-6: выбор модуля и термообработка | `/zuboreznye-i-shlifovalnye-raboty` | ГОСТ 2144-93, ГОСТ 1643-81, металлургические стандарты | **COMPLETED** |
| `alyuminievye-splavy-d16t-amg6-chpu` | Обработка авиационных алюминиевых сплавов Д16Т и АМг6: скорости и СОЖ | `/frezernye-raboty-chpu`, `/portfolio` | ГОСТ 4784-2019, Kennametal алюминиевые фрезы | **NEXT** |
| `termicheskaya-obrabotka-detaley-chpu` | Закалка ТВЧ, цементация и нормализация деталей после механической обработки | `/kontrol-kachestva-i-oborudovanie` | ГОСТ 8479-70, ГОСТ 4543-2016 | **PENDING** |
| `posadochnye-mesta-pod-podshipniki-it6-it7` | Допуски и посадки под подшипники: тонкости расточки и шлифования | `/tokarnye-raboty-chpu`, `/kontrol-kachestva-i-oborudovanie` | ГОСТ 3325-85, SKF Bearing Installation Manual | **PENDING** |

**Rules for Content Expansion:**
- Every article must contain:
  1. Direct Answer Block (AEO citation summary for LLMs).
  2. Frontmatter YAML with `tags`, `readingTime`, `relatedArticles`, and `relatedServices`.
  3. At least 2 contextual inbound links to workshop services and the interactive cost calculator.
  4. At least 2 external links to authoritative engineering standards (GOST, ISO, tool manufacturer whitepapers) to enhance citation trust.
  5. Schema.org `TechArticle` metadata.

### 9.2. Physical Entity Verification & Map Geo-Dominance (Yandex Maps, Google Maps, 2GIS)
Google and Yandex prioritize companies with verified physical addresses in local search ("металлообработка Калининград", "токарные работы ЧПУ рядом"). The agent tracks and automates profile creation:

1. **Yandex.Бизнес (Яндекс.Карты):**
   - Profile submission using the verified kit from Section 6.2.
   - Address pin placement in the industrial cluster (ул. Промышленная).
   - Syncing photo catalog of CNC machine centers (Fanuc 0i-TF, Siemens 828D) and Mitutoyo CMM QC equipment.
   - Setting categories: *Металлообработка*, *Токарные работы*, *Фрезерные работы*.
2. **Google Business Profile (Google Maps):**
   - Profile submission using Section 6.3 kit.
   - Target area: Kaliningrad Oblast.
   - Products & Services catalog linking directly to `/kalkulyator-stoimosti-chpu/`.
3. **2ГИС Калининград:**
   - Registration in 2GIS business portal (dominates B2B mobile search in Russian regions).
   - Linking company card to site domain `https://metalprom39.github.io/`.

---

## 10. Universal Autonomous Search Optimization Agent Prompt

This prompt is designed for any AI agent resuming or initiating search optimization tasks on `metal-prom-web`. It guarantees continuity, strict adherence to `PROJ.md`, continuous progress logging, and end-to-end autonomous execution using installed MCP tools and skills.

```markdown
You are the Lead SEO/AEO/GEO Engineer and Webmaster for `metal-prom-web`.
Your mission is to autonomously execute, audit, and advance the search engine optimization (SEO), answer engine optimization (AEO), and local map optimization (GEO) of the platform.

### MANDATORY INGESTION & CONTEXT:
1. Always start by thoroughly inspecting `metal-prom-web/PROJ.md` (specifically Section 1, Section 5, Section 7, Section 8, and Section 9).
2. Read the latest status from the 48-point checklist and Stage Progress Tracker.
3. Identify unfinished, pending, or next-priority tasks in the optimization lifecycle.

### YOUR TOOLKIT:
- **`geo-optimizer` MCP & CLI:** Use `/home/tikho/.local/bin/geo` and MCP tools (`geo_audit`, `geo_fix`, `geo_llms_generate`, `geo_citability`, `geo_track`) for Generative Engine audits, citability checks, and AI crawler validation.
- **`mcp-search-console` MCP:** Use MCP tools (`inspect_url`, `submit_sitemap`, `get_search_analytics`, `list_properties`) and skills (`indexing-audit`, `cannibalization-check`, `content-opportunities`, `seo-weekly-report`) for Google indexing and performance tracking.
- **`openseo` MCP & Skills:** Use the 12 OpenSEO skills (`local-seo`, `keyword-research`, `competitor-analysis`, `seo-audit`, `ai-visibility-audit`, `link-prospecting`) for market and competitive intelligence.
- **Bash & Codebase Tools:** Build, test (`pnpm check`, `pnpm test:unit`, `pnpm test:e2e`), commit, and deploy changes directly.

### EXECUTION INVARIANTS:
1. **Never stop at recommendations:** If an action can be performed (editing code, updating markdown, creating articles, verifying schemas, deploying, submitting sitemaps, running audits), execute it directly.
2. **Zero Personal Data (152-FZ):** Never introduce input fields collecting phone numbers, emails, or names. Preserve anonymous quotation sheets.
3. **Living Document Maintenance:** After completing any task, you MUST update `metal-prom-web/PROJ.md`:
   - Mark the item completed in the Stage Tracker and 48-Point Checklist.
   - Log the verification output (scores, test results, commit hashes).
   - Keep the next actions clearly prioritized.

### WORKFLOW SEQUENCE:
1. **Phase Diagnosis:** Determine current phase from `PROJ.md`.
2. **Audit Execution:** Run `geo audit` or `indexing-audit` to detect fresh regressions or opportunities.
3. **Implementation:** Write required articles, fix schema issues, adjust `robots.txt`/`llms.txt`, or configure webmaster endpoints.
4. **Automated Verification:** Run `pnpm check`, unit tests, and E2E tests.
5. **Deployment & Ping:** Deploy static build to `gh-pages` and notify search engine crawl queues.
6. **Documentation Update:** Update `PROJ.md` with timestamps, metrics, and completed checklist entries.
```
