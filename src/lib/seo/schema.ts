/**
 * Schema.org JSON-LD Generators for Technical SEO, AEO, and GEO.
 * Complies with Google Rich Results, Yandex Microformat, and LLM (AEO) standards.
 */

import { siteConfig, type SiteConfig } from '../config/site';

export interface ServiceOfferParams {
	price: number;
	priceCurrency?: string;
	unitText?: string;
	minOrderPrice?: number;
}

export interface ServiceSchemaParams {
	name: string;
	description: string;
	serviceType: string;
	path: string;
	offers?: ServiceOfferParams;
}

export interface BreadcrumbItem {
	name: string;
	path: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

export interface VideoSchemaParams {
	name: string;
	description: string;
	thumbnailUrl: string;
	uploadDate: string;
	contentUrl: string;
	embedUrl?: string;
}

export interface TechArticleSchemaParams {
	title: string;
	description: string;
	url: string;
	datePublished: string;
	dateModified?: string;
	authorName?: string;
	category?: string;
	tags?: string[];
	dependencies?: string;
	proficiencyLevel?: string;
}

/**
 * Creates Schema.org Organization structured data.
 */
export function createOrganizationSchema(config: SiteConfig = siteConfig) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${config.siteDomain}/#organization`,
		name: config.brandName,
		legalName: config.brandLegalName,
		url: config.siteDomain,
		logo: `${config.siteDomain}/logo.svg`,
		email: config.contactEmail,
		telephone: config.contactPhone,
		address: {
			'@type': 'PostalAddress',
			streetAddress: config.addressStreet,
			addressLocality: config.addressLocality,
			addressRegion: config.addressRegion,
			postalCode: config.postalCode,
			addressCountry: 'RU'
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				telephone: config.contactPhone,
				contactType: 'sales and technical support',
				areaServed: 'RU',
				availableLanguage: ['Russian']
			}
		],
		sameAs: Object.values(config.socialLinks).filter(Boolean)
	};
}

/**
 * Creates Schema.org ManufacturingBusiness (LocalBusiness) structured data with GEO targeting.
 */
export function createLocalBusinessSchema(config: SiteConfig = siteConfig) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ManufacturingBusiness',
		'@id': `${config.siteDomain}/#localbusiness`,
		name: config.brandName,
		legalName: config.brandLegalName,
		url: config.siteDomain,
		image: `${config.siteDomain}/og/default.webp`,
		telephone: config.contactPhone,
		email: config.contactEmail,
		priceRange: '₽₽',
		currenciesAccepted: 'RUB',
		paymentAccepted: 'Безналичный расчет с НДС 22%',
		address: {
			'@type': 'PostalAddress',
			streetAddress: config.addressStreet,
			addressLocality: config.addressLocality,
			addressRegion: config.addressRegion,
			postalCode: config.postalCode,
			addressCountry: 'RU'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: config.geoLatitude,
			longitude: config.geoLongitude
		},
		areaServed: [
			{ '@type': 'AdministrativeArea', name: 'Калининград' },
			{ '@type': 'AdministrativeArea', name: 'Гурьевск' },
			{ '@type': 'AdministrativeArea', name: 'Балтийск' },
			{ '@type': 'AdministrativeArea', name: 'Светлый' },
			{ '@type': 'AdministrativeArea', name: 'Черняховск' },
			{ '@type': 'AdministrativeArea', name: config.addressRegion }
		],
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '08:00',
				closes: '18:00'
			}
		],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '28',
			bestRating: '5',
			worstRating: '1'
		}
	};
}

/**
 * Creates Schema.org Service structured data.
 */
export function createServiceSchema(params: ServiceSchemaParams, config: SiteConfig = siteConfig) {
	const serviceUrl = `${config.siteDomain}${params.path.startsWith('/') ? params.path : `/${params.path}`}`;

	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		'@id': `${serviceUrl}#service`,
		name: params.name,
		description: params.description,
		serviceType: params.serviceType,
		url: serviceUrl,
		provider: {
			'@id': `${config.siteDomain}/#organization`
		},
		areaServed: {
			'@type': 'AdministrativeArea',
			name: config.addressRegion
		},
		offers: params.offers
			? {
					'@type': 'Offer',
					price: params.offers.price,
					priceCurrency: params.offers.priceCurrency || 'RUB',
					unitText: params.offers.unitText || 'час',
					priceSpecification: params.offers.minOrderPrice
						? {
								'@type': 'UnitPriceSpecification',
								price: params.offers.minOrderPrice,
								priceCurrency: params.offers.priceCurrency || 'RUB',
								unitText: 'минимальный заказ'
							}
						: undefined
				}
			: undefined
	};
}

/**
 * Creates Schema.org BreadcrumbList structured data.
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[], config: SiteConfig = siteConfig) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => {
			const cleanPath = item.path.startsWith('/') ? item.path : `/${item.path}`;
			return {
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				item: cleanPath === '/' ? `${config.siteDomain}/` : `${config.siteDomain}${cleanPath}/`
			};
		})
	};
}

/**
 * Creates Schema.org FAQPage structured data.
 */
export function createFaqSchema(faqs: FaqItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};
}

/**
 * Creates Schema.org TechArticle structured data (AEO & Engineering SEO).
 */
export function createTechArticleSchema(
	params: TechArticleSchemaParams,
	config: SiteConfig = siteConfig
) {
	const articleUrl = params.url.startsWith('http')
		? params.url
		: `${config.siteDomain}${params.url.startsWith('/') ? params.url : `/${params.url}`}`;

	return {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		'@id': `${articleUrl}#article`,
		headline: params.title,
		description: params.description,
		url: articleUrl,
		inLanguage: 'ru-RU',
		datePublished: params.datePublished,
		dateModified: params.dateModified || params.datePublished,
		author: {
			'@type': 'Organization',
			name: params.authorName || `${config.brandName} — Инженерно-технологический отдел`,
			url: config.siteDomain
		},
		publisher: {
			'@type': 'Organization',
			name: config.brandName,
			url: config.siteDomain,
			logo: {
				'@type': 'ImageObject',
				url: `${config.siteDomain}/logo.svg`
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl
		},
		about: params.category || 'Металлообработка ЧПУ',
		keywords: params.tags && params.tags.length > 0 ? params.tags.join(', ') : undefined,
		dependencies: params.dependencies || 'ГОСТ 25346-2013, ЕСКД',
		proficiencyLevel: params.proficiencyLevel || 'Expert'
	};
}

/**
 * Creates Schema.org VideoObject structured data.
 */
export function createVideoSchema(video: VideoSchemaParams, config: SiteConfig = siteConfig) {
	return {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: video.name,
		description: video.description,
		thumbnailUrl: video.thumbnailUrl.startsWith('http')
			? video.thumbnailUrl
			: `${config.siteDomain}${video.thumbnailUrl}`,
		uploadDate: video.uploadDate,
		contentUrl: video.contentUrl,
		embedUrl: video.embedUrl
	};
}

/**
 * Serializes schema object to a safe JSON-LD string.
 */
export function serializeJsonLd(
	schema: Record<string, unknown> | Array<Record<string, unknown>>
): string {
	return JSON.stringify(schema, null, 2);
}

/**
 * Serializes schema object wrapped directly in a script tag for Svelte head injection.
 */
export function serializeSchema(
	schema: Record<string, unknown> | Array<Record<string, unknown>>
): string {
	return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}<\/script>`;
}
