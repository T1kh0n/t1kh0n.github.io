import { t as siteConfig } from "../../../../chunks/site.js";
import { a as head, c as html, f as escape_html, i as ensure_array_like, s as stringify, u as attr } from "../../../../chunks/server.js";
import { l as serializeSchema, s as createTechArticleSchema, t as createBreadcrumbSchema } from "../../../../chunks/schema.js";
import { t as Breadcrumbs } from "../../../../chunks/Breadcrumbs.js";
import { i as getRelatedArticles, r as getArticleBySlug } from "../../../../chunks/articles-loader.js";
// src/routes/stati/normo-chas-chpu-i-raschet-stoimosti-metalloobrabotki/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const slug = "normo-chas-chpu-i-raschet-stoimosti-metalloobrabotki";
		const article = getArticleBySlug(slug);
		const relatedArticles = getRelatedArticles(slug, 2);
		const breadcrumbs = [{
			name: "База знаний",
			path: `/stati/`
		}, {
			name: "Нормо-час и расчет стоимости ЧПУ",
			path: `/stati/${slug}/`
		}];
		const breadcrumbSchema = createBreadcrumbSchema(breadcrumbs);
		const techArticleSchema = article ? createTechArticleSchema({
			title: article.title,
			description: article.seoDescription || article.excerpt,
			url: `/stati/${slug}/`,
			datePublished: article.publishedDate,
			authorName: article.author,
			category: article.category,
			tags: article.tags,
			dependencies: "Машиностроительное нормирование, ГОСТ 3.1109-82, DFM"
		}) : null;
		head("1d4ym3e", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(article?.seoTitle || article?.title)} | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", article?.seoDescription || article?.excerpt)}/> <link rel="canonical"${attr("href", `${stringify(siteConfig.siteDomain)}/stati/normo-chas-chpu-i-raschet-stoimosti-metalloobrabotki/`)}/> <meta property="og:type" content="article"/> <meta property="og:title"${attr("content", article?.seoTitle || article?.title)}/> <meta property="og:description"${attr("content", article?.seoDescription || article?.excerpt)}/> <meta property="og:url"${attr("content", `${stringify(siteConfig.siteDomain)}/stati/normo-chas-chpu-i-raschet-stoimosti-metalloobrabotki/`)}/> <meta property="article:published_time"${attr("content", article?.publishedDate)}/> <meta property="article:section"${attr("content", article?.category)}/> `);
			if (article?.tags) {
				$$renderer.push(`<!--[0--><!--[-->`);
				const each_array = ensure_array_like(article.tags);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let tag = each_array[$$index];
					$$renderer.push(`<meta property="article:tag"${attr("content", tag)}/>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> ${html(serializeSchema(breadcrumbSchema))} `);
			if (techArticleSchema) $$renderer.push(`<!--[0-->${html(serializeSchema(techArticleSchema))}`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> <article class="mt-6"><header class="border-b border-[var(--color-rule)] pb-6"><div class="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--color-muted)]"><span class="text-[var(--color-accent)] font-semibold">${escape_html(article?.category)}</span> <span>•</span> <time${attr("datetime", article?.publishedDate)}>18 ноября 2026</time> <span>•</span> <span>Время чтения: ${escape_html(article?.readingTime)}</span></div> <h1 class="mt-4 text-3xl font-medium tracking-tight text-[var(--color-ink)] sm:text-4xl">${escape_html(article?.h1 || article?.title)}</h1> `);
		if (article?.excerpt) $$renderer.push(`<!--[0--><p class="mt-3 text-base text-[var(--color-ink-2)] leading-relaxed">${escape_html(article.excerpt)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (article?.tags && article.tags.length > 0) {
			$$renderer.push(`<!--[0--><div class="mt-4 flex flex-wrap gap-1.5"><!--[-->`);
			const each_array_1 = ensure_array_like(article.tags);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let tag = each_array_1[$$index_1];
				$$renderer.push(`<a${attr("href", `${stringify("")}/stati/?tag=${stringify(encodeURIComponent(tag))}`)} rel="nofollow" class="rounded bg-[var(--color-paper-2)] px-2 py-0.5 font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors">#${escape_html(tag)}</a>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></header> <div class="my-6 rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 text-xs leading-relaxed text-[var(--color-ink-2)]"><b class="text-[var(--color-accent)]">Базовые ставки нормо-часа МеталлПром39:</b> Токарные работы с ЧПУ — от 2 500 ₽/н-час; 3-осевые фрезерные центры — от 3 000 ₽/н-час; зуборезные и шлифовальные операции — от 3 500 ₽/н-час (все ставки включают НДС 22%). Минимальный заказ на запуск — от 5 000 ₽. При заказе серий от 10 шт. себестоимость единицы продукции снижается на 60–75% благодаря распределению постоянных затрат на разработку УП и наладку.</div> <div class="prose prose-invert mt-8 max-w-none text-sm leading-relaxed text-[var(--color-ink-2)]">${html(article?.html)}</div> `);
		if (article?.relatedServices && article.relatedServices.length > 0) {
			$$renderer.push(`<!--[0--><div class="mt-12 rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6"><h3 class="text-base font-semibold text-[var(--color-ink)]">Связанные производственные услуги</h3> <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"><!--[-->`);
			const each_array_2 = ensure_array_like(article.relatedServices);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let service = each_array_2[$$index_2];
				$$renderer.push(`<a${attr("href", `${stringify("")}/${stringify(service.slug)}/`)} class="flex items-center justify-between rounded border border-[var(--color-rule)] p-3 text-xs text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"><span>${escape_html(service.title)}</span> <span class="text-[var(--color-accent)]">→</span></a>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (relatedArticles && relatedArticles.length > 0) {
			$$renderer.push(`<!--[0--><aside class="mt-12 border-t border-[var(--color-rule)] pt-8"><h3 class="text-sm font-mono uppercase tracking-wider text-[var(--color-muted)]">Рекомендуемые материалы</h3> <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"><!--[-->`);
			const each_array_3 = ensure_array_like(relatedArticles);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let related = each_array_3[$$index_3];
				$$renderer.push(`<a${attr("href", `${stringify("")}/stati/${stringify(related.slug)}/`)} class="group rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 transition-colors hover:border-[var(--color-rule-2)]"><span class="text-[10px] font-mono uppercase text-[var(--color-accent)]">${escape_html(related.category)}</span> <h4 class="mt-1 text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">${escape_html(related.title)}</h4> <p class="mt-2 text-xs text-[var(--color-muted)] line-clamp-2">${escape_html(related.excerpt)}</p></a>`);
			}
			$$renderer.push(`<!--]--></div></aside>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></article></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map