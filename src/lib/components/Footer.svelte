<script lang="ts">
	import { base } from '$lib/paths';
	import { siteConfig } from '#lib/config/site';

	const currentYear = new Date().getFullYear();
</script>

<footer
	class="border-t border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)]"
>
	<!-- Main Footer Columns -->
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Col 1: Production Plant Summary -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div
						class="flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-sm font-light text-[var(--color-ink)]"
					>
						M
					</div>
					<span class="text-base font-light tracking-tight text-[var(--color-ink)]"
						>{siteConfig.brandName}</span
					>
				</div>
				<p class="text-xs leading-relaxed text-[var(--color-muted)]">
					Специализированный участок механической обработки с ЧПУ в Калининградской
					области. Изготовление серийных и единичных деталей по чертежам заказчика для
					машиностроения, приборостроения и промышленного оборудования. Доставка готовых изделий по всей Калининградской области.
				</p>
				<div
					class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3 text-xs"
				>
					<div class="font-normal text-[var(--color-ink)]">Режим работы цеха:</div>
					<div class="mt-1 font-mono text-[var(--color-muted)]">Пн–Пт: 08:00 – 20:00 (2 смены)</div>
					<div class="font-mono text-[var(--color-muted)]">
						Сб: 09:00 – 16:00 (дежурный технолог)
					</div>
				</div>
			</div>

			<!-- Col 2: Core Machining Services -->
			<div>
				<h3 class="text-xs font-normal text-[var(--color-ink)]">Услуги механообработки</h3>
				<ul class="mt-4 space-y-2.5 text-xs">
					<li>
						<a
							href="{base}/tokarnye-raboty-chpu/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Токарные работы с ЧПУ (до ⌀200 мм)
						</a>
					</li>
					<li>
						<a
							href="{base}/frezernye-raboty-chpu/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Фрезерная ЧПУ обработка (3 оси)
						</a>
					</li>
					<li>
						<a
							href="{base}/zuboreznye-i-shlifovalnye-raboty/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Зубонарезные работы
						</a>
					</li>
					<li>
						<a
							href="{base}/kalkulyator-stoimosti-chpu/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Онлайн-калькулятор стоимости
						</a>
					</li>
				</ul>
			</div>

			<!-- Col 3: Quality, Park & Knowledge Base -->
			<div>
				<h3 class="text-xs font-normal text-[var(--color-ink)]">Инженерия и стандарты</h3>
				<ul class="mt-4 space-y-2.5 text-xs">
					<li>
						<a
							href="{base}/kontrol-kachestva-i-oborudovanie/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Контроль ОТК и станочный парк
						</a>
					</li>
					<li>
						<a
							href="{base}/portfolio/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Портфолио изготовленных деталей
						</a>
					</li>
					<li>
						<a
							href="{base}/stati/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Инженерная база знаний и статьи
						</a>
					</li>
					<li>
						<a
							href="{base}/stati/vybor-stali-dlya-chpu-obrabotki/"
							class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
						>
							Справочник сталей (Ст45, 40Х, Д16Т)
						</a>
					</li>
					<li>
						<a
							href="{base}/stati/kvalitety-tochnosti-i-sherohovatost-gost/"
							class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
						>
							Таблицы допусков IT7–IT12 и Ra
						</a>
					</li>
					<li>
						<a
							href="{base}/stati/optimizaciya-stoimosti-detaley-chpu/"
							class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
						>
							Правила снижения цены ЧПУ (DFM)
						</a>
					</li>
				</ul>
			</div>

			<!-- Col 4: Lead Generation & Order Intake -->
			<div>
				<h3 class="text-xs font-normal text-[var(--color-ink)]">Прием заказов и чертежей</h3>
				<div class="mt-4 space-y-3 text-xs">
					<p class="leading-relaxed text-[var(--color-muted)]">
						Прием чертежей, 3D-моделей (STEP, IGES) и ТЗ через форму. Работаем с юридическими лицами, ИП и физлицами по всей Калининградской области.
					</p>
					<a
						href={siteConfig.yandexFormUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn--sm btn--wide"
					>
						<span>Заявка в Яндекс.Форме</span>
					</a>
					<div class="border-t border-[var(--color-rule)] pt-3 text-xs text-[var(--color-muted)]">
						<div>Безналичный расчет с НДС 22% / УСН</div>
						<div>Оплата для физических лиц</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 152-FZ Compliance Disclaimer Box -->
		<div
			class="mt-10 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 text-xs leading-relaxed text-[var(--color-muted)]"
		>
			<strong class="font-normal text-[var(--color-ink-2)]">Правовое уведомление (152-ФЗ):</strong>
			Веб-сайт {siteConfig.brandName} не осуществляет сбор или хранение персональных данных на сервере сайта.
			Все расчеты калькулятора носят характер предварительной технической оценки. Прием чертежей и заявок
			от предприятий и граждан осуществляется через защищенную Яндекс.Форму.
		</div>

		<!-- Bottom Copyright Bar -->
		<div
			class="mt-8 flex flex-col items-center justify-between border-t border-[var(--color-rule)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row"
		>
			<div>
				© {currentYear}
				{siteConfig.brandName}. Металлообработка с ЧПУ в Калининграде. Доставка по всей области.
			</div>
			<div class="mt-3 flex items-center gap-6 text-xs sm:mt-0">
				<a
					href="{base}/politika-konfidentsialnosti/"
					class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
				>
					Политика конфиденциальности
				</a>
				<a
					href="{base}/sitemap/"
					class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
				>
					Карта сайта
				</a>
			</div>
		</div>
	</div>
</footer>
