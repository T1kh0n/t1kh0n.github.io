import { t as siteConfig } from "../../../../chunks/site.js";
import { a as head, c as html, f as escape_html, i as ensure_array_like, s as stringify, u as attr } from "../../../../chunks/server.js";
import { l as serializeSchema, s as createTechArticleSchema, t as createBreadcrumbSchema } from "../../../../chunks/schema.js";
import { t as Breadcrumbs } from "../../../../chunks/Breadcrumbs.js";
import { i as getRelatedArticles, r as getArticleBySlug } from "../../../../chunks/articles-loader.js";
// src/routes/stati/izgotovlenie-valov-i-vtulok-chpu-po-chertezham/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const slug = "izgotovlenie-valov-i-vtulok-chpu-po-chertezham";
		const article = getArticleBySlug(slug);
		const relatedArticles = getRelatedArticles(slug, 2);
		const breadcrumbs = [{
			name: "База знаний",
			path: `/stati/`
		}, {
			name: "Изготовление валов и втулок на ЧПУ",
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
			dependencies: "ГОСТ 25346-2013, ГОСТ 3325-85, ГОСТ 4543-2016, ЕСКД"
		}) : null;
		head("hdkxq8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(article?.seoTitle || article?.title)} | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", article?.seoDescription || article?.excerpt)}/> <link rel="canonical"${attr("href", `${stringify(siteConfig.siteDomain)}/stati/izgotovlenie-valov-i-vtulok-chpu-po-chertezham/`)}/> <meta property="og:type" content="article"/> <meta property="og:title"${attr("content", article?.seoTitle || article?.title)}/> <meta property="og:description"${attr("content", article?.seoDescription || article?.excerpt)}/> <meta property="og:url"${attr("content", `${stringify(siteConfig.siteDomain)}/stati/izgotovlenie-valov-i-vtulok-chpu-po-chertezham/`)}/> <meta property="article:published_time"${attr("content", article?.publishedDate)}/> <meta property="article:section"${attr("content", article?.category)}/> `);
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
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> `);
		if (article) {
			$$renderer.push(`<!--[0--><article class="mx-auto max-w-4xl"><header class="border-b border-[var(--color-rule)] pb-8"><div class="flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]"><span class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2 py-0.5 text-[var(--color-ink-2)]">${escape_html(article.category)}</span> <span>Опубликовано: ${escape_html(article.publishedDate)}</span> <span class="text-[var(--color-accent)] font-mono">${escape_html(article.author)}</span> <span class="rounded bg-[var(--color-paper-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-ink-2)]">⏱ ${escape_html(article.readingTime || "8 мин")} чтения</span></div> <h1 class="mt-4 text-2xl text-[var(--color-ink)] sm:text-3xl lg:text-4xl">${escape_html(article.h1 || article.title)}</h1> <p class="lead mt-4 text-sm leading-relaxed sm:text-base">${escape_html(article.excerpt)}</p> `);
			if (article.tags && article.tags.length > 0) {
				$$renderer.push(`<!--[0--><div class="mt-6 flex flex-wrap gap-2 pt-2 border-t border-[var(--color-rule)]"><span class="text-xs text-[var(--color-muted)] self-center">Теги статьи:</span> <!--[-->`);
				const each_array_1 = ensure_array_like(article.tags);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let tag = each_array_1[$$index_1];
					$$renderer.push(`<a${attr("href", `${stringify("")}/stati/?tag=${stringify(encodeURIComponent(tag))}`)} class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2 py-0.5 text-xs text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]">#${escape_html(tag)}</a>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></header> <div class="mt-8 article-prose">${html(article.html)}</div> `);
			if (article.relatedServices && article.relatedServices.length > 0) {
				$$renderer.push(`<!--[0--><div class="mt-12 rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] p-6 sm:p-8"><div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)]"><span>Производственные услуги МеталлПром39</span></div> <h3 class="mt-2 text-lg font-normal text-[var(--color-ink)]">Токарная обработка валов и втулок с контролем ОТК</h3> <p class="mt-1 text-xs text-[var(--color-muted)]">Точение до ø 200 мм, длина до 750 мм, термообработка ТВЧ, шлифование шеек до Ra 0.8. Минимальный заказ от 5 000 ₽ с НДС 22%.</p> <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3"><!--[-->`);
				const each_array_2 = ensure_array_like(article.relatedServices);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let service = each_array_2[$$index_2];
					$$renderer.push(`<a${attr("href", `${stringify("")}/${stringify(service.slug)}/`)} class="flex flex-col justify-between rounded border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 text-xs transition-colors hover:border-[var(--color-accent)]"><span class="font-medium text-[var(--color-ink)]">${escape_html(service.title)}</span> <span class="mt-2 text-[11px] text-[var(--color-accent)]">→ Подробнее</span></a>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (relatedArticles.length > 0) {
				$$renderer.push(`<!--[0--><div class="mt-8 border-t border-[var(--color-rule)] pt-8"><h3 class="text-lg font-normal text-[var(--color-ink)]">Связанные технологические статьи</h3> <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"><!--[-->`);
				const each_array_3 = ensure_array_like(relatedArticles);
				for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
					let related = each_array_3[$$index_3];
					$$renderer.push(`<div class="well flex flex-col justify-between p-4"><div><span class="text-[10px] uppercase font-mono text-[var(--color-accent)]">${escape_html(related.category)}</span> <h4 class="mt-1 text-sm font-normal text-[var(--color-ink)]"><a${attr("href", `${stringify("")}/stati/${stringify(related.slug)}/`)} class="hover:underline">${escape_html(related.title)}</a></h4> <p class="mt-2 text-xs text-[var(--color-muted)] line-clamp-2">${escape_html(related.excerpt)}</p></div> <div class="mt-4 flex items-center justify-between text-xs border-t border-[var(--color-rule)] pt-2"><a${attr("href", `${stringify("")}/stati/${stringify(related.slug)}/`)} class="text-[var(--color-ink-2)] hover:text-white">Читать разбор →</a> <span class="text-[10px] text-[var(--color-muted)]">${escape_html(related.readingTime || "5 мин")}</span></div></div>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="mt-12 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 text-center sm:p-8"><h2 class="text-lg font-normal text-[var(--color-ink)] sm:text-xl">Требуется изготовление партии ступенчатых валов или втулок?</h2> <p class="mt-2 text-xs text-[var(--color-muted)]">Загрузите чертеж в PDF или 3D-модель в STEP для мгновенного инженерного расчета себестоимости партии с НДС 22%.</p> <div class="mt-6 flex flex-wrap justify-center gap-4"><a${attr("href", `${stringify("")}/kalkulyator-stoimosti-chpu/`)} class="btn btn--sm">Рассчитать партию в калькуляторе</a> <a${attr("href", `${stringify("")}/stati/`)} class="btn btn--sm btn--line">Все статьи базы знаний</a></div></div></article>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map