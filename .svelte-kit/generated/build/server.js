
import error from './shared/error-template.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_trusted_origins: [],
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"ru\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<meta name=\"text-scale\" content=\"scale\" />\n\t\t<link rel=\"icon\" type=\"image/svg+xml\" href=\"" + assets + "/favicon.svg\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n\t\t<link\n\t\t\thref=\"https://fonts.googleapis.com/css2?family=Geologica:wght,CRSV,SHRP@200..500,0,0..100&display=swap\"\n\t\t\trel=\"stylesheet\"\n\t\t/>\n\n\t\t<!-- Yandex.Metrika counter -->\n\t\t<script type=\"text/javascript\">\n\t\t\t(function(m,e,t,r,i,k,a){\n\t\t\t\tm[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n\t\t\t\tm[i].l=1*new Date();\n\t\t\t\tfor (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n\t\t\t\tk=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)\n\t\t\t})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=114070369', 'ym');\n\n\t\t\tym(114070369, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n\t\t</script>\n\t\t<noscript><div><img src=\"https://mc.yandex.ru/watch/114070369\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript>\n\t\t<!-- /Yandex.Metrika counter -->\n\n\t\t" + head + "\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n",
		error
	}
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}
