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
		__memo(() => import('./nodes/1.js')),
		__memo(() => import('./nodes/2.js')),
		__memo(() => import('./nodes/3.js')),
		__memo(() => import('./nodes/4.js')),
		__memo(() => import('./nodes/5.js')),
		__memo(() => import('./nodes/6.js')),
		__memo(() => import('./nodes/7.js')),
		__memo(() => import('./nodes/8.js')),
		__memo(() => import('./nodes/9.js')),
		__memo(() => import('./nodes/10.js')),
		__memo(() => import('./nodes/11.js')),
		__memo(() => import('./nodes/12.js')),
		__memo(() => import('./nodes/13.js')),
		__memo(() => import('./nodes/14.js')),
		__memo(() => import('./nodes/15.js')),
		__memo(() => import('./nodes/16.js')),
		__memo(() => import('./nodes/17.js')),
		__memo(() => import('./nodes/18.js')),
		__memo(() => import('./nodes/19.js')),
		__memo(() => import('./nodes/20.js')),
		__memo(() => import('./nodes/21.js'))
	],
	remotes: {
		
	},
	routes: [
		{
			id: "/",
			pattern: /^\/$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 2 },
			endpoint: null
		},
		{
			id: "/frezernye-raboty-chpu",
			pattern: /^\/frezernye-raboty-chpu\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 3 },
			endpoint: null
		},
		{
			id: "/kalkulyator-stoimosti-chpu",
			pattern: /^\/kalkulyator-stoimosti-chpu\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 4 },
			endpoint: null
		},
		{
			id: "/kontakty",
			pattern: /^\/kontakty\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 5 },
			endpoint: null
		},
		{
			id: "/kontrol-kachestva-i-oborudovanie",
			pattern: /^\/kontrol-kachestva-i-oborudovanie\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 6 },
			endpoint: null
		},
		{
			id: "/oferta",
			pattern: /^\/oferta\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 7 },
			endpoint: null
		},
		{
			id: "/politika-cookie",
			pattern: /^\/politika-cookie\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 8 },
			endpoint: null
		},
		{
			id: "/politika-konfidentsialnosti",
			pattern: /^\/politika-konfidentsialnosti\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 9 },
			endpoint: null
		},
		{
			id: "/portfolio",
			pattern: /^\/portfolio\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 10 },
			endpoint: null
		},
		{
			id: "/sitemap.xml",
			pattern: /^\/sitemap\.xml\/?$/,
			params: [],
			page: null,
			endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.ts.js'))
		},
		{
			id: "/sitemap",
			pattern: /^\/sitemap\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 11 },
			endpoint: null
		},
		{
			id: "/stati",
			pattern: /^\/stati\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 12 },
			endpoint: null
		},
		{
			id: "/stati/frezernaya-obrabotka-alyuminiya-d16t-chpu",
			pattern: /^\/stati\/frezernaya-obrabotka-alyuminiya-d16t-chpu\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 13 },
			endpoint: null
		},
		{
			id: "/stati/izgotovlenie-valov-i-vtulok-chpu-po-chertezham",
			pattern: /^\/stati\/izgotovlenie-valov-i-vtulok-chpu-po-chertezham\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 14 },
			endpoint: null
		},
		{
			id: "/stati/izgotovlenie-zubchatykh-koles-gost",
			pattern: /^\/stati\/izgotovlenie-zubchatykh-koles-gost\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 15 },
			endpoint: null
		},
		{
			id: "/stati/kvalitety-tochnosti-i-sherohovatost-gost",
			pattern: /^\/stati\/kvalitety-tochnosti-i-sherohovatost-gost\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 16 },
			endpoint: null
		},
		{
			id: "/stati/obrabotka-nerzhaveyushchey-stali-12x18n10t",
			pattern: /^\/stati\/obrabotka-nerzhaveyushchey-stali-12x18n10t\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 17 },
			endpoint: null
		},
		{
			id: "/stati/optimizaciya-stoimosti-detaley-chpu",
			pattern: /^\/stati\/optimizaciya-stoimosti-detaley-chpu\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 18 },
			endpoint: null
		},
		{
			id: "/stati/vybor-stali-dlya-chpu-obrabotki",
			pattern: /^\/stati\/vybor-stali-dlya-chpu-obrabotki\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 19 },
			endpoint: null
		},
		{
			id: "/tokarnye-raboty-chpu",
			pattern: /^\/tokarnye-raboty-chpu\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 20 },
			endpoint: null
		},
		{
			id: "/zuboreznye-i-shlifovalnye-raboty",
			pattern: /^\/zuboreznye-i-shlifovalnye-raboty\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 21 },
			endpoint: null
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
