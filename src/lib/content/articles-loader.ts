import { parseMarkdown } from './markdown-parser';

export interface RelatedServiceItem {
	slug: string;
	title: string;
}

export interface ArticleMetadata {
	slug: string;
	title: string;
	h1?: string;
	category: string;
	publishedDate: string;
	excerpt: string;
	author: string;
	tags?: string[];
	readingTime?: string;
	relatedArticles?: string[];
	relatedServices?: RelatedServiceItem[];
	seoTitle?: string;
	seoDescription?: string;
}

export interface ArticleItem extends ArticleMetadata {
	content: string;
	html: string;
}

// Eagerly glob all markdown files from src/content/articles
const rawArticles = import.meta.glob('/src/content/articles/*.md', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

let cachedArticles: ArticleItem[] | null = null;

export function getAllArticles(): ArticleItem[] {
	if (cachedArticles) return cachedArticles;

	const articles: ArticleItem[] = [];

	for (const [path, rawText] of Object.entries(rawArticles)) {
		const parsed = parseMarkdown<ArticleMetadata>(rawText);
		const slugFromPath = path.split('/').pop()?.replace(/\.md$/, '') || '';

		const article: ArticleItem = {
			slug: parsed.data.slug || slugFromPath,
			title: parsed.data.title || 'Статья',
			h1: parsed.data.h1 || parsed.data.title || 'Статья',
			category: parsed.data.category || 'Технологии',
			publishedDate: parsed.data.publishedDate || '2026-11-04',
			excerpt: parsed.data.excerpt || '',
			author: parsed.data.author || 'Главный технолог ЧПУ',
			tags: parsed.data.tags || [],
			readingTime: parsed.data.readingTime || '5 мин',
			relatedArticles: parsed.data.relatedArticles || [],
			relatedServices: parsed.data.relatedServices || [],
			seoTitle: parsed.data.seoTitle,
			seoDescription: parsed.data.seoDescription,
			content: parsed.content,
			html: parsed.html
		};
		articles.push(article);
	}

	cachedArticles = articles;
	return articles;
}

export function getArticleBySlug(slug: string): ArticleItem | undefined {
	const all = getAllArticles();
	return all.find((a) => a.slug === slug);
}

/**
 * Returns all unique tags across articles with their frequency count.
 */
export function getAllTags(): Array<{ tag: string; count: number }> {
	const all = getAllArticles();
	const tagCounts = new Map<string, number>();

	for (const article of all) {
		if (!article.tags) continue;
		for (const tag of article.tags) {
			const trimmed = tag.trim();
			if (trimmed) {
				tagCounts.set(trimmed, (tagCounts.get(trimmed) || 0) + 1);
			}
		}
	}

	return Array.from(tagCounts.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ru'));
}

/**
 * Returns articles filtered by specific tag.
 */
export function getArticlesByTag(tag: string): ArticleItem[] {
	const all = getAllArticles();
	const target = tag.toLowerCase().trim();
	return all.filter((a) => a.tags?.some((t) => t.toLowerCase().trim() === target));
}

/**
 * Returns related articles for given article slug.
 * Prioritizes explicit `relatedArticles` frontmatter slugs, followed by tag/category similarity.
 */
export function getRelatedArticles(currentSlug: string, limit: number = 3): ArticleItem[] {
	const all = getAllArticles();
	const current = all.find((a) => a.slug === currentSlug);
	if (!current) return [];

	const others = all.filter((a) => a.slug !== currentSlug);
	const results: ArticleItem[] = [];
	const seenSlugs = new Set<string>();

	// 1. Explicitly configured related articles from frontmatter
	if (current.relatedArticles && current.relatedArticles.length > 0) {
		for (const slug of current.relatedArticles) {
			const found = others.find((a) => a.slug === slug);
			if (found && !seenSlugs.has(found.slug)) {
				results.push(found);
				seenSlugs.add(found.slug);
				if (results.length >= limit) return results;
			}
		}
	}

	// 2. Score remaining articles by shared tags and same category
	const scored = others
		.filter((a) => !seenSlugs.has(a.slug))
		.map((candidate) => {
			let score = 0;
			if (candidate.category === current.category) score += 2;
			if (candidate.tags && current.tags) {
				const currentTags = new Set(current.tags.map((t) => t.toLowerCase()));
				for (const ct of candidate.tags) {
					if (currentTags.has(ct.toLowerCase())) {
						score += 3;
					}
				}
			}
			return { candidate, score };
		})
		.sort((a, b) => b.score - a.score);

	for (const item of scored) {
		results.push(item.candidate);
		seenSlugs.add(item.candidate.slug);
		if (results.length >= limit) break;
	}

	return results;
}
