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
 * Sends both the JS goal 'demand_order_submit' and hierarchical visit parameters.
 */
export function trackOrderSubmission(quote: QuoteMetricsPayload) {
	const rawCounterId = siteConfig.ymCounterId;
	const counterId = parseInt(rawCounterId, 10);

	// 1. Goal with flat parameters
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

	// 2. Hierarchical visit parameters tree for easy drill-down in Yandex.Metrika reports
	if (typeof window !== 'undefined' && !isNaN(counterId) && counterId > 0 && typeof window.ym === 'function') {
		window.ym(counterId, 'params', {
			'Заявка_на_расчет': {
				'Вид_обработки': quote.operation,
				'Материал': quote.material,
				'Количество_шт': quote.quantity,
				'Сложность': quote.complexity,
				'Габариты': quote.dimensions,
				'Квалитет': quote.tolerance,
				'Срочность': quote.urgency,
				'Металл_заказчика': quote.isCustomerMaterial ? 'Да' : 'Нет',
				'Сумма_заказа_руб': quote.totalRub,
				'Цена_за_штуку_руб': quote.unitRub,
				'Скидка_за_серию': `${quote.discountPercent}%`
			}
		});
	}
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
