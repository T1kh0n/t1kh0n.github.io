// src/lib/config/site.ts
var DEFAULT_SITE_CONFIG = {
	siteDomain: "https://metalprom39.com",
	siteHost: "metalprom39.com",
	brandName: "МеталлПром39",
	brandLegalName: "ИП МеталлПром39",
	contactPhone: "",
	contactEmail: "",
	yandexFormUrl: "",
	addressLocality: "Калининград",
	addressRegion: "Калининградская область",
	addressStreet: "",
	postalCode: "236000",
	geoLatitude: 54.7104,
	geoLongitude: 20.4522,
	openingHours: "Пн-Пт 08:00-18:00",
	gaMeasurementId: "",
	ymCounterId: "114070369",
	yandexVerification: "",
	googleVerification: "",
	socialLinks: {
		github: "https://github.com/T1kh0n/metal-prom-web",
		telegram: "",
		habr: "",
		linkedin: ""
	}
};
/**
* Resolves configuration from environment variables with fallback to defaults.
* Supports testing with partial overrides.
*/
function resolveSiteConfig(envOverrides) {
	const source = envOverrides ?? (typeof import.meta !== "undefined" && {
		"BASE_URL": "./",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true
	} ? {
		"BASE_URL": "./",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true
	} : typeof process !== "undefined" && process.env ? process.env : {});
	const getVal = (key, fallback) => {
		const val = source[key];
		return typeof val === "string" && val.trim().length > 0 ? val.trim() : fallback;
	};
	return {
		siteDomain: getVal("PUBLIC_SITE_DOMAIN", DEFAULT_SITE_CONFIG.siteDomain).replace(/\/+$/, ""),
		siteHost: getVal("PUBLIC_SITE_HOST", DEFAULT_SITE_CONFIG.siteHost),
		brandName: getVal("PUBLIC_BRAND_NAME", DEFAULT_SITE_CONFIG.brandName),
		brandLegalName: getVal("PUBLIC_BRAND_LEGAL_NAME", DEFAULT_SITE_CONFIG.brandLegalName),
		contactPhone: getVal("PUBLIC_CONTACT_PHONE", DEFAULT_SITE_CONFIG.contactPhone),
		contactEmail: getVal("PUBLIC_CONTACT_EMAIL", DEFAULT_SITE_CONFIG.contactEmail),
		yandexFormUrl: getVal("PUBLIC_YANDEX_FORM_URL", DEFAULT_SITE_CONFIG.yandexFormUrl),
		addressLocality: getVal("PUBLIC_ADDRESS_LOCALITY", DEFAULT_SITE_CONFIG.addressLocality),
		addressRegion: getVal("PUBLIC_ADDRESS_REGION", DEFAULT_SITE_CONFIG.addressRegion),
		addressStreet: getVal("PUBLIC_ADDRESS_STREET", DEFAULT_SITE_CONFIG.addressStreet),
		postalCode: getVal("PUBLIC_POSTAL_CODE", DEFAULT_SITE_CONFIG.postalCode),
		geoLatitude: parseFloat(getVal("PUBLIC_GEO_LATITUDE", String(DEFAULT_SITE_CONFIG.geoLatitude))) || DEFAULT_SITE_CONFIG.geoLatitude,
		geoLongitude: parseFloat(getVal("PUBLIC_GEO_LONGITUDE", String(DEFAULT_SITE_CONFIG.geoLongitude))) || DEFAULT_SITE_CONFIG.geoLongitude,
		openingHours: getVal("PUBLIC_OPENING_HOURS", DEFAULT_SITE_CONFIG.openingHours),
		gaMeasurementId: getVal("PUBLIC_GA_MEASUREMENT_ID", ""),
		ymCounterId: getVal("PUBLIC_YM_COUNTER_ID", DEFAULT_SITE_CONFIG.ymCounterId),
		yandexVerification: getVal("PUBLIC_YANDEX_VERIFICATION", ""),
		googleVerification: getVal("PUBLIC_GOOGLE_VERIFICATION", ""),
		socialLinks: DEFAULT_SITE_CONFIG.socialLinks
	};
}
var siteConfig = resolveSiteConfig();
// src/lib/paths.ts
var base = "/metal-prom-web";
export { siteConfig as n, base as t };

//# sourceMappingURL=paths.js.map