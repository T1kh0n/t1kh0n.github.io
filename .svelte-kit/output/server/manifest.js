export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set([".nojekyll",".well-known/ai.txt","ai/faq.json","ai/service.json","ai/summary.json","favicon.svg","feed.xml","fonts/geologica-cyrillic-ext.woff2","fonts/geologica-cyrillic.woff2","fonts/geologica-latin-ext.woff2","fonts/geologica-latin.woff2","googlebffb7acba9853275.html","images/parts/korpus-d16t.webp","images/parts/shesterni-gost.webp","images/parts/valy-vtulki.webp","llms-full.txt","llms.txt","og/default-1x1.webp","og/default-4x3.webp","og/default.jpg","og/default.webp","robots.txt","yandex_cbf1eb49dd9b13b2.html"]),
	mime_types: {".txt":"text/plain",".json":"application/json",".svg":"image/svg+xml",".xml":"text/xml",".woff2":"font/woff2",".html":"text/html",".webp":"image/webp",".jpg":"image/jpeg"},
	client: {start:"_app/immutable/entry/start.D-bccD2h.js",app:"_app/immutable/entry/app.Dk79QlJN.js",imports:["_app/immutable/entry/start.D-bccD2h.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/CRzLMJPS.js","_app/immutable/chunks/geS2qMcl.js","_app/immutable/chunks/B9S0au6J.js","_app/immutable/chunks/Uzj_GMBJ.js","_app/immutable/entry/app.Dk79QlJN.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('./nodes/0.js')),
		__memo(() => import('./nodes/1.js'))
	],
	remotes: {
		
	},
	routes: [
		
	],
	prerendered_routes: new Set(["/","/sitemap.xml","/tokarnye-raboty-chpu/","/frezernye-raboty-chpu/","/zuboreznye-i-shlifovalnye-raboty/","/kalkulyator-stoimosti-chpu/","/portfolio/","/kontrol-kachestva-i-oborudovanie/","/stati/","/stati/kvalitety-tochnosti-i-sherohovatost-gost/","/kontakty/","/stati/vybor-stali-dlya-chpu-obrabotki/","/stati/optimizaciya-stoimosti-detaley-chpu/","/oferta/","/politika-cookie/","/politika-konfidentsialnosti/","/sitemap/","/stati/frezernaya-obrabotka-alyuminiya-d16t-chpu/","/stati/izgotovlenie-valov-i-vtulok-chpu-po-chertezham/","/stati/izgotovlenie-zubchatykh-koles-gost/","/stati/obrabotka-nerzhaveyushchey-stali-12x18n10t/"]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
