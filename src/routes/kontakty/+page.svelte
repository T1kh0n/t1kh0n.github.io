<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { createBreadcrumbSchema, serializeSchema } from '#lib/seo/schema';

	const breadcrumbs = [{ name: 'Главная', path: '/' }, { name: 'Статус производства', path: '/kontakty/' }];
	const breadcrumbSchema = createBreadcrumbSchema(breadcrumbs);
</script>

<svelte:head>
	<title>Статус производственных мощностей и график цеха ЧПУ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Информация о загрузке станочного парка ЧПУ, технологических лимитах обработки и условиях логистики по Калининградской области. Допуски до IT7, безналичный расчет с НДС 22%."
	/>
	<link rel="canonical" href="{siteConfig.siteDomain}/kontakty/" />

	<!-- OpenGraph & Social Cards -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Статус производства и график мощностей | {siteConfig.brandName}" />
	<meta
		property="og:description"
		content="График работы цеха, текущая загрузка станочного парка ЧПУ и регламент логистики по Калининградской области."
	/>
	<meta property="og:url" content="{siteConfig.siteDomain}/kontakty/" />

	{@html serializeSchema(breadcrumbSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				Производственный график и статус оборудования
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Текущая загрузка станочного парка ЧПУ, технологические лимиты токарного и фрезерного участков и регламент исполнения заказов.
			</p>
		</header>

		<div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Workload & Technical Status -->
			<div class="space-y-6 lg:col-span-7">
				<div class="well">
					<div class="flex items-center gap-2 font-mono text-[11px] text-[var(--color-accent)]">
						<span class="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
						ТЕКУЩИЙ СТАТУС: МОЩНОСТИ ЗАКОНТРАКТОВАНЫ (100% ЗАГРУЗКА)
					</div>
					<h2 class="mt-2 text-sm font-normal text-[var(--color-ink)]">
						График загрузки станочного парка ЧПУ
					</h2>
					<p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
						В текущем производственном цикле все токарные и фрезерные центры цеха задействованы на выполнении утвержденных серийных договоров. Прием новых внешних заказов в производство временно приостановлен.
					</p>

					<div class="mt-6 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5">
						<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<div class="text-sm font-normal text-[var(--color-ink)]">
									Предварительная инженерная оценка
								</div>
								<div class="mt-1 text-xs text-[var(--color-muted)]">
									Рассчитайте себестоимость партии и сохраните смету спецификации
								</div>
							</div>
							<a
								href="{base}/kalkulyator-stoimosti-chpu/"
								class="btn btn--wide sm:btn--sm shrink-0"
							>
								<span>Открыть калькулятор</span>
							</a>
						</div>
					</div>

					<div class="mt-6 border-t border-[var(--color-rule)] pt-4 text-xs text-[var(--color-muted)]">
						<div>Нормативная длительность переналадки: <strong class="font-normal text-[var(--color-ink)]">от 45 мин.</strong></div>
						<div class="mt-1">Стандартный срок партии деталей: <strong class="font-normal text-[var(--color-ink)]">до 2 недель</strong></div>
					</div>
				</div>

				<!-- Working Hours -->
				<div class="well">
					<h2 class="text-sm font-normal text-[var(--color-ink)]">
						Режим работы производства
					</h2>
					<div class="mt-4 space-y-2 text-xs text-[var(--color-ink-2)]">
						<div class="flex justify-between border-b border-[var(--color-rule)] py-2">
							<span class="text-[var(--color-muted)]">Производственные смены станков ЧПУ:</span>
							<span class="num text-[var(--color-ink)]"
								>Понедельник — Пятница: 08:00 – 20:00 (2 смены)</span
							>
						</div>
						<div class="flex justify-between border-b border-[var(--color-rule)] py-2">
							<span class="text-[var(--color-muted)]">Инженерно-технологический отдел:</span>
							<span class="num text-[var(--color-ink)]">Понедельник — Пятница: 08:30 – 17:30</span>
						</div>
						<div class="flex justify-between py-2">
							<span class="text-[var(--color-muted)]">Склад готовой продукции:</span>
							<span class="num text-[var(--color-ink)]">Суббота: 09:00 – 15:00</span>
						</div>
					</div>
				</div>

				<!-- Logistics in Kaliningrad Oblast -->
				<div class="well">
					<h2 class="text-sm font-normal text-[var(--color-ink)]">
						Доставка по всей Калининградской области
					</h2>
					<p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
						Организуем доставку готовых деталей собственным автотранспортом цеха или курьерскими службами:
					</p>
					<ul class="mt-3 list-inside list-disc space-y-1 text-xs text-[var(--color-ink-2)]">
						<li>Доставка по Калининграду до дверей заказчика;</li>
						<li>Регулярная доставка во все города и районы Калининградской области;</li>
						<li>Возможность самовывоза готовых партий со склада производства.</li>
					</ul>
				</div>
			</div>

			<!-- Requisites & Compliance Column -->
			<div class="space-y-6 lg:col-span-5">
				<div class="well">
					<h2 class="text-xs font-normal text-[var(--color-ink)]">
						Условия расчетов и документооборот
					</h2>
					<div class="mt-4 space-y-3 text-xs text-[var(--color-muted)]">
						<div>
							<span class="text-[var(--color-muted)]">Оплата для организаций и ИП:</span>
							<div class="font-normal text-[var(--color-ink)]">Безналичный расчет с выделением НДС 22% / УСН</div>
						</div>
						<div>
							<span class="text-[var(--color-muted)]">Оплата для частных лиц:</span>
							<div class="font-normal text-[var(--color-ink)]">Безналичная оплатовая квитанция / банковский счет</div>
						</div>
						<div>
							<span class="text-[var(--color-muted)]">Базовый порог запуска заказа:</span>
							<div class="num font-normal text-[var(--color-ink)]">5 000 ₽ (с НДС 22%)</div>
						</div>
						<div class="border-t border-[var(--color-rule)] pt-3">
							<span class="text-[var(--color-muted)]">Электронный документооборот (ЭДО):</span>
							<div class="mt-1 text-[var(--color-ink)]">Диадок (СКБ Контур) / СБИС (Тензор)</div>
						</div>
					</div>
				</div>

				<!-- Technical Passport / Limits -->
				<div class="well text-xs text-[var(--color-muted)]">
					<div class="font-normal text-[var(--color-ink)]">
						Лимиты оборудования цеха:
					</div>
					<div class="mt-3 space-y-2 font-mono text-[11px]">
						<div class="flex justify-between border-b border-[var(--color-rule)] pb-1.5">
							<span>Токарная обработка:</span>
							<span class="text-[var(--color-ink)]">Ø 200 × 750 мм</span>
						</div>
						<div class="flex justify-between border-b border-[var(--color-rule)] pb-1.5">
							<span>Фрезерная (3 оси):</span>
							<span class="text-[var(--color-ink)]">800 × 500 × 500 мм</span>
						</div>
						<div class="flex justify-between border-b border-[var(--color-rule)] pb-1.5">
							<span>Предельный квалитет:</span>
							<span class="text-[var(--color-ink)]">IT7</span>
						</div>
						<div class="flex justify-between">
							<span>Шероховатость:</span>
							<span class="text-[var(--color-ink)]">Ra 1.25 – 2.5 мкм</span>
						</div>
					</div>
				</div>

				<!-- Legal 152-FZ Compliance Box -->
				<div class="well text-xs text-[var(--color-muted)]">
					<div class="font-normal text-[var(--color-ink)]">
						Защита коммерческой тайны (NDA):
					</div>
					<p class="mt-2 text-[11px] leading-relaxed text-[var(--color-muted)]">
						Все технологические расчеты, чертежи и 3D-модели заказчиков строго конфиденциальны.
						Сайт не осуществляет сбор персональных данных в соответствии с 152-ФЗ РФ.
					</p>
				</div>
			</div>
		</div>
	</div>
</main>
