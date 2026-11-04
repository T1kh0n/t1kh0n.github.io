/**
 * Accessibility State Management complying with GOST R 52872-2019.
 * Persists user preferences (font size, high contrast schemes, kerning, line height, images) in localStorage.
 */

export type FontSizeTier = 'normal' | 'large' | 'huge';
export type ColorScheme = 'default' | 'black_on_white' | 'white_on_black' | 'blue_on_cyan';
export type KerningTier = 'normal' | 'medium' | 'large';
export type LineHeightTier = 'normal' | 'relaxed' | 'double';

export interface AccessibilitySettings {
	isEnabled: boolean;
	fontSize: FontSizeTier;
	colorScheme: ColorScheme;
	kerning: KerningTier;
	lineHeight: LineHeightTier;
	showImages: boolean;
	speechActive: boolean;
}

const STORAGE_KEY = 'metalprom39_a11y_settings';

const DEFAULT_SETTINGS: AccessibilitySettings = {
	isEnabled: false,
	fontSize: 'large',
	colorScheme: 'black_on_white',
	kerning: 'normal',
	lineHeight: 'relaxed',
	showImages: true,
	speechActive: false
};

class AccessibilityManager {
	settings = $state<AccessibilitySettings>({ ...DEFAULT_SETTINGS });

	constructor() {
		if (typeof window !== 'undefined') {
			this.loadSettings();
			this.applyToDocument();
		}
	}

	loadSettings() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				this.settings = { ...DEFAULT_SETTINGS, ...parsed, speechActive: false };
			}
		} catch {
			// localStorage blocked or restricted
		}
	}

	saveSettings() {
		if (typeof window === 'undefined') return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
		} catch {
			// localStorage error
		}
		this.applyToDocument();
	}

	toggleEnabled() {
		this.settings.isEnabled = !this.settings.isEnabled;
		if (this.settings.isEnabled) {
			this.settings.colorScheme = 'black_on_white';
		} else {
			this.stopSpeech();
		}
		this.saveSettings();
	}

	setFontSize(tier: FontSizeTier) {
		this.settings.fontSize = tier;
		this.saveSettings();
	}

	setColorScheme(scheme: ColorScheme) {
		this.settings.colorScheme = scheme;
		this.saveSettings();
	}

	setKerning(tier: KerningTier) {
		this.settings.kerning = tier;
		this.saveSettings();
	}

	setLineHeight(tier: LineHeightTier) {
		this.settings.lineHeight = tier;
		this.saveSettings();
	}

	toggleImages() {
		this.settings.showImages = !this.settings.showImages;
		this.saveSettings();
	}

	resetDefaults() {
		this.settings = { ...DEFAULT_SETTINGS, isEnabled: false };
		this.stopSpeech();
		this.saveSettings();
	}

	toggleSpeech() {
		if (typeof window === 'undefined') return;
		if (!('speechSynthesis' in window)) {
			alert('Ваш браузер не поддерживает голосовое озвучивание страниц.');
			return;
		}

		if (this.settings.speechActive) {
			this.stopSpeech();
		} else {
			this.startSpeech();
		}
	}

	startSpeech() {
		if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
		window.speechSynthesis.cancel();

		// Collect page text (excluding nav, footer and script tags)
		const mainEl = document.querySelector('main') || document.body;
		const text = mainEl.innerText.replace(/\s+/g, ' ').slice(0, 5000);

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'ru-RU';
		utterance.rate = 1.0;

		utterance.onend = () => {
			this.settings.speechActive = false;
		};
		utterance.onerror = () => {
			this.settings.speechActive = false;
		};

		this.settings.speechActive = true;
		window.speechSynthesis.speak(utterance);
	}

	stopSpeech() {
		if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
		window.speechSynthesis.cancel();
		this.settings.speechActive = false;
	}

	applyToDocument() {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;

		// Clean previous a11y classes
		root.classList.remove(
			'a11y-active',
			'a11y-font-large',
			'a11y-font-huge',
			'a11y-scheme-bow',
			'a11y-scheme-wob',
			'a11y-scheme-boc',
			'a11y-kerning-medium',
			'a11y-kerning-large',
			'a11y-lh-relaxed',
			'a11y-lh-double',
			'a11y-hide-images'
		);

		if (!this.settings.isEnabled) return;

		root.classList.add('a11y-active');

		if (this.settings.fontSize === 'large') root.classList.add('a11y-font-large');
		if (this.settings.fontSize === 'huge') root.classList.add('a11y-font-huge');

		if (this.settings.colorScheme === 'black_on_white') root.classList.add('a11y-scheme-bow');
		if (this.settings.colorScheme === 'white_on_black') root.classList.add('a11y-scheme-wob');
		if (this.settings.colorScheme === 'blue_on_cyan') root.classList.add('a11y-scheme-boc');

		if (this.settings.kerning === 'medium') root.classList.add('a11y-kerning-medium');
		if (this.settings.kerning === 'large') root.classList.add('a11y-kerning-large');

		if (this.settings.lineHeight === 'relaxed') root.classList.add('a11y-lh-relaxed');
		if (this.settings.lineHeight === 'double') root.classList.add('a11y-lh-double');

		if (!this.settings.showImages) root.classList.add('a11y-hide-images');
	}
}

export const a11y = new AccessibilityManager();
