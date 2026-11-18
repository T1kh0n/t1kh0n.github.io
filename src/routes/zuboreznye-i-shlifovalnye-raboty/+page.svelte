<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { createServiceSchema, createBreadcrumbSchema, serializeSchema } from '#lib/seo/schema';
	import { WORKSHOP_SPECS } from '#lib/content/workshop-specs';

	const breadcrumbs = [
		{ name: 'Главная', path: '/' },
		{ name: 'Зуборезные работы', path: '/zuboreznye-i-shlifovalnye-raboty/' }
	];

	const serviceSchema = createServiceSchema({
		name: 'Зуборезные работы ЧПУ в Калининграде',
		description:
			'Нарезание прямозубых и косозубых круглых колес m1-m8, нарезка шлицев. Нарезание шестерен, прямозубых и косозубых зубчатых венцов по ГОСТ 1643-81.',
		serviceType: 'Зуборезные работы ЧПУ по металлу',
		path: '/zuboreznye-i-shlifovalnye-raboty/',
		offers: {
			price: 3200,
			minOrderPrice: 5000,
			unitText: 'нормо-час'
		}
	});

	const breadcrumbSchema = createBreadcrumbSchema(breadcrumbs);
</script>

<svelte:head>
	<title
		>Зуборезные работы ЧПУ в Калининграде: шестерни и валы | {siteConfig.brandName}</title
	>
	<meta
		name="description"
		content="Нарезка круглых шестерен m1–m8, шлицевых соединений, нарезка шлицевых валов в Калининграде. Доставка по всей области. Точность ГОСТ 1643-81, НДС 22%."
	/>
	<link rel="canonical" href="{siteConfig.siteDomain}/zuboreznye-i-shlifovalnye-raboty/" />

	<!-- OpenGraph & Social Cards -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Зуборезные работы ЧПУ в Калининграде | {siteConfig.brandName}" />
	<meta
		property="og:description"
		content="Нарезка круглых шестерен m1–m8, шлицевых соединений и зубчатых венцов в Калининграде. Точность ГОСТ 1643-81, НДС 22%."
	/>
	<meta property="og:url" content="{siteConfig.siteDomain}/zuboreznye-i-shlifovalnye-raboty/" />

	{@html serializeSchema(serviceSchema)}
	{@html serializeSchema(breadcrumbSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<!-- Header & Direct Summary: 12-Column Asymmetric Hero -->
		<div
			class="mt-4 grid grid-cols-1 items-start gap-8 border-b border-[var(--color-rule)] pb-8 lg:grid-cols-12"
		>
			<div class="lg:col-span-7">
				<div class="flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[var(--color-muted)]">
					<span class="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>
					Зуборезный участок · Калининград
				</div>
				<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
					Зуборезные работы с ЧПУ
				</h1>
				<p class="lead mt-4 text-sm leading-relaxed sm:text-base">
					Нарезка круглых колес m1–m8, прямозубых и косозубых венцов и шлицев на валах. Посадки до IT7, шероховатость Ra 1.25 мкм, точность по ГОСТ 1643-81, партии от 1 шт.
				</p>
				<!-- Direct Answer Callout for AI Search & AEO -->
				<div class="mt-4 rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] p-4 text-xs leading-relaxed text-[var(--color-ink-2)]">
					<strong class="font-normal text-[var(--color-ink)]">Параметры зуборезного участка:</strong> Нарезка зубьев прямозубых и косозубых шестерен от модуля m1.0 до m8.0, диаметр колес до ⌀500 мм, длина валов со шлицами до 750 мм. Достижимая точность по ГОСТ 1643-81 — 7–8 степень, финишная шероховатость посадочных шеек до Ra 1.25 мкм с возможностью закалки ТВЧ до 50 HRC.
				</div>
			</div>
			<div class="well text-xs text-[var(--color-ink-2)] lg:col-span-5">
				<div class="font-normal text-[var(--color-ink)]">Лимиты зуборезного участка:</div>
				<div class="mt-3 grid grid-cols-2 gap-3 text-[var(--color-muted)]">
					<div>
						Модуль зубьев:
						<strong class="num block font-normal text-[var(--color-ink)]">m = 1.0 – 8.0</strong>
					</div>
					<div>
						Диаметр круглых колес:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>до ⌀500<span class="u">&thinsp;мм</span></strong
						>
					</div>
					<div>
						Шероховатость шеек:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>Ra 1.25<span class="u">&thinsp;мкм</span></strong
						>
					</div>
					<div>
						Длина шлицевых валов:
						<strong class="num block font-normal text-[var(--color-ink)]">до 750 мм</strong>
					</div>
				</div>
			</div>
		</div>

		<!-- Technical Specifications Grid -->
		<section class="mt-10" aria-labelledby="tech-params-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="tech-params-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Параметры зубофрезерного оборудования
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Зубофрезерный полуавтомат высокой точности для единичного и серийного нарезания венцов.
					</p>
				</div>
				<div class="overflow-x-auto lg:col-span-8">
					<table class="v-table">
						<thead>
							<tr>
								<th>Вид технологической операции</th>
								<th>Предельные габариты</th>
								<th>Класс точности / ГОСТ</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Зубофрезерование круглых колес
								</td>
								<td class="num text-[var(--color-ink)]"
									>Диаметр до 500<span class="u">&thinsp;мм</span>, модуль m1–m8</td
								>
								<td class="text-[var(--color-muted)]">7-я и 8-я степень точности по ГОСТ 1643-81</td
								>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Нарезание шлицевых валов и втулок
								</td>
								<td class="num text-[var(--color-ink)]"
									>Длина вала до 750<span class="u">&thinsp;мм</span></td
								>
								<td class="text-[var(--color-muted)]">
									Прямобочные (ГОСТ 1139-80), эвольвентные (ГОСТ 6033-80)
								</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Чистовая обработка посадочных шеек валов
								</td>
								<td class="num text-[var(--color-ink)]">
									Диаметр до 200<span class="u">&thinsp;мм</span>, длина до 750<span class="u"
										>&thinsp;мм</span
									>
								</td>
								<td class="text-[var(--color-muted)]">
									Квалитет IT7, шероховатость Ra 1.25 мкм под подшипники
								</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">Косозубые зубчатые венцы</td>
								<td class="num text-[var(--color-ink)]"
									>Угол наклона зуба до ±45°</td
								>
								<td class="text-[var(--color-muted)]">Плавное зацепление, бесшумная работа редукторов</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<figure class="mt-6 overflow-hidden rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)]">
				<img
					src="{base}/images/parts/shesterni-gost.webp"
					alt="Зуборезные работы и нарезание прямозубых и косозубых шестерен по ГОСТ 1643-81 в Калининграде"
					width="800"
					height="600"
					loading="lazy"
					decoding="async"
					class="h-auto w-full max-h-96 object-cover"
				/>
				<figcaption class="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-rule)] px-4 py-2 font-mono text-[11px] text-[var(--color-muted)]">
					<span>Параметры зацепления: модуль m = 1.0 – 8.0, диаметр колес до ⌀500 мм</span>
					<span class="text-[var(--color-accent)]">ГОСТ 1643-81 · Шлифование шеек Ra 1.25</span>
				</figcaption>
			</figure>
		</section>

		<!-- Regional Applications in Kaliningrad -->
		<section class="mt-14" aria-labelledby="regional-cases-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="regional-cases-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Отраслевой опыт
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Применение в редукторах промышленного оборудования и сельхозтехнике в Калининградской области.
					</p>
				</div>
				<div class="space-y-3 text-xs leading-relaxed text-[var(--color-muted)] lg:col-span-8">
					<p class="max-w-2xl">
						Шестерни и шлицевые валы производства {siteConfig.brandName} успешно эксплуатируются в приводах
						конвейеров, редукторах производственных линий, а также на сельхозтехнике (комбайны, тракторы)
						в хозяйствах Гурьевского, Черняховского и других районов Калининградской области.
					</p>
				</div>
			</div>
		</section>

		<!-- Contextual Internal Linking -->
		<section class="mt-14 border-t border-[var(--color-rule)] pt-8">
			<h2 class="text-sm font-normal text-[var(--color-ink)]">Связанные разделы сайта:</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
				<a
					href="{base}/tokarnye-raboty-chpu/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Токарная ЧПУ обработка</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Черновое и чистовое точение венцов и валов до IT7</span
					>
				</a>
				<a
					href="{base}/kontrol-kachestva-i-oborudovanie/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Метрология и ОТК</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Контроль биения и шага зубьев калиброванным измерительным инструментом</span
					>
				</a>
				<a
					href="{base}/portfolio/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Примеры шестерен в портфолио</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Реализованные зубчатые пары и шлицевые муфты</span
					>
				</a>
			</div>
		</section>

		<!-- Direct CTA Action -->
		<section class="mt-14 border-t border-[var(--color-rule)] pt-12 pb-6 text-center">
			<h2 class="text-lg text-[var(--color-ink)] sm:text-xl">
				Заказ нарезки зубьев и шестерен в Калининграде
			</h2>
			<p class="lead mx-auto mt-2 max-w-2xl text-xs sm:text-sm">
				Принимаем чертежи и образцы изношенных деталей для реверс-инжиниринга. Минимальный заказ —
				5&thinsp;000&thinsp;₽ с НДС 22%.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a href="{base}/kalkulyator-stoimosti-chpu/" class="btn btn--sm"> Расчет стоимости онлайн </a>
				<a href="{base}/kontakty/" class="btn btn--sm btn--line"><span>График загрузки цеха</span></a>
			</div>
		</section>
	</div>
</main>
