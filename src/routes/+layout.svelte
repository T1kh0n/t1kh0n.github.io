<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import CookieNotice from '#lib/components/CookieNotice.svelte';
	import { siteConfig } from '#lib/config/site';
	import {
		createOrganizationSchema,
		createLocalBusinessSchema,
		serializeSchema
	} from '#lib/seo/schema';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const orgSchema = createOrganizationSchema();
	const localBusinessSchema = createLocalBusinessSchema();

	// Resolve Yandex Metrika Counter ID
	const ymCounter = siteConfig.ymCounterId;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{@html serializeSchema(orgSchema)}
	{@html serializeSchema(localBusinessSchema)}

	<!-- Yandex.Metrika counter -->
	{#if ymCounter && ymCounter !== '00000000' && ymCounter !== ''}
		<script type="text/javascript">
			(function(m,e,t,r,i,k,a){
				m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
				m[i].l=1*new Date();
				for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
				k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
			})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id={ymCounter}', 'ym');

			ym({ymCounter}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
		</script>
		<noscript>
			<div>
				<img src="https://mc.yandex.ru/watch/{ymCounter}" style="position:absolute; left:-9999px;" alt="" />
			</div>
		</noscript>
	{/if}
	<!-- /Yandex.Metrika counter -->
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-ink)] antialiased selection:bg-[color-mix(in_oklab,var(--color-accent)_30%,transparent)]"
>
	<Header />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
	<CookieNotice />
</div>
