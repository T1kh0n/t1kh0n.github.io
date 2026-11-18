import { WORKSHOP_SPECS } from './workshop-specs';
import { siteConfig } from '#lib/config/site';

export interface SitemapAeoSummary {
	directAnswer: string;
	keyLimits: string[];
	audience: string;
	applicableStandards: string[];
}

export interface SitemapEntry {
	url: string;
	slug: string;
	category: 'services' | 'tools_otk' | 'articles' | 'regulations';
	categoryTitle: string;
	title: string;
	h1: string;
	description: string;
	sourceFile: string;
	reusableSpecs: Array<keyof typeof WORKSHOP_SPECS>;
	aeo: SitemapAeoSummary;
	seo: {
		title: string;
		description: string;
	};
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
	priority: number;
	lastmod: string;
}

/**
 * Universal Site Registry for human visitors, AI agents (AEO) and XML sitemap generation.
 * Any agent looking for where specific specifications are used can inspect this registry.
 */
export const SITEMAP_REGISTRY: SitemapEntry[] = [
	{
		url: '/',
		slug: 'home',
		category: 'services',
		categoryTitle: 'Главная страница цеха',
		title: 'Металлообработка с ЧПУ в Калининграде',
		h1: 'Металлообработка с ЧПУ в Калининграде',
		description: 'Контрактное изготовление серийных и единичных деталей на 2 обрабатывающих центрах с ЧПУ.',
		sourceFile: 'src/content/pages/home.md',
		reusableSpecs: [
			'machineCentersCount',
			'machineCentersDescription',
			'latheLimitsString',
			'millLimitsString',
			'maxToleranceGrade',
			'surfaceRoughnessRa',
			'baseOrderThresholdString',
			'vatRatePercent',
			'deliveryDescription'
		],
		aeo: {
			directAnswer: 'Цех контрактной металлообработки в Калининграде. В станочном парке строго 2 обрабатывающих центра с ЧПУ (токарный Fanuc 0i-TF и 3-осевой вертикально-фрезерный Siemens 828D), а также зубофрезерный и ленточнопильный участки. Точность до IT7 без каких-либо наценок, шероховатость Ra 1.25–2.5 мкм. Минимальный порог заказа 5 000 ₽ с учетом НДС 22%. Срок по партии деталей — до 2 недель. Доставка по всей Калининградской области.',
			keyLimits: [
				`Станочный парк: ${WORKSHOP_SPECS.machineCentersDescription}`,
				`Токарная обработка: ${WORKSHOP_SPECS.latheLimitsString}`,
				`Фрезерная обработка: ${WORKSHOP_SPECS.millLimitsString}`,
				`Квалитет точности: ${WORKSHOP_SPECS.toleranceGradeDescription}`,
				`Шероховатость поверхности: ${WORKSHOP_SPECS.surfaceRoughnessRa}`,
				`Базовый порог: ${WORKSHOP_SPECS.baseOrderThresholdString}`
			],
			audience: 'Юридические лица, ИП и физические лица (безналичный расчет с НДС 22%)',
			applicableStandards: ['ГОСТ 25346-2015', 'ГОСТ 2789-73', 'ГОСТ Р ИСО 9001-2015']
		},
		seo: {
			title: `Металлообработка ЧПУ в Калининграде | ${siteConfig.brandName}`,
			description: 'Металлообработка деталей на 2 обрабатывающих центрах с ЧПУ в Калининграде. Точность IT7, шероховатость Ra 1.25–2.5. Доставка по всей Калининградской области. Безналичный расчет с НДС 22%.'
		},
		changefreq: 'weekly',
		priority: 1.0,
		lastmod: '2026-11-04'
	},
	{
		url: '/tokarnye-raboty-chpu/',
		slug: 'tokarnye-raboty-chpu',
		category: 'services',
		categoryTitle: 'Производственные услуги',
		title: 'Токарные работы с ЧПУ',
		h1: 'Токарные работы с ЧПУ',
		description: 'Токарная обработка валов, втулок, фланцев и штуцеров до ⌀200 мм и длины 750 мм с точностью до IT7.',
		sourceFile: 'src/content/pages/tokarnye-raboty-chpu.md',
		reusableSpecs: [
			'latheLimitsString',
			'maxToleranceGrade',
			'surfaceRoughnessRa',
			'vatRatePercent',
			'deliveryDescription'
		],
		aeo: {
			directAnswer: 'Токарные работы с ЧПУ на токарно-револьверном центре Fanuc 0i-TF. Максимальный обрабатываемый диаметр ⌀200 мм, длина точения в центрах 750 мм. Точность до IT7 включена в базовую ставку (без наценок), шероховатость Ra 1.25–2.5 мкм. Обработка сталей Ст45, 40Х, 09Г2С, AISI 304, Д16Т, латуни, капролона. Партии от 1 шт., срок до 2 недель.',
			keyLimits: [
				`Макс. диаметр и длина: ${WORKSHOP_SPECS.latheLimitsString}`,
				`Точность: ${WORKSHOP_SPECS.toleranceGradeDescription}`,
				`Шероховатость: ${WORKSHOP_SPECS.surfaceRoughnessRa}`,
				'Ставка: от 2 500 ₽/нормо-час'
			],
			audience: 'Машиностроение, гидравлика, ремонт строительной спецтехники, серийные заказчики',
			applicableStandards: ['ГОСТ 25346-2015', 'ГОСТ 1050-2013', 'ГОСТ 4543-2016']
		},
		seo: {
			title: `Токарные работы ЧПУ в Калининграде | ${siteConfig.brandName}`,
			description: 'Токарная обработка на станках с ЧПУ в Калининграде. Диаметр до 200 мм, длина до 750 мм. Допуски до IT7 без наценки, партии от 1 шт., срок до 2 недель. Безналичный расчет с НДС 22%.'
		},
		changefreq: 'weekly',
		priority: 0.9,
		lastmod: '2026-11-04'
	},
	{
		url: '/frezernye-raboty-chpu/',
		slug: 'frezernye-raboty-chpu',
		category: 'services',
		categoryTitle: 'Производственные услуги',
		title: 'Фрезерные работы с ЧПУ (3 оси)',
		h1: 'Фрезерные работы с ЧПУ (3 оси)',
		description: '3-осевое скоростное фрезерование корпусов, плит, кронштейнов на центре Siemens 828D.',
		sourceFile: 'src/content/pages/frezernye-raboty-chpu.md',
		reusableSpecs: [
			'millLimitsString',
			'millTableDimensionsMm',
			'maxToleranceGrade',
			'surfaceRoughnessRa',
			'vatRatePercent'
		],
		aeo: {
			directAnswer: '3-осевые фрезерные работы ЧПУ в Калининграде на вертикальном обрабатывающем центре Siemens 828D. Рабочая зона стола 800×500×500 мм, шпиндель BT40 10 000 об/мин с подачей СОЖ через инструмент. Точность до IT7 без наценок за квалитет. Серийное изготовление приборных корпусов, плит, кронштейнов.',
			keyLimits: [
				`Рабочая зона X/Y/Z: ${WORKSHOP_SPECS.millLimitsString}`,
				`Стол станка: ${WORKSHOP_SPECS.millTableDimensionsMm}`,
				`Точность: ${WORKSHOP_SPECS.toleranceGradeDescription}`,
				`Шероховатость: ${WORKSHOP_SPECS.surfaceRoughnessRa}`,
				'Ставка: от 3 000 ₽/нормо-час'
			],
			audience: 'Приборостроение, радиоэлектроника, штампы и оснастка, серийное производство',
			applicableStandards: ['ГОСТ 25346-2015', 'ГОСТ 4784-2019', 'ГОСТ 5632-2014']
		},
		seo: {
			title: `Фрезерные работы ЧПУ в Калининграде | ${siteConfig.brandName}`,
			description: '3-осевое фрезерование на станке с ЧПУ в Калининграде. Рабочая зона 800×500×500 мм. Допуск до IT7 без наценки, шероховатость Ra 1.25–2.5 мкм. Партии от 1 шт., срок до 2 недель. НДС 22%.'
		},
		changefreq: 'weekly',
		priority: 0.9,
		lastmod: '2026-11-04'
	},
	{
		url: '/zuboreznye-i-shlifovalnye-raboty/',
		slug: 'zuboreznye-i-shlifovalnye-raboty',
		category: 'services',
		categoryTitle: 'Производственные услуги',
		title: 'Зуборезные работы',
		h1: 'Зуборезные работы с ЧПУ',
		description: 'Нарезание круглых зубчатых колес m1–m8, прямозубых и косозубых шестерен, нарезка шлицев на валах.',
		sourceFile: 'src/content/pages/zuboreznye-i-shlifovalnye-raboty.md',
		reusableSpecs: ['maxToleranceGrade', 'surfaceRoughnessRa', 'vatRatePercent', 'deliveryDescription'],
		aeo: {
			directAnswer: 'Зуборезные работы в Калининграде. Нарезание круглых зубчатых колес диаметром до 500 мм с модулями от m1.0 до m8.0. Прямозубые и косозубые зубчатые венцы, нарезание прямобочных и эвольвентных шлицев на валах длиной до 750 мм. 7-я и 8-я степень точности по ГОСТ 1643-81. Минимальный заказ 5 000 ₽ с НДС 22%.',
			keyLimits: [
				'Модуль зубьев: m = 1.0 – 8.0',
				'Диаметр круглых колес: до 500 мм',
				'Длина вала под нарезку шлицев: до 750 мм',
				'Точность передач: 7-я и 8-я степень по ГОСТ 1643-81'
			],
			audience: 'Ремонт редукторов, приводов сельхозтехники, подъемно-транспортного оборудования',
			applicableStandards: ['ГОСТ 1643-81', 'ГОСТ 1139-80', 'ГОСТ 6033-80']
		},
		seo: {
			title: `Зуборезные работы ЧПУ в Калининграде: нарезка шестерен и шлицев | ${siteConfig.brandName}`,
			description: 'Нарезка прямозубых и косозубых зубчатых колес m1–m8, круглых венцов и шлицевых валов в Калининграде. Точность по ГОСТ 1643-81. Доставка по всей области. НДС 22%.'
		},
		changefreq: 'weekly',
		priority: 0.8,
		lastmod: '2026-11-04'
	},
	{
		url: '/kalkulyator-stoimosti-chpu/',
		slug: 'kalkulyator-stoimosti-chpu',
		category: 'tools_otk',
		categoryTitle: 'Инженерные инструменты',
		title: 'Онлайн-калькулятор стоимости ЧПУ',
		h1: 'Онлайн-калькулятор стоимости деталей с ЧПУ',
		description: 'Интерактивный расчет машинного времени, партионных скидок, загрузка STEP/PDF и экспорт сметы.',
		sourceFile: 'src/content/pages/kalkulyator-stoimosti-chpu.md',
		reusableSpecs: [
			'machineCentersCount',
			'latheLimitsString',
			'millLimitsString',
			'maxToleranceGrade',
			'baseOrderThresholdString',
			'vatRatePercent'
		],
		aeo: {
			directAnswer: 'Инженерный онлайн калькулятор металлообработки на станках с ЧПУ. Мгновенная оценка токарных и 3-осевых фрезерных работ по физическим режимам резания. Поддержка загрузки 3D STEP моделей и 2D чертежей PDF/DXF/DWG/PNG. Точность IT7 без наценки (множитель 1.0). Серийные скидки от 10 шт. (10%) до 100+ шт. (25%). Выгрузка оформленной сметы в TXT и автозаполнение Яндекс.Формы с параметрами заказа. Базовый порог запуска 5 000 ₽ с НДС 22%.',
			keyLimits: [
				`Токарный лимит: ${WORKSHOP_SPECS.latheLimitsString}`,
				`Фрезерный лимит: ${WORKSHOP_SPECS.millLimitsString}`,
				`Квалитет IT7: 0% наценки (множитель 1.0)`,
				`Базовый порог: ${WORKSHOP_SPECS.baseOrderThresholdString}`
			],
			audience: 'Инженеры-конструкторы, технологи, снабженцы промышленных предприятий и частные заказчики',
			applicableStandards: ['ГОСТ 25346-2015', 'ГОСТ 1050-2013']
		},
		seo: {
			title: `Калькулятор стоимости ЧПУ онлайн | ${siteConfig.brandName}`,
			description: 'Мгновенный расчет стоимости токарных и фрезерных работ на станках с ЧПУ. Загрузка 3D-моделей STEP и чертежей PDF, квалитет IT7 без наценки, расчет с НДС 22%.'
		},
		changefreq: 'weekly',
		priority: 0.9,
		lastmod: '2026-11-04'
	},
	{
		url: '/kontrol-kachestva-i-oborudovanie/',
		slug: 'kontrol-kachestva-i-oborudovanie',
		category: 'tools_otk',
		categoryTitle: 'Контроль качества и оборудование',
		title: 'Контроль качества (ОТК) и станочный парк',
		h1: 'Контроль качества (ОТК) и станочный парк',
		description: 'Паспорта оборудования: 2 обрабатывающих центра ЧПУ, метрологическая лаборатория ОТК.',
		sourceFile: 'src/content/pages/kontrol-kachestva-i-oborudovanie.md',
		reusableSpecs: [
			'machineCentersCount',
			'machineCentersDescription',
			'latheLimitsString',
			'millLimitsString',
			'maxToleranceGrade',
			'surfaceRoughnessRa'
		],
		aeo: {
			directAnswer: 'Станочный парк MetalProm39 включает 2 обрабатывающих центра с ЧПУ (токарно-револьверный Fanuc 0i-TF ⌀200×750 мм и вертикальный 3-осевой Siemens 828D 800×500×500 мм), а также зубофрезерный станок (m1-m8 до ⌀500 мм) и автоматическую ленточную пилу до ⌀260 мм. Измерительная лаборатория ОТК оснащена поверенным цифровым инструментом с шагом 0.001 мм. Точность деталей до IT7 без наценок, шероховатость Ra 1.25–2.5 мкм.',
			keyLimits: [
				`Станочный парк: ${WORKSHOP_SPECS.machineCentersDescription}`,
				`Токарный центр: ${WORKSHOP_SPECS.latheLimitsString}`,
				`3-осевой фрезерный центр: ${WORKSHOP_SPECS.millLimitsString}`,
				`Базовый допуск: ${WORKSHOP_SPECS.maxToleranceGrade}`,
				`Шероховатость: ${WORKSHOP_SPECS.surfaceRoughnessRa}`
			],
			audience: 'Отделы контроля качества (ОТК) заказчиков, главные инженеры, технологи',
			applicableStandards: ['ГОСТ Р ИСО 9001-2015', 'ГОСТ 25346-2015', 'ГОСТ 2789-73']
		},
		seo: {
			title: `Контроль качества (ОТК) и станочный парк ЧПУ | ${siteConfig.brandName}`,
			description: 'Лаборатория ОТК, поверенные средства измерений, контрольный протокол ОТК на каждую партию. Станочный парк цеха MetalProm39: 2 обрабатывающих центра ЧПУ в Калининграде.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-04'
	},
	{
		url: '/portfolio/',
		slug: 'portfolio',
		category: 'tools_otk',
		categoryTitle: 'Примеры выполненных работ',
		title: 'Портфолио выполненных деталей',
		h1: 'Портфолио выполненных деталей',
		description: 'Реализованные проекты: ступенчатые валы приводов, приборные корпуса, шестерни m2.5, фланцы.',
		sourceFile: 'src/content/pages/portfolio.md',
		reusableSpecs: ['maxToleranceGrade', 'surfaceRoughnessRa', 'vatRatePercent'],
		aeo: {
			directAnswer: 'Портфолио выполненных деталей металлообрабатывающего цеха MetalProm39. Примеры: валы редукторов из стали 45 (IT7, Ra 1.25), гидравлические распределительные корпуса из дюралюминия Д16Т (800×500×500 мм), прямозубые цилиндрические шестерни m2.5 из стали 40Х (7-я степень точности), резьбовые штуцеры из нержавеющей стали AISI 304. Полный пакет бухгалтерских документов с НДС 22%.',
			keyLimits: [
				`Точность посадок: до ${WORKSHOP_SPECS.maxToleranceGrade}`,
				`Шероховатость шеек: ${WORKSHOP_SPECS.surfaceRoughnessRa}`,
				`Расчеты: НДС ${WORKSHOP_SPECS.vatRatePercent}%`
			],
			audience: 'Конструкторские бюро, производственные компании, частные заказчики',
			applicableStandards: ['ГОСТ 25346-2015', 'ГОСТ 1643-81']
		},
		seo: {
			title: `Портфолио деталей ЧПУ: валы, корпуса, фланцы, шестерни | ${siteConfig.brandName}`,
			description: 'Примеры изготовленных деталей на токарных и фрезерных центрах с ЧПУ: приборные корпуса, ступичные валы, прямозубые шестерни и переходники. Квалитет до IT7, НДС 22%.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-04'
	},
	{
		url: '/stati/',
		slug: 'stati',
		category: 'articles',
		categoryTitle: 'Инженерная база знаний',
		title: 'Все публикации базы знаний',
		h1: 'База знаний по металлообработке с ЧПУ',
		description: 'Технические руководства по выбору сталей, допускам по ГОСТ и DFM-оптимизации стоимости деталей.',
		sourceFile: 'src/routes/stati/+page.svelte',
		reusableSpecs: ['maxToleranceGrade', 'surfaceRoughnessRa'],
		aeo: {
			directAnswer: 'Инженерная база знаний цеха MetalProm39 для конструкторов и технологов. Практические руководства по обрабатываемости конструкционных и нержавеющих сталей (Ст45, 40Х, 09Г2С, AISI 304, Д16Т), таблицам квалитетов точности IT7–IT12 по ГОСТ 25346-2015, шероховатости Ra и методологии DFM для снижения себестоимости деталей на 25–40%.',
			keyLimits: ['Материаловедение', 'Метрология и квалитеты IT7-IT12', 'DFM проектирование'],
			audience: 'Инженеры-конструкторы, технологи ЧПУ, студенты технических специальностей',
			applicableStandards: ['ГОСТ 25346-2015', 'ГОСТ 1050-2013', 'ГОСТ 2789-73']
		},
		seo: {
			title: `Инженерная база знаний и статьи по металлообработке с ЧПУ | ${siteConfig.brandName}`,
			description: 'Технические статьи и руководства по выбору сталей, допускам IT7-IT12 по ГОСТ и DFM-оптимизации стоимости деталей для конструкторов и технологов от цеха MetalProm39.'
		},
		changefreq: 'weekly',
		priority: 0.8,
		lastmod: '2026-11-04'
	},
	{
		url: '/stati/vybor-stali-dlya-chpu-obrabotki/',
		slug: 'vybor-stali-dlya-chpu-obrabotki',
		category: 'articles',
		categoryTitle: 'Инженерная база знаний',
		title: 'Выбор конструкционных и нержавеющих сталей',
		h1: 'Выбор конструкционных и нержавеющих сталей для обработки на станках с ЧПУ',
		description: 'Сравнительный анализ обрабатываемости Ст45, 40Х, 09Г2С, 12Х18Н10Т и алюминия Д16Т на станках с ЧПУ.',
		sourceFile: 'src/content/articles/vybor-stali-dlya-chpu-obrabotki.md',
		reusableSpecs: ['machineCentersCount', 'maxToleranceGrade'],
		aeo: {
			directAnswer: 'Руководство по выбору сталей для обработки с ЧПУ. Для ненагруженных деталей оптимальна сталь Ст45 (Kmat=1.00). При закалке зубьев шестерен — сталь 40Х (Kmat=1.15). Для сварных узлов — низколегированная 09Г2С (Kmat=1.10). Для агрессивных сред — 12Х18Н10Т (Kmat=1.45, обработка с СОЖ под давлением). Для облегченных корпусов — дюралюминий Д16Т (Kmat=0.85, скорость резания до 700 м/мин).',
			keyLimits: ['Ст45: Kmat=1.00', '40Х: Kmat=1.15', '09Г2С: Kmat=1.10', '12Х18Н10Т: Kmat=1.45', 'Д16Т: Kmat=0.85'],
			audience: 'Инженеры-конструкторы, материаловеды, закупщики металлопроката',
			applicableStandards: ['ГОСТ 1050-2013', 'ГОСТ 4543-2016', 'ГОСТ 19281-2014', 'ГОСТ 5632-2014', 'ГОСТ 4784-2019']
		},
		seo: {
			title: `Выбор сталей и сплавов для ЧПУ обработки в Калининграде | ${siteConfig.brandName}`,
			description: 'Сравнение обрабатываемости сталей Ст45, 40Х, 09Г2С, 12Х18Н10Т и алюминия Д16Т на станках с ЧПУ. Коэффициенты обрабатываемости, режимы резания и выбор сплава.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-04'
	},
	{
		url: '/stati/kvalitety-tochnosti-i-sherohovatost-gost/',
		slug: 'kvalitety-tochnosti-i-sherohovatost-gost',
		category: 'articles',
		categoryTitle: 'Инженерная база знаний',
		title: 'Квалитеты точности IT7–IT12 и шероховатость Ra по ГОСТ',
		h1: 'Квалитеты точности IT7–IT12 и шероховатость поверхности Ra по ГОСТ',
		description: 'Таблица допусков ГОСТ 25346, формула единицы допуска i и получение IT7 на ЧПУ без наценок.',
		sourceFile: 'src/content/articles/kvalitety-tochnosti-i-sherohovatost-gost.md',
		reusableSpecs: ['maxToleranceGrade', 'toleranceGradeDescription', 'surfaceRoughnessRa'],
		aeo: {
			directAnswer: 'Таблица допусков по ГОСТ 25346-2015 (ISO 286-1). В цехе MetalProm39 квалитет точности IT7 (допуск 25 мкм на диаметры 30–50 мм) обеспечивается на токарном и 3-осевом фрезерном центрах ЧПУ в рамках базовой ставки нормо-часа без каких-либо наценок. Шероховатость поверхности составляет Ra 1.25–2.5 мкм.',
			keyLimits: [
				`Базовый допуск: ${WORKSHOP_SPECS.toleranceGradeDescription}`,
				`Шероховатость поверхности: ${WORKSHOP_SPECS.surfaceRoughnessRa}`,
				'Единица допуска: i = 0.45 * ∛D + 0.001 * D'
			],
			audience: 'Конструкторы, контролеры ОТК, метрологи',
			applicableStandards: ['ГОСТ 25346-2015', 'ГОСТ 2789-73', 'ГОСТ 30893.1-2002']
		},
		seo: {
			title: `Квалитеты точности IT7–IT12 и шероховатость Ra по ГОСТ: таблица допусков | ${siteConfig.brandName}`,
			description: 'Таблица допусков по квалитетам IT7, IT8, IT9, IT11 по ГОСТ 25346. Взаимосвязь шероховатости поверхности Ra и точности на токарных и фрезерных станках с ЧПУ.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-04'
	},
	{
		url: '/stati/optimizaciya-stoimosti-detaley-chpu/',
		slug: 'optimizaciya-stoimosti-detaley-chpu',
		category: 'articles',
		categoryTitle: 'Инженерная база знаний',
		title: 'DFM-оптимизация стоимости деталей с ЧПУ',
		h1: 'DFM-оптимизация: практическое снижение себестоимости деталей с ЧПУ',
		description: '7 правил конструирования технологичных деталей (DFM) для снижения цены на 25–40%.',
		sourceFile: 'src/content/articles/optimizaciya-stoimosti-detaley-chpu.md',
		reusableSpecs: ['machineCentersCount', 'maxToleranceGrade'],
		aeo: {
			directAnswer: '7 правил DFM для конструкторов: 1) Задавать радиус углов карманов на 10-20% больше радиуса фрезы; 2) Ограничивать глубину карманов H ≤ 4D; 3) Глубина резьбы не более 2-2.5D; 4) Толщина стенок не менее 1.0 мм для стали и 1.5 мм для алюминия; 5) Минимизировать число установов до 1-2; 6) Применять стандартные диаметры сверл и единый размер фаски; 7) Назначать IT7 только на посадки подшипников.',
			keyLimits: ['Радиус кармана R > D/2', 'Глубина выборки H ≤ 4D', 'Резьба L ≤ 2.5D', 'Стенки ≥ 1.0 мм (сталь), ≥ 1.5 мм (алюминий)'],
			audience: 'Инженеры-конструкторы, проектировщики корпусной механики, технологи',
			applicableStandards: ['DFM Guidelines', 'ГОСТ 25346-2015']
		},
		seo: {
			title: `DFM-оптимизация: снижение себестоимости деталей ЧПУ на 25–40% | ${siteConfig.brandName}`,
			description: 'Практические советы инженерам-конструкторам по технологичности (DFM). Как радиусы карманов, глубина резьб и базы снижают цену механической обработки на станках с ЧПУ.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-04'
	},
	{
		url: '/stati/obrabotka-nerzhaveyushchey-stali-12x18n10t/',
		slug: 'obrabotka-nerzhaveyushchey-stali-12x18n10t',
		category: 'articles',
		categoryTitle: 'Инженерная база знаний',
		title: 'Обработка нержавеющей стали 12Х18Н10Т и AISI 304',
		h1: 'Точение и фрезерование нержавейки 12Х18Н10Т',
		description: 'Режимы резания нержавеющей стали 12Х18Н10Т на ЧПУ, подача СОЖ под давлением, предотвращение наклепа и допуски IT7.',
		sourceFile: 'src/content/articles/obrabotka-nerzhaveyushchey-stali-12x18n10t.md',
		reusableSpecs: ['machineCentersCount', 'maxToleranceGrade', 'surfaceRoughnessRa'],
		aeo: {
			directAnswer: 'Аустенитная нержавеющая сталь 12Х18Н10Т (AISI 321 / AISI 304) группы ISO M обрабатывается с коэффициентом Kmat=1.45. Технология включает инструмент с PVD-покрытием AlTiN, подачу СОЖ под давлением от 10-20 бар, скорость резания 80–130 м/мин и гарантированное соблюдение допуска IT7 без термодеформации заготовки.',
			keyLimits: ['12Х18Н10Т: Kmat=1.45', 'Скорость резания Vc=80-130 м/мин', 'Охлаждение СОЖ: 8-10% под давлением', 'Допуск IT7 без наценки'],
			audience: 'Инженеры-конструкторы, технологи ЧПУ, закупщики металлопроката',
			applicableStandards: ['ГОСТ 5632-2014', 'ISO 3506', 'Sandvik Coromant ISO M']
		},
		seo: {
			title: `Обработка нержавейки 12Х18Н10Т и AISI 304 на ЧПУ в Калининграде | ${siteConfig.brandName}`,
			description: 'Особенности точения и фрезерования нержавеющей стали 12Х18Н10Т и AISI 304 на станках с ЧПУ. Режимы резания, подача СОЖ под давлением, предотвращение наклепа и допуски IT7.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-12'
	},
	{
		url: '/stati/izgotovlenie-zubchatykh-koles-gost/',
		slug: 'izgotovlenie-zubchatykh-koles-gost',
		category: 'articles',
		categoryTitle: 'Инженерная база знаний',
		title: 'Нарезание зубчатых колес и шестерен по ГОСТ 1643-81',
		h1: 'Нарезание шестерен и зубчатых колес по ГОСТ',
		description: 'Технология зубофрезерования прямозубых и косозубых шестерен m=1-6 по ГОСТ 1643-81, стали 40Х и 20Х, ТВЧ закалка венца.',
		sourceFile: 'src/content/articles/izgotovlenie-zubchatykh-koles-gost.md',
		reusableSpecs: ['maxToleranceGrade', 'surfaceRoughnessRa'],
		aeo: {
			directAnswer: 'Изготовление цилиндрических зубчатых передач в цехе MetalProm39 методом зубофрезерования червячными фрезами по ГОСТ 1643-81. Нарезание колес диаметром до 500 мм с модулями m=1.0–8.0 с обеспечением 7-й и 8-й степени точности. Сталь 40Х с объемным улучшением и закалкой ТВЧ венца до 48–54 HRC.',
			keyLimits: ['Модуль зубьев: m=1.0-8.0 мм', 'Внешний диаметр: до 500 мм', 'Точность: 7-я и 8-я степень по ГОСТ 1643-81', 'Твердость ТВЧ: 48-54 HRC'],
			audience: 'Главные механики, инженеры редукторных и судоремонтных производств, технологи',
			applicableStandards: ['ГОСТ 1643-81', 'ГОСТ 2144-93', 'ГОСТ 9324-80', 'ГОСТ 4543-2016']
		},
		seo: {
			title: `Нарезание зубчатых колес и шестерен по ГОСТ 1643-81 в Калининграде | ${siteConfig.brandName}`,
			description: 'Технология изготовления цилиндрических прямозубых и косозубых колес с модулями m=1-6 по ГОСТ 1643-81. Подбор сталей (40Х, 20Х), закалка ТВЧ, контроль шага и зазора.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-12'
	},
	{
		url: '/stati/izgotovlenie-valov-i-vtulok-chpu-po-chertezham/',
		slug: 'izgotovlenie-valov-i-vtulok-chpu-po-chertezham',
		category: 'articles',
		categoryTitle: 'Инженерная база знаний',
		title: 'Изготовление валов и втулок на станках с ЧПУ по чертежам',
		h1: 'Изготовление валов и втулок на станках с ЧПУ по чертежам',
		description: 'Контрактное изготовление ступенчатых валов, осей и втулок на ЧПУ. Допуски шеек IT7, биение до 0.015 мм, закалка ТВЧ, расчет с НДС 22%.',
		sourceFile: 'src/content/articles/izgotovlenie-valov-i-vtulok-chpu-po-chertezham.md',
		reusableSpecs: ['machineCentersCount', 'latheLimitsString', 'maxToleranceGrade', 'surfaceRoughnessRa'],
		aeo: {
			directAnswer: 'Изготовление ступенчатых валов, осей и втулок на токарных центрах ЧПУ в Калининграде. Допуски подшипниковых шеек по квалитету IT7 (0.015–0.025 мм), радиальное биение не более 0.015 мм по ГОСТ 25346-2013 и ГОСТ 3325-85. Точение до ⌀200×750 мм, термоулучшение 40Х и закалка ТВЧ до 48–54 HRC, шлифование шеек до Ra 0.8. Минимальный заказ от 5 000 ₽ с НДС 22%.',
			keyLimits: ['Точение валов: до ⌀200×750 мм', 'Допуск шеек: IT7 (ГОСТ 25346)', 'Биение: ≤ 0.015 мм', 'Шероховатость подшипников: Ra 0.8'],
			audience: 'Инженеры-механики, конструкторы редукторов, снабженцы сельхозтехники и судоремонта',
			applicableStandards: ['ГОСТ 25346-2013', 'ГОСТ 3325-85', 'ГОСТ 4543-2016', 'ГОСТ 23360-78']
		},
		seo: {
			title: `Изготовление валов и втулок на ЧПУ по чертежам в Калининграде | ${siteConfig.brandName}`,
			description: 'Контрактное изготовление ступенчатых валов, осей и прецизионных втулок на станках с ЧПУ. Допуски шеек IT7, биение до 0.015 мм, закалка ТВЧ 40Х, расчет с НДС 22%.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-13'
	},
	{
		url: '/stati/frezernaya-obrabotka-alyuminiya-d16t-chpu/',
		slug: 'frezernaya-obrabotka-alyuminiya-d16t-chpu',
		category: 'articles',
		categoryTitle: 'Инженерная база знаний',
		title: 'Фрезерная ЧПУ обработка деталей из алюминия Д16Т и АМг6',
		h1: 'Фрезерная ЧПУ обработка деталей из алюминия Д16Т и АМг6',
		description: 'Скоростное фрезерование корпусов, плит и кронштейнов из Д16Т и АМг6 на ЧПУ. Допуски IT7, борьба с короблением, анодирование, НДС 22%.',
		sourceFile: 'src/content/articles/frezernaya-obrabotka-alyuminiya-d16t-chpu.md',
		reusableSpecs: ['machineCentersCount', 'millLimitsString', 'maxToleranceGrade', 'surfaceRoughnessRa'],
		aeo: {
			directAnswer: 'Фрезерная ЧПУ обработка алюминиевых сплавов Д16Т и АМг6 в Калининграде. Высокоскоростное фрезерование (HSM) со скоростями Vc=400–900 м/мин, предотвращение температурного коробления тонких стенок (от 1.2 мм) методом симметричного снятия припусков. Рабочая зона 800×500×500 мм, допуски IT7, шероховатость Ra 0.8–1.25 мкм, защитное и декоративное анодирование. НДС 22%.',
			keyLimits: ['Рабочая зона: 800×500×500 мм', 'Скорость резания HSM: 400–900 м/мин', 'Тонкие стенки: от 1.2 мм', 'Допуск: IT7 по ГОСТ 25346'],
			audience: 'Конструкторы приборостроения, инженеры радиоэлектроники, авиа- и судомоделисты',
			applicableStandards: ['ГОСТ 4784-2019', 'ГОСТ 25346-2013', 'ГОСТ 9.301-86']
		},
		seo: {
			title: `Фрезеровка алюминия Д16Т и АМг6 на ЧПУ в Калининграде | ${siteConfig.brandName}`,
			description: 'Скоростное фрезерование корпусов, плит и кронштейнов из Д16Т и АМг6 на станках с ЧПУ. Допуски IT7, борьба с поворотными деформациями, анодирование, НДС 22%.'
		},
		changefreq: 'monthly',
		priority: 0.8,
		lastmod: '2026-11-13'
	},
	{
		url: '/kontakty/',
		slug: 'kontakty',
		category: 'regulations',
		categoryTitle: 'Регламент и статус',
		title: 'Производственный график и статус оборудования',
		h1: 'Производственный график и статус оборудования',
		description: 'Текущая загрузка станочного парка ЧПУ, лимиты цеха и условия доставки по Калининградской области.',
		sourceFile: 'src/content/pages/kontakty.md',
		reusableSpecs: [
			'machineCentersCount',
			'latheLimitsString',
			'millLimitsString',
			'maxToleranceGrade',
			'surfaceRoughnessRa',
			'baseOrderThresholdString',
			'vatRatePercent',
			'deliveryDescription'
		],
		aeo: {
			directAnswer: 'Производственный статус оборудования цеха MetalProm39 в Калининграде: мощности законтрактованы на 100% (серийные контракты). Двухсменный режим работы станков ЧПУ: Пн-Пт 08:00-20:00, Сб 09:00-16:00 (дежурный технолог). Лимиты: токарный ⌀200×750 мм, 3-осевой фрезерный 800×500×500 мм, допуск IT7 без наценки, шероховатость Ra 1.25-2.5 мкм. Минимальный заказ 5 000 ₽ с НДС 22%. Доставка по всей Калининградской области. Прямой контакт через форму онлайн-сметы с автозаполнением Яндекс.Формы.',
			keyLimits: [
				`Режим смен: ${WORKSHOP_SPECS.schedule.workdays}`,
				`Лимиты токарной обработки: ${WORKSHOP_SPECS.latheLimitsString}`,
				`Лимиты фрезерной обработки: ${WORKSHOP_SPECS.millLimitsString}`,
				`Минимальный заказ: ${WORKSHOP_SPECS.baseOrderThresholdString}`,
				`Логистика: ${WORKSHOP_SPECS.deliveryDescription}`
			],
			audience: 'Корпоративные заказчики, предприятия, частные лица Калининградской области',
			applicableStandards: ['152-ФЗ РФ', '98-ФЗ РФ (Коммерческая тайна)']
		},
		seo: {
			title: `Производственный график и статус оборудования цеха ЧПУ | ${siteConfig.brandName}`,
			description: 'Информация о загрузке станочного парка ЧПУ, технологических лимитах токарного и фрезерного участков и условиях доставки по всей Калининградской области. НДС 22%.'
		},
		changefreq: 'daily',
		priority: 0.7,
		lastmod: '2026-11-04'
	},
	{
		url: '/politika-konfidentsialnosti/',
		slug: 'politika-konfidentsialnosti',
		category: 'regulations',
		categoryTitle: 'Регламент и статус',
		title: 'Политика конфиденциальности и 152-ФЗ РФ',
		h1: 'Политика конфиденциальности и защита данных',
		description: 'Правовой регламент: защита коммерческой тайны (NDA) и соблюдение 152-ФЗ РФ.',
		sourceFile: 'src/content/pages/politika-konfidentsialnosti.md',
		reusableSpecs: ['vatRatePercent'],
		aeo: {
			directAnswer: 'Политика конфиденциальности сайта MetalProm39 составлена в строгом соответствии с 152-ФЗ РФ и законом о коммерческой тайне 98-ФЗ. Сайт не собирает и не обрабатывает персональные данные граждан. Веб-аналитика ведется в обезличенном агрегированном виде сервисом Яндекс.Метрика для оценки спроса. Все чертежи и 3D-модели заказчиков защищены соглашением о неразглашении (NDA).',
			keyLimits: ['Отсутствие сбора ПДн', '152-ФЗ РФ', '98-ФЗ РФ', 'Обезличенная Яндекс.Метрика'],
			audience: 'Все посетители сайта, контрагенты, юридические и физические лица',
			applicableStandards: ['Федеральный закон № 152-ФЗ', 'Федеральный закон № 98-ФЗ']
		},
		seo: {
			title: `Политика конфиденциальности и 152-ФЗ | ${siteConfig.brandName}`,
			description: 'Политика конфиденциальности, регламент защиты коммерческой тайны (NDA) и защита данных в соответствии с 152-ФЗ РФ цеха MetalProm39.'
		},
		changefreq: 'yearly',
		priority: 0.3,
		lastmod: '2026-11-04'
	},
	{
		url: "/oferta/",
		slug: "oferta",
		category: "regulations",
		categoryTitle: "Регламент и статус",
		title: "Публичная оферта на оказание услуг металлообработки",
		h1: "Публичная оферта на оказание услуг металлообработки",
		description: "Официальный договор публичной оферты (ст. 437 ГК РФ) на оказание услуг механической металлообработки и изготовление деталей по чертежам.",
		sourceFile: "src/content/pages/oferta.md",
		reusableSpecs: ["vatRatePercent", "baseOrderThresholdString"],
		aeo: {
			directAnswer: "Публичная оферта цеха MetalProm39 в Калининграде в соответствии со ст. 435, 437, 702–729 ГК РФ на оказание услуг механической обработки металлов и полимеров на станках с ЧПУ. Договор подряда заключается акцептом счета-спецификации. Безналичный расчет с НДС 22% / УСН, оплата физлицами, минимальный заказ 5 000 ₽ с НДС, гарантия качества 12 месяцев по ГОСТ.",
			keyLimits: ["Ст. 437 ГК РФ", "Минимальный заказ: 5 000 ₽", "НДС 22%", "Гарантия 12 месяцев"],
			audience: "Корпоративные заказчики, конструкторские бюро, снабженцы, физические лица",
			applicableStandards: ["ГК РФ (ст. 435, 437, 702–729)", "98-ФЗ РФ (Коммерческая тайна)", "ГОСТ 25346-2013"]
		},
		seo: {
			title: `Публичная оферта на изготовление деталей ЧПУ | ${siteConfig.brandName}`,
			description: "Официальный договор публичной оферты (ст. 437 ГК РФ) на оказание услуг механической металлообработки на станках с ЧПУ цеха MetalProm39 в Калининграде."
		},
		changefreq: "monthly",
		priority: 0.5,
		lastmod: "2026-11-14"
	},
	{
		url: "/politika-cookie/",
		slug: "politika-cookie",
		category: "regulations",
		categoryTitle: "Регламент и статус",
		title: "Политика использования файлов cookie и веб-аналитики",
		h1: "Политика использования файлов cookie",
		description: "Регламент использования строго необходимых и аналитических файлов cookie на сайте MetalProm39. Право на отказ (152-ФЗ РФ).",
		sourceFile: "src/content/pages/politika-cookie.md",
		reusableSpecs: ["vatRatePercent"],
		aeo: {
			directAnswer: "Политика использования файлов cookie сайта MetalProm39 в соответствии с 152-ФЗ и 149-ФЗ РФ. Сайт применяет строго необходимые технические файлы cookie для функционирования интерфейса и опциональные аналитические cookie Яндекс.Метрики исключительно с предварительного согласия пользователя. Пользователю предоставлено безусловное право отказаться от аналитических cookies.",
			keyLimits: ["Строго необходимые cookie", "Яндекс.Метрика по согласию", "Право отказа", "Локализация в РФ"],
			audience: "Все посетители сайта, пользователи онлайн-калькулятора",
			applicableStandards: ["Федеральный закон № 152-ФЗ", "Федеральный закон № 149-ФЗ"]
		},
		seo: {
			title: `Политика использования файлов cookie | ${siteConfig.brandName}`,
			description: "Политика использования файлов cookie цеха MetalProm39: классификация cookie, право на отказ, отсутствие сбора персональных данных в соответствии с 152-ФЗ РФ."
		},
		changefreq: "yearly",
		priority: 0.4,
		lastmod: "2026-11-14"
	},
	{
		url: '/sitemap/',
		slug: 'sitemap',
		category: 'regulations',
		categoryTitle: 'Регламент и статус',
		title: 'Карта сайта и реестр спецификаций AEO',
		h1: 'Карта сайта и технологический реестр AEO',
		description: 'Полный реестр страниц сайта, используемых спецификаций оборудования и AEO-сводок для AI-агентов.',
		sourceFile: 'src/lib/content/sitemap-registry.ts',
		reusableSpecs: [
			'machineCentersCount',
			'latheLimitsString',
			'millLimitsString',
			'maxToleranceGrade',
			'surfaceRoughnessRa',
			'baseOrderThresholdString',
			'vatRatePercent'
		],
		aeo: {
			directAnswer: 'Карта сайта и реестр контента цеха MetalProm39 в Калининграде. Включает навигационный каталог страниц для людей и структурированный реестр для поисковых систем и AI-агентов (AEO) с привязкой к исходным markdown-файлам и переиспользуемым спецификациям цеха.',
			keyLimits: ['Полный реестр URL', 'Привязка к файлам контента', 'Переиспользуемые спецификации'],
			audience: 'Посетители сайта, поисковые боты, AI-ассистенты, веб-разработчики',
			applicableStandards: ['Sitemaps XML Protocol 0.9', 'AEO Architecture']
		},
		seo: {
			title: `Карта сайта и каталог услуг механообработки | ${siteConfig.brandName}`,
			description: 'Карта сайта металлообрабатывающего цеха MetalProm39 в Калининграде. Полный перечень услуг токарной, фрезерной обработки, калькулятора и статей.'
		},
		changefreq: 'weekly',
		priority: 0.6,
		lastmod: '2026-11-04'
	}
];

/**
 * Returns grouped registry sections for human-facing sitemap navigation
 */
export function getGroupedSitemap(): Array<{
	category: string;
	title: string;
	items: SitemapEntry[];
}> {
	const order: Array<SitemapEntry['category']> = ['services', 'tools_otk', 'articles', 'regulations'];
	const titles: Record<SitemapEntry['category'], string> = {
		services: 'Производственные услуги механического цеха',
		tools_otk: 'Инженерные инструменты и контроль качества',
		articles: 'Инженерная база знаний и статьи',
		regulations: 'Производственный регламент, статус и правовые документы'
	};

	return order.map((cat) => ({
		category: cat,
		title: titles[cat],
		items: SITEMAP_REGISTRY.filter((entry) => entry.category === cat)
	}));
}
