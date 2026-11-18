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
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/frezernye-raboty-chpu": [3],
		"/kalkulyator-stoimosti-chpu": [4],
		"/kontakty": [5],
		"/kontrol-kachestva-i-oborudovanie": [6],
		"/oferta": [7],
		"/politika-cookie": [8],
		"/politika-konfidentsialnosti": [9],
		"/portfolio": [10],
		"/sitemap": [11],
		"/stati": [12],
		"/stati/frezernaya-obrabotka-alyuminiya-d16t-chpu": [13],
		"/stati/izgotovlenie-valov-i-vtulok-chpu-po-chertezham": [14],
		"/stati/izgotovlenie-zubchatykh-koles-gost": [15],
		"/stati/kvalitety-tochnosti-i-sherohovatost-gost": [16],
		"/stati/obrabotka-nerzhaveyushchey-stali-12x18n10t": [17],
		"/stati/optimizaciya-stoimosti-detaley-chpu": [18],
		"/stati/vybor-stali-dlya-chpu-obrabotki": [19],
		"/tokarnye-raboty-chpu": [20],
		"/zuboreznye-i-shlifovalnye-raboty": [21]
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