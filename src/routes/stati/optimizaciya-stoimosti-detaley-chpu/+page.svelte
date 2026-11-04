<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { getArticleBySlug } from '#lib/content/articles-loader';

	const slug = 'optimizaciya-stoimosti-detaley-chpu';
	const article = getArticleBySlug(slug);

	const breadcrumbs = [
		{ name: 'База знаний', path: `${base}/stati/` },
		{ name: 'DFM-оптимизация стоимости ЧПУ', path: `${base}/stati/${slug}/` }
	];
</script>

<svelte:head>
	<title>{article?.seoTitle || article?.title} | {siteConfig.brandName}</title>
	<meta
		name="description"
		content={article?.seoDescription || article?.excerpt}
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		{#if article}
			<article class="mx-auto max-w-4xl">
				<header class="border-b border-[var(--color-rule)] pb-8">
					<div class="flex items-center gap-3 text-xs text-[var(--color-muted)]">
						<span
							class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2 py-0.5 text-[var(--color-ink-2)]"
						>
							{article.category}
						</span>
						<span>Опубликовано: {article.publishedDate}</span>
						<span class="text-[var(--color-accent)] font-mono">{article.author}</span>
					</div>
					<h1 class="mt-4 text-2xl text-[var(--color-ink)] sm:text-3xl lg:text-4xl">
						{article.h1 || article.title}
					</h1>
					<p class="lead mt-4 text-sm leading-relaxed sm:text-base">
						{article.excerpt}
					</p>
				</header>

				<!-- Article Body Rendered from Markdown -->
				<div class="mt-8 article-prose">
					{@html article.html}
				</div>

				<!-- Article Footer CTA -->
				<div class="mt-12 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 text-center sm:p-8">
					<h2 class="text-lg font-normal text-[var(--color-ink)] sm:text-xl">
						Хотите проверить деталь на соответствие DFM?
					</h2>
					<p class="mt-2 text-xs text-[var(--color-muted)]">
						Загрузите 3D-модель в формате STEP в калькулятор — система автоматически извлечет объем и габариты.
					</p>
					<div class="mt-6 flex flex-wrap justify-center gap-4">
						<a href="{base}/kalkulyator-stoimosti-chpu/" class="btn btn--sm">
							Загрузить 3D STEP в калькулятор
						</a>
						<a href="{base}/stati/" class="btn btn--sm btn--line">
							Все статьи базы знаний
						</a>
					</div>
				</div>
			</article>
		{/if}
	</div>
</main>
