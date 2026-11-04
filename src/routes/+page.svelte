<script lang="ts">
	import { base } from '$lib/paths';
	import { siteConfig } from '#lib/config/site';
	import { createFaqSchema, serializeSchema } from '#lib/seo/schema';
	import CostCalculator from '#lib/components/CostCalculator.svelte';
	import WorkpieceInspectionScan from '#lib/components/WorkpieceInspectionScan.svelte';

	const faqs = [
		{
			question: 'Каков минимальный порог запуска заказа?',
			answer:
				'Базовый порог запуска заказа составляет 5 000 рублей с учетом НДС 22%. Мы работаем как с юридическими лицами и ИП, так и с физическими лицами. Серийные скидки начинаются от 10 штук (10%) и достигают 25% на партиях от 100 штук.'
		},
		{
			question: 'Работаете ли вы с давальческим сырьем заказчика?',
			answer:
				'Да. При предоставлении давальческого металлопроката стоимость сырья полностью исключается из расчета (ставится отметка «Материал заказчика»). Требуется наличие сертификата завода-изготовителя на партию металла для обеспечения расчетных режимов резания.'
		},
		{
			question: 'В каких форматах принимается конструкторская документация?',
			answer:
				'Мы принимаем 3D-модели в форматах STEP (.step, .stp), Parasolid (.x_t), IGES (.igs), а также чертежи с указанием допусков, шероховатости и посадок в форматах PDF, DXF и DWG.'
		},
		{
			question: 'Как осуществляется контроль качества и проверка допусков?',
			answer:
				'Каждая партия проходит входной контроль металла, контроль первой детали (First Article Inspection) и финишную приемку инженером ОТК с использованием калиброванных цифровых микрометров и нутромеров. Предельный квалитет — IT7.'
		},
		{
			question: 'Работаете ли вы по безналичному расчету с НДС 22% и с физлицами?',
			answer:
				'Да. Мы работаем по безналичному расчету с выделением НДС 22% для организаций и ИП (системы ЭДО Диадок и СБИС, либо на бумажных носителях), а также принимаем оплату от частных заказчиков.'
		}
	];

	const faqSchema = createFaqSchema(faqs);
</script>

<svelte:head>
	<title>Металлообработка с ЧПУ в Калининграде: токарные и фрезерные работы | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Металлообработка деталей на токарных и фрезерных станках с ЧПУ в Калининграде. Точность IT7, шероховатость до Ra 1.25. Доставка по всей Калининградской области. Безналичный расчет с НДС 22%."
	/>
	<link rel="canonical" href="{siteConfig.siteDomain}/" />

	<!-- OpenGraph & Social Cards -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Металлообработка с ЧПУ в Калининграде: токарные и фрезерные работы | {siteConfig.brandName}" />
	<meta
		property="og:description"
		content="Металлообработка деталей на токарных и фрезерных станках с ЧПУ в Калининграде. Точность IT7, шероховатость до Ra 1.25. Доставка по всей Калининградской области. Безналичный расчет с НДС 22%."
	/>
	<meta property="og:url" content="{siteConfig.siteDomain}/" />
	<meta property="og:site_name" content="МеталлПром39" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Металлообработка с ЧПУ в Калининграде | {siteConfig.brandName}" />
	<meta name="twitter:description" content="Контрактная токарная и фрезерная обработка ЧПУ с точностью IT7 и НДС 22%." />

	{@html serializeSchema(faqSchema)}
</svelte:head>

<main class="space-y-20 pb-20">
	<!-- Hero Section: Single Viewport Block on Desktop -->
	<section class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-20 lg:min-h-[calc(100vh-4.5rem)] lg:flex lg:flex-col lg:justify-center">
		<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<div class="flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[var(--color-muted)]">
					<span class="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>
					Цех металлообработки ЧПУ · Калининград
				</div>

				<h1 class="mt-4 text-3xl tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
					Металлообработка с ЧПУ в Калининграде
				</h1>

				<p class="lead mt-6 max-w-2xl text-lg sm:text-xl">
					Изготовление серийных и единичных деталей на станках с ЧПУ. Квалитеты точности до IT7, контроль ОТК, расчет с НДС 22%.
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-3">
					<a href="#calculator-section" class="btn">Инженерный калькулятор онлайн</a>
					<a
						href="{base}/kontakty/"
						class="btn btn--line"
					>
						График загрузки цеха
					</a>
				</div>

				<!-- 3-item horizontal hairline readout line with corner ticks -->
				<dl class="readout ticks mt-12 max-w-2xl" aria-label="Параметры производства">
					<div class="readout-item">
						<dt class="readout-label">Базовый допуск</dt>
						<dd class="readout-value">IT7</dd>
					</div>
					<div class="readout-item">
						<dt class="readout-label">Партии</dt>
						<dd class="readout-value">от 1&thinsp;<span class="readout-unit">шт.</span></dd>
					</div>
					<div class="readout-item">
						<dt class="readout-label">Срок по партии</dt>
						<dd class="readout-value">до 2&thinsp;<span class="readout-unit">нед.</span></dd>
					</div>
				</dl>
			</div>
		</div>
	</section>

	<!-- 3D Metrology Digital Twin Viewport Section: Separate Block, 1 Viewport on Desktop -->
	<WorkpieceInspectionScan />

	<!-- Technical Specification Table Section (Desktop Table / Mobile Specs Layout) -->
	<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Лимиты оборудования">
		<div class="mb-6 flex flex-col justify-between gap-4 border-b border-[var(--color-rule)] pb-4 sm:flex-row sm:items-end">
			<div>
				<div class="font-mono text-[10px] tracking-wider uppercase text-[var(--color-muted)]">
					Технологический паспорт
				</div>
				<h2 class="text-xl text-[var(--color-ink)] sm:text-2xl">
					Лимиты оборудования цеха
				</h2>
			</div>
			<div class="font-mono text-xs text-[var(--color-muted)]">
				<span class="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)] mr-1"></span>
				Статус: в работе (Калининград)
			</div>
		</div>

		<!-- Desktop Table (Hidden on small mobile) -->
		<div class="hidden sm:block overflow-x-auto">
			<table class="table-vantage">
				<thead>
					<tr>
						<th>Технологический участок</th>
						<th>Параметры обработки</th>
						<th>Макс. габариты</th>
						<th>Точность / Допуск</th>
						<th>Шероховатость</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="font-normal text-[var(--color-ink)]">Токарный участок ЧПУ</td>
						<td>Точение, расточка, канавки, нарезание резьбы</td>
						<td class="num">ø&thinsp;200 × 750&thinsp;мм</td>
						<td class="num font-normal text-[var(--color-accent)]">IT7</td>
						<td class="num">Ra 1.25 – 2.5&thinsp;мкм</td>
					</tr>
					<tr>
						<td class="font-normal text-[var(--color-ink)]">Фрезерный участок (3 оси)</td>
						<td>Фрезерование плоскостей, пазов, карманов, фасок</td>
						<td class="num">800 × 500 × 500&thinsp;мм</td>
						<td class="num font-normal text-[var(--color-accent)]">IT7</td>
						<td class="num">Ra 1.25 – 2.5&thinsp;мкм</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Mobile Technical Specs List (Rendered on mobile viewports for compact fit) -->
		<div class="space-y-4 sm:hidden">
			<div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)]/60 p-4">
				<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-2">
					<span class="font-medium text-[var(--color-ink)]">Токарный участок ЧПУ</span>
					<span class="font-mono text-xs text-[var(--color-accent)]">до IT7</span>
				</div>
				<dl class="mt-3 grid grid-cols-2 gap-y-2 text-xs">
					<dt class="text-[var(--color-muted)]">Макс. габариты:</dt>
					<dd class="text-right font-mono text-[var(--color-ink)]">ø 200 × 750 мм</dd>
					<dt class="text-[var(--color-muted)]">Шероховатость:</dt>
					<dd class="text-right font-mono text-[var(--color-ink)]">Ra 1.25 – 2.5</dd>
					<dt class="text-[var(--color-muted)]">Операции:</dt>
					<dd class="col-span-2 mt-1 text-[var(--color-ink-2)]">Точение, расточка, канавки, нарезание резьбы</dd>
				</dl>
			</div>

			<div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)]/60 p-4">
				<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-2">
					<span class="font-medium text-[var(--color-ink)]">Фрезерный участок (3 оси)</span>
					<span class="font-mono text-xs text-[var(--color-accent)]">до IT7</span>
				</div>
				<dl class="mt-3 grid grid-cols-2 gap-y-2 text-xs">
					<dt class="text-[var(--color-muted)]">Рабочая зона:</dt>
					<dd class="text-right font-mono text-[var(--color-ink)]">800 × 500 × 500 мм</dd>
					<dt class="text-[var(--color-muted)]">Шероховатость:</dt>
					<dd class="text-right font-mono text-[var(--color-ink)]">Ra 1.25 – 2.5</dd>
					<dt class="text-[var(--color-muted)]">Операции:</dt>
					<dd class="col-span-2 mt-1 text-[var(--color-ink-2)]">Плоскости, пазы, фасонные карманы, резьбофрезерование</dd>
				</dl>
			</div>
		</div>

		<!-- Single Footnote Row -->
		<div class="mt-3 flex flex-col justify-between gap-1 text-[11px] text-[var(--color-muted)] sm:flex-row">
			<span>Партии от 1 шт. Базовый порог заказа: <strong>5 000 ₽ (с НДС 22%)</strong>.</span>
			<span>Доставка по всей Калининградской области</span>
		</div>
	</section>

	<!-- Production Workshop Units (2 Centers Only) -->
	<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="border-b border-[var(--color-rule)] pb-4">
			<div class="font-mono text-xs tracking-wider uppercase text-[var(--color-muted)]">
				Производственные участки цеха
			</div>
			<h2 class="mt-2 text-2xl text-[var(--color-ink)] sm:text-3xl">
				Специализированные линии токарной и фрезерной ЧПУ обработки деталей.
			</h2>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<!-- Unit 1: Turning -->
			<div class="panel group relative p-6 transition-colors hover:border-[var(--color-rule-2)]">
				<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-3">
					<span class="font-mono text-xs text-[var(--color-muted)]">Участок 01</span>
					<span class="font-mono text-xs text-[var(--color-accent)]">до IT7</span>
				</div>
				<h3 class="mt-4 text-xl text-[var(--color-ink)]">Токарная обработка с ЧПУ</h3>
				<p class="mt-2 text-xs text-[var(--color-ink-2)]">
					Обработка тел вращения: фланцы, валы, штуцеры, пальцы, втулки. Нарезание метрических, дюймовых и трапецеидальных резьб.
				</p>
				<ul class="mt-4 space-y-1.5 text-xs text-[var(--color-muted)]">
					<li class="flex items-center gap-2">
						<span class="h-1 w-1 rounded-full bg-[var(--color-accent)]"></span>
						Максимальный диаметр: до ø 200 мм
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1 w-1 rounded-full bg-[var(--color-accent)]"></span>
						Длина заготовки в центрах: до 750 мм
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1 w-1 rounded-full bg-[var(--color-accent)]"></span>
						Материалы: Сталь 45, 40Х, 09Г2С, AISI 304, Д16Т, латунь, капролон
					</li>
				</ul>
				<div class="mt-6 flex items-center justify-between pt-4 border-t border-[var(--color-rule)]">
					<a href="{base}/tokarnye-raboty-chpu/" class="btn btn--sm">
						Подробнее о токарных работах
					</a>
					<span class="font-mono text-xs text-[var(--color-muted)]">от 2 500 ₽/ч</span>
				</div>
			</div>

			<!-- Unit 2: Milling -->
			<div class="panel group relative p-6 transition-colors hover:border-[var(--color-rule-2)]">
				<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-3">
					<span class="font-mono text-xs text-[var(--color-muted)]">Участок 02</span>
					<span class="font-mono text-xs text-[var(--color-accent)]">до IT7</span>
				</div>
				<h3 class="mt-4 text-xl text-[var(--color-ink)]">Фрезерная обработка с ЧПУ</h3>
				<p class="mt-2 text-xs text-[var(--color-ink-2)]">
					3-осевая скоростная обработка корпусных деталей, кронштейнов, плит и пресс-форм сложной пространственной конфигурации.
				</p>
				<ul class="mt-4 space-y-1.5 text-xs text-[var(--color-muted)]">
					<li class="flex items-center gap-2">
						<span class="h-1 w-1 rounded-full bg-[var(--color-accent)]"></span>
						Рабочая зона: 800 × 500 × 500 мм
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1 w-1 rounded-full bg-[var(--color-accent)]"></span>
						3-осевая обработка фасонных поверхностей
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1 w-1 rounded-full bg-[var(--color-accent)]"></span>
						Фрезерование пазов, посадочных карманов, резьбофрезерование
					</li>
				</ul>
				<div class="mt-6 flex items-center justify-between pt-4 border-t border-[var(--color-rule)]">
					<a href="{base}/frezernye-raboty-chpu/" class="btn btn--sm">
						Подробнее о фрезерных работах
					</a>
					<span class="font-mono text-xs text-[var(--color-muted)]">от 3 000 ₽/ч</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Online Engineering Calculator Section -->
	<section id="calculator-section" class="scroll-mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<CostCalculator />
	</section>

	<!-- FAQ Section with Schema.org Accordion -->
	<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Часто задаваемые вопросы">
		<div class="border-b border-[var(--color-rule)] pb-4">
			<div class="font-mono text-xs tracking-wider uppercase text-[var(--color-muted)]">
				Вопросы и регламенты
			</div>
			<h2 class="mt-2 text-2xl text-[var(--color-ink)] sm:text-3xl">
				Часто задаваемые вопросы по механической обработке
			</h2>
		</div>

		<div class="mt-8 divide-y divide-[var(--color-rule)]">
			{#each faqs as faq, i}
				<details class="group py-4 select-none">
					<summary class="flex cursor-pointer items-center justify-between gap-4 text-base font-normal text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]">
						<span class="flex items-center gap-3">
							<span class="font-mono text-xs text-[var(--color-muted)]">0{i + 1}</span>
							<span>{faq.question}</span>
						</span>
						<span class="font-mono text-sm text-[var(--color-muted)] transition-transform group-open:rotate-45">
							+
						</span>
					</summary>
					<div class="mt-3 pr-8 pl-8 text-sm leading-relaxed text-[var(--color-ink-2)]">
						<p>{faq.answer}</p>
					</div>
				</details>
			{/each}
		</div>
	</section>
</main>
