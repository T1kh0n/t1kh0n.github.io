import { t as base } from "./paths.js";
import { a as head, c as html, f as escape_html, i as ensure_array_like, r as derived, u as attr } from "./server.js";
import { o as serializeSchema, t as createBreadcrumbSchema } from "./schema.js";
// src/lib/components/Breadcrumbs.svelte
function Breadcrumbs($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items } = $$props;
		let fullItems = derived(() => [{
			name: "Главная",
			path: `/metal-prom-web`
		}, ...items]);
		let schemaObj = derived(() => createBreadcrumbSchema(fullItems()));
		head("1jovwxm", $$renderer, ($$renderer) => {
			$$renderer.push(`${html(serializeSchema(schemaObj()))}`);
		});
		$$renderer.push(`<nav aria-label="Хлебные крошки" class="mb-6"><ol class="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]"><!--[-->`);
		const each_array = ensure_array_like(fullItems());
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let item = each_array[index];
			if (index > 0) $$renderer.push(`<!--[0--><li class="text-[var(--color-rule-2)] select-none" aria-hidden="true">→</li>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <li>`);
			if (index === fullItems().length - 1) $$renderer.push(`<!--[0--><span class="font-normal text-[var(--color-ink)]" aria-current="page">${escape_html(item.name)}</span>`);
			else $$renderer.push(`<!--[-1--><a${attr("href", item.path.startsWith("http") || item.path.startsWith("/metal-prom-web") ? item.path : `${base}${item.path}`)} class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">${escape_html(item.name)}</a>`);
			$$renderer.push(`<!--]--></li>`);
		}
		$$renderer.push(`<!--]--></ol></nav>`);
	});
}
export { Breadcrumbs as t };

//# sourceMappingURL=Breadcrumbs.js.map