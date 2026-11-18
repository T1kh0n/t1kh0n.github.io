<script lang="ts">
	import { a11y } from '#lib/a11y/accessibility-store.svelte';
</script>

{#if a11y.settings.isEnabled}
	<!--noindex-->
	<aside
		data-nosnippet
		class="sticky top-0 z-50 border-b-2 border-black bg-white text-black p-2 sm:p-3 text-xs shadow-md a11y-toolbar select-none"
		role="region"
		aria-label="Панель настройки доступности по ГОСТ Р 52872-2019"
	>
		<div class="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 sm:gap-4">
			<!-- Group 1: Font Size -->
			<div class="flex items-center gap-1.5 sm:gap-2">
				<span class="font-bold text-[11px] sm:text-xs">Шрифт:</span>
				<div class="flex items-center gap-0.5 sm:gap-1 border border-black p-0.5 rounded-xs">
					<button
						type="button"
						class="px-2 py-1 font-bold transition-colors {a11y.settings.fontSize === 'normal' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setFontSize('normal')}
						aria-label="Обычный размер шрифта"
						title="Обычный"
					>
						А
					</button>
					<button
						type="button"
						class="px-2 py-1 font-bold text-sm transition-colors {a11y.settings.fontSize === 'large' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setFontSize('large')}
						aria-label="Увеличенный размер шрифта"
						title="Увеличенный"
					>
						А+
					</button>
					<button
						type="button"
						class="px-2 py-1 font-bold text-base transition-colors {a11y.settings.fontSize === 'huge' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setFontSize('huge')}
						aria-label="Максимальный размер шрифта"
						title="Максимальный"
					>
						А++
					</button>
				</div>
			</div>

			<!-- Group 2: Color Schemes -->
			<div class="flex items-center gap-1.5 sm:gap-2">
				<span class="font-bold text-[11px] sm:text-xs">Цвет:</span>
				<div class="flex items-center gap-1">
					<button
						type="button"
						class="px-2 py-1 border border-black bg-white text-black font-bold transition-all {a11y.settings.colorScheme === 'black_on_white' ? 'ring-2 ring-black font-extrabold' : 'opacity-80 hover:opacity-100'}"
						onclick={() => a11y.setColorScheme('black_on_white')}
						title="Черным по белому"
					>
						Ц1
					</button>
					<button
						type="button"
						class="px-2 py-1 border border-black bg-black text-white font-bold transition-all {a11y.settings.colorScheme === 'white_on_black' ? 'ring-2 ring-yellow-400 font-extrabold' : 'opacity-80 hover:opacity-100'}"
						onclick={() => a11y.setColorScheme('white_on_black')}
						title="Белым по черному"
					>
						Ц2
					</button>
					<button
						type="button"
						class="px-2 py-1 border border-blue-900 bg-[#cbe6ff] text-[#002255] font-bold transition-all {a11y.settings.colorScheme === 'blue_on_cyan' ? 'ring-2 ring-blue-900 font-extrabold' : 'opacity-80 hover:opacity-100'}"
						onclick={() => a11y.setColorScheme('blue_on_cyan')}
						title="Синим по голубому"
					>
						Ц3
					</button>
				</div>
			</div>

			<!-- Group 3: Kerning (Inter-letter spacing) -->
			<div class="flex items-center gap-1.5 sm:gap-2">
				<span class="font-bold text-[11px] sm:text-xs">Кернинг:</span>
				<div class="flex items-center gap-0.5 sm:gap-1 border border-black p-0.5 rounded-xs">
					<button
						type="button"
						class="px-1.5 sm:px-2 py-1 font-bold {a11y.settings.kerning === 'normal' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setKerning('normal')}
						title="Стандартный интервал"
					>
						Станд.
					</button>
					<button
						type="button"
						class="px-1.5 sm:px-2 py-1 font-bold {a11y.settings.kerning === 'medium' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setKerning('medium')}
						title="Средний интервал"
					>
						Средн.
					</button>
					<button
						type="button"
						class="px-1.5 sm:px-2 py-1 font-bold {a11y.settings.kerning === 'large' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setKerning('large')}
						title="Большой интервал"
					>
						Больш.
					</button>
				</div>
			</div>

			<!-- Group 4: Line Height -->
			<div class="flex items-center gap-1.5 sm:gap-2">
				<span class="font-bold text-[11px] sm:text-xs">Интервал:</span>
				<div class="flex items-center gap-0.5 sm:gap-1 border border-black p-0.5 rounded-xs">
					<button
						type="button"
						class="px-2 py-1 font-bold {a11y.settings.lineHeight === 'normal' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setLineHeight('normal')}
						title="Одинарный интервал"
					>
						1.0
					</button>
					<button
						type="button"
						class="px-2 py-1 font-bold {a11y.settings.lineHeight === 'relaxed' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setLineHeight('relaxed')}
						title="Полуторный интервал"
					>
						1.5
					</button>
					<button
						type="button"
						class="px-2 py-1 font-bold {a11y.settings.lineHeight === 'double' ? 'bg-black text-white' : 'hover:bg-gray-200'}"
						onclick={() => a11y.setLineHeight('double')}
						title="Двойной интервал"
					>
						2.0
					</button>
				</div>
			</div>

			<!-- Group 5: Images Display Toggle -->
			<div class="flex items-center gap-1.5 sm:gap-2">
				<button
					type="button"
					class="border border-black px-2.5 py-1 font-bold transition-colors whitespace-nowrap {a11y.settings.showImages ? 'hover:bg-gray-200' : 'bg-black text-white'}"
					onclick={() => a11y.toggleImages()}
					title="Включить / отключить изображения на страницах"
				>
					{a11y.settings.showImages ? 'Изображения: Вкл' : 'Изображения: Выкл'}
				</button>
			</div>

			<!-- Group 6: Reset & Close -->
			<div class="flex items-center gap-1.5 sm:gap-2">
				<button
					type="button"
					class="border border-black px-2 py-1 font-bold hover:bg-gray-200"
					onclick={() => a11y.resetDefaults()}
					title="Сбросить все настройки"
				>
					Сброс
				</button>
				<button
					type="button"
					class="border-2 border-black bg-black text-white px-2.5 sm:px-3 py-1 font-bold hover:bg-gray-800 whitespace-nowrap"
					onclick={() => a11y.toggleEnabled()}
					title="Вернуться к стандартной версии сайта"
				>
					✕ Обычная версия
				</button>
			</div>
		</div>
	</aside>
	<!--/noindex-->
{/if}
