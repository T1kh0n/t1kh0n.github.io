<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { getAllArticles, getAllTags } from '#lib/content/articles-loader';
	import { createBreadcrumbSchema, serializeSchema } from '#lib/seo/schema';
	import { onMount } from 'svelte';

	const breadcrumbs = [{ name: 'База знаний', path: `${base}/stati/` }];
	const articles = getAllArticles();
	const tags = getAllTags();

	let selectedTag = $state<string | null>(null);

	onMount(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const tagParam = params.get('tag');
			if (tagParam) {
				selectedTag = tagParam;
			}
		}
	});

	function handleTagClick(tag: string | null) {
		selectedTag = tag;
		if (typeof window !== 'undefined') {
			const url = new URL(window.location.href);
			if (tag) {
				url.searchParams.set('tag', tag);
			} else {
				url.searchParams.delete('tag');
			}
			window.history.replaceState({}, '', url.toString());
		}
	}

	const filteredArticles = $derived(
		selectedTag
			? articles.filter((a) => a.tags?.some((t) => t.toLowerCase() === selectedTag?.toLowerCase()))
			: articles
	);

	const breadcrumbSchema = createBreadcrumbSchema(breadcrumbs);
</script>

<svelte:head>
	<title>Инженерная база знаний и статьи по металлообработке с ЧПУ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Технические статьи и руководства по выбору сталей, допускам IT7-IT12 по ГОСТ и DFM-оптимизации стоимости деталей для конструкторов и технологов от цеха МеталлПром39 в Калининграде."
	/>
	<link rel="canonical" href="{siteConfig.siteDomain}/stati/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Инженерная база знаний по металлообработке с ЧПУ | {siteConfig.brandName}" />
	<meta
		property="og:description"
		content="Технические статьи и руководства по выбору сталей, допускам IT7-IT12 по ГОСТ и DFM-оптимизации стоимости деталей."
	/>
	{@html serializeSchema(breadcrumbSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="border-b border-[var(--color-rule)] pb-8">
			<div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)]">
				<span>Технологическая документация</span>
				<span>/</span>
				<span>ГОСТ и стандарты</span>
			</div>
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				База знаний по металлообработке с ЧПУ
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Инженерные статьи и фундаментальные руководства технологов: выбор сталей, назначение допусков по ГОСТ и
				DFM-оптимизация себестоимости деталей на станках с ЧПУ.
			</p>

			<!-- Interactive Tag Cloud / Category Filter -->
			{#if tags.length > 0}
				<div class="mt-6 flex flex-wrap items-center gap-2 pt-2">
					<span class="text-xs text-[var(--color-muted)] mr-1">Темы:</span>
					<button
						type="button"
						onclick={() => handleTagClick(null)}
						class="rounded-sm border px-2.5 py-1 text-xs transition-colors {selectedTag === null
							? 'border-[var(--color-accent)] bg-[var(--color-accent)] font-medium text-black'
							: 'border-[var(--color-rule-2)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)]'}"
					>
						Все материалы ({articles.length})
					</button>
					{#each tags as item}
						<button
							type="button"
							onclick={() => handleTagClick(item.tag)}
							class="rounded-sm border px-2.5 py-1 text-xs transition-colors {selectedTag === item.tag
								? 'border-[var(--color-accent)] bg-[var(--color-accent)] font-medium text-black'
								: 'border-[var(--color-rule-2)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)]'}"
						>
							#{item.tag} <span class="opacity-60 text-[10px]">({item.count})</span>
						</button>
					{/each}
				</div>
			{/if}
		</header>

		<!-- Articles Grid -->
		<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredArticles as article}
				<article
					class="well flex flex-col justify-between transition-colors hover:border-[var(--color-rule-2)]"
				>
					<div>
						<div class="flex items-center justify-between text-xs text-[var(--color-muted)]">
							<span
								class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2 py-0.5 text-[var(--color-ink-2)]"
							>
								{article.category}
							</span>
							<span class="num text-[var(--color-muted)]">{article.publishedDate}</span>
						</div>
						<h2
							class="mt-4 text-base leading-snug font-normal text-[var(--color-ink)] hover:text-white"
						>
							<a href="{base}/stati/{article.slug}/">{article.title}</a>
						</h2>
						<p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">{article.excerpt}</p>

						<!-- Article Tags Preview -->
						{#if article.tags && article.tags.length > 0}
							<div class="mt-4 flex flex-wrap gap-1.5">
								{#each article.tags.slice(0, 3) as tag}
									<span class="text-[11px] text-[var(--color-muted)] font-mono">
										#{tag}
									</span>
								{/each}
							</div>
						{/if}
					</div>

					<div class="mt-6 border-t border-[var(--color-rule)] pt-4 flex items-center justify-between">
						<a
							href="{base}/stati/{article.slug}/"
							class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-ink)] flex items-center gap-1"
						>
							<span>Читать разбор</span>
							<span>&rarr;</span>
						</a>
						<span class="text-[11px] text-[var(--color-accent)] font-mono">
							{article.readingTime || '5 мин'}
						</span>
					</div>
				</article>
			{/each}
		</div>

		{#if filteredArticles.length === 0}
			<div class="mt-12 text-center text-sm text-[var(--color-muted)] py-12 border border-dashed border-[var(--color-rule)] rounded-[var(--radius-card)]">
				По выбранному тегу #{selectedTag} статей не найдено.
				<button
					type="button"
					onclick={() => handleTagClick(null)}
					class="ml-2 underline text-[var(--color-accent)]"
				>
					Показать все статьи
				</button>
			</div>
		{/if}
	</div>
</main>
