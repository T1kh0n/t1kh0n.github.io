/**
 * Yandex Metrika Client-Side Event Tracking Utility.
 * Complies with 152-FZ and 149-FZ: no PII (Personal Identifiable Information) logged.
 */

import { siteConfig } from '#lib/config/site';

declare global {
	interface Window {
		ym?: (counterId: number, action: string, targetOrParams?: string | object, params?: object) => void;
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
 * Sends a custom goal and parameters payload to Yandex Metrika.
 */
export function reachMetrikaGoal(goalName: string, params?: Record<string, string | number | boolean | object>) {
	if (typeof window === 'undefined') return;

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
 * Sends both the primary JS goals:
 * 1. 'calc_order_click' (recommended naming)
 * 2. 'demand_order_submit' (backward compatibility with existing goal configs)
 * along with the complete hierarchical tree in visit parameters.
 */
export function trackOrderSubmission(quote: QuoteMetricsPayload) {
	const rawCounterId = siteConfig.ymCounterId;
	const counterId = parseInt(rawCounterId, 10);
	const treeData = formatCalculatorMetrikaTree(quote);

	if (import.meta.env.DEV) {
		console.info('[YM Order Submit]', treeData);
	}

	if (typeof window !== 'undefined' && !isNaN(counterId) && counterId > 0 && typeof window.ym === 'function') {
		// Send both goal aliases with full payload so either registered goal name works
		window.ym(counterId, 'reachGoal', 'calc_order_click', treeData);
		window.ym(counterId, 'reachGoal', 'demand_order_submit', treeData);

		// Synchronize visit parameters tree for "Параметры визитов"
		window.ym(counterId, 'params', treeData);
	}
}

/**
 * Debounced synchronization of calculator parameters upon user interaction.
 * Captures demand trends even if user explores options but leaves without clicking the submit button.
 */
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function syncCalculatorInteractionDebounced(quote: QuoteMetricsPayload, delayMs = 1500) {
	if (typeof window === 'undefined') return;

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
	reachMetrikaGoal('calc_interaction', {
		action,
		value
	});
}
