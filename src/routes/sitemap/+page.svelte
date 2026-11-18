<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { SITEMAP_REGISTRY, getGroupedSitemap } from '#lib/content/sitemap-registry';
	import { WORKSHOP_SPECS } from '#lib/content/workshop-specs';

	const breadcrumbs = [{ name: 'Карта сайта', path: `${base}/sitemap/` }];

	const groupedSections = getGroupedSitemap();

	let activeView = $state<'navigation' | 'agent_registry'>('navigation');
	let searchFilter = $state('');

	const filteredRegistry = $derived(
		SITEMAP_REGISTRY.filter((item) => {
			if (!searchFilter.trim()) return true;
			const q = searchFilter.toLowerCase();
			return (
				item.title.toLowerCase().includes(q) ||
				item.url.toLowerCase().includes(q) ||
				item.sourceFile.toLowerCase().includes(q) ||
				item.reusableSpecs.some((s) => s.toLowerCase().includes(q))
			);
		})
	);
</script>

<svelte:head>
	<title>Карта сайта и реестр спецификаций AEO | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Карта сайта металлообрабатывающего цеха МеталлПром39 в Калининграде: навигационный каталог страниц, реестр контента AEO и переиспользуемые параметры оборудования."
	/>
	<link rel="canonical" href="{siteConfig.siteDomain}/sitemap/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Карта сайта и реестр спецификаций AEO | {siteConfig.brandName}" />
	<meta
		property="og:description"
		content="Карта сайта металлообрабатывающего цеха МеталлПром39 в Калининграде: навигационный каталог страниц, реестр контента AEO и переиспользуемые параметры оборудования."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="border-b border-[var(--color-rule)] pb-8">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
						Карта сайта и архитектура контента
					</h1>
					<p class="lead mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
						Полный каталог производственных услуг, аналитических инструментов и реестр единого источника данных (Единый источник достоверных данных) для поисковых систем и AI-агентов (AEO).
					</p>
				</div>
				<div class="flex items-center gap-2">
					<a
						href="{base}/sitemap.xml"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn--sm btn--line shrink-0"
					>
						<span>Открыть sitemap.xml</span>
					</a>
				</div>
			</div>

			<!-- View Switcher Tabs -->
			<div class="mt-8 flex flex-wrap gap-2 border-b border-[var(--color-rule)] pb-2" role="tablist">
				<button
					type="button"
					class="rounded-sm px-3.5 py-1.5 text-xs font-normal transition-colors {activeView === 'navigation'
						? 'bg-[var(--color-paper-2)] text-[var(--color-accent)] border border-[var(--color-rule-2)]'
						: 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
					onclick={() => (activeView = 'navigation')}
					role="tab"
					aria-selected={activeView === 'navigation'}
				>
					Навигация для клиентов
				</button>
				<button
					type="button"
					class="rounded-sm px-3.5 py-1.5 text-xs font-normal transition-colors {activeView === 'agent_registry'
						? 'bg-[var(--color-paper-2)] text-[var(--color-accent)] border border-[var(--color-rule-2)]'
						: 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
					onclick={() => (activeView = 'agent_registry')}
					role="tab"
					aria-selected={activeView === 'agent_registry'}
				>
					Реестр для AI-агентов & AEO (Единый источник достоверных данных)
				</button>
			</div>
		</header>

		{#if activeView === 'navigation'}
			<!-- Standard User Navigation View -->
			<div class="mt-10 space-y-12">
				{#each groupedSections as section}
					<section aria-labelledby="section-{section.category}">
						<h2
							id="section-{section.category}"
							class="border-b border-[var(--color-rule)] pb-3 text-lg font-normal text-[var(--color-ink)] sm:text-xl"
						>
							{section.title}
						</h2>
						<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{#each section.items as item}
								<a
									href="{base}{item.url}"
									class="well flex flex-col justify-between transition-colors hover:border-[var(--color-rule-2)]"
								>
									<div>
										<h3 class="text-sm font-normal text-[var(--color-ink)]">
											{item.title}
										</h3>
										<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
											{item.description}
										</p>
									</div>
									<div class="mt-4 flex items-center justify-between border-t border-[var(--color-rule)] pt-2 text-[11px] text-[var(--color-muted)]">
										<span class="num text-[var(--color-ink-2)]">{item.url}</span>
										<span class="text-[var(--color-accent)]">&rarr;</span>
									</div>
								</a>
							{/each}
						</div>
					</section>
				{/each}
			</div>
		{:else}
			<!-- Agent & Developer Registry View (Единый реестр характеристик цеха) -->
			<div class="mt-8 space-y-8">
				<!-- Search Filter -->
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div class="max-w-md w-full">
						<input
							type="text"
							bind:value={searchFilter}
							placeholder="Поиск по URL, файлу контента или названию..."
							class="w-full rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-3 py-2 text-xs text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
						/>
					</div>
					<div class="text-xs text-[var(--color-muted)]">
						Всего страниц в реестре: <span class="num text-[var(--color-ink)]">{filteredRegistry.length}</span>
					</div>
				</div>

				<!-- Quick Reusable Specifications Overview -->
				<div class="rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] p-5">
					<div class="font-mono text-xs text-[var(--color-accent)] uppercase">
						Базовые спецификации цеха (WORKSHOP_SPECS)
					</div>
					<div class="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
						<div class="border-r border-[var(--color-rule)] pr-2">
							<span class="text-[var(--color-muted)]">Станочный парк:</span>
							<strong class="block font-normal text-[var(--color-ink)]">{WORKSHOP_SPECS.machineCentersCount} центра ЧПУ</strong>
						</div>
						<div class="border-r border-[var(--color-rule)] pr-2">
							<span class="text-[var(--color-muted)]">Токарный лимит:</span>
							<strong class="block font-normal text-[var(--color-ink)]">{WORKSHOP_SPECS.latheLimitsString}</strong>
						</div>
						<div class="border-r border-[var(--color-rule)] pr-2">
							<span class="text-[var(--color-muted)]">Фрезерный (3 оси):</span>
							<strong class="block font-normal text-[var(--color-ink)]">{WORKSHOP_SPECS.millLimitsString}</strong>
						</div>
						<div>
							<span class="text-[var(--color-muted)]">Квалитет и наценка:</span>
							<strong class="block font-normal text-[var(--color-accent)]">{WORKSHOP_SPECS.maxToleranceGrade} (0% наценки)</strong>
						</div>
					</div>
				</div>

				<!-- Registry Cards Table -->
				<div class="space-y-4">
					{#each filteredRegistry as entry}
						<article class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5 space-y-4">
							<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-[var(--color-rule)] pb-3">
								<div>
									<div class="flex items-center gap-2">
										<span class="font-mono text-xs font-bold text-[var(--color-accent)]">{entry.url}</span>
										<span class="rounded bg-[var(--color-paper)] px-1.5 py-0.5 text-[10px] text-[var(--color-muted)]">{entry.categoryTitle}</span>
									</div>
									<h3 class="mt-1 text-base font-normal text-[var(--color-ink)]">
										<a href="{base}{entry.url}" class="hover:text-[var(--color-accent)]">{entry.title}</a>
									</h3>
								</div>
								<div class="text-right font-mono text-[11px] text-[var(--color-muted)]">
									<div>Приоритет: <span class="num text-[var(--color-ink)]">{entry.priority}</span></div>
									<div>Обновлено: <span class="num text-[var(--color-ink)]">{entry.lastmod}</span></div>
								</div>
							</div>

							<!-- Technical Details Grid -->
							<div class="grid grid-cols-1 gap-4 text-xs md:grid-cols-12">
								<div class="md:col-span-4 space-y-2">
									<div>
										<span class="text-[var(--color-muted)]">Файл источника контента:</span>
										<code class="block font-mono text-[11px] text-[var(--color-ink)] bg-[var(--color-paper)] p-1 rounded border border-[var(--color-rule)] mt-0.5">
											{entry.sourceFile}
										</code>
									</div>
									<div>
										<span class="text-[var(--color-muted)]">Используемые переменные WORKSHOP_SPECS:</span>
										<div class="mt-1 flex flex-wrap gap-1">
											{#each entry.reusableSpecs as spec}
												<span class="rounded border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-accent)]">
													{spec}
												</span>
											{/each}
										</div>
									</div>
								</div>

								<!-- Краткий инженерный ответ & Audience -->
								<div class="md:col-span-8 space-y-2">
									<div>
										<span class="text-[var(--color-muted)]">Краткий инженерный ответ для поисковых систем:</span>
										<p class="mt-1 text-xs leading-relaxed text-[var(--color-ink-2)] bg-[var(--color-paper)] p-2 rounded border border-[var(--color-rule)]">
											{entry.aeo.directAnswer}
										</p>
									</div>
									<div class="flex flex-wrap gap-4 text-[11px] text-[var(--color-muted)]">
										<div>Целевая аудитория: <strong class="font-normal text-[var(--color-ink)]">{entry.aeo.audience}</strong></div>
										<div>Стандарты: <strong class="font-normal text-[var(--color-ink)]">{entry.aeo.applicableStandards.join(', ')}</strong></div>
									</div>
								</div>
							</div>
						</article>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</main>
