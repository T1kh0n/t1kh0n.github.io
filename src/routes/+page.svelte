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
				'Базовый порог запуска заказа составляет 5 000 рублей с учетом НДС 22%. Мы работаем как с юридическими лицами и ИП, так и с физическими лицами. Серийные скидки начинаются от 5 штук (10%) и достигают 40% на партиях от 100 штук.'
		},
		{
			question: 'Работаете ли вы с давальческим сырьем заказчика?',
			answer:
				'Да. При предоставлении давальческого металлопроката стоимость сырья полностью исключается из расчета (ставится отметка «Материал заказчика»). Требуется наличие сертификата завода-изготовителя на партию металла для обеспечения расчетных режимов резания.'
		},
		{
			question: 'В каких форматах принимается конструкторская документация?',
			answer:
				'Мы принимаем 3D-модели в форматах STEP (.step, .stp), Parasolid (.x_t), IGES (.igs), а также чертежи с указанием допусков, шероховатости и посадок в форматах PDF, DXF и DWG через Яндекс.Форму.'
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
		content="Металлообработка с ЧПУ в Калининграде. Токарные и фрезерные работы, допуски до IT7, срок партий до 2 недель. Расчет с НДС 22%, контроль ОТК. Онлайн-калькулятор."
	/>
	{@html serializeSchema(faqSchema)}
</svelte:head>

<main>
	<!-- Hero Section: Laboratory Split Bench (Vantage Stage) -->
	<section class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
				<!-- Left Column: Core Value Proposition, Actions & Readout Bar -->
				<div class="lg:col-span-7">
					<div class="mb-4 text-xs font-light text-[var(--color-muted)]">
						Цех в Калининграде, 2 смены, прием заказов
					</div>

					<h1 class="text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
						Металлообработка с ЧПУ в Калининграде
					</h1>

					<p class="lead mt-6 max-w-2xl">
						Изготовление серийных и единичных деталей на станках с ЧПУ. Квалитеты точности до IT7, контроль ОТК, расчет с НДС 22%.
					</p>

					<div class="mt-8 flex flex-wrap items-center gap-3">
						<a href="#calculator-section" class="btn">Инженерный калькулятор онлайн</a>
						<a
							href={siteConfig.yandexFormUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn--line"
						>
							Отправить чертеж через форму
						</a>
					</div>

					<!-- 3-item horizontal hairline readout line with corner ticks -->
					<dl class="readout ticks" aria-label="Параметры производства">
						<div>
							<dt>Точность (IT)</dt>
							<dd class="num">IT7<span class="u">&thinsp;(Ra 1.25)</span></dd>
						</div>
						<div>
							<dt>Сроки партий</dt>
							<dd class="num">до 2<span class="u">&thinsp;недель</span></dd>
						</div>
						<div>
							<dt>Порог запуска</dt>
							<dd class="num">5&thinsp;000<span class="u">&thinsp;₽</span></dd>
						</div>
					</dl>
				</div>

				<!-- Right Column: Equipment Limits Passport enclosed in precision .ticks -->
				<div class="lg:col-span-5">
					<aside class="ticks passport" aria-label="Технологический паспорт цеха">
						<div class="passport__head">
							<div>
								<div class="text-xs text-[var(--color-muted)]">Технологический паспорт</div>
								<div class="passport__title mt-0.5">Лимиты оборудования цеха</div>
							</div>
							<div class="passport__badge">
								<span class="live-dot" aria-hidden="true"></span>
								<span>Статус: в работе (Калининград)</span>
							</div>
						</div>

						<dl class="passport__list">
							<div class="passport__row">
								<dt>Токарная обработка</dt>
								<dd class="num whitespace-nowrap">⌀200 × 750<span class="u">&thinsp;мм</span></dd>
							</div>
							<div class="passport__row">
								<dt>Фрезерная (3 оси)</dt>
								<dd class="num whitespace-nowrap">800 × 500 × 500<span class="u">&thinsp;мм</span></dd>
							</div>
							<div class="passport__row">
								<dt>Предельный квалитет</dt>
								<dd class="num whitespace-nowrap">IT7</dd>
							</div>
							<div class="passport__row">
								<dt>Шероховатость поверхности</dt>
								<dd class="num whitespace-nowrap">Ra&nbsp;1.25&nbsp;–&nbsp;2.5<span class="u">&thinsp;мкм</span></dd>
							</div>
							<div class="passport__row">
								<dt>Базовый порог заказа</dt>
								<dd class="num whitespace-nowrap">5&thinsp;000<span class="u">&thinsp;₽</span> <span class="u text-[11px]">(НДС&nbsp;22%)</span></dd>
							</div>
						</dl>

						<div class="passport__foot">
							Партии от 1 шт. Срок до 2 недель. Доставка по всей области
						</div>
					</aside>
				</div>
			</div>
		</div>
	</section>

	<!-- Production Divisions Grid (2 Specialized Divisions) -->
	<section
		class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
		aria-labelledby="divisions-heading"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<h2 id="divisions-heading" class="text-2xl text-[var(--color-ink)] sm:text-3xl">
					Производственные участки цеха МеталлПром39
				</h2>
				<p class="lead mt-3 text-sm leading-relaxed sm:text-base">
					Специализированные участки механической обработки, оснащенные станками с числовым
					программным управлением и оснасткой для серийного выпуска
				</p>
			</div>

			<div
				class="mt-12 grid grid-cols-1 gap-0 border-t border-[var(--color-rule)] md:grid-cols-2 md:divide-x md:divide-[var(--color-rule)]"
			>
				<!-- Division 1: Turning -->
				<div class="flex flex-col justify-between py-8 pr-0 md:pr-8">
					<div>
						<div class="text-xs text-[var(--color-muted)]">Участок 01</div>
						<h3 class="mt-1 text-lg text-[var(--color-ink)]">Токарные работы с ЧПУ</h3>
						<p class="mt-3 text-xs leading-relaxed text-[var(--color-ink-2)]">
							Высокопроизводительная токарная обработка тел вращения из конструкционных,
							легированных и нержавеющих сталей, бронзы и алюминия.
						</p>
						<dl class="mt-6 space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs">
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Макс. диаметр над станиной:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									⌀200<span class="u">&thinsp;мм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Макс. длина обработки:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									750<span class="u">&thinsp;мм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Точность размеров:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									IT7<span class="u">&thinsp;(до ±0.012 мм)</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Базовая ставка нормо-часа:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									2&thinsp;500<span class="u">&thinsp;₽/ч</span>
								</dd>
							</div>
						</dl>
					</div>
					<div class="mt-6">
						<a
							href="{base}/tokarnye-raboty-chpu/"
							class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-accent)]"
						>
							Параметры токарного участка &rarr;
						</a>
					</div>
				</div>

				<!-- Division 2: Milling (3-axis) -->
				<div class="flex flex-col justify-between py-8 md:pl-8">
					<div>
						<div class="text-xs text-[var(--color-muted)]">Участок 02</div>
						<h3 class="mt-1 text-lg text-[var(--color-ink)]">Фрезерные работы ЧПУ (3 оси)</h3>
						<p class="mt-3 text-xs leading-relaxed text-[var(--color-ink-2)]">
							Обработка корпусных деталей, приборных панелей, плит, пазов и карманов на вертикально-фрезерных обрабатывающих центрах.
						</p>
						<dl class="mt-6 space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs">
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Рабочее поле (X/Y/Z):</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									800 × 500 × 500<span class="u">&thinsp;мм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Точность позиционирования:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									IT7<span class="u">&thinsp;(±0.010 мм)</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Шероховатость поверхности:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									Ra 1.25 – 2.5<span class="u">&thinsp;мкм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Базовая ставка нормо-часа:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									3&thinsp;000<span class="u">&thinsp;₽/ч</span>
								</dd>
							</div>
						</dl>
					</div>
					<div class="mt-6">
						<a
							href="{base}/frezernye-raboty-chpu/"
							class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-accent)]"
						>
							Параметры фрезерного участка &rarr;
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Interactive CNC CMM Inspection Twin & Layer Ledger (Vantage Theme) -->
	<WorkpieceInspectionScan />

	<!-- Interactive Cost Calculator Section -->
	<section
		id="calculator-section"
		class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
		aria-label="Калькулятор стоимости ЧПУ онлайн"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<CostCalculator />
		</div>
	</section>

	<!-- Delivery Across Entire Region -->
	<section
		class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
		aria-labelledby="regional-delivery-heading"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 id="regional-delivery-heading" class="text-2xl text-[var(--color-ink)] sm:text-3xl">
				Доставка по всей Калининградской области
			</h2>
			<p class="lead mt-3 max-w-3xl text-sm leading-relaxed">
				Оперативная доставка готовых партий деталей собственным транспортом и курьерскими службами
				по Калининграду и в любой населенный пункт области.
			</p>
			<div
				class="mt-10 grid grid-cols-1 gap-6 border-t border-[var(--color-rule)] pt-6 text-xs sm:grid-cols-3"
			>
				<div class="border-b border-[var(--color-rule)] pb-4 sm:border-b-0">
					<div class="font-normal text-[var(--color-ink)]">Калининград и пригороды</div>
					<div class="mt-1 text-[var(--color-muted)]">
						Доставка до дверей предприятий, мастерских и частных заказчиков
					</div>
				</div>
				<div class="border-b border-[var(--color-rule)] pb-4 sm:border-b-0">
					<div class="font-normal text-[var(--color-ink)]">Все города и районы области</div>
					<div class="mt-1 text-[var(--color-muted)]">
						Регулярные рейсы по городам и индустриальным зонам региона
					</div>
				</div>
				<div class="pb-4">
					<div class="font-normal text-[var(--color-ink)]">Самовывоз со склада цеха</div>
					<div class="mt-1 text-[var(--color-muted)]">
						Удобный подъезд для грузового и легкового автотранспорта
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Technical FAQ Section (Ruled list without solid card boxes) -->
	<section
		class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
		aria-labelledby="faq-heading"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<h2 id="faq-heading" class="text-2xl text-[var(--color-ink)] sm:text-3xl">
					Инженерные и организационные вопросы заказчиков
				</h2>
			</div>

			<div class="mt-10 border-t border-[var(--color-rule)]">
				{#each faqs as faq}
					<div class="border-b border-[var(--color-rule)] py-6">
						<h3 class="text-base text-[var(--color-ink)]">{faq.question}</h3>
						<p class="mt-2 max-w-3xl text-xs leading-relaxed text-[var(--color-ink-2)] sm:text-sm">
							{faq.answer}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Conversion CTA Bar -->
	<section class="bg-[var(--color-paper-2)] py-16 text-center sm:py-20" aria-label="Форма заказа">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-2xl text-[var(--color-ink)] sm:text-3xl">
				Рассчитайте стоимость партии или отправьте чертежи
			</h2>
			<p class="lead mx-auto mt-4 max-w-2xl text-xs sm:text-sm">
				Воспользуйтесь интерактивным калькулятором для оценки себестоимости или отправьте чертежи
				напрямую инженеру-технологу через форму. Ответ с расчетом в течение рабочего дня.
			</p>
			<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
				<a href="#calculator-section" class="btn">Открыть калькулятор ЧПУ</a>
				<a
					href={siteConfig.yandexFormUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn--line"
				>
					Заполнить Яндекс.Форму
				</a>
			</div>
			<div class="mt-6 text-[11px] text-[var(--color-muted)]">
				Конфиденциальность гарантируется (NDA по запросу). Безналичный расчет с НДС 22% / работа с физлицами
			</div>
		</div>
	</section>
</main>
