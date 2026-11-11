export const base = '';

export function pageHref(path: string): string {
	if (path === '/') return '/';
	const clean = path.startsWith('/') ? path : `/${path}`;
	return clean;
}
