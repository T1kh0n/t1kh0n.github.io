<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import CookieNotice from '#lib/components/CookieNotice.svelte';
	import AccessibilityPanel from '#lib/components/AccessibilityPanel.svelte';
	import {
		createOrganizationSchema,
		createLocalBusinessSchema,
		serializeSchema
	} from '#lib/seo/schema';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const orgSchema = createOrganizationSchema();
	const localBusinessSchema = createLocalBusinessSchema();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	
	<!-- GEO Targeting: Kaliningrad, Russia -->
	<meta name="geo.region" content="RU-KGD" />
	<meta name="geo.placename" content="Калининград" />
	<meta name="geo.position" content="54.710426;20.452214" />
	<meta name="ICBM" content="54.710426, 20.452214" />

	<!-- Technical SEO & Crawling Directives -->
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="author" content="Цех контрактной металлообработки ЧПУ MetalProm39" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content="МеталлПром39" />

	<!-- Schema.org JSON-LD Structured Data -->
	{@html serializeSchema(orgSchema)}
	{@html serializeSchema(localBusinessSchema)}
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-ink)] antialiased selection:bg-[color-mix(in_oklab,var(--color-accent)_30%,transparent)]"
>
	<AccessibilityPanel />
	<Header />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
	<CookieNotice />
</div>
