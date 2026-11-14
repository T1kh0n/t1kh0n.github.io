<script lang="ts">
	import { base } from '$lib/paths';
	import { siteConfig } from '#lib/config/site';
	import BrandLogo from '#lib/components/BrandLogo.svelte';

	const currentYear = new Date().getFullYear();

	function openCookieSettings() {
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new CustomEvent('open-cookie-settings'));
		}
	}
</script>

<footer
	class="border-t border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)]"
>
	<!-- Main Footer Columns -->
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Col 1: Production Plant Summary -->
			<div class="space-y-4">
				<a href="{base}/" class="inline-block">
					<BrandLogo size="sm" showTagline={false} />
				</a>
				<p class="text-xs leading-relaxed text-[var(--color-muted)]">
					Специализированный участок механообработки: 2 обрабатывающих центра с ЧПУ в Калининградской
					области. Изготовление деталей по чертежам заказчика для
					машиностроения, приборостроения и промышленного оборудования. Доставка готовых изделий по всей Калининградской области.
				</p>
				<div
					class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3 text-xs"
				>
					<div class="font-normal text-[var(--color-ink)]">Режим работы производства:</div>
					<div class="mt-1 font-mono text-[var(--color-muted)]">Пн–Пт: 08:00 – 20:00 (2 смены)</div>
					<div class="mt-1 font-mono text-[var(--color-muted)]">
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
							Контроль ОТК и станочный парк (2 центра)
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

			<!-- Col 4: Order Calculation & Status -->
			<div>
				<h3 class="text-xs font-normal text-[var(--color-ink)]">Расчет стоимости</h3>
				<div class="mt-4 space-y-3 text-xs">
					<p class="leading-relaxed text-[var(--color-muted)]">
						Используйте интерактивный калькулятор для оценки себестоимости и времени обработки по чертежам и 3D-моделям (STEP).
					</p>
					<a
						href="{base}/kalkulyator-stoimosti-chpu/"
						class="btn btn--sm btn--wide"
					>
						<span>Открыть калькулятор</span>
					</a>
					<div class="border-t border-[var(--color-rule)] pt-3 text-xs text-[var(--color-muted)]">
						<div>Безналичный расчет с НДС 22% / УСН</div>
						<div>Оплата для физических лиц</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 152-FZ Compliance Disclaimer Box & Legal Requisites -->
		<div
			class="mt-10 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 text-xs leading-relaxed text-[var(--color-muted)]"
		>
			<div class="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-rule)] pb-2 text-[11px]">
				<span class="font-normal text-[var(--color-ink)]">{siteConfig.brandLegalName}</span>
				<span class="num text-[var(--color-ink-2)]">ИНН: 3906999990 · КПП: 390601001 · ОГРН: 1233900000000</span>
				<span>{siteConfig.addressRegion}, {siteConfig.addressLocality}</span>
			</div>
			<p>
				<strong class="font-normal text-[var(--color-ink-2)]">Правовое уведомление (152-ФЗ, 149-ФЗ и ст. 437 ГК РФ):</strong>
				Веб-сайт {siteConfig.brandName} носит информационно-расчетный характер и не осуществляет сбор, систематизацию
				или хранение персональных данных пользователей в общедоступных формах. Расчеты онлайн-калькулятора носят предварительный характер.
				Условия оказания производственных услуг регламентируются
				<a href="{base}/oferta/" class="text-[var(--color-ink)] underline hover:text-[var(--color-accent)]">Публичной офертой</a>.
				{#if siteConfig.enableYandexMetrika}
					Обезличенная статистика посещаемости собирается сервисом Яндекс.Метрика исключительно с предварительного согласия пользователя в соответствии с
				{:else}
					Обработка технических идентификаторов регламентируется
				{/if}
				<a href="{base}/politika-cookie/" class="text-[var(--color-ink)] underline hover:text-[var(--color-accent)]">Политикой cookie</a>.
			</p>
		</div>

		<!-- Bottom Copyright Bar -->
		<div
			class="mt-8 flex flex-col items-center justify-between border-t border-[var(--color-rule)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row"
		>
			<div>
				© {currentYear}
				{siteConfig.brandName}. 2 обрабатывающих центра с ЧПУ в Калининграде. Доставка по всей области.
			</div>
			<div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:mt-0">
				<a
					href="{base}/oferta/"
					class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
				>
					Публичная оферта
				</a>
				<a
					href="{base}/politika-konfidentsialnosti/"
					class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
				>
					Политика конфиденциальности
				</a>
				<a
					href="{base}/politika-cookie/"
					class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
				>
					Политика cookie
				</a>
				<button
					type="button"
					onclick={openCookieSettings}
					class="cursor-pointer text-[var(--color-muted)] underline transition-colors hover:text-[var(--color-ink)]"
				>
					Настройки cookie
				</button>
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
