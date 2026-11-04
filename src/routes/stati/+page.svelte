<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { getAllArticles } from '#lib/content/articles-loader';

	const breadcrumbs = [{ name: 'База знаний', path: `${base}/stati/` }];

	const articles = getAllArticles();
</script>

<svelte:head>
	<title>Инженерная база знаний и статьи по металлообработке с ЧПУ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Технические статьи и руководства по выбору сталей, допускам IT7-IT12 по ГОСТ и DFM-оптимизации стоимости деталей для конструкторов и технологов от цеха MetalProm39."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				База знаний по металлообработке с ЧПУ
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Инженерные статьи и фундаментальные руководства технологов: выбор сталей, назначение допусков по ГОСТ и
				DFM-оптимизация себестоимости деталей на станках с ЧПУ.
			</p>
		</header>

		<!-- Articles Grid -->
		<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article}
				<article
					class="well flex flex-col justify-between transition-colors hover:border-[var(--color-rule-2)]"
				>
					<div>
						<div class="flex items-center justify-between text-xs text-[var(--color-muted)]">
							<span
								class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2 py-0.5"
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
					</div>

					<div class="mt-6 border-t border-[var(--color-rule)] pt-4 flex items-center justify-between">
						<a
							href="{base}/stati/{article.slug}/"
							class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
						>
							Читать инженерный разбор &rarr;
						</a>
						<span class="text-[11px] text-[var(--color-accent)] font-mono">MetalProm39</span>
					</div>
				</article>
			{/each}
		</div>
	</div>
</main>
