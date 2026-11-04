import { parseMarkdown } from './markdown-parser';

export interface ArticleMetadata {
	slug: string;
	title: string;
	h1?: string;
	category: string;
	publishedDate: string;
	excerpt: string;
	author: string;
	tags?: string[];
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
