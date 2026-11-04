import { n as siteConfig, t as base } from "../../../chunks/paths.js";
import { a as head, f as escape_html, s as stringify, u as attr } from "../../../chunks/server.js";
import { t as CostCalculator } from "../../../chunks/CostCalculator.js";
import { t as Breadcrumbs } from "../../../chunks/Breadcrumbs.js";
// src/routes/kalkulyator-stoimosti-chpu/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const breadcrumbs = [{
			name: "Калькулятор стоимости ЧПУ",
			path: "/kalkulyator-stoimosti-chpu/"
		}];
		head("2rmk6l", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Инженерный калькулятор стоимости ЧПУ онлайн | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description" content="Мгновенный расчет себестоимости токарной и фрезерной ЧПУ обработки в Калининграде. Загрузка 3D-моделей STEP/CAD, выбор сталей и цветмета, расчет партий от 1 шт. НДС 22%."/>`);
		});
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> <header class="mb-10 border-b border-[var(--color-rule)] pb-8"><h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">Инженерный калькулятор стоимости ЧПУ</h1> <p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">Расчет себестоимости токарных и фрезерных деталей по нормо-часам. Загружайте 3D-модели STEP для мгновенной оценки стоимости партии.</p></header> <section aria-label="Интерактивный расчет ЧПУ">`);
		CostCalculator($$renderer, { showTitle: false });
		$$renderer.push(`<!----></section> <section class="mt-16 border-t border-[var(--color-rule)] pt-12" aria-labelledby="methodology-heading"><h2 id="methodology-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">Методика ценообразования и экономика производства</h2> <div class="mt-6 grid grid-cols-1 gap-8 text-xs leading-relaxed text-[var(--color-muted)] lg:grid-cols-2"><div class="space-y-4"><h3 class="text-sm font-normal text-[var(--color-ink)]">1. Базовые ставки нормо-часа оборудования</h3> <p class="max-w-2xl">В отличие от случайных расценок, наш цех использует прозрачную систему нормо-часов,
						откалиброванную по региональному рынку Калининградской области:</p> <ul class="space-y-2 border-t border-[var(--color-rule)] pt-3 text-[var(--color-ink-2)]"><li class="flex justify-between"><span>Токарная ЧПУ обработка:</span> <strong class="num font-normal text-[var(--color-ink)]">2 500<span class="u"> ₽/ч</span></strong></li> <li class="flex justify-between"><span>Фрезерная 3-осевая ЧПУ обработка:</span> <strong class="num font-normal text-[var(--color-ink)]">3 000<span class="u"> ₽/ч</span></strong></li> <li class="flex justify-between"><span>Инженерная подготовка и CAM-программирование:</span> <strong class="num font-normal text-[var(--color-ink)]">2 000<span class="u"> ₽/ч</span></strong></li></ul> <p class="text-[11px] text-[var(--color-muted)]">Все ставки включают работу оператора станка 5–6 разряда, амортизацию оборудования, СОЖ
						и стандартный инструмент.</p></div> <div class="space-y-4"><h3 class="text-sm font-normal text-[var(--color-ink)]">2. Порог минимального заказа (5 000 ₽) и скидки</h3> <p class="max-w-2xl">Базовый порог заказа зафиксирован на уровне <span class="num font-normal text-[var(--color-ink)]">5 000<span class="u"> ₽</span></span>. Это обусловлено издержками на запуск даже одной детали:</p> <ul class="list-inside list-disc space-y-1.5 text-[var(--color-ink-2)]"><li>Разработка управляющей программы (УП) в CAM-системе;</li> <li>Установка и выкатка технологической оснастки;</li> <li>Привязка инструмента с помощью щупов;</li> <li>Контроль первой детали в лаборатории ОТК.</li></ul> <p class="text-[11px] text-[var(--color-muted)]">При увеличении размера партии постоянные затраты на наладку распределяются на все
						изделия: серийные скидки от 10% (от 10 шт.) до 25% (от 100 шт.).</p></div></div></section> <section class="well mt-12"><h2 class="text-sm font-normal text-[var(--color-ink)]">Сырьевые материалы: цеховой склад и давальческий металл</h2> <p class="mt-2 max-w-3xl text-xs leading-relaxed text-[var(--color-muted)]">Мы поддерживаем оперативный складской запас сертифицированного сортового проката (Ст45, 40Х,
				Д16Т, 12Х18Н10Т, БрАЖ9-4, Капролон). Если ваше предприятие располагает собственным металлом,
				выберите опцию «Материал заказчика (давальческий)» — стоимость металла исключается из сметы.</p></section> <section id="order-form" class="mt-12 border-t border-[var(--color-rule)] pt-12 pb-6 text-center"><h2 class="text-lg text-[var(--color-ink)] sm:text-xl">Статус производственного цикла</h2> <p class="lead mx-auto mt-2 max-w-2xl text-xs sm:text-sm">Все токарные и фрезерные центры ЧПУ цеха загружены утвержденными серийными заказами на 100%. Вы можете сформировать и сохранить текстовую смету расчета для предварительного планирования бюджета.</p> <div class="mt-6 flex flex-wrap items-center justify-center gap-3"><a${attr("href", `${stringify(base)}/kontakty/`)} class="btn btn--sm btn--line"><span>График загрузки оборудования</span></a></div></section></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map