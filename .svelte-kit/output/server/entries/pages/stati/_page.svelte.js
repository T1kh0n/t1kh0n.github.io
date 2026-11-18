import { t as siteConfig } from "../../../chunks/site.js";
import { a as head, c as html, f as escape_html, i as ensure_array_like, r as derived, s as stringify, t as attr_class, u as attr } from "../../../chunks/server.js";
import "../../../chunks/index-server.js";
import { l as serializeSchema, t as createBreadcrumbSchema } from "../../../chunks/schema.js";
import { t as Breadcrumbs } from "../../../chunks/Breadcrumbs.js";
import { n as getAllTags, t as getAllArticles } from "../../../chunks/articles-loader.js";
// src/routes/stati/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const breadcrumbs = [{
			name: "База знаний",
			path: `/stati/`
		}];
		const articles = getAllArticles();
		const tags = getAllTags();
		let selectedTag = null;
		const filteredArticles = derived(() => articles);
		const breadcrumbSchema = createBreadcrumbSchema(breadcrumbs);
		head("zula5a", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Инженерная база знаний и статьи по металлообработке с ЧПУ | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description" content="Технические статьи и руководства по выбору сталей, допускам IT7-IT12 по ГОСТ и DFM-оптимизации стоимости деталей для конструкторов и технологов от цеха МеталлПром39 в Калининграде."/> <link rel="canonical"${attr("href", `${stringify(siteConfig.siteDomain)}/stati/`)}/> <meta property="og:type" content="website"/> <meta property="og:title"${attr("content", `Инженерная база знаний по металлообработке с ЧПУ | ${stringify(siteConfig.brandName)}`)}/> <meta property="og:description" content="Технические статьи и руководства по выбору сталей, допускам IT7-IT12 по ГОСТ и DFM-оптимизации стоимости деталей."/> ${html(serializeSchema(breadcrumbSchema))}`);
		});
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> <header class="border-b border-[var(--color-rule)] pb-8"><div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)]"><span>Технологическая документация</span> <span>/</span> <span>ГОСТ и стандарты</span></div> <h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">База знаний по металлообработке с ЧПУ</h1> <p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">Инженерные статьи и фундаментальные руководства технологов: выбор сталей, назначение допусков по ГОСТ и
				DFM-оптимизация себестоимости деталей на станках с ЧПУ.</p> `);
		if (tags.length > 0) {
			$$renderer.push(`<!--[0--><div class="mt-6 flex flex-wrap items-center gap-2 pt-2"><span class="text-xs text-[var(--color-muted)] mr-1">Темы:</span> <button type="button"${attr_class(`rounded-sm border px-2.5 py-1 text-xs transition-colors border-[var(--color-accent)] bg-[var(--color-accent)] font-medium text-black`)}>Все материалы (${escape_html(articles.length)})</button> <!--[-->`);
			const each_array = ensure_array_like(tags);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let item = each_array[$$index];
				$$renderer.push(`<button type="button"${attr_class(`rounded-sm border px-2.5 py-1 text-xs transition-colors ${selectedTag === item.tag ? "border-[var(--color-accent)] bg-[var(--color-accent)] font-medium text-black" : "border-[var(--color-rule-2)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)]"}`)}>#${escape_html(item.tag)} <span class="opacity-60 text-[10px]">(${escape_html(item.count)})</span></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></header> <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
		const each_array_1 = ensure_array_like(filteredArticles());
		for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
			let article = each_array_1[$$index_2];
			$$renderer.push(`<article class="well flex flex-col justify-between transition-colors hover:border-[var(--color-rule-2)]"><div><div class="flex items-center justify-between text-xs text-[var(--color-muted)]"><span class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2 py-0.5 text-[var(--color-ink-2)]">${escape_html(article.category)}</span> <span class="num text-[var(--color-muted)]">${escape_html(article.publishedDate)}</span></div> <h2 class="mt-4 text-base leading-snug font-normal text-[var(--color-ink)] hover:text-white"><a${attr("href", `${stringify("")}/stati/${stringify(article.slug)}/`)}>${escape_html(article.title)}</a></h2> <p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">${escape_html(article.excerpt)}</p> `);
			if (article.tags && article.tags.length > 0) {
				$$renderer.push(`<!--[0--><div class="mt-4 flex flex-wrap gap-1.5"><!--[-->`);
				const each_array_2 = ensure_array_like(article.tags.slice(0, 3));
				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
					let tag = each_array_2[$$index_1];
					$$renderer.push(`<span class="text-[11px] text-[var(--color-muted)] font-mono">#${escape_html(tag)}</span>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="mt-6 border-t border-[var(--color-rule)] pt-4 flex items-center justify-between"><a${attr("href", `${stringify("")}/stati/${stringify(article.slug)}/`)} class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-ink)] flex items-center gap-1"><span>Читать разбор</span> <span>→</span></a> <span class="text-[11px] text-[var(--color-accent)] font-mono">${escape_html(article.readingTime || "5 мин")}</span></div></article>`);
		}
		$$renderer.push(`<!--]--></div> `);
		if (filteredArticles().length === 0) $$renderer.push(`<!--[0--><div class="mt-12 text-center text-sm text-[var(--color-muted)] py-12 border border-dashed border-[var(--color-rule)] rounded-[var(--radius-card)]">По выбранному тегу #${escape_html(selectedTag)} статей не найдено. <button type="button" class="ml-2 underline text-[var(--color-accent)]">Показать все статьи</button></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map