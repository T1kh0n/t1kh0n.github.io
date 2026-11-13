import katex from 'katex';
import { load } from 'js-yaml';
import { marked } from 'marked';
import { WORKSHOP_SPECS } from './workshop-specs';
import { siteConfig } from '#lib/config/site';
import { base } from '#lib/paths';

export interface ParsedMarkdown<T = Record<string, unknown>> {
	data: T;
	content: string;
	html: string;
}

/**
 * Replace reusable variables in markdown strings and frontmatter strings
 * to ensure single source of truth across all texts and pages.
 */
export function injectWorkshopVariables(text: string): string {
	const replacements: Record<string, string | number> = {
		'{{machineCentersCount}}': WORKSHOP_SPECS.machineCentersCount,
		'{{machineCentersDescription}}': WORKSHOP_SPECS.machineCentersDescription,
		'{{latheLimits}}': WORKSHOP_SPECS.latheLimitsString,
		'{{millLimits}}': WORKSHOP_SPECS.millLimitsString,
		'{{maxToleranceGrade}}': WORKSHOP_SPECS.maxToleranceGrade,
		'{{toleranceGradeDescription}}': WORKSHOP_SPECS.toleranceGradeDescription,
		'{{surfaceRoughnessRa}}': WORKSHOP_SPECS.surfaceRoughnessRa,
		'{{baseOrderThreshold}}': WORKSHOP_SPECS.baseOrderThresholdString,
		'{{vatRatePercent}}': `${WORKSHOP_SPECS.vatRatePercent}%`,
		'{{region}}': WORKSHOP_SPECS.region,
		'{{deliveryDescription}}': WORKSHOP_SPECS.deliveryDescription,
		'{{brandName}}': siteConfig.brandName
	};

	let result = text;
	for (const [key, val] of Object.entries(replacements)) {
		result = result.replaceAll(key, String(val));
	}
	return result;
}

/**
 * Configure marked renderer for clean engineering typography & accessible rendering
 * Automatically prefixes internal absolute links with base path if not present.
 */
marked.setOptions({
	gfm: true,
	breaks: true
});

marked.use({
	walkTokens(token) {
		if (token.type === 'link' && token.href) {
			if (base && token.href.startsWith('/') && !token.href.startsWith(base) && !token.href.startsWith('//')) {
				token.href = `${base}${token.href}`;
			}
		}
	}
});

/**
 * Parse raw markdown content with frontmatter and variable interpolation
 */

/**
 * Render LaTeX math expressions enclosed in $...$ into KaTeX HTML strings
 */
export function renderMathInMarkdown(text: string): string {
	return text.replace(/\$([^$\n]+)\$/g, (_, mathExpr) => {
		try {
			return katex.renderToString(mathExpr.trim(), {
				displayMode: false,
				throwOnError: false
			});
		} catch {
			return mathExpr;
		}
	});
}

export function parseMarkdown<T = Record<string, unknown>>(rawContent: string): ParsedMarkdown<T> {
	const interpolated = injectWorkshopVariables(rawContent);

	const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
	const match = frontmatterRegex.exec(interpolated);

	let data: T = {} as T;
	let content = interpolated;

	if (match) {
		const rawYaml = match[1];
		content = match[2];
		try {
			const parsed = load(rawYaml);
			if (parsed && typeof parsed === 'object') {
				data = parsed as T;
			}
		} catch (e) {
			console.error('Failed to parse frontmatter YAML:', e);
		}
	}

	const contentWithMath = renderMathInMarkdown(content);
	const html = marked.parse(contentWithMath, { async: false }) as string;

	return {
		data,
		content,
		html
	};
}
