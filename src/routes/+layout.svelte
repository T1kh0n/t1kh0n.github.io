<script lang="ts">
	import './layout.css';
	import 'katex/dist/katex.min.css';
	import favicon from '#lib/assets/favicon.svg';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import CookieNotice from '#lib/components/CookieNotice.svelte';
	import AccessibilityPanel from '#lib/components/AccessibilityPanel.svelte';
	import {
		createOrganizationSchema,
		createLocalBusinessSchema,
		createWebSiteSchema,
		serializeSchema
	} from '#lib/seo/schema';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const orgSchema = createOrganizationSchema();
	const localBusinessSchema = createLocalBusinessSchema();
	const webSiteSchema = createWebSiteSchema();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title="МеталлПром39 — Контрактная металлообработка с ЧПУ" href="/feed.xml" />

	<!-- Search Engine & Webmaster Verification -->
	<meta name="google-site-verification" content="googlebffb7acba9853275.html" />
	<meta name="yandex-verification" content="cbf1eb49dd9b13b2" />
	
	<!-- GEO Targeting: Kaliningrad, Russia -->
	<meta name="geo.region" content="RU-KGD" />
	<meta name="geo.placename" content="Калининград" />
	<meta name="geo.position" content="54.710426;20.452214" />
	<meta name="ICBM" content="54.710426, 20.452214" />

	<!-- Technical SEO & Crawling Directives -->
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="author" content="Цех контрактной металлообработки ЧПУ МеталлПром39" />
	<meta name="revised" content="2026-11-13T21:00:00+02:00" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content="МеталлПром39" />
	<meta property="og:image" content="https://t1kh0n.github.io/og/default.webp" />

	<!-- Schema.org JSON-LD Structured Data -->
	{@html serializeSchema(orgSchema)}
	{@html serializeSchema(localBusinessSchema)}
	{@html serializeSchema(webSiteSchema)}
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-ink)] antialiased selection:bg-[color-mix(in_oklab,var(--color-accent)_30%,transparent)]"
>
	<div class="hidden" aria-hidden="true">
		<time datetime="2026-11-13">13 ноября 2026</time>
		<span class="author">Инженерно-технологический отдел МеталлПром39</span>
	</div>
	<AccessibilityPanel />
	<Header />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
	<CookieNotice />
</div>
