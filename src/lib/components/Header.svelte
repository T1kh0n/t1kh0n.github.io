<script lang="ts">
	import { base } from '$lib/paths';
	import { siteConfig } from '#lib/config/site';
	import BrandLogo from '#lib/components/BrandLogo.svelte';
	import { a11y } from '#lib/a11y/accessibility-store.svelte';

	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ name: 'Токарная', href: `${base}/tokarnye-raboty-chpu/` },
		{ name: 'Фрезерная', href: `${base}/frezernye-raboty-chpu/` },
		{ name: 'Зуборезка', href: `${base}/zuboreznye-i-shlifovalnye-raboty/` },
		{ name: 'Калькулятор', href: `${base}/kalkulyator-stoimosti-chpu/` },
		{ name: 'Портфолио', href: `${base}/portfolio/` },
		{ name: 'ОТК и станки', href: `${base}/kontrol-kachestva-i-oborudovanie/` },
		{ name: 'Статьи', href: `${base}/stati/` }
	];
</script>

<header
	class="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur-md"
>
	<!-- Single Clean Navigation Bar -->
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
		<!-- Brand Logo -->
		<a href="{base}/" class="group flex shrink-0 items-center">
			<BrandLogo size="md" />
		</a>

		<!-- Right Section: Navigation Links & Actions -->
		<div class="flex items-center gap-2 sm:gap-3 lg:gap-5">
			<!-- Desktop Navigation -->
			<nav class="hidden items-center gap-3.5 lg:flex xl:gap-4" aria-label="Основная навигация">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-xs whitespace-nowrap text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
					>
						{link.name}
					</a>
				{/each}
			</nav>

			<!-- Accessibility Toggle Button (Desktop & Tablet) (ГОСТ Р 52872-2019) -->
			<button
				type="button"
				class="hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-white"
				onclick={() => a11y.toggleEnabled()}
				aria-label="Включить версию для слабовидящих"
				title="Версия для слабовидящих (ГОСТ Р 52872-2019)"
			>
				<svg
					class="h-4 w-4 text-[var(--color-accent)] a11y-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
					<circle cx="12" cy="12" r="3"></circle>
				</svg>
				<span class="hidden md:inline text-[11px] font-normal">Слабовидящим</span>
			</button>

			<!-- Quick CTA (Vantage hairline secondary pill button, hidden on mobile/tablet) -->
			<a
				href="{base}/kalkulyator-stoimosti-chpu/"
				class="btn btn--sm btn--line !hidden shrink-0 xl:!inline-flex"
			>
				<span>Калькулятор ЧПУ</span>
			</a>

			<!-- Mobile Menu Button (≥ 44px touch target) -->
			<button
				type="button"
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-rule)] text-[var(--color-ink-2)] transition-colors hover:text-white lg:hidden"
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				aria-expanded={isMobileMenuOpen}
				aria-label="Переключить меню"
			>
				{#if isMobileMenuOpen}
					<span class="text-base font-light">✕</span>
				{:else}
					<span class="text-base font-light">☰</span>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Dropdown Navigation -->
	{#if isMobileMenuOpen}
		<div class="border-b border-[var(--color-rule)] bg-[var(--color-paper-2)] px-4 py-4 lg:hidden">
			<nav class="flex flex-col space-y-1">
				{#each navLinks as link}
					<a
						href={link.href}
						class="border-b border-[var(--color-rule)] py-2.5 text-sm text-[var(--color-ink-2)] transition-colors hover:text-white"
						onclick={() => (isMobileMenuOpen = false)}
					>
						{link.name}
					</a>
				{/each}

				<!-- Accessibility Option inside Mobile Menu -->
				<button
					type="button"
					class="flex items-center gap-2 border-b border-[var(--color-rule)] py-2.5 text-sm text-[var(--color-ink)] transition-colors hover:text-white text-left"
					onclick={() => {
						a11y.toggleEnabled();
						isMobileMenuOpen = false;
					}}
				>
					<svg
						class="h-4 w-4 text-[var(--color-accent)] a11y-icon"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
						<circle cx="12" cy="12" r="3"></circle>
					</svg>
					<span>Версия для слабовидящих</span>
				</button>

				<div class="mt-4 pt-2">
					<a
						href="{base}/kalkulyator-stoimosti-chpu/"
						class="btn btn--wide text-xs"
						onclick={() => (isMobileMenuOpen = false)}
					>
						<span>Калькулятор стоимости ЧПУ</span>
					</a>
				</div>
			</nav>
		</div>
	{/if}
</header>
