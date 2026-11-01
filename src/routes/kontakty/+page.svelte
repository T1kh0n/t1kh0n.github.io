<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Прием заявок', path: '/kontakty/' }];
</script>

<svelte:head>
	<title>Прием заявок и чертежей на металлообработку ЧПУ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Прием чертежей и заявок на металлообработку с ЧПУ в Калининграде через Яндекс.Форму. Допуски до IT7, партии от 1 шт., срок до 2 недель. Безналичный расчет с НДС 22% и для физлиц."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				Прием заявок и чертежей ЧПУ
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Прием чертежей, 3D-моделей и технических заданий на контрактную металлообработку. Работаем
				с юридическими лицами, ИП (с НДС 22%) и физическими лицами по всей Калининградской области.
			</p>
		</header>

		<div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Order Submission Channel -->
			<div class="space-y-6 lg:col-span-7">
				<div class="well">
					<h2 class="text-sm font-normal text-[var(--color-ink)]">
						Электронная подача заявки и чертежей
					</h2>
					<p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
						Все заявки на расчет себестоимости и изготовление деталей принимаются круглосуточно через
						защищенную форму. Прикрепите файлы чертежей или 3D-моделей, укажите количество и марку материала.
					</p>

					<div class="mt-6 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5">
						<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<div class="text-sm font-normal text-[var(--color-ink)]">
									Яндекс.Форма приема чертежей
								</div>
								<div class="mt-1 text-xs text-[var(--color-muted)]">
									Форматы: STEP, STP, IGES, PDF, DXF, DWG
								</div>
							</div>
							<a
								href={siteConfig.yandexFormUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn--wide sm:btn--sm shrink-0"
							>
								<span>Заполнить Яндекс.Форму</span>
							</a>
						</div>
					</div>

					<div class="mt-6 border-t border-[var(--color-rule)] pt-4 text-xs text-[var(--color-muted)]">
						<div>Срок инженерной оценки: <strong class="font-normal text-[var(--color-ink)]">в течение рабочего дня</strong></div>
						<div class="mt-1">Срок изготовления партии: <strong class="font-normal text-[var(--color-ink)]">до 2 недель</strong></div>
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
						Организуем оперативную доставку готовых деталей собственным автотранспортом цеха или курьерскими службами:
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
							<div class="font-normal text-[var(--color-ink)]">Безналичная оплата по счету / квитанции</div>
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

				<!-- Legal 152-FZ Compliance Box -->
				<div class="well text-xs text-[var(--color-muted)]">
					<div class="font-normal text-[var(--color-ink)]">
						Защита коммерческой тайны (NDA):
					</div>
					<p class="mt-2 text-[11px] leading-relaxed text-[var(--color-muted)]">
						Все полученные чертежи, 3D-модели и конструкторская документация заказчиков строго конфиденциальны.
						По запросу подписывается двустороннее соглашение о неразглашении (NDA) до передачи файлов.
					</p>
				</div>
			</div>
		</div>
	</div>
</main>
