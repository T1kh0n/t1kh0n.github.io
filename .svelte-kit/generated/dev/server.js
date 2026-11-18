
import error from './shared/error-template.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_trusted_origins: [],
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"ru\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<meta name=\"text-scale\" content=\"scale\" />\n\t\t<link rel=\"icon\" type=\"image/svg+xml\" href=\"" + assets + "/favicon.svg\" />\n\n\t\t<!-- Zero-CLS Local Font Preload & Declarations (152-FZ Compliant, No External CDN Requests) -->\n\t\t<link\n\t\t\trel=\"preload\"\n\t\t\thref=\"" + assets + "/fonts/geologica-cyrillic.woff2\"\n\t\t\tas=\"font\"\n\t\t\ttype=\"font/woff2\"\n\t\t\tcrossorigin\n\t\t/>\n\t\t<link\n\t\t\trel=\"preload\"\n\t\t\thref=\"" + assets + "/fonts/geologica-latin.woff2\"\n\t\t\tas=\"font\"\n\t\t\ttype=\"font/woff2\"\n\t\t\tcrossorigin\n\t\t/>\n\n\t\t<style>\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Geologica';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 200 500;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: url('" + assets + "/fonts/geologica-cyrillic-ext.woff2') format('woff2');\n\t\t\t\tunicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n\t\t\t}\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Geologica';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 200 500;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: url('" + assets + "/fonts/geologica-cyrillic.woff2') format('woff2');\n\t\t\t\tunicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n\t\t\t}\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Geologica';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 200 500;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: url('" + assets + "/fonts/geologica-latin-ext.woff2') format('woff2');\n\t\t\t\tunicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;\n\t\t\t}\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Geologica';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 200 500;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: url('" + assets + "/fonts/geologica-latin.woff2') format('woff2');\n\t\t\t\tunicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n\t\t\t}\n\t\t</style>\n\n\t\t" + head + "\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n",
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
