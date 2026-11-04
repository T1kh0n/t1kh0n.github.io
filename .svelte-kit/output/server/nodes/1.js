

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1._DhiBq6I.js","_app/immutable/chunks/D6ufYkdB.js","_app/immutable/chunks/CEhQPDvk.js","_app/immutable/entry/payload.DSmR2FwN.js"];
export const stylesheets = [];
export const fonts = [];
