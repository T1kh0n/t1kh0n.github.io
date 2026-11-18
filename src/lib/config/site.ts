/**
 * Centralized Site and Organization Configuration.
 * Fully supports runtime and build-time overrides via environment variables or test fixtures.
 */

export interface SiteConfig {
	siteDomain: string;
	siteHost: string;
	brandName: string;
	brandLegalName: string;
	contactPhone: string;
	contactEmail: string;
	yandexFormUrl: string;
	addressLocality: string;
	addressRegion: string;
	addressStreet: string;
	postalCode: string;
	geoLatitude: number;
	geoLongitude: number;
	openingHours: string;
	gaMeasurementId: string;
	enableYandexMetrika: boolean;
	ymCounterId: string;
	yandexVerification: string;
	googleVerification: string;
	socialLinks: {
		github: string;
		telegram: string;
		vk?: string;
		habr?: string;
		linkedin?: string;
		wikidata?: string;
		crunchbase?: string;
	};
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
	siteDomain: 'https://t1kh0n.github.io',
	siteHost: 't1kh0n.github.io',
	brandName: 'МеталлПром39',
	brandLegalName: 'ИП МеталлПром39',
	contactPhone: '+7 (4012) 00-00-00',
	contactEmail: 'order@metalprom39.com',
	yandexFormUrl: '',
	addressLocality: 'Калининград',
	addressRegion: 'Калининградская область',
	addressStreet: 'ул. Дзержинского, 130',
	postalCode: '236000',
	geoLatitude: 54.7104,
	geoLongitude: 20.4522,
	openingHours: 'Пн-Пт 08:00-18:00',
	gaMeasurementId: '',
	enableYandexMetrika: false, // Default is false: Yandex Metrika is disabled at build time
	ymCounterId: '114070369',
	yandexVerification: '',
	googleVerification: '',
	socialLinks: {
		github: 'https://github.com/T1kh0n/t1kh0n.github.io',
		wikidata: 'https://www.wikidata.org/wiki/Q11019',
		linkedin: 'https://www.linkedin.com/company/metalprom39',
		crunchbase: 'https://www.crunchbase.com/organization/metalprom39',
		telegram: '',
		habr: ''
	}
};

/**
 * Resolves configuration from environment variables with fallback to defaults.
 * Supports testing with partial overrides.
 */
export function resolveSiteConfig(
	envOverrides?: Partial<Record<string, string | undefined>>
): SiteConfig {
	const source =
		envOverrides ??
		(typeof import.meta !== 'undefined' && import.meta.env
			? (import.meta.env as Record<string, string | undefined>)
			: typeof process !== 'undefined' && process.env
				? (process.env as Record<string, string | undefined>)
				: {});

	const getVal = (key: string, fallback: string): string => {
		const val = source[key];
		return typeof val === 'string' && val.trim().length > 0 ? val.trim() : fallback;
	};

	const rawDomain = getVal('PUBLIC_SITE_DOMAIN', DEFAULT_SITE_CONFIG.siteDomain);
	const siteDomain = rawDomain.replace(/\/+$/, '');
	const siteHost = getVal('PUBLIC_SITE_HOST', DEFAULT_SITE_CONFIG.siteHost);
	const brandName = getVal('PUBLIC_BRAND_NAME', DEFAULT_SITE_CONFIG.brandName);
	const brandLegalName = getVal('PUBLIC_BRAND_LEGAL_NAME', DEFAULT_SITE_CONFIG.brandLegalName);
	const contactPhone = getVal('PUBLIC_CONTACT_PHONE', DEFAULT_SITE_CONFIG.contactPhone);
	const contactEmail = getVal('PUBLIC_CONTACT_EMAIL', DEFAULT_SITE_CONFIG.contactEmail);
	const yandexFormUrl = getVal('PUBLIC_YANDEX_FORM_URL', DEFAULT_SITE_CONFIG.yandexFormUrl);
	const addressLocality = getVal('PUBLIC_ADDRESS_LOCALITY', DEFAULT_SITE_CONFIG.addressLocality);
	const addressRegion = getVal('PUBLIC_ADDRESS_REGION', DEFAULT_SITE_CONFIG.addressRegion);
	const addressStreet = getVal('PUBLIC_ADDRESS_STREET', DEFAULT_SITE_CONFIG.addressStreet);
	const postalCode = getVal('PUBLIC_POSTAL_CODE', DEFAULT_SITE_CONFIG.postalCode);
	const geoLatitude =
		parseFloat(getVal('PUBLIC_GEO_LATITUDE', String(DEFAULT_SITE_CONFIG.geoLatitude))) ||
		DEFAULT_SITE_CONFIG.geoLatitude;
	const geoLongitude =
		parseFloat(getVal('PUBLIC_GEO_LONGITUDE', String(DEFAULT_SITE_CONFIG.geoLongitude))) ||
		DEFAULT_SITE_CONFIG.geoLongitude;
	const openingHours = getVal('PUBLIC_OPENING_HOURS', DEFAULT_SITE_CONFIG.openingHours);
	const gaMeasurementId = getVal('PUBLIC_GA_MEASUREMENT_ID', '');
	
	const rawEnableYm = source['PUBLIC_ENABLE_YANDEX_METRIKA'];
	const enableYandexMetrika =
		rawEnableYm !== undefined
			? rawEnableYm === 'true' || rawEnableYm === '1'
			: DEFAULT_SITE_CONFIG.enableYandexMetrika;

	const ymCounterId = getVal('PUBLIC_YM_COUNTER_ID', DEFAULT_SITE_CONFIG.ymCounterId);
	const yandexVerification = getVal('PUBLIC_YANDEX_VERIFICATION', '');
	const googleVerification = getVal('PUBLIC_GOOGLE_VERIFICATION', '');

	return {
		siteDomain,
		siteHost,
		brandName,
		brandLegalName,
		contactPhone,
		contactEmail,
		yandexFormUrl,
		addressLocality,
		addressRegion,
		addressStreet,
		postalCode,
		geoLatitude,
		geoLongitude,
		openingHours,
		gaMeasurementId,
		enableYandexMetrika,
		ymCounterId,
		yandexVerification,
		googleVerification,
		socialLinks: DEFAULT_SITE_CONFIG.socialLinks
	};
}

export const siteConfig = resolveSiteConfig();

/**
 * Returns a canonical URL for a given path, adhering to trailingSlash: 'always'
 * for directories, while preserving bare paths for root and static asset files (.xml, .txt, .json, .webp).
 */
export function getCanonicalUrl(
	path: string = '/',
	baseDomain: string = siteConfig.siteDomain
): string {
	const cleanBase = baseDomain.replace(/\/+$/, '');
	let cleanPath = path.trim();
	if (!cleanPath.startsWith('/')) {
		cleanPath = '/' + cleanPath;
	}
	if (cleanPath === '/') {
		return `${cleanBase}/`;
	}
	// Preserve bare paths for static asset files (.xml, .txt, .json, .webp, etc.)
	if (/\.[a-zA-Z0-9]+$/.test(cleanPath)) {
		return `${cleanBase}${cleanPath}`;
	}
	const withTrailingSlash = cleanPath.replace(/\/+$/, '') + '/';
	return `${cleanBase}${withTrailingSlash}`;
}

/**
 * Returns absolute OpenGraph image URL.
 */
export function getOgImageUrl(
	slug: string = 'default',
	baseDomain: string = siteConfig.siteDomain
): string {
	const cleanBase = baseDomain.replace(/\/+$/, '');
	const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
	return `${cleanBase}/og/${cleanSlug}.webp`;
}
