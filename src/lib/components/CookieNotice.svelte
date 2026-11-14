<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$lib/paths';
	import {
		COOKIE_STORAGE_KEY,
		initMetrikaIfConsented,
		disableMetrika
	} from '#lib/analytics/metrika';

	let isVisible = $state(false);

	onMount(() => {
		try {
			const consented = localStorage.getItem(COOKIE_STORAGE_KEY);
			if (!consented) {
				isVisible = true;
			} else if (consented === 'accepted') {
				initMetrikaIfConsented();
			}
		} catch {
			isVisible = false;
		}

		const handleOpenSettings = () => {
			isVisible = true;
		};

		window.addEventListener('open-cookie-settings', handleOpenSettings);
		return () => {
			window.removeEventListener('open-cookie-settings', handleOpenSettings);
		};
	});

	function acceptCookies() {
		try {
			localStorage.setItem(COOKIE_STORAGE_KEY, 'accepted');
			initMetrikaIfConsented();
		} catch {
			// ignore local storage restrictions
		}
		isVisible = false;
	}

	function rejectCookies() {
		try {
			localStorage.setItem(COOKIE_STORAGE_KEY, 'rejected');
			disableMetrika();
		} catch {
			// ignore local storage restrictions
		}
		isVisible = false;
	}
</script>

{#if isVisible}
	<aside
		class="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-4xl rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)]/98 p-4 shadow-2xl backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:p-5"
		role="region"
		aria-label="Уведомление об использовании cookie и веб-аналитики"
	>
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="space-y-1.5 text-xs leading-relaxed text-[var(--color-muted)]">
				<div class="flex items-center gap-2">
					<span class="live-dot" aria-hidden="true"></span>
					<strong class="font-normal text-[var(--color-ink)]">
						Уведомление об использовании файлов cookie и веб-аналитики (152-ФЗ / 149-ФЗ)
					</strong>
				</div>
				<p>
					Наш сайт использует строго необходимые технические файлы cookie для стабильной работы интерфейса,
					а также с вашего предварительного согласия — обезличенный сервис веб-аналитики Яндекс.Метрика для
					оценки спроса и улучшения калькулятора. Мы гарантируем право на отказ от сбора аналитических данных.
					Подробнее — в нашей
					<a
						href="{base}/politika-konfidentsialnosti/"
						class="text-[var(--color-ink)] underline hover:text-[var(--color-accent)]"
					>
						Политике конфиденциальности
					</a>
					и
					<a
						href="{base}/politika-cookie/"
						class="text-[var(--color-ink)] underline hover:text-[var(--color-accent)]"
					>
						Политике cookie
					</a>.
				</p>
			</div>
			<div class="flex shrink-0 flex-wrap items-center gap-2.5 sm:flex-nowrap">
				<button
					type="button"
					onclick={rejectCookies}
					class="btn btn--sm btn--line whitespace-nowrap text-xs"
				>
					<span>Только необходимые (отказаться)</span>
				</button>
				<button
					type="button"
					onclick={acceptCookies}
					class="btn btn--sm whitespace-nowrap text-xs"
				>
					<span>Принять все</span>
				</button>
			</div>
		</div>
	</aside>
{/if}
