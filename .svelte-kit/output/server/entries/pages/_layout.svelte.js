import { n as siteConfig, t as base } from "../../chunks/paths.js";
import { a as head, c as html, f as escape_html, i as ensure_array_like, s as stringify, t as attr_class, u as attr } from "../../chunks/server.js";
import "../../chunks/index-server.js";
import { i as createOrganizationSchema, o as serializeSchema, r as createLocalBusinessSchema } from "../../chunks/schema.js";
// src/lib/assets/favicon.svg
var favicon_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2036%2036'%20fill='none'%3e%3crect%20width='36'%20height='36'%20rx='6'%20fill='%230b0f14'/%3e%3c!--%20Dial%20Calibrated%20Outer%20Ring%20with%20Precision%20Ticks%20--%3e%3ccircle%20cx='18'%20cy='18'%20r='15.5'%20stroke='%23b5f542'%20stroke-width='1'%20stroke-dasharray='2%202'%20stroke-opacity='0.6'/%3e%3ccircle%20cx='18'%20cy='18'%20r='12'%20stroke='%23ffffff'%20stroke-width='0.75'%20stroke-opacity='0.4'/%3e%3c!--%20Cardinal%20Coordinate%20Center%20Crosshairs%20--%3e%3cline%20x1='18'%20y1='2'%20x2='18'%20y2='7'%20stroke='%23b5f542'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3cline%20x1='18'%20y1='29'%20x2='18'%20y2='34'%20stroke='%23b5f542'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3cline%20x1='2'%20y1='18'%20x2='7'%20y2='18'%20stroke='%23b5f542'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3cline%20x1='29'%20y1='18'%20x2='34'%20y2='18'%20stroke='%23b5f542'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3c!--%20Central%204-Flute%20CNC%20Endmill%20/%20Lathe%20Cutter%20Geometry%20--%3e%3cpath%20d='M18%209L21.5%2014.5L27%2018L21.5%2021.5L18%2027L14.5%2021.5L9%2018L14.5%2014.5L18%209Z'%20fill='%23b5f542'%20fill-opacity='0.25'%20stroke='%23b5f542'%20stroke-width='1.2'%20stroke-linejoin='round'%20/%3e%3c!--%20Center%20Spindle%20Center%20Point%20--%3e%3ccircle%20cx='18'%20cy='18'%20r='2.5'%20fill='%23ffffff'/%3e%3ccircle%20cx='18'%20cy='18'%20r='1'%20fill='%230b0f14'/%3e%3c/svg%3e";
// src/lib/components/BrandLogo.svelte
function BrandLogo($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { size = "md", showTagline = true } = $$props;
		$$renderer.push(`<div class="flex items-center gap-2.5 sm:gap-3 select-none"><div${attr_class("relative flex shrink-0 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] p-1 text-[var(--color-accent)] shadow-sm transition-transform hover:scale-105", void 0, {
			"h-8": size === "sm",
			"w-8": size === "sm",
			"h-9": size === "md",
			"w-9": size === "md",
			"h-11": size === "lg",
			"w-11": size === "lg"
		})}><svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full" aria-hidden="true"><circle cx="18" cy="18" r="15.5" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" class="opacity-60"></circle><circle cx="18" cy="18" r="12" stroke="var(--color-ink)" stroke-width="0.75" class="opacity-40"></circle><line x1="18" y1="2" x2="18" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line><line x1="18" y1="29" x2="18" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line><line x1="2" y1="18" x2="7" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line><line x1="29" y1="18" x2="34" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line><path d="M18 9L21.5 14.5L27 18L21.5 21.5L18 27L14.5 21.5L9 18L14.5 14.5L18 9Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><circle cx="18" cy="18" r="2.5" fill="var(--color-ink)"></circle><circle cx="18" cy="18" r="1" fill="var(--color-paper)"></circle></svg></div> <div class="min-w-0 flex flex-col justify-center"><div class="flex items-baseline gap-1.5 leading-none"><span${attr_class("font-light tracking-tight text-[var(--color-ink)]", void 0, {
			"text-base": size === "sm",
			"text-lg": size === "md",
			"text-xl": size === "lg"
		})}>${escape_html(siteConfig.brandName)}</span> <span class="rounded bg-[var(--color-accent)]/15 px-1 py-0.2 font-mono text-[10px] text-[var(--color-accent)]">ЧПУ</span></div> `);
		if (showTagline) $$renderer.push(`<!--[0--><div class="mt-1 hidden sm:block font-mono text-[9.5px] uppercase tracking-wider text-[var(--color-muted)]">Металлообработка · Калининград</div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
	});
}
// src/lib/a11y/accessibility-store.svelte.ts
var STORAGE_KEY = "metalprom39_a11y_settings";
var DEFAULT_SETTINGS = {
	isEnabled: false,
	fontSize: "large",
	colorScheme: "black_on_white",
	kerning: "normal",
	lineHeight: "relaxed",
	showImages: true
};
var AccessibilityManager = class {
	settings = { ...DEFAULT_SETTINGS };
	constructor() {
		if (typeof window !== "undefined") {
			this.loadSettings();
			this.applyToDocument();
		}
	}
	loadSettings() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				this.settings = {
					...DEFAULT_SETTINGS,
					...parsed
				};
			}
		} catch {}
	}
	saveSettings() {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
		} catch {}
		this.applyToDocument();
	}
	toggleEnabled() {
		this.settings.isEnabled = !this.settings.isEnabled;
		if (this.settings.isEnabled) this.settings.colorScheme = "black_on_white";
		this.saveSettings();
	}
	setFontSize(tier) {
		this.settings.fontSize = tier;
		this.saveSettings();
	}
	setColorScheme(scheme) {
		this.settings.colorScheme = scheme;
		this.saveSettings();
	}
	setKerning(tier) {
		this.settings.kerning = tier;
		this.saveSettings();
	}
	setLineHeight(tier) {
		this.settings.lineHeight = tier;
		this.saveSettings();
	}
	toggleImages() {
		this.settings.showImages = !this.settings.showImages;
		this.saveSettings();
	}
	resetDefaults() {
		this.settings = {
			...DEFAULT_SETTINGS,
			isEnabled: false
		};
		this.saveSettings();
	}
	applyToDocument() {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		root.classList.remove("a11y-active", "a11y-font-large", "a11y-font-huge", "a11y-scheme-bow", "a11y-scheme-wob", "a11y-scheme-boc", "a11y-kerning-medium", "a11y-kerning-large", "a11y-lh-relaxed", "a11y-lh-double", "a11y-hide-images");
		if (!this.settings.isEnabled) return;
		root.classList.add("a11y-active");
		if (this.settings.fontSize === "large") root.classList.add("a11y-font-large");
		if (this.settings.fontSize === "huge") root.classList.add("a11y-font-huge");
		if (this.settings.colorScheme === "black_on_white") root.classList.add("a11y-scheme-bow");
		if (this.settings.colorScheme === "white_on_black") root.classList.add("a11y-scheme-wob");
		if (this.settings.colorScheme === "blue_on_cyan") root.classList.add("a11y-scheme-boc");
		if (this.settings.kerning === "medium") root.classList.add("a11y-kerning-medium");
		if (this.settings.kerning === "large") root.classList.add("a11y-kerning-large");
		if (this.settings.lineHeight === "relaxed") root.classList.add("a11y-lh-relaxed");
		if (this.settings.lineHeight === "double") root.classList.add("a11y-lh-double");
		if (!this.settings.showImages) root.classList.add("a11y-hide-images");
	}
};
var a11y = new AccessibilityManager();
// src/lib/components/Header.svelte
function Header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let isMobileMenuOpen = false;
		const navLinks = [
			{
				name: "Токарная",
				href: `${base}/tokarnye-raboty-chpu/`
			},
			{
				name: "Фрезерная",
				href: `${base}/frezernye-raboty-chpu/`
			},
			{
				name: "Зуборезка",
				href: `${base}/zuboreznye-i-shlifovalnye-raboty/`
			},
			{
				name: "Калькулятор",
				href: `${base}/kalkulyator-stoimosti-chpu/`
			},
			{
				name: "Портфолио",
				href: `${base}/portfolio/`
			},
			{
				name: "ОТК и станки",
				href: `${base}/kontrol-kachestva-i-oborudovanie/`
			},
			{
				name: "Статьи",
				href: `${base}/stati/`
			}
		];
		$$renderer.push(`<header class="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur-md"><div class="mx-auto flex max-w-7xl items-center justify-between gap-1.5 px-3 py-2 sm:gap-4 sm:px-6 sm:py-2.5 lg:px-8"><a${attr("href", `${stringify(base)}/`)} class="group flex shrink-0 items-center"><span class="sm:hidden inline-flex">`);
		BrandLogo($$renderer, {
			size: "sm",
			showTagline: false
		});
		$$renderer.push(`<!----></span> <span class="hidden sm:inline-flex">`);
		BrandLogo($$renderer, { size: "md" });
		$$renderer.push(`<!----></span></a> <div class="flex items-center gap-1.5 sm:gap-3 lg:gap-5"><nav class="hidden items-center gap-3.5 lg:flex xl:gap-4" aria-label="Основная навигация"><!--[-->`);
		const each_array = ensure_array_like(navLinks);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let link = each_array[$$index];
			$$renderer.push(`<a${attr("href", link.href)} class="text-xs whitespace-nowrap text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]">${escape_html(link.name)}</a>`);
		}
		$$renderer.push(`<!--]--></nav> <button type="button" class="hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-white" aria-label="Включить версию для слабовидящих" title="Версия для слабовидящих (ГОСТ Р 52872-2019)"><svg class="h-4 w-4 text-[var(--color-accent)] a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> <span class="hidden md:inline text-[11px] font-normal">Слабовидящим</span></button> <a${attr("href", `${stringify(base)}/kalkulyator-stoimosti-chpu/`)} class="btn btn--sm btn--line !hidden shrink-0 xl:!inline-flex"><span>Калькулятор ЧПУ</span></a> <button type="button" class="flex sm:hidden h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-rule)] text-[var(--color-ink-2)] transition-colors hover:text-white" aria-label="Версия для слабовидящих" title="Версия для слабовидящих (ГОСТ Р 52872-2019)"><svg class="h-4.5 w-4.5 text-[var(--color-accent)] a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button> <button type="button" class="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-rule)] text-[var(--color-ink-2)] transition-colors hover:text-white lg:hidden"${attr("aria-expanded", isMobileMenuOpen)} aria-label="Переключить меню">`);
		$$renderer.push(`<!--[-1--><span class="text-base font-light">☰</span>`);
		$$renderer.push(`<!--]--></button></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></header>`);
	});
}
// src/lib/components/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
		$$renderer.push(`<footer class="border-t border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)]"><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"><div class="space-y-4"><a${attr("href", `${stringify(base)}/`)} class="inline-block">`);
		BrandLogo($$renderer, {
			size: "sm",
			showTagline: false
		});
		$$renderer.push(`<!----></a> <p class="text-xs leading-relaxed text-[var(--color-muted)]">Специализированный участок механообработки: 2 обрабатывающих центра с ЧПУ в Калининградской
					области. Изготовление деталей по чертежам заказчика для
					машиностроения, приборостроения и промышленного оборудования. Доставка готовых изделий по всей Калининградской области.</p> <div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3 text-xs"><div class="font-normal text-[var(--color-ink)]">Режим работы производства:</div> <div class="mt-1 font-mono text-[var(--color-muted)]">Пн–Пт: 08:00 – 20:00 (2 смены)</div> <div class="font-mono text-[var(--color-muted)]">Сб: 09:00 – 16:00 (дежурный технолог)</div></div></div> <div><h3 class="text-xs font-normal text-[var(--color-ink)]">Услуги механообработки</h3> <ul class="mt-4 space-y-2.5 text-xs"><li><a${attr("href", `${stringify(base)}/tokarnye-raboty-chpu/`)} class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]">Токарные работы с ЧПУ (до ⌀200 мм)</a></li> <li><a${attr("href", `${stringify(base)}/frezernye-raboty-chpu/`)} class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]">Фрезерная ЧПУ обработка (3 оси)</a></li> <li><a${attr("href", `${stringify(base)}/zuboreznye-i-shlifovalnye-raboty/`)} class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]">Зубонарезные работы</a></li> <li><a${attr("href", `${stringify(base)}/kalkulyator-stoimosti-chpu/`)} class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]">Онлайн-калькулятор стоимости</a></li></ul></div> <div><h3 class="text-xs font-normal text-[var(--color-ink)]">Инженерия и стандарты</h3> <ul class="mt-4 space-y-2.5 text-xs"><li><a${attr("href", `${stringify(base)}/kontrol-kachestva-i-oborudovanie/`)} class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]">Контроль ОТК и станочный парк (2 центра)</a></li> <li><a${attr("href", `${stringify(base)}/portfolio/`)} class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]">Портфолио изготовленных деталей</a></li> <li><a${attr("href", `${stringify(base)}/stati/`)} class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]">Инженерная база знаний и статьи</a></li> <li><a${attr("href", `${stringify(base)}/stati/vybor-stali-dlya-chpu-obrabotki/`)} class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">Справочник сталей (Ст45, 40Х, Д16Т)</a></li> <li><a${attr("href", `${stringify(base)}/stati/kvalitety-tochnosti-i-sherohovatost-gost/`)} class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">Таблицы допусков IT7–IT12 и Ra</a></li> <li><a${attr("href", `${stringify(base)}/stati/optimizaciya-stoimosti-detaley-chpu/`)} class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">Правила снижения цены ЧПУ (DFM)</a></li></ul></div> <div><h3 class="text-xs font-normal text-[var(--color-ink)]">Расчет стоимости</h3> <div class="mt-4 space-y-3 text-xs"><p class="leading-relaxed text-[var(--color-muted)]">Используйте интерактивный калькулятор для оценки себестоимости и времени обработки по чертежам и 3D-моделям (STEP).</p> <a${attr("href", `${stringify(base)}/kalkulyator-stoimosti-chpu/`)} class="btn btn--sm btn--wide"><span>Открыть калькулятор</span></a> <div class="border-t border-[var(--color-rule)] pt-3 text-xs text-[var(--color-muted)]"><div>Безналичный расчет с НДС 22% / УСН</div> <div>Оплата для физических лиц</div></div></div></div></div> <div class="mt-10 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 text-xs leading-relaxed text-[var(--color-muted)]"><strong class="font-normal text-[var(--color-ink-2)]">Правовое уведомление (152-ФЗ и 149-ФЗ):</strong> Веб-сайт ${escape_html(siteConfig.brandName)} носит информационно-расчетный характер и не осуществляет сбор, систематизацию
			или хранение персональных данных пользователей. Расчеты онлайн-калькулятора носят предварительный технический характер.
			Статистика посещаемости собирается обезличенно с использованием файлов cookie сервиса Яндекс.Метрика.</div> <div class="mt-8 flex flex-col items-center justify-between border-t border-[var(--color-rule)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row"><div>© ${escape_html(currentYear)}
				${escape_html(siteConfig.brandName)}. 2 обрабатывающих центра с ЧПУ в Калининграде. Доставка по всей области.</div> <div class="mt-3 flex items-center gap-6 text-xs sm:mt-0"><a${attr("href", `${stringify(base)}/politika-konfidentsialnosti/`)} class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">Политика конфиденциальности</a> <a${attr("href", `${stringify(base)}/sitemap/`)} class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">Карта сайта</a></div></div></div></footer>`);
	});
}
// src/lib/components/CookieNotice.svelte
function CookieNotice($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
// src/lib/components/AccessibilityPanel.svelte
function AccessibilityPanel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		if (a11y.settings.isEnabled) $$renderer.push(`<!--[0--><aside class="sticky top-0 z-50 border-b-2 border-black bg-white text-black p-2 sm:p-3 text-xs shadow-md a11y-toolbar select-none" role="region" aria-label="Панель настройки доступности по ГОСТ Р 52872-2019"><div class="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 sm:gap-4"><div class="flex items-center gap-1.5 sm:gap-2"><span class="font-bold text-[11px] sm:text-xs">Шрифт:</span> <div class="flex items-center gap-0.5 sm:gap-1 border border-black p-0.5 rounded-xs"><button type="button"${attr_class(`px-2 py-1 font-bold transition-colors ${a11y.settings.fontSize === "normal" ? "bg-black text-white" : "hover:bg-gray-200"}`)} aria-label="Обычный размер шрифта" title="Обычный">А</button> <button type="button"${attr_class(`px-2 py-1 font-bold text-sm transition-colors ${a11y.settings.fontSize === "large" ? "bg-black text-white" : "hover:bg-gray-200"}`)} aria-label="Увеличенный размер шрифта" title="Увеличенный">А+</button> <button type="button"${attr_class(`px-2 py-1 font-bold text-base transition-colors ${a11y.settings.fontSize === "huge" ? "bg-black text-white" : "hover:bg-gray-200"}`)} aria-label="Максимальный размер шрифта" title="Максимальный">А++</button></div></div> <div class="flex items-center gap-1.5 sm:gap-2"><span class="font-bold text-[11px] sm:text-xs">Цвет:</span> <div class="flex items-center gap-1"><button type="button"${attr_class(`px-2 py-1 border border-black bg-white text-black font-bold transition-all ${a11y.settings.colorScheme === "black_on_white" ? "ring-2 ring-black font-extrabold" : "opacity-80 hover:opacity-100"}`)} title="Черным по белому">Ц1</button> <button type="button"${attr_class(`px-2 py-1 border border-black bg-black text-white font-bold transition-all ${a11y.settings.colorScheme === "white_on_black" ? "ring-2 ring-yellow-400 font-extrabold" : "opacity-80 hover:opacity-100"}`)} title="Белым по черному">Ц2</button> <button type="button"${attr_class(`px-2 py-1 border border-blue-900 bg-[#cbe6ff] text-[#002255] font-bold transition-all ${a11y.settings.colorScheme === "blue_on_cyan" ? "ring-2 ring-blue-900 font-extrabold" : "opacity-80 hover:opacity-100"}`)} title="Синим по голубому">Ц3</button></div></div> <div class="flex items-center gap-1.5 sm:gap-2"><span class="font-bold text-[11px] sm:text-xs">Кернинг:</span> <div class="flex items-center gap-0.5 sm:gap-1 border border-black p-0.5 rounded-xs"><button type="button"${attr_class(`px-1.5 sm:px-2 py-1 font-bold ${a11y.settings.kerning === "normal" ? "bg-black text-white" : "hover:bg-gray-200"}`)} title="Стандартный интервал">Станд.</button> <button type="button"${attr_class(`px-1.5 sm:px-2 py-1 font-bold ${a11y.settings.kerning === "medium" ? "bg-black text-white" : "hover:bg-gray-200"}`)} title="Средний интервал">Средн.</button> <button type="button"${attr_class(`px-1.5 sm:px-2 py-1 font-bold ${a11y.settings.kerning === "large" ? "bg-black text-white" : "hover:bg-gray-200"}`)} title="Большой интервал">Больш.</button></div></div> <div class="flex items-center gap-1.5 sm:gap-2"><span class="font-bold text-[11px] sm:text-xs">Интервал:</span> <div class="flex items-center gap-0.5 sm:gap-1 border border-black p-0.5 rounded-xs"><button type="button"${attr_class(`px-2 py-1 font-bold ${a11y.settings.lineHeight === "normal" ? "bg-black text-white" : "hover:bg-gray-200"}`)} title="Одинарный интервал">1.0</button> <button type="button"${attr_class(`px-2 py-1 font-bold ${a11y.settings.lineHeight === "relaxed" ? "bg-black text-white" : "hover:bg-gray-200"}`)} title="Полуторный интервал">1.5</button> <button type="button"${attr_class(`px-2 py-1 font-bold ${a11y.settings.lineHeight === "double" ? "bg-black text-white" : "hover:bg-gray-200"}`)} title="Двойной интервал">2.0</button></div></div> <div class="flex items-center gap-1.5 sm:gap-2"><button type="button"${attr_class(`border border-black px-2.5 py-1 font-bold transition-colors whitespace-nowrap ${a11y.settings.showImages ? "hover:bg-gray-200" : "bg-black text-white"}`)} title="Включить / отключить изображения на страницах">${escape_html(a11y.settings.showImages ? "Изображения: Вкл" : "Изображения: Выкл")}</button></div> <div class="flex items-center gap-1.5 sm:gap-2"><button type="button" class="border border-black px-2 py-1 font-bold hover:bg-gray-200" title="Сбросить все настройки">Сброс</button> <button type="button" class="border-2 border-black bg-black text-white px-2.5 sm:px-3 py-1 font-bold hover:bg-gray-800 whitespace-nowrap" title="Вернуться к стандартной версии сайта">✕ Обычная версия</button></div></div></aside>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
// src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		const orgSchema = createOrganizationSchema();
		const localBusinessSchema = createLocalBusinessSchema();
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.push(`<link rel="icon"${attr("href", favicon_default)}/> ${html(serializeSchema(orgSchema))} ${html(serializeSchema(localBusinessSchema))}`);
		});
		$$renderer.push(`<div class="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-ink)] antialiased selection:bg-[color-mix(in_oklab,var(--color-accent)_30%,transparent)]">`);
		AccessibilityPanel($$renderer, {});
		$$renderer.push(`<!----> `);
		Header($$renderer, {});
		$$renderer.push(`<!----> <div class="flex-1">`);
		children($$renderer);
		$$renderer.push(`<!----></div> `);
		Footer($$renderer, {});
		$$renderer.push(`<!----> `);
		CookieNotice($$renderer, {});
		$$renderer.push(`<!----></div>`);
	});
}
export { _layout as default };

//# sourceMappingURL=_layout.svelte.js.map