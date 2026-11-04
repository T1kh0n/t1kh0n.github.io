import { n as siteConfig, t as base } from "../../../chunks/paths.js";
import { n as getGroupedSitemap, t as SITEMAP_REGISTRY } from "../../../chunks/sitemap-registry.js";
import { a as head, f as escape_html, i as ensure_array_like, r as derived, s as stringify, t as attr_class, u as attr } from "../../../chunks/server.js";
import { t as Breadcrumbs } from "../../../chunks/Breadcrumbs.js";
// src/routes/sitemap/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const breadcrumbs = [{
			name: "Карта сайта",
			path: `${base}/sitemap/`
		}];
		const groupedSections = getGroupedSitemap();
		let searchFilter = "";
		derived(() => SITEMAP_REGISTRY.filter((item) => {
			if (!searchFilter.trim()) return true;
			const q = searchFilter.toLowerCase();
			return item.title.toLowerCase().includes(q) || item.url.toLowerCase().includes(q) || item.sourceFile.toLowerCase().includes(q) || item.reusableSpecs.some((s) => s.toLowerCase().includes(q));
		}));
		head("1tg7i78", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Карта сайта и реестр спецификаций AEO | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description" content="Карта сайта металлообрабатывающего цеха MetalProm39 в Калининграде: навигационный каталог страниц, реестр контента AEO и переиспользуемые параметры оборудования."/>`);
		});
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> <header class="border-b border-[var(--color-rule)] pb-8"><div class="flex flex-wrap items-center justify-between gap-4"><div><h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">Карта сайта и архитектура контента</h1> <p class="lead mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">Полный каталог производственных услуг, аналитических инструментов и реестр единого источника данных (Single Source of Truth) для поисковых систем и AI-агентов (AEO).</p></div> <div class="flex items-center gap-2"><a${attr("href", `${stringify(base)}/sitemap.xml`)} target="_blank" rel="noopener noreferrer" class="btn btn--sm btn--line shrink-0"><span>Открыть sitemap.xml</span></a></div></div> <div class="mt-8 flex flex-wrap gap-2 border-b border-[var(--color-rule)] pb-2" role="tablist"><button type="button"${attr_class(`rounded-sm px-3.5 py-1.5 text-xs font-normal transition-colors bg-[var(--color-paper-2)] text-[var(--color-accent)] border border-[var(--color-rule-2)]`)} role="tab"${attr("aria-selected", true)}>Навигация для клиентов</button> <button type="button"${attr_class(`rounded-sm px-3.5 py-1.5 text-xs font-normal transition-colors text-[var(--color-muted)] hover:text-[var(--color-ink)]`)} role="tab"${attr("aria-selected", false)}>Реестр для AI-агентов &amp; AEO (Single Source of Truth)</button></div></header> `);
		{
			$$renderer.push(`<!--[0--><div class="mt-10 space-y-12"><!--[-->`);
			const each_array = ensure_array_like(groupedSections);
			for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
				let section = each_array[$$index_1];
				$$renderer.push(`<section${attr("aria-labelledby", `section-${stringify(section.category)}`)}><h2${attr("id", `section-${stringify(section.category)}`)} class="border-b border-[var(--color-rule)] pb-3 text-lg font-normal text-[var(--color-ink)] sm:text-xl">${escape_html(section.title)}</h2> <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				const each_array_1 = ensure_array_like(section.items);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let item = each_array_1[$$index];
					$$renderer.push(`<a${attr("href", `${stringify(base)}${stringify(item.url)}`)} class="well flex flex-col justify-between transition-colors hover:border-[var(--color-rule-2)]"><div><h3 class="text-sm font-normal text-[var(--color-ink)]">${escape_html(item.title)}</h3> <p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">${escape_html(item.description)}</p></div> <div class="mt-4 flex items-center justify-between border-t border-[var(--color-rule)] pt-2 text-[11px] text-[var(--color-muted)]"><span class="num text-[var(--color-ink-2)]">${escape_html(item.url)}</span> <span class="text-[var(--color-accent)]">→</span></div></a>`);
				}
				$$renderer.push(`<!--]--></div></section>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map