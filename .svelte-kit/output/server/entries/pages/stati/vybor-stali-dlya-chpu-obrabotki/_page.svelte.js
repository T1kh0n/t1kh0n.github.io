import { n as siteConfig, t as base } from "../../../../chunks/paths.js";
import { a as head, c as html, f as escape_html, s as stringify, u as attr } from "../../../../chunks/server.js";
import { t as Breadcrumbs } from "../../../../chunks/Breadcrumbs.js";
import { n as getArticleBySlug } from "../../../../chunks/articles-loader.js";
// src/routes/stati/vybor-stali-dlya-chpu-obrabotki/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const slug = "vybor-stali-dlya-chpu-obrabotki";
		const article = getArticleBySlug(slug);
		const breadcrumbs = [{
			name: "База знаний",
			path: `${base}/stati/`
		}, {
			name: "Выбор сталей для ЧПУ",
			path: `${base}/stati/${slug}/`
		}];
		head("11bvdbd", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(article?.seoTitle || article?.title)} | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", article?.seoDescription || article?.excerpt)}/>`);
		});
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> `);
		if (article) $$renderer.push(`<!--[0--><article class="mx-auto max-w-4xl"><header class="border-b border-[var(--color-rule)] pb-8"><div class="flex items-center gap-3 text-xs text-[var(--color-muted)]"><span class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2 py-0.5 text-[var(--color-ink-2)]">${escape_html(article.category)}</span> <span>Опубликовано: ${escape_html(article.publishedDate)}</span> <span class="text-[var(--color-accent)] font-mono">${escape_html(article.author)}</span></div> <h1 class="mt-4 text-2xl text-[var(--color-ink)] sm:text-3xl lg:text-4xl">${escape_html(article.h1 || article.title)}</h1> <p class="lead mt-4 text-sm leading-relaxed sm:text-base">${escape_html(article.excerpt)}</p></header> <div class="mt-8 article-prose">${html(article.html)}</div> <div class="mt-12 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 text-center sm:p-8"><h2 class="text-lg font-normal text-[var(--color-ink)] sm:text-xl">Нужен расчет стоимости партии из выбранной стали?</h2> <p class="mt-2 text-xs text-[var(--color-muted)]">Используйте наш онлайн-калькулятор с учетом точных коэффициентов обрабатываемости материалов.</p> <div class="mt-6 flex flex-wrap justify-center gap-4"><a${attr("href", `${stringify(base)}/kalkulyator-stoimosti-chpu/`)} class="btn btn--sm">Перейти в калькулятор ЧПУ</a> <a${attr("href", `${stringify(base)}/stati/`)} class="btn btn--sm btn--line">Все статьи базы знаний</a></div></div></article>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map