<script lang="ts">
	import { siteConfig } from '#lib/config/site';
	import { WORKSHOP_SPECS } from '#lib/content/workshop-specs';
	import {
		OPERATIONS,
		OPERATIONS_LIST,
		SETUP_COMPLEXITIES,
		SETUP_COMPLEXITIES_LIST,
		MATERIALS,
		MATERIALS_LIST,
		TOLERANCES,
		TOLERANCES_LIST,
		COOPERATIVE_OPERATIONS,
		COOPERATIVE_OPERATIONS_LIST,
		URGENCIES,
		URGENCIES_LIST,
		MINIMUM_ORDER_VALUE
	} from '#lib/calculator/pricing-config';
	import {
		calculateCncQuote,
		type CalculationResult,
		type CooperativeItemBreakdown
	} from '#lib/calculator/engine';
	import { parseCadFile, type CadDimensions } from '#lib/workers/cad-parser';
	import { trackOrderSubmission, syncCalculatorInteractionDebounced, trackCalculatorInteraction, reachMetrikaGoal } from '#lib/analytics/metrika';
	
	// Component Props
	interface Props {
		initialOperation?: string;
		showTitle?: boolean;
		onQuoteCalculated?: (result: CalculationResult) => void;
	}

	let { initialOperation = 'lathe_turning', showTitle = true, onQuoteCalculated }: Props = $props();

	// Reactive State
	let operationId = $state('lathe_turning');
	$effect(() => {
		if (initialOperation) {
			operationId = initialOperation;
		}
	});

	let batchQuantity = $state(10);
	let complexityId = $state('simple');
	let materialId = $state('steel_45');
	let isCustomerMaterial = $state(false);

	let blankLengthMm = $state(100);
	let blankWidthMm = $state(50);
	let blankHeightMm = $state(50);

	let toleranceId = $state('high_precision_grinding');
	let cooperativeOpIds = $state<string[]>([]);
	let urgencyId = $state('standard');
	let engineeringHours = $state(0);
	
	// Modal State (Production Capacity & Direct Demand Queue)
	let isOrderModalOpen = $state(false);

	// CAD / Drawing upload state
	let isParsingCad = $state(false);
	let cadParseError = $state<string | null>(null);
	let parsedCadInfo = $state<CadDimensions | null>(null);
	let cadFileName = $state<string | null>(null);

	// Convenience derived flags
	let isLathe = $derived(operationId === 'lathe_turning');

	// Reactive calculation result
	let quote = $derived(
		calculateCncQuote({
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
		})
	);

	// Emit calculation updates to parent and sync visit parameters to Yandex Metrika
	$effect(() => {
		if (onQuoteCalculated) {
			onQuoteCalculated(quote);
		}
		syncCalculatorInteractionDebounced({
			operation: quote.selectedOperationName,
			material: quote.selectedMaterialName,
			quantity: batchQuantity,
			complexity: SETUP_COMPLEXITIES[complexityId]?.nameRu || complexityId,
			dimensions: `${blankLengthMm}x${blankWidthMm}x${blankHeightMm} мм`,
			tolerance: quote.selectedToleranceName,
			urgency: URGENCIES[urgencyId]?.nameRu || urgencyId,
			isCustomerMaterial,
			hasGearCutting: cooperativeOpIds.includes('gear_cutting'),
			isFileAttached: !!cadFileName,
			totalRub: quote.finalTotal,
			unitRub: quote.finalUnitPrice,
			discountPercent: quote.batchDiscountPercent
		});
	});

	function toggleCooperativeOp(opId: string) {
		trackCalculatorInteraction('toggle_cooperative_op', opId);
		if (cooperativeOpIds.includes(opId)) {
			cooperativeOpIds = cooperativeOpIds.filter((id) => id !== opId);
		} else {
			cooperativeOpIds = [...cooperativeOpIds, opId];
		}
	}

	function applySuggestedBatch() {
		if (quote.recommendedBatchForMov > batchQuantity) {
			batchQuantity = quote.recommendedBatchForMov;
		}
	}

	function applyCadDimensions(dims: CadDimensions) {
		if (
			isLathe &&
			dims.isRotationalSymmetric &&
			dims.suggestedDiameterMm &&
			dims.suggestedLengthMm
		) {
			blankLengthMm = Math.max(5, Math.round(dims.suggestedLengthMm));
			blankWidthMm = Math.max(5, Math.round(dims.suggestedDiameterMm));
			blankHeightMm = blankWidthMm;
		} else if (!dims.is2dDrawing) {
			blankLengthMm = Math.max(5, Math.round(dims.lengthMm));
			blankWidthMm = Math.max(5, Math.round(dims.widthMm));
			blankHeightMm = Math.max(5, Math.round(dims.heightMm));
		}
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		cadParseError = null;
		parsedCadInfo = null;
		cadFileName = file.name;
		isParsingCad = true;

		try {
			const dims = await parseCadFile(file);
			parsedCadInfo = dims;
			if (!dims.is2dDrawing) {
				applyCadDimensions(dims);
			}
		} catch (err) {
			cadParseError =
				err instanceof Error
					? err.message
					: 'Не удалось проанализировать файл. Вы можете ввести габариты детали вручную.';
		} finally {
			isParsingCad = false;
			target.value = '';
		}
	}

	function clearCadModel() {
		parsedCadInfo = null;
		cadFileName = null;
		cadParseError = null;
	}

	function handleOrderSubmit() {
		trackOrderSubmission({
			operation: quote.selectedOperationName,
			material: quote.selectedMaterialName,
			quantity: batchQuantity,
			complexity: SETUP_COMPLEXITIES[complexityId]?.nameRu || complexityId,
			dimensions: `${blankLengthMm}x${blankWidthMm}x${blankHeightMm} мм`,
			tolerance: quote.selectedToleranceName,
			urgency: URGENCIES[urgencyId]?.nameRu || urgencyId,
			isCustomerMaterial,
			hasGearCutting: cooperativeOpIds.includes('gear_cutting'),
			isFileAttached: !!cadFileName,
			totalRub: quote.finalTotal,
			unitRub: quote.finalUnitPrice,
			discountPercent: quote.batchDiscountPercent
		});
		isOrderModalOpen = true;
	}

	function downloadQuoteEstimate() {
		const now = new Date();
		const dateStr = now.toLocaleDateString('ru-RU');
		const vatAmount = Math.round((quote.finalTotal * 22) / 122);

		const lines = [
			'======================================================================',
			'                  МЕТАЛЛПРОМ39 · МЕТАЛЛООБРАБОТКА ЧПУ                  ',
			'               РАСЧЕТ СТОИМОСТИ И КОММЕРЧЕСКАЯ СМЕТА                 ',
			'======================================================================',
			`Дата формирования:    ${dateStr}`,
			`Статус:               Предварительный инженерный расчет`,
			`Срок действия сметы:  14 календарных дней`,
			'----------------------------------------------------------------------',
			'1. ПАРАМЕТРЫ ДЕТАЛИ И МАТЕРИАЛА:',
			'----------------------------------------------------------------------',
			`· Вид обработки:      ${quote.selectedOperationName}`,
			`· Материал:           ${quote.selectedMaterialName}`,
			`· Давальческий металл:${isCustomerMaterial ? ' Да (металл заказчика)' : ' Нет (сертифицированный металл цеха)'}`,
			`· Габариты заготовки: ${blankLengthMm} × ${blankWidthMm} × ${blankHeightMm} мм`,
			`· Расчетная масса:    ${quote.blankMassKg} кг/шт (объем ${quote.blankVolumeCm3} см³)`,
			`· Требуемый квалитет: ${quote.selectedToleranceName} (без наценки)`,
			`· Категория сложности:${SETUP_COMPLEXITIES[complexityId]?.nameRu}`,
			`· Срок изготовления:  ${URGENCIES[urgencyId]?.nameRu} (${URGENCIES[urgencyId]?.leadTimeRu})`,
			cadFileName ? `· Прикрепленный файл: ${cadFileName}` : '· Чертеж / CAD:       Параметрический расчет'
		];

		lines.push(
			'----------------------------------------------------------------------',
			'2. СТОИМОСТЬ И ОБЪЕМ ПАРТИИ:',
			'----------------------------------------------------------------------',
			`· Объем партии:       ${batchQuantity} шт.`,
			`· Серийная скидка:    ${quote.batchDiscountPercent > 0 ? `-${quote.batchDiscountPercent}%` : '0% (базовый тариф)'}`,
			`· Стоимость заготовок:${quote.totalMaterialCost.toLocaleString('ru-RU')} ₽`,
			`· Механообработка:    ${quote.totalMachiningCost.toLocaleString('ru-RU')} ₽`,
			`· Наладка, УП, оснастка: ${(quote.totalSetupCost + quote.totalEngineeringCost).toLocaleString('ru-RU')} ₽`
		);

		if (quote.totalCooperativeCost > 0) {
			lines.push(`· Доп. операции:      ${quote.totalCooperativeCost.toLocaleString('ru-RU')} ₽`);
		}
		if (quote.urgencySurcharge > 0) {
			lines.push(`· Срочность заказа:   +${quote.urgencySurcharge.toLocaleString('ru-RU')} ₽`);
		}

		lines.push(
			'----------------------------------------------------------------------',
			`ИТОГО ЗА ПАРТИЮ:      ${quote.finalTotal.toLocaleString('ru-RU')} ₽ (включая НДС 22%)`,
			`В ТОМ ЧИСЛЕ НДС 22%:  ${vatAmount.toLocaleString('ru-RU')} ₽`,
			`ЦЕНА ЗА 1 ШТУКУ:      ${quote.finalUnitPrice.toLocaleString('ru-RU')} ₽ (включая НДС 22%)`,
			'======================================================================',
			'3. ПРОИЗВОДСТВЕННЫЕ УСЛОВИЯ И ГАРАНТИИ:',
			'----------------------------------------------------------------------',
			'1. Оплата: безналичный расчет с выделением НДС 22% (для юридических лиц',
			'   и ИП), а также безналичный расчет для физических лиц.',
			'2. Станочный парк: 2 обрабатывающих центра с ЧПУ (токарный и фрезерный 3 оси).',
			'3. Контроль качества: 100% контроль ОТК калиброванным цифровым инструментом',
			'   (допуск до IT7, шероховатость до Ra 1.25 мкм, без наценки за квалитет).',
			'4. Металлопрокат: только сертифицированный заводской прокат по ГОСТ.',
			'5. Доставка: по всей Калининградской области собственным транспортом',
			'   или курьерскими службами.',
			'======================================================================'
		);

		const textContent = lines.join('\n');
		const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `MetalProm39-Smeta-${Date.now()}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
</script>

<div class="calculator-root">
	{#if showTitle}
		<div class="mb-8 border-b border-[var(--color-rule)] pb-4">
			<h2 class="text-xl text-[var(--color-ink)] sm:text-2xl">
				Инженерный калькулятор стоимости ЧПУ
			</h2>
			<p class="mt-1 text-xs text-[var(--color-muted)] sm:text-sm">
				Мгновенный расчет себестоимости партии деталей на 2 обрабатывающих центрах ЧПУ с учетом времени цикла, материала и
				серийной скидки. Доставка по всей Калининградской области. Базовый порог заказа — 5&thinsp;000&thinsp;₽ с НДС 22%.
			</p>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
		<!-- Left / Interactive Controls Column -->
		<div class="space-y-6 lg:col-span-7">
			<!-- 1. Operation Selection -->
			<div>
				<label
					for="calc-operation"
					class="mb-2 block text-xs font-normal text-[var(--color-muted)]"
				>
					1. Вид механической обработки:
				</label>
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{#each OPERATIONS_LIST as op}
						<button
							type="button"
							class="flex flex-col justify-between rounded-[var(--radius-card)] border p-3.5 text-left transition-all {operationId ===
							op.id
								? 'border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
								: 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'}"
							onclick={() => {
								operationId = op.id;
								if (parsedCadInfo && !parsedCadInfo.is2dDrawing) {
									applyCadDimensions(parsedCadInfo);
								}
							}}
						>
							<span class="text-xs font-normal text-[var(--color-ink)]">{op.shortNameRu}</span>
							<span class="num mt-1 text-xs text-[var(--color-muted)]">
								{op.ratePerHour.toLocaleString('ru-RU')}<span class="u">
									&thinsp;₽&thinsp;/&thinsp;нормо-час</span
								>
							</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- 2. Quantity & Batch Discount -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<label for="batch-qty-slider" class="text-xs font-normal text-[var(--color-muted)]">
						2. Количество деталей (шт.):
					</label>
					<div class="flex items-center gap-2">
						{#if quote.batchDiscountPercent > 0}
							<span class="num text-xs text-[var(--color-accent)]">
								Скидка за серию: -{quote.batchDiscountPercent}%
							</span>
						{/if}
						<input
							type="number"
							min="1"
							max="5000"
							bind:value={batchQuantity}
							class="num w-24 rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2.5 py-1 text-right text-sm text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
						/>
					</div>
				</div>
				<input
					id="batch-qty-slider"
					type="range"
					min="1"
					max="200"
					bind:value={batchQuantity}
					class="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-paper-2)] accent-[var(--color-accent)]"
				/>
				<!-- Discount Tier Badges -->
				<div class="mt-2 grid grid-cols-5 gap-1 text-center text-[10px]">
					<div
						class="rounded border px-1 py-1 transition-colors {batchQuantity >= 1 && batchQuantity <= 4
							? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium'
							: 'border-[var(--color-rule)] text-[var(--color-muted)]'}"
					>
						1–4 шт.<br /><span class="opacity-80">0%</span>
					</div>
					<div
						class="rounded border px-1 py-1 transition-colors {batchQuantity >= 5 && batchQuantity <= 19
							? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium'
							: 'border-[var(--color-rule)] text-[var(--color-muted)]'}"
					>
						5–19 шт.<br /><span class="opacity-80">-10%</span>
					</div>
					<div
						class="rounded border px-1 py-1 transition-colors {batchQuantity >= 20 && batchQuantity <= 49
							? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium'
							: 'border-[var(--color-rule)] text-[var(--color-muted)]'}"
					>
						20–49 шт.<br /><span class="opacity-80">-20%</span>
					</div>
					<div
						class="rounded border px-1 py-1 transition-colors {batchQuantity >= 50 && batchQuantity <= 99
							? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium'
							: 'border-[var(--color-rule)] text-[var(--color-muted)]'}"
					>
						50–99 шт.<br /><span class="opacity-80">-30%</span>
					</div>
					<div
						class="rounded border px-1 py-1 transition-colors {batchQuantity >= 100
							? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium'
							: 'border-[var(--color-rule)] text-[var(--color-muted)]'}"
					>
						100+ шт.<br /><span class="opacity-80">-40%</span>
					</div>
				</div>
			</div>

			<!-- 3. Setup Complexity -->
			<div>
				<label
					for="calc-complexity"
					class="mb-2 block text-xs font-normal text-[var(--color-muted)]"
				>
					3. Сложность детали (наценка в процентах):
				</label>
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
					{#each SETUP_COMPLEXITIES_LIST as comp}
						<button
							type="button"
							class="rounded-[var(--radius-card)] border p-3 text-left transition-all {complexityId ===
							comp.id
								? 'border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
								: 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'}"
							onclick={() => (complexityId = comp.id)}
						>
							<div class="flex items-center justify-between text-xs font-normal text-[var(--color-ink)]">
								<span>{comp.nameRu}</span>
								<span class="rounded bg-[var(--color-accent)]/15 px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-accent)]">+{comp.percent}%</span>
							</div>
							<div class="mt-1 line-clamp-2 text-[11px] text-[var(--color-muted)]">
								{comp.descriptionRu}
							</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- 4. Material Selection -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<label for="material-select" class="text-xs font-normal text-[var(--color-muted)]">
						4. Марка металла / материала:
					</label>
					<label class="flex cursor-pointer items-center gap-1.5 text-xs text-[var(--color-muted)]">
						<input
							type="checkbox"
							data-testid="own-material-checkbox"
							bind:checked={isCustomerMaterial}
							class="rounded-sm border-[var(--color-rule-2)] bg-[var(--color-paper)] accent-[var(--color-accent)]"
						/>
						<span>Металл заказчика (0 ₽)</span>
					</label>
				</div>
				<select
					id="material-select"
					bind:value={materialId}
					class="w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-3.5 py-2.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
				>
					{#each MATERIALS_LIST as mat}
						<option value={mat.id} class="bg-[var(--color-paper)] text-[var(--color-ink)]">
							{mat.nameRu} ({mat.gradeRu}) — {mat.pricePerKg} ₽/кг, K={mat.machinabilityK}
						</option>
					{/each}
				</select>
			</div>

			<!-- 5. Blank Dimensions & File Upload (STEP / PDF / DXF) -->
			<div
				class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4"
			>
				<div class="mb-3 flex flex-wrap items-center justify-between gap-2">
					<span class="text-xs font-normal text-[var(--color-muted)]">
						5. Размеры заготовки (мм):
					</span>
					<!-- File Upload button for STEP, PDF, DXF, DWG -->
					<label
						class="btn btn--sm btn--line inline-flex cursor-pointer items-center gap-1.5 text-xs"
					>
						<span>{isParsingCad ? 'Обработка файла...' : 'Прикрепить чертеж / STEP'}</span>
						<input
							type="file"
							accept=".step,.stp,.iges,.igs,.pdf,.dwg,.dxf,.png,.jpg,.jpeg,.stl"
							data-testid="cad-file-input"
							class="hidden"
							onchange={handleFileUpload}
							disabled={isParsingCad}
						/>
					</label>
				</div>

				{#if cadParseError}
					<div
						data-testid="cad-error-alert"
						class="mb-3 rounded-[var(--radius-card)] border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 p-2.5 text-xs text-[var(--color-error)]"
					>
						<span class="font-normal">Ошибка CAD:</span>
						{cadParseError}
					</div>
				{/if}

				{#if parsedCadInfo}
					<div
						data-testid="cad-info-card"
						class="mb-3 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3.5 text-xs"
					>
						<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-2">
							<div class="flex items-center gap-2">
								<span
									class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-accent)]"
								>
									{parsedCadInfo.is2dDrawing ? 'ЧЕРТЕЖ' : parsedCadInfo.fileType === 'stl_binary' ? 'STL BINARY' : parsedCadInfo.fileType === 'stl_ascii' ? 'STL ASCII' : '3D STEP'}
								</span>
								<span class="truncate text-xs font-normal text-[var(--color-ink)]"
									>{cadFileName}</span
								>
							</div>
							<button
								type="button"
								data-testid="cad-clear-btn"
								class="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
								onclick={clearCadModel}
								title="Открепить файл"
							>
								✕
							</button>
						</div>

						{#if parsedCadInfo.is2dDrawing}
							<div class="mt-2 text-xs text-[var(--color-ink-2)]">
								<span class="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)] mr-1.5"></span>
								{parsedCadInfo.statusMessage || 'Чертеж успешно прикреплен. Задайте требуемые габариты в полях ниже.'}
							</div>
						{:else}
							<div class="mt-2 grid grid-cols-2 gap-2 text-[var(--color-muted)] sm:grid-cols-3">
								<div>
									Габариты 3D:
									<strong class="num block font-normal text-[var(--color-ink)]">
										{parsedCadInfo.boundingBox.dx.toFixed(1)} × {parsedCadInfo.boundingBox.dy.toFixed(
											1
										)} × {parsedCadInfo.boundingBox.dz.toFixed(1)}<span class="u">&thinsp;мм</span>
									</strong>
								</div>
								<div>
									Объем детали:
									<strong class="num block font-normal text-[var(--color-ink)]">
										{parsedCadInfo.volumeCm3.toFixed(2)}<span class="u">&thinsp;см³</span>
									</strong>
								</div>
								<div>
									Точек контура:
									<strong class="num block font-normal text-[var(--color-ink)]">
										{parsedCadInfo.triangleCount.toLocaleString('ru-RU')}<span class="u"
											>&thinsp;коорд.</span
										>
									</strong>
								</div>
							</div>
							{#if parsedCadInfo.isRotationalSymmetric}
								<div class="mt-2 border-t border-[var(--color-rule)] pt-2 text-[var(--color-muted)]">
									<span>Распознано тело вращения (токарная ЧПУ): </span>
									<strong class="num font-normal text-[var(--color-ink)]">
										⌀{parsedCadInfo.suggestedDiameterMm?.toFixed(1)} × {parsedCadInfo.suggestedLengthMm?.toFixed(1)} мм
									</strong>
								</div>
							{/if}
						{/if}
					</div>
				{/if}

				<div class="grid grid-cols-3 gap-3">
					<div>
						<label for="dim-length" class="block text-[11px] text-[var(--color-muted)]">
							Длина L (мм):
						</label>
						<input
							id="dim-length"
							type="number"
							min="5"
							max="3000"
							bind:value={blankLengthMm}
							class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
						/>
					</div>
					<div>
						<label for="dim-width" class="block text-[11px] text-[var(--color-muted)]">
							{isLathe ? 'Диаметр ⌀ (мм):' : 'Ширина W (мм):'}
						</label>
						<input
							id="dim-width"
							type="number"
							min="5"
							max="1000"
							bind:value={blankWidthMm}
							class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
						/>
					</div>
					<div>
						<label for="dim-height" class="block text-[11px] text-[var(--color-muted)]">
							{isLathe ? 'Толщ. стенки / H (мм):' : 'Высота H (мм):'}
						</label>
						<input
							id="dim-height"
							type="number"
							min="5"
							max="1000"
							bind:value={blankHeightMm}
							disabled={isLathe}
							class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none disabled:opacity-40"
						/>
					</div>
				</div>

				<div class="mt-2.5 flex items-center justify-between text-xs text-[var(--color-muted)]">
					<span>
						Масса заготовки:
						<strong class="num font-normal text-[var(--color-ink)]"
							>{quote.blankMassKg}<span class="u">&thinsp;кг</span></strong
						>/шт
					</span>
					<span>
						Объем:
						<strong class="num font-normal text-[var(--color-ink)]"
							>{quote.blankVolumeCm3}<span class="u">&thinsp;см³</span></strong
						>
					</span>
				</div>
			</div>

			<!-- 6. Tolerance Grade (IT7–IT12, Zero Surcharge Policy) -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<label
						for="tolerance-select"
						class="text-xs font-normal text-[var(--color-muted)]"
					>
						6. Квалитет точности (без наценки):
					</label>
					<span class="text-[11px] text-[var(--color-accent)]">0% наценка за точность IT7</span>
				</div>
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
					{#each TOLERANCES_LIST as tol}
						<button
							type="button"
							class="rounded-[var(--radius-card)] border p-3 text-left transition-all {toleranceId ===
							tol.id
								? 'border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
								: 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'}"
							onclick={() => (toleranceId = tol.id)}
						>
							<div class="text-xs font-normal text-[var(--color-ink)]">{tol.nameRu}</div>
							<div class="num mt-1 text-xs text-[var(--color-muted)]">{tol.roughnessRa}</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- 7. Cooperative Operations -->
			{#if COOPERATIVE_OPERATIONS_LIST.length > 0}
				<div>
					<span class="mb-2 block text-xs font-normal text-[var(--color-muted)]">
						7. Дополнительные операции:
					</span>
					<div class="space-y-2">
						{#each COOPERATIVE_OPERATIONS_LIST as coop}
							<label
								class="flex cursor-pointer items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3 transition-colors hover:border-[var(--color-rule-2)]"
							>
								<input
									type="checkbox"
									checked={cooperativeOpIds.includes(coop.id)}
									onchange={() => toggleCooperativeOp(coop.id)}
									class="mt-0.5 h-4 w-4 rounded-sm border-[var(--color-rule-2)] bg-[var(--color-paper)] accent-[var(--color-accent)]"
								/>
								<div class="flex-1">
									<div class="flex items-center justify-between">
										<span class="text-xs font-normal text-[var(--color-ink)]">{coop.nameRu}</span>
										<span class="num text-xs text-[var(--color-muted)]"
											>+{coop.pricePerPiece}<span class="u">&thinsp;₽/шт</span></span
										>
									</div>
									<p class="mt-0.5 text-[11px] text-[var(--color-muted)]">{coop.descriptionRu}</p>
								</div>
							</label>
						{/each}
					</div>
				</div>
			{/if}

			<!-- 8. Urgency & Production Schedule -->
			<div>
				<label for="urgency-select" class="mb-2 block text-xs font-normal text-[var(--color-muted)]">
					8. Срок выполнения заказа:
				</label>
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{#each URGENCIES_LIST as urg}
						<button
							type="button"
							class="rounded-[var(--radius-card)] border p-3 text-left transition-all {urgencyId ===
							urg.id
								? 'border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
								: 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'}"
							onclick={() => (urgencyId = urg.id)}
						>
							<div class="flex items-center justify-between text-xs font-normal text-[var(--color-ink)]">
								<span>{urg.nameRu}</span>
								{#if urg.multiplier > 1.0}
									<span class="rounded bg-[var(--color-accent)]/15 px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-accent)]"
										>+{Math.round((urg.multiplier - 1) * 100)}%</span
									>
								{/if}
							</div>
							<div class="num mt-1 text-xs text-[var(--color-muted)]">{urg.leadTimeRu}</div>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right / Sticky Summary Column -->
		<div class="lg:col-span-5">
			<div
				class="sticky top-20 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 shadow-xl ticks"
			>
				<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-4">
					<span class="text-xs font-normal text-[var(--color-muted)]">
						Смета партии ({batchQuantity} шт.)
					</span>
					<span class="font-mono text-xs text-[var(--color-accent)]">
						{quote.batchDiscountPercent > 0
							? `Скидка ${quote.batchDiscountPercent}%`
							: 'Базовый тариф'}
					</span>
				</div>

				<!-- Highlight Pricing Block -->
				<div class="py-6 text-center">
					<div data-testid="total-price" class="num text-4xl text-[var(--color-ink)] tracking-tight sm:text-5xl">
						{quote.finalTotal.toLocaleString('ru-RU')}&thinsp;₽
					</div>
					<div class="num mt-2 text-xs text-[var(--color-muted)]">
						Цена за единицу: <span class="font-normal text-[var(--color-ink)]"
							>{quote.finalUnitPrice.toLocaleString('ru-RU')}&thinsp;₽/шт</span
						> (с НДС 22%)
					</div>
				</div>

				<!-- Minimum Order Value (MOV) Callout -->
				{#if quote.isMinimumOrderApplied}
					<div
						data-testid="mov-alert"
						class="mb-4 rounded-[var(--radius-card)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-3 text-xs text-[var(--color-ink)]"
					>
						<div class="flex items-center justify-between font-normal text-[var(--color-accent)]">
							<span>Базовый порог заказа</span>
							<span class="num">5&thinsp;000&thinsp;₽</span>
						</div>
						<p class="mt-1 text-[11px] leading-relaxed text-[var(--color-ink-2)]">
							В расчет включена стоимость переналадки станка ЧПУ. При тираже
							<strong class="font-normal text-[var(--color-ink)]"
								>{quote.recommendedBatchForMov} шт.</strong
							>
							цена за штуку снизится до
							<strong class="font-normal text-[var(--color-accent)]"
								>{quote.recommendedBatchUnitCost.toLocaleString('ru-RU')}&thinsp;₽</strong
							>.
						</p>
						<button
							type="button"
							class="mt-2 text-[11px] text-[var(--color-accent)] underline hover:no-underline"
							onclick={applySuggestedBatch}
						>
							Увеличить партию до {quote.recommendedBatchForMov} шт. →
						</button>
					</div>
				{/if}

				<!-- Line Item Breakdown -->
				<div class="space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs">
					<div class="flex justify-between text-[var(--color-muted)]">
						<span>Металл / заготовки:</span>
						<span class="num text-[var(--color-ink)]">
							{isCustomerMaterial
								? 'Давальческий (0 ₽)'
								: `${quote.totalMaterialCost.toLocaleString('ru-RU')} ₽`}
						</span>
					</div>
					<div class="flex justify-between text-[var(--color-muted)]">
						<span>Механообработка ЧПУ:</span>
						<span class="num text-[var(--color-ink)]">
							{quote.totalMachiningCost.toLocaleString('ru-RU')} ₽
							{#if quote.batchDiscountPercent > 0}
								<span class="text-[var(--color-accent)]">(-{quote.batchDiscountPercent}%)</span>
							{/if}
						</span>
					</div>
					<div class="flex justify-between text-[var(--color-muted)]">
						<span>Наладка, оснастка и УП:</span>
						<span class="num text-[var(--color-ink)]">
							{(quote.totalSetupCost + quote.totalEngineeringCost).toLocaleString('ru-RU')} ₽
						</span>
					</div>
					{#if quote.totalCooperativeCost > 0}
						<div class="flex justify-between text-[var(--color-muted)]">
							<span>Дополнительные операции:</span>
							<span class="num text-[var(--color-ink)]">
								{quote.totalCooperativeCost.toLocaleString('ru-RU')} ₽
							</span>
						</div>
					{/if}
					{#if quote.urgencySurcharge > 0}
						<div class="flex justify-between text-[var(--color-muted)]">
							<span>Надбавка за срочность (48-72ч):</span>
							<span class="num text-[var(--color-ink)]">
								+{quote.urgencySurcharge.toLocaleString('ru-RU')} ₽
							</span>
						</div>
					{/if}
				</div>

				<!-- Action Buttons (Submit Demand + TXT Estimate) -->
				<div class="mt-6 space-y-2">
					<button
						type="button"
						class="btn btn--wide"
						onclick={handleOrderSubmit}
					>
						<span>Отправить спецификацию на расчет</span>
					</button>
					<button type="button" class="btn btn--wide btn--line" onclick={downloadQuoteEstimate}>
						<span>Скачать смету (.TXT)</span>
					</button>
				</div>

				<!-- Trust Guarantee Callout -->
				<div
					class="mt-5 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 text-[11px] text-[var(--color-muted)]"
				>
					<div class="font-normal text-[var(--color-ink)]">Гарантии цеха MetalProm39:</div>
					<ul class="mt-1 list-inside list-disc space-y-1 text-[var(--color-muted)]">
						<li>Безналичный расчет с НДС 22% (юр. лица, ИП) и для физ. лиц</li>
						<li>Станочный парк: 2 обрабатывающих центра с ЧПУ</li>
						<li>100% контроль ОТК цифровым инструментом (до IT7, без наценки)</li>
						<li>Сертификаты на заводской металлопрокат по ГОСТ</li>
						<li>Доставка по всей Калининградской области</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal Dialog with Capacity Status & Direct Metrika Tracking -->
{#if isOrderModalOpen}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 bg-[var(--color-paper)]/85 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div
			class="relative my-auto w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 sm:p-6 shadow-2xl ticks"
		>
			<div class="flex items-start justify-between border-b border-[var(--color-rule)] pb-4">
				<div>
					<div class="font-mono text-[10px] tracking-wider uppercase text-[var(--color-accent)]">
						Очередь производства · Калининград
					</div>
					<h3 id="modal-title" class="mt-1 text-lg font-normal text-[var(--color-ink)]">
						Спецификация партии зафиксирована
					</h3>
				</div>
				<button
					type="button"
					class="text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)] p-1"
					onclick={() => (isOrderModalOpen = false)}
					aria-label="Закрыть модальное окно"
				>
					✕
				</button>
			</div>

			<div class="mt-5 space-y-4 text-xs leading-relaxed text-[var(--color-muted)]">
				<div class="rounded-[var(--radius-card)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-3.5 text-xs text-[var(--color-ink)]">
					<div class="flex items-center gap-2 font-normal text-[var(--color-accent)]">
						<span class="live-dot" aria-hidden="true"></span>
						<span>Мощности станочного парка законтрактованы (100% загрузка)</span>
					</div>
					<p class="mt-2 text-[12px] leading-relaxed text-[var(--color-ink-2)]">
						Параметры вашей детали ({quote.selectedOperationName}, материал: {quote.selectedMaterialName}, тираж: {batchQuantity} шт., расчетная сумма: {quote.finalTotal.toLocaleString('ru-RU')} ₽ с НДС 22%) успешно зафиксированы в аналитике производственного спроса цеха.
					</p>
				<p class="mt-2 text-[11px] text-[var(--color-muted)]">
						В настоящий момент оба обрабатывающих центра с ЧПУ работают с максимальной загрузкой по долгосрочным контрактам. Новые коммерческие заявки регистрируются в резервный лист ожидания.
					</p>
				</div>

				<div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 space-y-1.5 font-mono text-[11px]">
					<div class="flex justify-between">
						<span class="text-[var(--color-muted)]">Операция:</span>
						<span class="text-[var(--color-ink)]">{quote.selectedOperationName}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-[var(--color-muted)]">Материал:</span>
						<span class="text-[var(--color-ink)]">{quote.selectedMaterialName}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-[var(--color-muted)]">Объем партии:</span>
						<span class="text-[var(--color-ink)] num">{batchQuantity} шт.</span>
					</div>
					<div class="flex justify-between">
						<span class="text-[var(--color-muted)]">Габариты:</span>
						<span class="text-[var(--color-ink)] num">{blankLengthMm} × {blankWidthMm} × {blankHeightMm} мм</span>
					</div>
					<div class="flex justify-between">
						<span class="text-[var(--color-muted)]">Точность:</span>
						<span class="text-[var(--color-accent)]">{quote.selectedToleranceName} (0% наценка)</span>
					</div>
					{#if cadFileName}
						<div class="flex justify-between border-t border-[var(--color-rule)] pt-1 text-[var(--color-accent)]">
							<span>Чертеж / модель:</span>
							<span class="truncate max-w-[200px]">{cadFileName}</span>
						</div>
					{/if}
					<div class="flex justify-between border-t border-[var(--color-rule)] pt-1 text-[var(--color-ink)] font-bold">
						<span>Расчетная сумма партии:</span>
						<span class="num text-[var(--color-accent)]">{quote.finalTotal.toLocaleString('ru-RU')} ₽ (вкл. НДС 22%)</span>
					</div>
				</div>

				<p class="text-[11px] text-[var(--color-muted)]">
					Вы можете скачать официальную инженерную смету в текстовом формате (.TXT) с детальной раскладкой норма-часов, затрат на металл и серийных скидок для согласования с вашим отделом снабжения.
				</p>
			</div>

			<div class="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-[var(--color-rule)] pt-4">
				<button
					type="button"
					class="btn btn--sm btn--line"
					onclick={() => (isOrderModalOpen = false)}
				>
					<span>Закрыть</span>
				</button>
				<button
					type="button"
					class="btn btn--sm"
					onclick={downloadQuoteEstimate}
				>
					<span>Скачать смету (.TXT)</span>
				</button>
			</div>
		</div>
	</div>
{/if}
