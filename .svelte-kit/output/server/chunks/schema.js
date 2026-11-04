import { n as siteConfig } from "./paths.js";
// src/lib/seo/schema.ts
/**
* Schema.org JSON-LD Generators for Technical SEO, AEO, and GEO.
* Complies with Google Rich Results and Yandex Microformat standards.
*/
/**
* Creates Schema.org Organization structured data.
*/
function createOrganizationSchema(config = siteConfig) {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": `${config.siteDomain}/#organization`,
		name: config.brandName,
		legalName: config.brandLegalName,
		url: config.siteDomain,
		logo: `${config.siteDomain}/logo.svg`,
		email: config.contactEmail,
		telephone: config.contactPhone,
		address: {
			"@type": "PostalAddress",
			streetAddress: config.addressStreet,
			addressLocality: config.addressLocality,
			addressRegion: config.addressRegion,
			postalCode: config.postalCode,
			addressCountry: "RU"
		},
		contactPoint: [{
			"@type": "ContactPoint",
			telephone: config.contactPhone,
			contactType: "sales and technical support",
			areaServed: "RU",
			availableLanguage: ["Russian"]
		}],
		sameAs: Object.values(config.socialLinks).filter(Boolean)
	};
}
/**
* Creates Schema.org ManufacturingBusiness (LocalBusiness) structured data.
*/
function createLocalBusinessSchema(config = siteConfig) {
	return {
		"@context": "https://schema.org",
		"@type": "ManufacturingBusiness",
		"@id": `${config.siteDomain}/#localbusiness`,
		name: config.brandName,
		legalName: config.brandLegalName,
		url: config.siteDomain,
		image: `${config.siteDomain}/og/default.webp`,
		telephone: config.contactPhone,
		email: config.contactEmail,
		priceRange: "₽₽",
		address: {
			"@type": "PostalAddress",
			streetAddress: config.addressStreet,
			addressLocality: config.addressLocality,
			addressRegion: config.addressRegion,
			postalCode: config.postalCode,
			addressCountry: "RU"
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: config.geoLatitude,
			longitude: config.geoLongitude
		},
		openingHoursSpecification: [{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday"
			],
			opens: "08:00",
			closes: "18:00"
		}],
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.9",
			reviewCount: "28",
			bestRating: "5",
			worstRating: "1"
		}
	};
}
/**
* Creates Schema.org Service structured data.
*/
function createServiceSchema(params, config = siteConfig) {
	const serviceUrl = `${config.siteDomain}${params.path.startsWith("/") ? params.path : `/${params.path}`}`;
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		"@id": `${serviceUrl}#service`,
		name: params.name,
		description: params.description,
		serviceType: params.serviceType,
		url: serviceUrl,
		provider: { "@id": `${config.siteDomain}/#organization` },
		areaServed: {
			"@type": "AdministrativeArea",
			name: config.addressRegion
		},
		offers: params.offers ? {
			"@type": "Offer",
			price: params.offers.price,
			priceCurrency: params.offers.priceCurrency || "RUB",
			unitText: params.offers.unitText || "час",
			priceSpecification: params.offers.minOrderPrice ? {
				"@type": "UnitPriceSpecification",
				price: params.offers.minOrderPrice,
				priceCurrency: params.offers.priceCurrency || "RUB",
				unitText: "минимальный заказ"
			} : void 0
		} : void 0
	};
}
/**
* Creates Schema.org BreadcrumbList structured data.
*/
function createBreadcrumbSchema(items, config = siteConfig) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => {
			const cleanPath = item.path.startsWith("/") ? item.path : `/${item.path}`;
			return {
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
				item: cleanPath === "/" ? `${config.siteDomain}/` : `${config.siteDomain}${cleanPath}/`
			};
		})
	};
}
/**
* Creates Schema.org FAQPage structured data.
*/
function createFaqSchema(faqs) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer
			}
		}))
	};
}
/**
* Serializes schema object wrapped directly in a script tag for Svelte head injection.
*/
function serializeSchema(schema) {
	return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}<\/script>`;
}
export { createServiceSchema as a, createOrganizationSchema as i, createFaqSchema as n, serializeSchema as o, createLocalBusinessSchema as r, createBreadcrumbSchema as t };

//# sourceMappingURL=schema.js.map