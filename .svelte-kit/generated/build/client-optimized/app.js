export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/frezernye-raboty-chpu": [3],
		"/kalkulyator-stoimosti-chpu": [4],
		"/kontakty": [5],
		"/kontrol-kachestva-i-oborudovanie": [6],
		"/politika-konfidentsialnosti": [7],
		"/portfolio": [8],
		"/sitemap": [9],
		"/stati": [10],
		"/stati/kvalitety-tochnosti-i-sherohovatost-gost": [11],
		"/stati/optimizaciya-stoimosti-detaley-chpu": [12],
		"/stati/vybor-stali-dlya-chpu-obrabotki": [13],
		"/tokarnye-raboty-chpu": [14],
		"/zuboreznye-i-shlifovalnye-raboty": [15]
	};

export const hooks = {
	handleError: (({ kind, error }) => { if (kind === 'unknown') { console.error(error); } }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export const get_error_template = () => import('../shared/error-template.js').then(m => m.default);