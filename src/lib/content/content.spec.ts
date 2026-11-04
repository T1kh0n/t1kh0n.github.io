import { describe, it, expect } from 'vitest';
import { WORKSHOP_SPECS } from './workshop-specs';
import { parseMarkdown, injectWorkshopVariables } from './markdown-parser';
import { getAllArticles, getArticleBySlug } from './articles-loader';
import { getAllPages, getPageBySlug } from './pages-loader';
import { SITEMAP_REGISTRY, getGroupedSitemap } from './sitemap-registry';
import { buildYandexFormUrl } from '#lib/calculator/yandex-form';

describe('WORKSHOP_SPECS (Single Source of Truth)', () => {
	it('defines strictly 2 CNC machining centers', () => {
		expect(WORKSHOP_SPECS.machineCentersCount).toBe(2);
		expect(WORKSHOP_SPECS.machineCentersDescription).toContain('2 обрабатывающих центра с ЧПУ');
	});

	it('defines correct limits: lathe ⌀200×750 mm, mill 800×500×500 mm (3 axes)', () => {
		expect(WORKSHOP_SPECS.latheMaxDiameterMm).toBe(200);
		expect(WORKSHOP_SPECS.latheMaxCenterDistanceMm).toBe(750);
		expect(WORKSHOP_SPECS.latheLimitsString).toBe('⌀200 × 750 мм');
		expect(WORKSHOP_SPECS.millLimitsString).toBe('800 × 500 × 500 мм (3 оси)');
	});

	it('defines IT7 tolerance with 0% surcharge and Ra 1.25-2.5 um', () => {
		expect(WORKSHOP_SPECS.maxToleranceGrade).toBe('IT7');
		expect(WORKSHOP_SPECS.surfaceRoughnessRa).toBe('Ra 1.25 – 2.5 мкм');
		expect(WORKSHOP_SPECS.toleranceGradeDescription).toContain('без наценки');
	});

	it('defines VAT 22% and base order 5000 RUB', () => {
		expect(WORKSHOP_SPECS.vatRatePercent).toBe(22);
		expect(WORKSHOP_SPECS.baseOrderThresholdRub).toBe(5000);
		expect(WORKSHOP_SPECS.baseOrderThresholdString).toBe('5 000 ₽ (с НДС 22%)');
	});
});

describe('Markdown Parser & Variable Interpolation', () => {
	it('injects workshop variables into markdown template strings', () => {
		const raw = 'Парк: {{machineCentersCount}}, лимит: {{latheLimits}}, точность: {{maxToleranceGrade}}, НДС: {{vatRatePercent}}';
		const interpolated = injectWorkshopVariables(raw);
		expect(interpolated).toBe('Парк: 2, лимит: ⌀200 × 750 мм, точность: IT7, НДС: 22%');
	});

	it('parses frontmatter and converts markdown to html', () => {
		const md = `---
title: "Тестовая статья"
category: "Метрология"
---

# Заголовок

Текст с переменной {{maxToleranceGrade}} и таблицей:

| Поле | Значение |
| :--- | :--- |
| База | 100 |
`;
		const parsed = parseMarkdown<{ title: string; category: string }>(md);
		expect(parsed.data.title).toBe('Тестовая статья');
		expect(parsed.data.category).toBe('Метрология');
		expect(parsed.html).toContain('Заголовок');
		expect(parsed.html).toContain('IT7');
		expect(parsed.html).toContain('<table>');
	});
});

describe('Articles Loader', () => {
	it('loads all 3 fundamental markdown articles without readTime badge', () => {
		const articles = getAllArticles();
		expect(articles.length).toBeGreaterThanOrEqual(3);

		const slugs = articles.map((a) => a.slug);
		expect(slugs).toContain('vybor-stali-dlya-chpu-obrabotki');
		expect(slugs).toContain('kvalitety-tochnosti-i-sherohovatost-gost');
		expect(slugs).toContain('optimizaciya-stoimosti-detaley-chpu');

		for (const art of articles) {
			expect(art.title).toBeTruthy();
			expect(art.excerpt).toBeTruthy();
			expect(art.html).toBeTruthy();
			// Ensure readTime is not part of the model
			expect((art as Record<string, unknown>).readTime).toBeUndefined();
		}
	});

	it('retrieves specific article by slug', () => {
		const art = getArticleBySlug('kvalitety-tochnosti-i-sherohovatost-gost');
		expect(art).toBeDefined();
		expect(art?.title).toContain('IT7–IT12');
		expect(art?.html).toContain('ГОСТ 25346');
	});
});

describe('Pages Loader', () => {
	it('loads markdown pages from src/content/pages', () => {
		const pages = getAllPages();
		expect(pages.length).toBeGreaterThanOrEqual(8);

		const home = getPageBySlug('home');
		expect(home).toBeDefined();
		expect(home?.title).toContain('Металлообработка с ЧПУ');
		expect(home?.aeoSummary).toBeTruthy();

		const tokarnye = getPageBySlug('tokarnye-raboty-chpu');
		expect(tokarnye).toBeDefined();
		expect(tokarnye?.h1).toBe('Токарные работы с ЧПУ');
	});
});

describe('Sitemap Registry & AEO', () => {
	it('contains entries for all site routes with AEO summaries and specs', () => {
		expect(SITEMAP_REGISTRY.length).toBeGreaterThanOrEqual(10);

		for (const entry of SITEMAP_REGISTRY) {
			expect(entry.url).toMatch(/^\//);
			expect(entry.title).toBeTruthy();
			expect(entry.sourceFile).toBeTruthy();
			expect(entry.aeo.directAnswer).toBeTruthy();
			expect(entry.aeo.keyLimits.length).toBeGreaterThan(0);
			expect(entry.aeo.applicableStandards.length).toBeGreaterThan(0);
			expect(entry.seo.title).toBeTruthy();
			expect(entry.seo.description).toBeTruthy();
		}
	});

	it('provides grouped sitemap categories', () => {
		const groups = getGroupedSitemap();
		expect(groups.length).toBe(4);
		expect(groups.map((g) => g.category)).toEqual([
			'services',
			'tools_otk',
			'articles',
			'regulations'
		]);
	});
});

describe('Yandex Form Utility', () => {
	it('builds valid Yandex Form URL with pre-filled query parameters', () => {
		const url = buildYandexFormUrl({
			operation: 'Токарная ЧПУ',
			material: 'Сталь 45',
			quantity: 25,
			dimensions: '⌀50 × 120 мм',
			tolerance: 'Высокоточная (IT7)',
			complexity: 'Средняя',
			urgency: 'Стандартный (до 2 недель)',
			totalRub: 15200,
			unitRub: 608,
			attachedFileName: 'shaft_rev2.step',
			customerNote: 'Тестовый комментарий'
		});

		expect(url).toContain('https://forms.yandex.ru/u/');
		expect(url).toContain('operation=');
		expect(url).toContain('quantity=25');
		expect(url).toContain('attached_file=shaft_rev2.step');
		expect(url).toContain('comment=');
	});
});
