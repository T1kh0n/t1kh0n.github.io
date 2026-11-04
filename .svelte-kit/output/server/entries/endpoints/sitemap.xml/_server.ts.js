import { n as siteConfig, t as base } from "../../../chunks/paths.js";
import { t as SITEMAP_REGISTRY } from "../../../chunks/sitemap-registry.js";
// src/routes/sitemap.xml/+server.ts
var prerender = true;
var GET = async () => {
	const domain = (siteConfig.siteDomain || "https://tikhomirovnikita.github.io").replace(/\/$/, "");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_REGISTRY.map((entry) => {
		return `  <url>
    <loc>${`${domain}${base}${entry.url === "/" ? "/" : entry.url}`}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
	}).join("\n")}
</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "max-age=0, s-maxage=3600"
	} });
};
export { GET, prerender };

//# sourceMappingURL=_server.ts.js.map