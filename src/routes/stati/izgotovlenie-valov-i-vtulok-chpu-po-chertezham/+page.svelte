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

	const slug = 'izgotovlenie-valov-i-vtulok-chpu-po-chertezham';
	const article = getArticleBySlug(slug);
	const relatedArticles = getRelatedArticles(slug, 2);

	const breadcrumbs = [
		{ name: 'База знаний', path: `${base}/stati/` },
		{ name: 'Изготовление валов и втулок на ЧПУ', path: `${base}/stati/${slug}/` }
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
				dependencies: 'ГОСТ 25346-2013, ГОСТ 3325-85, ГОСТ 4543-2016, ЕСКД'
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
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		{#if article}
			<article class="mx-auto max-w-4xl">
				<header class="border-b border-[var(--color-rule)] pb-8">
					<div class="flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]">
						<span
							class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2 py-0.5 text-[var(--color-ink-2)]"
						>
							{article.category}
						</span>
						<span>Опубликовано: {article.publishedDate}</span>
						<span class="text-[var(--color-accent)] font-mono">{article.author}</span>
						<span class="rounded bg-[var(--color-paper-2)] px-2 py-0.5 font-mono text-xs text-[var(--color-ink-2)]">
							⏱ {article.readingTime || '8 мин'} чтения
						</span>
					</div>

					<h1 class="mt-4 text-2xl text-[var(--color-ink)] sm:text-3xl lg:text-4xl">
						{article.h1 || article.title}
					</h1>

					<p class="lead mt-4 text-sm leading-relaxed sm:text-base">
						{article.excerpt}
					</p>

					<!-- Clickable Article Tags -->
					{#if article.tags && article.tags.length > 0}
						<div class="mt-6 flex flex-wrap gap-2 pt-2 border-t border-[var(--color-rule)]">
							<span class="text-xs text-[var(--color-muted)] self-center">Теги статьи:</span>
							{#each article.tags as tag}
								<a
									rel="nofollow" href="{base}/stati/?tag={encodeURIComponent(tag)}"
									class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2 py-0.5 text-xs text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
								>
									#{tag}
								</a>
							{/each}
						</div>
					{/if}
				</header>

				<!-- Article Body Rendered from Markdown -->
				<div class="mt-8 article-prose">
					{@html article.html}
				</div>

				<!-- Related Services Interlinking Block -->
				{#if article.relatedServices && article.relatedServices.length > 0}
					<div class="mt-12 rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] p-6 sm:p-8">
						<div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)]">
							<span>Производственные услуги МеталлПром39</span>
						</div>
						<h3 class="mt-2 text-lg font-normal text-[var(--color-ink)]">
							Токарная обработка валов и втулок с контролем ОТК
						</h3>
						<p class="mt-1 text-xs text-[var(--color-muted)]">
							Точение до ø&thinsp;200 мм, длина до 750 мм, термообработка ТВЧ, шлифование шеек до Ra 0.8. Минимальный заказ от 5 000 ₽ с НДС 22%.
						</p>
						<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
							{#each article.relatedServices as service}
								<a
									href="{base}/{service.slug}/"
									class="flex flex-col justify-between rounded border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 text-xs transition-colors hover:border-[var(--color-accent)]"
								>
									<span class="font-medium text-[var(--color-ink)]">{service.title}</span>
									<span class="mt-2 text-xs text-[var(--color-accent)]">&rarr; Подробнее</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Related Technical Articles Block -->
				{#if relatedArticles.length > 0}
					<div class="mt-8 border-t border-[var(--color-rule)] pt-8">
						<h3 class="text-lg font-normal text-[var(--color-ink)]">
							Связанные технологические статьи
						</h3>
						<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
							{#each relatedArticles as related}
								<div class="well flex flex-col justify-between p-4">
									<div>
										<span class="text-xs uppercase font-mono text-[var(--color-accent)]">
											{related.category}
										</span>
										<h4 class="mt-1 text-sm font-normal text-[var(--color-ink)]">
											<a href="{base}/stati/{related.slug}/" class="hover:underline">
												{related.title}
											</a>
										</h4>
										<p class="mt-2 text-xs text-[var(--color-muted)] line-clamp-2">
											{related.excerpt}
										</p>
									</div>
									<div class="mt-4 flex items-center justify-between text-xs border-t border-[var(--color-rule)] pt-2">
										<a href="{base}/stati/{related.slug}/" class="text-[var(--color-ink-2)] hover:text-white">
											Читать разбор &rarr;
										</a>
										<span class="text-xs text-[var(--color-muted)]">{related.readingTime || '5 мин'}</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Article Footer CTA -->
				<div class="mt-12 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 text-center sm:p-8">
					<h2 class="text-lg font-normal text-[var(--color-ink)] sm:text-xl">
						Требуется изготовление партии ступенчатых валов или втулок?
					</h2>
					<p class="mt-2 text-xs text-[var(--color-muted)]">
						Загрузите чертеж в PDF или 3D-модель в STEP для мгновенного инженерного расчета себестоимости партии с НДС 22%.
					</p>
					<div class="mt-6 flex flex-wrap justify-center gap-4">
						<a href="{base}/kalkulyator-stoimosti-chpu/" class="btn btn--sm">
							Рассчитать партию в калькуляторе
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
