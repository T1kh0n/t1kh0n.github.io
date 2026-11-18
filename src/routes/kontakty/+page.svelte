<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Главная', path: '/' }, { name: 'Контакты', path: '/kontakty/' }];
</script>

<svelte:head>
	<title>Контакты цеха металлообработки ЧПУ в Калининграде | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Контакты производственного цеха ЧПУ МеталлПром39 в Калининграде: прием чертежей (STEP, PDF, DXF), телефон диспетчера, адрес производства, режим работы и логистика."
	/>
	<link rel="canonical" href="{siteConfig.siteDomain}/kontakty/" />

	<!-- OpenGraph & Social Cards -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Контакты производства ЧПУ в Калининграде | {siteConfig.brandName}" />
	<meta
		property="og:description"
		content="Прямые контакты цеха металлообработки ЧПУ в Калининграде: телефон, корпоративная почта для чертежей, график работы и условия отгрузки."
	/>
	<meta property="og:url" content="{siteConfig.siteDomain}/kontakty/" />
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				Контакты производства и схема проезда
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Прямая связь с инженерно-технологическим отделом и диспетчерской службой цеха контрактной металлообработки в Калининграде.
			</p>
		</header>

		<div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Workload & Direct Contacts -->
			<div class="space-y-6 lg:col-span-7">
				<!-- Operating Status & Inbound Contacts -->
				<div class="well">
					<div class="flex items-center gap-2 font-mono text-[11px] text-[var(--color-accent)]">
						<span class="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
						СТАТУС: ПРОИЗВОДСТВО РАБОТАЕТ В ШТАТНОМ РЕЖИМЕ
					</div>
					<h2 class="mt-2 text-base font-normal text-[var(--color-ink)]">
						Прямой прием заказов и технической документации
					</h2>
					<p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
						Прием чертежей в форматах PDF, DXF, DWG и 3D-моделей STEP / IGES ведется в непрерывном режиме. Нормативный срок экспресс-оценки сметы и технологического маршрута — от 2 до 4 часов.
					</p>

					<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4">
							<div class="text-[11px] font-mono uppercase text-[var(--color-muted)]">Прием чертежей и спецификаций</div>
							<div class="mt-2 text-sm font-normal text-[var(--color-ink)]">
								<a href="mailto:{siteConfig.contactEmail || 'order@metalprom39.com'}" class="underline hover:text-[var(--color-accent)]">
									{siteConfig.contactEmail || "order@metalprom39.com"}
								</a>
							</div>
							<div class="mt-1 text-[11px] text-[var(--color-muted)]">Круглосуточный прием файлов (до 50 МБ)</div>
						</div>

						<div class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4">
							<div class="text-[11px] font-mono uppercase text-[var(--color-muted)]">Диспетчер цеха / Технолог</div>
							<div class="mt-2 text-sm font-normal text-[var(--color-ink)]">
								<a href="tel:{siteConfig.contactPhone || '+7 (4012) 00-00-00'}" class="underline hover:text-[var(--color-accent)]">
									{siteConfig.contactPhone || "+7 (4012) 00-00-00"}
								</a>
							</div>
							<div class="mt-1 text-[11px] text-[var(--color-muted)]">Пн–Пт с 08:00 до 18:00 (время местное)</div>
						</div>
					</div>

					<div class="mt-6 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5">
						<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div class="min-w-0 flex-1">
								<div class="text-sm font-normal text-[var(--color-ink)]">
									Инженерный онлайн-расчет
								</div>
								<div class="mt-1 text-xs text-[var(--color-muted)]">
									Рассчитайте себестоимость партии и сформируйте предварительную спецификацию
								</div>
							</div>
							<a
								href="{base}/kalkulyator-stoimosti-chpu/"
								class="btn btn--sm shrink-0 text-center"
							>
								<span>Открыть калькулятор</span>
							</a>
						</div>
					</div>
				</div>

				<!-- Working Hours -->
				<div class="well">
					<h2 class="text-sm font-normal text-[var(--color-ink)]">
						Режим работы производственных участков
					</h2>
					<div class="mt-4 space-y-2 text-xs text-[var(--color-ink-2)]">
						<div class="flex justify-between border-b border-[var(--color-rule)] py-2">
							<span class="text-[var(--color-muted)]">Станочный парк ЧПУ (токарный и фрезерный):</span>
							<span class="num text-[var(--color-ink)]"
								>Понедельник — Пятница: 08:00 – 20:00 (2 смены)</span
							>
						</div>
						<div class="flex justify-between border-b border-[var(--color-rule)] py-2">
							<span class="text-[var(--color-muted)]">Инженерно-технологический отдел:</span>
							<span class="num text-[var(--color-ink)]">Понедельник — Пятница: 08:30 – 17:30</span>
						</div>
						<div class="flex justify-between py-2">
							<span class="text-[var(--color-muted)]">Участок готовой продукции и самовывоз:</span>
							<span class="num text-[var(--color-ink)]">Понедельник — Суббота: 09:00 – 17:00</span>
						</div>
					</div>
				</div>

				<!-- Location & Address -->
				<div class="well">
					<h2 class="text-sm font-normal text-[var(--color-ink)]">
						Фактическое расположение цеха
					</h2>
					<p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
						Производственная площадка цеха расположена в индустриальном секторе Калининграда:
					</p>
					<div class="mt-3 space-y-1 text-xs text-[var(--color-ink)] font-mono">
						<div>Адрес: {siteConfig.addressRegion}, {siteConfig.addressLocality}, {siteConfig.addressStreet}</div>
						<div>Ориентир: Индустриальная промзона (Московский район, район ул. Дзержинского)</div>
						<div>Координаты GPS: {siteConfig.geoLatitude}, {siteConfig.geoLongitude}</div>
					</div>
					<div class="mt-4 border-t border-[var(--color-rule)] pt-3 text-xs text-[var(--color-muted)]">
						Доставка готовых изделий осуществляется собственным автотранспортом цеха по Калининграду, а также во все промышленные центры области: Светлый, Балтийск, Гурьевск, Черняховск, Советск.
					</div>
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
