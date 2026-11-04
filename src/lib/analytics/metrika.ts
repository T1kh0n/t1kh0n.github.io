/**
 * Yandex Metrika Client-Side Event Tracking Utility.
 * Complies with 152-FZ and 149-FZ: no PII (Personal Identifiable Information) logged.
 */

import { siteConfig } from '#lib/config/site';

declare global {
	interface Window {
		ym?: (counterId: number, action: string, targetOrParams: string | object, params?: object) => void;
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
	totalRub: number;
	unitRub: number;
	discountPercent: number;
}

/**
 * Sends a custom goal and parameters payload to Yandex Metrika.
 */
export function reachMetrikaGoal(goalName: string, params?: Record<string, string | number | boolean>) {
	if (typeof window === 'undefined') return;

	const rawCounterId = siteConfig.ymCounterId;
	const counterId = parseInt(rawCounterId, 10);

	// Log for development and debugging
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
	reachMetrikaGoal('demand_order_submit', {
		operation: quote.operation,
		material: quote.material,
		quantity: quote.quantity,
		complexity: quote.complexity,
		dimensions: quote.dimensions,
		tolerance: quote.tolerance,
		urgency: quote.urgency,
		is_customer_material: quote.isCustomerMaterial,
		total_rub: quote.totalRub,
		unit_rub: quote.unitRub,
		batch_discount_percent: quote.discountPercent
	});
}

/**
 * Tracks calculator parameter changes (high-intent interaction).
 */
export function trackCalculatorInteraction(action: string, value: string | number) {
	reachMetrikaGoal('calc_interaction', {
		action,
		value
	});
}
