

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.D-vqTsMq.js","_app/immutable/chunks/B9S0au6J.js","_app/immutable/chunks/CJKyudpd.js","_app/immutable/chunks/CCet-jRO.js"];
export const stylesheets = ["_app/immutable/assets/2.Cc0M-Ca1.css"];
export const fonts = [];
