<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [
		{ name: 'Политика конфиденциальности', path: '/politika-konfidentsialnosti/' }
	];
</script>

<svelte:head>
	<title>Политика конфиденциальности, безопасности и правовой статус | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Официальная правовая позиция цеха MetalProm39 по 152-ФЗ и 149-ФЗ: статус не-оператора персональных данных, регламент использования файлов cookie и веб-аналитики."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<article>
			<header class="border-b border-[var(--color-rule)] pb-8">
				<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
					Политика конфиденциальности и безопасности цеха
				</h1>
				<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
					Правовые стандарты взаимодействия по 152-ФЗ и 149-ФЗ, статус не-оператора персональных данных и регламент обработки обезличенной веб-аналитики.
				</p>
				<p class="num mt-2 text-xs text-[var(--color-muted)]">
					Редакция от 28 октября 2026 года · Механический цех {siteConfig.brandLegalName}
				</p>
			</header>

			<div class="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
				<div class="space-y-6 text-xs leading-relaxed text-[var(--color-muted)] lg:col-span-8">
					<!-- 152-FZ Non-Operator Posture Declaration -->
					<div class="well text-xs leading-relaxed text-[var(--color-ink-2)]">
						<div class="font-normal text-[var(--color-ink)]">
							Декларация о статусе не-оператора персональных данных:
						</div>
						<p class="mt-2 max-w-2xl text-xs leading-relaxed text-[var(--color-muted)]">
							Информационный ресурс <strong class="font-normal text-[var(--color-ink)]"
								>{siteConfig.siteDomain}</strong
							> не ведет сбор, систематизацию, хранение или передачу персональных данных физических лиц
							в понимании Федерального закона № 152-ФЗ «О персональных данных». Ресурс не содержит форм регистрации, личных кабинетов или полей ввода персональных данных (ФИО, телефонов, адресов электронной почты).
						</p>
					</div>

					<div class="space-y-6">
						<div>
							<h2 class="text-base text-[var(--color-ink)]">1. Общие положения и цели ресурса</h2>
							<p class="mt-2 max-w-2xl">
								1.1. Веб-сайт служит целям информирования организаций, индивидуальных предпринимателей и граждан о технологических возможностях металлообрабатывающего оборудования цеха {siteConfig.brandName}.
							</p>
							<p class="mt-2 max-w-2xl">
								1.2. Расчеты онлайн-калькулятора носят справочный характер и не являются публичной офертой (ст. 437 ГК РФ).
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								2. Анонимные технические параметры и калькулятор
							</h2>
							<p class="mt-2 max-w-2xl">
								2.1. Использование встроенного инженерного калькулятора осуществляется на добровольной и полностью анонимной основе.
							</p>
							<p class="mt-2 max-w-2xl">
								2.2. Запрашиваемые в калькуляторе параметры включают исключительно технические характеристики изготавливаемой детали (тип операции, марку металла, объем партии, габариты, квалитет допуска). Персональные данные при этом не запрашиваются и не сохраняются.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">3. Файлы cookie и счетчик Яндекс.Метрика</h2>
							<p class="mt-2 max-w-2xl">
								3.1. Для сохранения пользовательских настроек интерфейса (согласие на использование cookie) сайт использует локальное хранилище браузера (LocalStorage).
							</p>
							<p class="mt-2 max-w-2xl">
								3.2. В целях статистического учета посещаемости и оценки востребованности видов металлообработки на сайте функционирует сервис веб-аналитики Яндекс.Метрика. Счетчик собирает обезличенные технические данные (тип устройства, разрешение экрана, источник перехода, выбранные параметры калькулятора без привязки к личности).
							</p>
							<p class="mt-2 max-w-2xl">
								3.3. В целях анализа удобства взаимодействия с интерфейсом инженерного калькулятора счетчик фиксирует обезличенные сценарии использования и карту кликов без сбора или фиксации персональных данных.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								4. Конфиденциальность инженерной документации (NDA)
							</h2>
							<p class="mt-2 max-w-2xl">
								4.1. Все поступающие чертежи, 3D-модели (STEP) и конструкторские данные заказчиков составляют коммерческую тайну и защищаются положениями о неразглашении конфиденциальной информации.
							</p>
							<p class="mt-2 max-w-2xl">
								4.2. Спецификации, сформированные на сайте, не передаются сторонним рекламным или коммерческим организациям.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								5. Политика информационной безопасности и защита данных
							</h2>
							<p class="mt-2 max-w-2xl">
								5.1. Все веб-соединения защищены протоколом шифрования TLS 1.3 с обязательным использованием механизма HSTS (Strict-Transport-Security), что исключает возможность перехвата технического трафика при взаимодействии с сайтом.
							</p>
							<p class="mt-2 max-w-2xl">
								5.2. Инженерные спецификации, файлы 3D-моделей (.STEP, .IGES) и расчеты обрабатываются исключительно локально в изолированном контексте браузера пользователя (WebAssembly / Web Worker) без фоновой выгрузки на сторонние облачные серверы.
							</p>
							<p class="mt-2 max-w-2xl">
								5.3. Предприятие соблюдает требования Федерального закона № 149-ФЗ «Об информации, информационных технологиях и о защите информации», обеспечивает защиту коммерческой тайны контрагентов и регулярно проводит аудит целостности контента.
							</p>
						</div>
					</div>
				</div>

				<!-- Sidebar / Requisites (lg:col-span-4) -->
				<aside class="space-y-6 lg:col-span-4">
					<div class="well font-mono text-xs text-[var(--color-muted)]">
						<div class="font-sans font-normal text-[var(--color-ink)]">
							{siteConfig.brandLegalName}
						</div>
						<div class="num mt-2">ИНН: 3906999990 · КПП: 390601001</div>
						<div class="num">ОГРН: 1233900000000</div>
						<div class="mt-2 font-sans">
							{siteConfig.addressRegion}, {siteConfig.addressLocality}
						</div>
					</div>
				</aside>
			</div>
		</article>
	</div>
</main>
