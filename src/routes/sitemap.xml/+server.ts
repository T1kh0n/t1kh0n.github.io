import type { RequestHandler } from './$types';
import { SITEMAP_REGISTRY } from '#lib/content/sitemap-registry';
import { siteConfig } from '#lib/config/site';
import { base } from '$lib/paths';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const domain = (siteConfig.siteDomain || 'https://t1kh0n.github.io').replace(/\/$/, '');

	const urlsXml = SITEMAP_REGISTRY.map((entry) => {
		const fullUrl = `${domain}${base}${entry.url === '/' ? '/' : entry.url}`;
		return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
	}).join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
