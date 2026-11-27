<script lang="ts">
	import { siteConfig } from '#lib/config/site';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		showTagline?: boolean;
	}

	let { size = 'md', showTagline = true }: Props = $props();
</script>

<div class="flex items-center gap-2.5 sm:gap-3 select-none">
	<!-- Precision CNC Vector Icon -->
	<div
		class="relative flex shrink-0 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] p-1 text-[var(--color-accent)] shadow-sm transition-transform hover:scale-105"
		class:h-8={size === 'sm'}
		class:w-8={size === 'sm'}
		class:h-9={size === 'md'}
		class:w-9={size === 'md'}
		class:h-11={size === 'lg'}
		class:w-11={size === 'lg'}
	>
		<svg
			viewBox="0 0 36 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="h-full w-full"
			aria-hidden="true"
		>
			<!-- Dial Calibrated Outer Ring with Precision Ticks -->
			<circle cx="18" cy="18" r="15.5" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" class="opacity-60" />
			<circle cx="18" cy="18" r="12" stroke="var(--color-ink)" stroke-width="0.75" class="opacity-40" />

			<!-- Cardinal Coordinate Center Crosshairs -->
			<line x1="18" y1="2" x2="18" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="18" y1="29" x2="18" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="2" y1="18" x2="7" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<line x1="29" y1="18" x2="34" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />

			<!-- Central 4-Flute CNC Endmill / Lathe Cutter Geometry -->
			<path
				d="M18 9L21.5 14.5L27 18L21.5 21.5L18 27L14.5 21.5L9 18L14.5 14.5L18 9Z"
				fill="currentColor"
				fill-opacity="0.15"
				stroke="currentColor"
				stroke-width="1.2"
				stroke-linejoin="round"
			/>

			<!-- Center Spindle Center Point -->
			<circle cx="18" cy="18" r="2.5" fill="var(--color-ink)" />
			<circle cx="18" cy="18" r="1" fill="var(--color-paper)" />
		</svg>
	</div>

	<!-- Typography Mark -->
	<div class="min-w-0 flex flex-col justify-center">
		<div class="flex items-baseline gap-1.5 leading-none">
			<span
				class="font-light tracking-tight text-[var(--color-ink)]"
				class:text-base={size === 'sm'}
				class:text-lg={size === 'md'}
				class:text-xl={size === 'lg'}
			>
				{siteConfig.brandName}
			</span>
			<span class="rounded bg-[var(--color-accent)]/15 px-1 py-0.2 font-mono text-xs text-[var(--color-accent)]">
				ЧПУ
			</span>
		</div>
		{#if showTagline}
			<div class="mt-1 hidden sm:block font-mono text-[9.5px] uppercase tracking-wider text-[var(--color-muted)]">
				Металлообработка · Калининград
			</div>
		{/if}
	</div>
</div>
