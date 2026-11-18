import { t as siteConfig } from "./site.js";
// src/lib/analytics/metrika.ts
/**
* Yandex Metrika Client-Side Event Tracking Utility.
* Complies with 152-FZ and 149-FZ: no PII (Personal Identifiable Information) logged.
* Tracking cookies are strictly gated behind user explicit consent AND build config flag.
*/
var COOKIE_STORAGE_KEY = "mp39_cookie_consent_v1";
/**
* Checks if the user has provided explicit consent to analytics cookies.
* Returns false immediately if Metrika is disabled in build configuration.
*/
function hasAnalyticsConsent() {
	if (typeof window === "undefined") return false;
	if (!siteConfig.enableYandexMetrika) return false;
	try {
		return localStorage.getItem(COOKIE_STORAGE_KEY) === "accepted";
	} catch {
		return false;
	}
}
/**
* Initializes Yandex Metrika dynamically ONLY when user explicit consent is granted
* AND Yandex Metrika is enabled in siteConfig.
* Adheres to 152-FZ, 149-FZ and Roskomnadzor cookie compliance requirements.
*/
function initMetrikaIfConsented() {
	if (typeof window === "undefined") return;
	if (!siteConfig.enableYandexMetrika) return;
	try {
		if (!hasAnalyticsConsent()) return;
		const rawCounterId = siteConfig.ymCounterId;
		const counterId = parseInt(rawCounterId, 10);
		if (isNaN(counterId) || counterId <= 0) return;
		if (window.__mp39_ym_initialized && typeof window.ym === "function") return;
		window.ym = window.ym || function() {
			(window.ym.a = window.ym.a || []).push(arguments);
		};
		window.ym.l = 1 * (/* @__PURE__ */ new Date()).getTime();
		const scriptId = "ym-tag-script";
		if (!document.getElementById(scriptId)) {
			const script = document.createElement("script");
			script.id = scriptId;
			script.type = "text/javascript";
			script.async = true;
			script.src = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
			const firstScript = document.getElementsByTagName("script")[0];
			if (firstScript && firstScript.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
			else document.head.appendChild(script);
		}
		window.ym(counterId, "init", {
			ssr: true,
			webvisor: false,
			clickmap: true,
			ecommerce: "dataLayer",
			referrer: document.referrer,
			url: location.href,
			accurateTrackBounce: true,
			trackLinks: true
		});
		window.__mp39_ym_initialized = true;
	} catch {}
}
export { initMetrikaIfConsented as n, COOKIE_STORAGE_KEY as t };

//# sourceMappingURL=metrika.js.map