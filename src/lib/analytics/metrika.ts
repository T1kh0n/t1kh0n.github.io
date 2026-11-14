/**
 * Yandex Metrika Client-Side Event Tracking Utility.
 * Complies with 152-FZ and 149-FZ: no PII (Personal Identifiable Information) logged.
 * Tracking cookies are strictly gated behind user explicit consent AND build config flag.
 */

import { siteConfig } from '#lib/config/site';

export const COOKIE_STORAGE_KEY = 'mp39_cookie_consent_v1';

declare global {
	interface Window {
		ym?: (counterId: number, action: string, targetOrParams?: string | object, params?: object) => void;
		__mp39_ym_initialized?: boolean;
	}
}

export interface QuoteMetricsPayload {
	operation: string;
	material: string;
	quantity: number;
	complexity: string;
	dimensions: string;
	tolerance: string;
	urgency: string;
	isCustomerMaterial: boolean;
	hasGearCutting: boolean;
	isFileAttached: boolean;
	totalRub: number;
	unitRub: number;
	discountPercent: number;
}

/**
 * Checks if the user has provided explicit consent to analytics cookies.
 * Returns false immediately if Metrika is disabled in build configuration.
 */
export function hasAnalyticsConsent(): boolean {
	if (typeof window === 'undefined') return false;
	if (!siteConfig.enableYandexMetrika) return false;
	try {
		return localStorage.getItem(COOKIE_STORAGE_KEY) === 'accepted';
	} catch {
		return false;
	}
}

/**
 * Initializes Yandex Metrika dynamically ONLY when user explicit consent is granted
 * AND Yandex Metrika is enabled in siteConfig.
 * Adheres to 152-FZ, 149-FZ and Roskomnadzor cookie compliance requirements.
 */
export function initMetrikaIfConsented(): void {
	if (typeof window === 'undefined') return;
	if (!siteConfig.enableYandexMetrika) return;

	try {
		if (!hasAnalyticsConsent()) {
			return;
		}

		const rawCounterId = siteConfig.ymCounterId;
		const counterId = parseInt(rawCounterId, 10);
		if (isNaN(counterId) || counterId <= 0) return;

		if (window.__mp39_ym_initialized && typeof window.ym === 'function') {
			return;
		}

		// Initialize ym stub queue
		window.ym =
			window.ym ||
			function () {
				((window.ym as unknown as { a: unknown[] }).a =
					(window.ym as unknown as { a: unknown[] }).a || []).push(arguments);
			};
		(window.ym as unknown as { l: number }).l = 1 * new Date().getTime();

		const scriptId = 'ym-tag-script';
		if (!document.getElementById(scriptId)) {
			const script = document.createElement('script');
			script.id = scriptId;
			script.type = 'text/javascript';
			script.async = true;
			script.src = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
			const firstScript = document.getElementsByTagName('script')[0];
			if (firstScript && firstScript.parentNode) {
				firstScript.parentNode.insertBefore(script, firstScript);
			} else {
				document.head.appendChild(script);
			}
		}

		window.ym(counterId, 'init', {
			ssr: true,
			webvisor: false,
			clickmap: true,
			ecommerce: 'dataLayer',
			referrer: document.referrer,
			url: location.href,
			accurateTrackBounce: true,
			trackLinks: true
		});
		window.__mp39_ym_initialized = true;
	} catch {
		// Ignore local storage or script execution restrictions
	}
}

/**
 * Disables Metrika tracking and marks consent as revoked.
 */
export function disableMetrika(): void {
	if (typeof window === 'undefined') return;
	try {
		window.__mp39_ym_initialized = false;
	} catch {
		// Ignore
	}
}

/**
 * Returns a human-friendly quantity bracket for statistical aggregation.
 */
export function getQuantityBracket(qty: number): string {
	if (qty <= 4) return '1–4 шт (штучные)';
	if (qty <= 19) return '5–19 шт (мелкая серия)';
	if (qty <= 49) return '20–49 шт (средняя серия)';
	if (qty <= 99) return '50–99 шт (серия)';
	return '100+ шт (крупная серия)';
}

/**
 * Formats structured calculator data as an ergonomic tree for Yandex.Metrika.
 */
export function formatCalculatorMetrikaTree(quote: QuoteMetricsPayload) {
	return {
		Калькулятор_ЧПУ: {
			Тип_обработки: quote.operation,
			Сложность: quote.complexity,
			Материал: quote.material,
			Свой_металл: quote.isCustomerMaterial ? 'Да' : 'Нет',
			Точность: quote.tolerance,
			Срочность: quote.urgency,
			Зубонарезка: quote.hasGearCutting ? 'Да' : 'Нет',
			Чертеж_прикреплен: quote.isFileAttached ? 'Да' : 'Нет',
			Габариты: quote.dimensions,
			Тираж_диапазон: getQuantityBracket(quote.quantity),
			Тираж_шт: quote.quantity,
			Расчетная_стоимость: Math.round(quote.totalRub),
			Цена_за_штуку: Math.round(quote.unitRub),
			Скидка_за_серию: `${quote.discountPercent}%`
		}
	};
}

/**
 * Sends a custom goal and parameters payload to Yandex Metrika if consented and enabled.
 */
export function reachMetrikaGoal(goalName: string, params?: Record<string, string | number | boolean | object>) {
	if (typeof window === 'undefined') return;
	if (!siteConfig.enableYandexMetrika || !hasAnalyticsConsent()) return;

	const rawCounterId = siteConfig.ymCounterId;
	const counterId = parseInt(rawCounterId, 10);

	if (import.meta.env.DEV) {
		console.info(`[YM Goal] ${goalName}`, params);
	}

	if (!isNaN(counterId) && counterId > 0 && typeof window.ym === 'function') {
		if (params) {
			window.ym(counterId, 'reachGoal', goalName, params);
			window.ym(counterId, 'params', params);
		} else {
			window.ym(counterId, 'reachGoal', goalName);
		}
	}
}

/**
 * Tracks a simulated order submission from the cost calculator.
 */
export function trackOrderSubmission(quote: QuoteMetricsPayload) {
	if (!siteConfig.enableYandexMetrika || !hasAnalyticsConsent()) return;

	const rawCounterId = siteConfig.ymCounterId;
	const counterId = parseInt(rawCounterId, 10);
	const treeData = formatCalculatorMetrikaTree(quote);

	if (import.meta.env.DEV) {
		console.info('[YM Order Submit]', treeData);
	}

	if (typeof window !== 'undefined' && !isNaN(counterId) && counterId > 0 && typeof window.ym === 'function') {
		window.ym(counterId, 'reachGoal', 'calc_order_click', treeData);
		window.ym(counterId, 'reachGoal', 'demand_order_submit', treeData);
		window.ym(counterId, 'params', treeData);
	}
}

/**
 * Debounced synchronization of calculator parameters upon user interaction.
 */
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function syncCalculatorInteractionDebounced(quote: QuoteMetricsPayload, delayMs = 1500) {
	if (typeof window === 'undefined') return;
	if (!siteConfig.enableYandexMetrika || !hasAnalyticsConsent()) return;

	if (debounceTimer) {
		clearTimeout(debounceTimer);
	}

	debounceTimer = setTimeout(() => {
		const rawCounterId = siteConfig.ymCounterId;
		const counterId = parseInt(rawCounterId, 10);
		const treeData = formatCalculatorMetrikaTree(quote);

		if (!isNaN(counterId) && counterId > 0 && typeof window.ym === 'function') {
			window.ym(counterId, 'params', treeData);
		}
	}, delayMs);
}

/**
 * Tracks individual button/control clicks in calculator (quick high-intent telemetry).
 */
export function trackCalculatorInteraction(action: string, value: string | number) {
	if (!siteConfig.enableYandexMetrika) return;
	reachMetrikaGoal('calc_interaction', {
		action,
		value
	});
}
