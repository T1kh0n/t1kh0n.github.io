import { parseMarkdown } from './markdown-parser';

export interface PageMetadata {
	slug: string;
	urlPath: string;
	title: string;
	h1: string;
	seoTitle?: string;
	seoDescription?: string;
	lead?: string;
	aeoSummary?: string;
	lastModified?: string;
	sourceFile?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

export interface PageItem extends PageMetadata {
	content: string;
	html: string;
}

// Eagerly glob all markdown files from src/content/pages
const rawPages = import.meta.glob('/src/content/pages/*.md', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

let cachedPages: Map<string, PageItem> | null = null;

export function getAllPages(): PageItem[] {
	if (cachedPages) return Array.from(cachedPages.values());

	const map = new Map<string, PageItem>();

	for (const [path, rawText] of Object.entries(rawPages)) {
		const parsed = parseMarkdown<PageMetadata>(rawText);
		const slugFromPath = path.split('/').pop()?.replace(/\.md$/, '') || '';
		
		const page: PageItem = {
			slug: parsed.data.slug || slugFromPath,
			urlPath: parsed.data.urlPath || `/${slugFromPath === 'home' ? '' : slugFromPath + '/'}`,
			title: parsed.data.title || 'Страница',
			h1: parsed.data.h1 || parsed.data.title || 'Страница',
			seoTitle: parsed.data.seoTitle,
			seoDescription: parsed.data.seoDescription,
			lead: parsed.data.lead,
			aeoSummary: parsed.data.aeoSummary,
			lastModified: parsed.data.lastModified || '2026-11-04',
			sourceFile: path.replace(/^\//, ''),
			changefreq: parsed.data.changefreq || 'weekly',
			priority: parsed.data.priority || 0.8,
			content: parsed.content,
			html: parsed.html
		};
		map.set(page.slug, page);
	}

	cachedPages = map;
	return Array.from(map.values());
}

export function getPageBySlug(slug: string): PageItem | undefined {
	getAllPages();
	return cachedPages?.get(slug);
}
