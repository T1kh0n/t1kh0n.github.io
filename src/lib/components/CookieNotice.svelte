<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$lib/paths';
	import { siteConfig } from '#lib/config/site';

	let isVisible = $state(false);

	const COOKIE_STORAGE_KEY = 'mp39_cookie_consent_v1';

	onMount(() => {
		try {
			const consented = localStorage.getItem(COOKIE_STORAGE_KEY);
			if (!consented) {
				isVisible = true;
			}
		} catch {
			isVisible = false;
		}
	});

	function acceptCookies() {
		try {
			localStorage.setItem(COOKIE_STORAGE_KEY, 'accepted');
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
			<div class="space-y-1 text-xs leading-relaxed text-[var(--color-muted)]">
				<div class="flex items-center gap-2">
					<span class="live-dot" aria-hidden="true"></span>
					<strong class="font-normal text-[var(--color-ink)]">
						Уведомление об использовании файлов cookie и веб-аналитики (152-ФЗ / 149-ФЗ)
					</strong>
				</div>
				<p>
					Наш сайт использует файлы cookie и обезличенный сервис веб-аналитики Яндекс.Метрика для
					оценки спроса и улучшения работы онлайн-калькулятора. Мы не собираем и не обрабатываем
					персональные данные. Подробнее — в нашей
					<a
						href="{base}/politika-konfidentsialnosti/"
						class="text-[var(--color-ink)] underline hover:text-[var(--color-accent)]"
					>
						Политике конфиденциальности
					</a>.
				</p>
			</div>
			<div class="flex shrink-0 items-center gap-3">
				<button
					type="button"
					onclick={acceptCookies}
					class="btn btn--sm whitespace-nowrap text-xs"
				>
					<span>Понятно, согласен</span>
				</button>
			</div>
		</div>
	</aside>
{/if}
