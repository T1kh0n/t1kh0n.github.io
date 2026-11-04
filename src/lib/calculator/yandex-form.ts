/**
 * Yandex Forms integration with pre-filled parameters and redirect management.
 * Complies with 152-FZ & 149-FZ.
 */

import { siteConfig } from '#lib/config/site';
import { WORKSHOP_SPECS } from '#lib/content/workshop-specs';

export interface YandexFormData {
	operation: string;
	material: string;
	quantity: number;
	dimensions: string;
	tolerance: string;
	complexity: string;
	urgency: string;
	totalRub: number;
	unitRub: number;
	attachedFileName?: string;
	customerNote?: string;
}

/**
 * Builds a direct Yandex Form URL with both structured query params and full specification text.
 */
export function buildYandexFormUrl(data: YandexFormData): string {
	const baseUrl = siteConfig.yandexFormUrl || WORKSHOP_SPECS.defaultYandexFormUrl;

	try {
		const url = new URL(baseUrl);

		// Flat query parameters for mapped form question aliases
		url.searchParams.set('operation', data.operation);
		url.searchParams.set('material', data.material);
		url.searchParams.set('quantity', String(data.quantity));
		url.searchParams.set('dimensions', data.dimensions);
		url.searchParams.set('tolerance', data.tolerance);
		url.searchParams.set('complexity', data.complexity);
		url.searchParams.set('cost', `${data.totalRub.toLocaleString('ru-RU')} ₽`);

		if (data.attachedFileName) {
			url.searchParams.set('attached_file', data.attachedFileName);
		}

		// Text summary in comment field for universal fallback
		const summaryText = [
			`[Спецификация с сайта ${siteConfig.brandName}]`,
			`Операция: ${data.operation}`,
			`Материал: ${data.material}`,
			`Тираж: ${data.quantity} шт.`,
			`Габариты: ${data.dimensions}`,
			`Квалитет точности: ${data.tolerance}`,
			`Сложность: ${data.complexity}`,
			`Срок: ${data.urgency}`,
			`Ориентировочная сумма: ${data.totalRub.toLocaleString('ru-RU')} ₽ (в т.ч. НДС 22%)`,
			data.attachedFileName ? `Прикрепленный чертеж: ${data.attachedFileName}` : null,
			data.customerNote ? `Примечание: ${data.customerNote}` : null
		]
			.filter(Boolean)
			.join('\n');

		url.searchParams.set('comment', summaryText);
		url.searchParams.set('text_spec', summaryText);

		return url.toString();
	} catch {
		return baseUrl;
	}
}
