import { n as siteConfig, t as base } from "../../../chunks/paths.js";
import { a as head, f as escape_html, i as ensure_array_like, s as stringify, u as attr } from "../../../chunks/server.js";
import { t as Breadcrumbs } from "../../../chunks/Breadcrumbs.js";
// src/routes/portfolio/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const breadcrumbs = [{
			name: "Портфолио деталей",
			path: "/portfolio/"
		}];
		const cases = [
			{
				title: "Вал приводной промежуточный с фланцем",
				clientSector: "Промышленное машиностроение (Калининград)",
				material: "Конструкционная сталь 40Х",
				dimensions: "Длина 620 мм, диаметр шейки ⌀85 мм, фланец ⌀160 мм",
				tolerances: "Квалитет IT7 по шейкам подшипников (допуск ±0.015 мм)",
				batch: "Партия 12 шт.",
				leadTime: "5 рабочих дней",
				operations: [
					"Черновое и чистовое точение на токарном центре с ЧПУ",
					"Фрезерование двух шпоночных пазов по ГОСТ 23360-78",
					"Чистовое точение посадочных шеек (Ra 1.25 мкм, IT7)",
					"Контроль радиального биения в центрах (не более 0.008 мм)"
				],
				description: "Ответственный вал передачи крутящего момента для промышленного редуктора генератора. Заказ выполнен в рамках планового ремонта оборудования предприятия."
			},
			{
				title: "Фланец гидрораспределителя высокого давления",
				clientSector: "Тяжелое машиностроение (г. Калининград)",
				material: "Конструкционная низколегированная сталь 09Г2С",
				dimensions: "240 × 180 × 45 мм",
				tolerances: "Квалитет IT7, отклонение от плоскостности не более 0.01 мм",
				batch: "Партия 25 шт.",
				leadTime: "6 рабочих дней",
				operations: [
					"Фрезерование контура и сопрягаемой плоскости на 3-осевом центре",
					"Сверление и развертывание 8 крепежных отверстий ⌀18H8",
					"Расточка центрального посадочного отверстия ⌀90H7",
					"Фрезерование кольцевой канавки под уплотнительное кольцо O-Ring"
				],
				description: "Плита гидравлического коллектора. Критическое требование — идеальная плоскостность сопрягаемой поверхности для исключения утечек масла при давлении до 320 бар."
			},
			{
				title: "Корпус прибора промышленной автоматики с оребрением",
				clientSector: "Приборостроение (г. Калининград)",
				material: "Авиационный алюминиевый сплав Д16Т (дюралюминий)",
				dimensions: "160 × 120 × 65 мм",
				tolerances: "Квалитет IT7, толщина стенки карманов 2.5 ± 0.1 мм",
				batch: "Партия 40 шт.",
				leadTime: "7 рабочих дней",
				operations: [
					"3D фрезерование глубокого кармана с толщиной стенки 2.5 мм",
					"Резьбонарезание глухих отверстий М3 и М4",
					"Фрезерование паза под герметизирующий шнур IP67",
					"Калибровка крепежных резьб и снятие микрозаусенцев"
				],
				description: "Легкосплавный корпус прибора с ребрами охлаждения. Обработка выполнена на 3-осевом вертикально-фрезерном центре монолитными фрезами для исключения коробления тонких стенок."
			},
			{
				title: "Шестерня привода зерноуборочного комбайна",
				clientSector: "Агропромышленный комплекс (Гурьевский район)",
				material: "Легированная сталь 40Х",
				dimensions: "Венец ⌀180 мм, ширина 45 мм, модуль m=4.0, число зубьев z=43",
				tolerances: "Степень точности 7-В по ГОСТ 1643-81",
				batch: "Партия 16 шт.",
				leadTime: "8 рабочих дней",
				operations: [
					"Токарная проточка заготовки венца на станке с ЧПУ",
					"Зубофрезерование червячной модульной фрезой",
					"Нарезка эвольвентного профиля зуба по ГОСТ",
					"Чистовая расточка отверстия под подшипник (IT7)"
				],
				description: "Срочное изготовление изношенного узла редуктора в период полевых работ. Изготовление произведено по предоставленному чертежу и образцу (реверс-инжиниринг)."
			}
		];
		head("1uo84gz", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Портфолио деталей и кейсы механообработки в Калининграде | ${escape_html(siteConfig.brandName)}</title>`);
			});
			$$renderer.push(`<meta name="description" content="Примеры изготовленных деталей с ЧПУ в Калининграде: приводные валы, гидравлические фланцы, алюминиевые корпуса, шестерни. Допуски до IT7, сроки, контроль ОТК."/>`);
		});
		$$renderer.push(`<main class="py-10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`);
		Breadcrumbs($$renderer, { items: breadcrumbs });
		$$renderer.push(`<!----> <header class="border-b border-[var(--color-rule)] pb-8"><h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">Портфолио серийных деталей с ЧПУ</h1> <p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">Примеры изготовленных деталей по чертежам заказчиков на 2 обрабатывающих центрах ЧПУ: приводные валы, гидравлические фланцы,
				корпуса приборов и шестерни со 100% контролем ОТК.</p></header> <div class="mt-10 space-y-12"><!--[-->`);
		const each_array = ensure_array_like(cases);
		for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
			let item = each_array[$$index_1];
			$$renderer.push(`<article class="border-b border-[var(--color-rule)] pb-10"><div class="flex flex-wrap items-center justify-between gap-2"><span class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2 py-0.5 text-xs text-[var(--color-muted)]">${escape_html(item.clientSector)}</span> <span class="num text-xs text-[var(--color-muted)]">Срок: ${escape_html(item.leadTime)}</span></div> <h2 class="mt-4 text-xl text-[var(--color-ink)] sm:text-2xl">${escape_html(item.title)}</h2> <p class="mt-2 max-w-2xl text-xs leading-relaxed text-[var(--color-ink-2)] sm:text-sm">${escape_html(item.description)}</p> <div class="mt-6 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2 lg:grid-cols-4"><div class="well"><div class="text-[var(--color-muted)]">Материал:</div> <div class="mt-1 font-normal text-[var(--color-ink)]">${escape_html(item.material)}</div></div> <div class="well"><div class="text-[var(--color-muted)]">Габариты детали:</div> <div class="num mt-1 font-normal text-[var(--color-ink)]">${escape_html(item.dimensions)}</div></div> <div class="well"><div class="text-[var(--color-muted)]">Точность / Квалитет:</div> <div class="num mt-1 font-normal text-[var(--color-ink)]">${escape_html(item.tolerances)}</div></div> <div class="well"><div class="text-[var(--color-muted)]">Объем партии:</div> <div class="num mt-1 font-normal text-[var(--color-ink)]">${escape_html(item.batch)}</div></div></div> <div class="mt-6 border-t border-[var(--color-rule)] pt-4"><div class="text-xs text-[var(--color-muted)]">Маршрут технологической обработки:</div> <div class="mt-2 flex flex-wrap gap-2"><!--[-->`);
			const each_array_1 = ensure_array_like(item.operations);
			for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
				let op = each_array_1[$$index];
				$$renderer.push(`<span class="rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-2.5 py-1 text-[11px] text-[var(--color-ink-2)]">${escape_html(op)}</span>`);
			}
			$$renderer.push(`<!--]--></div></div></article>`);
		}
		$$renderer.push(`<!--]--></div> <section class="mt-12 border-t border-[var(--color-rule)] pt-8"><h2 class="text-sm font-normal text-[var(--color-ink)]">Разделы услуг по видам обработки:</h2> <div class="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3"><a${attr("href", `${stringify(base)}/tokarnye-raboty-chpu/`)} class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"><span class="block font-normal text-[var(--color-ink)]">Токарная ЧПУ обработка</span> <span class="mt-1 block text-[var(--color-muted)]">Валы, оси, пальцы, штуцеры</span></a> <a${attr("href", `${stringify(base)}/frezernye-raboty-chpu/`)} class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"><span class="block font-normal text-[var(--color-ink)]">Фрезерная ЧПУ обработка</span> <span class="mt-1 block text-[var(--color-muted)]">Корпуса, плиты, кронштейны</span></a> <a${attr("href", `${stringify(base)}/zuboreznye-i-shlifovalnye-raboty/`)} class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"><span class="block font-normal text-[var(--color-ink)]">Зуборезные работы</span> <span class="mt-1 block text-[var(--color-muted)]">Шестерни, шлицы, чистовая доводка</span></a></div></section> <section class="mt-12 border-t border-[var(--color-rule)] pt-12 pb-6 text-center"><h2 class="text-lg text-[var(--color-ink)] sm:text-xl">Требуется изготовление аналогичных деталей?</h2> <p class="lead mx-auto mt-2 max-w-2xl text-xs sm:text-sm">Оцените себестоимость и параметры аналогичной детали онлайн с помощью инженерного калькулятора цеха.</p> <div class="mt-6 flex flex-wrap items-center justify-center gap-4"><a${attr("href", `${stringify(base)}/kalkulyator-stoimosti-chpu/`)} class="btn btn--sm"><span>Рассчитать стоимость в калькуляторе</span></a></div></section></div></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map