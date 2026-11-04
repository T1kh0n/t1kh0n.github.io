import { n as siteConfig, t as base } from "../../../chunks/paths.js";
import { a as head, f as escape_html, i as ensure_array_like, s as stringify, u as attr } from "../../../chunks/server.js";
import { t as Breadcrumbs } from "../../../chunks/Breadcrumbs.js";
import { t as getAllArticles } from "../../../chunks/articles-loader.js";
// src/routes/stati/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const breadcrumbs = [{
			name: "База знаний",
			path: `${base}/stati/`
		}];
		const articles = getAllArticles();
		head("zula5a", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Инженерная база знаний и статьи по металлообработке с ЧПУ | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description" content="Технические статьи и руководства по выбору сталей, допускам IT7-IT12 по ГОСТ и DFM-оптимизации стоимости деталей для конструкторов и технологов от цеха MetalProm39."/>`);
		});
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> <header class="border-b border-[var(--color-rule)] pb-8"><h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">База знаний по металлообработке с ЧПУ</h1> <p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">Инженерные статьи и фундаментальные руководства технологов: выбор сталей, назначение допусков по ГОСТ и
				DFM-оптимизация себестоимости деталей на станках с ЧПУ.</p></header> <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
		const each_array = ensure_array_like(articles);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let article = each_array[$$index];
			$$renderer.push(`<article class="well flex flex-col justify-between transition-colors hover:border-[var(--color-rule-2)]"><div><div class="flex items-center justify-between text-xs text-[var(--color-muted)]"><span class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2 py-0.5">${escape_html(article.category)}</span> <span class="num text-[var(--color-muted)]">${escape_html(article.publishedDate)}</span></div> <h2 class="mt-4 text-base leading-snug font-normal text-[var(--color-ink)] hover:text-white"><a${attr("href", `${stringify(base)}/stati/${stringify(article.slug)}/`)}>${escape_html(article.title)}</a></h2> <p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">${escape_html(article.excerpt)}</p></div> <div class="mt-6 border-t border-[var(--color-rule)] pt-4 flex items-center justify-between"><a${attr("href", `${stringify(base)}/stati/${stringify(article.slug)}/`)} class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-ink)]">Читать инженерный разбор →</a> <span class="text-[11px] text-[var(--color-accent)] font-mono">MetalProm39</span></div></article>`);
		}
		$$renderer.push(`<!--]--></div></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map