export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "metal-prom-web/_app",
	assets: new Set([".nojekyll","robots.txt"]),
	mime_types: {".txt":"text/plain",".xml":"text/xml"},
	client: {start:"_app/immutable/entry/start.BlV29mi9.js",app:"_app/immutable/entry/app.GofZnxGw.js",imports:["_app/immutable/entry/start.BlV29mi9.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/CRzLMJPS.js","_app/immutable/chunks/dcPT016n.js","_app/immutable/chunks/D6ufYkdB.js","_app/immutable/chunks/CEhQPDvk.js","_app/immutable/entry/app.GofZnxGw.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('./nodes/0.js')),
		__memo(() => import('./nodes/1.js'))
	],
	remotes: {
		
	},
	routes: [
		
	],
	prerendered_routes: new Set(["/metal-prom-web/","/metal-prom-web/sitemap.xml","/metal-prom-web/tokarnye-raboty-chpu/","/metal-prom-web/frezernye-raboty-chpu/","/metal-prom-web/zuboreznye-i-shlifovalnye-raboty/","/metal-prom-web/kalkulyator-stoimosti-chpu/","/metal-prom-web/portfolio/","/metal-prom-web/kontrol-kachestva-i-oborudovanie/","/metal-prom-web/stati/","/metal-prom-web/kontakty/","/metal-prom-web/stati/vybor-stali-dlya-chpu-obrabotki/","/metal-prom-web/stati/kvalitety-tochnosti-i-sherohovatost-gost/","/metal-prom-web/stati/optimizaciya-stoimosti-detaley-chpu/","/metal-prom-web/politika-konfidentsialnosti/","/metal-prom-web/sitemap/"]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
