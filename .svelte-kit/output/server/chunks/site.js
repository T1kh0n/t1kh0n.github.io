// src/lib/config/site.ts
var DEFAULT_SITE_CONFIG = {
	siteDomain: "https://t1kh0n.github.io",
	siteHost: "t1kh0n.github.io",
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
	enableYandexMetrika: false,
	ymCounterId: "114070369",
	yandexVerification: "",
	googleVerification: "",
	socialLinks: {
		github: "https://github.com/T1kh0n/t1kh0n.github.io",
		wikidata: "https://www.wikidata.org/wiki/Q11019",
		linkedin: "https://www.linkedin.com/company/metalprom39",
		crunchbase: "https://www.crunchbase.com/organization/metalprom39",
		telegram: "",
		habr: ""
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
	const siteDomain = getVal("PUBLIC_SITE_DOMAIN", DEFAULT_SITE_CONFIG.siteDomain).replace(/\/+$/, "");
	const siteHost = getVal("PUBLIC_SITE_HOST", DEFAULT_SITE_CONFIG.siteHost);
	const brandName = getVal("PUBLIC_BRAND_NAME", DEFAULT_SITE_CONFIG.brandName);
	const brandLegalName = getVal("PUBLIC_BRAND_LEGAL_NAME", DEFAULT_SITE_CONFIG.brandLegalName);
	const contactPhone = getVal("PUBLIC_CONTACT_PHONE", DEFAULT_SITE_CONFIG.contactPhone);
	const contactEmail = getVal("PUBLIC_CONTACT_EMAIL", DEFAULT_SITE_CONFIG.contactEmail);
	const yandexFormUrl = getVal("PUBLIC_YANDEX_FORM_URL", DEFAULT_SITE_CONFIG.yandexFormUrl);
	const addressLocality = getVal("PUBLIC_ADDRESS_LOCALITY", DEFAULT_SITE_CONFIG.addressLocality);
	const addressRegion = getVal("PUBLIC_ADDRESS_REGION", DEFAULT_SITE_CONFIG.addressRegion);
	const addressStreet = getVal("PUBLIC_ADDRESS_STREET", DEFAULT_SITE_CONFIG.addressStreet);
	const postalCode = getVal("PUBLIC_POSTAL_CODE", DEFAULT_SITE_CONFIG.postalCode);
	const geoLatitude = parseFloat(getVal("PUBLIC_GEO_LATITUDE", String(DEFAULT_SITE_CONFIG.geoLatitude))) || DEFAULT_SITE_CONFIG.geoLatitude;
	const geoLongitude = parseFloat(getVal("PUBLIC_GEO_LONGITUDE", String(DEFAULT_SITE_CONFIG.geoLongitude))) || DEFAULT_SITE_CONFIG.geoLongitude;
	const openingHours = getVal("PUBLIC_OPENING_HOURS", DEFAULT_SITE_CONFIG.openingHours);
	const gaMeasurementId = getVal("PUBLIC_GA_MEASUREMENT_ID", "");
	const rawEnableYm = source["PUBLIC_ENABLE_YANDEX_METRIKA"];
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
		enableYandexMetrika: rawEnableYm !== void 0 ? rawEnableYm === "true" || rawEnableYm === "1" : DEFAULT_SITE_CONFIG.enableYandexMetrika,
		ymCounterId: getVal("PUBLIC_YM_COUNTER_ID", DEFAULT_SITE_CONFIG.ymCounterId),
		yandexVerification: getVal("PUBLIC_YANDEX_VERIFICATION", ""),
		googleVerification: getVal("PUBLIC_GOOGLE_VERIFICATION", ""),
		socialLinks: DEFAULT_SITE_CONFIG.socialLinks
	};
}
var siteConfig = resolveSiteConfig();
export { siteConfig as t };

//# sourceMappingURL=site.js.map