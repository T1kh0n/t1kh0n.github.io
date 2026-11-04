export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "metal-prom-web/_app",
	assets: new Set([".nojekyll","robots.txt"]),
	mime_types: {".txt":"text/plain"},
	client: {start:"_app/immutable/entry/start.BlV29mi9.js",app:"_app/immutable/entry/app.GofZnxGw.js",imports:["_app/immutable/entry/start.BlV29mi9.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/CRzLMJPS.js","_app/immutable/chunks/dcPT016n.js","_app/immutable/chunks/D6ufYkdB.js","_app/immutable/chunks/CEhQPDvk.js","_app/immutable/entry/app.GofZnxGw.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
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
		__memo(() => import('./nodes/15.js'))
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
			id: "/politika-konfidentsialnosti",
			pattern: /^\/politika-konfidentsialnosti\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 7 },
			endpoint: null
		},
		{
			id: "/portfolio",
			pattern: /^\/portfolio\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 8 },
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
			page: { layouts: [0,], errors: [1,], leaf: 9 },
			endpoint: null
		},
		{
			id: "/stati",
			pattern: /^\/stati\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 10 },
			endpoint: null
		},
		{
			id: "/stati/kvalitety-tochnosti-i-sherohovatost-gost",
			pattern: /^\/stati\/kvalitety-tochnosti-i-sherohovatost-gost\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 11 },
			endpoint: null
		},
		{
			id: "/stati/optimizaciya-stoimosti-detaley-chpu",
			pattern: /^\/stati\/optimizaciya-stoimosti-detaley-chpu\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 12 },
			endpoint: null
		},
		{
			id: "/stati/vybor-stali-dlya-chpu-obrabotki",
			pattern: /^\/stati\/vybor-stali-dlya-chpu-obrabotki\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 13 },
			endpoint: null
		},
		{
			id: "/tokarnye-raboty-chpu",
			pattern: /^\/tokarnye-raboty-chpu\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 14 },
			endpoint: null
		},
		{
			id: "/zuboreznye-i-shlifovalnye-raboty",
			pattern: /^\/zuboreznye-i-shlifovalnye-raboty\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 15 },
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
