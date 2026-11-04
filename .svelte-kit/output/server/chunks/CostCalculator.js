import "./paths.js";
import { f as escape_html, i as ensure_array_like, r as derived, t as attr_class, u as attr } from "./server.js";
// src/lib/calculator/pricing-config.ts
var MINIMUM_ORDER_VALUE = 5e3;
var SAWING_ALLOWANCE_FACTOR = 1.15;
var OPERATIONS = {
	lathe_turning: {
		id: "lathe_turning",
		nameRu: "Токарная обработка на станках с ЧПУ",
		shortNameRu: "Токарная ЧПУ",
		ratePerHour: 2500,
		defaultCycleTimeHours: .25
	},
	milling_3axis: {
		id: "milling_3axis",
		nameRu: "Фрезерная обработка на станках с ЧПУ (3 оси)",
		shortNameRu: "Фрезерная 3-оси",
		ratePerHour: 3e3,
		defaultCycleTimeHours: .35
	},
	engineering: {
		id: "engineering",
		nameRu: "CAD/CAM программирование и реверс-инжиниринг",
		shortNameRu: "Инжиниринг / УП",
		ratePerHour: 2e3,
		defaultCycleTimeHours: 1
	}
};
var OPERATIONS_LIST = Object.values(OPERATIONS);
var SETUP_COMPLEXITIES = {
	simple: {
		id: "simple",
		nameRu: "Базовая сложность (+0%)",
		descriptionRu: "1–2 установа, стандартный инструмент, круглые или плоские контуры",
		percent: 0,
		fee: 3e3
	},
	medium: {
		id: "medium",
		nameRu: "Средняя сложность (+25%)",
		descriptionRu: "2–3 установа, фасонный инструмент, резьбы, пазы, лыски",
		percent: 25,
		fee: 3750
	},
	complex: {
		id: "complex",
		nameRu: "Высокая сложность (+50%)",
		descriptionRu: "Сложные фасонные контуры, карманы, тонкостенные элементы",
		percent: 50,
		fee: 4500
	}
};
var SETUP_COMPLEXITIES_LIST = Object.values(SETUP_COMPLEXITIES);
var MATERIALS = {
	steel_45: {
		id: "steel_45",
		nameRu: "Конструкционная сталь",
		gradeRu: "Сталь 45 / Ст20",
		density: 7.85,
		pricePerKg: 140,
		machinabilityK: 1,
		chipCategory: "ferrous"
	},
	alloy_steel_40kh: {
		id: "alloy_steel_40kh",
		nameRu: "Легированная сталь",
		gradeRu: "Сталь 40Х / 09Г2С",
		density: 7.85,
		pricePerKg: 175,
		machinabilityK: 1.15,
		chipCategory: "alloy"
	},
	stainless_steel_304: {
		id: "stainless_steel_304",
		nameRu: "Нержавеющая сталь",
		gradeRu: "12Х18Н10Т / AISI 304",
		density: 7.9,
		pricePerKg: 520,
		machinabilityK: 1.45,
		chipCategory: "stainless"
	},
	aluminum_d16t: {
		id: "aluminum_d16t",
		nameRu: "Алюминиевые сплавы",
		gradeRu: "Д16Т / АМг6",
		density: 2.78,
		pricePerKg: 680,
		machinabilityK: .85,
		chipCategory: "non_ferrous"
	},
	brass_ls59: {
		id: "brass_ls59",
		nameRu: "Латунь",
		gradeRu: "ЛС59-1",
		density: 8.5,
		pricePerKg: 950,
		machinabilityK: .8,
		chipCategory: "non_ferrous"
	},
	bronze_brazh: {
		id: "bronze_brazh",
		nameRu: "Бронза",
		gradeRu: "БрАЖ9-4 / БрОФ",
		density: 7.5,
		pricePerKg: 1150,
		machinabilityK: 1.1,
		chipCategory: "non_ferrous"
	},
	plastic_caprolon_pom: {
		id: "plastic_caprolon_pom",
		nameRu: "Инженерные пластики",
		gradeRu: "Капролон ПА6 / ПОМ-С (полиацеталь)",
		density: 1.3,
		pricePerKg: 550,
		machinabilityK: .75,
		chipCategory: "plastic"
	}
};
var MATERIALS_LIST = Object.values(MATERIALS);
/**
* Tolerances: Zero surcharge policy.
* Highest precision (IT7) is covered within standard machine hour rates.
*/
var TOLERANCES = {
	standard: {
		id: "standard",
		nameRu: "Стандартная (IT10–IT12)",
		toleranceGrade: "IT10–IT12",
		roughnessRa: "Ra 3.2–6.3",
		multiplier: 1,
		includesGrinding: false
	},
	elevated: {
		id: "elevated",
		nameRu: "Повышенная (IT8–IT9)",
		toleranceGrade: "IT8–IT9",
		roughnessRa: "Ra 1.6–2.5",
		multiplier: 1,
		includesGrinding: false
	},
	high_precision_grinding: {
		id: "high_precision_grinding",
		nameRu: "Высокоточная (IT7, без наценки)",
		toleranceGrade: "IT7",
		roughnessRa: "Ra 1.25",
		multiplier: 1,
		includesGrinding: false
	}
};
var TOLERANCES_LIST = Object.values(TOLERANCES);
var COOPERATIVE_OPERATIONS = { gear_cutting: {
	id: "gear_cutting",
	nameRu: "Зубонарезка / Нарезка шлицев",
	descriptionRu: "Нарезка прямозубых и косозубых шестерен, шлицевых валов и шпоночных пазов",
	pricePerPiece: 600,
	minBatchCharge: 0
} };
var COOPERATIVE_OPERATIONS_LIST = Object.values(COOPERATIVE_OPERATIONS);
var BATCH_DISCOUNT_TIERS = [
	{
		minQty: 1,
		maxQty: 4,
		discount: 0,
		multiplier: 1
	},
	{
		minQty: 5,
		maxQty: 19,
		discount: .1,
		multiplier: .9
	},
	{
		minQty: 20,
		maxQty: 49,
		discount: .2,
		multiplier: .8
	},
	{
		minQty: 50,
		maxQty: 99,
		discount: .3,
		multiplier: .7
	},
	{
		minQty: 100,
		maxQty: Infinity,
		discount: .4,
		multiplier: .6
	}
];
var URGENCIES = {
	standard: {
		id: "standard",
		nameRu: "Стандартный срок",
		leadTimeRu: "до 2 недель",
		multiplier: 1
	},
	express: {
		id: "express",
		nameRu: "Срочный заказ",
		leadTimeRu: "48–72 часа (+50%)",
		multiplier: 1.5
	}
};
var URGENCIES_LIST = Object.values(URGENCIES);
/**
* Returns batch discount tier for a specified quantity.
*/
function getBatchDiscountTier(quantity) {
	const safeQty = Math.max(1, Math.floor(quantity));
	return BATCH_DISCOUNT_TIERS.find((tier) => safeQty >= tier.minQty && safeQty <= tier.maxQty) ?? BATCH_DISCOUNT_TIERS[0];
}
// src/lib/calculator/engine.ts
/**
* High-performance, energy-efficient O(1) CNC Machining Cost Estimation Engine.
* Formulated from empirical Kaliningrad industrial market benchmarks.
*/
/**
* Pure, side-effect-free, deterministic O(1) quote calculation.
*/
function calculateCncQuote(input) {
	const quantity = Math.max(1, Math.floor(input.batchQuantity || 1));
	const length = Math.max(1, input.blankLengthMm || 10);
	const width = Math.max(1, input.blankWidthMm || 10);
	const height = Math.max(1, input.blankHeightMm || 10);
	const operation = OPERATIONS[input.operationId] ?? OPERATIONS.lathe_turning;
	const complexity = SETUP_COMPLEXITIES[input.complexityId] ?? SETUP_COMPLEXITIES.simple;
	const material = MATERIALS[input.materialId] ?? MATERIALS.steel_45;
	const tolerance = TOLERANCES[input.toleranceId] ?? TOLERANCES.standard;
	const urgency = URGENCIES[input.urgencyId] ?? URGENCIES.standard;
	const isRound = input.partType === "round" || operation.id === "lathe_turning";
	let blankVolumeCm3;
	if (isRound) {
		const radius = Math.max(width, height) / 2;
		blankVolumeCm3 = Math.PI * radius * radius * length / 1e3;
	} else blankVolumeCm3 = length * width * height / 1e3;
	const blankMassKg = blankVolumeCm3 * material.density * SAWING_ALLOWANCE_FACTOR / 1e3;
	const unitMaterialCost = input.isCustomerMaterial ? 0 : Math.round(blankMassKg * material.pricePerKg);
	const totalMaterialCost = unitMaterialCost * quantity;
	const cycleTimeHours = input.customCycleTimeMinutes && input.customCycleTimeMinutes > 0 ? input.customCycleTimeMinutes / 60 : operation.defaultCycleTimeHours;
	const discountTier = getBatchDiscountTier(quantity);
	const batchDiscountPercent = Math.round(discountTier.discount * 100);
	const complexityMultiplier = 1 + complexity.percent / 100;
	const unitMachiningCost = Math.round(cycleTimeHours * operation.ratePerHour * material.machinabilityK * tolerance.multiplier * complexityMultiplier * discountTier.multiplier);
	const totalMachiningCost = unitMachiningCost * quantity;
	const totalSetupCost = complexity.fee;
	const totalEngineeringCost = Math.max(0, input.engineeringHours || 0) * OPERATIONS.engineering.ratePerHour;
	const selectedCoopIds = input.cooperativeOpIds || [];
	const cooperativeBreakdown = [];
	let totalCooperativeCost = 0;
	for (const opId of selectedCoopIds) {
		const coop = COOPERATIVE_OPERATIONS[opId];
		if (!coop) continue;
		const perPieceCost = coop.pricePerPiece * quantity;
		const finalOpCost = Math.max(coop.minBatchCharge, perPieceCost);
		const appliedMinCharge = coop.minBatchCharge > perPieceCost;
		cooperativeBreakdown.push({
			id: coop.id,
			nameRu: coop.nameRu,
			cost: finalOpCost,
			appliedMinCharge
		});
		totalCooperativeCost += finalOpCost;
	}
	const subtotalBeforeUrgency = totalMaterialCost + totalMachiningCost + totalSetupCost + totalEngineeringCost + totalCooperativeCost;
	const urgencyMultiplier = urgency.multiplier;
	const rawTotal = Math.round(subtotalBeforeUrgency * urgencyMultiplier);
	const urgencySurcharge = rawTotal - subtotalBeforeUrgency;
	const isMinimumOrderApplied = rawTotal < MINIMUM_ORDER_VALUE;
	const finalTotal = isMinimumOrderApplied ? MINIMUM_ORDER_VALUE : Math.round(rawTotal / 10) * 10;
	const unitSetupCostAmortized = Math.round(totalSetupCost / quantity * 10) / 10;
	const unitEngineeringCostAmortized = Math.round(totalEngineeringCost / quantity * 10) / 10;
	const unitCooperativeCostAmortized = Math.round(totalCooperativeCost / quantity * 10) / 10;
	const unitPriceWithoutUrgency = Math.round(subtotalBeforeUrgency / quantity * 10) / 10;
	const finalUnitPrice = Math.round(finalTotal / quantity * 10) / 10;
	let recommendedBatchForMov = quantity;
	let recommendedBatchUnitCost = finalUnitPrice;
	if (isMinimumOrderApplied) for (let testQty = quantity + 1; testQty <= 200; testQty++) {
		const testResult = calculateCncQuote({
			...input,
			batchQuantity: testQty
		});
		if (!testResult.isMinimumOrderApplied) {
			recommendedBatchForMov = testQty;
			recommendedBatchUnitCost = testResult.finalUnitPrice;
			break;
		}
	}
	return {
		blankVolumeCm3: Math.round(blankVolumeCm3 * 100) / 100,
		blankMassKg: Math.round(blankMassKg * 1e3) / 1e3,
		unitMaterialCost,
		unitMachiningCycleMinutes: Math.round(cycleTimeHours * 60),
		unitMachiningCost,
		unitSetupCostAmortized,
		unitEngineeringCostAmortized,
		unitCooperativeCostAmortized,
		unitPriceWithoutUrgency,
		finalUnitPrice,
		totalBatchQuantity: quantity,
		totalMaterialCost,
		totalMachiningCost,
		totalSetupCost,
		totalEngineeringCost,
		totalCooperativeCost,
		cooperativeBreakdown,
		subtotalBeforeUrgency,
		urgencyMultiplier,
		urgencySurcharge,
		rawTotal,
		finalTotal,
		isMinimumOrderApplied,
		minimumOrderThreshold: MINIMUM_ORDER_VALUE,
		recommendedBatchForMov,
		recommendedBatchUnitCost,
		batchDiscountPercent,
		selectedOperationName: operation.nameRu,
		selectedMaterialName: `${material.nameRu} (${material.gradeRu})`,
		selectedToleranceName: `${tolerance.nameRu} [${tolerance.roughnessRa}]`,
		selectedUrgencyName: urgency.nameRu
	};
}
// src/lib/components/CostCalculator.svelte
function CostCalculator($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { initialOperation = "lathe_turning", showTitle = true, onQuoteCalculated } = $$props;
		let operationId = "lathe_turning";
		let batchQuantity = 10;
		let complexityId = "simple";
		let materialId = "steel_45";
		let isCustomerMaterial = false;
		let blankLengthMm = 100;
		let blankWidthMm = 50;
		let blankHeightMm = 50;
		let toleranceId = "high_precision_grinding";
		let cooperativeOpIds = [];
		let urgencyId = "standard";
		let engineeringHours = 0;
		let isParsingCad = false;
		let isLathe = derived(() => true);
		let quote = derived(() => calculateCncQuote({
			operationId,
			batchQuantity,
			complexityId,
			materialId,
			isCustomerMaterial,
			blankLengthMm,
			blankWidthMm,
			blankHeightMm,
			toleranceId,
			cooperativeOpIds,
			urgencyId,
			engineeringHours
		}));
		$$renderer.push(`<div class="calculator-root">`);
		if (showTitle) $$renderer.push(`<!--[0--><div class="mb-8 border-b border-[var(--color-rule)] pb-4"><h2 class="text-xl text-[var(--color-ink)] sm:text-2xl">Инженерный калькулятор стоимости ЧПУ</h2> <p class="mt-1 text-xs text-[var(--color-muted)] sm:text-sm">Мгновенный расчет себестоимости партии деталей на 2 обрабатывающих центрах ЧПУ с учетом времени цикла, материала и
				серийной скидки. Доставка по всей Калининградской области. Базовый порог заказа — 5 000 ₽ с НДС 22%.</p></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="grid grid-cols-1 gap-8 lg:grid-cols-12"><div class="space-y-6 lg:col-span-7"><div><label for="calc-operation" class="mb-2 block text-xs font-normal text-[var(--color-muted)]">1. Вид механической обработки:</label> <div class="grid grid-cols-1 gap-2 sm:grid-cols-2"><!--[-->`);
		const each_array = ensure_array_like(OPERATIONS_LIST);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let op = each_array[$$index];
			$$renderer.push(`<button type="button"${attr_class(`flex flex-col justify-between rounded-[var(--radius-card)] border p-3.5 text-left transition-all ${operationId === op.id ? "border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]" : "border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]"}`)}><span class="text-xs font-normal text-[var(--color-ink)]">${escape_html(op.shortNameRu)}</span> <span class="num mt-1 text-xs text-[var(--color-muted)]">${escape_html(op.ratePerHour.toLocaleString("ru-RU"))}<span class="u"> ₽ / нормо-час</span></span></button>`);
		}
		$$renderer.push(`<!--]--></div></div> <div><div class="mb-2 flex items-center justify-between"><label for="batch-qty-slider" class="text-xs font-normal text-[var(--color-muted)]">2. Количество деталей (шт.):</label> <div class="flex items-center gap-2">`);
		if (quote().batchDiscountPercent > 0) $$renderer.push(`<!--[0--><span class="num text-xs text-[var(--color-accent)]">Скидка за серию: -${escape_html(quote().batchDiscountPercent)}%</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input type="number" min="1" max="5000"${attr("value", batchQuantity)} class="num w-24 rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2.5 py-1 text-right text-sm text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"/></div></div> <input id="batch-qty-slider" type="range" min="1" max="200"${attr("value", batchQuantity)} class="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-paper-2)] accent-[var(--color-accent)]"/> <div class="mt-2 grid grid-cols-5 gap-1 text-center text-[10px]"><div${attr_class(`rounded border px-1 py-1 transition-colors border-[var(--color-rule)] text-[var(--color-muted)]`)}>1–4 шт.<br/><span class="opacity-80">0%</span></div> <div${attr_class(`rounded border px-1 py-1 transition-colors border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium`)}>5–19 шт.<br/><span class="opacity-80">-10%</span></div> <div${attr_class(`rounded border px-1 py-1 transition-colors border-[var(--color-rule)] text-[var(--color-muted)]`)}>20–49 шт.<br/><span class="opacity-80">-20%</span></div> <div${attr_class(`rounded border px-1 py-1 transition-colors border-[var(--color-rule)] text-[var(--color-muted)]`)}>50–99 шт.<br/><span class="opacity-80">-30%</span></div> <div${attr_class(`rounded border px-1 py-1 transition-colors border-[var(--color-rule)] text-[var(--color-muted)]`)}>100+ шт.<br/><span class="opacity-80">-40%</span></div></div></div> <div><label for="calc-complexity" class="mb-2 block text-xs font-normal text-[var(--color-muted)]">3. Сложность детали (наценка в процентах):</label> <div class="grid grid-cols-1 gap-2 sm:grid-cols-3"><!--[-->`);
		const each_array_1 = ensure_array_like(SETUP_COMPLEXITIES_LIST);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let comp = each_array_1[$$index_1];
			$$renderer.push(`<button type="button"${attr_class(`rounded-[var(--radius-card)] border p-3 text-left transition-all ${complexityId === comp.id ? "border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]" : "border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]"}`)}><div class="flex items-center justify-between text-xs font-normal text-[var(--color-ink)]"><span>${escape_html(comp.nameRu)}</span> <span class="rounded bg-[var(--color-accent)]/15 px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-accent)]">+${escape_html(comp.percent)}%</span></div> <div class="mt-1 line-clamp-2 text-[11px] text-[var(--color-muted)]">${escape_html(comp.descriptionRu)}</div></button>`);
		}
		$$renderer.push(`<!--]--></div></div> <div><div class="mb-2 flex items-center justify-between"><label for="material-select" class="text-xs font-normal text-[var(--color-muted)]">4. Марка металла / материала:</label> <label class="flex cursor-pointer items-center gap-1.5 text-xs text-[var(--color-muted)]"><input type="checkbox"${attr("checked", isCustomerMaterial, true)} class="rounded-sm border-[var(--color-rule-2)] bg-[var(--color-paper)] accent-[var(--color-accent)]"/> <span>Металл заказчика (0 ₽)</span></label></div> `);
		$$renderer.select({
			id: "material-select",
			value: materialId,
			class: "w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-3.5 py-2.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
		}, ($$renderer) => {
			$$renderer.push(`<!--[-->`);
			const each_array_2 = ensure_array_like(MATERIALS_LIST);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let mat = each_array_2[$$index_2];
				$$renderer.option({
					value: mat.id,
					class: "bg-[var(--color-paper)] text-[var(--color-ink)]"
				}, ($$renderer) => {
					$$renderer.push(`${escape_html(mat.nameRu)} (${escape_html(mat.gradeRu)}) — ${escape_html(mat.pricePerKg)} ₽/кг, K=${escape_html(mat.machinabilityK)}`);
				});
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`</div> <div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4"><div class="mb-3 flex flex-wrap items-center justify-between gap-2"><span class="text-xs font-normal text-[var(--color-muted)]">5. Размеры заготовки (мм):</span> <label class="btn btn--sm btn--line inline-flex cursor-pointer items-center gap-1.5 text-xs"><span>${escape_html("Прикрепить чертеж / STEP")}</span> <input type="file" accept=".step,.stp,.iges,.igs,.pdf,.dwg,.dxf,.png,.jpg,.jpeg,.stl" data-testid="cad-file-input" class="hidden"${attr("disabled", isParsingCad, true)}/></label></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="grid grid-cols-3 gap-3"><div><label for="dim-length" class="block text-[11px] text-[var(--color-muted)]">Длина L (мм):</label> <input id="dim-length" type="number" min="5" max="3000"${attr("value", blankLengthMm)} class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"/></div> <div><label for="dim-width" class="block text-[11px] text-[var(--color-muted)]">${escape_html(isLathe() ? "Диаметр ⌀ (мм):" : "Ширина W (мм):")}</label> <input id="dim-width" type="number" min="5" max="1000"${attr("value", blankWidthMm)} class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"/></div> <div><label for="dim-height" class="block text-[11px] text-[var(--color-muted)]">${escape_html(isLathe() ? "Толщ. стенки / H (мм):" : "Высота H (мм):")}</label> <input id="dim-height" type="number" min="5" max="1000"${attr("value", blankHeightMm)}${attr("disabled", isLathe(), true)} class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none disabled:opacity-40"/></div></div> <div class="mt-2.5 flex items-center justify-between text-xs text-[var(--color-muted)]"><span>Масса заготовки: <strong class="num font-normal text-[var(--color-ink)]">${escape_html(quote().blankMassKg)}<span class="u"> кг</span></strong>/шт</span> <span>Объем: <strong class="num font-normal text-[var(--color-ink)]">${escape_html(quote().blankVolumeCm3)}<span class="u"> см³</span></strong></span></div></div> <div><div class="mb-2 flex items-center justify-between"><label for="tolerance-select" class="text-xs font-normal text-[var(--color-muted)]">6. Квалитет точности (без наценки):</label> <span class="text-[11px] text-[var(--color-accent)]">0% наценка за точность IT7</span></div> <div class="grid grid-cols-1 gap-2 sm:grid-cols-3"><!--[-->`);
		const each_array_3 = ensure_array_like(TOLERANCES_LIST);
		for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
			let tol = each_array_3[$$index_3];
			$$renderer.push(`<button type="button"${attr_class(`rounded-[var(--radius-card)] border p-3 text-left transition-all ${toleranceId === tol.id ? "border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]" : "border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]"}`)}><div class="text-xs font-normal text-[var(--color-ink)]">${escape_html(tol.nameRu)}</div> <div class="num mt-1 text-xs text-[var(--color-muted)]">${escape_html(tol.roughnessRa)}</div></button>`);
		}
		$$renderer.push(`<!--]--></div></div> `);
		if (COOPERATIVE_OPERATIONS_LIST.length > 0) {
			$$renderer.push(`<!--[0--><div><span class="mb-2 block text-xs font-normal text-[var(--color-muted)]">7. Дополнительные операции:</span> <div class="space-y-2"><!--[-->`);
			const each_array_4 = ensure_array_like(COOPERATIVE_OPERATIONS_LIST);
			for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
				let coop = each_array_4[$$index_4];
				$$renderer.push(`<label class="flex cursor-pointer items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3 transition-colors hover:border-[var(--color-rule-2)]"><input type="checkbox"${attr("checked", cooperativeOpIds.includes(coop.id), true)} class="mt-0.5 h-4 w-4 rounded-sm border-[var(--color-rule-2)] bg-[var(--color-paper)] accent-[var(--color-accent)]"/> <div class="flex-1"><div class="flex items-center justify-between"><span class="text-xs font-normal text-[var(--color-ink)]">${escape_html(coop.nameRu)}</span> <span class="num text-xs text-[var(--color-muted)]">+${escape_html(coop.pricePerPiece)}<span class="u"> ₽/шт</span></span></div> <p class="mt-0.5 text-[11px] text-[var(--color-muted)]">${escape_html(coop.descriptionRu)}</p></div></label>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div><label for="urgency-select" class="mb-2 block text-xs font-normal text-[var(--color-muted)]">8. Срок выполнения заказа:</label> <div class="grid grid-cols-1 gap-2 sm:grid-cols-2"><!--[-->`);
		const each_array_5 = ensure_array_like(URGENCIES_LIST);
		for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
			let urg = each_array_5[$$index_5];
			$$renderer.push(`<button type="button"${attr_class(`rounded-[var(--radius-card)] border p-3 text-left transition-all ${urgencyId === urg.id ? "border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]" : "border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]"}`)}><div class="flex items-center justify-between text-xs font-normal text-[var(--color-ink)]"><span>${escape_html(urg.nameRu)}</span> `);
			if (urg.multiplier > 1) $$renderer.push(`<!--[0--><span class="rounded bg-[var(--color-accent)]/15 px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-accent)]">+${escape_html(Math.round((urg.multiplier - 1) * 100))}%</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="num mt-1 text-xs text-[var(--color-muted)]">${escape_html(urg.leadTimeRu)}</div></button>`);
		}
		$$renderer.push(`<!--]--></div></div></div> <div class="lg:col-span-5"><div class="sticky top-20 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 shadow-xl ticks"><div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-4"><span class="text-xs font-normal text-[var(--color-muted)]">Смета партии (${escape_html(batchQuantity)} шт.)</span> <span class="font-mono text-xs text-[var(--color-accent)]">${escape_html(quote().batchDiscountPercent > 0 ? `Скидка ${quote().batchDiscountPercent}%` : "Базовый тариф")}</span></div> <div class="py-6 text-center"><div class="num text-4xl text-[var(--color-ink)] tracking-tight sm:text-5xl">${escape_html(quote().finalTotal.toLocaleString("ru-RU"))} ₽</div> <div class="num mt-2 text-xs text-[var(--color-muted)]">Цена за единицу: <span class="font-normal text-[var(--color-ink)]">${escape_html(quote().finalUnitPrice.toLocaleString("ru-RU"))} ₽/шт</span> (с НДС 22%)</div></div> `);
		if (quote().isMinimumOrderApplied) $$renderer.push(`<!--[0--><div data-testid="mov-alert" class="mb-4 rounded-[var(--radius-card)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-3 text-xs text-[var(--color-ink)]"><div class="flex items-center justify-between font-normal text-[var(--color-accent)]"><span>Базовый порог заказа</span> <span class="num">5 000 ₽</span></div> <p class="mt-1 text-[11px] leading-relaxed text-[var(--color-ink-2)]">В расчет включена стоимость переналадки станка ЧПУ. При тираже <strong class="font-normal text-[var(--color-ink)]">${escape_html(quote().recommendedBatchForMov)} шт.</strong> цена за штуку снизится до <strong class="font-normal text-[var(--color-accent)]">${escape_html(quote().recommendedBatchUnitCost.toLocaleString("ru-RU"))} ₽</strong>.</p> <button type="button" class="mt-2 text-[11px] text-[var(--color-accent)] underline hover:no-underline">Увеличить партию до ${escape_html(quote().recommendedBatchForMov)} шт. →</button></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs"><div class="flex justify-between text-[var(--color-muted)]"><span>Металл / заготовки:</span> <span class="num text-[var(--color-ink)]">${escape_html(`${quote().totalMaterialCost.toLocaleString("ru-RU")} ₽`)}</span></div> <div class="flex justify-between text-[var(--color-muted)]"><span>Механообработка ЧПУ:</span> <span class="num text-[var(--color-ink)]">${escape_html(quote().totalMachiningCost.toLocaleString("ru-RU"))} ₽ `);
		if (quote().batchDiscountPercent > 0) $$renderer.push(`<!--[0--><span class="text-[var(--color-accent)]">(-${escape_html(quote().batchDiscountPercent)}%)</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></span></div> <div class="flex justify-between text-[var(--color-muted)]"><span>Наладка, оснастка и УП:</span> <span class="num text-[var(--color-ink)]">${escape_html((quote().totalSetupCost + quote().totalEngineeringCost).toLocaleString("ru-RU"))} ₽</span></div> `);
		if (quote().totalCooperativeCost > 0) $$renderer.push(`<!--[0--><div class="flex justify-between text-[var(--color-muted)]"><span>Дополнительные операции:</span> <span class="num text-[var(--color-ink)]">${escape_html(quote().totalCooperativeCost.toLocaleString("ru-RU"))} ₽</span></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (quote().urgencySurcharge > 0) $$renderer.push(`<!--[0--><div class="flex justify-between text-[var(--color-muted)]"><span>Надбавка за срочность (48-72ч):</span> <span class="num text-[var(--color-ink)]">+${escape_html(quote().urgencySurcharge.toLocaleString("ru-RU"))} ₽</span></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="mt-6 space-y-2"><button type="button" class="btn btn--wide"><span>Отправить заявку в Яндекс.Форму</span></button> <button type="button" class="btn btn--wide btn--line"><span>Скачать смету (.TXT)</span></button></div> <div class="mt-5 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 text-[11px] text-[var(--color-muted)]"><div class="font-normal text-[var(--color-ink)]">Гарантии цеха MetalProm39:</div> <ul class="mt-1 list-inside list-disc space-y-1 text-[var(--color-muted)]"><li>Безналичный расчет с НДС 22% (юр. лица, ИП) и для физ. лиц</li> <li>Станочный парк: 2 обрабатывающих центра с ЧПУ</li> <li>100% контроль ОТК цифровым инструментом (до IT7, без наценки)</li> <li>Сертификаты на заводской металлопрокат по ГОСТ</li> <li>Доставка по всей Калининградской области</li></ul></div></div></div></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
export { CostCalculator as t };

//# sourceMappingURL=CostCalculator.js.map