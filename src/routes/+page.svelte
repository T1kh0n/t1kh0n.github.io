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
	{@html serializeSchema(faqSchema)}
</svelte:head>

<main class="space-y-20 pb-20">
	<!-- Hero Section -->
	<section class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] pt-12 pb-16 sm:pb-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
				<div class="lg:col-span-7">
					<div class="flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[var(--color-muted)]">
						<span class="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>
						Цех металлообработки ЧПУ · Калининград
					</div>

					<h1 class="mt-4 text-3xl tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-5xl">
						Металлообработка с ЧПУ в Калининграде
					</h1>

					<p class="lead mt-6 max-w-2xl">
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
					<dl class="readout ticks" aria-label="Параметры производства">
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

				<!-- Right Column: Interactive 3D Workpiece Metrology Viewport -->
				<div class="lg:col-span-5">
					<WorkpieceInspectionScan />
				</div>
			</div>
		</div>
	</section>

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
		<div class="sm:hidden space-y-3 font-mono text-xs">
			<div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 space-y-2">
				<div class="font-sans font-normal text-sm text-[var(--color-ink)]">Токарный участок ЧПУ</div>
				<div class="flex justify-between border-b border-[var(--color-rule)] pb-1.5 text-[var(--color-muted)]">
					<span>Габариты:</span>
					<span class="text-[var(--color-ink)] num">ø&thinsp;200 × 750&thinsp;мм</span>
				</div>
				<div class="flex justify-between border-b border-[var(--color-rule)] pb-1.5 text-[var(--color-muted)]">
					<span>Точность:</span>
					<span class="text-[var(--color-accent)] font-normal num">IT7</span>
				</div>
				<div class="flex justify-between text-[var(--color-muted)]">
					<span>Шероховатость:</span>
					<span class="text-[var(--color-ink)] num">Ra 1.25 – 2.5&thinsp;мкм</span>
				</div>
			</div>

			<div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 space-y-2">
				<div class="font-sans font-normal text-sm text-[var(--color-ink)]">Фрезерный участок (3 оси)</div>
				<div class="flex justify-between border-b border-[var(--color-rule)] pb-1.5 text-[var(--color-muted)]">
					<span>Габариты:</span>
					<span class="text-[var(--color-ink)] num">800 × 500 × 500&thinsp;мм</span>
				</div>
				<div class="flex justify-between border-b border-[var(--color-rule)] pb-1.5 text-[var(--color-muted)]">
					<span>Точность:</span>
					<span class="text-[var(--color-accent)] font-normal num">IT7</span>
				</div>
				<div class="flex justify-between text-[var(--color-muted)]">
					<span>Шероховатость:</span>
					<span class="text-[var(--color-ink)] num">Ra 1.25 – 2.5&thinsp;мкм</span>
				</div>
			</div>
		</div>

		<div class="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-muted)]">
			<div>
				Партии от 1 шт. Базовый порог заказа: <strong class="font-normal text-[var(--color-ink)]">5 000 ₽ (с НДС 22%)</strong>.
			</div>
			<div>Доставка по всей Калининградской области</div>
		</div>
	</section>

	<!-- Capabilities Grid (2 Service Cards) -->
	<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Производственные участки">
		<div class="mb-8 border-b border-[var(--color-rule)] pb-4">
			<h2 class="text-xl text-[var(--color-ink)] sm:text-2xl">
				Производственные участки цеха
			</h2>
			<p class="lead mt-1 text-xs sm:text-sm">
				Специализированные линии токарной и фрезерной ЧПУ обработки деталей.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<!-- Section 1: Turning -->
			<article class="well flex flex-col justify-between">
				<div>
					<div class="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-3">
						<span class="font-mono text-xs text-[var(--color-muted)]">Участок 01</span>
						<span class="num text-xs text-[var(--color-accent)]">до IT7</span>
					</div>
					<h3 class="mt-4 text-lg font-normal text-[var(--color-ink)]">
						Токарная обработка с ЧПУ
					</h3>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Обработка тел вращения: фланцы, валы, штуцеры, пальцы, втулки. Нарезание метрических, дюймовых и трапецеидальных резьб.
					</p>
					<ul class="mt-4 space-y-1.5 text-xs text-[var(--color-ink-2)]">
						<li class="flex items-center gap-2">
							<span class="h-1 w-1 rounded-full bg-[var(--color-accent)]"></span>
							Максимальный диаметр: до ø&thinsp;200 мм
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
				</div>
				<div class="mt-6 pt-4 border-t border-[var(--color-rule)] flex items-center justify-between">
					<a href="{base}/tokarnye-raboty-chpu/" class="btn btn--sm">
						Подробнее о токарных работах
					</a>
					<span class="font-mono text-xs text-[var(--color-muted)]">от 2 500 ₽/ч</span>
				</div>
			</article>

			<!-- Section 2: Milling -->
			<article class="well flex flex-col justify-between">
				<div>
					<div class="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-3">
						<span class="font-mono text-xs text-[var(--color-muted)]">Участок 02</span>
						<span class="num text-xs text-[var(--color-accent)]">до IT7</span>
					</div>
					<h3 class="mt-4 text-lg font-normal text-[var(--color-ink)]">
						Фрезерная обработка с ЧПУ
					</h3>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						3-осевая скоростная обработка корпусных деталей, кронштейнов, плит и пресс-форм сложной пространственной конфигурации.
					</p>
					<ul class="mt-4 space-y-1.5 text-xs text-[var(--color-ink-2)]">
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
				</div>
				<div class="mt-6 pt-4 border-t border-[var(--color-rule)] flex items-center justify-between">
					<a href="{base}/frezernye-raboty-chpu/" class="btn btn--sm">
						Подробнее о фрезерных работах
					</a>
					<span class="font-mono text-xs text-[var(--color-muted)]">от 3 000 ₽/ч</span>
				</div>
			</article>
		</div>
	</section>

	<!-- Online Cost Calculator Section Anchor -->
	<section
		id="calculator-section"
		class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-20"
		aria-label="Инженерный калькулятор"
	>
		<CostCalculator />
	</section>

	<!-- Quality Assurance Section -->
	<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Контроль качества">
		<div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-5">
					<div class="font-mono text-[10px] tracking-wider uppercase text-[var(--color-accent)]">
						Метрология и стандарты
					</div>
					<h2 class="mt-2 text-xl text-[var(--color-ink)] sm:text-2xl">
						Многоступенчатый контроль качества ОТК
					</h2>
					<p class="lead mt-3 text-xs sm:text-sm">
						Каждая партия деталей сопровождается межоперационным контролем и финишным замером параметров.
					</p>
					<div class="mt-6 space-y-3 font-mono text-xs text-[var(--color-ink-2)]">
						<div class="flex items-center gap-2">
							<span class="text-[var(--color-accent)] font-bold">01.</span>
							<span>Входной спектральный анализ металлопроката</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-[var(--color-accent)] font-bold">02.</span>
							<span>Контроль первой детали (FAI) перед запуском серии</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-[var(--color-accent)] font-bold">03.</span>
							<span>Финишная приемка калиброванным инструментом</span>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
					<div class="well">
						<div class="num text-xl text-[var(--color-ink)]">IT7</div>
						<div class="mt-1 font-normal text-xs text-[var(--color-ink)]">Предельный квалитет</div>
						<p class="mt-2 text-[11px] text-[var(--color-muted)]">
							Обеспечение допусков на диаметры и линейные размеры деталей на оборудовании с ЧПУ.
						</p>
					</div>
					<div class="well">
						<div class="num text-xl text-[var(--color-ink)]">Ra 1.25</div>
						<div class="mt-1 font-normal text-xs text-[var(--color-ink)]">Шероховатость поверхностей</div>
						<p class="mt-2 text-[11px] text-[var(--color-muted)]">
							Чистовое точение и фрезерование специальными твердосплавными пластинами.
						</p>
					</div>
					<div class="well">
						<div class="num text-xl text-[var(--color-ink)]">100%</div>
						<div class="mt-1 font-normal text-xs text-[var(--color-ink)]">Контроль ответственных баз</div>
						<p class="mt-2 text-[11px] text-[var(--color-muted)]">
							Сплошной замер критических посадочных поверхностей и резьбовых сопряжений.
						</p>
					</div>
					<div class="well">
						<div class="num text-xl text-[var(--color-ink)]">22%</div>
						<div class="mt-1 font-normal text-xs text-[var(--color-ink)]">НДС в расчетах</div>
						<p class="mt-2 text-[11px] text-[var(--color-muted)]">
							Полный пакет бухгалтерских документов (УПД) через электронный документооборот.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section with Microdata -->
	<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Часто задаваемые вопросы">
		<div class="mb-8 border-b border-[var(--color-rule)] pb-4">
			<h2 class="text-xl text-[var(--color-ink)] sm:text-2xl">
				Часто задаваемые вопросы о производстве
			</h2>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each faqs as item}
				<div class="well">
					<h3 class="text-sm font-normal text-[var(--color-ink)]">
						{item.question}
					</h3>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						{item.answer}
					</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Conversion CTA Bar -->
	<section class="bg-[var(--color-paper-2)] py-16 text-center sm:py-20" aria-label="Форма заказа">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-2xl text-[var(--color-ink)] sm:text-3xl">
				Рассчитайте стоимость партии деталей онлайн
			</h2>
			<p class="lead mx-auto mt-4 max-w-2xl text-xs sm:text-sm">
				Воспользуйтесь интерактивным инженерным калькулятором для моментальной оценки себестоимости партии по нормо-часам и сохранения расчетной сметы.
			</p>
			<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
				<a href="#calculator-section" class="btn">Открыть калькулятор ЧПУ</a>
				<a
					href="{base}/kontakty/"
					class="btn btn--line"
				>
					График загрузки цеха
				</a>
			</div>
			<div class="mt-6 text-[11px] text-[var(--color-muted)]">
				Конфиденциальность гарантируется (NDA по запросу). Безналичный расчет с НДС 22% / работа с физлицами
			</div>
		</div>
	</section>
</main>
