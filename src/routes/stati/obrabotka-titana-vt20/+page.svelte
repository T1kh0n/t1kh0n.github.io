<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { getArticleBySlug, getRelatedArticles } from '#lib/content/articles-loader';
	import {
		createTechArticleSchema,
		createBreadcrumbSchema,
		serializeSchema
	} from '#lib/seo/schema';

	const slug = 'obrabotka-titana-vt20';
	const article = getArticleBySlug(slug);
	const relatedArticles = getRelatedArticles(slug, 2);

	const breadcrumbs = [
		{ name: 'База знаний', path: `${base}/stati/` },
		{ name: 'Особенности механической обработки титан', path: `${base}/stati/${slug}/` }
	];

	const breadcrumbSchema = createBreadcrumbSchema(breadcrumbs);
	const techArticleSchema = article
		? createTechArticleSchema({
				title: article.title,
				description: article.seoDescription || article.excerpt,
				url: `/stati/${slug}/`,
				datePublished: article.publishedDate,
				authorName: article.author,
				category: article.category,
				tags: article.tags,
				dependencies: 'ГОСТ 25346-2013, ГОСТ 1050-2013, ЕСКД'
			})
		: null;
</script>

<svelte:head>
	<title>{article?.seoTitle || article?.title} | {siteConfig.brandName}</title>
	<meta name="description" content={article?.seoDescription || article?.excerpt} />
	<link rel="canonical" href="{siteConfig.siteDomain}/stati/{slug}/" />

	<!-- Open Graph Article Metadata -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={article?.seoTitle || article?.title} />
	<meta property="og:description" content={article?.seoDescription || article?.excerpt} />
	<meta property="og:url" content="{siteConfig.siteDomain}/stati/{slug}/" />
	<meta property="article:published_time" content={article?.publishedDate} />
	<meta property="article:section" content={article?.category} />
	{#if article?.tags}
		{#each article.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Schema.org JSON-LD -->
	{@html serializeSchema(breadcrumbSchema)}
	{#if techArticleSchema}
		{@html serializeSchema(techArticleSchema)}
	{/if}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<article class="mt-6">
			<header class="border-b border-[var(--color-rule)] pb-6">
				<div class="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--color-muted)]">
					<span class="text-[var(--color-accent)] font-semibold">{article?.category}</span>
					<span>•</span>
					<time datetime={article?.publishedDate}>2026-11-25</time>
					<span>•</span>
					<span>Время чтения: {article?.readingTime}</span>
				</div>

				<h1 class="mt-4 text-3xl font-medium tracking-tight text-[var(--color-ink)] sm:text-4xl">
					{article?.h1 || article?.title}
				</h1>

				{#if article?.excerpt}
					<p class="mt-3 text-base text-[var(--color-ink-2)] leading-relaxed">
						{article.excerpt}
					</p>
				{/if}

				{#if article?.tags && article.tags.length > 0}
					<div class="mt-4 flex flex-wrap gap-1.5">
						{#each article.tags as tag}
							<a
								href="{base}/stati/?tag={encodeURIComponent(tag)}"
								rel="nofollow"
								class="rounded bg-[var(--color-paper-2)] px-2 py-0.5 font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
							>
								#{tag}
							</a>
						{/each}
					</div>
				{/if}
			</header>

			<!-- Direct Answer Callout for AEO & AI Search Engines -->
			<div class="my-6 rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 text-xs leading-relaxed text-[var(--color-ink-2)]">
				<b class="text-[var(--color-accent)]">Регламент цеха МеталлПром39:</b>
				Высокоточная контрактная металлообработка деталей на 2 обрабатывающих центрах ЧПУ с точностью до IT7 по ГОСТ 25346-2013 и шероховатостью Ra 1.25. Безналичный расчет с НДС 22%, входной контроль металла и 100% приемка ОТК.
			</div>

			<div class="prose prose-invert mt-8 max-w-none text-sm leading-relaxed text-[var(--color-ink-2)]">
				{@html article?.html}
			</div>

			<!-- Related Services CTA -->
			{#if article?.relatedServices && article.relatedServices.length > 0}
				<div class="mt-12 rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6">
					<h3 class="text-base font-semibold text-[var(--color-ink)]">
						Связанные производственные услуги
					</h3>
					<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
						{#each article.relatedServices as service}
							<a
								href="{base}/{service.slug}/"
								class="flex items-center justify-between rounded border border-[var(--color-rule)] p-3 text-xs text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
							>
								<span>{service.title}</span>
								<span class="text-[var(--color-accent)]">→</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Related Articles -->
			{#if relatedArticles && relatedArticles.length > 0}
				<aside class="mt-12 border-t border-[var(--color-rule)] pt-8">
					<h3 class="text-sm font-mono uppercase tracking-wider text-[var(--color-muted)]">
						Рекомендуемые материалы
					</h3>
					<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
						{#each relatedArticles as related}
							<a
								href="{base}/stati/{related.slug}/"
								class="group rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 transition-colors hover:border-[var(--color-rule-2)]"
							>
								<span class="text-xs font-mono uppercase text-[var(--color-accent)]">
									{related.category}
								</span>
								<h4 class="mt-1 text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
									{related.title}
								</h4>
								<p class="mt-2 text-xs text-[var(--color-muted)] line-clamp-2">
									{related.excerpt}
								</p>
							</a>
						{/each}
					</div>
				</aside>
			{/if}
		</article>
	</div>
</main>
