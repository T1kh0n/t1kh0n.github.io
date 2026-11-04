/**
 * Centralized Single Source of Truth for Workshop Specifications & Capabilities.
 * All pages, components, calculators, sitemaps and content documents must import from here.
 */

export interface WorkshopMachine {
	id: string;
	category: 'turning' | 'milling' | 'gear_cutting' | 'sawing';
	name: string;
	cncSystem: string;
	workingZone: string;
	precision: string;
	features: string;
}

export const WORKSHOP_SPECS = {
	// Machine Park (Strictly 2 machining centers + auxiliary saw & gear cutter)
	machineCentersCount: 2,
	machineCentersDescription: '2 обрабатывающих центра с ЧПУ (токарно-револьверный и 3-осевой вертикально-фрезерный)',
	
	// Turning limits
	latheMaxDiameterMm: 200,
	latheMaxCenterDistanceMm: 750,
	latheLimitsString: '⌀200 × 750 мм',
	
	// Milling limits (3-axis)
	millTableDimensionsMm: '900 × 500 мм',
	millTravelXyzMm: '800 × 500 × 500 мм',
	millLimitsString: '800 × 500 × 500 мм (3 оси)',
	
	// Precision & Roughness limits
	maxToleranceGrade: 'IT7',
	toleranceGradeDescription: 'до IT7 (без наценки, включено в базовую ставку)',
	surfaceRoughnessRa: 'Ra 1.25 – 2.5 мкм',
	
	// Pricing & Economics
	vatRatePercent: 22,
	vatMultiplier: 1.22,
	baseOrderThresholdRub: 5000,
	baseOrderThresholdString: '5 000 ₽ (с НДС 22%)',
	
	// Geography & Delivery
	region: 'Калининград и вся Калининградская область',
	deliveryDescription: 'Доставка по Калининграду и во все города Калининградской области',
	
	// Operating Schedule
	schedule: {
		workdays: 'Пн–Пт: 08:00 – 20:00 (2 смены)',
		saturday: 'Сб: 09:00 – 16:00 (дежурный технолог)',
		sunday: 'Вс: выходной (техническое обслуживание станков)'
	},
	
	// Yandex Form URL
	defaultYandexFormUrl: 'https://forms.yandex.ru/u/6727773f02848f0545f47012/',
	
	// Machines List
	machines: [
		{
			id: 'cnc_lathe',
			category: 'turning',
			name: 'Токарно-револьверный обрабатывающий центр с ЧПУ',
			cncSystem: 'Fanuc 0i-TF',
			workingZone: 'Макс. диаметр ⌀200 мм, длина точения в центрах 750 мм',
			precision: 'Повторяемость позиционирования ±0.003 мм, точность до IT7',
			features: '12-позиционная револьверная головка BMT с гидропатроном'
		},
		{
			id: 'cnc_mill',
			category: 'milling',
			name: 'Вертикальный фрезерный обрабатывающий центр (3 оси)',
			cncSystem: 'Siemens 828D',
			workingZone: 'Перемещения по осям X/Y/Z: 800 × 500 × 500 мм, стол 900 × 500 мм',
			precision: 'Оптические линейки 0.001 мм, допуск до IT7',
			features: 'Шпиндель 10 000 об/мин (BT40), подача СОЖ через инструмент'
		},
		{
			id: 'gear_hobber',
			category: 'gear_cutting',
			name: 'Зубофрезерный полуавтомат',
			cncSystem: 'Аналоговое зубонарезание',
			workingZone: 'Диаметр колес до 500 мм, модуль от m1.0 до m8.0',
			precision: '7-я и 8-я степень точности зубчатых передач по ГОСТ 1643-81',
			features: 'Нарезание прямозубых, косозубых шестерен и венцов'
		},
		{
			id: 'band_saw',
			category: 'sawing',
			name: 'Автоматический двухколонный ленточнопильный станок',
			cncSystem: 'ЧПУ гидравлическая подача',
			workingZone: 'Рез круглого проката до ⌀260 мм и профильных заготовок',
			precision: 'Перпендикулярность реза ±0.2 мм',
			features: 'Автоматическая подача прутка для серийного раскроя'
		}
	] satisfies WorkshopMachine[]
} as const;
