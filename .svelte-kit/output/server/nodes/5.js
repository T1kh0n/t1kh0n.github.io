

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/kontakty/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.D08HkPJ2.js","_app/immutable/chunks/B9S0au6J.js","_app/immutable/chunks/CJKyudpd.js","_app/immutable/chunks/D-tENzeZ.js"];
export const stylesheets = [];
export const fonts = [];
