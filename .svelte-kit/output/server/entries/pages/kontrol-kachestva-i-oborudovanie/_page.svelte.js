import { t as WORKSHOP_SPECS } from "../../../chunks/workshop-specs.js";
import { n as siteConfig } from "../../../chunks/paths.js";
import { a as head, f as escape_html, i as ensure_array_like } from "../../../chunks/server.js";
import { t as Breadcrumbs } from "../../../chunks/Breadcrumbs.js";
// src/routes/kontrol-kachestva-i-oborudovanie/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const breadcrumbs = [{
			name: "Контроль качества и оборудование",
			path: "/kontrol-kachestva-i-oborudovanie/"
		}];
		const metrology = [
			{
				name: "Цифровой микрометр гладкий прецизионный (0–25 мм, дискретность 0.001 мм)",
				range: "0 – 25 мм / 25 – 50 мм",
				accuracy: "Дискретность 0.001 мм, погрешность ±1 мкм"
			},
			{
				name: "Индикатор часового типа с магнитной стойкой",
				range: "0 – 10 мм",
				accuracy: "Цена деления 0.001 мм, контроль радиального биения"
			},
			{
				name: "Портативный контактный профилометр шероховатости",
				range: "Ra 0.05 – 40 мкм, Rz 0.1 – 160 мкм",
				accuracy: "Алмазный щуп 2 мкм, стандарты ISO 1997 / ГОСТ 2789-73"
			},
			{
				name: "Электронный нутромер трехточечный цифровой с шагом 0.001 мм",
				range: "⌀12 – 100 мм",
				accuracy: "Погрешность ±0.002 мм, замер глубоких глухих отверстий"
			},
			{
				name: "Калибры гладкие проходные/непроходные (ПР-НЕ)",
				range: "Ряды квалитетов H7, H8, h7, f7",
				accuracy: "Поверка ВНИИМС, калибровка"
			},
			{
				name: "Калибры резьбовые метрические и трубные (М, G)",
				range: "М3 – М48, шаг 0.5 – 3.0 мм, резьбы G1/8\" – G2\"",
				accuracy: "Класс точности 6g / 6H по ГОСТ 16093-2004"
			}
		];
		const machines = WORKSHOP_SPECS.machines;
		head("mqoxd5", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Контроль качества (ОТК) и станочный парк ЧПУ | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description" content="Лаборатория ОТК, поверенные средства измерений, протокол контроля. Станочный парк MetalProm39 в Калининграде: 2 обрабатывающих центра с ЧПУ (токарный и 3-осевой фрезерный)."/>`);
		});
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> <header class="border-b border-[var(--color-rule)] pb-8"><div class="flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[var(--color-muted)]"><span class="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span> ОТК и оборудование · Калининград</div> <h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">Лаборатория ОТК и станочный парк цеха</h1> <p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">Многоступенчатый контроль качества: входная проверка сырья, протокол FAI и протокол контроля параметров на каждую партию. Станочный парк включает ${escape_html(WORKSHOP_SPECS.machineCentersCount)} обрабатывающих центра с ЧПУ.</p></header> <section class="mt-10" aria-labelledby="qc-stages-heading"><h2 id="qc-stages-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">Трехэтапный протокол контроля качества</h2> <div class="mt-6 grid grid-cols-1 gap-6 text-xs leading-relaxed md:grid-cols-3"><div class="well"><div class="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-xs text-[var(--color-ink)]">1</div> <h3 class="mt-3 text-sm font-normal text-[var(--color-ink)]">Входной контроль сырья</h3> <p class="mt-2 text-[var(--color-muted)]">100% заготовок проверяются на соответствие сертификатам заводов-изготовителей. Визуальный осмотр на отсутствие внутренних раковин, расслоений и трещин.</p></div> <div class="well"><div class="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-xs text-[var(--color-ink)]">2</div> <h3 class="mt-3 text-sm font-normal text-[var(--color-ink)]">First Article Inspection (FAI)</h3> <p class="mt-2 text-[var(--color-muted)]">Перед запуском серийной партии станок останавливается после изготовления первой детали. Инженер ОТК проводит полный обмер по чертежу и подписывает лист FAI.</p></div> <div class="well"><div class="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-xs text-[var(--color-ink)]">3</div> <h3 class="mt-3 text-sm font-normal text-[var(--color-ink)]">Выходной контроль ОТК</h3> <p class="mt-2 text-[var(--color-muted)]">Сплошной замер критических баз и выборочный контроль готовой партии деталей. Консервация деталей в ингибированную бумагу для защиты от влажности.</p></div></div></section> <section class="mt-14" aria-labelledby="metrology-heading"><h2 id="metrology-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">Лаборатория измерительного инструмента и метрологии</h2> <div class="mt-4 overflow-x-auto"><table class="v-table"><thead><tr><th>Наименование прибора</th><th>Диапазон измерений</th><th>Погрешность / Характеристики</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(metrology);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<tr><td class="font-normal text-[var(--color-ink)]">${escape_html(item.name)}</td><td class="num text-[var(--color-ink)]">${escape_html(item.range)}</td><td class="text-[var(--color-muted)]">${escape_html(item.accuracy)}</td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></section> <section class="mt-14" aria-labelledby="machine-park-heading"><div class="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-rule)] pb-3"><h2 id="machine-park-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">Станочный парк производственного цеха</h2> <span class="font-mono text-xs text-[var(--color-accent)]">${escape_html(WORKSHOP_SPECS.machineCentersDescription)}</span></div> <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2"><!--[-->`);
		const each_array_1 = ensure_array_like(machines);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let machine = each_array_1[$$index_1];
			$$renderer.push(`<div class="well"><div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-2"><span class="text-xs text-[var(--color-muted)]">${escape_html(machine.cncSystem)}</span> <span class="num text-[11px] text-[var(--color-accent)]">${escape_html(machine.precision)}</span></div> <h3 class="mt-2 text-sm font-normal text-[var(--color-ink)]">${escape_html(machine.name)}</h3> <p class="num mt-2 text-xs text-[var(--color-ink-2)]">${escape_html(machine.workingZone)}</p> <p class="mt-1 text-xs text-[var(--color-muted)]">${escape_html(machine.features)}</p></div>`);
		}
		$$renderer.push(`<!--]--></div></section> <section class="well mt-14"><h2 class="text-sm font-normal text-[var(--color-ink)]">Документальное сопровождение для юридических и физических лиц:</h2> <ul class="mt-3 grid grid-cols-1 gap-2 text-xs text-[var(--color-muted)] sm:grid-cols-2"><li class="flex items-center gap-2"><span class="live-dot" aria-hidden="true"></span> <span>Договор поставки металлоизделий с фиксированной ценой</span></li> <li class="flex items-center gap-2"><span class="live-dot" aria-hidden="true"></span> <span>Универсальный передаточный документ (УПД с НДС 22%) / чек</span></li> <li class="flex items-center gap-2"><span class="live-dot" aria-hidden="true"></span> <span>Контрольный протокол ОТК с фактическими замерами</span></li> <li class="flex items-center gap-2"><span class="live-dot" aria-hidden="true"></span> <span>Копии заводских сертификатов на металл (ГОСТ)</span></li></ul></section></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map