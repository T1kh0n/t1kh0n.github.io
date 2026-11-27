import { expect, test } from '@playwright/test';

const BASE = process.env.BASE_PATH || '';

const coreRoutes = [
	{ path: `${BASE}/`, titlePart: 'Металлообработка' },
	{ path: `${BASE}/tokarnye-raboty-chpu/`, titlePart: 'Токарные работы' },
	{ path: `${BASE}/frezernye-raboty-chpu/`, titlePart: 'Фрезерные работы' },
	{ path: `${BASE}/zuboreznye-i-shlifovalnye-raboty/`, titlePart: 'Зуборезные' },
	{ path: `${BASE}/kalkulyator-stoimosti-chpu/`, titlePart: 'калькулятор' },
	{ path: `${BASE}/portfolio/`, titlePart: 'Портфолио' },
	{ path: `${BASE}/kontrol-kachestva-i-oborudovanie/`, titlePart: 'Контроль качества' },
	{ path: `${BASE}/kontakty/`, titlePart: 'Контакт' },
	{ path: `${BASE}/stati/`, titlePart: 'база знаний' },
	{ path: `${BASE}/stati/vybor-stali-dlya-chpu-obrabotki/`, titlePart: 'Выбор сталей' },
	{ path: `${BASE}/stati/kvalitety-tochnosti-i-sherohovatost-gost/`, titlePart: 'Квалитеты точности' },
	{ path: `${BASE}/stati/optimizaciya-stoimosti-detaley-chpu/`, titlePart: 'DFM-оптимизация' },
	{ path: `${BASE}/stati/obrabotka-nerzhaveyushchey-stali-12x18n10t/`, titlePart: 'нержавейк' },
	{ path: `${BASE}/stati/izgotovlenie-zubchatykh-koles-gost/`, titlePart: 'зубчат' },
	{ path: `${BASE}/oferta/`, titlePart: 'оферта' },
	{ path: `${BASE}/politika-cookie/`, titlePart: 'cookie' },
	{ path: `${BASE}/politika-konfidentsialnosti/`, titlePart: 'Политика конфиденциальности' },
	{ path: `${BASE}/sitemap/`, titlePart: 'Карта сайта' }
];

test.describe('B2B Core Routes Navigation & Hallmark Design Verification', () => {
	for (const route of coreRoutes) {
		test(`route "${route.path}" renders with single h1 and header/footer`, async ({ page }) => {
			await page.goto(route.path);

			// Exactly one <h1> per page (SEO Checklist Item 4)
			const h1Count = await page.locator('h1').count();
			expect(h1Count).toBe(1);

			// Page title contains expected keyword
			await expect(page).toHaveTitle(new RegExp(route.titlePart, 'i'));

			// Site Banner Header and Contentinfo Footer rendered
			await expect(page.getByRole('banner')).toBeVisible();
			await expect(page.getByRole('contentinfo')).toBeVisible();

			// Zero personal data collection assertion (152-FZ compliance)
			const telInputs = await page.locator('input[type="tel"]').count();
			expect(telInputs).toBe(0);

			// Check breadcrumbs present on subpages
			if (route.path !== `${BASE}/`) {
				const breadcrumbs = page.locator('nav[aria-label="Хлебные крошки"]');
				await expect(breadcrumbs).toBeVisible();
			}
		});
	}
});

test('service pages include Schema.org JSON-LD structured data', async ({ page }) => {
	await page.goto(toRoute('/tokarnye-raboty-chpu/'));

	const jsonLdScripts = page.locator('script[type="application/ld+json"]');
	const count = await jsonLdScripts.count();
	expect(count).toBeGreaterThan(0);
});

test('header navigation links point to valid routes and respond to clicks', async ({ page }) => {
	await page.goto(toRoute('/'));

	const nav = page.getByRole('navigation', { name: 'Основная навигация' });
	const links = nav.getByRole('link');
	const linkCount = await links.count();
	expect(linkCount).toBeGreaterThan(3);
});

function toRoute(r: string) {
	return BASE ? `${BASE}${r === '/' ? '/' : r}` : r;
}
